'use client'

import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import AnimatedCounter from '@/components/AnimatedCounter'
import { useLanguage } from '@/lib/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=60"
            alt="About"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.6)' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.9) 100%)' }}
        />
        <div className="relative z-10 px-8 md:px-14 pb-16 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-3">{about.label}</p>
          <h1
            className="font-cormorant font-light text-ivory"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {about.title}{' '}
            <em className="text-gold not-italic">{about.titleAccent}</em>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionReveal>
              <p
                className="text-[16px] leading-[2.1] text-ivory/60 font-light"
                dir="auto"
              >
                {about.body}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p
                className="text-[15px] leading-[2.1] text-ivory/40 font-light mt-6"
                dir="auto"
              >
                {t.lang === 'ar'
                  ? 'نحن نؤمن أنّ الأزياء هي لغة صامتة تُعبّر عن شخصية صاحبها قبل أن ينطق بكلمة. كل قطعة نصنعها تحمل روح الإرث السوداني الأصيل مع لمسة عالمية معاصرة.'
                  : 'We believe fashion is a silent language that speaks your character before you utter a word. Every piece we create carries the soul of authentic Sudanese heritage with a contemporary global touch.'}
              </p>
            </SectionReveal>
          </div>

          {/* Stats */}
          <SectionReveal delay={0.15} direction="right">
            <div
              className="grid grid-cols-1 gap-px"
              style={{ border: '1px solid rgba(193,167,130,0.07)' }}
            >
              {[about.stat1, about.stat2, about.stat3].map((stat, i) => (
                <div
                  key={i}
                  className="px-10 py-10 flex flex-col"
                  style={{
                    background: i % 2 === 0 ? 'var(--rich)' : 'var(--card)',
                    borderBottom: i < 2 ? '1px solid rgba(193,167,130,0.07)' : 'none',
                  }}
                >
                  <AnimatedCounter value={stat.value} className="font-cormorant text-[52px] font-light text-gold leading-none mb-2 block" />
                  <p className="text-[11px] tracking-[2px] uppercase text-ivory/30 font-jost">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Vision */}
      <section
        className="py-28 px-8 md:px-14 text-center"
        style={{ background: 'var(--rich)' }}
      >
        <div className="max-w-[700px] mx-auto">
          <SectionReveal>
            <p className="section-label mb-5">
              {t.lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <blockquote
              className="font-cormorant italic font-light text-ivory leading-[1.7]"
              style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
              dir="auto"
            >
              {t.lang === 'ar'
                ? '"أن يكون الرجل السوداني مثالًا للأناقة العالمية — دون أن يفقد هويّته."'
                : '"For the Sudanese man to stand as a global standard of elegance — without losing his identity."'}
            </blockquote>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <div className="flex items-center justify-center gap-4 mt-8 opacity-30">
              <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
              <div className="h-px w-12" style={{ background: 'var(--gold)' }} />
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
