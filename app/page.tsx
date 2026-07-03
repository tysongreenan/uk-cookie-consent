import { Metadata } from 'next'
import { InteractiveBannerDemo } from '@/components/landing/interactive-banner-demo'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'
import { AEOStructuredData } from '@/components/seo/aeo-structured-data'
import { ABTracker } from '@/components/ab-tracker'

import { HeroV2 } from '@/components/landing/v2/hero-v2'
import { PlatformStrip } from '@/components/landing/v2/platform-strip'
import { BuilderHeader } from '@/components/landing/v2/builder-wrap'
import { FeaturesBentoV2 } from '@/components/landing/v2/features-bento-v2'
import { LanguageSectionV2 } from '@/components/landing/v2/language-section-v2'
import { ComparisonSection } from '@/components/landing/v2/comparison-section'
import { PricingSection } from '@/components/landing/v2/pricing-section'
import { FaqV2 } from '@/components/landing/v2/faq-v2'
import { FinalCtaV2 } from '@/components/landing/v2/final-cta-v2'

export const metadata: Metadata = {
  title: 'Free Cookie Banner Generator — No Code, Live in 5 Min (2026)',
  description: 'Build a free cookie banner in 5 minutes. No code needed. PIPEDA, Law 25, GDPR & CCPA compliant. Works on WordPress, Shopify, Webflow & any site.',
  keywords: [
    'cookie banner',
    'cookie banners',
    'cookie banner generator',
    'free cookie banner generator',
    'cookie banner generator free',
    'cookie consent banner',
    'cookie consent banner generator',
    'cookie banner for website',
    'cookie banner Canada',
    'PIPEDA cookie banner',
    'law 25 cookie banner',
    'GDPR cookie banner',
    'CCPA cookie banner',
    'cookie banner WordPress',
    'cookie banner Shopify',
    'cookie banner Webflow',
    'free cookie consent banner',
    'free cookie banner',
    'cookie consent',
    'custom cookie banner',
    'no code cookie banner',
  ],
  openGraph: {
    title: 'Free Cookie Banner Generator — No Code, Live in 5 Min (2026)',
    description: 'Build a free cookie banner in 5 minutes. No code needed. PIPEDA, Law 25, GDPR & CCPA compliant. Works on any site.',
    type: 'website',
    locale: 'en_CA',
    alternateLocale: 'fr_CA',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca',
    languages: {
      'en-ca': 'https://www.cookie-banner.ca',
      'fr-ca': 'https://www.cookie-banner.ca/fr',
      'x-default': 'https://www.cookie-banner.ca',
    },
  },
}

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'

  return (
    <div className="min-h-screen bg-background">
      <AEOStructuredData baseUrl={baseUrl} />
      <ABTracker experiment="homepage" variant="v2" />
      <LiveCookieBanner />
      <Header />
      <main>
        <HeroV2 />
        <PlatformStrip />
        <BuilderHeader />
        <InteractiveBannerDemo />
        <FeaturesBentoV2 />
        <LanguageSectionV2 />
        <ComparisonSection />
        <PricingSection />
        <FaqV2 />
        <FinalCtaV2 />
      </main>
      <Footer />
    </div>
  )
}
