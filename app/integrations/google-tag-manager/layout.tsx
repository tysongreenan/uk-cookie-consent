import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GTM Cookie Consent: Consent Mode V2 Setup Guide (2026)',
  description: 'Set up Google Tag Manager cookie consent with Consent Mode V2 in under 5 minutes. Control tag firing, manage dataLayer consent events, and stay GDPR compliant. $99 one-time.',
  keywords: 'google tag manager cookie consent, gtm consent mode v2, cookie banner google tag manager, gtm cookie consent setup, gtm gdpr, consent mode v2 implementation',
  openGraph: {
    title: 'GTM Cookie Consent: Consent Mode V2 Setup Guide (2026)',
    description: 'Set up Google Tag Manager cookie consent with Consent Mode V2 in under 5 minutes. Control tag firing and stay GDPR compliant.',
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
