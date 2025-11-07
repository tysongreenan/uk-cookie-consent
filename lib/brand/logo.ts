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

  $('link[rel*="icon"]').each((_, element) => {
    const href = $(element).attr('href')
    if (!href) return

    const sizesAttr = $(element).attr('sizes')
    const sizes = sizesAttr ? parseInt(sizesAttr.split('x')[0] ?? '0', 10) : 0
    const absoluteUrl = resolveUrl(href, baseUrl)

    if (absoluteUrl) {
      candidates.push({
        url: absoluteUrl,
        source: sizes ? `icon-${sizes}px` : 'icon',
        weight: 80 + sizes
      })
    }
  })

  const ogImage = $('meta[property="og:image"], meta[property="og:image:url"]').attr('content')
  if (ogImage) {
    const absoluteUrl = resolveUrl(ogImage, baseUrl)
    if (absoluteUrl) {
      candidates.push({
        url: absoluteUrl,
        source: 'og:image',
        weight: 70
      })
    }
  }

  $('img').each((_, element) => {
    const src = $(element).attr('src')
    if (!src) return

    const absoluteUrl = resolveUrl(src, baseUrl)
    if (!absoluteUrl) return

    const alt = ($(element).attr('alt') || '').toLowerCase()
    const className = ($(element).attr('class') || '').toLowerCase()

    const matchesKeyword = LOGO_KEYWORDS.some(keyword => alt.includes(keyword) || className.includes(keyword))
    if (!matchesKeyword) return

    const width = parseInt($(element).attr('width') || '0', 10)
    const height = parseInt($(element).attr('height') || '0', 10)
    const area = width * height

    candidates.push({
      url: absoluteUrl,
      source: 'img-tag',
      weight: 60 + Math.min(area / 1000, 40)
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

