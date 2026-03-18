import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PIPEDA Cookie Consent — Canada Compliance (2026)',
  description:
    'What does PIPEDA require for cookies? Learn Canadian cookie consent rules, meaningful consent standards, Quebec Law 25, and get a free compliance checklist.',
  keywords:
    'pipeda cookie consent, canada cookie banner, pipeda cookie requirements, canadian privacy law cookies, cookie consent canada, pipeda compliance, is cookie consent required in canada, law 25 cookie banner',
  openGraph: {
    title: 'PIPEDA Cookie Consent — Canada Compliance Guide',
    description:
      'What does PIPEDA require for cookies? Canadian cookie consent rules, meaningful consent standards, Quebec Law 25.',
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
