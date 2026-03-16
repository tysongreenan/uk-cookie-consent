import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GDPR Cookie Consent Requirements | 2026 Guide',
  description:
    'What does GDPR require for cookie consent? Complete checklist: explicit opt-in, pre-consent blocking, granular controls, and withdrawal rights. Stay compliant.',
  keywords:
    'gdpr cookie consent requirements, gdpr cookie banner, do i need cookie consent for gdpr, gdpr cookie compliance checklist',
  openGraph: {
    title: 'GDPR Cookie Consent Requirements | 2026 Guide',
    description:
      'What does GDPR require for cookie consent? Complete checklist: explicit opt-in, pre-consent blocking, granular controls, and withdrawal rights.',
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
