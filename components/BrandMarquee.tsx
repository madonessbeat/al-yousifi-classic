'use client'

interface Props {
  text?: string
  speed?: number   // seconds for one full loop
  className?: string
}

export default function BrandMarquee({
  text = 'AL-YOUSIFI CLASSIC ✦ KHARTOUM ✦ EST. 2015 ✦ LUXURY MENSWEAR ✦ ',
  speed = 28,
  className = '',
}: Props) {
  // Duplicate to create seamless loop
  const doubled = text + text

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <span
          className="text-[9px] tracking-[5px] uppercase font-jost whitespace-nowrap"
          style={{ color: 'rgba(193,167,130,0.18)' }}
        >
          {doubled}
        </span>
      </div>
    </div>
  )
}
