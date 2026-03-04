'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section className="py-36 px-8 md:px-14 overflow-hidden bg-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Image Column */}
          <SectionReveal direction="left">
            <div
              className="relative overflow-hidden group"
              style={{ border: '1px solid rgba(193,167,130,0.06)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=60"
                alt="About Al-Yousifi Classic"
                width={600}
                height={800}
                className="w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.04]"
                style={{
                  aspectRatio: '3/4',
                  filter: 'brightness(0.75) saturate(0.9)',
                }}
              />
              {/* Bottom gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5))',
                }}
              />
              {/* Gold accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.4), transparent)' }}
              />
            </div>
          </SectionReveal>

          {/* Text Column */}
          <div className="flex flex-col">
            <SectionReveal delay={0.1}>
              <p className="section-label mb-4">{about.label}</p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <h2 className="section-title mb-0 text-ivory">
                {about.title}{' '}
                <em className="text-gold not-italic">{about.titleAccent}</em>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="gold-line my-7" />
            </SectionReveal>

            <SectionReveal delay={0.35}>
              <p
                className="text-[15px] leading-[2] text-ivory/55 max-w-[540px] font-light"
                dir="auto"
              >
                {about.body}
              </p>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={0.45}>
              <div className="flex gap-10 mt-12 flex-wrap">
                {[about.stat1, about.stat2, about.stat3].map((stat, i) => (
                  <div key={i}>
                    <p
                      className="font-cormorant text-[40px] text-gold font-light leading-none mb-1"
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10px] tracking-[2px] uppercase text-ivory/25 font-jost">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.55}>
              <div className="mt-10">
                <Link href="/about" className="btn-outline-gold inline-block">
                  {about.cta}
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
