import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import { UpdateAnnouncement } from '@/components/landing/update-announcement'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Critical for LCP
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
  description: 'Create unlimited cookie banners custom-branded to your site. Fully compliant with GDPR & PIPEDA. First 1,000 accounts free — no card needed.',
  icons: {
    icon: '/logos/logo.svg',
    shortcut: '/logos/logo.svg',
    apple: '/logos/logo.svg',
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
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Deferred Google Tag Manager - loads after page is interactive */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defer GTM until page is fully loaded
              window.addEventListener('load', function() {
                setTimeout(function() {
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-5LGTBVXZ');
                }, 1000); // 1 second delay after load
              });
            `,
          }}
        />
        
        {/* Deferred Google Analytics - loads after page is interactive */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize dataLayer and consent before GA loads
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent to denied
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
              
              // Defer loading GA script until after page load
              window.addEventListener('load', function() {
                setTimeout(function() {
                  var script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-QM1L8P6TT5';
                  document.head.appendChild(script);
                  
                  script.onload = function() {
                    gtag('js', new Date());
                    gtag('config', 'G-QM1L8P6TT5', {
                      'anonymize_ip': true
                    });
                  };
                }, 1000); // 1 second delay after load
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LGTBVXZ"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
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
      </body>
    </html>
  )
}
