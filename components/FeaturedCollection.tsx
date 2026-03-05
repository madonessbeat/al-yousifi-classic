'use client'

import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'

export default function FeaturedCollection() {
  const { t } = useLanguage()
  const { featured } = t

  return (
    <section className="py-36 px-8 md:px-14 overflow-hidden bg-black">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-center">

          {/* Image */}
          <SectionReveal direction="left">
            <Link href="/collections" className="relative overflow-hidden group block">
              <Image
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=60"
                alt="Featured Collection"
                width={720}
                height={900}
                className="w-full object-cover transition-transform duration-[8000ms] ease-out group-hover:scale-[1.03]"
                style={{
                  aspectRatio: '4/5',
                  filter: 'brightness(0.65) saturate(0.85)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4))',
                }}
              />
              {/* Season tag */}
              <div className="absolute top-7 left-7 z-10">
                <span
                  className="text-[9px] tracking-[4px] uppercase text-gold/70 font-jost"
                  style={{
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    border: '1px solid rgba(193,167,130,0.15)',
                  }}
                >
                  {featured.tag}
                </span>
              </div>
              {/* View collection hint */}
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
                  {featured.cta}
                </span>
              </div>
            </Link>
          </SectionReveal>

          {/* Text */}
          <div className="flex flex-col">
            <SectionReveal delay={0.15}>
              <p className="section-label mb-5">{featured.label}</p>
            </SectionReveal>

            <SectionReveal delay={0.25}>
              <h2
                className="font-cormorant font-light text-ivory leading-[1.08] mb-2"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
              >
                {featured.title}
              </h2>
              <h2
                className="font-cormorant font-light italic text-gold leading-[1.08]"
                style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
              >
                {featured.titleAccent}
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.35}>
              <div className="gold-line my-7" />
            </SectionReveal>

            <SectionReveal delay={0.4}>
              <p
                className="text-[15px] leading-[2] text-ivory/55 max-w-[480px] font-light"
                dir="auto"
              >
                {featured.body}
              </p>
            </SectionReveal>

            {/* Details */}
            <SectionReveal delay={0.5}>
              <div className="flex flex-wrap gap-9 mt-9">
                {featured.details.map((d, i) => (
                  <div
                    key={i}
                    className="pt-4 flex-1 min-w-[100px]"
                    style={{ borderTop: '1px solid rgba(193,167,130,0.1)' }}
                  >
                    <p className="text-[9px] tracking-[3px] uppercase text-gold mb-1.5 font-jost">
                      {d.label}
                    </p>
                    <p className="text-[13px] text-ivory/45 leading-relaxed">
                      {d.value}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.6}>
              <div className="mt-10">
                <Link href="/collections" className="btn-outline-gold inline-block">
                  {featured.cta}
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
