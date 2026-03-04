import Hero from '@/components/Hero'
import About from '@/components/About'
import Categories from '@/components/Categories'
import FeaturedCollection from '@/components/FeaturedCollection'
import Craftsmanship from '@/components/Craftsmanship'
import Lookbook from '@/components/Lookbook'
import Testimonials from '@/components/Testimonials'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <FeaturedCollection />
      <Craftsmanship />
      <Lookbook />
      <Testimonials />
      <ContactSection />
    </>
  )
}
