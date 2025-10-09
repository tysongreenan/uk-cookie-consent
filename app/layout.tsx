import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cookie Banner Generator Canada | GDPR & PIPEDA Compliant',
  description: 'Create unlimited cookie banners custom-branded to your site. Fully compliant with GDPR & PIPEDA. First 1,000 accounts free — no card needed.',
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
      <body className={inter.className}>
        <Providers>
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
