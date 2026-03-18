import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Consent for Healthcare — HIPAA Compliant',
  description:
    'HIPAA-compliant cookie consent for healthcare websites. Manage patient portal, telemedicine, and medical site cookies alongside GDPR and CCPA. Free plan available.',
  keywords:
    'cookie consent healthcare, hipaa cookie consent, healthcare website compliance, medical privacy cookies, telemedicine gdpr, patient portal consent, hipaa cookie banner, cookie consent management platforms for healthcare websites hipaa compliance',
  alternates: {
    canonical: '/solutions/healthcare',
  },
  openGraph: {
    title: 'Cookie Consent for Healthcare — HIPAA Compliant',
    description:
      'HIPAA-compliant cookie consent for healthcare websites. Manage compliance across GDPR, PIPEDA, and CCPA.',
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
