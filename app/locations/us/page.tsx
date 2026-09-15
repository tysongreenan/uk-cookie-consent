import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { LogoCloud3 } from '@/components/ui/logo-cloud-3'
import { StructuredData } from '@/components/seo/structured-data'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import { UsExperience } from '@/components/locations/us/us-experience'
import { UsCompare, UsHowItWorks, UsStateLaws } from '@/components/locations/us/sections'
import { UsLawsBento } from '@/components/locations/us/laws-bento'
import { FaqUs } from '@/components/locations/us/faq-us'
import { CtaUs } from '@/components/locations/us/cta-us'

export const metadata: Metadata = {
  title: 'US Cookie Consent | CCPA, CPRA & State Privacy Laws Guide 2026',
  description:
    'CCPA, CPRA, and US state privacy-law cookie banner. “Do Not Sell” built in, GPC honored, geo-targeted by state. Free plan — set up in 5 minutes.',
  keywords:
    'us cookie consent, ccpa compliance, cpra california, state privacy laws, vcdpa virginia, cpa colorado, ctdpa connecticut, us privacy law, do not sell my personal information, global privacy control',
  openGraph: {
    title: 'US Cookie Consent | CCPA, CPRA & State Privacy Laws Guide 2026',
    description:
      'One cookie banner for CCPA, CPRA, and the US state privacy patchwork. Do Not Sell, GPC, geo-targeting.',
    type: 'article',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/locations/us',
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://www.cookie-banner.ca' },
  { name: 'Locations', url: 'https://www.cookie-banner.ca/locations' },
  { name: 'United States', url: 'https://www.cookie-banner.ca/locations/us' },
]

export default function USCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      {/*
        THESIS: US privacy is a patchwork, not a flag. The page is a live state switchboard that rewrites the banner — not a red/blue legal encyclopedia.
        OWN-WORLD: Brand teal, beige, Bricolage, yellow marker, Kokonut floating slabs, 20px cards, dark CTA band.
        STORY: Understand CCPA is opt-out, click a state, paste a URL, go to builder.
        FIRST VIEWPORT: Split hero — headline + URL form left, browser chrome with live CCPA banner right.
        FORM: 21st.dev split-hero + Kokonut Shape Landing Hero geometry, inside cookie-banner.ca brand.
      */}
      <StructuredData
        type="webpage"
        data={{
          name: 'US Cookie Consent | CCPA, CPRA & State Privacy Laws',
          description:
            'Cookie banner for CCPA, CPRA, and US state privacy laws with Do Not Sell, GPC, and geo-targeting.',
          url: 'https://www.cookie-banner.ca/locations/us',
          dateModified: '2026-08-22',
        }}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main>
        <UsExperience />
        <LogoCloud3 />
        <UsLawsBento />
        <UsCompare />
        <UsHowItWorks />
        <UsStateLaws />
        <FaqUs />
        <CtaUs />
      </main>
      <Footer />
    </div>
  )
}
