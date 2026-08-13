import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - Cookie Banner Generator',
  description: 'Learn how to integrate and customize your cookie consent banner. Step-by-step guide for GDPR & PIPEDA compliance.',
  alternates: {
    canonical: 'https://www.cookie-banner.ca/docs',
    types: {
      'text/markdown': 'https://www.cookie-banner.ca/docs.md',
    },
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
