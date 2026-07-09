import type { CheerioAPI } from 'cheerio/slim'
import chroma from 'chroma-js'

import { fetchSafeText } from '@/lib/fetchSafe'
import { BrandColorCandidate, BrandColorSuggestions } from '@/types'

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,8})\b/g
const RGB_COLOR_REGEX = /rgba?\(([^)]+)\)/g
const CSS_VAR_REGEX = /--[\w-]+:\s*([^;]+);/g

interface ColorAccumulator {
  count: number
  sources: Set<string>
}

const MAX_STYLESHEETS = 3

export async function extractBrandColors(html: string, baseUrl: URL, $: CheerioAPI) {
  const colorMap = new Map<string, ColorAccumulator>()
  const warnings: string[] = []

  accumulateColorsFromContent(html, 'html', colorMap)

  const inlineStyles: string[] = []
  $('style').each((_, el) => {
    const content = $(el).html()
    if (content) {
      inlineStyles.push(content)
    }
  })

  for (const styleContent of inlineStyles) {
    accumulateColorsFromContent(styleContent, 'inline-style', colorMap)
  }

  const stylesheetLinks = $('link[rel="stylesheet"]').toArray().slice(0, MAX_STYLESHEETS)

  await Promise.allSettled(
    stylesheetLinks.map(async (element) => {
      const href = $(element).attr('href')
      if (!href) return

      try {
        const stylesheetUrl = new URL(href, baseUrl)

        // Only fetch http/https stylesheets (blocks file://, data:, etc.)
        if (!stylesheetUrl.protocol.startsWith('http')) return

        const { text } = await fetchSafeText(stylesheetUrl, {
          timeoutMs: 8000,
          maxContentLength: 512 * 1024 // 512 KB per stylesheet
        })
        accumulateColorsFromContent(text, 'stylesheet', colorMap)
      } catch (error) {
        warnings.push(`Failed to fetch stylesheet: ${href} (${(error as Error).message})`)
      }
    })
  )

  const metaThemeColor = $('meta[name="theme-color"]').attr('content')
  if (metaThemeColor) {
    const normalized = normalizeColor(metaThemeColor)
    if (normalized) {
      addColor(normalized, 'meta-theme-color', colorMap)
    }
  }

  const colors = buildColorCandidates(colorMap)
  const colorsDiscovered = colors.length > 0

  if (colors.length === 0) {
    warnings.push('No colors detected; using default palette.')
  }

  const suggestions = buildColorSuggestions(colors)

  return { colors, suggestions, warnings, colorsDiscovered } satisfies BrandColorSuggestions
}

function accumulateColorsFromContent(content: string, source: string, colorMap: Map<string, ColorAccumulator>) {
  const normalizedContent = content.replace(/\s+/g, ' ')

  extractMatches(normalizedContent, HEX_COLOR_REGEX, source, colorMap)
  extractMatches(normalizedContent, RGB_COLOR_REGEX, source, colorMap)

  let cssVarMatch: RegExpExecArray | null
  while ((cssVarMatch = CSS_VAR_REGEX.exec(normalizedContent)) !== null) {
    const value = cssVarMatch[1].trim()

    // Try bare RGB triplet format first (e.g. "51, 51, 51" from page builders)
    const tripletMatch = value.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/)
    const colorValue = tripletMatch
      ? `rgb(${tripletMatch[1]},${tripletMatch[2]},${tripletMatch[3]})`
      : value

    const normalized = normalizeColor(colorValue)
    if (normalized) {
      addColor(normalized, `${source}-css-var`, colorMap)
    }
  }
}

function extractMatches(content: string, regex: RegExp, source: string, colorMap: Map<string, ColorAccumulator>) {
  let match: RegExpExecArray | null
  while ((match = regex.exec(content)) !== null) {
    const normalized = normalizeColor(match[0])
    if (normalized) {
      addColor(normalized, source, colorMap)
    }
  }
}

function normalizeColor(input: string | undefined | null) {
  if (!input) return null
  try {
    const color = chroma(input.trim())

    // Skip fully or nearly transparent colors (alpha < 0.1)
    if (color.alpha() < 0.1) return null

    // Normalize to opaque 6-digit hex (strip alpha channel)
    return color.alpha(1).hex().toLowerCase()
  } catch {
    return null
  }
}

function addColor(hex: string, source: string, colorMap: Map<string, ColorAccumulator>) {
  const entry = colorMap.get(hex)
  if (entry) {
    entry.count += 1
    entry.sources.add(source)
  } else {
    colorMap.set(hex, { count: 1, sources: new Set([source]) })
  }
}

function buildColorCandidates(colorMap: Map<string, ColorAccumulator>): BrandColorCandidate[] {
  return Array.from(colorMap.entries())
    .map(([hex, meta]) => {
      const color = chroma(hex)
      const luminance = color.luminance()
      const isLight = luminance > 0.7
      const isDark = luminance < 0.3
      const recommendedUsage: BrandColorCandidate['recommendedUsage'] = []

      if (isLight) {
        recommendedUsage.push('background', 'buttonText')
      }
      if (isDark) {
        recommendedUsage.push('text', 'background')
      }
      if (!isLight && !isDark) {
        recommendedUsage.push('button', 'link')
      }

      const contrastOnWhite = chroma.contrast(hex, '#ffffff')
      const contrastOnBlack = chroma.contrast(hex, '#111111')

      // Boost chromatic (colorful) colors — they're more likely brand colors
      // than structural grays/blacks/whites
      const [, sat] = color.hsl()
      const saturationBoost = (isNaN(sat) ? 0 : sat) * meta.count * 2

      return {
        hex,
        score: meta.count + saturationBoost,
        sources: Array.from(meta.sources),
        luminance,
        contrastOnWhite,
        contrastOnBlack,
        recommendedUsage,
        suggestedTextColor: contrastOnWhite >= contrastOnBlack ? '#ffffff' : '#111111'
      }
    })
    .sort((a, b) => b.score - a.score)
}

// Banner color mapping: neutral surface, brand-colored accent.
//
// Earlier versions used the site's most prominent chromatic color as the
// banner BACKGROUND and a second one as the button, which produced garish,
// low-contrast banners (vivid blue background + orange button + unreadable
// links). Bold brand colors make good buttons, not surfaces — so the banner
// background stays neutral (matched to the site's light/dark feel), the top
// brand color becomes the button, and the link is that same brand color
// nudged until it actually reads against the background.
export function buildColorSuggestions(colors: BrandColorCandidate[]) {
  const FALLBACK = {
    background: '#1f2937',
    text: '#ffffff',
    button: '#3b82f6',
    buttonText: '#ffffff',
    link: '#60a5fa',
  }

  if (colors.length === 0) {
    return FALLBACK
  }

  const isChromatic = (candidate: BrandColorCandidate) => {
    const [, sat] = chroma(candidate.hex).hsl()
    return !isNaN(sat) && sat >= 0.25 && candidate.luminance > 0.02 && candidate.luminance < 0.95
  }

  // Brand accent: highest-scored colorful color (scores already boost
  // saturated colors over structural grays)
  const accent = colors.find(isChromatic)?.hex ?? FALLBACK.button

  // Surface: follow the site's dominant neutral. A clearly dark site gets a
  // dark banner; everything else gets a light one.
  const topNeutral = colors.find(candidate => !isChromatic(candidate))
  const useDarkSurface = !!topNeutral && topNeutral.luminance < 0.2
  const background = useDarkSurface ? topNeutral.hex : '#ffffff'
  const text = chroma.contrast(background, '#ffffff') >= 4.5 ? '#ffffff' : '#1f2937'

  // Button carries the brand color; its label is whichever of white/black
  // reads better on it.
  const button = accent
  const buttonText = chroma.contrast(button, '#ffffff') >= chroma.contrast(button, '#111111')
    ? '#ffffff'
    : '#111111'

  // Link: brand color adjusted until it passes WCAG AA (4.5:1) against the
  // surface — this was previously unchecked and produced unreadable links.
  let link = chroma(accent)
  const backgroundIsLight = chroma(background).luminance() > 0.5
  for (let i = 0; i < 12 && chroma.contrast(link, background) < 4.5; i++) {
    link = backgroundIsLight ? link.darken(0.4) : link.brighten(0.4)
  }

  return { background, text, button, buttonText, link: link.hex().toLowerCase() }
}

