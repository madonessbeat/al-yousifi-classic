'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'

export default function Testimonials() {
  const { t } = useLanguage()
  const { testimonials } = t
  const [current, setCurrent] = useState(0)

  const handleDot = (index: number) => {
    setCurrent(index)
  }

  const item = testimonials.items[current]

  return (
    <section
      className="py-36 px-8 md:px-14 text-center"
      style={{ background: 'var(--rich)' }}
    >
      {/* Header */}
      <SectionReveal>
        <p className="section-label mb-4">{testimonials.label}</p>
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <h2 className="section-title text-ivory mb-16">
          {testimonials.title}{' '}
          <em className="text-gold not-italic">{testimonials.titleAccent}</em>
        </h2>
      </SectionReveal>

      {/* Testimonial Card */}
      <div className="max-w-[720px] mx-auto">
        {/* Decorative quotation mark */}
        <SectionReveal delay={0.2}>
          <div
            className="font-cormorant font-light leading-none mb-8 select-none"
            style={{
              fontSize: '110px',
              color: 'rgba(193,167,130,0.1)',
              lineHeight: '0.4',
            }}
          >
            "
          </div>
        </SectionReveal>

        {/* Rotating content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="px-4 md:px-8"
          >
            <blockquote
              className="font-cormorant italic font-light text-ivory leading-[1.8] mb-8"
              style={{ fontSize: 'clamp(19px, 2.5vw, 26px)' }}
              dir="auto"
            >
              {item.quote}
            </blockquote>

            <div className="flex flex-col items-center gap-1">
              {/* Ornament */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: 'rgba(193,167,130,0.2)' }} />
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: 'rgba(193,167,130,0.4)' }}
                />
                <div className="h-px w-10" style={{ background: 'rgba(193,167,130,0.2)' }} />
              </div>
              <p className="text-[10px] tracking-[4px] uppercase text-gold font-jost">
                {item.author}
              </p>
              <p className="text-[12px] text-ivory/30 font-jost mt-1" dir="auto">
                {item.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <SectionReveal delay={0.3}>
          <div className="flex items-center justify-center gap-2.5 mt-10">
            {testimonials.items.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="transition-all duration-400"
                style={{
                  width: i === current ? '28px' : '6px',
                  height: '6px',
                  borderRadius: i === current ? '3px' : '50%',
                  background:
                    i === current
                      ? 'var(--gold)'
                      : 'rgba(193,167,130,0.18)',
                }}
              />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
