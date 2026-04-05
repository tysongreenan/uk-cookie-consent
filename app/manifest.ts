import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cookie Banner Generator',
    short_name: 'Cookie Banner',
    description: 'Free cookie consent banner generator. PIPEDA, Law 25 & GDPR compliant.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0E768C',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
