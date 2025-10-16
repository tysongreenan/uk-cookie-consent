import { Hero } from '@/components/landing/hero'
import { ValueStack } from '@/components/landing/value-stack'
import { InteractiveDemo } from '@/components/landing/interactive-demo'
import { WhyFree } from '@/components/landing/why-free'
import { SEOTextBlock } from '@/components/landing/seo-text-block'
import { FinalCTA } from '@/components/landing/final-cta'
import { CookieBannerFAQ } from '@/components/faq/cookie-banner-faq'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LiveCookieBanner />
      <Header />
      <main>
        {/* Section 1: Hero — Hook + Offer */}
        <Hero />
        
        {/* Section 2: Build Your First Banner */}
        <section id="build-banner">
          <InteractiveDemo />
        </section>
        
        {/* Section 3: What You Get (Value Stack) */}
        <section id="features">
          <ValueStack />
        </section>
        
        {/* Section 4: Why It's Free */}
        <WhyFree />
        
        {/* Section 5: SEO Text Block */}
        <SEOTextBlock />
        
        {/* Section 6: Final CTA */}
        <FinalCTA />
        
        {/* Section 7: FAQs */}
        <section id="faq" className="py-16 md:py-24">
          <div className="container">
            <CookieBannerFAQ />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
