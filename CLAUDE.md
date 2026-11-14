# AI agency (tutor booking app)

Project type: app

Stack: Next.js 16 (App Router), Supabase (database and sign-in), Vercel (hosting), GitHub (code), Stripe (payments, test mode first), Resend (email).
Goal: a polished, sophisticated, easy-to-use tutor booking app. See `docs/prd.md`, `docs/feature-list.md`, `docs/ux/screen-map.md`. The look is fixed in `design/handoff/` (Option B, Midnight Spark): build screens to match it, using the tokens already in `app/globals.css`.

Next.js 16 differs from older versions (for example `proxy.ts` replaces `middleware.ts`, and Cache Components are on). Read the guide in `node_modules/next/dist/docs/` before writing code that touches routing, caching or cookies. Read env variables inside functions at request time, never at the top of a file, so the build passes with no variables set.

Checks: `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`. All must pass.

## Folders and owners

Two lanes build in parallel. A lane changes only the folders it owns. Anything owned by the Chief Architect changes only through a request to the Chief Architect.

| Folder or file | Owner |
|---|---|
| `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.mts`, `proxy.ts`, `.github/`, `.env.example`, `.gitignore`, `.worktreeinclude` | Chief Architect |
| `app/layout.tsx`, `app/globals.css`, `lib/fonts.ts`, `components/ui/`, `components/nav/`, `public/` | Chief Architect |
| `app/auth/` (sign out route), `lib/supabase/`, `lib/auth.ts`, `lib/types.ts`, `lib/time.ts`, `lib/money.ts`, `lib/refund.ts`, `tests/` (existing files) | Chief Architect |
| `supabase/` (migrations and seed), `docs/` (except lane briefs below), `design/`, `CLAUDE.md` | Chief Architect |
| `app/page.tsx`, `app/tutors/`, `app/checkout/`, `app/programme/`, `app/(auth)/`, `app/api/checkout/`, `app/api/stripe/`, `app/api/programme/`, `app/api/reviews/`, `lib/payments/`, `lib/programme/`, `lib/email/`, `components/student/`, `tests/student/`, `plans/lane-a-*.md` | Lane A |
| `app/tutor/`, `app/chat/`, `app/admin/`, `app/api/chat/`, `app/api/admin/`, `lib/chat/`, `lib/admin/`, `components/staff/`, `tests/staff/`, `plans/lane-b-*.md` | Lane B |

Ports: main 3000, Lane A 3001, Lane B 3002, Lane C 3003. (On Anthony's Mac another app often holds 3000: use 3010 for the main folder if so.)

## Shared contracts

- Money is whole fils (1 AED = 100 fils). The package is 2,000,000 fils (AED 20,000, 5% VAT included). Use `lib/money.ts` and `lib/refund.ts`.
- Times are stored in UTC and shown in the viewer's own time zone with the zone named (`lib/time.ts`).
- `cancelProgramme()` (`lib/programme/cancel.ts`, Lane A) refunds, cancels, frees the weekly time and emails. Lane B's admin calls it and never reimplements it.
- Pages that need a role call `requireRole()` from `lib/auth.ts`. Writes that must bypass row level security use `createServiceClient()` on the server only.
- One primary (gradient) button per screen. Every price reads "AED 20,000" with "5% VAT included" beside it.
