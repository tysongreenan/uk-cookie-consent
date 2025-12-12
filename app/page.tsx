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
  title: 'Cookie Consent Banners That Keep You Compliant | Free Forever',
  description: 'Cookie consent banner generator built in Canada for PIPEDA, CASL, Quebec Law 25, and GDPR compliance. Brand-matching customization, unlimited banners, works on WordPress, Shopify, Webflow. Free forever for first 1,000 accounts. 5-minute setup.',
  keywords: [
    'cookie banner',
    'cookie consent',
    'GDPR compliant',
    'PIPEDA compliant',
    'CASL compliant',
    'Quebec Law 25',
    'cookie banner generator',
    'cookie banner Canada',
    'privacy compliance',
    'branded cookie banner',
    'custom cookie consent',
    'bilingual cookie banner',
    'cookie banner WordPress',
    'cookie banner Shopify',
    'cookie banner Webflow',
  ],
  openGraph: {
    title: 'Cookie Consent Banners That Keep You Compliant | Free Forever',
    description: 'Cookie consent banner generator built in Canada for PIPEDA, CASL, Quebec Law 25, and GDPR compliance. Brand-matching customization, unlimited banners, works on WordPress, Shopify, Webflow. Free forever for first 1,000 accounts.',
    type: 'website',
  },
  alternates: {
    canonical: '/',
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
          title="Cookie Consent Banners"
          title2="That Keep You Compliant"
          description="Avoid privacy law fines. Match your brand perfectly. Free forever."
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