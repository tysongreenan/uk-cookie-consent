/**
 * One-line hosted install snippet shown after a banner is saved.
 * Keep this in one place so dashboard, builder, and the code tab stay in sync.
 *
 * Consent cookies default to the site's root domain (auto), so subdomains share
 * one choice. Optional runtime override before this tag:
 *   window.CookieBannerOptions = { domain: 'example.com' }
 */
export function hostedInstallSnippet(
  bannerId: string,
  options?: { showBranding?: boolean },
): string {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || 'https://cookie-banner.ca').replace(/\/$/, '')
  const script = `<script src="${base}/api/v1/banner.js?id=${bannerId}" async></script>`
  if (options?.showBranding) {
    return `${script}\n<noscript><a href="https://cookie-banner.ca/?ref=banner" rel="noopener" style="font-size:10px;color:rgba(128,128,128,0.5);text-decoration:none;">Cookie consent by cookie-banner.ca</a></noscript>`
  }
  return script
}

const COPIED_KEY_PREFIX = 'cb-install-snippet-copied:'
const NUDGE_DISMISSED_KEY = 'cb-install-nudge-dismissed'
const SESSION_COPY_COUNT_KEY = 'cb-install-snippet-copy-count'
const SESSION_HELP_SHOWN_KEY = 'cb-install-help-shown'

export type HostedCopyRecord = {
  copyCount: number
  shouldShowInstallHelp: boolean
}

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    const storage = window.sessionStorage
    storage.getItem(SESSION_COPY_COUNT_KEY)
    return storage
  } catch {
    return null
  }
}

/**
 * Count hosted-snippet copies in this browser tab session.
 * Second copy is the signal that the person needs paste-in-head help,
 * not another identical toast.
 */
export function recordHostedSnippetCopy(): HostedCopyRecord {
  const storage = getSessionStorage()
  if (!storage) {
    return { copyCount: 1, shouldShowInstallHelp: false }
  }

  const prev = parseInt(storage.getItem(SESSION_COPY_COUNT_KEY) || '0', 10)
  const copyCount = (Number.isFinite(prev) ? prev : 0) + 1
  storage.setItem(SESSION_COPY_COUNT_KEY, String(copyCount))

  return { copyCount, shouldShowInstallHelp: copyCount >= 2 }
}

/** Returns true the first time help is shown in this tab session. */
export function markInstallHelpShown(): boolean {
  const storage = getSessionStorage()
  if (!storage) return true
  if (storage.getItem(SESSION_HELP_SHOWN_KEY) === '1') return false
  storage.setItem(SESSION_HELP_SHOWN_KEY, '1')
  return true
}

export function markInstallSnippetCopied(bannerId: string): void {
  if (typeof window === 'undefined' || !bannerId) return
  try {
    localStorage.setItem(`${COPIED_KEY_PREFIX}${bannerId}`, '1')
  } catch {
    // Private mode / quota
  }
}

export function hasInstallSnippetCopied(bannerId: string): boolean {
  if (typeof window === 'undefined' || !bannerId) return false
  try {
    return localStorage.getItem(`${COPIED_KEY_PREFIX}${bannerId}`) === '1'
  } catch {
    return false
  }
}

export function anyInstallSnippetCopied(bannerIds: string[]): boolean {
  return bannerIds.some(hasInstallSnippetCopied)
}

export function isInstallNudgeDismissed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(NUDGE_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

export function dismissInstallNudge(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(NUDGE_DISMISSED_KEY, '1')
  } catch {
    // ignore
  }
}

/**
 * Standalone Accessibility Menu snippet — only for sites that do NOT use the
 * hosted banner.js (the menu already ships inside that). Same id, own endpoint.
 */
export function a11yInstallSnippet(bannerId: string): string {
  const base = (process.env.NEXT_PUBLIC_BASE_URL || 'https://cookie-banner.ca').replace(/\/$/, '')
  return `<script src="${base}/api/v1/a11y.js?id=${bannerId}" async></script>`
}
