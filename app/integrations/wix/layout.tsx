import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wix Cookie Banner — GDPR Consent Without App Market',
  description: 'Add a GDPR-compliant cookie banner to Wix via HTML embed or Velo custom code. Under 10KB, $99 one-time, no monthly App Market fees. Step-by-step Wix integration guide.',
  keywords: 'wix cookie banner, wix cookie consent, wix gdpr compliance, how to add cookie consent to wix, wix velo cookie banner',
  openGraph: {
    title: 'Wix Cookie Banner — GDPR Consent Without App Market',
    description: 'Add a GDPR-compliant cookie banner to Wix via HTML embed or Velo custom code. Under 10KB, $99 one-time.',
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
