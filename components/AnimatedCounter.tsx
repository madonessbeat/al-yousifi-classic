'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

interface Props {
  value: string        // e.g. "10+" or "٥٠٠+" or "100%"
  className?: string
}

function extractNumber(val: string): { prefix: string; num: number; suffix: string } {
  // Match optional prefix, Arabic-Indic or Western digits, optional suffix
  const match = val.match(/^([^\d٠-٩]*)([0-9٠-٩]+)([^\d٠-٩]*)$/)
  if (!match) return { prefix: '', num: 0, suffix: val }
  // Convert Arabic-Indic digits to Western
  const western = match[2].replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
  return { prefix: match[1], num: parseInt(western, 10), suffix: match[3] }
}

export default function AnimatedCounter({ value, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState('0')
  const { prefix, num, suffix } = extractNumber(value)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, num, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(String(Math.round(latest)))
      },
    })
    return controls.stop
  }, [isInView, num])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
