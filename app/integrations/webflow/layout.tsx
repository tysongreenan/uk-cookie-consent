import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webflow Cookie Consent Integration | Designer Extension 2025',
  description: 'Complete Webflow cookie consent integration guide. Custom code injection, Designer extension, CMS compliance, client billing. GDPR, PIPEDA, CCPA compliant cookie banner for Webflow sites.',
  keywords: 'webflow cookie consent, webflow gdpr compliance, webflow designer extension, webflow custom code, webflow privacy banner',
  openGraph: {
    title: 'Webflow Cookie Consent Integration | Designer Extension 2025',
    description: 'Complete Webflow cookie consent integration guide. Custom code injection, Designer extension, CMS compliance.',
    type: 'article',
  },
}

export default function WebflowIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
