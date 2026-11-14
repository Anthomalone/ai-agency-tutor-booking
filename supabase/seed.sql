-- Sample data for development. Made-up tutors only; no real people. Safe to run on an empty database.
-- Tutor logins do not exist yet: profile_id stays null until the owner creates each tutor's account.

insert into public.tutors (id, name, headline, bio, subjects, photo_url, time_zone) values
  ('11111111-1111-4111-8111-111111111101', 'Dr Layla Hassan', 'Calculus that finally clicks',
   'Maths and physics tutor with ten years of teaching experience. Structured, patient and exam-focused.',
   '{Maths,Physics}', '/tutors/layla.svg', 'Asia/Dubai'),
  ('11111111-1111-4111-8111-111111111102', 'Samir Patel', 'Learn to code and use AI the right way',
   'Software engineer who teaches coding and AI basics through real projects.',
   '{Coding,"AI basics"}', '/tutors/samir.svg', 'Asia/Dubai'),
  ('11111111-1111-4111-8111-111111111103', 'Hannah Clarke', 'Confident writing and speaking',
   'English tutor for school students and adults: essays, IELTS and everyday fluency.',
   '{English}', '/tutors/hannah.svg', 'Asia/Dubai'),
  ('11111111-1111-4111-8111-111111111104', 'Youssef Nasser', 'Arabic, from first letters to fluency',
   'Native Arabic teacher for beginners and heritage learners.',
   '{Arabic}', '/tutors/youssef.svg', 'Asia/Dubai'),
  ('11111111-1111-4111-8111-111111111105', 'Mei Tanaka', 'Chemistry and biology, made visual',
   'Science tutor who explains hard ideas with diagrams and everyday examples.',
   '{Chemistry,Biology}', '/tutors/mei.svg', 'Asia/Dubai')
on conflict (id) do nothing;

-- Weekly free times (weekday 0 = Sunday), in the tutor's zone (Asia/Dubai)
insert into public.availability (tutor_id, weekday, start_time) values
  ('11111111-1111-4111-8111-111111111101', 1, '16:00'), ('11111111-1111-4111-8111-111111111101', 2, '17:00'),
  ('11111111-1111-4111-8111-111111111101', 4, '18:00'), ('11111111-1111-4111-8111-111111111101', 6, '10:00'),
  ('11111111-1111-4111-8111-111111111102', 1, '18:00'), ('11111111-1111-4111-8111-111111111102', 3, '17:00'),
  ('11111111-1111-4111-8111-111111111102', 5, '15:00'), ('11111111-1111-4111-8111-111111111102', 6, '11:00'),
  ('11111111-1111-4111-8111-111111111103', 0, '16:00'), ('11111111-1111-4111-8111-111111111103', 2, '18:00'),
  ('11111111-1111-4111-8111-111111111103', 3, '16:00'), ('11111111-1111-4111-8111-111111111103', 4, '17:00'),
  ('11111111-1111-4111-8111-111111111104', 1, '17:00'), ('11111111-1111-4111-8111-111111111104', 3, '18:00'),
  ('11111111-1111-4111-8111-111111111104', 5, '16:00'), ('11111111-1111-4111-8111-111111111104', 6, '12:00'),
  ('11111111-1111-4111-8111-111111111105', 0, '17:00'), ('11111111-1111-4111-8111-111111111105', 2, '16:00'),
  ('11111111-1111-4111-8111-111111111105', 4, '16:00'), ('11111111-1111-4111-8111-111111111105', 6, '14:00')
on conflict do nothing;
