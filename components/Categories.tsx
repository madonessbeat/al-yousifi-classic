'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import TiltCard from './TiltCard'
import { useLanguage } from '@/lib/LanguageContext'
import { CATEGORIES } from '@/lib/i18n'
import { BLUR_GOLD } from '@/lib/blur-placeholder'

export default function Categories() {
  const { t, lang } = useLanguage()
  const { categories } = t

  return (
    <section className="py-36 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
      {/* Header */}
      <div className="max-w-[1200px] mx-auto mb-16">
        <SectionReveal>
          <p className="section-label mb-4">{categories.label}</p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="section-title text-ivory">
            {categories.title}{' '}
            <em className="text-gold not-italic">{categories.titleAccent}</em>
          </h2>
        </SectionReveal>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {CATEGORIES.map((cat, i) => (
          <SectionReveal key={cat.id} delay={i * 0.08}>
            <Link href={`/categories#${cat.id}`}>
              <TiltCard>
              <motion.div
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden cursor-pointer group"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Image */}
                <Image
                  src={`https://images.unsplash.com/${cat.image}?w=500&q=60`}
                  alt={lang === 'ar' ? cat.ar : cat.en}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-[800ms] ease-out group-hover:scale-[1.07]"
                  style={{ filter: 'brightness(0.55) saturate(0.8)' }}
                  placeholder="blur"
                  blurDataURL={BLUR_GOLD}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85))',
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <h3 className="font-cormorant text-[24px] font-[400] text-ivory mb-1">
                    {lang === 'ar' ? cat.ar : cat.en}
                  </h3>
                  <p
                    className="font-arabic text-[13px] text-gold/50"
                    dir="auto"
                  >
                    {lang === 'ar' ? cat.arSub : cat.enSub}
                  </p>

                  {/* Gold underline on hover */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: 50 }}
                    className="h-px mt-3.5"
                    style={{ background: 'var(--gold)' }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>

                {/* Top corner accent */}
                <div
                  className="absolute top-5 right-5 z-10 text-[9px] tracking-[3px] uppercase text-gold/0 group-hover:text-gold/50 transition-all duration-500 font-jost"
                >
                  {categories.explore}
                </div>
              </motion.div>
              </TiltCard>
            </Link>
          </SectionReveal>
        ))}
      </div>
    </section>
  )
}
