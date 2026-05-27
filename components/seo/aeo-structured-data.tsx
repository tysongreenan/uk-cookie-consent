interface AEOStructuredDataProps {
  baseUrl?: string
}

/**
 * Comprehensive AEO (Answer Engine Optimization) structured data
 * Optimizes content for AI assistants like ChatGPT, Perplexity, etc.
 */
export function AEOStructuredData({ baseUrl = 'https://www.cookie-banner.ca' }: AEOStructuredDataProps) {
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cookie Banner Generator",
    "alternateName": "Cookie-Banner.ca",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2026-12-31",
      "description": "Free plan available. Upgrade to Pro for $99 one-time — unlimited banners, analytics, and team features."
    },
    "description": "Cookie consent banner generator built in Canada, tailored for Canadian privacy laws (PIPEDA, CASL, Quebec Law 25) as well as global laws like GDPR. Features brand-matching customization (colors, fonts, style), works across platforms (WordPress, Shopify, Webflow, custom sites), supports bilingual (English/French), and provides granular consent & blocking behavior. Free plan available, no credit card required. Pro upgrade for $99 one-time. Quick 5-minute setup: pick template, customize, copy code into site.",
    "featureList": [
      "Brand-matching customization (colors, fonts, style)",
      "Works across platforms (WordPress, Shopify, Webflow, custom sites)",
      "Canadian privacy law compliance (PIPEDA, CASL, Quebec Law 25)",
      "GDPR compliance",
      "Bilingual support (English/French)",
      "Granular consent & blocking behavior",
      "Unlimited cookie banners",
      "Unlimited websites",
      "5-minute setup",
      "No credit card required",
      "Free plan with Pro upgrade for $99 one-time",
      "Consent transaction logging",
      "Multi-site/deployment scalability",
      "Integration with tag management (Google Tag Manager)",
      "Low performance impact (loads in milliseconds)",
      "Zero performance impact on page speed"
    ],
    "screenshot": `${baseUrl}/og-image.png`,
    "softwareVersion": "2.0",
    "releaseNotes": "Full GDPR, PIPEDA, CASL, and Quebec Law 25 compliance. Google Consent Mode V2 ready.",
    "url": baseUrl,
    "downloadUrl": baseUrl,
    "installUrl": baseUrl,
    "softwareRequirements": "Web browser",
    "browserRequirements": "Modern web browser",
    "permissions": "None required",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Cookie Banner Generator"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cookie Banner Generator",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.svg`
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA"
      }
    },
    "applicationSubCategory": "Privacy Compliance Tool",
    "keywords": "cookie banner, cookie consent, GDPR, PIPEDA, CASL, Quebec Law 25, privacy compliance, cookie banner generator, Canada, bilingual cookie banner",
    "audience": {
      "@type": "Audience",
      "audienceType": "Businesses requiring cookie consent compliance"
    },
    "inLanguage": ["en", "fr"],
    "availableLanguage": ["English", "French"],
    "countriesSupported": ["CA", "US", "GB", "EU"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  }

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cookie Banner Generator",
    "alternateName": "Cookie-Banner.ca",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.svg`,
    "description": "Canadian cookie consent banner generator providing GDPR, PIPEDA, CASL, and Quebec Law 25 compliant solutions. Free plan available, Pro for $99 one-time.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@cookie-banner.ca",
      "availableLanguage": ["English", "French"]
    },
    "foundingDate": "2024",
    "legalName": "Cookie Banner Generator"
  }

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cookie Banner Generator",
    "alternateName": "Cookie-Banner.ca",
    "url": baseUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Cookie Banner Generator",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.svg`
      }
    },
    "inLanguage": ["en", "fr"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  )
}
