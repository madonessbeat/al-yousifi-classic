'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 18 })
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 18 })
  const [isFinePointer, setIsFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setIsFinePointer(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches)
    mq.addEventListener('change', onChange)

    if (!mq.matches) return () => mq.removeEventListener('change', onChange)

    document.documentElement.style.cursor = 'none'

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      mq.removeEventListener('change', onChange)
      document.documentElement.style.cursor = ''
    }
  }, [cursorX, cursorY])

  if (!isFinePointer) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: '6px',
          height: '6px',
          background: 'rgba(193,167,130,0.9)',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: '36px',
          height: '36px',
          border: '1px solid rgba(193,167,130,0.4)',
          background: 'transparent',
        }}
      />
    </>
  )
}
