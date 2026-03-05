'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'
import { LogoWatermark } from './AYCLogo'

export default function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section className="py-36 px-8 md:px-14 overflow-hidden bg-black relative">

      {/* Crest watermark — top-right, very subtle */}
      <LogoWatermark
        variant="crest"
        opacity={0.022}
        color="white"
        className="top-0 right-0"
        style={{ width: '45vw', maxWidth: '520px', transform: 'translate(15%, -10%)' }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Image */}
          <SectionReveal direction="left">
            <Link
              href="/about"
              className="relative overflow-hidden group block"
              style={{ border: '1px solid rgba(193,167,130,0.06)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=60"
                alt="About Al-Yousifi Classic"
                width={600}
                height={800}
                className="w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-[1.04]"
                style={{ aspectRatio: '3/4', filter: 'brightness(0.75) saturate(0.9)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5))' }}
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.4), transparent)' }}
              />
              {/* Discover hint */}
              <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10">
                <span
                  className="text-[9px] tracking-[4px] uppercase font-jost px-5 py-2"
                  style={{
                    color: 'rgba(193,167,130,0.9)',
                    background: 'rgba(0,0,0,0.65)',
                    border: '1px solid rgba(193,167,130,0.2)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {about.cta}
                </span>
              </div>
            </Link>
          </SectionReveal>

          {/* Text */}
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
              <p className="text-[16px] leading-[2] text-ivory/55 max-w-[540px] font-light" dir="auto">
                {about.body}
              </p>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={0.45}>
              <div className="flex gap-10 mt-12 flex-wrap">
                {[about.stat1, about.stat2, about.stat3].map((stat, i) => (
                  <div key={i}>
                    <p className="font-cormorant text-[40px] text-gold font-light leading-none mb-1">
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
