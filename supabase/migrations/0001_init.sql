-- AI agency: initial schema. Owned by the Chief Architect.
-- Money is stored in fils (1 AED = 100 fils). All times are stored in UTC (timestamptz).
-- Review this file before running it against any database.

create extension if not exists "pgcrypto";

-- Roles -----------------------------------------------------------------------------------------
create type public.user_role as enum ('student', 'tutor', 'owner');
create type public.programme_status as enum ('pending_payment', 'active', 'cancelled', 'completed');
create type public.refund_status as enum ('none', 'pending', 'refunded', 'failed');
create type public.lesson_status as enum ('upcoming', 'done', 'cancelled');
create type public.payment_status as enum ('paid', 'failed', 'refunded');

-- Profiles: one row per signed-in person ----------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'student',
  full_name text not null default '',
  time_zone text not null default 'Asia/Dubai',
  created_at timestamptz not null default now()
);

-- Every new sign-up becomes a student. The owner promotes people to tutor or owner with SQL or the admin area.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.current_role_is(r public.user_role) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = r);
$$;

-- Tutors -------------------------------------------------------------------------------------------
create table public.tutors (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles (id) on delete set null, -- null until the owner creates the login
  name text not null,
  headline text not null default '',
  bio text not null default '',
  subjects text[] not null default '{}',
  photo_url text not null default '',
  time_zone text not null default 'Asia/Dubai',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- A tutor's weekly free times: a weekday plus a wall-clock time in the tutor's own zone
create table public.availability (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid not null references public.tutors (id) on delete cascade,
  weekday smallint not null check (weekday between 0 and 6), -- 0 = Sunday
  start_time time not null,
  active boolean not null default true,
  unique (tutor_id, weekday, start_time)
);

-- Programmes: a year of 52 weekly lessons with one tutor at one weekly time -------------------------
create table public.programmes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id),
  tutor_id uuid not null references public.tutors (id),
  availability_id uuid not null references public.availability (id),
  start_date date not null,
  status public.programme_status not null default 'pending_payment',
  price_fils integer not null default 2000000 check (price_fils > 0), -- AED 20,000 incl. 5% VAT
  stripe_session_id text,
  stripe_payment_intent text,
  paid_at timestamptz,
  cancelled_at timestamptz,
  cancelled_by text check (cancelled_by in ('student', 'owner')),
  refund_fils integer not null default 0,
  refund_status public.refund_status not null default 'none',
  created_at timestamptz not null default now()
);

-- A weekly time can only be held by one programme at a time (F6: no double booking)
create unique index programmes_one_per_weekly_time
  on public.programmes (availability_id)
  where status in ('pending_payment', 'active');

create index programmes_student_idx on public.programmes (student_id);
create index programmes_tutor_idx on public.programmes (tutor_id);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references public.programmes (id) on delete cascade,
  starts_at timestamptz not null,
  status public.lesson_status not null default 'upcoming',
  unique (programme_id, starts_at)
);
create index lessons_programme_idx on public.lessons (programme_id, starts_at);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references public.programmes (id) on delete cascade,
  amount_fils integer not null,
  status public.payment_status not null,
  stripe_ref text,
  created_at timestamptz not null default now()
);

-- Chat: one conversation per programme (a student and their own tutor) -----------------------------
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references public.programmes (id) on delete cascade,
  sender_id uuid not null references public.profiles (id),
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index messages_programme_idx on public.messages (programme_id, created_at);

-- Reviews: one per lesson, written by the student after the lesson ---------------------------------
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null unique references public.lessons (id) on delete cascade,
  programme_id uuid not null references public.programmes (id) on delete cascade,
  tutor_id uuid not null references public.tutors (id),
  student_id uuid not null references public.profiles (id),
  stars smallint not null check (stars between 1 and 5),
  body text not null default '' check (char_length(body) <= 1000),
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index reviews_tutor_idx on public.reviews (tutor_id) where hidden = false;

-- Row level security ------------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.tutors enable row level security;
alter table public.availability enable row level security;
alter table public.programmes enable row level security;
alter table public.lessons enable row level security;
alter table public.payments enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;

-- helper: is the signed-in person the student or the tutor of this programme?
create function public.is_programme_member(p uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.programmes pr
    left join public.tutors t on t.id = pr.tutor_id
    where pr.id = p and (pr.student_id = auth.uid() or t.profile_id = auth.uid())
  );
$$;

-- profiles
create policy "read own profile or owner reads all" on public.profiles for select
  using (id = auth.uid() or public.current_role_is('owner'));
create policy "update own profile name and zone" on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()));
create policy "owner updates any profile" on public.profiles for update
  using (public.current_role_is('owner'));

-- tutors and availability: anyone can browse active tutors; the owner manages them; a tutor manages own times
create policy "anyone reads active tutors" on public.tutors for select
  using (active or public.current_role_is('owner') or profile_id = auth.uid());
create policy "owner manages tutors" on public.tutors for all
  using (public.current_role_is('owner')) with check (public.current_role_is('owner'));

create policy "anyone reads availability" on public.availability for select using (true);
create policy "tutor or owner manages availability" on public.availability for all
  using (
    public.current_role_is('owner')
    or exists (select 1 from public.tutors t where t.id = tutor_id and t.profile_id = auth.uid())
  )
  with check (
    public.current_role_is('owner')
    or exists (select 1 from public.tutors t where t.id = tutor_id and t.profile_id = auth.uid())
  );

-- programmes, lessons, payments: students see their own, tutors see their students', owner sees all.
-- Writes happen on the server with the service role (checkout, Stripe webhook, cancel), not from the browser.
create policy "members and owner read programmes" on public.programmes for select
  using (public.is_programme_member(id) or public.current_role_is('owner'));
create policy "members and owner read lessons" on public.lessons for select
  using (public.is_programme_member(programme_id) or public.current_role_is('owner'));
create policy "student and owner read payments" on public.payments for select
  using (
    public.current_role_is('owner')
    or exists (select 1 from public.programmes pr where pr.id = programme_id and pr.student_id = auth.uid())
  );

-- messages: only the student and tutor of the programme (and the owner reads)
create policy "members read messages" on public.messages for select
  using (public.is_programme_member(programme_id) or public.current_role_is('owner'));
create policy "members send messages" on public.messages for insert
  with check (sender_id = auth.uid() and public.is_programme_member(programme_id));

-- reviews: visible ones are public; the student writes their own; the owner can hide
create policy "anyone reads visible reviews" on public.reviews for select
  using (not hidden or public.current_role_is('owner') or student_id = auth.uid());
create policy "student writes own review" on public.reviews for insert
  with check (
    student_id = auth.uid()
    and exists (
      select 1 from public.lessons l
      join public.programmes pr on pr.id = l.programme_id
      where l.id = lesson_id and pr.id = programme_id and pr.student_id = auth.uid()
        and pr.tutor_id = reviews.tutor_id and l.starts_at < now()
    )
  );
create policy "owner moderates reviews" on public.reviews for update
  using (public.current_role_is('owner')) with check (public.current_role_is('owner'));

-- Live chat: new messages arrive without a refresh
alter publication supabase_realtime add table public.messages;
