import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { UpdateAnnouncement } from '@/components/landing/update-announcement'
import { AnnouncementProvider } from '@/lib/announcement-context'

export const metadata: Metadata = {
  title: {
    default: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
    template: '%s | Cookie Banner Generator'
  },
  description: 'Create unlimited cookie banners custom-branded to your site. Fully compliant with GDPR & PIPEDA. First 1,000 accounts free — no card needed.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'cookie banner',
    'cookie consent',
    'GDPR',
    'PIPEDA',
    'CASL',
    'cookie banner Canada',
    'GDPR compliance',
    'PIPEDA compliance',
    'privacy compliance',
    'cookie banner generator',
    'branded cookie banner',
    'custom cookie consent',
  ],
  verification: {
    google: 'A3HHfv-cqaYqh6td64AMTu4v8TT8xuLZmpBQh2zWvBY',
  },
  openGraph: {
    title: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
    description: 'Create unlimited cookie banners custom-branded to your site. Fully compliant with GDPR & PIPEDA. First 1,000 accounts free — no card needed.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
    description: 'Create unlimited cookie banners custom-branded to your site. First 1,000 accounts free.',
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
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        
        {/* Deferred Google Tag Manager - loads after page is interactive */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress GTM/reCAPTCHA errors to prevent "Invalid domain for site key" messages
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.includes('site key') || e.message.includes('recaptcha') || e.message.includes('Invalid domain'))) {
                  e.preventDefault();
                  return true;
                }
              }, true);
              
              // Defer GTM until page is fully loaded
              window.addEventListener('load', function() {
                setTimeout(function() {
                  try {
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    j.onerror = function() { console.warn('GTM failed to load (suppressed)'); };
                    f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-5LGTBVXZ');
                  } catch(e) {
                    console.warn('GTM initialization error (suppressed):', e.message);
                  }
                }, 1000); // 1 second delay after load
              });
            `,
          }}
        />
        
        {/* Google Analytics removed - should be configured per-banner via banner builder */}
        {/* This prevents "Invalid domain for site key" errors when testing banners */}
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LGTBVXZ"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
        <AnnouncementProvider>
          <Providers>
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
          </Providers>
        </AnnouncementProvider>
      </body>
    </html>
  )
}
