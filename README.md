# Newbii Africa — Landing Page

A pixel-accurate landing page for **Newbii Africa**, "A Home For Ambitious Africans In Tech."
Built as a single continuous page of 11 sections with the brand's dark-navy / electric-blue
visual system, diagonal textures, pixel-rail dividers, geometric SVG artwork, and polished
scroll-in motion.

## Tech stack

- **React 18 + TypeScript**
- **Vite** (dev server + build)
- **Framer Motion** for entrance / interaction motion
- **Vanilla CSS** with design tokens + CSS Modules (no CSS framework)
- Fonts: **Inter** (body) + **Anton** (condensed display), loaded via Google Fonts with a
  robust system fallback stack.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Project structure

```text
src/
├── main.tsx / App.tsx        # entry + section composition
├── styles/                   # tokens.css, global.css (reset, texture, reduced-motion)
├── lib/motion.ts             # shared Framer variants + easing
├── hooks/                    # useReducedMotion, useCountUp
├── data/                     # typed content arrays (nav, stats, pillars, events,
│                             #   testimonials, partnerships, faqs, footer)
├── components/
│   ├── layout/               # Container, PixelRailDivider, Reveal
│   ├── ui/                   # Button, DotMotif, SocialIcon
│   └── shapes/               # reusable geometric SVG shapes
└── sections/                 # one folder per landing section (component + .module.css)
    Header, Hero, Stats, Backstory, About, Programs,
    Events, Testimonials, Partnership, Faq, CommunityBanner, Footer
```

All copy and repeating content lives in `src/data/*` so it can be edited without touching
components. Adding a page later is easy — sections are self-contained and share the primitives
in `components/` and the tokens in `styles/`.

## Key interactions

- **Header** — sticky, smooth anchor scrolling, accessible mobile burger menu.
- **Hero** — staggered entrance, audience selector pills, geometric shape cluster.
- **Stats** — numbers count up once when scrolled into view (respects reduced-motion).
- **Backstory** — custom SVG orbit globe with slowly rotating nodes + role chips.
- **About / Events / Partnership** — cards reveal with staggered motion and hover lift.
- **Programs** — layered "Outreaches" card deck that separates on hover.
- **Testimonials** — dual infinite marquees travelling opposite directions; pause on
  hover/focus; under reduced-motion they become manually scrollable.
- **FAQ** — click a question to cross-fade its answer (desktop split panel / mobile accordion),
  fully keyboard accessible.
- **Footer** — front-end newsletter form with email validation + success state; oversized
  social tiles.

## Accessibility & motion

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), visible focus styles,
  real buttons/links, decorative SVGs marked `aria-hidden`.
- All motion respects `prefers-reduced-motion`.
- No horizontal overflow at any breakpoint (verified down to 390px).

## QA note

Appending `?qa=1` to the URL renders every section in its final (revealed) state on load,
bypassing scroll-triggered reveals. This is a harmless testing aid for screenshotting the full
page in headless environments and has no effect on the normal experience.

## Assets

- Hero portrait: `public/assets/images/chef.png` (supplied "Chef Image"). The "Chef → DevOps
  Engineer" career chips are baked into that image, so they render statically rather than as an
  animated label loop.
