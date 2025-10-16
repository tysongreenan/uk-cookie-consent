'use client'

import { useMemo } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface StructuredDataProps {
  type: 'faq' | 'article' | 'breadcrumb'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = useMemo(() => {
    switch (type) {
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.map((item: FAQItem) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        }
      
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "author": {
            "@type": "Organization",
            "name": data.author || "Cookie Banner Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Cookie Banner",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.cookie-banner.ca/logos/logo.svg"
            }
          },
          "datePublished": data.datePublished,
          "dateModified": data.dateModified || data.datePublished,
          "image": data.image || "https://www.cookie-banner.ca/logos/logo.svg"
        }
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        }
      
      default:
        return null
    }
  }, [type, data])

  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Helper function to extract FAQ data from markdown frontmatter
export function extractFAQFromSchema(schemaData: any): FAQItem[] {
  if (!schemaData?.mainEntity) return []
  
  return schemaData.mainEntity.map((item: any) => ({
    question: item.name,
    answer: item.acceptedAnswer?.text || ''
  }))
}

// Helper function to create article structured data
export function createArticleSchema(articleData: {
  title: string
  description: string
  author?: string
  datePublished: string
  dateModified?: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description,
    "author": {
      "@type": "Organization",
      "name": articleData.author || "Cookie Banner Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cookie Banner",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.cookie-banner.ca/logos/logo.svg"
      }
    },
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified || articleData.datePublished,
    "image": articleData.image || "https://www.cookie-banner.ca/logos/logo.svg",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": typeof window !== 'undefined' ? window.location.href : ''
    }
  }
}