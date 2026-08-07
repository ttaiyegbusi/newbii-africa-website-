# Newbii Africa — Landing Page · Project Context & Handoff

> A complete handoff document so this build can be continued in a fresh
> conversation. Read this top‑to‑bottom before making changes.

---

## 1. What this is

A **pixel-accurate marketing landing page** for **Newbii Africa** — a community
where ambitious Africans learn tech, find mentors, and chase real opportunities.
It is a **single-page** site (no routing) built from **11 stacked sections**, with
a bold dark-navy / electric-blue brand system, diagonal textures, pixel-rail
"castle-tooth" dividers, geometric SVG artwork, and polished scroll-in motion.

The work was **design-driven**: the user supplied reference JPGs for each section
and iterated section-by-section toward a 1:1 match. Fidelity to the supplied
design is the top priority — this is **not** a redesign exercise.

---

## 2. Locations & repo

| Thing | Path / URL |
|---|---|
| Project root (working dir) | `/Users/temitopeaiyegbusi/Desktop/newbii website` |
| Git remote | https://github.com/ttaiyegbusi/newbii-africa-website- |
| Default branch | `main` (all work is committed directly to `main`) |
| Design reference JPGs | `/Users/temitopeaiyegbusi/Desktop/Newbii Africa Website/` |
| Dev server | `npm run dev` → http://localhost:5173 |

**Design references** (the source of truth) live in the separate Desktop folder
`Newbii Africa Website/`, not in the repo: `Hero Section.jpg`, `Data.jpg`,
`Backstory.jpg`, `About Us.jpg`, `Our Programms.jpg`, `Our Events.jpg`,
`Testimonials.jpg`, `CTA.jpg`, `FAQ.jpg`, `Banner.jpg`, `Footer.jpg`, plus shape
SVGs (`Exclude*.svg`, `Star.svg`, `Rectangle.svg`, `circle.svg`, `Light.svg`) and
`Chef Image.png`. **Always compare against these when doing design work.**

---

## 3. Tech stack

- **React 18 + TypeScript**, **Vite 5** (dev server + build)
- **Framer Motion** — entrance reveals, staggers, the program-card fan, banner shapes
- **matter.js** — hero physics sandbox (draggable/throwable shapes)
- **d3-geo + topojson-client + world-atlas** (`land-110m`) — the interactive globe
- **Vanilla CSS** with **design tokens** + **CSS Modules** (no CSS framework)
- **@fontsource-variable/inter** + **@fontsource/anton** — self-hosted fonts
- **Vitest + Testing Library + jsdom** — tests
- Dev-only image tooling: **@resvg/resvg-js** + **sharp** (via `scripts/generate-images.mjs`)

---

## 4. Commands

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b && vite build  (must stay green)
npm run preview      # preview the production build
npm run lint         # ESLint (must stay clean)
npm test             # Vitest run  (3 smoke tests)
npm run test:watch   # Vitest watch
node scripts/generate-images.mjs   # regenerate favicon PNGs, OG image, chef.webp
```

Definition of done for any change: **`npm run build`, `npm run lint`, and
`npm test` all pass.**

---

## 5. Project structure

```
src/
├── main.tsx                 # entry; imports fonts + tokens + global css
├── App.tsx                  # <MotionConfig reducedMotion="user">, skip-link, section order
├── styles/
│   ├── tokens.css           # :root brand colors, fonts, container width, radii, easing
│   └── global.css           # reset, .texture, .display, .skip-link, reduced-motion, large-screen scaling
├── lib/motion.ts            # Framer variants, EASE_PREMIUM, inViewOnce, QA flag, qaInitial()
├── hooks/
│   ├── useReducedMotion.ts
│   └── useCountUp.ts        # restarts each time a stat becomes active
├── data/                    # typed content arrays (edit copy here, not in components)
│   ├── nav.ts stats.ts pillars.ts programs.ts events.ts
│   └── testimonials.ts partnerships.ts faqs.ts footer.ts
├── components/
│   ├── layout/              # Container, PixelRailDivider, Reveal
│   ├── ui/                  # Button, DotMotif, SocialIcon
│   └── shapes/index.tsx     # CSS/SVG shape components (still used by hero shape cluster fallback; some now unused)
├── sections/                # one folder per section: Component.tsx + Component.module.css (+ *.test.tsx)
│   Header, Hero, Stats, Backstory, About, Programs,
│   Events, Testimonials, Partnership, Faq, CommunityBanner, Footer
└── test/setup.ts            # jsdom stubs (IntersectionObserver/ResizeObserver/matchMedia)

public/
├── assets/images/chef.png + chef.webp     # hero photo (<picture> webp + png fallback)
├── assets/shapes/*.svg                     # brand shapes w/ holes + white bevel
│     star, circle, rectangle, light        # the 4 hero physics shapes
│     learn, connect, grow, lead            # About card shapes
│     ring-cyan, star-green, pentagon-cyan  # recolored banner variants
├── favicon.svg + favicon-32.png + apple-touch-icon.png
└── og-image.svg + og-image.png             # 1200x630 social share image

scripts/generate-images.mjs   # rasterizes brand SVGs → favicon PNGs, OG png, chef.webp
netlify.toml                  # deploy config (Vercel auto-detects Vite, needs none)
```

Section order (`App.tsx`): Header → **Hero** → PixelRail(down) → **Stats** →
**Backstory** → **About** → **Programs** → **Events** → **Testimonials** →
**Partnership** → **Faq** → **CommunityBanner** → PixelRail(up) → **Footer**.

---

## 6. Design system / conventions

- **Brand tokens** in `src/styles/tokens.css`: `--newbii-navy #00063a`,
  `--newbii-blue #3b68ff`, plus accent colors (orange/pink/yellow/purple/cyan/
  mint/lime/light-blue/cream) and card solids (`--newbii-card-cyan/mint/yellow/pink`).
- **Typography**: body = **Inter** (variable, `'Inter Variable'` family); condensed
  all-caps display labels (LEARN, OUTREACHES, HIRE TALENT, etc.) = **Anton** via
  the `.display` class. **Letter-spacing is -0.03em** on body + headings (a
  deliberate user request); line-heights are tight (headings ~1.0, body ~1.5).
- **Container width**: the whole page content column is **1000px**, centered,
  via `--container-max`. It scales up on large screens (see §7). The **Stats**
  section is the one exception — it uses the wider `Container wide` (1400px, 1560
  ≥1600px) so the 5 figures fit. Testimonials marquee is full-bleed (outside the
  container).
- **Textures**: `.texture` (subtle diagonal lines) on navy; `.texture--onBlue`
  variant on electric-blue backgrounds.
- **PixelRailDivider**: reusable castle-tooth divider (`variant="down"|"up"`),
  built from repeating gradients — used between Hero/Stats and above the Footer.
- **Reveal / motion**: sections fade+rise in via `<Reveal>` / Framer `whileInView`.
  Easing `EASE_PREMIUM = [0.22,1,0.36,1]`.

### The `?qa=1` flag (important for testing/screenshots)
`lib/motion.ts` exports `QA` (true when the URL has `?qa`). Many components use
`initial={QA ? 'visible' : ...}` / `qaInitial()` so that **on `?qa=1` everything
renders in its final revealed state on load**. This exists because the automated
preview/browser pane throttles `requestAnimationFrame` and IntersectionObserver,
so scroll-triggered reveals never fire there. **Use `http://localhost:5173/?qa=1`
to screenshot sections.** It has no effect on real users. If you add a new
scroll-revealed element, wire it into the QA flag too.

---

## 7. Responsive behavior

- Base content column **1000px**. **≥1600px**: root font-size → 17px and
  `--container-max` → 1140px. **≥2000px**: 18px / 1260px. This scales the whole
  design up proportionally (see the media queries at the bottom of `global.css`).
- Header + Hero use `var(--container-max)` (they used to be hardcoded 1000px).
- Each section has its own mobile breakpoints; **there must be no horizontal
  overflow at any width** (verified down to 390px). When changing widths, re-check
  `document.documentElement.scrollWidth === clientWidth`.

---

## 8. Section-by-section notes (what's special / what was fixed)

1. **Hero** — badge, big heading with an exact 3-line break ("You were never / meant
   to do this / alone." via `<br>` + `white-space:nowrap` on desktop), two CTAs,
   audience pills (Student/Startup/NGO), chef photo card (`<picture>` webp+png; a
   ~2px white frame baked into the PNG is cropped off with `overflow:hidden` +
   negative margins), and the **physics shapes** (see below). Media column 340px
   (380 ≥1600px).
2. **Stats** — 5 figures with an **auto-playing timer**: a single **connected top
   line** where the active figure's segment fills over **3s**, then advances
   (01→05→loop). The **moving highlight container has square corners and its top
   edge is flush with the line**. Active number **re-counts from 0** each cycle.
   Pauses on hover/focus; click a figure to jump. Card `05` shows **"4800+"** (no
   comma) via `grouping:false`. Uses the **wide** container.
3. **Backstory** — copy + the **interactive globe**: a real **d3-geo orthographic
   Earth** (`world-atlas` land-110m), **Africa-centered**, **draggable to spin**,
   with 3 dashed orbit rings, slowly-orbiting hoverable nodes, and two role chips.
   Lazy-loaded and only mounted when scrolled near.
4. **About** — "Learn.Connect.Grow.Lead" asymmetric card grid (LEARN full, CONNECT+
   GROW half, LEAD full). Card block width **700px**. Each card uses the **real
   brand SVG** (`learn/connect/grow/lead.svg`) positioned/cropped at a specific
   corner (LEARN right-center, CONNECT top-right, GROW & LEAD bottom-right).
5. **Programs** ("How we show up for you") — three cards (**Webinars / Outreaches /
   Mentorship**) that start **stacked** and **fan out** on scroll-into-view (Framer
   variants stacked→fanned with x/y/rotate per `data/programs.ts`). Stacks
   vertically < 900px.
6. **Events** ("Look how far we've come together") — three portrait cards, each with
   a **puffy cloud shape** (cumulus top + scalloped bottom, built from overlapping
   circles in `EventCard.tsx`): tag on the solid color, title on the cloud in the
   card's ink color, location+date at the bottom. Colors: orange/cream,
   magenta/pink, blue/light-blue. Fixed aspect-ratio 312/430.
7. **Testimonials** ("Real people. Real wins.") — two **infinite marquees** moving in
   opposite directions on electric blue, pausing on hover/focus; reduced-motion →
   manual scroll. Cards have **no divider lines** (name+flag / quote / role+social).
8. **Partnership** ("Let's shape the future…") — narrow dark left card (~42%) +
   right stack of 4 tall color panels (HIRE TALENT cyan, SPONSOR EVENTS mint,
   UNIVERSITY PARTNERSHIPS yellow, COMMUNITY COLLABORATION pink) as one rounded
   silhouette. Left card is sticky on desktop.
9. **FAQ** ("Questions? We've got answers.") — dark indigo container, left "ANSWERS
   ARE HERE" panel (cross-fades the active answer), right blue "QUESTIONS" panel of
   pills. **Inactive pills darker than the panel, active pill lighter with white
   text.** Desktop split / mobile accordion, keyboard-accessible.
10. **Community Banner** ("You've got people now. Come meet them.") — electric blue,
    left copy + CTA, and a **bottom-right cluster of the same real SVG shapes as the
    hero** (holes + white bevel): cyan ring, orange star, pink square, yellow ring,
    purple star, pale-cyan pentagon, green star.
11. **Footer** — pixel-rail top, 3 link columns (PRODUCT/QUICK LINKS/COMMUNITY) +
    newsletter (front-end validation + success state), divider, and **left-aligned,
    overlapping social tiles** (X/IG/FB/LinkedIn, blue with thick white border).

---

## 9. Interactive / notable pieces (where the complexity lives)

- **Hero physics** (`sections/Hero/HeroPhysics.tsx`) — matter.js sandbox. The 4
  brand SVG shapes **drop in under gravity on load**, collide, and can be
  **dragged/thrown**. Confined to the hero; a transparent overlay has
  `pointer-events:none` so CTAs stay clickable (only the shapes catch events).
  **Lazy-loaded** (own chunk).
- **Globe** (`sections/Backstory/OrbitGlobeGraphic.tsx`) — see §8.3. Rotation is
  driven **imperatively** (updates the SVG `<path>` `d` via ref, no React
  re-render); `dt` is clamped so a backgrounded tab can't jump it. **Lazy-loaded +
  in-view gated.**
- **Stats timer** (`sections/Stats/*`) — CSS `scaleX` animation whose `animationend`
  drives the advance, so bar + highlight + JS stay in sync and pausing is trivial.
- **Programs fan** & **Community Banner shapes** — Framer variants.

---

## 10. Performance & production readiness (done)

- **Code-split** heavy deps: `HeroPhysics` (matter.js) and `OrbitGlobeGraphic`
  (d3-geo + world data) are lazy chunks. Critical JS ≈ **297KB** (gzip ~98KB) vs
  ~466KB before.
- **Self-hosted fonts** (no render-blocking Google Fonts request; only Latin subset
  downloads).
- **Hero photo** → WebP (264KB → 41KB) with PNG fallback.
- **Meta**: favicon set, 1200×630 OG image, full Open Graph + Twitter tags in
  `index.html`. ⚠️ **After deploying, set `og:url` and `og:image` to the absolute
  production URL** (currently relative — a comment marks the spot).
- **Deploy**: `netlify.toml` present; Vercel auto-detects Vite. **The actual deploy
  still needs the user's Netlify/Vercel account** (assistant can't authenticate).
- **Accessibility**: `MotionConfig reducedMotion="user"`, skip-to-content link,
  single h1, all images have alt (decorative = `alt=""` + `aria-hidden`), all
  controls named, landmarks present, `:focus-visible` outline.

---

## 11. Known limitations / open follow-ups

- **Deploy is not live yet** — connect the repo to Netlify/Vercel; then fix the
  absolute `og:url`/`og:image`.
- **Contrast**: Event-card metadata (white on vivid orange/blue) is below WCAG AA;
  kept for design fidelity. Darken if strict AA is required.
- **Not yet wired to real destinations**: "Join us", "Explore Community", "Join
  Community", "Become a Partner", newsletter submit, and footer **social links**
  all point to `#`/anchors. Hooking these up is the main remaining functional task.
- **Lighthouse** wasn't run (no headless Lighthouse in the build environment), but
  changes targeted its perf/a11y/SEO criteria.
- Some `components/shapes/index.tsx` exports are now unused (About/Banner switched to
  real SVGs) — harmless, can be pruned.
- Old backstory-globe helper `PentagonNode` and a couple CSS shapes are dead code.

### Suggested next steps (previously offered, not yet chosen/done)
1. **Wire real links/forms** (highest-value remaining functional work).
2. **Deploy** to Netlify/Vercel and finalize absolute OG URLs.
3. Optional: analytics (Plausible/Umami), more tests, contrast tightening.

---

## 12. Workflow notes for the assistant

- **Commit style**: work is committed **directly to `main`** (the user's
  established workflow — do not create feature branches unless asked). Commit only
  when the user says so. End commit messages with
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- **The automated browser/preview pane throttles rAF + IntersectionObserver**, so
  scroll reveals and animations often don't render in screenshots. Workarounds used
  throughout: load `?qa=1`, use a **tall viewport** (e.g. 1440×11000) for a
  full-page shot, or verify via JS (`getBoundingClientRect`, computed styles, DOM
  assertions) instead of screenshots. Physics/globe/count-up freeze there too —
  they work fine in a real browser.
- **Design changes**: read the matching JPG in `~/Desktop/Newbii Africa Website/`
  first, compare precisely (widths, positions, colors, corner radii), then match.
- Keep content in `src/data/*`; keep sections modular; match surrounding code style.
- Scratchpad for throwaway files (this session):
  `/private/tmp/claude-501/.../scratchpad` (do not commit).

---

## 13. Git history (most recent first)

```
842bee0 test: add Vitest smoke tests for key interactions
d261e40 chore: update devDependencies for testing and development tools
e79294d Refactor code structure for improved readability and maintainability
        (self-hosted fonts, WebP hero, reduced-motion MotionConfig, skip-link)
d5c3c33 perf: code-split heavy deps; add share meta, deploy config, banner shapes
0a7cbdc feat: interactive globe + real About card shapes  (approx)
… earlier: full build, section design passes (Stats timer, Programs fan,
  Events cloud, Testimonials/Partnership/FAQ/Banner/Footer), large-screen scaling
```

_This file is a living handoff — update it as the project evolves._
