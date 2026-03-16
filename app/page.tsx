import { Metadata } from 'next'
import { FeaturesBento } from '@/components/landing/features-bento'
import { InteractiveBannerDemo } from '@/components/landing/interactive-banner-demo'
import { RoadmapPreview } from '@/components/landing/roadmap-preview'
import { FinalCTA } from '@/components/landing/final-cta'
import { CookieBannerFAQ } from '@/components/faq/cookie-banner-faq'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { LiveCookieBanner } from '@/components/cookie-consent/live-banner'
import { HeroSection } from '@/components/blocks/hero-section'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { AEOStructuredData } from '@/components/seo/aeo-structured-data'
import { ProductDescription } from '@/components/landing/product-description' 

export const metadata: Metadata = {
  title: 'Cookie Banner Generator — Free & GDPR Compliant | Cookie-Banner.ca',
  description: 'Generate cookie consent banners for free. GDPR, PIPEDA, CCPA & Quebec Law 25 compliant. Works on WordPress, Shopify & any site. No coding needed. Used by 1,000+ websites.',
  keywords: [
    'cookie banner generator',
    'cookie banner generator free',
    'free cookie banner generator',
    'cookie banner',
    'cookie consent banner',
    'cookie consent banner generator',
    'GDPR cookie banner',
    'PIPEDA cookie banner',
    'CCPA cookie banner',
    'law 25 cookie banner',
    'cookie banner WordPress',
    'cookie banner Shopify',
    'cookie banner Webflow',
    'free cookie consent banner',
    'cookie banner Canada',
  ],
  openGraph: {
    title: 'Cookie Banner Generator — Free & GDPR Compliant',
    description: 'Generate cookie consent banners for free. GDPR, PIPEDA, CCPA & Law 25 compliant. Works on any site. No coding needed.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca',
  },
}

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'
  
  return (
    <div className="min-h-screen bg-background">
      {/* AEO Structured Data - Optimized for AI Assistants */}
      <AEOStructuredData baseUrl={baseUrl} />
      
      <LiveCookieBanner />
      <Header />
      <main>
        {/* Hero Section - LCP element */}
        <HeroSection
          badge={{
            text: "Used by 1,000+ websites",
          }}
          title="Free Cookie Banner Generator"
          title2="GDPR, PIPEDA & Law 25 Compliant"
          description="Generate cookie consent banners in 5 minutes. Match your brand. Works on any platform. Free plan available — upgrade to Pro for $99 one-time."
          emailCapture={true}
          useGeometricBackground={true}
          // Video temporarily hidden - uncomment when ready:
          // video={{
          //   src: "https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb",
          //   thumbnail: {
          //     light: "https://startup-template-sage.vercel.app/hero-light.png",
          //     dark: "https://startup-template-sage.vercel.app/hero-dark.png",
          //     alt: "Cookie Banner Generator Demo Video",
          //   },
          // }}
        />

        <LogoMarquee />
      
        <InteractiveBannerDemo />
        <FeaturesBento />
        <ProductDescription />
        <RoadmapPreview />
        <FinalCTA />
        <CookieBannerFAQ />
      </main>
      <Footer />
    </div>
  )
}