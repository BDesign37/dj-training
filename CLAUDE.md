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
- Logo asset: `/public/assets/logo.svg` — reference as `src="/assets/logo.svg"` 
  in JSX. Never recreate in code.

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
Import from Google Fonts at the top of the CSS entry point if not already 
present:
`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Inter:wght@400;500&display=swap');`

| Role                  | Font    | Weight         |
|-----------------------|---------|----------------|
| Headings & wordmark   | Outfit  | Bold (700) or ExtraBold (800) |
| Body copy & UI text   | Inter   | Regular (400) or Medium (500) |

**Never use serif fonts. Never use system fonts for branded elements.**

### Spacing & Shape
- Base unit: 4px. All spacing in multiples of 4.
- Border radius: 8px for cards, 6px for buttons, 4px for small elements
- Shadows: use rgba(0,0,0,0.4) — never hard shadows

### Component Patterns
- **Cards:** background --color-surface, border 1px solid 
  rgba(255,255,255,0.06), border-radius 8px
- **Buttons (primary):** background --color-accent, color --color-text, 
  no border, hover: brightness(1.1), transition 150ms ease
- **Buttons (ghost):** transparent background, border 1px solid 
  rgba(255,255,255,0.15), hover: background rgba(255,255,255,0.06)
- **Active sidebar item:** left border 2px solid --color-accent, 
  background rgba(99,102,241,0.08), text --color-text
- **Hover sidebar item:** background rgba(255,255,255,0.05), 
  transition 150ms ease. No green highlights.
- **Progress/streaks:** always use --color-success (cyan), never indigo
- **Section labels (sidebar):** --color-muted, font-size 10px, 
  letter-spacing 0.1em, uppercase

---

## App Name & Logo

- App name: **Crate.** — always written with the period. Never "Crate" 
  without it.
- Logo: indigo + cyan mark with wordmark in Outfit ExtraBold
- Do not recreate the logo in code — reference the existing logo asset

---

## Community & Gamification Language

- User groups are called **Tribes**, not teams, groups, or communities
- Tribes are based on Sound Identity archetype
- Leaderboards are anonymous by default
- Streak completions trigger a sonic mnemonic (2–3 second audio cue) — 
  always hook into the existing completion event when building drill 
  components

---

## What To Do When Building Anything New

1. Use the colour variables above — never hardcode hex
2. Use Outfit for any new headings, Inter for body/UI text
3. Match the card and button patterns above exactly
4. Write all UI copy in Sage+Buddy voice — check the tone shift table
5. If adding a success state, use --color-success and trigger the 
   completion audio event
6. If adding an empty state, make the copy actionable and specific
7. Never add a new font, colour, or shadow style not listed here
8. Check existing components for patterns before creating new ones — 
   reuse first

---

## Tech Stack (for reference)
- React + JSX
- CSS variables for theming (defined in global stylesheet)
- localStorage for user profile persistence (`djpath_profile`)
- Last.fm API for archetype detection (no runtime AI calls)
- Profiles config: `src/profiles.js`
- Deployed via GitHub Pages with GitHub Actions build step

echo "CLAUDE.md" >> .gitignore
