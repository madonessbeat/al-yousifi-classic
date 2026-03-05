'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-6 pl-8 md:pl-14">
          {children}
        </motion.div>
      </div>
    </div>
  )
}
