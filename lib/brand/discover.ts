import { load } from 'cheerio/slim'
import type { CheerioAPI } from 'cheerio/slim'

import { fetchSafeText } from '@/lib/fetchSafe'
import { extractBrandColors } from '@/lib/brand/colors'
import { discoverLogo } from '@/lib/brand/logo'
import { BrandDiscoveryResult } from '@/types'

export async function discoverBrand(targetUrl: string): Promise<BrandDiscoveryResult> {
  const sanitizedUrl = normalizeUrl(targetUrl)
  const url = new URL(sanitizedUrl)

  const { text: html } = await fetchSafeText(url, { timeoutMs: 10000 })
  const $: CheerioAPI = load(html)

  const { colors, suggestions, warnings } = await extractBrandColors(html, url, $)
  const logo = discoverLogo($, url)

  const response: BrandDiscoveryResult = {
    url: url.toString(),
    colors,
    suggestions,
    warnings,
    fetchedAt: new Date().toISOString()
  }

  if (logo) {
    response.logo = logo
  }

  return response
}

function normalizeUrl(rawUrl: string) {
  const trimmed = rawUrl.trim()
  if (!trimmed) {
    throw new Error('URL is required')
  }

  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }

  return trimmed
}

