# Feature list: AI agency (tutor booking app)

Source: `docs/prd.md`. One row per feature, in build order: data first, then the screens that use it.

## Features

| ID | Feature (what a person can do or see) | Done check | Version | Status |
|---|---|---|---|---|
| F1 | Sample tutors and their weekly free times exist in the database | I open the app and see at least 5 sample tutors, each with weekly free times | v1 | not started |
| F2 | I can sign up, sign in and sign out with my email | I create an account, sign out, sign in again and see my name in the top corner | v1 | not started |
| F3 | I can browse the business's tutors and open a tutor's page | I tap a tutor in the list and see their subjects, bio, rating and free weekly times | v1 | not started |
| F4 | Times show in my own time zone | I change my device's time zone and the same lesson shows at the matching local time | v1 | not started |
| F5 | I can choose a tutor and a weekly time and see my year programme before paying | I pick Tuesday 5pm, and see "52 weekly lessons, first on <date>, last on <date>, price 20,000 AED incl. VAT" | v1 | not started |
| F6 | A weekly time with a tutor can only be taken by one student | After I book Tuesday 5pm, a second account sees that time as taken and cannot pick it | v1 | not started |
| F7 | I pay for the package in the app and the booking is confirmed straight away | I pay with a Stripe test card and see "Booked"; if payment fails nothing is booked and the time stays free | v1 | not started |
| F8 | I can see my programme and upcoming lessons | "My programme" lists my next lessons with date, local time and tutor | v1 | not started |
| F9 | I can cancel my programme and get a refund | I cancel with no lessons taken and see a full refund of 20,000 AED before confirming; after some lessons I see the smaller amount (about 384.62 AED per unused lesson); afterwards the refund shows as refunded in Stripe test mode and the weekly time is free again | v1 | not started |
| F10 | Student and tutor get an email when a programme is booked or cancelled | I book and cancel and both inboxes get an email each time | v1 | not started |
| F11 | As a tutor, I can set my weekly free times and see my students and lessons | I add a weekly time and a student sees it; after a student books, I see them and their lessons | v1 | not started |
| F12 | I can chat with my tutor (as a student), or with my students (as a tutor) | I send a message from one account and it appears on the other within 2 seconds, without refreshing | v1 | not started |
| F13 | After a lesson, a student can leave a star rating and a short review | After a lesson's time has passed, I give 4 stars and a comment, and they show on the tutor's page with the average rating | v1 | not started |
| F14 | Admin area: the owner signs in and sees a dashboard (programmes, payments, tutors, students) | I sign in as owner and see programmes, total paid, and lists of tutors and students; a student or tutor account cannot open this area | v1 | not started |
| F15 | Admin area: the owner can add, edit and remove tutors | I add a tutor and they show in the public list; I remove one with students and they disappear, and their students' programmes are cancelled and refunded | v1 | not started |
| F16 | Admin area: the owner can see and cancel any programme, and see each payment's status | I open a programme, see it is Paid, and cancel it; the student is refunded and the weekly time is free | v1 | not started |
| F17 | Admin area: the owner can hide an inappropriate review | I hide a review and it no longer shows on the tutor's page | v1 | not started |
| F18 | The app looks polished, in blue and purple, and works on a phone | On a phone-width screen I can go from home page to a paid programme and a chat message with no sideways scrolling, every button is easy to tap, the colours are blue and purple, and the AI agency logo shows in the top corner | v1 | not started |
| F19 | Rescheduling a single lesson | Later | later | not started |
| F20 | Other package lengths (for example 3 months) | Later | later | not started |

Rules:

- v1 is the must-haves and nothing else. Nice-to-haves are "later". Out-of-scope items are not listed.
- Status is one of: not started, in progress, done (merged to main).
- Price (20,000 AED incl. VAT) and the refund rule are decided. The logo is created in /design-brief.

## Later

- Video call link for each lesson.
- Reminders before a lesson.
- Multiple languages.
- Sending files and photos in chat.
