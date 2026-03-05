'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LightboxProps {
  images: string[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-7 text-gold/50 hover:text-gold text-2xl font-light leading-none transition-colors z-10"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Counter */}
        <p className="absolute top-7 left-1/2 -translate-x-1/2 text-[9px] tracking-[4px] uppercase text-gold/30 font-jost z-10">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); onPrev() }}
            className="absolute left-5 md:left-10 text-gold/40 hover:text-gold transition-colors z-10 p-3"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-[90vw] max-h-[85vh]"
          onClick={e => e.stopPropagation()}
          style={{ border: '1px solid rgba(193,167,130,0.1)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt=""
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.3), transparent)' }}
          />
        </motion.div>

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); onNext() }}
            className="absolute right-5 md:right-10 text-gold/40 hover:text-gold transition-colors z-10 p-3"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
