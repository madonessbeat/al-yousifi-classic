'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      {/* Radial gold glow on background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(193,167,130,0.06) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Logo — Hero Display */}
        <motion.div {...fadeUp(0.5)} className="mb-7">
          <div className="relative">
            {/* Ambient glow behind logo */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse, rgba(193,167,130,0.05) 0%, transparent 70%)',
              }}
            />
            <Image
              src="/logo.png"
              alt="Al-Yousifi Classic"
              width={480}
              height={200}
              priority
              className="relative object-contain"
              style={{
                width: 'min(480px, 72vw)',
                height: 'auto',
                filter: 'drop-shadow(0 0 60px rgba(193,167,130,0.18))',
              }}
            />
          </div>
        </motion.div>

        {/* Ornamental Divider */}
        <motion.div {...fadeUp(0.85)} className="flex items-center gap-4 mb-5">
          <div className="w-8 h-px bg-gold/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          <div className="w-8 h-px bg-gold/30" />
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
          <Link href="/collections" className="btn-outline-gold">
            {t.hero.cta}
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
          style={{
            background: 'linear-gradient(to bottom, rgba(193,167,130,0.6), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
