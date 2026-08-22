import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Manager — Cookie Banner Chrome Extension',
  description:
    'Set your cookie preferences once. Privacy Manager handles cookie banners as you browse.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Privacy Manager — Cookie Banner Chrome Extension',
    description: 'Set your cookie preferences once. Privacy Manager handles cookie banners as you browse.',
    type: 'website',
  },
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
