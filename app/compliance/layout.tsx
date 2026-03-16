import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Compliance Guide | Which Privacy Law Applies?',
  description:
    'Compare GDPR, CCPA, and PIPEDA cookie consent requirements side by side. Find out which privacy law applies to your website and what you need to do.',
  keywords:
    'cookie compliance, privacy law cookie requirements, which privacy law applies to me, gdpr vs ccpa vs pipeda, cookie consent requirements',
  openGraph: {
    title: 'Cookie Compliance Guide | Which Privacy Law Applies?',
    description:
      'Compare GDPR, CCPA, and PIPEDA cookie consent requirements side by side. Find out which privacy law applies to your website and what you need to do.',
    type: 'website',
  },
  alternates: {
    canonical: '/compliance',
  },
}

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
