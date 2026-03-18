import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webflow Cookie Banner: Free GDPR Setup (2026)',
  description: 'Add a cookie banner to Webflow in 3 minutes. GDPR compliant, under 10KB, works with every site plan. Free plan available. Just paste one script tag.',
  keywords: 'webflow cookie banner, webflow cookie consent, cookie banner webflow, cookie consent webflow, webflow gdpr, webflow cookies, webflow gdpr compliance, webflow cookie consent free, webflow cookie consent banner, webflow cookie banner template',
  openGraph: {
    title: 'Webflow Cookie Banner: Free GDPR Setup (2026)',
    description: 'Add a cookie banner to Webflow in 3 minutes. GDPR compliant, under 10KB. Free plan available.',
    type: 'article',
  },
  alternates: {
    canonical: '/integrations/webflow',
  },
}

export default function WebflowIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
