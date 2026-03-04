'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'
import { CATEGORIES } from '@/lib/i18n'

export default function CategoriesPage() {
  const { t, lang } = useLanguage()
  const { categories } = t

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=60"
            alt="Categories"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.5)' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.92) 100%)' }}
        />
        <div className="relative z-10 px-8 md:px-14 pb-16 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-3">{categories.label}</p>
          <h1
            className="font-cormorant font-light text-ivory"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {categories.title}{' '}
            <em className="text-gold not-italic">{categories.titleAccent}</em>
          </h1>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-28 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <SectionReveal key={cat.id} delay={i * 0.1}>
                <motion.div
                  id={cat.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: '3/4' }}
                >
                  <Image
                    src={`https://images.unsplash.com/${cat.image}?w=700&q=80`}
                    alt={lang === 'ar' ? cat.ar : cat.en}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-[800ms] group-hover:scale-[1.06]"
                    style={{ filter: 'brightness(0.55) saturate(0.8)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85))' }}
                  />
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-all duration-500" />

                  {/* Category Number */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="font-cormorant text-[40px] font-light text-ivory/10 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    <h3
                      className="font-cormorant text-[26px] font-[400] text-ivory mb-1.5"
                      dir="auto"
                    >
                      {lang === 'ar' ? cat.ar : cat.en}
                    </h3>
                    <p className="text-[13px] text-gold/50 font-light" dir="auto">
                      {lang === 'ar' ? cat.arSub : cat.enSub}
                    </p>
                    <div
                      className="h-px mt-4 group-hover:w-[50px] transition-all duration-500"
                      style={{ width: 0, background: 'var(--gold)' }}
                    />
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
