import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIPEDA Cookie Consent | Canada Cookie Banner Guide',
  description:
    'What does PIPEDA require for cookies? Canadian cookie consent rules, meaningful consent standards, Quebec Law 25, and a compliance checklist for your website.',
  keywords:
    'pipeda cookie consent, canada cookie banner, pipeda cookie requirements, canadian privacy law cookies',
  openGraph: {
    title: 'PIPEDA Cookie Consent | Canada Cookie Banner Guide',
    description:
      'What does PIPEDA require for cookies? Canadian cookie consent rules, meaningful consent standards, Quebec Law 25, and a compliance checklist for your website.',
    type: 'article',
  },
  alternates: {
    canonical: '/compliance/pipeda',
  },
}

export default function PIPEDALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
