import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Wix Cookie Banner — No App Market Fees (2026)',
  description: 'Add a free cookie banner to Wix in 5 minutes. No App Market install needed — paste one snippet via HTML embed or Velo. GDPR & CCPA compliant, about 28 KB gzipped.',
  keywords: 'wix cookie banner, wix cookie consent, wix cookie consent apps, cookie banner wix, wix gdpr compliance, how to add cookie consent to wix, wix velo cookie banner, wix cookie consent banner, free wix cookie banner, wix ccpa compliance',
  openGraph: {
    title: 'Free Wix Cookie Banner — No App Market Fees (2026)',
    description: 'Add a free cookie banner to Wix in 5 minutes. No App Market install, about 28 KB gzipped. GDPR & CCPA compliant.',
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
