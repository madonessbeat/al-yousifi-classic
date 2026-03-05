'use client'

import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'
import { LogoWatermark } from './AYCLogo'

export default function Craftsmanship() {
  const { t } = useLanguage()
  const { craftsmanship } = t

  return (
    <section
      className="py-36 px-8 md:px-14 relative overflow-hidden"
      style={{ background: 'var(--rich)' }}
    >
      {/* Crest watermark — centered, monumental */}
      <LogoWatermark
        variant="crest"
        opacity={0.018}
        color="white"
        className="inset-0 flex items-center justify-center m-auto"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(600px, 80vw)',
          height: 'min(600px, 80vw)',
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <SectionReveal>
            <p className="section-label mb-4">{craftsmanship.label}</p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="section-title text-ivory">
              {craftsmanship.title}{' '}
              <em className="text-gold not-italic">{craftsmanship.titleAccent}</em>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div
              className="mx-auto mt-8"
              style={{ width: '60px', height: '1px', background: 'rgba(193,167,130,0.2)' }}
            />
          </SectionReveal>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {craftsmanship.pillars.map((pillar, i) => (
            <SectionReveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group px-10 py-12 relative cursor-default"
                style={{
                  borderRight:
                    i < craftsmanship.pillars.length - 1
                      ? '1px solid rgba(193,167,130,0.07)'
                      : 'none',
                }}
              >
                {/* Number */}
                <p
                  className="font-cormorant text-[56px] font-light leading-none mb-6"
                  style={{ color: 'rgba(193,167,130,0.12)' }}
                >
                  {pillar.number}
                </p>

                {/* Animated gold line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                  className="h-px mb-6"
                  style={{ background: 'var(--gold)' }}
                />

                <h3
                  className="font-cormorant text-[26px] font-[400] text-ivory mb-4 group-hover:text-gold transition-colors duration-400"
                  dir="auto"
                >
                  {pillar.title}
                </h3>
                <p className="text-[15px] leading-[1.9] text-ivory/45 font-light" dir="auto">
                  {pillar.body}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* Bottom ornament */}
        <SectionReveal delay={0.5}>
          <div className="flex items-center justify-center gap-6 mt-20 opacity-20">
            <div className="h-px flex-1 max-w-[120px]" style={{ background: 'var(--gold)' }} />
            <div className="w-2 h-2 rounded-full border" style={{ borderColor: 'var(--gold)' }} />
            <div className="h-px flex-1 max-w-[120px]" style={{ background: 'var(--gold)' }} />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
