import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Noto_Naskh_Arabic } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import InstallPrompt from '@/components/InstallPrompt'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'

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
  metadataBase: new URL('https://al-yousifi-classic.vercel.app'),
  title: {
    template: '%s | Al-Yousifi Classic',
    default: 'Al-Yousifi Classic — Luxury Menswear, Khartoum',
  },
  description:
    'Discover Al-Yousifi Classic — luxury menswear crafted in Khartoum, Sudan. Explore our collections of bespoke suits, thobes, and accessories.',
  keywords: 'Al-Yousifi Classic, luxury fashion Sudan, men boutique Khartoum, اليوسفي كلاسيك',
  openGraph: {
    type: 'website',
    locale: 'ar_SD',
    alternateLocale: 'en_US',
    siteName: 'Al-Yousifi Classic',
    title: 'Al-Yousifi Classic — Luxury Menswear',
    description:
      'Discover Al-Yousifi Classic — luxury menswear crafted in Khartoum, Sudan. Explore our collections of bespoke suits, thobes, and accessories.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Al-Yousifi Classic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al-Yousifi Classic',
    description:
      'Discover Al-Yousifi Classic — luxury menswear crafted in Khartoum, Sudan. Explore our collections of bespoke suits, thobes, and accessories.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Al-Yousifi Classic',
    url: 'https://al-yousifi-classic.vercel.app',
    telephone: '+249912302693',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'شارع الكلاكلة',
      addressLocality: 'الخرطوم',
      addressCountry: 'SD',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '22:00',
      },
    ],
    priceRange: '$$$$',
    image: '/og-image.jpg',
  }

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cormorant.variable} ${jost.variable} ${notoNaskh.variable}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <CustomCursor />
        <LanguageProvider>
          <Navbar />
          <PageTransition>
            <main id="main-content">{children}</main>
          </PageTransition>
          <Footer />
          <WhatsAppButton />
          <InstallPrompt />
        </LanguageProvider>
      </body>
    </html>
  )
}
