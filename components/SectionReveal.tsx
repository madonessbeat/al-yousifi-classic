'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: Props) {
  const variants = {
    up: { initial: { opacity: 0, y: 36 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -36 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 36 }, animate: { opacity: 1, x: 0 } },
    none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  }

  const { initial, animate } = variants[direction]

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.85,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
