import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Is Cookie Consent Required in Canada? Free PIPEDA Checklist 2026',
  description:
    'Yes, cookie consent is required in Canada under PIPEDA and Law 25. Free 2026 compliance checklist: what cookies need consent, how to avoid fines, and a ready-to-use banner.',
  keywords:
    'pipeda cookie consent, cookie consent canada, is cookie consent required in canada, canada cookie banner, pipeda cookie requirements, canadian privacy law cookies, cookie policy canada, pipeda compliance, law 25 cookie banner',
  openGraph: {
    title: 'Is Cookie Consent Required in Canada? Free PIPEDA Checklist 2026',
    description:
      'Yes, cookie consent is required in Canada. Free 2026 PIPEDA compliance checklist with cookie consent rules, Law 25 requirements, and a ready-to-use banner.',
    type: 'article',
    url: 'https://www.cookie-banner.ca/compliance/pipeda',
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
