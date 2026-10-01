// Decides whether a scan loaded enough of the real page to grade.
//
// A blocked or empty document (Akamai "Access Denied", a Cloudflare
// interstitial, a timed-out navigation, a browser that never launched)
// has no cookies, no banner, and no privacy-policy link. Scoring that
// observation produces a fake grade D (score 64, 7 issues). Callers must
// skip grading when this module says the load is incomplete.

export type IncompleteReason = 'blocked' | 'timeout' | 'unreachable' | 'empty' | 'browser_failed'

export const INCOMPLETE_SCAN_MESSAGE = "Scan incomplete, we couldn't fully load this site"

// Visible text shorter than this, with no cookies, scripts, banner, or
// policy link, is not enough to audit. Real homepages clear it; the
// Akamai deny page and blank error documents do not.
const MIN_JUDGABLE_TEXT = 200

const BLOCK_TITLE =
  /access denied|just a moment|attention required|pardon our interruption|checking your browser|verify you are human|are you a robot|bot verification|please verify you are|one more step|403 forbidden|error 1020|request blocked/i

export interface PageLoadInput {
  httpStatus: number | null
  title: string
  textLength: number
  cookieCount: number
  scriptCount: number
  bannerDetected: boolean
  privacyPolicyUrl: string | null
}

export function isBlockedInterstitial(title: string): boolean {
  return BLOCK_TITLE.test(title || '')
}

export function classifyPageLoad(
  input: PageLoadInput,
): { complete: true } | { complete: false; reason: IncompleteReason } {
  if (isBlockedInterstitial(input.title)) {
    return { complete: false, reason: 'blocked' }
  }

  const status = input.httpStatus
  if (status === 404 || (status != null && status >= 500 && status <= 599)) {
    return { complete: false, reason: 'unreachable' }
  }
  if (status != null && status >= 400 && status <= 499) {
    return { complete: false, reason: 'blocked' }
  }

  const noSignals =
    input.cookieCount === 0 &&
    input.scriptCount === 0 &&
    !input.bannerDetected &&
    !input.privacyPolicyUrl
  if (noSignals && input.textLength < MIN_JUDGABLE_TEXT) {
    return { complete: false, reason: 'empty' }
  }

  return { complete: true }
}

export function classifyScanError(error: unknown): IncompleteReason {
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error ?? '')
  if (/timeout|timed out/i.test(message)) return 'timeout'
  if (/net::ERR_|ENOTFOUND|ECONNREFUSED|ECONNRESET|EAI_AGAIN|EPIPE|getaddrinfo|could not resolve hostname|No response from target/i.test(message)) {
    return 'unreachable'
  }
  if (/\b(401|403|429)\b|access denied|blocked/i.test(message)) return 'blocked'
  return 'browser_failed'
}
