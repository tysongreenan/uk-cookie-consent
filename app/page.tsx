import { Metadata } from 'next'
import { Hero } from '@/components/landing/hero'
import { ValueStack } from '@/components/landing/value-stack'
import { InteractiveDemo } from '@/components/landing/interactive-demo'
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
        <InteractiveDemo />
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