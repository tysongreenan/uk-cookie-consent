import { Metadata } from 'next'
import { FeaturesBentoV2 } from './features-bento-v2'
import { InteractiveBannerDemo } from '@/components/landing/interactive-banner-demo'
import { RoadmapPreviewV2 } from './roadmap-preview-v2'
import { FinalCTA } from '@/components/landing/final-cta'
import { CookieBannerFAQ } from '@/components/faq/cookie-banner-faq'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'
import { HeroSectionV2 } from './hero-section-v2'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { AEOStructuredData } from '@/components/seo/aeo-structured-data'
import { ProductDescription } from '@/components/landing/product-description'
import { ABTracker } from '@/components/ab-tracker'

export const metadata: Metadata = {
  title: 'Free Cookie Banner Generator — GDPR Compliant (2026)',
  description: 'Create a free cookie consent banner in 2 minutes. GDPR, CCPA, PIPEDA & Law 25 compliant. Works on WordPress, Shopify, Webflow & any site. No code needed.',
  keywords: [
    'cookie banner generator',
    'cookie banner generator free',
    'free cookie banner generator',
    'cookie banner',
    'cookie consent banner',
    'cookie consent banner generator',
    'cookie banner for website',
    'GDPR cookie banner',
    'PIPEDA cookie banner',
    'CCPA cookie banner',
    'law 25 cookie banner',
    'cookie banner WordPress',
    'cookie banner Shopify',
    'cookie banner Webflow',
    'free cookie consent banner',
    'free cookie banner',
    'cookie banner Canada',
    'cookie banners',
    'cookie consent',
    'custom cookie banner',
  ],
  openGraph: {
    title: 'Free Cookie Banner Generator — GDPR Compliant (2026)',
    description: 'Create a free cookie consent banner in 2 minutes. GDPR, CCPA, PIPEDA & Law 25 compliant. Works on any site. No code needed.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function HomePageV2() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'

  return (
    <div className="min-h-screen bg-background">
      <AEOStructuredData baseUrl={baseUrl} />

      <ABTracker experiment="homepage" variant="v2" />
      <LiveCookieBanner />
      <Header />
      <main>
        <HeroSectionV2 />
        <LogoMarquee />
        <InteractiveBannerDemo />
        <FeaturesBentoV2 />
        <ProductDescription />
        <RoadmapPreviewV2 />
        <FinalCTA />
        <CookieBannerFAQ />
      </main>
      <Footer />
    </div>
  )
}
