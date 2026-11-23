# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Ayush Kulal Portfolio** — single-page personal portfolio, configured for GitHub Pages deployment (`.github/workflows/deploy.yml`). Vite + React 18 + TypeScript + Tailwind, with a hand-written CSS design system. No backend: the contact form posts through EmailJS.

The site is a "signal studio": citron paper, cobalt blue, a procedural canvas sculpture in the hero, and scroll-driven typography.

## Commands

```bash
npm run dev            # Dev server on :8080
npm run build          # Production build to dist/
npm run preview        # Preview the production build

npm run lint           # ESLint (typescript-eslint + react-hooks + react-refresh)
npx tsc --noEmit -p tsconfig.app.json   # Type check

npm run test           # Vitest run (jsdom)
npx playwright test    # E2E — builds + previews on :4174 first
```

## Architecture

Everything hangs off one page. There is no router.

```
src/
├── main.tsx                      # createRoot → <App/>
├── App.tsx                       # pathname === "/" ? <Index/> : <NotFound/>
├── index.css                     # Design system: tokens, layout, hero, responsive, motion
├── pages/
│   ├── Index.tsx                 # Nav + hero + section composition
│   └── NotFound.tsx              # The only file using Tailwind utility classes
├── components/studio/
│   ├── SignalSculpture.tsx       # Canvas 2D torus-torus, pointer-reactive
│   ├── useStudioMotion.ts        # IntersectionObserver → Web Animations API reveals
│   ├── Projects.tsx + projects.css
│   ├── Opportunities.tsx + opportunities.css
│   ├── Story.tsx + story.css
│   └── Contact.tsx               # EmailJS + honeypot
└── test/                         # Vitest
```

Section order on the page: **hero → Projects (#projects) → Opportunities (#opportunities) → Story (#about, #experience, #skills, #music) → Contact (#contact)**.

`Story.tsx` renders four `<section>`s from one component. Add a section by creating a file in `components/studio/` and importing it in `Index.tsx`.

## Styling

Tailwind is installed but effectively unused. The live JSX uses custom class names (`studio-hero`, `sp-title-row`, `story-about`) defined in `index.css` and `studio/*.css`. Only `NotFound.tsx` uses real Tailwind utilities — so **don't remove Tailwind**, and keep `tailwind.config.ts` `content` scoped to live files.

CSS is written minified on single lines. Match that style when editing.

## Three things that carry the site

**1. `SignalSculpture.tsx`** — a 3D sculpture on 2D canvas. 132 pre-computed rings (64 on mobile), `Float32Array` vertex buffers, painter's-algorithm depth sort, perspective divide per vertex. It follows the pointer with a rAF lerp, throttles to 30fps (24 mobile), and stops when offscreen or the tab is hidden. No Three.js. It early-returns if `Element.prototype.animate` is missing.

**2. `useStudioMotion.ts`** — one `IntersectionObserver` over `[data-reveal]` elements, playing Web Animations API keyframes. Three modes: `rise` (default), `wipe`, `tilt`. Elements unobserve after animating once. Skipped entirely when motion is off.

**3. The motion kill-switch — three layers.** Respect all three:
- OS `prefers-reduced-motion`
- A user toggle persisted at `localStorage['ak-motion-paused']`
- `data-motion="off"` on `<html>`, which CSS reads to zero every animation/transition

Plus `@supports(animation-timeline: scroll())` drives the hero recede and the reading-progress bar in pure CSS with no JS.

## Contact Form (EmailJS)

Env vars: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Missing values surface as a visible error state, not a silent no-op.

Honeypot: hidden `name="company"` field. Bots fill it; the handler fakes success. `sending.current` ref guards double submits.

## Dependencies

Deliberately minimal — four runtime deps: `react`, `react-dom`, `lucide-react`, `emailjs-com`. This was pruned from ~50 in the dead-code cleanup (2026-10). **Don't add a dependency for something a few lines of native code handles.** Before adding one, confirm it isn't already installed and that it's not replaceable with the platform.

## Testing

- `tests/portfolio.spec.ts` — 13 Playwright specs covering responsive overflow at 320/390/1440px, local fonts, canvas offscreen pausing, motion preference persistence, mobile nav + Escape, contact validation/send/failure, the résumé PDF, and the 404 page.
- `src/test/example.test.ts` — placeholder Vitest.

Run Playwright after any change that touches `index.css`, `studio/*.css`, motion handling, or the contact form.

## Conventions

- Named imports from `lucide-react`, never icon components inlined.
- Data lives as module-level `const` arrays above the component (`projects`, `experiments`, `roles`, `skillGroups`, `strings` in `Story.tsx`).
- Accessibility is deliberate, not incidental: skip link, focus restoration on Escape, `aria-invalid` + `aria-describedby` on form errors, `sr-only` text on external links, `target="_blank"` always paired with `rel`.
- No comments explaining *what*; comments explain *why* (e.g. why rotation is factored per-ring, why frame work is budgeted).
- Accessibility basics, input validation, and the honeypot are not to be simplified away.