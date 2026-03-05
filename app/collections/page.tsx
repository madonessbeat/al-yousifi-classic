'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import { COLLECTIONS_EXTENDED } from '@/lib/collections'
import HorizontalScroll from '@/components/HorizontalScroll'

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

      {/* Collections horizontal scroll */}
      <section className="bg-black">
        <HorizontalScroll>
          {COLLECTIONS_EXTENDED.map((col, i) => (
            <Link key={col.id} href={`/collections/${col.id}`}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative overflow-hidden cursor-pointer group flex-shrink-0"
                style={{ width: 'min(420px, 80vw)', aspectRatio: '3/4' }}
              >
                <Image
                  src={`https://images.unsplash.com/${col.image}?w=600&q=60`}
                  alt={col.title[lang]}
                  fill
                  sizes="420px"
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
                </div>
              </motion.div>
            </Link>
          ))}
        </HorizontalScroll>
      </section>
    </>
  )
}
