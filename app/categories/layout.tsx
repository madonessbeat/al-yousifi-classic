import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse Al-Yousifi Classic categories: formal suits, casual wear, footwear, watches, and accessories.',
  openGraph: {
    title: 'Categories | Al-Yousifi Classic',
    description: 'Browse Al-Yousifi Classic categories: formal suits, casual wear, footwear, watches, and accessories.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
