import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Radial gold ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(193,167,130,0.08) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top hairline */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'rgba(193,167,130,0.25)',
            display: 'flex',
          }}
        />

        {/* Bottom hairline */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            height: '1px',
            background: 'rgba(193,167,130,0.25)',
            display: 'flex',
          }}
        />

        {/* Brand label */}
        <div
          style={{
            fontSize: '11px',
            letterSpacing: '6px',
            color: 'rgba(193,167,130,0.6)',
            textTransform: 'uppercase',
            marginBottom: '32px',
            fontFamily: 'sans-serif',
            display: 'flex',
          }}
        >
          KHARTOUM · SUDAN · EST. 2015
        </div>

        {/* Main brand name */}
        <div
          style={{
            fontSize: '88px',
            fontWeight: 300,
            color: '#C1A782',
            letterSpacing: '8px',
            fontFamily: 'serif',
            lineHeight: 1,
            display: 'flex',
          }}
        >
          AL-YOUSIFI
        </div>

        <div
          style={{
            fontSize: '88px',
            fontWeight: 300,
            color: 'rgba(245,240,235,0.85)',
            letterSpacing: '14px',
            fontFamily: 'serif',
            lineHeight: 1,
            marginTop: '8px',
            display: 'flex',
          }}
        >
          CLASSIC
        </div>

        {/* Ornament */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '40px',
          }}
        >
          <div style={{ width: '60px', height: '1px', background: 'rgba(193,167,130,0.4)', display: 'flex' }} />
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              border: '1px solid rgba(193,167,130,0.6)',
              display: 'flex',
            }}
          />
          <div style={{ width: '60px', height: '1px', background: 'rgba(193,167,130,0.4)', display: 'flex' }} />
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '18px',
            color: 'rgba(245,240,235,0.35)',
            letterSpacing: '2px',
            fontFamily: 'sans-serif',
            marginTop: '28px',
            display: 'flex',
          }}
        >
          Luxury Menswear
        </div>
      </div>
    ),
    { ...size }
  )
}
