import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free WordPress Cookie Banner — No Plugin, 2-Min Setup (2026)',
  description:
    'Add a free cookie banner to WordPress without a plugin. One script tag in your header, under 10KB, works with every theme. GDPR & CCPA compliant. No monthly fees.',
  keywords: [
    'wordpress cookie banner',
    'cookie banner wordpress',
    'wordpress cookie consent',
    'wordpress cookie banner plugin',
    'wordpress cookie banner free',
    'wordpress cookiebanner',
    'how to add cookie banner to wordpress',
    'wordpress cookie compliance',
    'wordpress gdpr cookie banner',
    'cookie banner integration with wordpress',
    'cookiebot alternative wordpress',
    'wordpress cookie banner no plugin',
  ],
  openGraph: {
    title: 'Free WordPress Cookie Banner — No Plugin, 2-Min Setup (2026)',
    description:
      'Add a free cookie banner to WordPress without a plugin. One script tag, under 10KB, works with every theme. GDPR & CCPA compliant.',
    type: 'article',
    url: 'https://www.cookie-banner.ca/integrations/wordpress',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free WordPress Cookie Banner — No Plugin Needed (2026)',
    description:
      'Add a free cookie banner to WordPress without a plugin. One script tag, under 10KB, works with every theme.',
  },
  alternates: {
    canonical: '/integrations/wordpress',
  },
}

export default function WordPressIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
