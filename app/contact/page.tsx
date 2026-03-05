'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import { useLanguage } from '@/lib/LanguageContext'
import { BLUR_GOLD } from '@/lib/blur-placeholder'

const PHONE = '249912302693'

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const { contact } = t
  const isAr = lang === 'ar'

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const waMessage = encodeURIComponent(t.whatsapp.message)
  const waHref = `https://wa.me/${PHONE}?text=${waMessage}`

  const composedWaHref = `https://wa.me/${PHONE}?text=${encodeURIComponent(
    isAr
      ? `مرحبًا، أنا ${name || '...'}\n${message || 'أرغب في الاستفسار عن تشكيلاتكم.'}`
      : `Hello, I'm ${name || '...'}\n${message || "I'd like to inquire about your collections."}`
  )}`

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
            placeholder="blur"
            blurDataURL={BLUR_GOLD}
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

          {/* Compose form */}
          <SectionReveal delay={0.2} direction="right">
            <div
              className="sticky top-28 flex flex-col gap-6"
              style={{ border: '1px solid rgba(193,167,130,0.07)', padding: '40px' }}
            >
              <p className="section-label">{isAr ? 'أرسل رسالة' : 'Send a Message'}</p>
              <input
                type="text"
                placeholder={isAr ? 'اسمك' : 'Your Name'}
                value={name}
                onChange={e => setName(e.target.value)}
                dir="auto"
                className="w-full bg-transparent border-b text-[14px] text-ivory/70 pb-3 outline-none placeholder:text-ivory/20 font-light"
                style={{ borderColor: 'rgba(193,167,130,0.15)', fontFamily: 'var(--font-jost)' }}
              />
              <textarea
                placeholder={isAr ? 'رسالتك' : 'Your Message'}
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                dir="auto"
                className="w-full bg-transparent border-b text-[14px] text-ivory/70 pb-3 outline-none resize-none placeholder:text-ivory/20 font-light"
                style={{ borderColor: 'rgba(193,167,130,0.15)', fontFamily: 'var(--font-jost)' }}
              />
              <a
                href={composedWaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid-gold self-start"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {isAr ? 'أرسل عبر واتساب' : 'Send via WhatsApp'}
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  )
}
