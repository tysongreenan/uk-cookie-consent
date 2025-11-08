/** @type {import('next').NextConfig} */
process.env.NEXT_DISABLE_TRACE_BATCHING = '1'
process.env.NEXT_PRIVATE_BUILD_SKIP_TRACE_CLEANUP = '1'

const nextConfig = {
  images: {
    domains: ['localhost', 'cdn.cookieconsentbuilder.com', 'vercel.app'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com; frame-ancestors 'none';",
          },
        ],
      },
    ]
  },
}

export default nextConfig
