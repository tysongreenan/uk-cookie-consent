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
        if (stylesheetUrl.origin !== baseUrl.origin) {
          // Restrict to same origin to avoid SSRF risks / CORS failures
          return
        }

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

  if (colors.length === 0) {
    warnings.push('No colors detected; using default palette.')
  }

  const suggestions = buildColorSuggestions(colors)

  return { colors, suggestions, warnings } satisfies BrandColorSuggestions
}

function accumulateColorsFromContent(content: string, source: string, colorMap: Map<string, ColorAccumulator>) {
  const normalizedContent = content.replace(/\s+/g, ' ')

  extractMatches(normalizedContent, HEX_COLOR_REGEX, source, colorMap)
  extractMatches(normalizedContent, RGB_COLOR_REGEX, source, colorMap)

  let cssVarMatch: RegExpExecArray | null
  while ((cssVarMatch = CSS_VAR_REGEX.exec(normalizedContent)) !== null) {
    const value = cssVarMatch[1]
    const normalized = normalizeColor(value)
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
    return chroma(input.trim()).hex().toLowerCase()
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
      const luminance = chroma(hex).luminance()
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

      return {
        hex,
        score: meta.count,
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

function buildColorSuggestions(colors: BrandColorCandidate[]) {
  const fallbackBackground = '#1f2937'
  const fallbackText = '#ffffff'
  const fallbackButton = '#3b82f6'

  if (colors.length === 0) {
    return {
      background: fallbackBackground,
      text: fallbackText,
      button: fallbackButton,
      buttonText: '#ffffff',
      link: fallbackButton
    }
  }

  let background = selectColorByUsage(colors, 'background')?.hex ?? colors[0].hex

  if (!background) {
    background = fallbackBackground
  }

  const textCandidate = colors
    .filter(color => color.hex !== background)
    .map(color => ({
      hex: color.hex,
      contrast: chroma.contrast(color.hex, background)
    }))
    .sort((a, b) => b.contrast - a.contrast)[0]

  const text = textCandidate && textCandidate.contrast >= 3 ? textCandidate.hex : (chroma.contrast(background, '#ffffff') >= 4.5 ? '#ffffff' : '#111111')

  const buttonCandidate = colors
    .filter(color => color.hex !== background && color.hex !== text)
    .find(color => color.recommendedUsage.includes('button')) ?? colors.find(color => color.hex !== background && color.hex !== text)

  const button = buttonCandidate?.hex ?? fallbackButton
  const buttonText = chroma.contrast(button, '#ffffff') >= 4.5 ? '#ffffff' : (chroma.contrast(button, '#111111') >= 4.5 ? '#111111' : text)

  const link = colors.find(color => color.recommendedUsage.includes('link') && color.hex !== button)?.hex ?? button

  return { background, text, button, buttonText, link }
}

function selectColorByUsage(colors: BrandColorCandidate[], usage: BrandColorCandidate['recommendedUsage'][number]) {
  return colors.find(color => color.recommendedUsage.includes(usage))
}

