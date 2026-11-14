# Screen map: AI agency (tutor booking app)

One row per screen. Each screen is judged against its row, on a screenshot of the running app. v1 has 7 screens (one more than the usual 3 to 6, because the admin area is a screen of its own). Sign in and sign up are simple forms that follow the same style and are not listed.

| Route | Type | User | Job (one line) | Main content (must stand out) | Primary action (exactly one) | Other actions | States |
|---|---|---|---|---|---|---|---|
| `/` | list | Student | Find the right tutor | Tutor cards: photo, name, subjects, star rating | Open a tutor | Filter by subject, sign in | empty (no tutors yet), loading, error |
| `/tutors/[id]` | detail | Student | Decide if this tutor is the one, and pick a weekly time | The tutor's weekly free times and rating | Choose a weekly time | Read reviews, message tutor (if booked) | empty (no free times, no reviews yet), loading, error, taken (a time was just taken) |
| `/checkout` | form | Student | Review the year programme and pay once | The programme summary and the price: AED 20,000, 5% VAT included | Pay AED 20,000 | Change the weekly time, go back | loading, error, payment failed, paid (confirmed) |
| `/programme` | dashboard | Student | See my lessons and manage my programme | The next lesson (date, local time, tutor) | Message my tutor | Leave a review after a lesson, cancel programme (shows refund amount first) | empty (no programme yet), loading, error, cancelled (refunded) |
| `/chat/[id]` | detail | Student, Tutor | Talk with my tutor or my student | The conversation | Send message | Go back | empty (no messages yet), loading, error, message failed |
| `/tutor` | dashboard | Tutor | Set my weekly times and see my students | My weekly free times and my upcoming lessons | Add a weekly time | Open a student's chat, remove a weekly time | empty (no times, no students yet), loading, error |
| `/admin` | dashboard | Owner | Run the business | Programmes and payments today, with totals | Add a tutor | Edit or remove a tutor, cancel a programme, hide a review | empty (no programmes yet), loading, error, tutor-removed (students refunded) |

Rules:

- Job is what the user gets done on this screen, not what the screen shows.
- Exactly one primary action per screen.
- Every lesson time shows in the viewer's own time zone, with the zone named (for example "Tue 17:00 GST").

## Users and access

- **Student (or parent):** signs in with email. Can reach `/`, `/tutors/[id]`, `/checkout`, `/programme`, `/chat/[id]` (only their own tutor).
- **Tutor:** signs in with email, account created by the owner. Can reach `/tutor` and `/chat/[id]` (only their own students).
- **Owner:** signs in with email. Can reach `/admin` and everything else. Students and tutors cannot open `/admin`.
