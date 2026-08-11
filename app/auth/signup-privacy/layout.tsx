import type { Metadata } from 'next'

// This auth page was indexed by Google while robots.txt blocked crawling,
// leaving a snippet-less result in search. robots.ts re-allows crawling of
// this one path so Google can see the noindex below and deindex it.
// (page.tsx is a client component, so the metadata lives in this layout.)
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function SignupPrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
