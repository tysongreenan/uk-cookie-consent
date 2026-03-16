import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Tag Manager Cookie Consent | Consent Mode v2 Integration 2026',
  description: 'Complete GTM cookie consent integration guide. Implement Consent Mode v2, manage tag firing rules, and ensure GDPR compliance with Google Tag Manager.',
  keywords: 'gtm cookie consent, google tag manager gdpr, consent mode v2, gtm consent management',
  openGraph: {
    title: 'Google Tag Manager Cookie Consent | Consent Mode v2 Integration 2026',
    description: 'Complete GTM cookie consent integration guide. Implement Consent Mode v2, manage tag firing rules, and ensure GDPR compliance with Google Tag Manager.',
    type: 'article',
  },
  alternates: {
    canonical: '/integrations/google-tag-manager',
  },
}

export default function GTMIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
