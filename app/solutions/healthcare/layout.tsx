import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free HIPAA Cookie Consent for Healthcare Sites (2026)',
  description:
    'Is your healthcare site tracking patients without consent? Get a free HIPAA-compliant cookie banner for clinics, telehealth & patient portals. Set up in 5 minutes.',
  keywords:
    'cookie consent healthcare, hipaa cookie consent, healthcare website compliance, medical privacy cookies, telemedicine gdpr, patient portal consent, hipaa cookie banner, healthcare cookie banner, free hipaa cookie consent, telehealth cookie compliance',
  alternates: {
    canonical: '/solutions/healthcare',
  },
  openGraph: {
    title: 'Free HIPAA Cookie Consent for Healthcare Sites (2026)',
    description:
      'Free HIPAA-compliant cookie banner for clinics, telehealth & patient portals. Set up in 5 minutes, no code needed.',
    type: 'article',
  },
}

export default function HealthcareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
