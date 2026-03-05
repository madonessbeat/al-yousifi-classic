import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lookbook',
  description: 'The Al-Yousifi Classic Lookbook — editorial photography celebrating Sudanese luxury.',
  openGraph: {
    title: 'Lookbook | Al-Yousifi Classic',
    description: 'The Al-Yousifi Classic Lookbook — editorial photography celebrating Sudanese luxury.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
