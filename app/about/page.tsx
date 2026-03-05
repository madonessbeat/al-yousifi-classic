'use client'

import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import SplitText from '@/components/SplitText'
import AnimatedCounter from '@/components/AnimatedCounter'
import Timeline from '@/components/Timeline'
import { useLanguage } from '@/lib/LanguageContext'
import { BLUR_GOLD } from '@/lib/blur-placeholder'

const VALUES = [
  {
    icon: '◈',
    title: { ar: 'الإرث', en: 'Heritage' },
    body: {
      ar: 'نحمل روح السودان في كل غرزة وكل قطعة نصنعها.',
      en: 'We carry the soul of Sudan in every stitch and every piece we create.',
    },
  },
  {
    icon: '◇',
    title: { ar: 'الحرفية', en: 'Craft' },
    body: {
      ar: 'الكمال يسكن في التفاصيل — ولا نتنازل عن أي منها.',
      en: 'Perfection lives in the details — and we never compromise on any of them.',
    },
  },
  {
    icon: '◉',
    title: { ar: 'الحداثة', en: 'Modernity' },
    body: {
      ar: 'نجمع بين الأصالة والمعاصرة لنصنع رجلاً يقود عصره.',
      en: 'We bridge heritage and the contemporary to craft a man who leads his era.',
    },
  },
]

export default function AboutPage() {
  const { t, lang } = useLanguage()
  const { about } = t
  const isAr = lang === 'ar'

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=900&q=60"
            alt="About Al-Yousifi Classic"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.6)' }}
            placeholder="blur"
            blurDataURL={BLUR_GOLD}
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
            <SplitText text={`${about.title} ${about.titleAccent}`} delay={0.2} />
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
                {isAr
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
                  <AnimatedCounter
                    value={stat.value}
                    className="font-cormorant text-[52px] font-light text-gold leading-none mb-2 block"
                  />
                  <p className="text-[11px] tracking-[2px] uppercase text-ivory/30 font-jost">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <p className="section-label mb-4 text-center">
              {isAr ? 'قيمنا' : 'Our Values'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="section-title text-ivory text-center mb-16">
              {isAr ? 'ما نؤمن' : 'What We'}{' '}
              <em className="text-gold not-italic">{isAr ? 'به' : 'Believe'}</em>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div
                  className="px-10 py-12 group"
                  style={{
                    borderRight:
                      i < VALUES.length - 1
                        ? '1px solid rgba(193,167,130,0.07)'
                        : 'none',
                  }}
                >
                  <p className="text-[32px] text-gold/20 mb-6 leading-none">{v.icon}</p>
                  <h3
                    className="font-cormorant text-[24px] text-ivory mb-4 group-hover:text-gold transition-colors duration-400"
                  >
                    {v.title[lang]}
                  </h3>
                  <p
                    className="text-[14px] text-ivory/40 leading-[1.9] font-light"
                    dir="auto"
                  >
                    {v.body[lang]}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto">
          <SectionReveal>
            <p className="section-label mb-4 text-center">
              {isAr ? 'مسيرتنا' : 'Our Journey'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="section-title text-ivory text-center mb-20">
              {isAr ? 'عقد من' : 'A Decade of'}{' '}
              <em className="text-gold not-italic">{isAr ? 'الأناقة' : 'Elegance'}</em>
            </h2>
          </SectionReveal>
          <Timeline lang={lang} />
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
              {isAr ? 'رؤيتنا' : 'Our Vision'}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <blockquote
              className="font-cormorant italic font-light text-ivory leading-[1.7]"
              style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}
              dir="auto"
            >
              {isAr
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
