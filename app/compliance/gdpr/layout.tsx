import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Cookie Banner Builder — Free Consent Tool (2026)',
  description:
    'Build a GDPR cookie banner with pre-consent script blocking, granular controls and consent logs. Free setup for websites, WordPress, Shopify and more.',
  keywords:
    'gdpr cookie banner, gdpr compliant cookie banner, gdpr cookie consent tool, gdpr cookie consent solution, free gdpr cookie banner, gdpr cookie banner generator, gdpr cookie compliance tool, eu cookie banner, gdpr cookie widget',
  openGraph: {
    title: 'GDPR Cookie Banner Builder — Free Consent Tool (2026)',
    description:
      'Build a GDPR cookie banner with pre-consent blocking, granular controls and consent logs.',
    type: 'article',
  },
  alternates: {
    canonical: '/compliance/gdpr',
  },
}

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
