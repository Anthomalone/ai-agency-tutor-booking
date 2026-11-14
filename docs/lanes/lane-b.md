# Lane brief: Lane B

Written by the Chief Architect. Saved as `docs/lanes/lane-b.md` and merged to main before the lane starts.

| Field | Value |
|---|---|
| Lane name | Lane B |
| Goal | Tutors manage their weekly times, students and tutors chat live, and the owner runs the business from the admin area. |
| Features | F11 tutor dashboard, F12 chat, F14 admin dashboard, F15 add, edit and remove tutors, F16 admin cancel programmes and see payments, F17 hide a review. |
| Worktree and branch | `.claude/worktrees/lane-b`, branch `worktree-lane-b` |
| Starting point | main after the foundation pull request is merged |
| Allowed files and folders | `plans/lane-b-*.md`, `app/tutor/`, `app/chat/`, `app/admin/`, `app/api/chat/`, `app/api/admin/`, `lib/chat/`, `lib/admin/`, `components/staff/`, `tests/staff/` |
| Do not touch | Everything else: `package.json`, `app/layout.tsx`, `app/globals.css`, `components/ui/`, `components/nav/`, `lib/types.ts`, `lib/auth.ts`, `lib/supabase/`, `lib/time.ts`, `lib/money.ts`, `lib/refund.ts`, `lib/programme/`, `lib/payments/`, `lib/email/`, `proxy.ts`, `supabase/`, `design/`, `docs/`, and Lane A's folders. If you need a new package, a database change or a new shared component, ask the Chief Architect. |
| Builds on | `lib/types.ts`, `lib/auth.ts` (`requireRole`), `lib/supabase/*`, `lib/time.ts`, `lib/money.ts`, `components/ui/*`, `supabase/migrations/0001_init.sql`, and the screens in `design/handoff/` (`tutor-area`, `chat`, `admin` `.dc.html`) |
| Dev server port | 3002 |
| Depends on / blocks | F15 and F16 call `cancelProgramme()` from `lib/programme/cancel.ts`, which Lane A implements (it is a stub until Lane A's pull request is merged). Build those screens against the function's signature in `lib/types.ts`, and connect the real call after Lane A merges and the Chief Architect tells you "main moved". Blocks nothing. |

## Done means

Each item is an action and a visible result, checked against the matching screen in `design/handoff/` and `docs/ux/screen-map.md`.

- [ ] As a tutor, I add a weekly time and a student account sees it on my page; after a student books, my students and upcoming lessons show (F11).
- [ ] A student and their tutor send messages and each appears on the other account within 2 seconds, without refreshing; a person who is not part of that programme cannot open the chat (F12).
- [ ] The failed-message state shows "Not sent" with a retry (F12).
- [ ] As the owner I open `/admin` and see programmes, payments and totals, and tutor and student lists; a student or tutor account is sent away from `/admin` (F14).
- [ ] I add a tutor, edit a tutor, and remove a tutor; the public list changes to match (F15).
- [ ] Removing a tutor who has students shows each student and their refund first, then cancels and refunds them through `cancelProgramme()` (F15).
- [ ] I open any programme, see its payment status, and cancel it; the student is refunded and the weekly time is free (F16).
- [ ] I hide a review and it no longer shows on the tutor's page (F17).
- [ ] Every state in the design (empty, loading as skeletons, error, confirm and removed) exists for the screens you own.

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
