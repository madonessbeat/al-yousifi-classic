'use client'

import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'

const PHONE = '249912302693'

export default function ContactPage() {
  const { t } = useLanguage()
  const { contact } = t

  const waMessage = encodeURIComponent(t.whatsapp.message)
  const waHref = `https://wa.me/${PHONE}?text=${waMessage}`

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=900&q=60"
            alt="Contact"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.18) saturate(0.4)' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.95) 100%)' }}
        />
        <div className="relative z-10 px-8 md:px-14 pb-16 max-w-[1200px] w-full mx-auto">
          <p className="section-label mb-3">{contact.label}</p>
          <h1
            className="font-cormorant font-light text-ivory"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {contact.title}{' '}
            <em className="text-gold not-italic">{contact.titleAccent}</em>
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-28 px-8 md:px-14 bg-black">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">

          {/* Info */}
          <div>
            <SectionReveal>
              <p className="section-label mb-5">{contact.label}</p>
            </SectionReveal>

            <div className="flex flex-col gap-10 mt-4">
              {[contact.address, contact.phone, contact.hours, contact.instagram].map(
                (info, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div
                      className="pb-8"
                      style={{
                        borderBottom: '1px solid rgba(193,167,130,0.07)',
                      }}
                    >
                      <p className="text-[9px] tracking-[4px] uppercase text-gold mb-3 font-jost">
                        {info.label}
                      </p>
                      <p
                        className="text-[15px] text-ivory/55 leading-[1.8] whitespace-pre-line font-light"
                        dir="auto"
                      >
                        {info.value}
                      </p>
                    </div>
                  </SectionReveal>
                )
              )}
            </div>

            <SectionReveal delay={0.5}>
              <div className="mt-10">
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-solid-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {contact.cta}
                </a>
              </div>
            </SectionReveal>
          </div>

          {/* Map ambient */}
          <SectionReveal delay={0.2} direction="right">
            <div
              className="relative overflow-hidden sticky top-28"
              style={{ border: '1px solid rgba(193,167,130,0.06)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=60"
                alt="Khartoum"
                width={700}
                height={700}
                className="w-full object-cover"
                style={{ aspectRatio: '1', filter: 'brightness(0.25) saturate(0.4)' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(193,167,130,0.07), transparent 60%)',
                }}
              />

              {/* Pulsing pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: 'var(--gold)',
                    boxShadow:
                      '0 0 0 4px rgba(193,167,130,0.2), 0 0 0 10px rgba(193,167,130,0.06)',
                    animation: 'pinPulse 2s ease infinite',
                  }}
                />
              </div>

              {/* Location label */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                <p className="text-[9px] tracking-[3px] uppercase text-gold/50 font-jost">
                  Alkalakla Ave — Khartoum
                </p>
                <p className="font-arabic text-[12px] text-gold/40" dir="rtl">
                  شارع الكلاكلة
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
