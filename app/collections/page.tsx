'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'

const COLLECTIONS = [
  {
    id: 'nubian',
    image: 'photo-1539109136881-3be0616acf4b',
    tag: { ar: 'خريف ٢٠٢٥', en: 'Fall 2025' },
    title: { ar: 'التشكيلة النوبية', en: 'The Nubian Collection' },
    sub: { ar: 'ألوان الصحراء في أناقة عصرية', en: 'Desert tones in contemporary elegance' },
  },
  {
    id: 'desert-rose',
    image: 'photo-1507003211169-0a1dd7228f2d',
    tag: { ar: 'صيف ٢٠٢٥', en: 'Summer 2025' },
    title: { ar: 'وردة الصحراء', en: 'Desert Rose' },
    sub: { ar: 'خفّة الصيف بأسلوب لا يُضاهى', en: 'Summer lightness in unmatched style' },
  },
  {
    id: 'khartoum-nights',
    image: 'photo-1490895668178-57960d4f8c0f',
    tag: { ar: 'ربيع ٢٠٢٥', en: 'Spring 2025' },
    title: { ar: 'ليالي الخرطوم', en: 'Khartoum Nights' },
    sub: { ar: 'أناقة الليل في قلب العاصمة', en: 'Evening sophistication at the heart of the capital' },
  },
  {
    id: 'signature',
    image: 'photo-1534030347209-467a5b0ad3e6',
    tag: { ar: 'كلاسيكية', en: 'Classic' },
    title: { ar: 'التوقيع', en: 'The Signature' },
    sub: { ar: 'تشكيلتنا الأساسية الخالدة', en: 'Our timeless essential collection' },
  },
]

export default function CollectionsPage() {
  const { t, lang } = useLanguage()

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=60"
            alt="Collections"
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
          <p className="section-label mb-3">{t.featured.label}</p>
          <h1
            className="font-cormorant font-light text-ivory"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {lang === 'ar' ? 'تشكيلاتنا' : 'Our'}{' '}
            <em className="text-gold not-italic">
              {lang === 'ar' ? 'الحصرية' : 'Collections'}
            </em>
          </h1>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COLLECTIONS.map((col, i) => (
              <SectionReveal key={col.id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: i === 0 ? '4/3' : '3/2' }}
                >
                  <Image
                    src={`https://images.unsplash.com/${col.image}?w=600&q=60`}
                    alt={col.title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[700ms] group-hover:scale-[1.05]"
                    style={{ filter: 'brightness(0.55) saturate(0.8)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8))' }}
                  />
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-all duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    <p className="text-[9px] tracking-[3px] uppercase text-gold/60 mb-2 font-jost">
                      {col.tag[lang]}
                    </p>
                    <h3
                      className="font-cormorant font-light text-ivory mb-1"
                      style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
                      dir="auto"
                    >
                      {col.title[lang]}
                    </h3>
                    <p className="text-[13px] text-ivory/45 font-light" dir="auto">
                      {col.sub[lang]}
                    </p>
                    <div
                      className="h-px mt-4 transition-all duration-500"
                      style={{
                        width: '0',
                        background: 'var(--gold)',
                        transition: 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
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
