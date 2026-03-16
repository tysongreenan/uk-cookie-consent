import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brizy Cookie Consent | Cookie Banner for Brizy',
  description:
    'Add a GDPR-compliant cookie banner to your Brizy WordPress site. Three install methods: HTML widget, functions.php, or header plugin. Under 10 KB, 3-minute setup.',
  keywords: [
    'brizy cookie consent',
    'brizy wordpress cookie banner',
    'cookie banner brizy builder',
    'brizy gdpr cookie banner',
    'brizy html widget cookie consent',
  ],
  openGraph: {
    title: 'Brizy Cookie Consent | Cookie Banner for Brizy',
    description:
      'Add a GDPR-compliant cookie banner to your Brizy WordPress site. Three install methods, under 10 KB, 3-minute setup.',
    type: 'article',
    url: 'https://www.cookie-banner.ca/integrations/brizy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brizy Cookie Consent | Cookie Banner for Brizy',
    description:
      'Add a GDPR-compliant cookie banner to your Brizy WordPress site. Three install methods, under 10 KB.',
  },
  alternates: {
    canonical: '/integrations/brizy',
  },
}

export default function BrizyIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
