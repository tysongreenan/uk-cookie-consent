import { withSentryConfig } from '@sentry/nextjs'

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'cdn.cookieconsentbuilder.com', 'vercel.app', 'startup-template-sage.vercel.app'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-build',
  },
  // Playwright + @sparticuz/chromium are dynamically imported by the
  // headless scanner and must not be bundled by webpack — they reference
  // optional native deps (chromium-bidi, etc.) and ship their own native
  // assets in node_modules that webpack can't safely move. Mark them
  // external so they're require()'d at runtime from node_modules.
  experimental: {
    serverComponentsExternalPackages: ['playwright-core', 'playwright', '@sparticuz/chromium'],
    // Marking @sparticuz/chromium external stops webpack bundling it, but it
    // also stops Vercel's file tracer from copying the package's bin/ assets
    // (the brotli-compressed chromium binary AND its shared libraries —
    // libnss3.so, etc.) into the serverless function. Without the libs the
    // browser launches and immediately dies with "error while loading shared
    // libraries: libnss3.so". Force the whole package into the route bundle.
    outputFileTracingIncludes: {
      '/api/tools/cookie-scanner': ['./node_modules/@sparticuz/chromium/**'],
      '/api/md/blog/[slug]': ['./content/blog/**'],
      '/api/md/page/[slug]': ['./content/pages/**'],
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (!Array.isArray(config.externals)) {
        config.externals = config.externals ? [config.externals] : []
      }
      config.externals.push(({ request }, callback) => {
        if (/^(playwright-core|playwright|@sparticuz\/chromium)/.test(request)) {
          return callback(null, 'commonjs ' + request)
        }
        callback()
      })
    }
    return config
  },
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // 301 redirects for renamed content (preserve SEO equity)
  async redirects() {
    return [
      {
        // Permanent redirect so Google consolidates ranking signals on 2026.
        // Absolute destination avoids any host/relative ambiguity.
        source: '/blog/cookie-consent-canada-guide-2025',
        destination: 'https://www.cookie-banner.ca/blog/cookie-consent-canada-guide-2026',
        permanent: true,
      },
      {
        // Trailing slash / hash-free variants still hit the redirect matcher via source
        source: '/blog/cookie-consent-canada-guide-2025/',
        destination: 'https://www.cookie-banner.ca/blog/cookie-consent-canada-guide-2026',
        permanent: true,
      },
      {
        source: '/blog/gtm-setup',
        destination: '/blog/google-tag-manager-cookie-consent-guide',
        permanent: true,
      },
      {
        source: '/blog/cpra-cookie-requirements-guide',
        destination: '/blog/ccpa-cpra-cookie-compliance-guide',
        permanent: true,
      },
      {
        source: '/blog/cookie-consent-canada-guide-2025.md',
        destination: 'https://www.cookie-banner.ca/blog/cookie-consent-canada-guide-2026.md',
        permanent: true,
      },
      {
        source: '/blog/gtm-setup.md',
        destination: '/blog/google-tag-manager-cookie-consent-guide.md',
        permanent: true,
      },
      {
        source: '/blog/cpra-cookie-requirements-guide.md',
        destination: '/blog/ccpa-cpra-cookie-compliance-guide.md',
        permanent: true,
      },
      // Homepage A/B ended — always use canonical home
      {
        source: '/v2',
        destination: '/',
        permanent: true,
      },
      // GSC-reported 404s from old/incorrect paths that never had pages.
      // /fr never existed (bilingual banners live on one URL); send home.
      {
        source: '/fr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy',
        permanent: true,
      },
      // Quebec Law 25 content lives on the Law 25 landing page.
      {
        source: '/compliance/canada',
        destination: '/law-25-cookie-banner',
        permanent: true,
      },
      // Legacy hosted policy short URLs (pre URL-shape change):
      // /p/orinha-media-5ac8d3c8 → /p/orinha-media-5ac8d3c8/privacy-policy
      // French policies are corrected to …/politique-de-confidentialite by the doc page.
      {
        source: '/p/:slug',
        destination: '/p/:slug/privacy-policy',
        permanent: true,
      },
    ]
  },

  // Security headers
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production'
    
    return [
      {
        source: '/blog/:slug',
        headers: [{ key: 'Vary', value: 'Accept' }],
      },
      {
        source: '/docs',
        headers: [{ key: 'Vary', value: 'Accept' }],
      },
      {
        source: '/tools/:path*',
        headers: [{ key: 'Vary', value: 'Accept' }],
      },
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
          // Only apply CSP in production to avoid blocking dev server stylesheets
          ...(isProduction ? [{
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.cookie-banner.ca https://www.googletagmanager.com https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://www.cookie-banner.ca https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://us.i.posthog.com https://us-assets.i.posthog.com https://*.ingest.sentry.io https://*.ingest.us.sentry.io; worker-src 'self' blob:; child-src 'self' blob:; frame-ancestors 'none';",
          }] : []),
        ],
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  org: 'cookie-banner',
  project: 'javascript-nextjs',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  // No tunnelRoute: browser events go directly to sentry.io (allowed via CSP
  // connect-src). A tunnel would proxy every Sentry event through our own
  // Vercel functions, adding billed invocations and data transfer.
  silent: !process.env.CI,
})
