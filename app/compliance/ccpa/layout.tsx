import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CCPA Cookie Consent | California Cookie Law Guide',
  description:
    'Does CCPA require a cookie banner? Learn California cookie consent rules, Do Not Sell requirements, opt-out obligations, and how to comply with CCPA/CPRA.',
  keywords:
    'ccpa cookie consent, ccpa cookie banner requirements, do i need a cookie banner for ccpa, california cookie law',
  openGraph: {
    title: 'CCPA Cookie Consent | California Cookie Law Guide',
    description:
      'Does CCPA require a cookie banner? Learn California cookie consent rules, Do Not Sell requirements, opt-out obligations, and how to comply with CCPA/CPRA.',
    type: 'article',
  },
  alternates: {
    canonical: '/compliance/ccpa',
  },
}

export default function CCPALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
