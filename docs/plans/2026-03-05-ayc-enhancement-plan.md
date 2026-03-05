# AYC Masterpiece Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform Al-Yousifi Classic into a maximum artistic and professional grade luxury fashion website across visual motion, content, performance, SEO, accessibility, and production deployment.

**Architecture:** Layer-by-layer enhancement preserving the existing Next.js 16 static site. All new components are additive — nothing is rewritten, only extended. Static data stays in TypeScript files. Deployed via GitHub push → Vercel.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Framer Motion, HTML Canvas API, Web Share API, Vercel MCP, Playwright MCP

**Design Doc:** `docs/plans/2026-03-05-ayc-enhancement-design.md`

---

## Layer 1: Custom Cursor, Page Transitions, Global CSS

### Task 1: CustomCursor component

**Files:**
- Create: `components/CustomCursor.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create the component**

```tsx
// components/CustomCursor.tsx
'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 18 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 18 })
  const isHoveringRef = useRef(false)
  const isImageRef = useRef(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.documentElement.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      isHoveringRef.current = !!(t.closest('a, button, [role="button"]'))
      isImageRef.current = !!(t.closest('img, [data-cursor-expand]'))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleEnter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleEnter)
      document.documentElement.style.cursor = ''
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: '6px',
          height: '6px',
          background: 'rgba(193,167,130,0.9)',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: '36px',
          height: '36px',
          border: '1px solid rgba(193,167,130,0.4)',
          background: 'transparent',
        }}
      />
    </>
  )
}
```

**Step 2: Add to layout**

In `app/layout.tsx`, add `import CustomCursor from '@/components/CustomCursor'` and place `<CustomCursor />` as the first child inside `<body>`, before `<LanguageProvider>`.

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully`

**Step 4: Commit**

```bash
cd /root/ayc && git add components/CustomCursor.tsx app/layout.tsx && git commit -m "feat: custom cursor with gold dot and spring ring"
```

---

### Task 2: PageTransition component

**Files:**
- Create: `components/PageTransition.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create the component**

```tsx
// components/PageTransition.tsx
'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Gold curtain wipe */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{ background: '#000', originY: 1 }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Gold hairline at curtain edge */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.6), transparent)' }}
          />
        </motion.div>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

**Step 2: Wrap main in layout**

In `app/layout.tsx`:
- Add `import PageTransition from '@/components/PageTransition'`
- Wrap `<main id="main-content">{children}</main>` with `<PageTransition>`
- Add `id="main-content"` to the `<main>` element

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add components/PageTransition.tsx app/layout.tsx && git commit -m "feat: page transitions with black curtain wipe"
```

---

### Task 3: Global CSS enhancements

**Files:**
- Modify: `app/globals.css`

**Step 1: Add all missing global styles**

Add the following blocks to `app/globals.css`:

```css
/* ── Skip to content ── */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 99999;
  padding: 0.75rem 1.5rem;
  background: var(--gold);
  color: #000;
  font-family: var(--font-jost), sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.15rem;
  text-transform: uppercase;
  text-decoration: none;
  transition: top 0.2s;
}
.skip-to-content:focus {
  top: 1rem;
}

/* ── Focus ring ── */
:focus-visible {
  outline: 1.5px solid rgba(193,167,130,0.6);
  outline-offset: 3px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ── Keyframes ── */
@keyframes pinPulse {
  0%, 100% { box-shadow: 0 0 0 4px rgba(193,167,130,0.2), 0 0 0 8px rgba(193,167,130,0.07); }
  50%       { box-shadow: 0 0 0 6px rgba(193,167,130,0.15), 0 0 0 14px rgba(193,167,130,0.04); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.07; transform: scale(1); }
  50%       { opacity: 0.12; transform: scale(1.08); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 0.1; }
}

.animate-scroll-pulse {
  animation: scrollPulse 2s ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glowPulse 4s ease-in-out infinite;
}
```

**Step 2: Add skip-to-content link in layout**

In `app/layout.tsx`, add as the very first child of `<body>`:
```tsx
<a href="#main-content" className="skip-to-content">Skip to content</a>
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add app/globals.css app/layout.tsx && git commit -m "feat: global CSS — focus rings, reduced-motion, keyframes, skip link"
```

---

## Layer 2: AnimatedCounter, Enhanced SectionReveal, MagneticButton

### Task 4: AnimatedCounter component

**Files:**
- Create: `components/AnimatedCounter.tsx`
- Modify: `components/About.tsx`
- Modify: `app/about/page.tsx`

**Step 1: Create component**

```tsx
// components/AnimatedCounter.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion'

interface Props {
  value: string        // e.g. "10+" or "٥٠٠+" or "100%"
  className?: string
}

function extractNumber(val: string): { prefix: string; num: number; suffix: string } {
  const match = val.match(/^([^\d٠-٩]*)([0-9٠-٩]+)([^\d٠-٩]*)$/)
  if (!match) return { prefix: '', num: 0, suffix: val }
  // Convert Arabic-Indic digits to Western
  const western = match[2].replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
  return { prefix: match[1], num: parseInt(western, 10), suffix: match[3] }
}

export default function AnimatedCounter({ value, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState('0')
  const { prefix, num, suffix } = extractNumber(value)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(String(Math.round(latest)))
      },
    })
    return controls.stop
  }, [isInView, num])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
```

**Step 2: Use in About.tsx**

In `components/About.tsx`, replace the static stat value render:
```tsx
// Before:
<p className="font-cormorant text-[40px] text-gold font-light leading-none mb-1">
  {stat.value}
</p>

// After:
import AnimatedCounter from './AnimatedCounter'
// ...
<AnimatedCounter
  value={stat.value}
  className="font-cormorant text-[40px] text-gold font-light leading-none mb-1 block"
/>
```

**Step 3: Use in app/about/page.tsx**

Same replacement for the stats in the About page stat grid.

**Step 4: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 5: Commit**

```bash
cd /root/ayc && git add components/AnimatedCounter.tsx components/About.tsx app/about/page.tsx && git commit -m "feat: animated number counters on stats"
```

---

### Task 5: Enhanced SectionReveal with clip-reveal and split-text

**Files:**
- Modify: `components/SectionReveal.tsx`
- Create: `components/SplitText.tsx`

**Step 1: Add clip-reveal variant to SectionReveal**

```tsx
// components/SectionReveal.tsx — full replacement
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'none'
type Variant = 'fade' | 'clip'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: Direction
  variant?: Variant
}

export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  variant = 'fade',
}: Props) {
  if (variant === 'clip') {
    return (
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const variants = {
    up:    { initial: { opacity: 0, y: 36 },  animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -36 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 36 },  animate: { opacity: 1, x: 0 } },
    none:  { initial: { opacity: 0 },          animate: { opacity: 1 } },
  }

  const { initial, animate } = variants[direction]

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Step 2: Create SplitText component**

```tsx
// components/SplitText.tsx
'use client'

import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export default function SplitText({ text, className = '', delay = 0, stagger = 0.04 }: Props) {
  const words = text.split(' ')

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add components/SectionReveal.tsx components/SplitText.tsx && git commit -m "feat: clip-reveal variant for SectionReveal and SplitText component"
```

---

### Task 6: MagneticButton component

**Files:**
- Create: `components/MagneticButton.tsx`

**Step 1: Create component**

```tsx
// components/MagneticButton.tsx
'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticButton({ children, className = '', strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    // Touch devices: skip
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Step 2: Apply to CTAs**

Wrap the CTA buttons in `components/Hero.tsx`, `components/About.tsx`, `components/FeaturedCollection.tsx`, and `components/ContactSection.tsx` with `<MagneticButton>`:

```tsx
import MagneticButton from './MagneticButton'
// ...
<MagneticButton>
  <Link href="/collections" className="btn-outline-gold">
    {t.hero.cta}
  </Link>
</MagneticButton>
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add components/MagneticButton.tsx components/Hero.tsx components/About.tsx components/FeaturedCollection.tsx components/ContactSection.tsx && git commit -m "feat: magnetic button effect on all CTAs"
```

---

## Layer 3: TiltCard, HorizontalScroll, BrandMarquee, Timeline

### Task 7: TiltCard component

**Files:**
- Create: `components/TiltCard.tsx`
- Modify: `components/Categories.tsx`
- Modify: `app/categories/page.tsx`

**Step 1: Create TiltCard**

```tsx
// components/TiltCard.tsx
'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltCard({ children, className = '', maxTilt = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

**Step 2: Wrap category cards in TiltCard**

In `components/Categories.tsx` and `app/categories/page.tsx`, wrap the `<motion.div>` card with `<TiltCard>`. Remove the `whileHover={{ y: -4 }}` from the inner motion.div (tilt replaces it).

```tsx
import TiltCard from './TiltCard'
// ...
<TiltCard>
  <motion.div className="relative overflow-hidden cursor-pointer group" style={{ aspectRatio: '3/4' }}>
    {/* ... existing card content ... */}
  </motion.div>
</TiltCard>
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add components/TiltCard.tsx components/Categories.tsx app/categories/page.tsx && git commit -m "feat: 3D tilt card effect on category cards"
```

---

### Task 8: BrandMarquee component

**Files:**
- Create: `components/BrandMarquee.tsx`
- Modify: `components/About.tsx`

**Step 1: Create BrandMarquee**

```tsx
// components/BrandMarquee.tsx
'use client'

interface Props {
  text?: string
  speed?: number   // seconds for one full loop
  className?: string
}

export default function BrandMarquee({
  text = 'AL-YOUSIFI CLASSIC ✦ KHARTOUM ✦ EST. 2015 ✦ LUXURY MENSWEAR ✦ ',
  speed = 28,
  className = '',
}: Props) {
  // Duplicate to create seamless loop
  const doubled = text + text

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span
          className="text-[9px] tracking-[5px] uppercase font-jost whitespace-nowrap"
          style={{ color: 'rgba(193,167,130,0.18)' }}
        >
          {doubled}
        </span>
      </div>
    </div>
  )
}
```

**Step 2: Add to About section**

In `components/About.tsx`, add `<BrandMarquee />` after the stats block and before the CTA:

```tsx
import BrandMarquee from './BrandMarquee'
// after SectionReveal wrapping stats:
<SectionReveal delay={0.5}>
  <BrandMarquee className="mt-10 -mx-8 md:-mx-14" />
</SectionReveal>
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add components/BrandMarquee.tsx components/About.tsx && git commit -m "feat: brand marquee ticker in About section"
```

---

### Task 9: HorizontalScroll component

**Files:**
- Create: `components/HorizontalScroll.tsx`

**Step 1: Create HorizontalScroll**

```tsx
// components/HorizontalScroll.tsx
'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-6 pl-8 md:pl-14">
          {children}
        </motion.div>
      </div>
    </div>
  )
}
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add components/HorizontalScroll.tsx && git commit -m "feat: horizontal scroll scrub component"
```

---

### Task 10: Timeline component

**Files:**
- Create: `components/Timeline.tsx`

**Step 1: Create Timeline**

```tsx
// components/Timeline.tsx
'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  year: string
  title: { ar: string; en: string }
  body: { ar: string; en: string }
}

const ITEMS: TimelineItem[] = [
  {
    year: '2014',
    title: { ar: 'التأسيس', en: 'Founded' },
    body: { ar: 'أُسِّست اليوسفي كلاسيك برؤية واحدة — إعادة تعريف موضة الرجال في السودان.', en: 'Al-Yousifi Classic was born with one vision — to redefine menswear in Sudan.' },
  },
  {
    year: '2016',
    title: { ar: 'أول تشكيلة', en: 'First Collection' },
    body: { ar: 'إطلاق أول تشكيلة رسمية كاملة مع خطوط الكتان والقطن الفاخر.', en: 'Launch of the first full formal collection with premium linen and cotton lines.' },
  },
  {
    year: '2019',
    title: { ar: 'التوسع', en: 'Expansion' },
    body: { ar: 'توسيع المرسم وإضافة خطوط الأحذية الجلدية والإكسسوارات الحصرية.', en: 'Atelier expansion — adding handcrafted leather footwear and exclusive accessories.' },
  },
  {
    year: '2022',
    title: { ar: 'المتجر الرئيسي', en: 'Flagship Store' },
    body: { ar: 'افتتاح المتجر الرئيسي في شارع الكلاكلة، الخرطوم.', en: 'Grand opening of the flagship store on Alkalakla Avenue, Khartoum.' },
  },
  {
    year: '2025',
    title: { ar: 'التشكيلة النوبية', en: 'The Nubian Collection' },
    body: { ar: 'إطلاق التشكيلة النوبية — الخريف، ألوان الصحراء في أبهى صورها.', en: 'Launch of The Nubian Collection — Fall, desert tones at their finest.' },
  },
]

interface Props {
  lang: 'ar' | 'en'
}

export default function Timeline({ lang }: Props) {
  return (
    <div className="relative max-w-[700px] mx-auto">
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-1/2 top-0 bottom-0 w-px origin-top"
        style={{ background: 'rgba(193,167,130,0.12)', transform: 'translateX(-50%)' }}
      />

      <div className="flex flex-col gap-16">
        {ITEMS.map((item, i) => {
          const isLeft = i % 2 === 0
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }}
              className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-6`}
            >
              {/* Left content */}
              <div className={isLeft ? 'text-right' : ''}>
                {isLeft && (
                  <>
                    <p className="font-cormorant text-[28px] font-light text-gold leading-none mb-1">{item.year}</p>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-ivory/60 font-jost mb-2">{item.title[lang]}</h4>
                    <p className="text-[13px] text-ivory/35 leading-[1.8] font-light" dir="auto">{item.body[lang]}</p>
                  </>
                )}
              </div>

              {/* Center dot */}
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--gold)', boxShadow: '0 0 12px rgba(193,167,130,0.3)' }} />
              </div>

              {/* Right content */}
              <div className={!isLeft ? '' : ''}>
                {!isLeft && (
                  <>
                    <p className="font-cormorant text-[28px] font-light text-gold leading-none mb-1">{item.year}</p>
                    <h4 className="text-[11px] tracking-[3px] uppercase text-ivory/60 font-jost mb-2">{item.title[lang]}</h4>
                    <p className="text-[13px] text-ivory/35 leading-[1.8] font-light" dir="auto">{item.body[lang]}</p>
                  </>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add components/Timeline.tsx && git commit -m "feat: brand history timeline component"
```

---

## Layer 4: Hero Particle Canvas + Parallax

### Task 11: Hero particle canvas and scroll parallax

**Files:**
- Create: `components/HeroCanvas.tsx`
- Modify: `components/Hero.tsx`

**Step 1: Create HeroCanvas**

```tsx
// components/HeroCanvas.tsx
'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  opacity: number; size: number
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let raf: number

    const N = 70
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.25 + 0.05,
      size: Math.random() * 1.5 + 0.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(193,167,130,${p.opacity})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}
```

**Step 2: Update Hero.tsx with canvas and parallax**

In `components/Hero.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { StrokeWatermark } from './AYCLogo'
import HeroCanvas from './HeroCanvas'
import MagneticButton from './MagneticButton'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function Hero() {
  const { t } = useLanguage()
  const { scrollY } = useScroll()
  const logoY = useTransform(scrollY, [0, 600], [0, -120])
  const textY = useTransform(scrollY, [0, 600], [0, -60])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">

      {/* Layer 0: Particle canvas */}
      <HeroCanvas />

      {/* Layer 1: Stroke watermark */}
      <StrokeWatermark
        opacity={0.03}
        className="inset-0 flex items-center justify-center"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(900px, 95vw)',
          height: 'min(900px, 95vw)',
        }}
      />

      {/* Layer 2: Radial glow — breathing */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none animate-glow-pulse"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 48%, rgba(193,167,130,0.09) 0%, transparent 65%)' }}
      />

      {/* Layer 3: Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">

        {/* Logo with parallax */}
        <motion.div {...fadeUp(0.5)} style={{ y: logoY }} className="mb-7">
          <div className="relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: '140%', height: '140%', background: 'radial-gradient(ellipse, rgba(193,167,130,0.08) 0%, transparent 65%)' }}
            />
            <img
              src="/logo.svg"
              alt="Al-Yousifi Classic"
              style={{
                width: 'min(420px, 68vw)',
                height: 'auto',
                filter: 'brightness(0) invert(1) sepia(1) drop-shadow(0 0 60px rgba(193,167,130,0.22)) drop-shadow(0 0 120px rgba(193,167,130,0.08))',
              }}
            />
          </div>
        </motion.div>

        {/* Ornamental divider */}
        <motion.div {...fadeUp(0.85)} className="flex items-center gap-4 mb-5">
          <div className="w-10 h-px" style={{ background: 'rgba(193,167,130,0.3)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(193,167,130,0.45)' }} />
          <div className="w-10 h-px" style={{ background: 'rgba(193,167,130,0.3)' }} />
        </motion.div>

        {/* Text with parallax */}
        <motion.div style={{ y: textY }} className="flex flex-col items-center">
          <motion.p
            {...fadeUp(1.0)}
            className="font-cormorant italic text-gold tracking-[4px] mb-3"
            style={{ fontSize: 'clamp(15px, 2vw, 21px)' }}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.p
            {...fadeUp(1.25)}
            className="font-arabic text-[15px] text-gold/40 mb-12 tracking-wide"
            dir="auto"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div {...fadeUp(1.5)}>
            <MagneticButton>
              <Link href="/collections" className="btn-outline-gold">
                {t.hero.cta}
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-9 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] tracking-[3px] uppercase text-ivory/20 font-jost">{t.hero.scroll}</span>
        <div
          className="w-px h-10 animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, rgba(193,167,130,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add components/HeroCanvas.tsx components/Hero.tsx && git commit -m "feat: hero particle canvas and scroll parallax"
```

---

## Layer 5: Page Upgrades

### Task 12: About page — timeline, split-text, values

**Files:**
- Modify: `app/about/page.tsx`

**Step 1: Full about page replacement**

Replace the content of `app/about/page.tsx` with:

```tsx
'use client'

import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import SplitText from '@/components/SplitText'
import AnimatedCounter from '@/components/AnimatedCounter'
import Timeline from '@/components/Timeline'
import { useLanguage } from '@/lib/LanguageContext'

export default function AboutPage() {
  const { t, lang } = useLanguage()
  const { about } = t
  const isAr = lang === 'ar'

  const values = [
    {
      icon: '◈',
      title: { ar: 'الإرث', en: 'Heritage' },
      body: { ar: 'نحمل روح السودان في كل غرزة وكل قطعة نصنعها.', en: 'We carry the soul of Sudan in every stitch and every piece we create.' },
    },
    {
      icon: '◇',
      title: { ar: 'الحرفية', en: 'Craft' },
      body: { ar: 'الكمال يسكن في التفاصيل — ولا نتنازل عن أي منها.', en: 'Perfection lives in the details — and we never compromise on any of them.' },
    },
    {
      icon: '◉',
      title: { ar: 'الحداثة', en: 'Modernity' },
      body: { ar: 'نجمع بين الأصالة والمعاصرة لنصنع رجلاً يقود عصره.', en: 'We bridge heritage and the contemporary to craft a man who leads his era.' },
    },
  ]

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=60"
            alt="About"
            fill priority sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.6)' }}
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)' }} />
        <div className="relative z-10 px-8 md:px-14 pb-16 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-3">{about.label}</p>
          <h1 className="font-cormorant font-light text-ivory" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            <SplitText text={`${about.title} ${about.titleAccent}`} delay={0.2} />
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionReveal>
              <p className="text-[16px] leading-[2.1] text-ivory/60 font-light" dir="auto">{about.body}</p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="text-[15px] leading-[2.1] text-ivory/40 font-light mt-6" dir="auto">
                {isAr
                  ? 'نحن نؤمن أنّ الأزياء هي لغة صامتة تُعبّر عن شخصية صاحبها قبل أن ينطق بكلمة.'
                  : 'We believe fashion is a silent language that speaks your character before you utter a word.'}
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.15} direction="right">
            <div className="grid grid-cols-1 gap-px" style={{ border: '1px solid rgba(193,167,130,0.07)' }}>
              {[about.stat1, about.stat2, about.stat3].map((stat, i) => (
                <div key={i} className="px-10 py-10 flex flex-col"
                  style={{ background: i % 2 === 0 ? 'var(--rich)' : 'var(--card)', borderBottom: i < 2 ? '1px solid rgba(193,167,130,0.07)' : 'none' }}>
                  <AnimatedCounter value={stat.value} className="font-cormorant text-[52px] font-light text-gold leading-none mb-2 block" />
                  <p className="text-[11px] tracking-[2px] uppercase text-ivory/30 font-jost">{stat.label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal><p className="section-label mb-4 text-center">{isAr ? 'قيمنا' : 'Our Values'}</p></SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="section-title text-ivory text-center mb-16">
              {isAr ? 'ما نؤمن' : 'What We'}{' '}
              <em className="text-gold not-italic">{isAr ? 'به' : 'Believe'}</em>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {values.map((v, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div className="px-10 py-12 group" style={{ borderRight: i < 2 ? '1px solid rgba(193,167,130,0.07)' : 'none' }}>
                  <p className="text-[32px] text-gold/20 mb-6">{v.icon}</p>
                  <h3 className="font-cormorant text-[24px] text-ivory mb-4 group-hover:text-gold transition-colors duration-400">{v.title[lang]}</h3>
                  <p className="text-[14px] text-ivory/40 leading-[1.9] font-light" dir="auto">{v.body[lang]}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal><p className="section-label mb-4 text-center">{isAr ? 'مسيرتنا' : 'Our Journey'}</p></SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="section-title text-ivory text-center mb-20">
              {isAr ? 'عقد من' : 'A Decade of'}{' '}
              <em className="text-gold not-italic">{isAr ? 'الأناقة' : 'Elegance'}</em>
            </h2>
          </SectionReveal>
          <Timeline lang={lang} />
        </div>
      </section>

      {/* Vision */}
      <section className="py-28 px-8 md:px-14 text-center" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[700px] mx-auto">
          <SectionReveal><p className="section-label mb-5">{isAr ? 'رؤيتنا' : 'Our Vision'}</p></SectionReveal>
          <SectionReveal delay={0.15}>
            <blockquote className="font-cormorant italic font-light text-ivory leading-[1.7]"
              style={{ fontSize: 'clamp(22px, 3vw, 34px)' }} dir="auto">
              {isAr
                ? '"أن يكون الرجل السوداني مثالًا للأناقة العالمية — دون أن يفقد هويّته."'
                : '"For the Sudanese man to stand as a global standard of elegance — without losing his identity."'}
            </blockquote>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <div className="flex items-center justify-center gap-4 mt-8 opacity-30">
              <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
              <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add app/about/page.tsx && git commit -m "feat: about page — timeline, values triptych, split-text hero"
```

---

### Task 13: Collections data + detail page

**Files:**
- Create: `lib/collections.ts`
- Create: `app/collections/[id]/page.tsx`
- Modify: `app/collections/page.tsx`

**Step 1: Create extended collections data**

```ts
// lib/collections.ts
export const COLLECTIONS_EXTENDED = [
  {
    id: 'nubian',
    image: 'photo-1539109136881-3be0616acf4b',
    tag: { ar: 'خريف ٢٠٢٥', en: 'Fall 2025' },
    title: { ar: 'التشكيلة النوبية', en: 'The Nubian Collection' },
    sub: { ar: 'ألوان الصحراء في أناقة عصرية', en: 'Desert tones in contemporary elegance' },
    story: {
      ar: 'مستوحاة من صمت الصحراء النوبية عند الغسق. ألوان كحلية داكنة وفحمية مع لمسات كهرمانية دافئة. كتان مُهيأ بدقة، بليزرات هيكلية، وإكسسوارات جلدية مخيطة يدويًا.',
      en: 'Inspired by the vast silence of the Nubian Desert at dusk. Deep navy and charcoal tones with amber accents. Tailored linens, structured blazers, and hand-stitched leather accessories.',
    },
    palette: ['#1B2A4A', '#2C2C2C', '#C17A2A'],
    paletteNames: { ar: ['كحلي', 'فحمي', 'كهرماني'], en: ['Navy', 'Charcoal', 'Amber'] },
    details: [
      { label: { ar: 'الخامة', en: 'Material' }, value: { ar: 'كتان وقطن فاخر', en: 'Premium Linen & Cotton' } },
      { label: { ar: 'الأسلوب', en: 'Style' }, value: { ar: 'منظّم معاصر', en: 'Structured Contemporary' } },
      { label: { ar: 'الموسم', en: 'Season' }, value: { ar: 'خريف ٢٠٢٥', en: 'Fall 2025' } },
    ],
    gallery: [
      'photo-1539109136881-3be0616acf4b',
      'photo-1507003211169-0a1dd7228f2d',
      'photo-1490895668178-57960d4f8c0f',
      'photo-1534030347209-467a5b0ad3e6',
      'photo-1558618666-fcd25c85cd64',
      'photo-1536766820879-059fec98ec0a',
    ],
  },
  {
    id: 'desert-rose',
    image: 'photo-1507003211169-0a1dd7228f2d',
    tag: { ar: 'صيف ٢٠٢٥', en: 'Summer 2025' },
    title: { ar: 'وردة الصحراء', en: 'Desert Rose' },
    sub: { ar: 'خفّة الصيف بأسلوب لا يُضاهى', en: 'Summer lightness in unmatched style' },
    story: {
      ar: 'تشكيلة صيفية خفيفة مستوحاة من ورود الصحراء عند الفجر. أقمشة تتنفس بألوان الرمال والوردي الباهت.',
      en: 'A light summer collection inspired by desert roses at dawn. Breathable fabrics in sandy and muted rose tones.',
    },
    palette: ['#C8A882', '#D4B5A0', '#8B6F6F'],
    paletteNames: { ar: ['رملي', 'وردي باهت', 'أحمر ترابي'], en: ['Sand', 'Muted Rose', 'Dusty Red'] },
    details: [
      { label: { ar: 'الخامة', en: 'Material' }, value: { ar: 'قطن مصري فاخر', en: 'Egyptian Premium Cotton' } },
      { label: { ar: 'الأسلوب', en: 'Style' }, value: { ar: 'كاجوال راقٍ', en: 'Refined Casual' } },
      { label: { ar: 'الموسم', en: 'Season' }, value: { ar: 'صيف ٢٠٢٥', en: 'Summer 2025' } },
    ],
    gallery: [
      'photo-1507003211169-0a1dd7228f2d',
      'photo-1515886657613-9f3515b0c78f',
      'photo-1474631245212-32dc3c8310c6',
      'photo-1548142813-c348350df52b',
      'photo-1594938298603-c8148c4dae35',
      'photo-1490114538077-0a7f8cb49891',
    ],
  },
  {
    id: 'khartoum-nights',
    image: 'photo-1490895668178-57960d4f8c0f',
    tag: { ar: 'ربيع ٢٠٢٥', en: 'Spring 2025' },
    title: { ar: 'ليالي الخرطوم', en: 'Khartoum Nights' },
    sub: { ar: 'أناقة الليل في قلب العاصمة', en: 'Evening sophistication at the heart of the capital' },
    story: {
      ar: 'للأمسيات الراقية في قلب الخرطوم. أسود عميق، أبيض ناصع، وتفاصيل ذهبية تعكس أضواء المدينة.',
      en: 'For refined evenings in the heart of Khartoum. Deep blacks, crisp whites, and gold details that mirror the city lights.',
    },
    palette: ['#050505', '#F5F0EB', '#C1A782'],
    paletteNames: { ar: ['أسود', 'عاجي', 'ذهبي'], en: ['Black', 'Ivory', 'Gold'] },
    details: [
      { label: { ar: 'الخامة', en: 'Material' }, value: { ar: 'صوف وحرير', en: 'Wool & Silk Blend' } },
      { label: { ar: 'الأسلوب', en: 'Style' }, value: { ar: 'رسمي فاخر', en: 'Formal Luxury' } },
      { label: { ar: 'الموسم', en: 'Season' }, value: { ar: 'ربيع ٢٠٢٥', en: 'Spring 2025' } },
    ],
    gallery: [
      'photo-1490895668178-57960d4f8c0f',
      'photo-1441984904996-e0b6ba687e04',
      'photo-1553545204-4f7d339aa06a',
      'photo-1502163140606-888448ae8cfe',
      'photo-1558618666-fcd25c85cd64',
      'photo-1536766820879-059fec98ec0a',
    ],
  },
  {
    id: 'signature',
    image: 'photo-1534030347209-467a5b0ad3e6',
    tag: { ar: 'كلاسيكية', en: 'Classic' },
    title: { ar: 'التوقيع', en: 'The Signature' },
    sub: { ar: 'تشكيلتنا الأساسية الخالدة', en: 'Our timeless essential collection' },
    story: {
      ar: 'التوقيع هي روح اليوسفي كلاسيك — قطع أساسية خالدة تتجاوز الموسم والزمن. كل قطعة تُلبس لعقود.',
      en: 'The Signature is the soul of Al-Yousifi Classic — timeless essentials that transcend season and time. Every piece worn for decades.',
    },
    palette: ['#2C2420', '#8B7355', '#C1A782'],
    paletteNames: { ar: ['جوزي', 'بيج عميق', 'ذهبي'], en: ['Walnut', 'Deep Beige', 'Gold'] },
    details: [
      { label: { ar: 'الخامة', en: 'Material' }, value: { ar: 'خامات متعددة راقية', en: 'Multi-Premium Blends' } },
      { label: { ar: 'الأسلوب', en: 'Style' }, value: { ar: 'كلاسيكي خالد', en: 'Timeless Classic' } },
      { label: { ar: 'الموسم', en: 'Season' }, value: { ar: 'على مدار السنة', en: 'Year Round' } },
    ],
    gallery: [
      'photo-1534030347209-467a5b0ad3e6',
      'photo-1474631245212-32dc3c8310c6',
      'photo-1548142813-c348350df52b',
      'photo-1594938298603-c8148c4dae35',
      'photo-1502163140606-888448ae8cfe',
      'photo-1553545204-4f7d339aa06a',
    ],
  },
]
```

**Step 2: Create collection detail page**

```tsx
// app/collections/[id]/page.tsx
'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { COLLECTIONS_EXTENDED } from '@/lib/collections'
import SectionReveal from '@/components/SectionReveal'
import Lightbox from '@/components/Lightbox'
import MagneticButton from '@/components/MagneticButton'

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const { lang } = useLanguage()
  const col = COLLECTIONS_EXTENDED.find(c => c.id === params.id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = col?.gallery.map(id => `https://images.unsplash.com/${id}?w=1200&q=80`) ?? []

  if (!col) notFound()

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={`https://images.unsplash.com/${col.image}?w=1400&q=70`}
            alt={col.title[lang]} fill priority sizes="100vw"
            className="object-cover" style={{ filter: 'brightness(0.3) saturate(0.7)' }} />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)' }} />
        <div className="relative z-10 px-8 md:px-14 pb-20 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-4">{col.tag[lang]}</p>
          <h1 className="font-cormorant font-light text-ivory mb-4" style={{ fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 1.05 }}>
            {col.title[lang]}
          </h1>
          <p className="text-[15px] text-ivory/50 font-light max-w-[500px]" dir="auto">{col.sub[lang]}</p>
        </div>
      </section>

      {/* Story + Details */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
          <div>
            <SectionReveal>
              <p className="section-label mb-5">{lang === 'ar' ? 'عن التشكيلة' : 'About the Collection'}</p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="text-[17px] leading-[2.1] text-ivory/60 font-light max-w-[520px]" dir="auto">{col.story[lang]}</p>
            </SectionReveal>

            {/* Palette */}
            <SectionReveal delay={0.2}>
              <div className="flex gap-3 mt-10">
                {col.palette.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full" style={{ background: color, border: '1px solid rgba(193,167,130,0.15)' }} />
                    <p className="text-[9px] tracking-[2px] uppercase text-ivory/30 font-jost">{col.paletteNames[lang][i]}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Details */}
          <SectionReveal delay={0.15} direction="right">
            <div className="flex flex-col gap-px" style={{ border: '1px solid rgba(193,167,130,0.07)' }}>
              {col.details.map((d, i) => (
                <div key={i} className="px-8 py-7" style={{ background: i % 2 === 0 ? 'var(--rich)' : 'var(--card)', borderBottom: i < col.details.length - 1 ? '1px solid rgba(193,167,130,0.07)' : 'none' }}>
                  <p className="text-[9px] tracking-[3px] uppercase text-gold mb-2 font-jost">{d.label[lang]}</p>
                  <p className="text-[15px] text-ivory/55" dir="auto">{d.value[lang]}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal><p className="section-label mb-10">{lang === 'ar' ? 'معرض التشكيلة' : 'Collection Gallery'}</p></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {col.gallery.map((imgId, i) => (
              <SectionReveal key={imgId} delay={i * 0.07} variant="clip">
                <div onClick={() => setLightboxIndex(i)}
                  className="relative overflow-hidden cursor-zoom-in group"
                  style={{ aspectRatio: i % 3 === 0 ? '2/3' : '3/4' }}>
                  <Image src={`https://images.unsplash.com/${imgId}?w=600&q=65`}
                    alt="" fill sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ filter: 'brightness(0.75) saturate(0.8)' }} />
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-all duration-400" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Back CTA */}
      <section className="py-20 px-8 md:px-14 bg-black text-center">
        <MagneticButton>
          <Link href="/collections" className="btn-outline-gold">{lang === 'ar' ? 'كل التشكيلات' : 'All Collections'}</Link>
        </MagneticButton>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i! - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex(i => (i! + 1) % images.length)} />
      )}
    </>
  )
}
```

**Step 3: Update collections list page to use HorizontalScroll and link to detail pages**

In `app/collections/page.tsx`, import `COLLECTIONS_EXTENDED` from `@/lib/collections` instead of the local constant, wrap the grid with `HorizontalScroll`, and make each card a `<Link href={/collections/${col.id}}>`.

```tsx
// Key changes to app/collections/page.tsx:
import { COLLECTIONS_EXTENDED } from '@/lib/collections'
import HorizontalScroll from '@/components/HorizontalScroll'
import Link from 'next/link'

// Replace the grid section:
<HorizontalScroll>
  {COLLECTIONS_EXTENDED.map((col, i) => (
    <Link key={col.id} href={`/collections/${col.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden cursor-pointer flex-shrink-0"
        style={{ width: 'min(420px, 80vw)', aspectRatio: '3/4' }}
      >
        <Image
          src={`https://images.unsplash.com/${col.image}?w=600&q=60`}
          alt={col.title[lang]} fill
          sizes="420px"
          className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.05]"
          style={{ filter: 'brightness(0.55) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8))' }} />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <p className="text-[9px] tracking-[3px] uppercase text-gold/60 mb-2 font-jost">{col.tag[lang]}</p>
          <h3 className="font-cormorant font-light text-ivory mb-1" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }} dir="auto">{col.title[lang]}</h3>
          <p className="text-[13px] text-ivory/45 font-light" dir="auto">{col.sub[lang]}</p>
        </div>
      </motion.div>
    </Link>
  ))}
</HorizontalScroll>
```

**Step 4: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 5: Commit**

```bash
cd /root/ayc && git add lib/collections.ts app/collections/page.tsx app/collections/[id]/page.tsx && git commit -m "feat: collection detail pages with gallery, horizontal scroll on list"
```

---

### Task 14: Categories page filter tabs

**Files:**
- Modify: `app/categories/page.tsx`

**Step 1: Add filter tabs**

```tsx
// Key additions to app/categories/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// ... existing imports ...

const FILTER_TABS = {
  ar: ['الكل', 'الرسمي', 'الكاجوال', 'الأحذية', 'الساعات', 'الإكسسوار'],
  en: ['All', 'Formal', 'Casual', 'Footwear', 'Watches', 'Accessories'],
}
const FILTER_IDS = ['all', 'formal', 'casual', 'footwear', 'watches', 'rings']

export default function CategoriesPage() {
  const { t, lang } = useLanguage()
  const { categories } = t
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? CATEGORIES
    : CATEGORIES.filter(c => c.id === activeFilter)

  return (
    <>
      {/* ... existing hero ... */}

      {/* Filter tabs */}
      <section className="pt-14 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {FILTER_IDS.map((id, i) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className="relative flex-shrink-0 px-5 py-2.5 text-[9px] tracking-[3px] uppercase font-jost transition-colors duration-300"
                style={{ color: activeFilter === id ? 'var(--gold)' : 'rgba(245,240,235,0.3)' }}
              >
                {FILTER_TABS[lang][i]}
                {activeFilter === id && (
                  <motion.div
                    layoutId="filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{ background: 'var(--gold)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid with AnimatePresence */}
      <section className="py-14 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((cat, i) => (
                <motion.div key={cat.id} layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  {/* ... existing card content wrapped in TiltCard ... */}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  )
}
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add app/categories/page.tsx && git commit -m "feat: categories filter tabs with animated layout"
```

---

### Task 15: Lookbook page — lightbox + filter tabs + share

**Files:**
- Modify: `app/lookbook/page.tsx`

**Step 1: Add lightbox and filter tabs to lookbook page**

Key additions:
- Import `Lightbox` and wire it up (same pattern as `components/Lookbook.tsx`)
- Add collection filter tabs (All | Nubian | Desert Rose | Khartoum Nights | Signature)
- Add download/share inside Lightbox by extending `Lightbox.tsx`

In `app/lookbook/page.tsx`, add at top:
```tsx
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
const [activeFilter, setActiveFilter] = useState('all')
const imageUrls = allImages.map(img => `https://images.unsplash.com/${img.id}?w=1200&q=80`)
```

Wire each image tile with `onClick={() => setLightboxIndex(i)}` and add `<Lightbox>` at bottom.

**Step 2: Extend Lightbox with share action**

In `components/Lightbox.tsx`, add a share button inside the lightbox:
```tsx
<button
  onClick={async () => {
    try {
      await navigator.share({ url: images[index] })
    } catch {
      // fallback: copy to clipboard or download
      const a = document.createElement('a')
      a.href = images[index]
      a.download = `ayc-lookbook-${index + 1}.jpg`
      a.click()
    }
  }}
  className="absolute top-7 right-16 text-gold/40 hover:text-gold transition-colors z-10"
  aria-label="Share"
>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
</button>
```

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add app/lookbook/page.tsx components/Lightbox.tsx && git commit -m "feat: lookbook page — lightbox, filter tabs, share/download action"
```

---

### Task 16: Contact page — WhatsApp form

**Files:**
- Modify: `app/contact/page.tsx`

**Step 1: Add compose form**

Replace the sticky map side with a form that composes a WhatsApp message:

```tsx
// Add state + form to app/contact/page.tsx
const [name, setName] = useState('')
const [message, setMessage] = useState('')
const isAr = lang === 'ar'

const composed = encodeURIComponent(
  isAr
    ? `مرحبًا، أنا ${name || '...'}\n${message || 'أرغب في الاستفسار عن تشكيلاتكم.'}`
    : `Hello, I'm ${name || '...'}\n${message || 'I'd like to inquire about your collections.'}`
)
const waHref = `https://wa.me/${PHONE}?text=${composed}`

// Form JSX (replace map section):
<SectionReveal delay={0.2} direction="right">
  <div className="sticky top-28 flex flex-col gap-6" style={{ border: '1px solid rgba(193,167,130,0.07)', padding: '40px' }}>
    <p className="section-label">{isAr ? 'أرسل رسالة' : 'Send a Message'}</p>
    <input
      type="text"
      placeholder={isAr ? 'اسمك' : 'Your Name'}
      value={name}
      onChange={e => setName(e.target.value)}
      dir="auto"
      className="w-full bg-transparent border-b text-[14px] text-ivory/70 pb-3 outline-none placeholder:text-ivory/20 font-light"
      style={{ borderColor: 'rgba(193,167,130,0.15)', fontFamily: 'var(--font-jost)' }}
    />
    <textarea
      placeholder={isAr ? 'رسالتك' : 'Your Message'}
      value={message}
      onChange={e => setMessage(e.target.value)}
      rows={4}
      dir="auto"
      className="w-full bg-transparent border-b text-[14px] text-ivory/70 pb-3 outline-none resize-none placeholder:text-ivory/20 font-light"
      style={{ borderColor: 'rgba(193,167,130,0.15)', fontFamily: 'var(--font-jost)' }}
    />
    <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-solid-gold self-start">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967..." />
      </svg>
      {isAr ? 'أرسل عبر واتساب' : 'Send via WhatsApp'}
    </a>
  </div>
</SectionReveal>
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add app/contact/page.tsx && git commit -m "feat: contact page WhatsApp compose form"
```

---

### Task 17: 404 page

**Files:**
- Create: `app/not-found.tsx`

**Step 1: Create 404 page**

```tsx
// app/not-found.tsx
import Link from 'next/link'
import { StrokeWatermark } from '@/components/AYCLogo'

export default function NotFound() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      <StrokeWatermark
        opacity={0.025}
        className="inset-0 flex items-center justify-center"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(800px, 90vw)', height: 'min(800px, 90vw)' }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <p className="section-label mb-6">404</p>
        <h1
          className="font-cormorant font-light text-gold mb-4"
          style={{ fontSize: 'clamp(80px, 14vw, 160px)', lineHeight: 1 }}
        >
          404
        </h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px" style={{ background: 'rgba(193,167,130,0.3)' }} />
          <p className="font-cormorant italic text-ivory/50" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
            This page has stepped out
          </p>
          <div className="w-8 h-px" style={{ background: 'rgba(193,167,130,0.3)' }} />
        </div>
        <Link href="/" className="btn-outline-gold mt-4">
          Return Home
        </Link>
      </div>
    </section>
  )
}
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add app/not-found.tsx && git commit -m "feat: 404 page with stroke watermark"
```

---

### Task 18: Testimonials auto-advance + counter

**Files:**
- Modify: `components/Testimonials.tsx`

**Step 1: Add auto-advance and counter**

```tsx
// In components/Testimonials.tsx, add:
useEffect(() => {
  const timer = setInterval(() => {
    setCurrent(c => (c + 1) % testimonials.items.length)
  }, 5000)
  return () => clearInterval(timer)
}, [testimonials.items.length])

// Replace dot navigation with counter:
<div className="flex items-center justify-center gap-5 mt-10">
  <button onClick={() => setCurrent(c => (c - 1 + testimonials.items.length) % testimonials.items.length)}
    className="text-gold/30 hover:text-gold transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  </button>
  <p className="text-[9px] tracking-[4px] font-jost text-ivory/30">
    {String(current + 1).padStart(2,'0')} / {String(testimonials.items.length).padStart(2,'0')}
  </p>
  <button onClick={() => setCurrent(c => (c + 1) % testimonials.items.length)}
    className="text-gold/30 hover:text-gold transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </button>
</div>
```

**Step 2: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 3: Commit**

```bash
cd /root/ayc && git add components/Testimonials.tsx && git commit -m "feat: testimonials auto-advance and arrow/counter nav"
```

---

## Layer 6: Performance — Blur Placeholders

### Task 19: Blur placeholder utility + apply everywhere

**Files:**
- Create: `lib/blur-placeholder.ts`
- Modify: all pages and components using `<Image>`

**Step 1: Create utility**

```ts
// lib/blur-placeholder.ts

// A 4x4 pixel gold-tinted shimmer as base64 PNG
// Generated once, reused everywhere
export const BLUR_GOLD =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQIW2NkYGD4z8BQDwAEgAF/QualIQAAAABJRU5ErkJggg=='

// Dark shimmer for image overlays
export const BLUR_DARK =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQIW2NgYGD4TwABAAH/AJ5JRAQAAAAASUVORK5CYII='
```

**Step 2: Add to all Image components**

In every file that uses `<Image>` from next/image, add:
```tsx
import { BLUR_GOLD } from '@/lib/blur-placeholder'
// On each <Image>:
placeholder="blur"
blurDataURL={BLUR_GOLD}
```

Files to update:
- `components/About.tsx`
- `components/FeaturedCollection.tsx`
- `components/Categories.tsx`
- `components/Lookbook.tsx`
- `components/ContactSection.tsx`
- `app/about/page.tsx`
- `app/collections/page.tsx`
- `app/collections/[id]/page.tsx`
- `app/categories/page.tsx`
- `app/lookbook/page.tsx`
- `app/contact/page.tsx`

**Step 3: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 4: Commit**

```bash
cd /root/ayc && git add lib/blur-placeholder.ts components/ app/ && git commit -m "perf: blur placeholders on all images"
```

---

## Layer 7: SEO

### Task 20: Per-page metadata + JSON-LD + sitemap + robots

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/collections/page.tsx`
- Modify: `app/categories/page.tsx`
- Modify: `app/lookbook/page.tsx`
- Modify: `app/contact/page.tsx`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Step 1: Root layout metadata + JSON-LD**

In `app/layout.tsx`, update the `metadata` export:
```ts
export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: { default: 'Al-Yousifi Classic | اليوسفي كلاسيك', template: '%s | Al-Yousifi Classic' },
  description: "Sudan's premier men's luxury fashion boutique. Formal wear, casual collections, footwear, watches, and accessories. Located in Khartoum.",
  keywords: 'Al-Yousifi Classic, luxury fashion Sudan, men boutique Khartoum, اليوسفي كلاسيك',
  openGraph: {
    title: 'Al-Yousifi Classic | اليوسفي كلاسيك',
    description: "Sudan's premier men's luxury fashion boutique — Khartoum",
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
}
```

Add JSON-LD in `<head>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ClothingStore',
      name: 'Al-Yousifi Classic',
      alternateName: 'اليوسفي كلاسيك',
      description: "Sudan's premier men's luxury fashion boutique",
      address: { '@type': 'PostalAddress', streetAddress: 'Alkalakla Avenue', addressLocality: 'Khartoum', addressCountry: 'SD' },
      telephone: '+249912302693',
      openingHours: 'Sa-Th 10:00-21:00',
      url: 'https://al-yousifi-classic.vercel.app',
    }),
  }}
/>
```

**Step 2: Per-page metadata (convert pages to use `metadata` export)**

Since pages are `'use client'`, create separate metadata files or convert to server components where metadata is needed. For simplicity, add `export const metadata` to a server wrapper:

For each inner page, create a thin server component wrapper:
```tsx
// app/about/layout.tsx
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Our Story',
  description: "Learn about Al-Yousifi Classic — Sudan's premier luxury menswear boutique, founded in Khartoum.",
}
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

Create layout files for: `app/about/`, `app/collections/`, `app/categories/`, `app/lookbook/`, `app/contact/`

**Step 3: Sitemap**

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://al-yousifi-classic.vercel.app'
  const routes = ['', '/about', '/collections', '/categories', '/lookbook', '/contact']
  const collectionIds = ['nubian', 'desert-rose', 'khartoum-nights', 'signature']

  return [
    ...routes.map(route => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: route === '' ? 1 : 0.8 })),
    ...collectionIds.map(id => ({ url: `${base}/collections/${id}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
```

**Step 4: Robots**

```ts
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://al-yousifi-classic.vercel.app/sitemap.xml',
  }
}
```

**Step 5: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 6: Commit**

```bash
cd /root/ayc && git add app/layout.tsx app/sitemap.ts app/robots.ts app/*/layout.tsx && git commit -m "feat: SEO — metadata, JSON-LD structured data, sitemap, robots"
```

---

## Layer 8: Accessibility

### Task 21: ARIA audit + focus management + reduced-motion

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Lightbox.tsx`
- Modify: `components/WhatsAppButton.tsx`
- Modify: `app/globals.css` (already done in Task 3)

**Step 1: Navbar ARIA**

In `components/Navbar.tsx`, update hamburger button:
```tsx
<button
  aria-label="Toggle menu"
  aria-expanded={mobileOpen}
  aria-controls="mobile-nav"
  // ...
>
```

Add `id="mobile-nav"` to the mobile dropdown `<motion.div>`.

**Step 2: Lightbox ARIA + tab trap**

In `components/Lightbox.tsx`:
```tsx
// Add role and aria attrs to backdrop:
<motion.div
  role="dialog"
  aria-modal="true"
  aria-label="Image lightbox"
  // ...
>
```

Add tab trap effect:
```tsx
useEffect(() => {
  const focusable = document.querySelectorAll<HTMLElement>(
    '[role="dialog"] button, [role="dialog"] [tabindex]:not([tabindex="-1"])'
  )
  if (focusable.length) focusable[0].focus()
  const trap = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
  document.addEventListener('keydown', trap)
  return () => document.removeEventListener('keydown', trap)
}, [])
```

**Step 3: Icon button labels**

Audit all SVG icon buttons across the codebase and ensure every `<button>` with no visible text has an `aria-label`.

**Step 4: Footer text contrast fix**

In `components/Footer.tsx`, change all `text-ivory/22` to `text-ivory/35` and `text-ivory/12` to `text-ivory/25`.

**Step 5: Verify build**

```bash
cd /root/ayc && npm run build 2>&1 | tail -20
```

**Step 6: Commit**

```bash
cd /root/ayc && git add components/Navbar.tsx components/Lightbox.tsx components/Footer.tsx components/WhatsAppButton.tsx && git commit -m "fix: accessibility — ARIA roles, tab trap, focus management, contrast"
```

---

## Layer 9: Build, Push & Deploy

### Task 22: Final build verification + git push + Vercel deploy

**Step 1: Clean build**

```bash
cd /root/ayc && npm run build 2>&1
```
Expected: `✓ Compiled successfully` with zero TypeScript errors and zero warnings.

**Step 2: Check all routes**

```bash
cd /root/ayc && npm run build 2>&1 | grep -E "Route|○|●|λ"
```
Expected: All 6 pages + collection detail routes listed.

**Step 3: Push to GitHub**

```bash
cd /root/ayc && git push origin main
```
Expected: `Branch 'main' set up to track remote branch 'main' from 'origin'.`

**Step 4: Deploy via Vercel MCP**

Use `mcp__vercel__deploy_to_vercel` with the project linked to `github.com/madonessbeat/al-yousifi-classic`. Get live URL.

**Step 5: Verify deployment with Playwright MCP**

Use `mcp__plugin_playwright_playwright__browser_navigate` to visit each page:
- `/` — home
- `/about`
- `/collections`
- `/collections/nubian`
- `/categories`
- `/lookbook`
- `/contact`

Use `mcp__plugin_playwright_playwright__browser_take_screenshot` on each. Confirm:
- Fonts rendered (Cormorant, Jost)
- Gold palette correct
- No layout shifts
- Mobile viewport (375px) — `mcp__plugin_playwright_playwright__browser_resize`

**Step 6: Final commit if any fixes needed**

```bash
cd /root/ayc && git add -A && git commit -m "fix: post-deploy corrections" && git push origin main
```
