'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'none'
type Variant = 'fade' | 'clip'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: Direction
  variant?: Variant
}

export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  variant = 'fade',
}: Props) {
  if (variant === 'clip') {
    return (
      <motion.div
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const variants = {
    up:    { initial: { opacity: 0, y: 36 },  animate: { opacity: 1, y: 0 } },
    left:  { initial: { opacity: 0, x: -36 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 36 },  animate: { opacity: 1, x: 0 } },
    none:  { initial: { opacity: 0 },          animate: { opacity: 1 } },
  }

  const { initial, animate } = variants[direction]

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
