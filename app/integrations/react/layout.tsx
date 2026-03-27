import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'React Cookie Banner — Free, No npm Install, Under 10KB (2026)',
  description: 'Add a cookie consent banner to React or Next.js in 5 minutes. No npm package needed — just a script tag. Under 10KB, async loading, GDPR & PIPEDA compliant. Works with App Router, Vite & CRA.',
  keywords: 'react cookie banner, react cookie consent, react-cookie-consent, nextjs cookie banner, nextjs cookie consent, react cookie consent nextjs, lightweight cookie consent react, react gdpr cookie banner, cookie consent npm, npm cookie consent, react-cookie-consent npm, best react cookie consent library 2026, cookie banner react, next js cookie banner, next js cookie consent, cookie banner nextjs',
  openGraph: {
    title: 'React Cookie Banner — Free, No npm Install, Under 10KB (2026)',
    description: 'Add a cookie consent banner to React or Next.js in 5 minutes. No npm package — just a script tag. Under 10KB, async loading, GDPR & PIPEDA compliant. Free plan.',
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
