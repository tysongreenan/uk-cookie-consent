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
    "offers": [
      {
        "@type": "Offer",
        "name": "Free",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "One banner, seven layouts, and a powered-by badge. No credit card."
      },
      {
        "@type": "Offer",
        "name": "Pro one-time",
        "price": "99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "Unlimited banners, analytics, geo-targeting, and team members. Security patches. No later features."
      },
      {
        "@type": "Offer",
        "name": "Pro annual",
        "price": "99",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "description": "$99 per year. Includes consent logs, privacy-policy version history, and features shipped after subscribe."
      }
    ],
    "description": "Cookie banner generator built in Canada. Set consent copy and opt-in behaviour for PIPEDA, Quebec Law 25, GDPR, and CCPA, then paste one async script. A banner does not make a website legally compliant. Not a Google-certified CMP. Free plan is one banner. Pro is $99 once or $99 per year.",
    "featureList": [
      "Brand colours, type, and layout",
      "Paste-in script for WordPress, Shopify, and custom sites",
      "Consent modes for Canada, the EU, and California",
      "English, French, and 14 other banner languages",
      "Free plan: 1 banner",
      "Pro one-time: unlimited banners, analytics, geo-targeting ($99)",
      "Pro annual: consent logs and policy version history ($99/year)",
      "Google Consent Mode v2 defaults",
      "Google Tag Manager template",
      "Standard banner about 28 KB gzipped"
    ],
    // Use real assets (public/logos/logo.svg; OG via app/opengraph-image.tsx)
    "screenshot": `${baseUrl}/opengraph-image`,
    "softwareVersion": "2.0",
    "releaseNotes": "Consent modes for Canada, the EU, and California. Google Consent Mode v2 defaults. Not a Google-certified CMP.",
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
        "url": `${baseUrl}/logos/logo.svg`
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CA"
      }
    },
    "applicationSubCategory": "Privacy Compliance Tool",
    "keywords": "cookie banner, cookie consent, GDPR, PIPEDA, Quebec Law 25, CCPA, cookie banner generator, Canada",
    "audience": {
      "@type": "Audience",
      "audienceType": "Businesses requiring cookie consent compliance"
    },
    "inLanguage": ["en", "fr"],
    "availableLanguage": ["English", "French"],
    "countriesSupported": ["CA", "US", "GB", "EU"]
    // No aggregateRating — Google treats fabricated review markup as spam
  }

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cookie Banner Generator",
    "alternateName": "Cookie-Banner.ca",
    "url": baseUrl,
    "logo": `${baseUrl}/logos/logo.svg`,
    "description": "Canadian cookie banner generator for PIPEDA, Quebec Law 25, GDPR, and CCPA consent choices. Free plan, or Pro for $99 once or $99 per year. Not a Google-certified CMP.",
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
        "url": `${baseUrl}/logos/logo.svg`
      }
    },
    "inLanguage": "en"
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
