import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Payment confirmed',
  description: 'Your Cookie Banner Pro purchase is confirmed.',
  robots: { index: false, follow: false },
}

export default function UpgradeSuccessLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
