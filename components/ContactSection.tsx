'use client'

import Image from 'next/image'
import SectionReveal from './SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'

const PHONE = '249912302693'

export default function ContactSection() {
  const { t } = useLanguage()
  const { contact } = t

  const waMessage = encodeURIComponent(t.whatsapp.message)
  const waHref = `https://wa.me/${PHONE}?text=${waMessage}`

  const infoItems = [
    contact.address,
    contact.phone,
    contact.hours,
    contact.instagram,
  ]

  return (
    <section className="py-36 px-8 md:px-14 bg-black">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">

          {/* Map / Ambient */}
          <SectionReveal direction="left">
            <div
              className="relative overflow-hidden"
              style={{ border: '1px solid rgba(193,167,130,0.06)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=500&q=55"
                alt="Khartoum, Sudan"
                width={600}
                height={600}
                className="w-full object-cover"
                style={{
                  aspectRatio: '1',
                  filter: 'brightness(0.3) saturate(0.5)',
                }}
              />

              {/* Pulsing pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{
                      background: 'var(--gold)',
                      boxShadow:
                        '0 0 0 4px rgba(193,167,130,0.2), 0 0 0 8px rgba(193,167,130,0.07)',
                      animation: 'pinPulse 2s ease infinite',
                    }}
                  />
                </div>
              </div>

              {/* Radial overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(193,167,130,0.06), transparent 60%)',
                }}
              />

              {/* Location label */}
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-[9px] tracking-[3px] uppercase text-gold/50 font-jost">
                  Alkalakla — Khartoum, Sudan
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Info */}
          <div className="flex flex-col">
            <SectionReveal delay={0.1}>
              <p className="section-label mb-4">{contact.label}</p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <h2 className="section-title text-ivory mb-0">
                {contact.title}{' '}
                <em className="text-gold not-italic">{contact.titleAccent}</em>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="gold-line my-7" />
            </SectionReveal>

            {/* Info Items */}
            <div className="flex flex-col gap-6">
              {infoItems.map((info, i) => (
                <SectionReveal key={i} delay={0.35 + i * 0.08}>
                  <div>
                    <p className="text-[9px] tracking-[4px] uppercase text-gold mb-1.5 font-jost">
                      {info.label}
                    </p>
                    <p
                      className="text-[15px] text-ivory/55 leading-[1.7] whitespace-pre-line"
                      dir="auto"
                    >
                      {info.value}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* CTA */}
            <SectionReveal delay={0.7}>
              <div className="mt-10">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid-gold"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {contact.cta}
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
