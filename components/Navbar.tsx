'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'
import AYCLogo from './AYCLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, toggle, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return
    const close = (e: MouseEvent) => {
      const nav = document.getElementById('ayc-nav')
      if (nav && !nav.contains(e.target as Node)) setMobileOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
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
        id="ayc-nav"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'py-3 px-8 md:px-14 bg-black/96 backdrop-blur-2xl border-b border-gold/[0.06]'
            : 'py-5 px-8 md:px-14'
        }`}
      >
        {/* Logo — simplified mark */}
        <Link href="/" className="flex-shrink-0 relative z-10 group">
          <AYCLogo
            variant="simplified"
            color="gold"
            style={{
              height: scrolled ? '36px' : '48px',
              width: 'auto',
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              filter: scrolled
                ? 'brightness(0) invert(1) sepia(1) drop-shadow(0 0 12px rgba(193,167,130,0.25))'
                : 'brightness(0) invert(1) sepia(1) drop-shadow(0 0 8px rgba(193,167,130,0.15))',
            }}
            animate={false}
          />
        </Link>

        {/* Desktop Nav */}
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

        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="hidden md:flex items-center border border-gold/20 text-[10px] tracking-[1px] overflow-hidden transition-all duration-300 hover:border-gold/40"
            aria-label="Toggle language"
          >
            <span className={`px-3.5 py-1.5 transition-all duration-300 font-jost ${lang === 'ar' ? 'bg-gold/10 text-gold' : 'text-ivory/25'}`}>
              AR
            </span>
            <span className={`px-3.5 py-1.5 transition-all duration-300 font-jost ${lang === 'en' ? 'bg-gold/10 text-gold' : 'text-ivory/25'}`}>
              EN
            </span>
          </button>

          {/* Hamburger / close toggle */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <span className="block text-gold text-lg leading-none font-light">✕</span>
            ) : (
              <>
                <span className="block w-[22px] h-px bg-gold transition-all duration-300" />
                <span className="block w-[14px] h-px bg-gold transition-all duration-300" />
              </>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown — slim panel below navbar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-0 right-0 z-40 lg:hidden"
            style={{
              top: scrolled ? '60px' : '80px',
              background: 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(193,167,130,0.08)',
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 py-5 px-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[9px] tracking-[3.5px] uppercase text-ivory/45 hover:text-gold transition-colors duration-300 font-jost"
                >
                  {link.label}
                </Link>
              ))}
              <span className="w-px h-3 bg-gold/15" />
              <button
                onClick={() => { toggle(); setMobileOpen(false) }}
                className="text-[9px] tracking-[3px] uppercase text-gold/40 hover:text-gold transition-colors font-jost"
              >
                {lang === 'ar' ? 'EN' : 'AR'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
