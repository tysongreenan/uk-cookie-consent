import { Metadata } from 'next'

// Intentionally NOT targeting "is cookie consent required in Canada" — that
// query belongs to /blog/cookie-consent-canada-guide-2026 (SEO pillar).
export const metadata: Metadata = {
  title: 'PIPEDA Cookie Banner for Canadian Websites | Free & Compliant',
  description:
    'Install a PIPEDA-ready cookie banner for Canadian sites. Opt-in for analytics and ads, Law 25 bilingual support, and simple setup on any platform.',
  keywords:
    'pipeda cookie banner, pipeda compliance tool, canadian cookie banner software, law 25 cookie banner tool, pipeda consent management',
  openGraph: {
    title: 'PIPEDA Cookie Banner for Canadian Websites | Free & Compliant',
    description:
      'Install a PIPEDA-ready cookie banner for Canadian sites. Opt-in consent, Law 25 support, works on any platform.',
    type: 'website',
    url: 'https://www.cookie-banner.ca/compliance/pipeda',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/compliance/pipeda',
  },
}

export default function PIPEDALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
