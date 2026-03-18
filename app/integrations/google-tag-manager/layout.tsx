import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Tag Manager Cookie Consent: Free Setup',
  description: 'Set up GTM cookie consent with Consent Mode v2 in under 5 minutes. Control tag firing, manage consent events, and stay GDPR compliant. Free plan available.',
  keywords: 'google tag manager cookie consent, gtm cookie consent, cookie banner google tag manager, gtm consent mode v2, google tag manager cookies, google tag manager gdpr, gtm set cookie, consent manager google tag manager, gtm cookies, cookie consent gtm tutorial',
  openGraph: {
    title: 'Google Tag Manager Cookie Consent: Free Setup',
    description: 'Set up GTM cookie consent with Consent Mode v2 in under 5 minutes. Control tag firing and stay GDPR compliant.',
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
