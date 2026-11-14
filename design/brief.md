# Design brief: AI agency (tutor booking app)

For: the Design lane. From: Anthony (owner). Date: 2026-11-14. Needed back by: first the three design options for review, then the full handoff after one is chosen.

UI and UX matter most to me in this product. It must feel like a polished, modern SaaS product: calm, confident, fast, and friendly. Not a template, not a form.

## Quality bar (restart, 2026-11-14)

The first round of designs was rejected as "really horrible": too generic and template-like. This is a restart, and none of the earlier work may be reused or imitated. The target is the polish of the best modern SaaS products, such as Linear, Stripe, Notion and Cal.com (a quality bar, not something to copy). That means:

- A confident, distinctive visual identity with a clear point of view, not a default Bootstrap or Tailwind look.
- Considered typography: real hierarchy, tight and deliberate sizes, comfortable line length, tabular numbers for prices and times.
- Generous, disciplined whitespace and a strict spacing scale; alignment you can verify on a grid.
- Refined detail: subtle layered shadows and borders, careful radius, crisp icons (one consistent icon set), smooth hover, focus, press and selection states, and meaningful micro-interactions and transitions.
- Real photography-style tutor imagery or tasteful illustrated avatars, never grey boxes or plain initials only.
- Believable content (see "Real content") so every screen looks like a live product, not a wireframe.
- Empty, loading (skeletons) and error states that look as designed as the happy path.
- Accessible: visible keyboard focus and the contrast rules below.

Before showing me anything, critique your own screenshots like a harsh senior product designer and fix what looks generic, cramped, misaligned or flat.

## What this is and who uses it

The app in two sentences: "AI agency" is a tutoring business's app where a student picks a tutor and a weekly lesson time, pays once for a year-long programme (52 weekly lessons, AED 20,000, 5% VAT included), and then chats with the tutor and reviews them. Tutors set their weekly times; the owner runs everything from an admin area.

The one person it is for: Noor, 16, a student in Dubai (or her mother, who pays), who wants to pick a good tutor and be booked for the whole year in under a minute, on her phone.

## Read these first

Screen map: `docs/ux/screen-map.md`
Feature list: `docs/feature-list.md` (v1 features)
Product rules: `docs/prd.md`
Inspiration images: none yet. Add any you like to `design/reference/` and say what to take from each.

## Screens to design

The seven routes in the screen map, each with every state listed there: `/`, `/tutors/[id]`, `/checkout`, `/programme`, `/chat/[id]`, `/tutor`, `/admin`. Also the sign in and sign up forms and the logo.

## Step 1: three design options (stop here for my choice)

Before designing everything, give me **3 distinct design options** to choose from. You choose the colours and fonts that are best for this product; I am not choosing them.

Each option is a full direction, shown on the same three screens (`/` tutor list, `/tutors/[id]` tutor page, `/checkout`) at 390 wide (phone) and 1440 wide (desktop), and contains:

- **Name and mood** in three plain words.
- **Colours**: exact values for background, surface, text, muted text, border, primary, secondary (accent), success, warning, error. The brand is **blue and purple**: every option stays in the blue-to-purple family, but the three options must look clearly different (for example calm and trustworthy, bold and modern, soft and friendly).
- **Fonts**: one or two families, free to use (Google Fonts), with the sizes for headings, body and small text.
- **Logo**: a simple mark and wordmark for "AI agency", legible at 24px tall. One per option.
- **Components**: button (primary, secondary, disabled), input, tutor card, badge, and the weekly time chip in default, selected, taken states.
- **Why**: three lines on why this option fits a tutoring business and its parents and students.

Light mode only. Save them in `design/options/option-a/`, `option-b/` and `option-c/`, plus `design/options/README.md` that compares them in one table. **Then stop and wait for me to choose.**

## Step 2: full design after I choose

Design all seven screens and the auth forms, with every state, in the chosen option. Add a system sheet showing every component in every state on one page. Save the handoff in `design/handoff/` (see "Send back").

## Rules that cannot bend

Each is checkable on a screenshot, at 1440 and at 390 wide.

1. One primary action per screen, and it is the most visible button on the screen.
2. Every screen shows its empty, loading and error states, plus the extra ones in the screen map.
3. Text contrast is at least 4.5 to 1 (small text) and 3 to 1 (large text and icons).
4. No sideways scrolling at 390 wide. Every tap target is at least 44 by 44 px.
5. The price always reads "AED 20,000" with "5% VAT included" next to it, and every lesson time shows the time zone (for example "Tue 17:00 GST").
6. A student goes from the home page to a paid programme in 4 screens or fewer.
7. No more than two font families, and no more than two weights of each on one screen.
8. Spacing follows one scale (multiples of 4 px) and corners one radius family, so the screens feel like one product.

## Words to use (and never use)

Use: programme (the year of weekly lessons), weekly lesson, tutor, student, package, "Choose a weekly time", "Message your tutor", "Pay AED 20,000".

Never use: slot, appointment, marketplace, booking engine, session (for the year), "Submit", "Lorem ipsum", or placeholder names like "John Doe".

## The story the screens add up to

1. `/`: Noor sees the tutors and opens one she likes.
2. `/tutors/[id]`: she reads the rating and reviews and chooses a weekly time (Tuesday 17:00 GST).
3. `/checkout`: she sees "52 weekly lessons, first on 24 Nov 2026, last on 16 Nov 2027, AED 20,000, 5% VAT included" and pays.
4. `/programme`: she sees her next lesson and can message her tutor.

Budget: home to paid in 4 screens or fewer.

## Real content for the mock-ups

Fictional but consistent. Mark live values with slots like `[N]`.

- Students: Noor Al Mansoori (Dubai Marina), Omar Haddad (Jumeirah Lakes Towers), Aisha Khan (Abu Dhabi, Yas Island).
- Tutors: Dr Layla Hassan (Maths and Physics, 4.9 stars, 38 reviews), Samir Patel (Coding and AI basics, 4.8, 27 reviews), Hannah Clarke (English, 4.9, 41 reviews), Youssef Nasser (Arabic, 4.7, 19 reviews), Mei Tanaka (Chemistry and Biology, 4.8, 22 reviews).
- Package: AED 20,000 including 5% VAT (AED 19,047.62 plus AED 952.38 VAT), 52 weekly lessons.
- Refund examples: no lessons taken, AED 20,000 back; 10 lessons taken, AED 16,153.85 back (42 unused lessons at about AED 384.62 each).
- Times: Dubai (GST, UTC+4) for Noor; a student in London sees the same lesson as "Tue 13:00 GMT".
- Sample review: "Dr Hassan made calculus finally click. Lessons are structured and she is always patient." Noor A., Maths.
- Sample chat: tutor: "Hi Noor! Looking forward to our first lesson on Tuesday." / Noor: "Thank you! Should I bring my past exam papers?"

## Brand direction

Name: "AI agency". Colours: blue and purple, shades and balance are yours to decide. No logo yet: create one. Feel: polished, modern SaaS, calm, friendly.

## System sheet

Every component (buttons, inputs, cards, badges, weekly time chips, chat bubbles, star rating, toasts, empty states, skeletons for loading) in every state, on one sheet.

## Order of work and review stops

1. Three options on three screens, then **stop for my choice**.
2. After I choose: design the remaining screens and all states, then the system sheet.
3. Handoff.

## What gets judged

The one question that matters most: **can a first-time student pick a tutor and pay in under a minute on a phone without any help?** Then: screen contracts, readable contrast, and no sideways scrolling at 390 wide.

## Send back

Step 1 goes into `design/options/`. After my choice, into `design/handoff/`: one `.dc.html` prototype per screen, a screenshot of each at 1440 and 390 wide, and a `README.md` written to the coding agent that implements it (Next.js). The README gives the tokens with exact values (colours, type sizes, spacing, radius, shadows), each screen's parts and states, how fonts are loaded (next/font with Google Fonts), the logo as SVG, and a short note on the choices and why.
