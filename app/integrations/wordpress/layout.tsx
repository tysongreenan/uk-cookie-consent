import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WordPress Cookie Banner Without a Plugin',
  description:
    'Add a GDPR-compliant cookie banner to WordPress without installing a plugin. One script tag, under 10 KB, works with every theme. Step-by-step guide.',
  keywords: [
    'wordpress cookie banner',
    'wordpress cookie consent without plugin',
    'wordpress gdpr cookie banner',
    'how to add cookie banner to wordpress',
    'wordpress cookie compliance',
    'wordpress gdpr plugin alternative',
  ],
  openGraph: {
    title: 'WordPress Cookie Banner Without a Plugin',
    description:
      'Add a GDPR-compliant cookie banner to WordPress without installing a plugin. One script tag, under 10 KB, works with every theme.',
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
