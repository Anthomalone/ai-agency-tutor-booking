# Plan: design handoff in Option B (Midnight Spark)

Date: 2026-11-14. Anthony chose Option B in this conversation ("Go with B").

## Goal
Every v1 screen designed in Option B, with every state from `docs/ux/screen-map.md`, plus sign in, sign up and a system sheet, handed off in `design/handoff/` for the coding lanes (Next.js).

## Steps
1. Shared base: Option B tokens and components, plus new parts (signed-in header, skeletons, empty and error states, alerts, toasts, modal, status pills, chat bubbles, star input, stat tiles, tables).
2. `/` tutor list: default, empty, loading, error.
3. `/tutors/[id]`: default, no free times / no reviews (empty), loading, error, taken, booked (message tutor).
4. `/checkout`: default, loading, paying, error, payment failed, paid.
5. `/programme`: default (10 of 52 lessons taken), empty, loading, error, leave a review, cancel (refund shown first), cancelled (refunded).
6. `/chat/[id]`: default, empty, loading, error, message failed.
7. `/tutor`: default, add a weekly time, empty, loading, error.
8. `/admin`: default, remove tutor (confirm), tutor removed (students refunded), empty, loading, error.
9. Sign in and sign up: default, error, loading.
10. System sheet: every component in every state.
11. Screenshots of every screen and state at 1440 and 390; critique and fix.
12. `design/handoff/README.md`: tokens, fonts with next/font, each screen's parts and states, logo, choices.

## Content rules
Fictional data from `design/brief.md` only. Refund maths: AED 20,000 / 52 = AED 384.62 per unused lesson (10 taken: AED 16,153.85; 4 taken: AED 18,461.54). Times always name the zone (GST). Words: programme, weekly lesson, "Choose a weekly time", "Message your tutor", "Pay AED 20,000".

## Checks
No sideways scroll at 390, 44 px tap targets, contrast 4.5:1, one primary action per screen and state, price with "5% VAT included", home to paid in 3 screens.
