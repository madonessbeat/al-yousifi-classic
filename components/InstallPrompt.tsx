'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const { lang } = useLanguage()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setTimeout(() => setVisible(true), 4000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const install = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
  }

  const dismiss = () => {
    setVisible(false)
    setDeferredPrompt(null)
  }

  const isAr = lang === 'ar'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-24 inset-x-0 z-[999] flex justify-center px-5 pointer-events-none"
        >
          <div
            className="pointer-events-auto w-full max-w-[340px] relative overflow-hidden"
            style={{
              background: '#050505',
              border: '1px solid rgba(193,167,130,0.15)',
            }}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Top gold line */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.5), transparent)' }} />

            {/* Crest watermark */}
            <img
              src="/logo-crest.svg"
              alt=""
              aria-hidden
              className="absolute pointer-events-none select-none"
              style={{
                width: '120px',
                opacity: 0.04,
                filter: 'brightness(0) invert(1) sepia(1)',
                right: isAr ? 'auto' : '-16px',
                left: isAr ? '-16px' : 'auto',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />

            <div className="px-5 py-5 relative z-10">
              {/* Label */}
              <p
                className="font-jost text-[8px] tracking-[4px] uppercase mb-3"
                style={{ color: 'rgba(193,167,130,0.55)' }}
              >
                {isAr ? 'تجربة أفضل' : 'Better Experience'}
              </p>

              {/* Title */}
              <p className="font-cormorant text-[20px] font-light text-ivory leading-tight mb-1">
                {isAr ? 'اليوسفي كلاسيك' : 'Al-Yousifi Classic'}
              </p>
              <p className="text-[11px] text-ivory/35 font-light mb-5" style={{ fontFamily: 'var(--font-jost)' }}>
                {isAr
                  ? 'أضف التطبيق لتجربة تسوق أفضل'
                  : 'Install the app for a seamless experience'}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={install}
                  className="flex-1 py-2.5 text-[10px] tracking-[3px] uppercase font-jost transition-all duration-300 hover:bg-gold/20"
                  style={{
                    border: '1px solid rgba(193,167,130,0.35)',
                    color: 'rgba(193,167,130,0.9)',
                    background: 'rgba(193,167,130,0.06)',
                  }}
                >
                  {isAr ? 'تثبيت' : 'Install'}
                </button>
                <button
                  onClick={dismiss}
                  className="py-2.5 px-4 text-[10px] tracking-[3px] uppercase font-jost text-ivory/20 hover:text-ivory/50 transition-colors duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {isAr ? 'لاحقاً' : 'Later'}
                </button>
              </div>
            </div>

            {/* Bottom gold line */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.15), transparent)' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
