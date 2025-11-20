import { MetadataRoute } from 'next'

/**
 * Optimized robots.txt for Google crawl budget
 * 
 * Strategy:
 * - Block all dashboard, API, auth, and test pages
 * - Allow only public-facing marketing/content pages
 * - Reference sitemap location
 * - Optimize crawl budget by preventing unnecessary crawls
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Block all dashboard pages (user-specific, no SEO value)
          '/dashboard/',
          // Block all API routes (no HTML content)
          '/api/',
          // Block auth pages (no SEO value, can cause duplicate content)
          '/auth/',
          // Block test/development pages
          '/test-analytics/',
          '/demo/',
          // Block builder page (requires auth, no SEO value)
          '/builder/',
          // Block invite tokens (user-specific, no SEO value)
          '/invite/',
          // Block upgrade flow (no SEO value)
          '/upgrade/',
          // Block location pages (low value, potential duplicate content)
          '/locations/',
          // Block webflow-specific landing page (duplicate of main page)
          '/webflow-cookie-consent-free/',
          // Block free-cookie-banner (duplicate of main page)
          '/free-cookie-banner/',
        ],
      },
      // Googlebot-specific rules (more permissive for better indexing)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/test-analytics/',
          '/demo/',
          '/builder/',
          '/invite/',
          '/upgrade/',
        ],
      },
      // Block bad bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'Baiduspider',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

