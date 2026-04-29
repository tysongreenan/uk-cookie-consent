import type { Metadata } from 'next'
import Script from 'next/script'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { UpdateAnnouncement } from '@/components/landing/update-announcement'
import { AnnouncementProvider } from '@/lib/announcement-context'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: {
    default: 'Free Cookie Banner Generator for Canada — PIPEDA & Law 25 Compliant (2026)',
    template: '%s'
  },
  description: 'Create a free cookie consent banner in 5 minutes. PIPEDA, Law 25, GDPR & CCPA compliant. Works on WordPress, Shopify, Webflow & any site. No code needed.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'cookie banner generator',
    'cookie banner generator free',
    'free cookie banner generator',
    'cookie banner',
    'cookie consent banner',
    'cookie banner for website',
    'cookie consent banner generator',
    'law 25 cookie banner',
    'GDPR cookie banner',
    'PIPEDA cookie banner',
    'CCPA cookie banner',
    'cookie banner Canada',
    'cookie consent generator',
    'free cookie consent banner',
    'free cookie banner',
    'cookie banners',
    'cookie consent',
  ],
  verification: {
    google: 'A3HHfv-cqaYqh6td64AMTu4v8TT8xuLZmpBQh2zWvBY',
  },
  openGraph: {
    title: 'Free Cookie Banner Generator for Canada — PIPEDA & Law 25 Compliant (2026)',
    description: 'Create a free cookie consent banner in 5 minutes. PIPEDA, Law 25, GDPR & CCPA compliant. Works on any site. No code needed.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cookie Banner Generator for Canada — PIPEDA & Law 25 Compliant (2026)',
    description: 'Create a free cookie consent banner in 5 minutes. GDPR, CCPA, PIPEDA & Law 25 compliant. Used by 1,000+ websites.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for analytics (fonts self-hosted by next/font) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Google Consent Mode v2 — MUST be first, before any trackers or banner script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'analytics_storage':'denied','ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});`,
          }}
        />

        {/* Cookie Consent Banner — must be high in head to block trackers before they fire */}
        <script async src="https://www.cookie-banner.ca/api/v1/banner.js?id=eb2e7ccc-3c74-4ca4-86ca-2bf2cd1fc6b8"></script>
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${bricolage.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LGTBVXZ"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>

        {/* GA & GTM — loaded after hydration to avoid render-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QM1L8P6TT5"
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`gtag('js', new Date()); gtag('config', 'G-QM1L8P6TT5');`}
        </Script>
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;j.onerror=function(){console.warn('GTM failed to load')};f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5LGTBVXZ');`}
        </Script>

        <AnnouncementProvider>
          <Providers>
            <TooltipProvider>
            <UpdateAnnouncement />
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
            </TooltipProvider>
          </Providers>
        </AnnouncementProvider>
      </body>
    </html>
  )
}
