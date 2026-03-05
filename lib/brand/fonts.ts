import type { CheerioAPI } from 'cheerio/slim'
import { fetchSafeText } from '@/lib/fetchSafe'

export interface FontCandidate {
  family: string
  source: string
  weight: number
  url?: string // For @font-face fonts
}

interface FontAccumulator {
  count: number
  sources: Set<string>
  url?: string
}

// Common system fonts to ignore (we want custom fonts)
const SYSTEM_FONTS = new Set([
  'arial',
  'helvetica',
  'times',
  'times new roman',
  'courier',
  'courier new',
  'verdana',
  'georgia',
  'palatino',
  'garamond',
  'bookman',
  'comic sans ms',
  'trebuchet ms',
  'impact',
  'lucida console',
  'tahoma',
  'system-ui',
  '-apple-system',
  'blinkmacsystemfont',
  'segoe ui',
  'roboto',
  'oxygen',
  'ubuntu',
  'cantarell',
  'fira sans',
  'droid sans',
  'helvetica neue',
  'sans-serif',
  'serif',
  'monospace',
])

// Extract fonts from CSS content
function extractFontsFromCSS(css: string, source: string, fontMap: Map<string, FontAccumulator>, baseUrl?: URL) {
  // Match font-family declarations
  const fontFamilyRegex = /font-family\s*:\s*([^;]+)/gi
  const matches = Array.from(css.matchAll(fontFamilyRegex))

  for (const match of matches) {
    const fontFamilyValue = match[1].trim()
    // Parse font stack (e.g., "Inter", "Helvetica Neue", sans-serif)
    const fonts = fontFamilyValue
      .split(',')
      .map(f => f.trim().replace(/^["']|["']$/g, ''))
      .filter(f => f && !SYSTEM_FONTS.has(f.toLowerCase()))

    for (const font of fonts) {
      if (!fontMap.has(font)) {
        fontMap.set(font, {
          count: 0,
          sources: new Set(),
        })
      }
      const accumulator = fontMap.get(font)!
      accumulator.count++
      accumulator.sources.add(source)
    }
  }

  // Match @font-face declarations to get font URLs
  const fontFaceRegex = /@font-face\s*\{([^}]+)\}/gi
  const fontFaceMatches = Array.from(css.matchAll(fontFaceRegex))

  for (const match of fontFaceMatches) {
    const fontFaceContent = match[1]
    const fontFamilyMatch = fontFaceContent.match(/font-family\s*:\s*["']?([^"';]+)["']?/i)
    const srcMatch = fontFaceContent.match(/src\s*:\s*url\(["']?([^"')]+)["']?\)/i)

    if (fontFamilyMatch && srcMatch) {
      const fontFamily = fontFamilyMatch[1].trim().replace(/^["']|["']$/g, '')
      const fontUrl = srcMatch[1].trim()

      if (!SYSTEM_FONTS.has(fontFamily.toLowerCase())) {
        if (!fontMap.has(fontFamily)) {
          fontMap.set(fontFamily, {
            count: 0,
            sources: new Set(),
          })
        }
        const accumulator = fontMap.get(fontFamily)!
        
        // Resolve relative URLs
        if (baseUrl && !fontUrl.startsWith('http')) {
          try {
            accumulator.url = new URL(fontUrl, baseUrl).toString()
          } catch {
            accumulator.url = fontUrl
          }
        } else {
          accumulator.url = fontUrl
        }
        accumulator.sources.add('@font-face')
      }
    }
  }
}

// Extract Google Fonts links
function extractGoogleFonts($: CheerioAPI): string[] {
  const fonts: string[] = []
  
  // Check for Google Fonts link tags
  $('link[href*="fonts.googleapis.com"]').each((_, element) => {
    const href = $(element).attr('href')
    if (href) {
      // Extract font family names from Google Fonts URL
      const match = href.match(/family=([^&:]+)/)
      if (match) {
        const fontNames = match[1].split('|').map(name => name.split(':')[0].replace(/\+/g, ' '))
        fonts.push(...fontNames)
      }
    }
  })

  // Check for Google Fonts preconnect/preload
  $('link[href*="fonts.gstatic.com"]').each((_, element) => {
    // This indicates Google Fonts are being used, but we need to find the actual font names
    // from the stylesheet link above
  })

  return fonts
}

export async function extractBrandFonts(html: string, baseUrl: URL, $: CheerioAPI): Promise<FontCandidate[]> {
  const fontMap = new Map<string, FontAccumulator>()

  // Extract from inline styles
  extractFontsFromCSS(html, 'html', fontMap, baseUrl)

  // Extract from <style> tags
  $('style').each((_, el) => {
    const content = $(el).html()
    if (content) {
      extractFontsFromCSS(content, 'inline-style', fontMap, baseUrl)
    }
  })

  // Extract Google Fonts
  const googleFonts = extractGoogleFonts($)
  for (const font of googleFonts) {
    if (!SYSTEM_FONTS.has(font.toLowerCase())) {
      if (!fontMap.has(font)) {
        fontMap.set(font, {
          count: 0,
          sources: new Set(),
        })
      }
      const accumulator = fontMap.get(font)!
      accumulator.count += 2 // Google Fonts get higher weight
      accumulator.sources.add('google-fonts')
      // Google Fonts URL
      accumulator.url = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`
    }
  }

  // Extract from stylesheets (limited to same origin for security)
  const stylesheetLinks = $('link[rel="stylesheet"]').toArray().slice(0, 3)

  await Promise.allSettled(
    stylesheetLinks.map(async (element) => {
      const href = $(element).attr('href')
      if (!href) return

      try {
        const stylesheetUrl = new URL(href, baseUrl)
        if (stylesheetUrl.origin !== baseUrl.origin) {
          // Only process same-origin stylesheets for security
          return
        }

        const { text } = await fetchSafeText(stylesheetUrl, {
          timeoutMs: 8000,
          maxContentLength: 512 * 1024 // 512 KB per stylesheet
        })
        extractFontsFromCSS(text, 'stylesheet', fontMap, baseUrl)
      } catch (error) {
        // Silently fail - not critical
      }
    })
  )

  // Convert to candidates and sort by count
  const candidates: FontCandidate[] = Array.from(fontMap.entries())
    .map(([family, accumulator]) => ({
      family,
      source: Array.from(accumulator.sources).join(', '),
      weight: accumulator.count,
      url: accumulator.url,
    }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5) // Top 5 fonts

  return candidates
}

