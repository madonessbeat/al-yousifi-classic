import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C1A782',
        'gold-dark': '#A8905F',
        'gold-light': '#D4C4A8',
        ivory: '#F5F0EB',
        rich: '#050505',
        card: '#0a0a0a',
        walnut: '#2C2420',
        wood: '#8B7355',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jost: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'Georgia', 'serif'],
      },
      animation: {
        'hero-zoom': 'heroZoom 25s ease alternate infinite',
        'scroll-pulse': 'scrollPulse 2s ease infinite',
        'pin-pulse': 'pinPulse 2s ease infinite',
      },
      keyframes: {
        heroZoom: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.15)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(0.6)' },
        },
        pinPulse: {
          '50%': { boxShadow: '0 0 0 8px rgba(193,167,130,0.12), 0 0 0 18px rgba(193,167,130,0.04)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
