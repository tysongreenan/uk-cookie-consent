import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopify Cookie Banner — No App, $99 One-Time (2026)',
  description:
    'Add a cookie banner to Shopify without an app. One script tag in theme.liquid, under 10KB, no monthly fees — just $99 one-time. Faster & cheaper than Cookiebot.',
  keywords: [
    'shopify cookie banner',
    'shopify cookie consent',
    'cookiebot shopify',
    'cookiebot shopify integration',
    'shopify gdpr compliance',
    'do i need a cookie banner on shopify',
    'shopify cookie consent app alternative',
    'shopify cookie policy',
    'shopify privacy compliance',
    'shopify cookie banner no app',
    'shopify cookie banner alternative',
  ],
  alternates: {
    canonical: '/integrations/shopify',
  },
  openGraph: {
    title: 'Shopify Cookie Banner — No App, $99 One-Time (2026)',
    description:
      'Add a cookie banner to Shopify without an app. One script tag in theme.liquid, under 10KB, $99 one-time. Faster than Cookiebot.',
    type: 'article',
    url: '/integrations/shopify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Cookie Banner — No App, $99 One-Time (2026)',
    description:
      'Add a cookie banner to Shopify without an app. One script tag in theme.liquid, under 10KB. No monthly fees.',
  },
}

export default function ShopifyIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
