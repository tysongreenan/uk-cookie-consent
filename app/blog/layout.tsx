import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Consent Blog — GDPR, CCPA & Privacy Guides',
  description: 'Expert guides on cookie consent, GDPR compliance, CCPA requirements, and privacy law. Learn how to make your website compliant with free tutorials and tools.',
  keywords: 'cookie consent blog, gdpr cookie guides, ccpa compliance articles, cookie banner tutorials, privacy law guides',
  openGraph: {
    title: 'Cookie Consent Blog — GDPR, CCPA & Privacy Guides',
    description: 'Expert guides on cookie consent, GDPR compliance, CCPA requirements, and privacy law.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
