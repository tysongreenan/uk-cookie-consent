import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog/blog'

/**
 * Optimized sitemap.xml for Google crawl budget
 * 
 * Strategy:
 * - Prioritize high-value pages (homepage, features, compliance, pricing)
 * - Set realistic changeFrequency based on content update patterns
 * - Use actual lastModified dates where possible
 * - Exclude low-value pages (auth, dashboard, test pages)
 * - Group by priority for better crawl budget allocation
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'
  // Use a fixed date for static pages so crawlers don't re-crawl unchanged content.
  // Update this date when you actually modify these pages.
  const staticDate = new Date('2026-03-27')
  const now = new Date()

  // Priority 1.0 - Homepage (most important)
  const homepage: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Priority 0.9 - High-value conversion pages
  const highPriorityPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/pricing`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/integrations`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/will-this-keep-me-compliant`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/privacy-laws`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/how-it-works`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features/what-you-get`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compliance/gdpr`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compliance/pipeda`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compliance/ccpa`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  // Priority 0.8 - Important supporting pages
  const importantPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/cookie-scanner`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/cookiebot-alternative`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/onetrust-alternative`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/cookieyes-alternative`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/termly-alternative`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/webflow-cookie-consent-free`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ccpa-cookie-banner`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/law-25-cookie-banner`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-cookie-banner-generator`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cookie-banner-text-generator`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cookie-policy-template`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-cookie-banner`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Priority 0.7 - Integration pages (important but lower priority)
  const integrationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/integrations/wordpress`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/shopify`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/webflow`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/google-tag-manager`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/squarespace`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/wix`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/react`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/integrations/brizy`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Priority 0.6 - Solution pages
  const solutionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/solutions/ecommerce`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/solutions/saas`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/solutions/healthcare`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/solutions/finance`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/solutions/education`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Priority 0.7 - Location pages
  const locationPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/locations/canada`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations/eu`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations/us`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations/uk`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Priority 0.5 - Legal/Supporting pages
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Blog posts (Priority 0.7 - content marketing)
  let blogPosts: MetadataRoute.Sitemap = []
  try {
    const posts = getAllPosts()
    blogPosts = posts
      .filter((post) => {
        // Only include posts with valid dates
        if (!post.date) return false
        const postDate = new Date(post.date)
        return !isNaN(postDate.getTime())
      })
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date!),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch (error) {
    // If blog posts can't be loaded, continue without them
    console.warn('Could not load blog posts for sitemap:', error)
  }

  // Combine all pages in priority order
  return [
    ...homepage,
    ...highPriorityPages,
    ...importantPages,
    ...integrationPages,
    ...solutionPages,
    ...locationPages,
    ...blogPosts,
    ...legalPages,
  ]
}

