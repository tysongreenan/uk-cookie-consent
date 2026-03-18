import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Cookie Consent: Complete 2026 Guide',
  description:
    'Everything you need for GDPR cookie compliance: explicit opt-in, pre-consent blocking, granular controls, and withdrawal rights. Free checklist & banner setup.',
  keywords:
    'gdpr cookie consent, gdpr cookie compliance, gdpr cookie consent requirements, gdpr cookies, gdpr cookie banner, gdpr cookie requirements, cookie consent gdpr, gdpr cookie policy, gdpr compliant cookie banner, eu cookie compliance, gdpr and cookies',
  openGraph: {
    title: 'GDPR Cookie Consent: Complete 2026 Guide',
    description:
      'Everything you need for GDPR cookie compliance: explicit opt-in, pre-consent blocking, granular controls, and withdrawal rights.',
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
