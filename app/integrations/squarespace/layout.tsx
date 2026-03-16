import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Squarespace Cookie Banner | Code Injection Setup',
  description:
    'Add cookie consent to Squarespace in under 5 minutes using Code Injection. No developer needed. GDPR, CCPA, and PIPEDA compliant. $99 one-time, under 10KB.',
  keywords: [
    'squarespace cookie banner',
    'squarespace cookie consent',
    'squarespace gdpr compliance',
    'how to add cookie consent to squarespace',
    'squarespace code injection cookie',
    'squarespace privacy compliance',
  ],
  alternates: {
    canonical: '/integrations/squarespace',
  },
  openGraph: {
    title: 'Squarespace Cookie Banner | Code Injection Setup',
    description:
      'Add cookie consent to Squarespace in under 5 minutes using Code Injection. No developer needed. GDPR, CCPA, and PIPEDA compliant.',
    type: 'article',
    url: '/integrations/squarespace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squarespace Cookie Banner | Code Injection Setup',
    description:
      'Add cookie consent to Squarespace in under 5 minutes using Code Injection. No developer needed. GDPR, CCPA, and PIPEDA compliant.',
  },
}

export default function SquarespaceIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
