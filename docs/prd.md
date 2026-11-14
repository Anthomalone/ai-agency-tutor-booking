# PRD: AI agency (tutor booking app)

For: Anthony's tutoring business. The app is called "AI agency". Written: 2026-11-14, updated with answers the same day. Source: my own idea plus Anthony's answers to the open questions.

## The client

A tutoring business that gives lessons to students. The business has its own tutors; it is not an open marketplace.

## The problem

Booking a tutor usually means messages back and forth to find a time and then arranging payment separately. The app should let a student pick a tutor and a weekly time, pay once, and be set for a year, with nothing to learn.

## Who uses it

- **Student (or parent):** picks a tutor and a weekly lesson time, buys the year package, gets confirmation emails, sees their lessons, chats with their tutor, reviews them, and can cancel for a refund.
- **Tutor:** sets their weekly free times, sees their students and lessons, and chats with their students.
- **Business owner (Anthony):** uses the admin area to run the business: adds, edits and removes tutors, sees every programme and payment, cancels any programme, and hides inappropriate reviews. (Tutors do not sign themselves up.)

## What it must do

1. A student can sign up and sign in with email.
2. A student can browse the business's tutors and open a tutor's page (subjects, short bio, free weekly times, rating, reviews).
3. The product is a **year-long programme**: weekly lessons with one tutor, at the same weekly time, for a year (52 lessons). The student picks a tutor and a weekly time, and the booking is confirmed straight away, with no tutor approval. That weekly time is then taken for that year.
4. The student buys the programme as **one package at one price for all**: **20,000 AED, 5% VAT included** (same price for every tutor), paid in the app (Stripe, test mode first). The booking only counts if payment goes through.
5. A student and the tutor each get an email when a programme is booked or cancelled.
6. A student can see their programme and upcoming lessons, and cancel the programme. Cancelling gives a **refund**: a full refund if no lesson has been taken, otherwise a refund for the lessons not yet taken (20,000 AED divided by 52 lessons, about 384.62 AED per unused lesson). If the owner removes a tutor, that tutor's students' programmes are cancelled and refunded.
7. A tutor can set their weekly free times and see their students and upcoming lessons.
8. Times are shown in each person's own time zone.
9. A student and their tutor can chat inside the app.
10. After a lesson, a student can leave a star rating and a short review for the tutor.
11. An admin area for the business owner: a dashboard (programmes, payments, tutors, students), add, edit and remove tutors, see and cancel any programme, and hide an inappropriate review.
12. The whole app looks polished and works well on a phone, in a **blue and purple** look.

## How the client will judge it

- I can pick a tutor and a weekly time, pay, and be booked for the year in under a minute, on my phone, with no instructions.
- Two people cannot get the same tutor at the same weekly time.
- A student in another country sees the correct local time for each lesson.
- Cancelling gives the student a refund.
- It looks clean and friendly, in blue and purple, not like a form.

## Constraints

- Web app that works on phone and desktop.
- Built with Next.js, Supabase, Vercel and GitHub. Payments with Stripe in test mode (no real money until Anthony says).
- Money in AED. One package price for all tutors: 20,000 AED including 5% VAT.
- All times stored in one standard time (UTC) and shown in the viewer's local time zone.
- App name: "AI agency". Brand colours: blue and purple. No logo yet: one is to be created in the design step (/design-brief).

## Not in this version

No out-of-scope list was given. Until Anthony says otherwise, v1 leaves out: video calls, sending files or photos in chat, reminder messages before a lesson, multiple languages, tutors signing themselves up, choosing other package lengths (only the year package), rescheduling a single lesson. (Payments, reviews, chat, an admin area, the year programme and refunds were added to v1 at Anthony's request on 2026-11-14.)

## Data

Stored in Supabase: user accounts, tutor profiles (name, subjects, bio), weekly availability, programmes, lessons, payments (status and Stripe reference), chat messages, reviews. Card details are never stored by us; Stripe holds them. First data is made-up sample tutors and slots (no real people's details).

## Open questions

1. Is the refund for part-used programmes exactly 20,000 AED divided by 52 per unused lesson, with no fee? (Assumed yes.)
2. Chat: only between a student and their own tutor. (Assumed yes.)
3. Reviews: only students who finished a lesson with that tutor, one review per lesson. (Assumed yes.)
4. Admin area: is the list in must-have 11 all you want, or anything else (moderating chat, exporting reports)?
5. Do the 52 lessons start on a date the student picks? (Assumed yes, on the first matching weekday.)
6. App language: English only for now? (Assumed yes.)
