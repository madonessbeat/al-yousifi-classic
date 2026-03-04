'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const { footer, nav } = t

  const navLinks = [
    { href: '/', label: nav.home },
    { href: '/about', label: nav.about },
    { href: '/categories', label: nav.categories },
    { href: '/collections', label: nav.collections },
    { href: '/lookbook', label: nav.lookbook },
    { href: '/contact', label: nav.contact },
  ]

  const contactLinks = [
    { href: `tel:+249912302693`, label: '+249 912 302 693' },
    { href: `https://wa.me/249912302693`, label: 'WhatsApp' },
    { href: '#', label: '@alyousify.classic' },
  ]

  return (
    <footer
      className="pt-20 pb-10 px-8 md:px-14"
      style={{ background: '#000', borderTop: '1px solid rgba(193,167,130,0.07)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-12 md:gap-14">
          {/* Brand column */}
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Al-Yousifi Classic"
                width={130}
                height={50}
                className="object-contain mb-5 opacity-55"
                style={{ height: '48px', width: 'auto' }}
              />
            </Link>
            <p
              className="text-[12px] text-ivory/22 leading-[1.9] max-w-[280px] font-light"
              dir="auto"
            >
              {footer.tagline}
            </p>

            {/* Social icons row */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center transition-all duration-300 hover:border-gold/40"
                style={{ border: '1px solid rgba(193,167,130,0.15)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(193,167,130,0.5)" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="rgba(193,167,130,0.5)" stroke="none" />
                </svg>
              </a>
              <a
                href="https://wa.me/249912302693"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 flex items-center justify-center transition-all duration-300 hover:border-gold/40"
                style={{ border: '1px solid rgba(193,167,130,0.15)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(193,167,130,0.5)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[9px] tracking-[4px] uppercase text-gold mb-5 font-jost">
              {footer.navTitle}
            </p>
            <div className="flex flex-col gap-3.5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] text-ivory/28 hover:text-gold transition-colors duration-300 font-light leading-none"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] tracking-[4px] uppercase text-gold mb-5 font-jost">
              {footer.contactTitle}
            </p>
            <div className="flex flex-col gap-3.5">
              {contactLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[12px] text-ivory/28 hover:text-gold transition-colors duration-300 font-light leading-none"
                >
                  {link.label}
                </a>
              ))}
              <p className="text-[12px] text-ivory/20 leading-[1.7] font-light mt-1" dir="auto">
                شارع الكلاكلة<br />الخرطوم، السودان
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 flex-wrap"
          style={{ borderTop: '1px solid rgba(193,167,130,0.05)' }}
        >
          <p className="text-[10px] text-ivory/12 font-jost" dir="auto">
            {footer.copyright}
          </p>
          <p className="text-[10px] text-ivory/12 font-jost">
            {footer.madeIn}
          </p>
        </div>
      </div>
    </footer>
  )
}
