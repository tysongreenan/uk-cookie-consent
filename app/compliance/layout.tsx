import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Compliance Frameworks | GDPR, CCPA & PIPEDA Guides',
  description:
    'Explore cookie compliance requirements for every major privacy law. Get compliant with GDPR, CCPA/CPRA, and PIPEDA with our cookie consent platform.',
  keywords:
    'cookie compliance, privacy law compliance, gdpr compliance, ccpa compliance, pipeda compliance, cookie consent requirements, privacy frameworks',
  openGraph: {
    title: 'Cookie Compliance Frameworks | GDPR, CCPA & PIPEDA Guides',
    description:
      'Explore cookie compliance requirements for every major privacy law. Get compliant with GDPR, CCPA/CPRA, and PIPEDA with our cookie consent platform.',
    type: 'website',
  },
}

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
