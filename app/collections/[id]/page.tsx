'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'
import { COLLECTIONS_EXTENDED } from '@/lib/collections'
import SectionReveal from '@/components/SectionReveal'
import Lightbox from '@/components/Lightbox'
import MagneticButton from '@/components/MagneticButton'

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const { lang } = useLanguage()
  const col = COLLECTIONS_EXTENDED.find(c => c.id === params.id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!col) notFound()

  const images = col.gallery.map(id => `https://images.unsplash.com/${id}?w=1200&q=80`)

  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`https://images.unsplash.com/${col.image}?w=1400&q=70`}
            alt={col.title[lang]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.3) saturate(0.7)' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)' }}
        />
        <div className="relative z-10 px-8 md:px-14 pb-20 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-4">{col.tag[lang]}</p>
          <h1
            className="font-cormorant font-light text-ivory mb-4"
            style={{ fontSize: 'clamp(48px, 7vw, 88px)', lineHeight: 1.05 }}
          >
            {col.title[lang]}
          </h1>
          <p className="text-[15px] text-ivory/50 font-light max-w-[500px]" dir="auto">
            {col.sub[lang]}
          </p>
        </div>
      </section>

      {/* Story + Details */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 items-start">
          <div>
            <SectionReveal>
              <p className="section-label mb-5">
                {lang === 'ar' ? 'عن التشكيلة' : 'About the Collection'}
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p
                className="text-[17px] leading-[2.1] text-ivory/60 font-light max-w-[520px]"
                dir="auto"
              >
                {col.story[lang]}
              </p>
            </SectionReveal>

            {/* Palette swatches */}
            <SectionReveal delay={0.2}>
              <div className="flex gap-4 mt-10 items-end">
                {col.palette.map((color, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-full"
                      style={{ background: color, border: '1px solid rgba(193,167,130,0.15)' }}
                    />
                    <p className="text-[9px] tracking-[2px] uppercase text-ivory/30 font-jost">
                      {col.paletteNames[lang][i]}
                    </p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Details grid */}
          <SectionReveal delay={0.15} direction="right">
            <div
              className="flex flex-col gap-px"
              style={{ border: '1px solid rgba(193,167,130,0.07)' }}
            >
              {col.details.map((d, i) => (
                <div
                  key={i}
                  className="px-8 py-7"
                  style={{
                    background: i % 2 === 0 ? 'var(--rich)' : 'var(--card)',
                    borderBottom:
                      i < col.details.length - 1
                        ? '1px solid rgba(193,167,130,0.07)'
                        : 'none',
                  }}
                >
                  <p className="text-[9px] tracking-[3px] uppercase text-gold mb-2 font-jost">
                    {d.label[lang]}
                  </p>
                  <p className="text-[15px] text-ivory/55" dir="auto">
                    {d.value[lang]}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-8 md:px-14" style={{ background: 'var(--rich)' }}>
        <div className="max-w-[1200px] mx-auto">
          <SectionReveal>
            <p className="section-label mb-10">
              {lang === 'ar' ? 'معرض التشكيلة' : 'Collection Gallery'}
            </p>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {col.gallery.map((imgId, i) => (
              <SectionReveal key={imgId} delay={i * 0.07} variant="clip">
                <div
                  onClick={() => setLightboxIndex(i)}
                  className="relative overflow-hidden cursor-zoom-in group"
                  style={{ aspectRatio: i % 3 === 0 ? '2/3' : '3/4' }}
                >
                  <Image
                    src={`https://images.unsplash.com/${imgId}?w=600&q=65`}
                    alt={`${col.title[lang]} — ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ filter: 'brightness(0.75) saturate(0.8)' }}
                  />
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-all duration-400" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div
                      className="w-9 h-9 flex items-center justify-center"
                      style={{ border: '1px solid rgba(193,167,130,0.4)', background: 'rgba(0,0,0,0.5)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(193,167,130,0.9)" strokeWidth="1.5">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Back CTA */}
      <section className="py-20 px-8 md:px-14 bg-black text-center">
        <MagneticButton>
          <Link href="/collections" className="btn-outline-gold">
            {lang === 'ar' ? 'كل التشكيلات' : 'All Collections'}
          </Link>
        </MagneticButton>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => (i! - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex(i => (i! + 1) % images.length)}
        />
      )}
    </>
  )
}
