import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Banner Integrations | Add GDPR Compliance to Any Platform',
  description:
    'Integrate a GDPR-compliant cookie banner with WordPress, Shopify, Squarespace, Webflow, Wix, React, and Google Tag Manager. Step-by-step guides for every platform.',
  keywords:
    'cookie banner integrations, gdpr cookie consent integration, cookie banner wordpress, cookie banner shopify, cookie consent platforms, cookie compliance integration',
  alternates: {
    canonical: 'https://www.cookie-banner.ca/integrations',
  },
  openGraph: {
    title: 'Cookie Banner Integrations | Add GDPR Compliance to Any Platform',
    description:
      'Integrate a GDPR-compliant cookie banner with WordPress, Shopify, Squarespace, Webflow, Wix, React, and Google Tag Manager.',
    type: 'website',
  },
}

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
