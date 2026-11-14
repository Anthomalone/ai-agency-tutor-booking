# AI agency: design handoff (Option B, Midnight Spark)

For the coding agent building the Next.js app. Anthony chose Option B on 2026-11-14. Every screen is a working HTML prototype in this folder: open it in a browser and use the **States** bar (bottom right) to see each state. Add `?state=<name>` to the address to open one directly, and `&shot=1` to hide the bar.

The screen contracts live in `docs/ux/screen-map.md`. This README covers how the screens look.

## Files

| File | Route | States (`?state=`) |
|---|---|---|
| `tutors.dc.html` | `/` | `default`, `loading`, `empty`, `error` |
| `tutor.dc.html` | `/tutors/[id]` | `default`, `signup` (sign-up sheet before checkout), `taken`, `booked` (message tutor), `empty` (no free times, no reviews), `loading`, `error` |
| `checkout.dc.html` | `/checkout` | `default`, `paying`, `failed` (payment failed), `paid` (confirmed), `loading`, `error` |
| `programme.dc.html` | `/programme` | `default`, `review` (leave a review), `cancel` (refund shown first), `cancelled` (refunded), `empty`, `loading`, `error` |
| `chat.dc.html` | `/chat/[id]` | `default`, `failed` (message failed), `empty`, `loading`, `error` |
| `tutor-area.dc.html` | `/tutor` | `default`, `add` (add a weekly time), `empty`, `loading`, `error` |
| `admin.dc.html` | `/admin` | `default`, `remove` (confirm), `removed` (tutor removed, students refunded), `empty`, `loading`, `error` |
| `auth.dc.html` | sign in, sign up | `signin`, `signup`, `error`, `loading` |
| `system.dc.html` | none | Every component in every state, plus tokens, type, spacing, icons |
| `ds.css` | none | The full stylesheet behind every prototype: the source of truth for values |
| `logo.svg`, `logo-on-dark.svg`, `logo-mark.svg` | none | Logo with the text as outlines (no font needed) |
| `img/*.svg` | none | Illustrated tutor portraits (sample data; real tutors can use photos cropped the same way) |
| `screens/` | none | `<screen>-<state>-1440.png` and `-390.png` for every state |

## Tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F7F6FD` | Page background |
| `--surface` | `#FFFFFF` | Cards, inputs, sheets |
| `--text` | `#120D35` | Text |
| `--muted` | `#5E5884` | Secondary text (6.1:1 on bg) |
| `--border` | `#E6E2F4` | Dividers, card edges |
| `--border-strong` | `#D3CDEA` | Input and chip borders |
| `--ink` | `#0D0930` | The dark "stage" behind headers, summary cards, toasts |
| `--ink-2` | `#1A1350` | Raised surface on ink |
| `--on-ink-muted` | `#B9B4DD` | Muted text on ink (9.7:1) |
| `--primary` | `#5B2EF0` | Violet: links, focus, selected |
| `--secondary` | `#2563FF` | Blue: second subject tag, gradient end |
| `--primary-soft` | `#EFEBFF` | Soft violet fills (text on it: `#4B22D6`) |
| `--secondary-soft` | `#E8F0FF` | Soft blue fills (text on it: `#1B4FD1`) |
| `--success` / `--success-soft` | `#0B7450` / `#E3F6EE` | Paid, refunded OK, VAT note |
| `--warning` / `--warning-soft` | `#A14A06` / `#FFF1E0` | Taken alert, refunded status, reported review |
| `--error` / `--error-soft` | `#C0204F` / `#FDE9EF` | Payment failed, danger buttons |
| `--star` | `#F5A524` | Star icons only, never text |
| `--grad` | `linear-gradient(100deg, #5B2EF0 0%, #4144F7 55%, #2563FF 100%)` | Only on the one primary button, the selected time chip and "my" chat bubbles |

The dark stage: `--ink` plus three radial glows (blue `rgba(37,99,255,.45)` top right, violet `rgba(91,46,240,.55)` bottom left, `rgba(124,92,255,.18)` centre), plus a 48 px grid of `rgba(255,255,255,.045)` lines that fades out downwards. See `.stage` in `ds.css`.

### Type

Two families, loaded with `next/font/google`:

```ts
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
export const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['600'], variable: '--disp' });
export const sans = DM_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--sans' });
```

| Style | Font | Size / line (desktop) | Phone | Tracking |
|---|---|---|---|---|
| H1 (list hero) | Bricolage 600 | 64 / 64 | 40 / 42 | -0.04em |
| H1 (other pages) | Bricolage 600 | 48 / 52 (tutor name 56 / 56) | 32 / 36 | -0.04em |
| H2 | Bricolage 600 | 28 / 32 (card titles 20 / 26) | same | -0.025em |
| Big number, price | Bricolage 600 | 48 / 52 (summary 36 / 40) | 40 / 44 | -0.035em |
| H3, names | DM Sans 600 | 17 / 24 | same | -0.01em |
| Body | DM Sans 400 | 16 / 24 | same | 0 |
| Small | DM Sans 400 | 14 / 20 | same | 0 |
| Caption, table heads | DM Sans 600 | 12 / 16, uppercase, 0.06em | same | |

Prices and times always use `font-variant-numeric: tabular-nums`. Inputs are 16 px so iPhone does not zoom.

### Spacing, radius, shadow

- Spacing: multiples of 4. Used steps: 4, 8, 12, 16, 20, 24, 28, 32, 40, 56, 64, 96. Page side padding 40 (phone 16). Max content width 1232.
- Radius: `6` tags, `10` buttons, inputs and chips, `14` rows and inner panels, `18` cards and sheets (`20` modals), `999` pills and avatars.
- Shadows:
  - `--sh-1`: `0 1px 0 rgba(18,13,53,.04), 0 1px 2px rgba(18,13,53,.06)` (rest)
  - `--sh-2`: `0 1px 2px rgba(18,13,53,.06), 0 8px 24px -8px rgba(18,13,53,.14)` (cards)
  - `--sh-3`: `0 24px 64px -16px rgba(13,9,48,.45)` (floating: summary card, toasts, glass preview)
  - Focus ring: `0 0 0 3px rgba(91,46,240,.32)` on every interactive element (`:focus-visible`)
- Motion: `cubic-bezier(.16,1,.3,1)`, 200 ms for hover, 250 ms for slide-ins, skeleton shimmer 1.6 s. Respect `prefers-reduced-motion` (already in `ds.css`).

### Icons

One set: Lucide (`lucide-react`), stroke 1.75, round caps. Sizes 14, 16, 18, 20. Names used: star, clock, calendar, check, arrow-right, search, message-square, send, shield-check, lock, globe, credit-card, wallet, repeat, user, users, plus, pencil, trash-2, eye-off, alert-triangle, info, x, menu, chevron-left/right/down, more-horizontal, inbox, award, book-open.

## Components (all shown in `system.dc.html`)

- **Button**: `.btn` height 48 (`-lg` 56, `-sm` 44), radius 10. Primary = gradient (only one per screen). Secondary = white with a 1 px `--border-strong` inset. Ghost on ink. Danger = `--error`. States: hover, focus ring, pressed (scale .985), loading (spinner + "Paying…"), disabled (`#ECEAF5` background, `#5E5884` text).
- **Input**: height 48, radius 10, label above (14 / 600). States: hover, focus (1.5 px violet + ring), filled, error (1.5 px `--error` + message with icon), disabled. Card fields are grouped in one box (`.cardbox`): use Stripe Elements styled to match.
- **Weekly time chip**: 48 tall (desktop week grid, 7 columns) or 2 per row (phone, under 7 day tabs). States: default, hover, focus, selected (gradient + lift), taken (grey, struck-through time, "Taken"), yours ("Yours").
- **Tutor row**: whole row is the link. Avatar 60 radius 14, name, one-line pitch, subject tags, rating, "next free time" pill, arrow. On hover a 3 px gradient bar slides in on the left and the arrow fills. On phone it becomes a stacked card.
- **Status pills**: Paid (green), Upcoming (violet), Done (grey), Refunded (amber), Cancelled (red).
- **Alerts** (ok, err, warn, info), **toasts** (on ink, bottom centre, full width on phone), **modals** (centre on desktop, bottom sheet on phone, buttons stack with the main action on top).
- **Empty and error states**: 72 px icon tile with a dashed halo, Bricolage title, one helpful sentence, at most one button.
- **Skeletons**: same shapes as the real content, shimmer from `#ECEAF5` to `#F6F5FB` (white at 8 to 16% on ink).
- **Chat bubbles**: theirs white with a border, mine gradient; failed = white with a red outline and "Not sent · Tap to retry".

## Screens: parts and rules

Every page starts with the ink stage (header plus hero). The main content sits in white cards that overlap the stage by 80 px (`.lift`).

1. **`/` Tutor list**: hero (kicker, H1, price line with "AED 20,000, 5% VAT included", floating glass preview of a booked programme). The board below has a segmented subject filter, search and the tutor rows, with a footer repeating the one price. The primary action is opening a tutor (the rows), so there is no filled button.
2. **`/tutors/[id]` Tutor page**: hero with portrait (gradient ring), name, tags and stat tiles. Left column: "Choose a weekly time" (week grid, legend, "Times in GST (UTC+4)" chip), About, Reviews. Right: sticky ink summary card with the chosen time, first lesson, price, and the primary **"Choose Tue 17:00 GST"**. On phone the summary becomes a sticky ink bar at the bottom. If the student is signed out, the button opens the **sign-up sheet** over the page (`?state=signup`), not a new page, so home to paid stays at 3 screens.
3. **`/checkout`**: split screen. Left (ink): change-time link, "Your year with…", tutor, a 52-tick year dial, weekly time, first and last lesson, refund rule. Right (white): price with VAT badge, breakdown (AED 19,047.62 + AED 952.38 VAT = AED 20,000.00), card fields, primary **"Pay AED 20,000"**. Failed: red alert ("Nothing was charged and nothing is booked") and an error on the card field. Paid: full ink confirmation with a check ring, summary, "See my programme" (primary) and "Message your tutor".
4. **`/programme`**: hero with a glass "Next lesson" card holding the primary **"Message your tutor"**. Below: upcoming lessons, past lessons ("Leave a review" on the newest unreviewed one), and a programme card (10 of 52 ticks, dates, paid amount, "Cancel programme"). The cancel sheet shows the refund maths before confirming: 10 taken, 42 × AED 384.62 = AED 16,153.85.
5. **`/chat/[id]`**: one conversation card filling the viewport height. Header with the tutor and weekly time; day separators name the zone ("Today · Mon 1 Feb 2027 · GST"); composer with the primary **Send** (icon only on phone). Desktop side panel: next lesson.
6. **`/tutor`**: hero greeting, stat tiles and the primary **"Add a weekly time"** (opens a sheet: day, time in GST, info line showing how a London student sees it). Week grid of blocks (booked with the student's name, free with a remove button). On phone it becomes a list. Side: upcoming lessons with chat buttons, my students.
7. **`/admin`**: hero with the primary **"Add a tutor"**, 4 KPI cards (active programmes, payments today, paid in total, tutors and students), programmes table (status and amount), tutors table (edit, remove), payments today, recent reviews with "Hide". Remove opens a confirm sheet listing each affected student and their refund. Afterwards there is a success alert and the programme shows as Refunded.
8. **Sign in and sign up**: split (ink brand panel with a review quote, white form). Error: red alert plus red fields. Loading: spinner button and disabled fields.

## Rules from the brief, as built

- One gradient (primary) button per screen and state. Everything else is secondary, ghost or a link.
- "AED 20,000" always has "5% VAT included" beside it. Every lesson time names its zone (GST; a London student would see GMT).
- No sideways scrolling at 390 (measured on every screenshot). Tap targets 44 × 44 or more.
- Contrast: every text pair is 4.5:1 or more (measured). Star yellow is used for icons only.
- 2 families, at most 2 weights each (Bricolage 600; DM Sans 400 and 600).
- Home to paid: tutor list → tutor page (with sign-up sheet if needed) → checkout. 3 screens.

## Sample data used (fictional)

Students: Noor Al Mansoori, Omar Haddad, Aisha Khan, Rania Saeed, Zayd Khoury. Tutors: Dr Layla Hassan, Samir Patel, Hannah Clarke, Youssef Nasser, Mei Tanaka. "Today" in the dashboards is Mon 1 Feb 2027 (Noor has taken 10 of 52 lessons). The admin example removes Youssef, which refunds Aisha AED 18,461.54 (48 unused lessons). Card numbers shown are Stripe test cards.

## Why this direction

Midnight Spark looks like a confident modern product a student would show their friends, while the ink stage frames the moments that matter (the tutor, your weekly time, the price). The violet-to-blue gradient is rationed to the one next step on each screen, so a first-time student on a phone always knows what to tap.
