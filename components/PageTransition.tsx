'use client'

import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        {/* Black curtain wipe — retracts upward on enter, expands downward on exit */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{ background: '#000', originY: 1 }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Gold hairline at bottom — leads on exit expansion */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(193,167,130,0.6), transparent)' }}
          />
        </motion.div>
        {children}
      </div>
    </AnimatePresence>
  )
}
