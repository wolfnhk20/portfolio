# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ayush Kulal Portfolio** — A personal portfolio website redesigned as a component datasheet (paper/ink aesthetic). Single-page React app with Vite, Tailwind CSS, and framer-motion animations. Sections map to datasheet clauses: 1-DESCRIPTION (Hero), 2-SPECIFICATIONS (Skills), 3-TYPICAL APPLICATIONS (Projects), 4-ABSOLUTE MAXIMUM RATINGS (About), 5-REVISION HISTORY (Experience), 6-AUX FUNCTIONS (Music), 7-ORDERING INFORMATION (Contact).

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3.4, framer-motion 12, Radix UI primitives, React Router 6, TanStack Query 5, EmailJS for contact form.

## Commands

```bash
# Development
npm run dev          # Start dev server on :8080
npm run build        # Production build to dist/
npm run build:dev    # Development mode build
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint (typescript-eslint + react-hooks + react-refresh)

# Testing
npm run test         # Vitest run (jsdom)
npm run test:watch   # Vitest watch mode
npm run test -- --run src/test/example.test.ts  # Single test file
```

## Architecture

### Route Structure
```
src/
├── main.tsx                    # App entry, providers (QueryClient, Tooltip, Toaster, Router)
├── App.tsx                     # Routes: "/" → Index, "*" → NotFound
├── pages/
│   ├── Index.tsx               # Single-page composition of all sections
│   └── NotFound.tsx
├── components/
│   ├── SectionWrapper.tsx      # Standard section chrome: rule, kicker, serif title, aside
│   ├── HeroSection.tsx         # Clause 1: Masthead, DIP-16 pin diagram SVG, features, TOC
│   ├── AboutSection.tsx        # Clause 4: Device photo, absolute max ratings table
│   ├── SkillsSection.tsx       # Clause 2: Electrical characteristics table
│   ├── ProjectsSection.tsx     # Clause 3: Application figures with crop marks
│   ├── ExperienceSection.tsx   # Clause 5: Revision history table
│   ├── MusicSection.tsx        # Clause 6: Aux functions
│   ├── ContactSection.tsx      # Clause 7: Ordering info + EmailJS form
│   ├── Navbar.tsx              # Datasheet header bar (fixed, scroll-spy)
│   ├── Footer.tsx              # Disclaimer block
│   ├── ScrollProgress.tsx      # REMOVE per spec
│   ├── BackToTop.tsx           # REMOVE per spec
│   └── ui/                     # Radix-based primitives (30+ components)
├── hooks/                      # use-mobile, use-toast
├── lib/utils.ts                # cn() = clsx + tailwind-merge
└── index.css                   # Datasheet theme: CSS custom properties, utilities
```

### Section Composition Pattern
All sections use `SectionWrapper`:
```tsx
<SectionWrapper
  id="section-id"
  num="01"           // clause number
  label="description" // clause title lowercase
  title={<>Clause <em className="text-primary">Title</em>.</>}
  aside="optional note"
>
  {/* section content */}
</SectionWrapper>
```

### Datasheet Design System (index.css + tailwind.config.ts)

**Color Palette (CSS custom properties):**
- `--background`: 47 26% 94% (paper)
- `--foreground`: 45 21% 10% (ink)
- `--primary`: 8 76% 42% (signal red)
- `--secondary`: 46 16% 87% (table header gray)
- `--border`: 45 21% 10% (ink rules, not gray)
- `--radius`: 0rem (sharp corners)

**Typography:**
- Masthead: Anton (`.font-masthead`)
- UI/Body: Archivo (sans in tailwind.config)
- Mono/Data: IBM Plex Mono (`.font-mono-data`)
- Clause labels: `.clause` (Archivo 700, uppercase, 0.08em tracking)

**Key Utilities (index.css):**
- `.clause` — numbered clause header
- `.leader` — dotted leader between label/value
- `.ink-link` — red underline link, fills red on hover
- `.stamp` — rotated rubber-stamp badge
- `.cropmarks` — figure registration marks
- `.ds-table` — hairline data tables (ink borders, gray header band)

**Print Stylesheet:** `@media print` hides header, forms, `.no-print`; forces white background.

### Data Sources (Keep in Sync with Resume PDF)
- `HeroSection.tsx`: Pin diagram, features, TOC links
- `AboutSection.tsx`: Device photo, absolute max ratings table, facts, git-log timeline
- `SkillsSection.tsx`: Electrical characteristics table (branches = parameter groups)
- `ProjectsSection.tsx`: Application figures with crop marks, archive list
- `ExperienceSection.tsx`: Revision history table
- `MusicSection.tsx`: Aux functions (liner notes table)
- `ContactSection.tsx`: Ordering information + EmailJS form (honeypot field)

### Contact Form (EmailJS)
Env vars (Vite): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
Honeypot: hidden `name="company"` field — bots fill it, humans never see it.

### Path Aliases
`@/*` → `./src/*` (tsconfig.app.json + vite.config.ts)

## Common Tasks

**Add a project:** Edit `featured[]` or `archive[]` in `ProjectsSection.tsx`. Add screenshot to `public/` if featured.

**Update bio/facts:** Edit `facts[]` and `commits[]` in `AboutSection.tsx`. Keep in sync with `public/ayushkulal_resume.pdf`.

**Add a section:** Create component in `components/`, import in `Index.tsx`, wrap with `SectionWrapper`.

**Change theme colors:** Edit CSS custom properties in `index.css` `:root` block. Tailwind references them via `hsl(var(--token))`.

**Run single test:** `npm run test -- --run src/test/example.test.ts`

## Key Files to Know
- `src/index.css` — complete datasheet design system
- `tailwind.config.ts` — font families, color mappings, animations
- `src/components/SectionWrapper.tsx` — section chrome contract
- `src/components/HeroSection.tsx` — most complex section (SVG pin diagram, TOC)
- `src/components/ProjectsSection.tsx` — figures with crop marks, alternating layout
- `src/components/ContactSection.tsx` — EmailJS integration pattern
- `vite.config.ts` — alias, dev server port 8080, lovable-tagger in dev

## Current Spec Work (per todo list)
- Remove `ScrollProgress` and `BackToTop` components + imports
- Update `Index.tsx` section order to match datasheet clauses 1–7
- Update `index.html`: theme-color, favicon, datasheet preview.png OG image
- Build, screenshot, verify print stylesheet