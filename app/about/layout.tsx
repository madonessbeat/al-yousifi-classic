import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of Al-Yousifi Classic — heritage, craft, and vision from Khartoum, Sudan.',
  openGraph: {
    title: 'About Al-Yousifi Classic',
    description: 'The story of Al-Yousifi Classic — heritage, craft, and vision from Khartoum, Sudan.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
