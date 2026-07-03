import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Cookie Banner — Free Compliance Tool (2026)',
  description:
    'Build a GDPR-compliant cookie banner in minutes. Pre-consent script blocking, granular category controls, consent logging, and no dark patterns — free forever.',
  keywords:
    'gdpr cookie banner, gdpr compliant cookie banner, gdpr cookie consent tool, gdpr cookie consent solution, free gdpr cookie banner, gdpr cookie banner generator, gdpr cookie compliance tool, eu cookie banner, gdpr cookie widget',
  openGraph: {
    title: 'GDPR Cookie Banner — Free Compliance Tool (2026)',
    description:
      'Build a GDPR-compliant cookie banner in minutes. Pre-consent blocking, granular controls, consent logging, and no dark patterns.',
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
