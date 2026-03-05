'use client'

import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

export type LogoVariant = 'standard' | 'bold' | 'crest' | 'lockup' | 'simplified' | 'stroke'
export type LogoColor = 'gold' | 'white' | 'raw'

interface AYCLogoProps {
  variant?: LogoVariant
  color?: LogoColor
  className?: string
  style?: CSSProperties
  width?: number | string
  height?: number | string
  alt?: string
  animate?: boolean
  glow?: boolean
}

const LOGO_SRC: Record<LogoVariant, string> = {
  standard:   '/logo.svg',
  bold:       '/logo-bold.svg',
  crest:      '/logo-crest.svg',
  lockup:     '/logo-lockup.svg',
  simplified: '/logo-simplified.svg',
  stroke:     '/logo-stroke.svg',
}

/**
 * CSS Filters
 * - gold:  black SVG → invert → warm sepia gold ≈ #C4AF89 (matches brand gold #C1A782)
 * - white: black SVG → invert → pure white
 * - raw:   no filter (lockup is already light-fill for dark bg)
 */
const COLOR_FILTER: Record<LogoColor, string> = {
  gold:  'brightness(0) invert(1) sepia(1)',
  white: 'brightness(0) invert(1)',
  raw:   'invert(1)',
}

export default function AYCLogo({
  variant = 'standard',
  color = 'gold',
  className = '',
  style,
  width,
  height,
  alt = 'Al-Yousifi Classic | اليوسفي كلاسيك',
  animate = false,
  glow = false,
}: AYCLogoProps) {
  const glowStyle: CSSProperties = glow
    ? {
        filter: `${COLOR_FILTER[color]} drop-shadow(0 0 32px rgba(193,167,130,0.35)) drop-shadow(0 0 80px rgba(193,167,130,0.12))`,
      }
    : { filter: COLOR_FILTER[color] }

  const imgStyle: CSSProperties = {
    width,
    height,
    objectFit: 'contain',
    display: 'block',
    transition: 'filter 0.4s ease, opacity 0.4s ease',
    ...glowStyle,
    ...style,
  }

  if (animate) {
    return (
      <motion.img
        src={LOGO_SRC[variant]}
        alt={alt}
        className={className}
        style={imgStyle}
        whileHover={{ scale: 1.02, filter: `${COLOR_FILTER[color]} drop-shadow(0 0 40px rgba(193,167,130,0.4))` }}
        transition={{ duration: 0.4 }}
      />
    )
  }

  return (
    <img
      src={LOGO_SRC[variant]}
      alt={alt}
      className={className}
      style={imgStyle}
    />
  )
}

/**
 * Watermark — oversized decorative background logo
 * Usage: absolute positioned behind section content
 */
export function LogoWatermark({
  variant = 'crest',
  opacity = 0.025,
  color = 'white',
  className = '',
  style,
}: {
  variant?: LogoVariant
  opacity?: number
  color?: LogoColor
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        opacity,
        filter: COLOR_FILTER[color],
        ...style,
      }}
    >
      <img
        src={LOGO_SRC[variant]}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}

/**
 * Stroke Watermark — the architectural outline version
 * Large background art element
 */
export function StrokeWatermark({
  opacity = 0.03,
  className = '',
  style,
}: {
  opacity?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ opacity, ...style }}
    >
      <img
        src="/logo-stroke.svg"
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          filter: 'brightness(0) invert(1) sepia(1)',
        }}
      />
    </div>
  )
}
