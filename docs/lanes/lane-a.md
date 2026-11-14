# Lane brief: Lane A

Written by the Chief Architect. Saved as `docs/lanes/lane-a.md` and merged to main before the lane starts.

| Field | Value |
|---|---|
| Lane name | Lane A |
| Goal | A student can find a tutor, pick a weekly time, pay AED 20,000 in the app, see their programme, cancel for the right refund, get emails and leave a review. |
| Features | F2 sign in and sign up, F3 browse tutors, F4 time zones, F5 choose a weekly time, F6 no double booking, F7 pay, F8 my programme, F9 cancel and refund, F10 emails, F13 reviews. (F1 sample data and the database are already in the foundation.) |
| Worktree and branch | `.claude/worktrees/lane-a`, branch `worktree-lane-a` |
| Starting point | main after the foundation pull request is merged |
| Allowed files and folders | `plans/lane-a-*.md`, `app/page.tsx`, `app/tutors/`, `app/checkout/`, `app/programme/`, `app/(auth)/`, `app/api/checkout/`, `app/api/stripe/`, `app/api/programme/`, `app/api/reviews/`, `lib/payments/`, `lib/programme/`, `lib/email/`, `components/student/`, `tests/student/` |
| Do not touch | Everything else: `package.json`, `app/layout.tsx`, `app/globals.css`, `components/ui/`, `components/nav/`, `lib/types.ts`, `lib/auth.ts`, `lib/supabase/`, `lib/time.ts`, `lib/money.ts`, `lib/refund.ts`, `proxy.ts`, `supabase/`, `design/`, `docs/`, and Lane B's folders. If you need a new package, a database change or a new shared component, ask the Chief Architect. |
| Builds on | `lib/types.ts`, `lib/auth.ts`, `lib/supabase/*`, `lib/time.ts`, `lib/money.ts`, `lib/refund.ts`, `components/ui/*`, `supabase/migrations/0001_init.sql`, and the screens in `design/handoff/` (`tutors`, `tutor`, `checkout`, `programme`, `auth` `.dc.html`) |
| Dev server port | 3001 |
| Depends on / blocks | Depends on nothing. Blocks Lane B's final step: Lane B's admin cancel (F15, F16) calls `cancelProgramme()` from `lib/programme/cancel.ts`, which you implement. Build and merge F9 early. |

## Done means

Each item is an action and a visible result, checked against the matching screen in `design/handoff/` and `docs/ux/screen-map.md`.

- [ ] I sign up, sign out, sign in again and see my name in the header (F2).
- [ ] The home page lists the sample tutors with subjects and rating; I open one and see free weekly times, about and reviews (F3).
- [ ] The same lesson shows in the time zone of my device, with the zone named (F4).
- [ ] I choose a weekly time and the checkout shows 52 lessons, first and last dates and AED 20,000 with 5% VAT included (F5).
- [ ] After one student books a weekly time, a second account sees it as taken and cannot pick it, even if both tap at once (F6).
- [ ] I pay with Stripe's test card 4242 4242 4242 4242 and see "Booked"; a declined test card books nothing and frees the time (F7).
- [ ] "My programme" shows my next lessons (F8).
- [ ] I cancel with no lessons taken and a full AED 20,000 refund is made; after some lessons the refund is AED 384.62 per unused lesson, shown before I confirm (F9).
- [ ] Booking and cancelling each send an email to the student and the tutor (F10). Use Resend's test sender until a domain is verified.
- [ ] After a lesson's time has passed I leave stars and a comment; it shows on the tutor's page with the average (F13).
- [ ] Every state in the design (empty, loading as skeletons, error, taken, payment failed, paid, cancelled) exists for the screens you own.

## Checks to run before reporting

`npm run typecheck`, `npm run lint`, `npm test`, `npm run build` all pass (build with no environment variables set), then /codex-review with every finding triaged, then /pr.

## How to report

Send a message to "Chief Architect" in this format:

```text
STATUS: DONE | BLOCKED | QUESTION
PR: #<number>
Checks: green | red (what failed)
Files changed outside my allowed list: none
Look at: <one line on what to check first>
```

## When to stop and ask instead of guessing

- You need to change a file on the "Do not touch" list (a package, the database, a shared component).
- The brief and the design handoff disagree.
- The same error happens 3 times.
- You are about to build something not in "Done means".
- Anything needs a real key, real money or a live database change: Anthony does those himself.
