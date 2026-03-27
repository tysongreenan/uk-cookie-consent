import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CCPA Cookie Compliance: Complete Requirements Guide (2026)',
  description:
    'Complete guide to CCPA cookie compliance. Learn California cookie consent requirements, Do Not Sell opt-out rules, GPC signals, CPRA amendments, enforcement fines, and step-by-step implementation. CCPA vs GDPR vs PIPEDA compared.',
  keywords:
    'ccpa cookie compliance, ccpa cookies, ccpa cookie consent, ccpa cookie requirements, ccpa cookie banner, california cookie law, ccpa vs gdpr, ccpa cookie banner requirements, ccpa vs cpra, do i need a cookie banner for ccpa, ccpa opt out cookies, ccpa cookie policy, global privacy control ccpa',
  openGraph: {
    title: 'CCPA Cookie Compliance: Complete Requirements Guide (2026)',
    description:
      'Complete guide to CCPA cookie compliance: opt-out requirements, GPC signals, CPRA amendments, enforcement examples, and step-by-step implementation.',
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
