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
        // /auth/signup-privacy got indexed while blocked, leaving a
        // snippet-less zombie result. Crawling is re-allowed for that one
        // path so crawlers can see its noindex tag and drop it; the longest
        // matching rule wins, so this beats the /auth/ disallow below.
        allow: ['/', '/auth/signup-privacy'],
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
          // Block upgrade flow (no SEO value). No trailing slash so
          // /upgrade and /upgrade?billing=one_time are both covered.
          '/upgrade',
          // Location pages and free-cookie-banner are now
          // allowed for all crawlers (valuable SEO content)
        ],
      },
      // Googlebot-specific rules (more permissive for better indexing)
      {
        userAgent: 'Googlebot',
        allow: ['/', '/auth/signup-privacy'],
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/test-analytics/',
          '/demo/',
          '/builder/',
          '/invite/',
          '/upgrade',
        ],
      },
      // AI search crawlers — allow access for citation and search features
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'Applebot',
        ],
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/auth/',
          '/builder/',
          '/invite/',
          '/upgrade',
        ],
      },
      // Block AI training-only crawlers (no search benefit)
      {
        userAgent: [
          'CCBot',
          'cohere-ai',
          'Bytespider',
        ],
        disallow: '/',
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

