# SEO & AEO Checklist

A reusable checklist based on what cookie-banner.ca has implemented. Use this as a blueprint for any SaaS or content-driven website.

---

## 1. Structured Data / Schema Markup

- [ ] **FAQPage schema** on every page with Q&A content (compliance pages, feature pages, tool pages)
- [ ] **BlogPosting schema** on every blog post (headline, author, datePublished, dateModified, image, publisher)
- [ ] **Article schema** on long-form feature/guide pages
- [ ] **BreadcrumbList schema** on blog posts, feature pages, and nested pages (Home > Section > Page)
- [ ] **SoftwareApplication schema** on homepage/product page (name, features, pricing, platform, audience)
- [ ] **Organization schema** with contact info, logo, founding date, address
- [ ] **WebSite schema** with site name, URL, publisher, languages
- [ ] **Microdata attributes** (`itemScope`, `itemProp`) on key product description sections
- [ ] Reusable `<StructuredData>` component that accepts type + data props
- [ ] Separate **AEO-specific structured data component** for AI search engines

---

## 2. Meta Tags & Metadata

- [ ] Unique `<title>` on every page (under 60 chars, keyword-front-loaded)
- [ ] Unique `<meta description>` on every page (150-160 chars, action-oriented)
- [ ] **Keywords array** in metadata (target 15-20 terms per page)
- [ ] **Canonical URL** on every page to prevent duplicate content
- [ ] **Open Graph tags**: title, description, type, locale, image
- [ ] **Twitter Card**: `summary_large_image` with title, description, image
- [ ] **Dynamic OG image generation** (1200x630px) for social sharing
- [ ] **Robots meta**: `index: true, follow: true` with googleBot-specific overrides
- [ ] `max-image-preview: large` and `max-snippet: -1` for rich results
- [ ] **Google Search Console verification** meta tag
- [ ] `generateMetadata()` for dynamic pages (blog posts, generated pages)

---

## 3. Content Strategy & Topic Clusters

- [ ] **Blog system** with markdown/MDX content and YAML frontmatter
- [ ] **Topic clusters** around core themes (e.g., 5 posts on Canadian privacy, 4 on global laws, 3 on integrations)
- [ ] **Tag system** with client-side filtering on blog listing page
- [ ] **Related posts component** using tag-overlap scoring for relevance
- [ ] **Landing pages per keyword intent**: free tool pages, comparison pages, compliance pages, integration pages
- [ ] **Location pages** (by country/region) acting as geographic content hubs
- [ ] **Solution pages** (by industry) acting as vertical content hubs
- [ ] **Compliance pages** acting as legal/regulatory content hubs
- [ ] Blog posts **cross-link to landing pages** and vice versa
- [ ] Each blog post targets a **specific keyword cluster** with 5-8 related terms

---

## 4. FAQ & Answer Engine Optimization (AEO)

- [ ] **FAQ accordion component** (Radix UI or similar) with 10-15 questions per section
- [ ] **FAQPage schema** auto-generated from FAQ component data
- [ ] **Direct answer blocks** at the top of guide/feature pages (2-3 sentence summary)
- [ ] **How-to structured content** with numbered steps, time estimates, and code snippets
- [ ] **Comparison tables** vs competitors (filterable by category: performance, cost, compliance)
- [ ] **Feature matrices** showing capabilities at a glance
- [ ] **`llms.txt` file** in `/public/` for AI crawler optimization (product overview, features, pricing, citation format)
- [ ] **Plain language** throughout -- no jargon, optimized for AI extraction
- [ ] **Passage-level structuring** with semantic HTML (`<section>`, `<article>`, `<header>`)
- [ ] FAQs distributed across **multiple page types** (homepage, tools, integrations, compliance)
- [ ] **AEO implementation documentation** for team reference

---

## 5. Blog Infrastructure

- [ ] **Auto-generated Table of Contents** from H1/H2/H3 headings (desktop sidebar + mobile drawer)
- [ ] **Active heading highlighting** with IntersectionObserver
- [ ] **Click-to-copy heading URLs** for deep linking
- [ ] **Reading progress bar** (fixed top-of-page)
- [ ] **Hash scroll handler** for direct anchor links
- [ ] **Reading time estimate** on each post
- [ ] **Author card** with name, position, avatar
- [ ] **Blog CTA component** linking to product/pricing
- [ ] **Email signup component** for newsletter capture
- [ ] **Key takeaways box** (BlogRecap) for scannable summaries
- [ ] **Copy-to-clipboard** button for full article text
- [ ] **Tag filter** with counts (desktop: button group, mobile: dropdown)
- [ ] **3-column responsive grid** for blog listing (3 > 2 > 1 columns)

---

## 6. Sitemap Strategy

- [ ] **Dynamic sitemap generation** (`sitemap.ts` with `MetadataRoute.Sitemap`)
- [ ] **Priority tiering**:
  - 1.0: Homepage
  - 0.9: High-conversion pages (pricing, compliance, features)
  - 0.8: Supporting pages (blog index, tools, about, docs)
  - 0.7: Integration pages, location pages
  - 0.6: Solution/vertical pages
  - 0.5: Legal pages (privacy, terms)
- [ ] **Change frequency** set appropriately (weekly for blog, monthly for static)
- [ ] **Blog posts included dynamically** from content directory
- [ ] **`lastModified` dates** set per page (not all the same)

---

## 7. Robots.txt & Crawler Management

- [ ] **Block internal routes** from crawling: `/dashboard`, `/api`, `/auth`, `/test`
- [ ] **Allow AI crawlers selectively**: GPTBot, ClaudeBot, PerplexityBot, Applebot, OAI-SearchBot
- [ ] **Block training-only crawlers**: CCBot, cohere-ai, Bytespider
- [ ] **Block SEO tool bots**: AhrefsBot, SemrushBot, DotBot, MJ12bot
- [ ] **Sitemap reference** in robots.txt
- [ ] **More permissive Googlebot rules** (separate user-agent block)

---

## 8. Technical SEO & Performance

- [ ] **Next.js Image component** with AVIF/WebP, lazy loading, explicit dimensions
- [ ] **Font optimization**: `display: swap`, local fonts where possible, DNS prefetch for Google Fonts
- [ ] **Script loading strategy**:
  - Consent Mode script FIRST (before any trackers)
  - Analytics scripts deferred/async
  - GTM loaded on `load` event with delay
- [ ] **DNS prefetch + preconnect** for external domains (Google Fonts, GA, GTM)
- [ ] **ETag-based caching** for API responses (not in-memory cache on serverless)
- [ ] **CLS prevention**: skeleton placeholders, fixed-height containers, explicit image dimensions
- [ ] **Security headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS, CSP, Permissions-Policy
- [ ] **Bot detection in middleware** to serve consistent content to crawlers (no A/B test variance)

---

## 9. Google Consent Mode V2

- [ ] **Default deny** for all consent types: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`
- [ ] **Wait for consent update** (500ms timeout)
- [ ] **GTM noscript fallback** in body
- [ ] **Self-hosted cookie banner** script (async loaded)
- [ ] Consent state updates before any tracking fires

---

## 10. Conversion & Trust Signals

- [ ] **Logo marquee** showing customer/partner logos
- [ ] **Social proof badge** ("Used by X+ websites")
- [ ] **Interactive product demo** on homepage
- [ ] **Email capture** in hero section and final CTA
- [ ] **Blog CTAs** linking to product builder and pricing
- [ ] **"Free, no credit card required"** messaging
- [ ] **Live banner preview** for product demonstration

---

## 11. URL Structure & Internal Linking

- [ ] **Clean, keyword-rich URLs**: `/blog/gdpr-cookie-consent-requirements`, `/integrations/wordpress`
- [ ] **Logical hierarchy**: `/compliance/gdpr`, `/solutions/healthcare`, `/locations/canada`
- [ ] **Product description component** with 12+ contextual internal links
- [ ] **Related posts** at bottom of every blog post (tag-overlap scoring)
- [ ] **Cross-linking** between blog, landing pages, compliance pages, and integration pages
- [ ] **Breadcrumb navigation** (UI + schema) on nested pages

---

## 12. Multi-Market & Compliance Pages

- [ ] **Dedicated pages per privacy law**: GDPR, PIPEDA, CCPA, Law 25, CASL
- [ ] **Location-specific landing pages**: Canada, EU, US, UK
- [ ] **Industry solution pages**: ecommerce, SaaS, healthcare, finance, education
- [ ] **Competitor comparison pages**: "X alternative" format
- [ ] **Free tool pages** targeting high-intent keywords (cookie scanner, policy generator, banner generator)
- [ ] **Bilingual metadata** declared in schemas (en/fr)

---

## 13. Analytics & Measurement

- [ ] **Google Analytics 4** with consent-gated loading
- [ ] **Google Tag Manager** with Consent Mode v2 integration
- [ ] **Rate limiting** on API endpoints (100 req/min per IP)
- [ ] **Audit trail logging** for security events
- [ ] **UUID validation** on all resource identifiers

---

## Quick Wins Still Missing (Honest Gaps)

- [ ] RSS feed (declared in metadata but not implemented)
- [ ] Named individual authors (currently team-only -- hurts E-E-A-T)
- [ ] Content hub / pillar pages linking all posts in a cluster
- [ ] Hreflang tags for bilingual content
- [ ] IndexNow for instant indexing on publish
- [ ] Inline source citations in blog posts (for AI citation)
- [ ] Video content / YouTube presence
- [ ] Newsletter backend integration

---

*Generated from cookie-banner.ca codebase analysis -- March 2026*
