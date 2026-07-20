import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation — Cookie Banner Generator',
  description: 'Learn how to integrate and customize your cookie consent banner. Step-by-step guide for GDPR & PIPEDA compliance.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Documentation — Cookie Banner Generator',
    description: 'Learn how to integrate and customize your cookie consent banner. Step-by-step guide for GDPR & PIPEDA compliance.',
    type: 'website',
    url: '/docs',
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
