import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Consent by Industry | Solutions for Every Business',
  description:
    'Industry-specific cookie consent solutions for e-commerce, healthcare, SaaS, finance, and education. Pre-configured compliance for your sector.',
  keywords:
    'cookie consent solutions, industry cookie compliance, cookie banner by industry, sector cookie consent, business cookie compliance',
  openGraph: {
    title: 'Cookie Consent by Industry | Solutions for Every Business',
    description:
      'Industry-specific cookie consent solutions for e-commerce, healthcare, SaaS, finance, and education. Pre-configured compliance for your sector.',
    type: 'website',
  },
  alternates: {
    canonical: '/solutions',
  },
}

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
