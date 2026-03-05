import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation - Cookie Banner Generator',
  description: 'Learn how to integrate and customize your cookie consent banner. Step-by-step guide for GDPR & PIPEDA compliance.',
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
