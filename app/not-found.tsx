import Link from 'next/link'
import { StrokeWatermark } from '@/components/AYCLogo'

export default function NotFound() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      <StrokeWatermark
        opacity={0.025}
        className="inset-0 flex items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(800px, 90vw)',
          height: 'min(800px, 90vw)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <p className="section-label mb-6">404</p>
        <h1
          className="font-cormorant font-light text-gold mb-6"
          style={{ fontSize: 'clamp(80px, 14vw, 160px)', lineHeight: 1 }}
        >
          404
        </h1>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: 'rgba(193,167,130,0.3)' }} />
          <p
            className="font-cormorant italic text-ivory/50"
            style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}
          >
            This page has stepped out
          </p>
          <div className="w-8 h-px" style={{ background: 'rgba(193,167,130,0.3)' }} />
        </div>
        <Link href="/" className="btn-outline-gold">
          Return Home
        </Link>
      </div>
    </section>
  )
}
