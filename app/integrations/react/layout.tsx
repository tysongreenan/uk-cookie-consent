import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Cookie Consent: Free, Lightweight Banner',
  description: 'Add a GDPR-compliant cookie consent banner to React or Next.js in 2 minutes. Under 10KB, no npm install, async loading. Works with App Router, Vite & CRA. Free.',
  keywords: 'react cookie consent, react cookie banner, react-cookie-consent, nextjs cookie banner, nextjs cookie consent, react cookie consent nextjs, lightweight cookie consent react, react gdpr cookie banner, cookie consent npm, npm cookie consent, react-cookie-consent npm, best react cookie consent library 2025, cookie banner react, next js cookie banner, next js cookie consent, cookie banner nextjs',
  openGraph: {
    title: 'React Cookie Consent: Free, Lightweight Banner',
    description: 'Add a GDPR-compliant cookie consent banner to React or Next.js in 2 minutes. Under 10KB, no npm install. Free plan.',
    type: 'article',
  },
  alternates: {
    canonical: '/integrations/react',
  },
}

export default function ReactIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
