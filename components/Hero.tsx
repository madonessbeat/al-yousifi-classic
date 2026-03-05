'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import AYCLogo, { StrokeWatermark } from './AYCLogo'
import MagneticButton from './MagneticButton'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">

      {/* ── Layer 1: Stroke logo — large architectural watermark ── */}
      <StrokeWatermark
        opacity={0.035}
        className="inset-0 flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(900px, 95vw)',
          height: 'min(900px, 95vw)',
        }}
      />

      {/* ── Layer 2: Radial gold ambient glow ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 48%, rgba(193,167,130,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Layer 3: Bottom fade to black ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center px-6">

        {/* Bold logo — hero feature display */}
        <motion.div {...fadeUp(0.5)} className="mb-7">
          <div className="relative">
            {/* Ambient glow ring */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: '140%',
                height: '140%',
                background: 'radial-gradient(ellipse, rgba(193,167,130,0.08) 0%, transparent 65%)',
              }}
            />
            <AYCLogo
              variant="standard"
              color="gold"
              glow
              style={{
                width: 'min(420px, 68vw)',
                height: 'auto',
                filter:
                  'brightness(0) invert(1) sepia(1) drop-shadow(0 0 60px rgba(193,167,130,0.22)) drop-shadow(0 0 120px rgba(193,167,130,0.08))',
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

        {/* Tagline */}
        <motion.p
          {...fadeUp(1.0)}
          className="font-cormorant italic text-gold tracking-[4px] mb-3"
          style={{ fontSize: 'clamp(15px, 2vw, 21px)' }}
        >
          {t.hero.tagline}
        </motion.p>

        {/* Sub */}
        <motion.p
          {...fadeUp(1.25)}
          className="font-arabic text-[15px] text-gold/40 mb-12 tracking-wide"
          dir="auto"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTA */}
        <motion.div {...fadeUp(1.5)}>
          <MagneticButton>
            <Link href="/collections" className="btn-outline-gold">
              {t.hero.cta}
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-9 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] tracking-[3px] uppercase text-ivory/20 font-jost">
          {t.hero.scroll}
        </span>
        <div
          className="w-px h-10 animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, rgba(193,167,130,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
