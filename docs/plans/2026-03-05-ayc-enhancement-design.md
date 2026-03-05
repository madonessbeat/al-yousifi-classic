# AYC Website Enhancement Design
**Date:** 2026-03-05
**Project:** Al-Yousifi Classic (`github.com/madonessbeat/al-yousifi-classic`)
**Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion
**Approach:** Layer by Layer — fully static, deploy to Vercel via GitHub push

---

## Scope

Full masterpiece overhaul across every dimension:
- Visual & Motion System
- Pages & Content
- Performance, SEO & Accessibility
- Deployment (GitHub → Vercel)

---

## Section 1: Visual & Motion System

### 1.1 Custom Cursor
- Dual-ring luxury cursor: small gold dot (exact position) + larger translucent ring (spring lerp)
- Hover states: expands/fills on links/CTAs; crosshair on images; pulse on click
- `CustomCursor` component mounted in `layout.tsx`
- Hidden on touch devices

### 1.2 Page Transitions
- Black curtain wipe on every route change (600ms total)
- Gold hairline at curtain edge
- `PageTransition` wraps `{children}` in `layout.tsx`
- Uses `usePathname()` as AnimatePresence key

### 1.3 Enhanced Scroll Animations
Extend `SectionReveal` with variant system:
- `fade-up`: existing (keep for text)
- `clip-reveal`: clipPath `inset(100%→0%)` for images and cards
- `split-text`: per-word stagger for titles
- `parallax`: `useScroll` + `useTransform` depth layers
- All disabled under `prefers-reduced-motion`

### 1.4 Magnetic Buttons
- `MagneticButton` wrapper: button follows cursor ±20px with spring physics
- Applied to all CTAs and nav links
- No effect on touch devices

### 1.5 Animated Number Counters
- `AnimatedCounter` component: `useInView` + `useMotionValue` + `useSpring`
- Counts 0 → target over 1.8s on viewport entry
- Replaces static stats in `About.tsx` and `AboutPage.tsx`

### 1.6 Horizontal Scroll Section
- `HorizontalScroll` component: vertical scroll drives horizontal card translation (scrub)
- Used on Collections page
- Mobile fallback: vertical stacked grid

---

## Section 2: Pages & Content

### 2.1 Hero (Home)
- Canvas particle field: 60–80 gold dust particles, slow drift, opacity 0.15–0.4
- Logo: clipPath stroke-draw reveal animation
- Scroll parallax: logo 0.4x, tagline 0.2x, particles 0.1x
- Ambient glow pulse: radial gold breathes 1→1.08→1 (4s CSS loop)

### 2.2 About Section (Home)
- `clip-reveal` on image, split-text on title
- `AnimatedCounter` for stats
- Brand marquee ticker below stats: `"AL-YOUSIFI CLASSIC ✦ KHARTOUM ✦ EST. 2015 ✦ LUXURY MENSWEAR ✦"`

### 2.3 Categories Section (Home)
- 3D tilt effect on hover (`TiltCard` — custom `onMouseMove`, ±8°)
- Gold underline animates from center outward

### 2.4 Featured Collection (Home)
- Vertical sliding text strip on left edge (rotated 90°, infinite scroll upward)
- `clip-reveal` on image entrance

### 2.5 Lookbook Section (Home)
- `clip-reveal` stagger cascade (not fade-up)
- Lightbox swipe gesture support (touch delta detection)

### 2.6 Testimonials (Home)
- Auto-advance every 5s (pause on hover)
- Mobile swipe support
- Replace dots with `01 / 03` counter

### 2.7 About Page
- Brand Timeline: vertical line, alternating left/right nodes (2014→2016→2019→2022→2025)
- Vision quote: split-text reveal
- Values triptych: Heritage / Craft / Modernity cards

### 2.8 Collections Page + Detail Pages
- `HorizontalScroll` scrub replaces 2-column grid
- `/collections/[id]` detail pages: full-bleed hero, story, details grid, image gallery
- `lib/collections.ts`: extended data (story AR+EN, palette, gallery images, details)

### 2.9 Categories Page
- Filter tab bar: All | Formal | Casual | Footwear | Watches | Accessories
- `AnimatePresence` + layout animation on filter
- `TiltCard` + `clip-reveal` on cards

### 2.10 Lookbook Page
- Collection filter tabs: All | Nubian | Desert Rose | Khartoum Nights | Signature
- Lightbox added to page (currently only on home section)
- Download/share action inside lightbox (Web Share API + download link)

### 2.11 Contact Page
- Real Google Maps dark-styled iframe (Alkalakla, Khartoum)
- WhatsApp compose form: name + message fields → opens `wa.me` pre-filled

### 2.12 404 Page
- Full-screen black, stroke watermark, Cormorant "404" in gold
- Tagline: "This page has stepped out"
- CTA back to home

---

## Section 3: Performance, SEO & Accessibility

### 3.1 Image Performance
- Blur placeholders: base64 shimmer on all `<Image>` components
- `priority` audit for above-the-fold images
- `sizes` prop audit for all images

### 3.2 Per-Page Metadata
- Every page: unique `title`, `description`, `openGraph`, `twitter`, `canonical`
- Root layout: brand-level OG image (`/public/og-image.jpg`, 1200×630)

### 3.3 Structured Data
- `LocalBusiness` / `ClothingStore` JSON-LD in `layout.tsx <head>`
- Fields: name, address, telephone, openingHours, url

### 3.4 Sitemap & Robots
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`

### 3.5 Accessibility
- Skip-to-content link (visually hidden, gold on focus)
- Global `focus-visible` gold ring in `globals.css`
- ARIA audit: icon buttons, lightbox (`role="dialog"` + `aria-modal`), mobile nav (`aria-expanded`)
- Lightbox keyboard tab-trap
- `prefers-reduced-motion` block in `globals.css`
- Footer text opacity bump: `/22` → `/35` minimum

---

## Section 4: Technical Architecture

### New Files
```
components/
  CustomCursor.tsx
  MagneticButton.tsx
  AnimatedCounter.tsx
  HorizontalScroll.tsx
  BrandMarquee.tsx
  PageTransition.tsx
  TiltCard.tsx
  Timeline.tsx

app/
  not-found.tsx
  sitemap.ts
  robots.ts
  collections/[id]/page.tsx

lib/
  collections.ts
  blur-placeholder.ts

public/
  og-image.jpg
```

### Layout Changes (`layout.tsx`)
- Add `<CustomCursor />`
- Add `<SkipToContent />`
- Wrap `<main>` with `<PageTransition>`
- Add JSON-LD `<script>`
- Add `id="main-content"` to `<main>`

### Implementation Layers (Execution Order)

| Layer | Scope | Commit |
|-------|-------|--------|
| 1 | `CustomCursor`, `PageTransition`, global CSS updates | `feat: custom cursor, page transitions, global CSS` |
| 2 | `AnimatedCounter`, enhanced `SectionReveal`, `MagneticButton` | `feat: animated counters, magnetic buttons, enhanced reveals` |
| 3 | `TiltCard`, `HorizontalScroll`, `BrandMarquee`, `Timeline` | `feat: tilt cards, horizontal scroll, marquee, timeline` |
| 4 | Hero particle canvas + parallax | `feat: hero particle canvas and scroll parallax` |
| 5 | All page upgrades (About, Collections/[id], Categories, Lookbook, Contact, 404) | `feat: page upgrades — about timeline, collections detail, categories filter, lookbook, contact form, 404` |
| 6 | Blur placeholders, image sizing audit | `perf: blur placeholders and image optimization` |
| 7 | Metadata, JSON-LD, sitemap, robots, OG image | `feat: SEO — metadata, structured data, sitemap, robots` |
| 8 | Focus rings, ARIA, reduced-motion, contrast | `fix: accessibility — focus, ARIA, reduced-motion` |
| 9 | Build verification + push to GitHub + Vercel deploy + Playwright screenshot | `chore: production deploy` |

---

## Section 5: Deployment

- All layers committed to `main` branch following existing convention (`feat:` / `fix:` / `perf:` / `chore:`)
- Push to `github.com/madonessbeat/al-yousifi-classic`
- Vercel MCP triggers deployment from GitHub
- Playwright MCP verifies all 6 pages at live URL (desktop + mobile viewport)
- Promote to production alias
