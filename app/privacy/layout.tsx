import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Cookie-Banner.ca',
  description: 'How Cookie-Banner.ca collects, uses, and protects your data. Our privacy practices for the cookie consent banner generator.',
  openGraph: {
    title: 'Privacy Policy — Cookie-Banner.ca',
    description: 'How we collect, use, and protect your data.',
    type: 'website',
  },
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
