import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wix Cookie Banner: Free GDPR Consent (2026)',
  description: 'Add a GDPR-compliant cookie banner to Wix in minutes. No App Market fees, under 10KB, works via HTML embed or Velo. Free plan available. Step-by-step guide.',
  keywords: 'wix cookie banner, wix cookie consent, wix cookie consent apps, cookie banner wix, wix gdpr compliance, how to add cookie consent to wix, wix velo cookie banner, wix cookie consent banner, free wix cookie banner',
  openGraph: {
    title: 'Wix Cookie Banner: Free GDPR Consent (2026)',
    description: 'Add a GDPR-compliant cookie banner to Wix in minutes. No App Market fees, under 10KB. Free plan available.',
    type: 'article',
  },
  alternates: {
    canonical: '/integrations/wix',
  },
}

export default function WixIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
