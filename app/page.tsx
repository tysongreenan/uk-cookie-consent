import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Pricing } from '@/components/landing/pricing'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { CookieBannerFAQ } from '@/components/faq/cookie-banner-faq'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <CookieBannerFAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
