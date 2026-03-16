import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Cookie Consent: Lightweight Banner for React & Next.js (2026)',
  description: 'Add a lightweight, GDPR-compliant react cookie consent banner to your app in 2 minutes. Works with Next.js App Router, Vite, and CRA. No npm package bloat. Integrates with Google Analytics, Facebook Pixel, and more.',
  keywords: 'react cookie consent, react cookie banner, react-cookie-consent, npm cookie consent, cookie consent npm, lightweight cookie consent for react apps, react-cookie-consent google analytics, nextjs cookie banner, react gdpr compliance',
  openGraph: {
    title: 'React Cookie Consent: Lightweight Banner for React & Next.js (2026)',
    description: 'Add a lightweight, GDPR-compliant react cookie consent banner to your app in 2 minutes. No npm package bloat. Integrates with Google Analytics.',
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
