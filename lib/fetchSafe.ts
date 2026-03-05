const DEFAULT_TIMEOUT = 10000 // 10 seconds
const DEFAULT_MAX_CONTENT_LENGTH = 2 * 1024 * 1024 // 2 MB

const allowedProtocols = new Set(['http:', 'https:'])

export interface FetchSafeOptions extends RequestInit {
  timeoutMs?: number
  maxContentLength?: number
}

export async function fetchSafe(input: string | URL, init: FetchSafeOptions = {}) {
  const url = typeof input === 'string' ? new URL(input) : new URL(input.toString())

  if (!allowedProtocols.has(url.protocol)) {
    throw new Error(`Protocol "${url.protocol}" is not supported`)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(new Error('Request timed out')), init.timeoutMs ?? DEFAULT_TIMEOUT)

  try {
    const response = await fetch(url.toString(), {
      ...init,
      signal: init.signal ?? controller.signal,
      redirect: init.redirect ?? 'follow'
    })

    const maxContentLength = init.maxContentLength ?? DEFAULT_MAX_CONTENT_LENGTH
    const contentLengthHeader = response.headers.get('content-length')

    if (contentLengthHeader && Number(contentLengthHeader) > maxContentLength) {
      throw new Error(`Response too large (${contentLengthHeader} bytes) for ${url.toString()}`)
    }

    return response
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

