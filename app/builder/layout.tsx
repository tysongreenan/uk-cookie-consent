import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Banner Builder — Free, No Code (2026)',
  description: 'Build a custom cookie consent banner for free. GDPR, CCPA & PIPEDA compliant. Preview live, customize colors and text, then copy-paste to your site in 2 minutes.',
  keywords: 'cookie banner generator, cookie banner builder, cookie consent banner generator, free cookie banner generator, cookie banner generator free, cookie consent banner generator free, custom cookie banner',
  openGraph: {
    title: 'Cookie Banner Builder — Free, No Code',
    description: 'Build a custom cookie consent banner for free. GDPR, CCPA & PIPEDA compliant. Preview live, then copy-paste to your site.',
    type: 'website',
  },
  alternates: {
    canonical: '/builder',
  },
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
