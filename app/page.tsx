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

export const metadata: Metadata = {
  title: 'Cookie Consent Banners That Keep You Compliant | Free Forever',
  description: 'Avoid privacy law fines. Match your brand perfectly. Free forever.',
  keywords: ['cookie banner', 'GDPR compliant', 'PIPEDA compliant', 'cookie consent', 'Canada', 'privacy law'],
  openGraph: {
    title: 'Cookie Consent Banners That Keep You Compliant | Free Forever',
    description: 'Avoid privacy law fines. Match your brand perfectly. Free forever.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
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

      
        <InteractiveBannerDemo />
        <FeaturesBento />
        <RoadmapPreview />
        <FinalCTA />
        <CookieBannerFAQ />
      </main>
      <Footer />
    </div>
  )
}