import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare Cookie Consent | HIPAA & GDPR Compliance for Medical Sites',
  description:
    'HIPAA-compliant cookie consent for healthcare websites. Manage patient portal, telemedicine, and medical device cookie consent alongside GDPR, PIPEDA, and CCPA requirements.',
  keywords:
    'hipaa cookie consent, healthcare website compliance, medical privacy cookies, telemedicine gdpr, patient portal consent, hipaa cookie banner',
  alternates: {
    canonical: '/solutions/healthcare',
  },
  openGraph: {
    title: 'Healthcare Cookie Consent | HIPAA & GDPR Compliance',
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
