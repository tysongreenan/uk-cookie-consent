import { validatePublicUrl } from './url-validation'

const DEFAULT_TIMEOUT = 10000 // 10 seconds
const DEFAULT_MAX_CONTENT_LENGTH = 2 * 1024 * 1024 // 2 MB
const MAX_REDIRECTS = 5

const allowedProtocols = new Set(['http:', 'https:'])

export interface FetchSafeOptions extends RequestInit {
  timeoutMs?: number
  maxContentLength?: number
}

export async function fetchSafe(input: string | URL, init: FetchSafeOptions = {}) {
  let url = typeof input === 'string' ? new URL(input) : new URL(input.toString())

  if (!allowedProtocols.has(url.protocol)) {
    throw new Error(`Protocol "${url.protocol}" is not supported`)
  }

  // SSRF protection: validate the URL resolves to a public IP
  await validatePublicUrl(url)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(new Error('Request timed out')), init.timeoutMs ?? DEFAULT_TIMEOUT)

  try {
    let redirectCount = 0

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await fetch(url.toString(), {
        ...init,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CookieBannerBot/1.0)',
          'Accept': 'text/html,text/css,*/*',
          ...init.headers
        },
        signal: init.signal ?? controller.signal,
        redirect: 'manual', // Handle redirects manually to validate each target
      })

      // Handle redirects with SSRF validation
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location')
        if (!location) {
          throw new Error(`Redirect with no Location header from ${url.toString()}`)
        }

        redirectCount++
        if (redirectCount > MAX_REDIRECTS) {
          throw new Error(`Too many redirects (>${MAX_REDIRECTS})`)
        }

        url = new URL(location, url)

        if (!allowedProtocols.has(url.protocol)) {
          throw new Error(`Redirect to disallowed protocol "${url.protocol}"`)
        }

        await validatePublicUrl(url)
        continue
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url.toString()}`)
      }

      const maxContentLength = init.maxContentLength ?? DEFAULT_MAX_CONTENT_LENGTH
      const contentLengthHeader = response.headers.get('content-length')

      if (contentLengthHeader && Number(contentLengthHeader) > maxContentLength) {
        throw new Error(`Response too large (${contentLengthHeader} bytes) for ${url.toString()}`)
      }

      return response
    }
  } finally {
    clearTimeout(timeout)
  }
}

export async function fetchSafeText(input: string | URL, init: FetchSafeOptions = {}) {
  const response = await fetchSafe(input, init)
  const buffer = await response.arrayBuffer()

  const maxContentLength = init.maxContentLength ?? DEFAULT_MAX_CONTENT_LENGTH
  if (buffer.byteLength > maxContentLength) {
    throw new Error(`Response exceeded size limit (${buffer.byteLength} bytes) for ${input.toString()}`)
  }

  return { response, text: new TextDecoder('utf-8').decode(buffer) }
}

