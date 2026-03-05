import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Noto_Naskh_Arabic } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import InstallPrompt from '@/components/InstallPrompt'
import CustomCursor from '@/components/CustomCursor'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'Al-Yousifi Classic | اليوسفي كلاسيك',
  description:
    "Sudan's premier men's luxury fashion boutique. Formal wear, casual collections, footwear, watches, and accessories. Located in Khartoum.",
  keywords: 'Al-Yousifi Classic, luxury fashion Sudan, men boutique Khartoum, اليوسفي كلاسيك',
  openGraph: {
    title: 'Al-Yousifi Classic | اليوسفي كلاسيك',
    description: "Sudan's premier men's luxury fashion boutique — Khartoum",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cormorant.variable} ${jost.variable} ${notoNaskh.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <CustomCursor />
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <InstallPrompt />
        </LanguageProvider>
      </body>
    </html>
  )
}
