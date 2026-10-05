---
# gstack: design-md-format=spec
name: Ayush Kulal Signal Studio
description: A bright kinetic portfolio pairing expressive signal sculpture with readable engineering stories.
colors:
  primary: "#2348ff"
  on-primary: "#ffffff"
  surface: "#f5f6ef"
  text: "#20251c"
  text-muted: "#58604f"
  accent: "#e5f49b"
  lilac: "#dcd8ee"
  error: "#a02020"
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontWeight: 700
    letterSpacing: -0.04em
  body:
    fontFamily: Manrope
    fontSize: 1rem
    lineHeight: 1.65
rounded:
  sm: 8px
  md: 16px
  full: 9999px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section: 112px
---

# Signal Studio

## Overview
The portfolio is an Experience surface with readable evidence. A luminous citron opening pairs oversized name typography with a cobalt procedural signal loop. The loop is the signature: an abstract connection between audio signals and connected software systems. Real work follows immediately.

## Colors
Committed color at section scale. Citron opens and closes the page, cobalt owns the biography. Soft white provides daylight reading conditions for recruiters and visitors on laptops and phones. Lilac and blue stage product screenshots.

## Typography
Bricolage Grotesque gives the name a distinctive, rounded yet technical character. Manrope provides legible body and control text. Name typography is deliberately poster-scaled; all other headings stay below six rem. Latin variable WOFF2 fonts are self-hosted, preloaded, and content-hashed by Vite, with swap and sans-serif fallback. Their original OFL licenses are in `public/fonts/`; there is no render-blocking Google Fonts stylesheet request.

## Layout
Wide, asymmetric composition with generous gutters. Hero is a typographic poster with sculpture overlapping its right half. Featured work alternates immersive preview areas and concise descriptions. About and experience use different density. Below 760px, layouts stack and tap targets remain at least 44px.

## Elevation & Depth
Depth belongs to the mathematical signal sculpture and product screenshot perspective. Flat reading surfaces. No decorative chrome around every section.

## Shapes
Rounded image stages, circular arrow controls, open text rows, and deliberate oversized typographic contours.

## Components
Native anchor navigation; responsive menu closes on selection and Escape. Expandable native details for project implementation. Labeled contact fields, sending/success/error states and direct email fallback. Interactive six-string experiment in the music section, silent by default.
An explicit hiring/freelance selector offers résumé/experience or project/contact next steps. The hero freelance shortcut preselects the project panel. Real photography grounds the About and off-the-clock sections; the enhanced portrait preserves identity and the CB350RS photo preserves its original street mood.

## Motion
Staggered letter entrance, progressive hero scroll transforms, one-shot image wipes and tilted portrait reveal, bounded fine-pointer project tilt, a short interactive retrieval trace, and an optional guitar-string pluck. A single observer drives native Web Animations; CSS scroll timelines progressively enhance supported browsers. No animation library is loaded by the active page. Canvas uses reusable geometry buffers, reduced mobile detail, capped resolution and 30fps drawing; it stops offscreen or in a hidden tab. Global pause and OS reduced motion preserve a complete static layout. Native scrolling; no cursor replacement.

## Do's and Don'ts
- Do prioritize real project imagery and résumé facts.
- Do make buttons describe their actions.
- Do preserve a beautiful static composition when motion is off.
- Don't add fake metrics, forced loaders, scroll hijacking, or hover-only content.
- Don't return to repeated dark rack panels or turn the signal concept into technical navigation jargon.

## Research
- https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/ — composition and repeating motion motifs.
- https://tympanus.net/codrops/2025/12/02/two-portfolios-one-process-where-design-motion-and-code-come-together/ — coherent identity and motion.
- https://tympanus.net/codrops/hub/ — interaction, typography and canvas experiments.
- https://reactbits.dev/text-animations/split-text — text animation reference, no source copied.
- https://reactbits.dev/components/circular-gallery — spatial gallery reference, no source copied.
- https://motion.dev/docs/react-use-scroll — animation primitives.
- https://motion.dev/docs/react-use-reduced-motion — accessible motion.
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/ — researched; no need to add a second animation runtime.
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

## Decisions Log
2026-09-23: Full redesign authorized by user. Reuse existing Motion dependency, custom Canvas drawing, native scrolling. No GSAP, Lenis, or WebGL dependency needed for the chosen effect.
2026-09-24: Replaced active Motion runtime with native animations, added hiring/freelance intent, CB350RS photography, and enhanced supplied portrait. Added a soft sage opportunity surface (#edf0e5). Project stages use project-specific lilac, pink, and sage tones; these and cobalt portrait shadow are intentional tonal extensions, not new brand accents. Image stages use 16–18px rounding; small technical diagrams use 6–12px. Text uses fluid display sizes and compact 12–15px metadata around 16px body text; the poster name intentionally exceeds the ordinary heading scale.
