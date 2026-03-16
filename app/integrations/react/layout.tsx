import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Cookie Consent: Under 10KB Banner for React & Next.js',
  description: 'Add a GDPR-compliant react cookie consent banner to your app in 2 minutes. No npm install, zero bundle impact, async loading. Works with Next.js App Router, Vite, and CRA.',
  keywords: 'react cookie consent, react cookie banner, nextjs cookie banner, react-cookie-consent alternative, lightweight cookie consent react, react gdpr cookie banner, cookie consent npm, react-cookie-consent google analytics',
  openGraph: {
    title: 'React Cookie Consent: Under 10KB Banner for React & Next.js',
    description: 'Add a GDPR-compliant react cookie consent banner in 2 minutes. No npm install, zero bundle impact. Works with Next.js, Vite, and CRA.',
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
