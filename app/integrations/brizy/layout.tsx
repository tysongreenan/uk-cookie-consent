import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brizy Cookie Consent Integration | WordPress Page Builder Guide 2026',
  description:
    'Add a GDPR, PIPEDA, and CCPA compliant cookie banner to your Brizy-powered WordPress site. Step-by-step guide with code examples for functions.php, header plugins, and the Brizy HTML widget.',
  keywords:
    'brizy cookie consent, brizy cookie banner, brizy gdpr, brizy wordpress cookie compliance, brizy html widget cookie banner',
  openGraph: {
    title: 'Brizy Cookie Consent Integration | WordPress Page Builder Guide 2026',
    description:
      'Add a GDPR, PIPEDA, and CCPA compliant cookie banner to your Brizy-powered WordPress site. Step-by-step guide with code examples.',
    type: 'article',
  },
}

export default function BrizyIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
