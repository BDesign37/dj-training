# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (http://localhost:5173/dj-training/)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

No test runner is configured. Lint is not configured. Type-checking is via `@types/react` — run `npx tsc --noEmit` if needed.

## Architecture

**Stack**: React 18 + Vite 5 + Tailwind CSS 3 + Radix UI primitives + Framer Motion. Deployed to GitHub Pages at `/dj-training/` (configured via `base` in `vite.config.js`).

**Routing**: Hash-based (`location.hash`). `#home` renders the overview. Any other hash matching a chapter `id` renders that chapter. No router library.

**State**:
- `useLocal(key, default)` — localStorage sync hook defined in `src/visualizers.jsx`
- `chapter-completion` key: `{ [chapterId]: boolean }`
- `djpath_profile` key: `{ archetype, bpmHome, detectedFrom, confirmedAt }` — absent = trigger onboarding

**Profile system**: `src/profiles.js` exports `PROFILES` with 5 archetype keys. `ProfileContext` (in `src/ProfileContext.jsx`) provides active profile to all chapters via `useProfile()`. The context is populated from `djpath_profile` localStorage in `src/app.jsx`. Archetypes: `israeli-progressive`, `dark-forest`, `full-on`, `melodic-techno`, `nitzhonot`.

**Chapters**: `CHAPTERS` array in `src/chapters.jsx`. Each entry: `{ id, title, short, eyebrow, subtitle, phase, Comp }`. Phase values: `Foundation`, `Theory`, `Craft`, `Practice`. Rendered as `<Comp />` with no props — chapters read profile via `useProfile()`.

**Onboarding**: 3-step modal in `src/onboarding.jsx`. Step 1 collects artist names; Step 2 fetches Last.fm tags (`artist.getTopTags`); Step 3 shows archetype result + override. Last.fm key stored as a constant (`LASTFM_KEY`) in that file.

**Visualizers**: All interactive components in `src/visualizers.jsx`. Animation uses `requestAnimationFrame` at 1.6 bars/sec. Key exports: `useLocal`, `BPMZones`, `PhraseCounter`, `MixTimeline`, and 6 mixing technique walkthroughs.

**Aceternity components**: `src/components/aceternity/` — `BackgroundBeams`, `SpotlightCard`, `ShimmerBorder`, `MovingBorder`.

**Path alias**: `@/` → `src/` (configured in `vite.config.js` and `tailwind.config.js`).

---

## Brand Guidelines

### App name
**Crate.** — always with the period. Use "Crate." in all UI chrome. Do not use "DJ Path" anywhere.

### Logo
Render `/assets/logo.svg` in the sidebar wordmark. The SVG file lives at `public/assets/logo.svg`.

### Colours
All colours must come from CSS variables defined in `src/index.css`. Never use hardcoded hex values in components or inline styles.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#121212` | Page background |
| `--surface` | `#181818` | Cards, panels |
| `--sidebar` | `#000000` | Sidebar background |
| `--gold` | `#1db954` | Primary accent (green kept as `--gold` for cascade compat) |
| `--text` | `#ffffff` | Primary text |
| `--text-dim` | `#b3b3b3` | Secondary text |
| `--muted` | `#8a8a8a` | Tertiary/label text |
| `--border` | `#282828` | Default borders |
| `--border2` | `#3e3e3e` | Raised borders |
| `--accent1` | `#9b6de0` | Purple accent |
| `--accent2` | `#5b9bd5` | Blue accent |
| `--accent3` | `#d45b8a` | Pink accent |

### Typography
- **Headings** (`h1`, `h2`, `h3`, `.ch-title`, `.hero-title`, `.ob-title`): **Outfit** Bold (700) / ExtraBold (800) — `var(--font-heading)`
- **Body / UI text**: **Inter** Regular (400) / Medium (500) — `var(--font-sans)`
- **Monospace** (labels, eyebrows, numbers, code): **system monospace stack** — `var(--font-mono)` (unchanged)

Both fonts imported from Google Fonts in `index.html`.

```css
--font-heading: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
--font-sans:    'Inter',  -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Sidebar states
- **Default**: `color: var(--muted)`, `background: none`
- **Hover**: `color: var(--text-dim)`, `background: rgba(255,255,255,.06)` — **no green tint**
- **Active**: `color: var(--text)`, `font-weight: 500`, `border-left: 2px solid var(--gold)`, `background: rgba(255,255,255,.08)` — left accent border is the active indicator

### Component patterns
- **Card**: `background: var(--surface); border: 1px solid rgba(255,255,255,.07); border-radius: var(--r-lg);`
- **Card hover**: `border-color: rgba(255,255,255,.12); box-shadow: 0 4px 24px rgba(0,0,0,.4); transform: translateY(-1px)` — no green glow on generic cards
- **Primary button** (`.btn-primary`): `background: var(--gold); color: #000; font-weight: 600`
- **Ghost button**: transparent, subtle border, text only
- **Eyebrow labels**: `font-family: var(--font-mono); font-size: var(--fs-2xs); letter-spacing: .08em; color: var(--gold); text-transform: uppercase`
- **Section labels in sidebar**: same eyebrow style, `color: var(--muted2)`

---

## Voice: Sage + Buddy

The app speaks with a single consistent voice: **a knowledgeable friend who has already been through this journey** — not a teacher, not a product, not a hype machine.

**Core tone**: Direct. Warm. Specific. Never corporate. Never over-encouraging.

| Context | Tone shift | Example |
|---|---|---|
| Instructional | Calm, expert. State the principle, then the action. | "Press CUE to set your hot cue. Then hit PLAY." |
| Progress / success | Brief acknowledgment, forward motion. | "Chapter done. One closer." |
| Empty state | Matter-of-fact with a nudge. | "Nothing here yet. Start with Chapter 1." |
| Error | Honest, no drama. | "Couldn't fetch tags — pick your archetype manually." |
| Onboarding | Curious, inviting. Not salesy. | "Who do you want to sound like? Enter a few artists." |
| Navigation | Minimal. Let the content speak. | "← Previous" / "Next →" |

**Rules**:
- No exclamation marks in system copy
- No filler phrases: "Great job", "You're doing amazing", "Let's get started"
- Contractions are fine ("you're", "don't", "let's" in running text — but not in headings)
- Em-dashes preferred over colons for inline asides
- Chapter educational content is **never touched** — only UI chrome and system copy
