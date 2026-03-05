'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import Lightbox from '@/components/Lightbox'
import { useLanguage } from '@/lib/LanguageContext'
import { LOOKBOOK_IMAGES } from '@/lib/i18n'
import { BLUR_GOLD } from '@/lib/blur-placeholder'

const EXTRA_IMAGES = [
  'photo-1548142813-c348350df52b',
  'photo-1594938298603-c8148c4dae35',
  'photo-1502163140606-888448ae8cfe',
  'photo-1553545204-4f7d339aa06a',
]

export default function LookbookPage() {
  const { t } = useLanguage()
  const { lookbook } = t
  const allImages = [...LOOKBOOK_IMAGES, ...EXTRA_IMAGES.map(id => ({ id, span: 'normal' as const }))]
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const imageUrls = allImages.map(img => `https://images.unsplash.com/${img.id}?w=1200&q=80`)

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=900&q=60"
            alt="Lookbook"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.2) saturate(0.5)' }}
            placeholder="blur"
            blurDataURL={BLUR_GOLD}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.92) 100%)' }}
        />
        <div className="relative z-10 px-8 md:px-14 pb-16 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-3">{lookbook.label}</p>
          <h1
            className="font-cormorant font-light text-ivory"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {lookbook.title}{' '}
            <em className="text-gold not-italic">{lookbook.titleAccent}</em>
          </h1>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {allImages.map((img, i) => (
              <SectionReveal key={`${img.id}-${i}`} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden group cursor-pointer"
                  style={{
                    aspectRatio: i % 5 === 0 ? '2/3' : '3/4',
                    gridRow: i % 7 === 0 ? 'span 2' : 'span 1',
                  }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={`https://images.unsplash.com/${img.id}?w=700&q=80`}
                    alt={`Lookbook ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-[1.07]"
                    style={{ filter: 'brightness(0.72) saturate(0.8)' }}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_GOLD}
                  />
                  <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-all duration-400 z-10" />
                  <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <span className="text-[9px] tracking-[2px] text-gold/60 font-jost">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={imageUrls}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => i !== null ? (i - 1 + imageUrls.length) % imageUrls.length : 0)}
          onNext={() => setLightboxIndex(i => i !== null ? (i + 1) % imageUrls.length : 0)}
        />
      )}
    </>
  )
}
