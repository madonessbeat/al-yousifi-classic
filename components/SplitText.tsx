'use client'

import { motion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export default function SplitText({ text, className = '', delay = 0, stagger = 0.04 }: Props) {
  const words = text.split(' ')

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}
