import type { CheerioAPI } from 'cheerio/slim'

import { BrandLogoSuggestion } from '@/types'

interface LogoCandidate {
  url: string
  source: string
  weight: number
}

const LOGO_KEYWORDS = ['logo', 'brand', 'mark']

export function discoverLogo($: CheerioAPI, baseUrl: URL): BrandLogoSuggestion | undefined {
  const candidates: LogoCandidate[] = []

  // 1. Check favicon links (existing functionality - preserved)
  $('link[rel*="icon"]').each((_, element) => {
    const href = $(element).attr('href')
    if (!href) return

    const sizesAttr = $(element).attr('sizes')
    const sizes = sizesAttr ? parseInt(sizesAttr.split('x')[0] ?? '0', 10) : 0
    const absoluteUrl = resolveUrl(href, baseUrl)

    if (absoluteUrl) {
      const isSvg = absoluteUrl.toLowerCase().endsWith('.svg')
      candidates.push({
        url: absoluteUrl,
        source: sizes ? `icon-${sizes}px` : 'icon',
        weight: 80 + sizes + (isSvg ? 20 : 0) // Bonus for SVG
      })
    }
  })

  // 2. Check Open Graph image (existing functionality - preserved)
  const ogImage = $('meta[property="og:image"], meta[property="og:image:url"]').attr('content')
  if (ogImage) {
    const absoluteUrl = resolveUrl(ogImage, baseUrl)
    if (absoluteUrl) {
      const isSvg = absoluteUrl.toLowerCase().endsWith('.svg')
      candidates.push({
        url: absoluteUrl,
        source: 'og:image',
        weight: 70 + (isSvg ? 20 : 0) // Bonus for SVG
      })
    }
  }

  // 3. Check inline SVG elements (new functionality)
  $('svg').each((_, element) => {
    const id = ($(element).attr('id') || '').toLowerCase()
    const className = ($(element).attr('class') || '').toLowerCase()
    const ariaLabel = ($(element).attr('aria-label') || '').toLowerCase()
    
    const matchesKeyword = LOGO_KEYWORDS.some(keyword => 
      id.includes(keyword) || className.includes(keyword) || ariaLabel.includes(keyword)
    )
    
    if (matchesKeyword) {
      // For inline SVG, we'll use a data URL approach or try to find a parent link
      const parentLink = $(element).closest('a').attr('href')
      if (parentLink) {
        const absoluteUrl = resolveUrl(parentLink, baseUrl)
        if (absoluteUrl) {
          candidates.push({
            url: absoluteUrl,
            source: 'inline-svg-link',
            weight: 75 // High weight for inline SVG
          })
        }
      }
      // Note: Inline SVG can't be directly used as URL, but we can note it exists
      // The SVG content itself would need to be extracted separately if needed
    }
  })

  // 4. Check picture elements (new functionality)
  $('picture').each((_, element) => {
    const $picture = $(element)
    
    // Check source elements for high-res images
    $picture.find('source').each((_, sourceEl) => {
      const srcset = $(sourceEl).attr('srcset')
      if (srcset) {
        const urls = parseSrcset(srcset)
        for (const { url, descriptor } of urls) {
          const absoluteUrl = resolveUrl(url, baseUrl)
          if (absoluteUrl) {
            const isSvg = absoluteUrl.toLowerCase().endsWith('.svg')
            const isHighRes = isHighResolution(absoluteUrl, descriptor)
            candidates.push({
              url: absoluteUrl,
              source: 'picture-srcset',
              weight: 65 + (isSvg ? 20 : 0) + (isHighRes ? 15 : 0)
            })
          }
        }
      }
    })
    
    // Check img inside picture
    const imgSrc = $picture.find('img').attr('src')
    if (imgSrc) {
      const absoluteUrl = resolveUrl(imgSrc, baseUrl)
      if (absoluteUrl) {
        const isSvg = absoluteUrl.toLowerCase().endsWith('.svg')
        candidates.push({
          url: absoluteUrl,
          source: 'picture-img',
          weight: 63 + (isSvg ? 20 : 0)
        })
      }
    }
  })

  // 5. Check img tags with enhanced detection (existing + new features)
  $('img').each((_, element) => {
    // Check src attribute (existing)
    let src = $(element).attr('src')
    
    // Check data-src and data-lazy-src for lazy-loaded images (new)
    if (!src) {
      src = $(element).attr('data-src') || $(element).attr('data-lazy-src')
    }
    
    if (!src) return

    const absoluteUrl = resolveUrl(src, baseUrl)
    if (!absoluteUrl) return

    const alt = ($(element).attr('alt') || '').toLowerCase()
    const className = ($(element).attr('class') || '').toLowerCase()
    const id = ($(element).attr('id') || '').toLowerCase()

    const matchesKeyword = LOGO_KEYWORDS.some(keyword => 
      alt.includes(keyword) || className.includes(keyword) || id.includes(keyword)
    )
    if (!matchesKeyword) return

    // Check srcset attribute for responsive/high-res images (new)
    const srcset = $(element).attr('srcset')
    let bestUrl = absoluteUrl
    let bestWeight = 0
    
    if (srcset) {
      const urls = parseSrcset(srcset)
      for (const { url, descriptor } of urls) {
        const resolvedUrl = resolveUrl(url, baseUrl)
        if (resolvedUrl) {
          const isSvg = resolvedUrl.toLowerCase().endsWith('.svg')
          const isHighRes = isHighResolution(resolvedUrl, descriptor)
          const weight = calculateImageWeight(resolvedUrl, isSvg, isHighRes, element, $)
          if (weight > bestWeight) {
            bestWeight = weight
            bestUrl = resolvedUrl
          }
        }
      }
    } else {
      // No srcset, use the src URL
      const isSvg = absoluteUrl.toLowerCase().endsWith('.svg')
      const isHighRes = isHighResolution(absoluteUrl, '')
      bestWeight = calculateImageWeight(absoluteUrl, isSvg, isHighRes, element, $)
    }

    candidates.push({
      url: bestUrl,
      source: srcset ? 'img-srcset' : 'img-tag',
      weight: bestWeight
    })
  })

  if (candidates.length === 0) {
    return undefined
  }

  const uniqueCandidates = dedupeByUrl(candidates)
  const winner = uniqueCandidates.sort((a, b) => b.weight - a.weight)[0]

  return {
    url: winner.url,
    source: winner.source
  }
}

function resolveUrl(value: string, baseUrl: URL) {
  try {
    const resolved = new URL(value, baseUrl)
    if (!['http:', 'https:'].includes(resolved.protocol)) {
      return undefined
    }
    return resolved.toString()
  } catch {
    return undefined
  }
}

function dedupeByUrl(candidates: LogoCandidate[]) {
  const map = new Map<string, LogoCandidate>()
  for (const candidate of candidates) {
    if (!map.has(candidate.url) || (map.get(candidate.url)?.weight ?? 0) < candidate.weight) {
      map.set(candidate.url, candidate)
    }
  }
  return Array.from(map.values())
}

// Parse srcset attribute (e.g., "image.jpg 1x, image@2x.jpg 2x" or "image.jpg 400w")
function parseSrcset(srcset: string): Array<{ url: string; descriptor: string }> {
  const entries: Array<{ url: string; descriptor: string }> = []
  const parts = srcset.split(',').map(s => s.trim())
  
  for (const part of parts) {
    const match = part.match(/^(.+?)(?:\s+(.+))?$/)
    if (match) {
      entries.push({
        url: match[1],
        descriptor: match[2] || ''
      })
    }
  }
  
  return entries
}

// Check if URL or descriptor indicates high resolution
function isHighResolution(url: string, descriptor: string): boolean {
  // Check URL patterns
  const highResPatterns = [
    /@2x/i,
    /@3x/i,
    /-2x/i,
    /-3x/i,
    /-hd/i,
    /-retina/i,
    /-high/i,
    /_2x/i,
    /_3x/i
  ]
  
  if (highResPatterns.some(pattern => pattern.test(url))) {
    return true
  }
  
  // Check descriptor (e.g., "2x", "3x", "400w" where 400 > 200)
  if (descriptor) {
    if (/^[23]x$/i.test(descriptor)) {
      return true
    }
    const widthMatch = descriptor.match(/^(\d+)w$/)
    if (widthMatch) {
      const width = parseInt(widthMatch[1], 10)
      if (width > 200) {
        return true
      }
    }
  }
  
  return false
}

// Calculate weight for an image candidate
function calculateImageWeight(
  url: string,
  isSvg: boolean,
  isHighRes: boolean,
  element: any,
  $: CheerioAPI
): number {
  const width = parseInt($(element).attr('width') || '0', 10)
  const height = parseInt($(element).attr('height') || '0', 10)
  const area = width * height
  
  let weight = 60 + Math.min(area / 1000, 40)
  
  // Bonus for SVG (vector = scalable = better quality)
  if (isSvg) {
    weight += 20
  }
  
  // Bonus for high resolution
  if (isHighRes) {
    weight += 15
  }
  
  return weight
}

