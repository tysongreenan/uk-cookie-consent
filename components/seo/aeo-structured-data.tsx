'use client'

import { useMemo } from 'react'

interface AEOStructuredDataProps {
  baseUrl?: string
}

/**
 * Comprehensive AEO (Answer Engine Optimization) structured data
 * Optimizes content for AI assistants like ChatGPT, Perplexity, etc.
 */
export function AEOStructuredData({ baseUrl = 'https://www.cookie-banner.ca' }: AEOStructuredDataProps) {
  const schemas = useMemo(() => {
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
        "priceValidUntil": "2025-12-31",
        "description": "Free forever for first 1,000 accounts. Unlimited cookie banners and websites."
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "description": "Cookie consent banner generator built in Canada, tailored for Canadian privacy laws (PIPEDA, CASL, Quebec Law 25) as well as global laws like GDPR. Features brand-matching customization (colors, fonts, style), works across platforms (WordPress, Shopify, Webflow, custom sites), supports bilingual (English/French), and provides granular consent & blocking behavior. Free forever for first 1,000 accounts, no credit card required. Quick 5-minute setup: pick template, customize, copy code into site.",
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
        "Free forever for first 1,000 accounts",
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
      "legalName": "Cookie Banner Generator",
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "Cookie Banner Team"
        }
      ]
    }

    const organization = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Cookie Banner Generator",
      "alternateName": "Cookie-Banner.ca",
      "url": baseUrl,
      "logo": `${baseUrl}/logo.svg`,
      "description": "Canadian cookie consent banner generator providing GDPR, PIPEDA, CASL, and Quebec Law 25 compliant solutions. Free forever for first 1,000 accounts.",
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
      "sameAs": [
        baseUrl
      ],
      "foundingDate": "2024",
      "legalName": "Cookie Banner Generator"
    }

    const product = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Cookie Consent Banner Generator",
      "description": "Professional cookie consent banner generator for Canadian businesses. GDPR, PIPEDA, CASL, and Quebec Law 25 compliant. Brand-matching customization, unlimited banners, works on all platforms. Free forever for first 1,000 accounts.",
      "brand": {
        "@type": "Brand",
        "name": "Cookie Banner Generator"
      },
      "category": "Privacy Compliance Software",
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}/pricing`,
        "priceCurrency": "CAD",
        "price": "0",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "description": "Free forever for first 1,000 accounts. Unlimited cookie banners and websites. No credit card required.",
        "eligibleRegion": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "56.1304",
            "longitude": "-106.3468"
          },
          "geoRadius": {
            "@type": "Distance",
            "name": "Worldwide"
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1000"
      },
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "Canadian businesses requiring privacy compliance"
      },
      "keywords": "cookie banner, cookie consent, GDPR compliant, PIPEDA compliant, CASL compliant, Quebec Law 25, privacy law compliance, Canada"
    }

    const howTo = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Set Up a Cookie Consent Banner in 5 Minutes",
      "description": "Quick setup guide for creating and installing a GDPR and PIPEDA compliant cookie consent banner on your website.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Sign Up for Free Account",
          "text": "Create a free account at cookie-banner.ca. No credit card required. First 1,000 accounts are free forever.",
          "url": `${baseUrl}/auth/signup`
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Pick a Template",
          "text": "Choose from our pre-designed cookie banner templates that match your brand style.",
          "url": `${baseUrl}/dashboard/builder`
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Customize Your Banner",
          "text": "Customize colors, fonts, text, and position to match your website's branding perfectly. Upload your logo and adjust styling.",
          "url": `${baseUrl}/dashboard/builder`
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Add Tracking Scripts (Optional)",
          "text": "Add your tracking scripts like Google Analytics, Facebook Pixel, or other third-party tools. The banner will automatically block these until consent is given.",
          "url": `${baseUrl}/dashboard/builder`
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Copy and Paste Installation Code",
          "text": "Copy the generated HTML/JavaScript code and paste it into your website's HTML, right before the closing </body> tag. Works on WordPress, Shopify, Webflow, Squarespace, and custom sites.",
          "url": `${baseUrl}/dashboard/builder`
        }
      ],
      "totalTime": "PT5M",
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Cookie Banner Generator"
        }
      ],
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Website access"
        }
      ]
    }

    return {
      softwareApplication,
      organization,
      product,
      howTo
    }
  }, [baseUrl])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.howTo) }}
      />
    </>
  )
}

