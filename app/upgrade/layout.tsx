import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Upgrade to Cookie Banner Pro',
  description:
    'Upgrade to Cookie Banner Pro for unlimited banners, analytics, and hosted privacy policies.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/upgrade',
  },
}

export default function UpgradeLayout({ children }: { children: ReactNode }) {
  return children
}
