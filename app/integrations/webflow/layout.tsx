import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Webflow Cookie Banner — Add GDPR Consent in 3 Min',
  description: 'Add a GDPR-compliant cookie banner to Webflow with 1 script tag in Project Settings. Under 10KB, $99 one-time, works with every Webflow site plan. Step-by-step guide.',
  keywords: 'webflow cookie banner, webflow cookie consent, webflow gdpr, how to add cookie banner to webflow, webflow custom code cookie consent',
  openGraph: {
    title: 'Webflow Cookie Banner — Add GDPR Consent in 3 Min',
    description: 'Add a GDPR-compliant cookie banner to Webflow with 1 script tag in Project Settings. Under 10KB, $99 one-time.',
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
