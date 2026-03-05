import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Visit Al-Yousifi Classic in Alkalakla, Khartoum or reach us on WhatsApp.',
  openGraph: {
    title: 'Contact | Al-Yousifi Classic',
    description: 'Visit Al-Yousifi Classic in Alkalakla, Khartoum or reach us on WhatsApp.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
