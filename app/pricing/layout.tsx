import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Free Plan + $99 One-Time Pro',
  description: 'Cookie-Banner.ca pricing: Free plan forever or $99 one-time Pro. No monthly fees. Compare with Cookiebot ($108-$2,388/yr) and CookieYes ($120+/yr).',
  keywords: 'cookie banner pricing, cookie consent pricing, cookiebot pricing, free cookie banner, cookie banner cost, cookie consent cost, cheap cookie banner',
  openGraph: {
    title: 'Pricing — Free Plan + $99 One-Time Pro',
    description: 'Free plan forever or $99 one-time Pro. No monthly fees. Compare with Cookiebot and CookieYes.',
    type: 'website',
  },
  alternates: {
    canonical: '/pricing',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
