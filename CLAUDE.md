# Crate. — Project Intelligence & Brand Rules

This file is read at the start of every session. Follow everything here 
automatically when building, editing, or refining any part of this app.

---

## Who This App Is For

Passionate but overwhelmed aspiring DJs transitioning from passive listeners 
to active creators. They are not beginners to music — they are beginners to 
performing it. Speak to their intelligence.

---

## Brand Voice — Always Apply This

**Archetype:** The Sage + The Buddy. Expert who sits next to you on the 
studio couch.

**Voice:** Knowledgeable, relaxed, encouraging, authentic. Never corporate. 
Never patronising.

**Tone shifts by context:**
- Instruction/learning: Patient, precise. ("Start your blend on bar 1. 
  Always.")
- Error/retry states: Reassuring, not discouraging. ("Tricky transition. 
  Let's try that again.")
- Success/completion: Hype, celebratory, brief. ("7-day streak. Your sound 
  is locking in.")
- Empty states: Actionable, not generic. ("No tracks yet — your library 
  starts with one good pull.")

**Never write:**
- Filler phrases: "Great job!", "Well done!", "Amazing!"
- Corporate UI copy: "Please enter a valid input"
- Overly casual: "Hey there 👋"
- Jargon without context

---

## Visual Identity — Always Apply This

### Logo
- Logo asset: `/public/assets/logo.svg` — reference as `src="/dj-training/assets/logo.svg"` 
  in JSX (the `/dj-training/` prefix is required for GitHub Pages). Never recreate in code.

### Colours
Use CSS variables defined in the global stylesheet. Never hardcode hex 
values in components.

| Variable              | Hex       | Usage                                           |
|-----------------------|-----------|-------------------------------------------------|
| --color-bg            | #0B0D17   | Main app background. Never pure black.          |
| --color-surface       | #1A1D2D   | Cards, modals, drill containers, bottom sheets  |
| --color-accent        | #6366F1   | Primary buttons, active states, logo, CTAs      |
| --color-success       | #00E5FF   | Progress bars, streaks, success states only     |
| --color-text          | #F3F4F6   | All primary headings and body text              |
| --color-muted         | #9CA3AF   | Secondary text, hints, inactive icons           |

**Colour rules:**
- Never use pure black (#000) or pure white (#FFF)
- --color-success (cyan) is for success/progress only — never for 
  decorative use
- --color-accent (indigo) is the primary interactive colour
- Backgrounds layer: bg → surface → elevated surface (add 
  rgba(255,255,255,0.04) per level)

### Typography
Fonts are loaded in `index.html` via two CDNs:
- **Google Fonts**: `family=Outfit:wght@700;800`
- **Fontshare**: `https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap`

| Role                  | Font    | Weight         | CSS Variable    |
|-----------------------|---------|----------------|-----------------|
| Headings & wordmark   | Outfit  | Bold (700) or ExtraBold (800) | `var(--font-heading)` |
| Body copy & UI text   | Satoshi | Regular (400) or Medium (500) | `var(--font-sans)` |
| Code/mono/labels      | System monospace stack | — | `var(--font-mono)` |

**Never use serif fonts. Never use system fonts for branded elements.**

### Spacing & Shape
- Base unit: 4px. All spacing in multiples of 4 (use `--sp-*` tokens).
- Border radius: 8px for cards (`--r`), 6px for buttons (`--r-sm`), 14px for large panels (`--r-lg`)
- Shadows: use rgba(0,0,0,0.4) — never hard shadows

### Component Patterns
- **Cards:** `background: var(--surface); border: 1px solid rgba(255,255,255,.06); border-radius: var(--r-lg)`
- **Card hover:** `border-color: rgba(255,255,255,.12); box-shadow: 0 4px 24px rgba(0,0,0,.4); transform: translateY(-1px)` — no accent glow on generic cards
- **Buttons (primary):** `background: var(--accent); color: var(--text); font-weight: 600; border-radius: var(--r-sm); hover: filter: brightness(1.1)`
- **Buttons (ghost):** transparent, border `1px solid rgba(255,255,255,.15)`, hover: `background rgba(255,255,255,.06)`
- **Active sidebar item:** `border-left: 2px solid var(--accent); background: rgba(99,102,241,.08); color: var(--text)`
- **Hover sidebar item:** `background: rgba(255,255,255,.05); transition: 150ms ease` — no green/coloured highlights
- **Progress/streaks:** always use `var(--success)` (cyan), never indigo
- **Section labels (sidebar):** `color: var(--muted2); font-size: 10px; letter-spacing: .1em; text-transform: uppercase`
- **Eyebrow labels:** `font-family: var(--font-mono); font-size: var(--fs-2xs); letter-spacing: .08em; color: var(--accent); text-transform: uppercase`

---

## App Name & Logo

- App name: **Crate.** — always written with the period. Never "Crate" 
  without it.
- Logo: indigo + cyan mark with wordmark in Outfit ExtraBold
- Do not recreate the logo in code — reference the existing logo asset

---

## What To Do When Building Anything New

1. Use the colour variables above — never hardcode hex
2. Use Outfit for any new headings, Inter for body/UI text
3. Match the card and button patterns above exactly
4. Write all UI copy in Sage+Buddy voice — check the tone shift table
5. If adding a success state, use `var(--success)` (cyan)
6. If adding an empty state, make the copy actionable and specific
7. Never add a new font, colour, or shadow style not listed here
8. Check existing components for patterns before creating new ones — reuse first

---

## Tech Stack

- React 18 + Vite 5 + Tailwind CSS 3 + Radix UI primitives + Framer Motion
- Hash-based routing (`location.hash`) — no router library
- `useLocal(key, default)` hook (in `src/visualizers.jsx`) for localStorage sync
- `djpath_profile` localStorage key: `{ archetype, bpmHome, detectedFrom, confirmedAt }` — absent triggers onboarding
- 5 archetype profiles in `src/profiles.js`; `ProfileContext` + `useProfile()` in `src/ProfileContext.jsx`
- Path alias: `@/` → `src/`
- Last.fm API for archetype detection — key constant in `src/onboarding.jsx`
- Deployed to GitHub Pages at `/dj-training/` via GitHub Actions
