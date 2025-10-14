import { Hero } from '@/components/landing/hero'
import { HowItWorksShowcase } from '@/components/landing/how-it-works-showcase'
import { ValueStack } from '@/components/landing/value-stack'
import { InteractiveDemo } from '@/components/landing/interactive-demo'
import { WhyFree } from '@/components/landing/why-free'
import { SEOTextBlock } from '@/components/landing/seo-text-block'
import { FinalCTA } from '@/components/landing/final-cta'
import { CookieBannerFAQ } from '@/components/faq/cookie-banner-faq'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { StructuredData } from '@/components/seo/structured-data'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData />
      <LiveCookieBanner />
      <Header />
      <main>
        {/* Section 1: Hero — Hook + Offer */}
        <Hero />
        
        {/* Section 2: How It Works */}
        <section id="how-it-works">
          <HowItWorksShowcase />
        </section>
        
        {/* Section 3: What You Get (Value Stack) */}
        <section id="features">
          <ValueStack />
        </section>
        
        {/* Section 3.5: Interactive Demo */}
        <section id="demo">
          <InteractiveDemo />
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
