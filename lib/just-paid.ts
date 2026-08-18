const JUST_PAID_KEY = 'cb-just-paid'

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    const storage = window.sessionStorage
    storage.getItem(JUST_PAID_KEY)
    return storage
  } catch {
    return null
  }
}

/** Mark this tab session as coming from a completed checkout. */
export function markJustPaid(): void {
  const storage = getSessionStorage()
  if (!storage) return
  storage.setItem(JUST_PAID_KEY, '1')
}

export function isJustPaid(): boolean {
  const storage = getSessionStorage()
  if (!storage) return false
  return storage.getItem(JUST_PAID_KEY) === '1'
}

/**
 * Hide Upgrade to Pro after checkout even if the JWT still says free
 * while the Stripe webhook catches up.
 */
export function shouldShowUpgradeCta(planTier?: string | null): boolean {
  if (isJustPaid()) return false
  return !planTier || planTier === 'free'
}
