import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free WordPress Cookie Banner (No Plugin Needed)',
  description:
    'Add a GDPR-compliant cookie banner to WordPress without a plugin. One script tag, under 10KB, works with every theme. Free plan available. Set up in 2 minutes.',
  keywords: [
    'cookie banner wordpress',
    'wordpress cookie banner',
    'wordpress cookie consent',
    'wordpress cookie banner plugin',
    'wordpress cookie banner free',
    'wordpress cookiebanner',
    'how to add cookie banner to wordpress',
    'wordpress cookie compliance',
    'wordpress gdpr cookie banner',
    'cookie banner integration with wordpress',
    'cookiebot alternative wordpress',
  ],
  openGraph: {
    title: 'Free WordPress Cookie Banner (No Plugin Needed)',
    description:
      'Add a GDPR-compliant cookie banner to WordPress without a plugin. One script tag, under 10KB, works with every theme.',
    type: 'article',
    url: 'https://www.cookie-banner.ca/integrations/wordpress',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Cookie Banner Without a Plugin',
    description:
      'Add a GDPR-compliant cookie banner to WordPress without installing a plugin. One script tag, under 10 KB.',
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
