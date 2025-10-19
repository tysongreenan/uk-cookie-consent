import { Metadata } from 'next'
import { Hero } from '@/components/landing/hero'
import { ValueStack } from '@/components/landing/value-stack'
import { LiveBannerRotator } from '@/components/landing/visuals/core/LiveBannerRotator'
import { BrandColorPicker } from '@/components/landing/visuals/core/BrandColorPicker'
import { SetupSpeedometer } from '@/components/landing/visuals/core/SetupSpeedometer'
import { ThreeStepAnimation } from '@/components/landing/visuals/core/ThreeStepAnimation'
import { CanadianComplianceSection } from '@/components/compliance/canadian-compliance-section'
import { WhyFree } from '@/components/landing/why-free'
import { SEOTextBlock } from '@/components/landing/seo-text-block'
import { RoadmapPreview } from '@/components/landing/roadmap-preview'
import { FinalCTA } from '@/components/landing/final-cta'
import { CookieBannerFAQ } from '@/components/faq/cookie-banner-faq'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'

export const metadata: Metadata = {
  title: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
  description: 'Create unlimited cookie banners custom-branded to your site. Fully compliant with GDPR & PIPEDA. First 1,000 accounts free — no card needed.',
  keywords: ['cookie banner', 'GDPR compliant', 'PIPEDA compliant', 'cookie consent', 'Canada', 'privacy law'],
  openGraph: {
    title: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
    description: 'Create unlimited cookie banners custom-branded to your site. Fully compliant with GDPR & PIPEDA. First 1,000 accounts free — no card needed.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LiveCookieBanner />
      <Header />
      <main>
        <Hero />
        <ValueStack />
        
        {/* Live Banner Rotator - Shows different brand styles */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See It In Action — Live Banner Examples
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Watch as we cycle through different brand styles. Each banner is fully customizable and GDPR compliant.
              </p>
            </div>
            <LiveBannerRotator />
          </div>
        </section>

        {/* Brand Color Picker - Interactive customization */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Customize Your Brand Colors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pick any color and see your banner update instantly. Perfect brand matching in seconds.
              </p>
            </div>
            <BrandColorPicker />
          </div>
        </section>

        {/* Speed Comparison - 5 min vs 3+ hours */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <SetupSpeedometer />
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <ThreeStepAnimation />
          </div>
        </section>

        <CanadianComplianceSection />
        <WhyFree />
        <SEOTextBlock />
        <RoadmapPreview />
        <FinalCTA />
        <CookieBannerFAQ />
      </main>
      <Footer />
    </div>
  )
}