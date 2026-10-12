import { Metadata } from 'next'

// Intentionally NOT targeting "is cookie consent required in Canada" — that
// query belongs to /blog/cookie-consent-canada-guide-2026 (SEO pillar).
export const metadata: Metadata = {
  title: 'What Does PIPEDA Require for Cookies?',
  description:
    'PIPEDA expects meaningful consent. Non-sensitive analytics can use implied consent with clear notice. Sensitive and marketing cookies need a clearer yes. Law 25 is on the Canada guide.',
  keywords:
    'pipeda cookie banner, pipeda compliance tool, canadian cookie banner software, law 25 cookie banner tool, pipeda consent management',
  openGraph: {
    title: 'What Does PIPEDA Require for Cookies?',
    description:
      'PIPEDA expects meaningful consent. Non-sensitive analytics can use implied consent with clear notice. Sensitive and marketing cookies need a clearer yes.',
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
