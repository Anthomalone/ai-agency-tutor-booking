# AI agency: three design options

Step 1 of the design brief (`design/brief.md`). Three complete directions, each shown on the tutor list (`/`), the tutor page (`/tutors/[id]`) and checkout, at 1440 wide (desktop) and 390 wide (phone). **Anthony chose Option B (Midnight Spark) on 2026-11-14.** The full design is in `design/handoff/`.

**Start here:** open `compare.html` in a browser. Use the buttons at the top to switch screen (Tutor list, Tutor page, Checkout, Identity) and width (Desktop, Phone).

## The three options at a glance

| | A · Clear Day | B · Midnight Spark (recommended) | C · Lilac Cloud |
|---|---|---|---|
| Mood | Calm · trusted · refined | Bold · modern · sharp | Soft · friendly · warm |
| Background | `#F6F7FB` | `#F7F6FD` (+ ink panels `#0D0930`) | `#F6F3FF` |
| Surface | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Text | `#0F1634` | `#120D35` | `#251B4F` |
| Muted text | `#586089` | `#5E5884` | `#675E8E` |
| Border | `#E2E5F0` | `#E6E2F4` | `#E8E1FA` |
| Primary | `#2F4FE0` cobalt | `#5B2EF0` violet, gradient to `#2563FF` | `#4B57E6` periwinkle |
| Secondary (accent) | `#7455EA` violet | `#2563FF` electric blue | `#9D7BFF` lavender (text: `#6E46D9`) |
| Success | `#0F7B55` | `#0B7450` | `#16764E` |
| Warning | `#9A5B00` | `#A14A06` | `#A35F0A` |
| Error | `#C0264A` | `#C0204F` | `#BA2A4C` |
| Fonts | Fraunces 500 (headings, prices) + Inter 400/600 | Bricolage Grotesque 600 (headings) + DM Sans 400/600 | Plus Jakarta Sans 400/700 + Instrument Serif italic (accent words) |
| Type sizes | H1 48/52 (phone 32/38), H2 28/36, H3 18/26, body 16/26, small 14/20, caption 12/16 | H1 64/64 (phone 40/42), H2 28/32, H3 17/24, body 16/24, small 14/20, caption 12/16 | H1 56/60 (phone 36/42), H2 24/32, H3 18/24, body 16/26, small 14/20, caption 12/16 |
| Radius | 6 · 10 · 16 · full | 6 · 10 · 14 · full | 12 · 20 · 28 · full |
| Logo | Gradient square with an "A" and a spark | Two overlapping circles (blue and violet) | Chat bubble with a lowercase "a" |
| Tutor list | Photo cards in a 3-column grid; list rows on phone | A clean table of tutors under a dark hero | Big rounded cards; 2 across on phone |
| Weekly time picker | One row per day | Week calendar; day tabs on phone | Day tabs, then that day's times |
| Checkout | Summary with a 52-lesson dot strip, card form beside it | Split screen: dark "year dial", white payment side | One centred sheet with lessons-per-month bars |
| Why | Feels like a well-run school office: quiet and serious about money, which reassures the parent paying. Serif adds warmth and expertise. Tutors' faces stay the hero. | Feels like a product a student would show friends. Dark panels frame the key moments (tutor, time, price). The gradient appears only on the one main button and the chosen time. | Gentle and kind, so a big decision feels easy. Feels personal, like a small team. One periwinkle button and a dark bar on phones keep "Pay" obvious. |

## What is in each folder

- `index.html`: the identity sheet: logo, colours with exact values, fonts, components (primary, secondary and disabled buttons, input, badges, tutor card, weekly time chip in default, selected and taken), and the three-line "why".
- `tutors.html`, `tutor.html`, `checkout.html`: the three screens as working HTML mock-ups (they resize from phone to desktop; time chips can be clicked).
- `logo.svg` (mark and wordmark, text turned into shapes) and `logo-mark.svg`.
- `img/`: the illustrated tutor portraits.
- `screens/`: screenshots of every page at 1440 and 390 wide.

## Checks done on the screenshots

- No sideways scrolling at 390 wide on any page (page width measured at exactly 390).
- Tap targets 44 px or more (buttons, chips, filters, links).
- Text contrast 4.5 to 1 or more for every text colour pair used (measured; a few greys were darkened to pass).
- One primary button per screen: "Choose Tue 17:00 GST" on the tutor page, "Pay AED 20,000" at checkout. The tutor list has no filled button: the tutor cards are the action.
- The price always reads "AED 20,000" with "5% VAT included" next to it, and every lesson time names the time zone (GST).
- Home to paid in 3 screens: tutor list, tutor page, checkout.
- At most two font families per option, at most two weights of each per screen; spacing in multiples of 4 px.

## Not designed yet (after the choice)

`/programme`, `/chat/[id]`, `/tutor`, `/admin`, sign in and sign up, every empty, loading and error state, and the full system sheet. The tutor portraits are illustrations made for these mock-ups; the real app can use the same style or real photos.
