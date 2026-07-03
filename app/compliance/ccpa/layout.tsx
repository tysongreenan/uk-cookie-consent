import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'California CCPA Cookie Compliance & Do Not Sell Guide (2026)',
  description:
    'CCPA cookie compliance guide: Do Not Sell link, GPC signals, CPRA opt-out rules, and fines up to $7,500. Free banner with one-snippet setup.',
  keywords:
    'ccpa cookie compliance, ccpa cookies, ccpa cookie consent, ccpa cookie requirements, ccpa cookie banner, california cookie law, ccpa vs gdpr, ccpa cookie banner requirements, ccpa vs cpra, do i need a cookie banner for ccpa, ccpa opt out cookies, ccpa cookie policy, global privacy control ccpa, california cookie compliance, do not sell ccpa, ccpa do not sell link',
  openGraph: {
    title: 'California CCPA Cookie Compliance & Do Not Sell Guide (2026)',
    description:
      'CCPA cookie compliance guide: Do Not Sell link, GPC signals, CPRA opt-out rules, enforcement fines, and step-by-step implementation.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/compliance/ccpa',
  },
}

export default function CCPALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
