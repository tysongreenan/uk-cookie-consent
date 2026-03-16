import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopify Cookie Banner | No App, 5-Min Setup',
  description:
    'Add a GDPR-compliant cookie banner to Shopify without installing an app. One script tag in theme.liquid. Under 10KB, $99 one-time. No monthly fees.',
  keywords: [
    'shopify cookie banner',
    'shopify cookie consent',
    'shopify gdpr compliance',
    'do i need a cookie banner on shopify',
    'shopify cookie consent app alternative',
    'shopify cookie policy',
    'shopify privacy compliance',
  ],
  alternates: {
    canonical: '/integrations/shopify',
  },
  openGraph: {
    title: 'Shopify Cookie Banner | No App, 5-Min Setup',
    description:
      'Add a GDPR-compliant cookie banner to Shopify without installing an app. One script tag in theme.liquid. Under 10KB, $99 one-time.',
    type: 'article',
    url: '/integrations/shopify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Cookie Banner | No App, 5-Min Setup',
    description:
      'Add a GDPR-compliant cookie banner to Shopify without installing an app. One script tag in theme.liquid. Under 10KB, $99 one-time.',
  },
}

export default function ShopifyIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
