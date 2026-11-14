# Lane brief: Design

Written by Anthony (owner) for the Design lane. This lane designs; it writes no app code.

| Field | Value |
|---|---|
| Lane name | Design (restarted 2026-11-14 on Opus 5.5; the first round was wiped) |
| Goal | Anthony can look at three polished SaaS design options for AI agency, choose one, and then get a complete handoff the coding lanes build from |
| Features | F18 (polished look, blue and purple, logo), and the look of every screen behind F1 to F17 |
| Worktree and branch | None yet: the project is not a git repo. Design files go into the project folder and into the first commit |
| Starting point | The project folder as it is now: `docs/prd.md`, `docs/feature-list.md`, `docs/ux/screen-map.md`, `design/brief.md` |
| Allowed files and folders | `design/**`, and `plans/design-*.md` |
| Do not touch | `docs/prd.md`, `docs/feature-list.md`, `docs/ux/screen-map.md`, `CLAUDE.md`, and any app code (there is none yet). If a screen contract looks wrong, ask |
| Builds on | `design/brief.md` and `docs/ux/screen-map.md` |
| Dev server port | none |
| Depends on / blocks | Depends on nothing. Blocks the coding lanes: they start after the handoff is in `design/handoff/` |

## Done means

- [ ] `design/options/` has `option-a/`, `option-b/`, `option-c/` and a `README.md` comparing them in one table.
- [ ] Each option shows the tutor list, the tutor page and checkout at 390 and 1440 wide, with colours (exact values), fonts, a logo and the components listed in `design/brief.md`.
- [ ] The three options look clearly different from each other, and all three are in the blue and purple family.
- [ ] **Stopped and waited for Anthony to choose one option** before designing the rest.
- [ ] After the choice: all seven screens plus sign in and sign up, each with every state in `docs/ux/screen-map.md`.
- [ ] A system sheet with every component in every state.
- [ ] `design/handoff/` has one `.dc.html` per screen, a screenshot of each at 390 and 1440 wide, the logo as SVG, and a `README.md` for the coding agent with exact tokens.
- [ ] Every rule in `design/brief.md` ("Rules that cannot bend") passes on the screenshots.

## Checks to run before reporting

Look at every screenshot at 390 and 1440 wide: no sideways scroll, contrast at least 4.5 to 1, one primary action per screen, the price and time zone shown as the brief says. Then report.

## How to report

Tell Anthony in plain words, in this format:

```text
STATUS: OPTIONS READY | DONE | BLOCKED | QUESTION
Look at: design/options/README.md (or design/handoff/README.md)
Rules from the brief that fail: none | <list>
Files changed outside my allowed list: none
My recommendation: <which option and why, in one line>
```

## When to stop and ask instead of guessing

- A screen contract in `docs/ux/screen-map.md` seems wrong or two screens conflict.
- You want to change the price wording, the product name or the brand colour family (blue and purple).
- You are about to design something not in the screen map.
- The same error happens 3 times.
