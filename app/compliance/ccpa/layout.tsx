import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CCPA Cookie Consent: 2026 California Compliance Guide',
  description:
    'Does CCPA require a cookie banner? Learn California cookie consent rules, Do Not Sell requirements, and opt-out obligations. Free compliance checklist included.',
  keywords:
    'ccpa cookie consent, ccpa cookie compliance, ccpa cookies, ccpa cookie requirements, ccpa cookie banner, ccpa cookie banner requirements, california cookie law, ccpa vs cpra, ccpa cookie, do i need a cookie banner for ccpa',
  openGraph: {
    title: 'CCPA Cookie Consent: 2026 California Compliance Guide',
    description:
      'Does CCPA require a cookie banner? Learn California cookie consent rules, Do Not Sell requirements, and opt-out obligations.',
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
