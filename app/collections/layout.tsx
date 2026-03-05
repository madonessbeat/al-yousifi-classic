import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore Al-Yousifi Classic collections — Nubian, Desert Rose, Khartoum Nights, and Signature.',
  openGraph: {
    title: 'Collections | Al-Yousifi Classic',
    description: 'Explore Al-Yousifi Classic collections — Nubian, Desert Rose, Khartoum Nights, and Signature.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
