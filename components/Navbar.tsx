'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, toggle, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/categories', label: t.nav.categories },
    { href: '/collections', label: t.nav.collections },
    { href: '/lookbook', label: t.nav.lookbook },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'py-3 px-8 md:px-14 bg-black/96 backdrop-blur-2xl border-b border-gold/[0.06]'
            : 'py-5 px-8 md:px-14'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-10">
          <Image
            src="/logo.png"
            alt="Al-Yousifi Classic"
            width={160}
            height={60}
            priority
            className="object-contain transition-all duration-500"
            style={{
              height: scrolled ? '38px' : '50px',
              width: 'auto',
              opacity: scrolled ? 0.95 : 0.88,
              filter: 'drop-shadow(0 0 12px rgba(193,167,130,0.1))',
            }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[10px] tracking-[3.5px] uppercase text-ivory/40 hover:text-gold transition-colors duration-300 font-jost"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right: Language Toggle + Hamburger */}
        <div className="flex items-center gap-5">
          {/* Language Toggle */}
          <button
            onClick={toggle}
            className="hidden md:flex items-center border border-gold/20 text-[10px] tracking-[1px] overflow-hidden transition-all duration-300 hover:border-gold/40"
            aria-label="Toggle language"
          >
            <span
              className={`px-3.5 py-1.5 transition-all duration-300 font-jost ${
                lang === 'ar' ? 'bg-gold/10 text-gold' : 'text-ivory/25'
              }`}
            >
              AR
            </span>
            <span
              className={`px-3.5 py-1.5 transition-all duration-300 font-jost ${
                lang === 'en' ? 'bg-gold/10 text-gold' : 'text-ivory/25'
              }`}
            >
              EN
            </span>
          </button>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-[22px] h-px bg-gold transition-all duration-300" />
            <span className="block w-[14px] h-px bg-gold transition-all duration-300" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[999] bg-black/98 flex flex-col items-center justify-center"
          >
            {/* Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-7 text-gold text-2xl font-light leading-none"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Logo in mobile menu */}
            <div className="absolute top-5 left-7">
              <Image
                src="/logo.png"
                alt="Al-Yousifi Classic"
                width={100}
                height={40}
                className="object-contain opacity-60"
                style={{ height: '36px', width: 'auto' }}
              />
            </div>

            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-cormorant text-[28px] font-light text-ivory hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle in mobile */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                onClick={() => { toggle(); setMobileOpen(false) }}
                className="mt-4 text-[11px] tracking-[3px] uppercase text-gold/50 hover:text-gold transition-colors font-jost"
              >
                {lang === 'ar' ? 'English' : 'عربي'}
              </motion.button>
            </div>

            {/* Bottom tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-8 text-[9px] tracking-[4px] uppercase text-gold/25 font-jost"
            >
              Al-Yousifi Classic — Khartoum
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
