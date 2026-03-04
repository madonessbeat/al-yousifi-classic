'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'
import { LOOKBOOK_IMAGES } from '@/lib/i18n'

export default function Lookbook() {
  const { t } = useLanguage()
  const { lookbook } = t

  return (
    <section className="py-36 px-8 md:px-14 bg-black overflow-hidden">
      {/* Header */}
      <div className="max-w-[1300px] mx-auto mb-14">
        <SectionReveal>
          <p className="section-label mb-4">{lookbook.label}</p>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="section-title text-ivory">
            {lookbook.title}{' '}
            <em className="text-gold not-italic">{lookbook.titleAccent}</em>
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="text-[13px] tracking-[2px] text-ivory/30 mt-4 font-jost">
            {lookbook.sub}
          </p>
        </SectionReveal>
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1300px] mx-auto">
        <div
          className="grid gap-2.5"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '220px',
          }}
        >
          {LOOKBOOK_IMAGES.map((img, i) => (
            <SectionReveal key={img.id} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3, scale: 1.005 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden cursor-pointer group h-full"
                style={{
                  gridRow: img.span === 'tall' ? 'span 2' : 'span 1',
                  gridColumn: img.span === 'wide' ? 'span 2' : 'span 1',
                  height: img.span === 'tall' ? '450px' : img.span === 'wide' ? '220px' : '220px',
                }}
              >
                <Image
                  src={`https://images.unsplash.com/${img.id}?w=400&q=55`}
                  alt={`Lookbook ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
                  style={{
                    filter: 'brightness(0.7) saturate(0.8)',
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'rgba(0,0,0,0.25)' }}
                />

                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 border border-transparent group-hover:border-gold/25 transition-all duration-400 pointer-events-none z-10"
                />

                {/* Number tag */}
                <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="text-[9px] tracking-[2px] text-gold/60 font-jost">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
