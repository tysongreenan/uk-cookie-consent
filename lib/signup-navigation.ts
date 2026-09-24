export const SIGNUP_PATH = '/auth/signup'

type SignupClickEvent = {
  preventDefault: () => void
}

type SignupNavigationDeps = {
  navigate?: (href: string) => void
  fallback?: (href: string) => void
}

/** Header Sign up links preserve the current tools page as callbackUrl. */
export function buildSignupHref(pathname: string): string {
  if (pathname.startsWith('/tools/') || pathname.startsWith('/integrations/ai')) {
    return `${SIGNUP_PATH}?callbackUrl=${encodeURIComponent(pathname)}`
  }
  return SIGNUP_PATH
}

export function assignSignupLocation(href: string = SIGNUP_PATH): void {
  if (typeof window === 'undefined') return
  window.location.assign(href)
}

/**
 * Happy-path signup navigation with a hard fallback.
 * If client routing (or the click handler) throws, send the user to /auth/signup
 * instead of leaving a blank page.
 */
export function handleSignupCtaClick(
  event: SignupClickEvent,
  href: string,
  deps: SignupNavigationDeps = {}
): void {
  const fallback = deps.fallback ?? assignSignupLocation

  try {
    if (deps.navigate) {
      event.preventDefault()
      deps.navigate(href)
      return
    }
  } catch {
    try {
      event.preventDefault()
    } catch {
      // ignore — the fallback navigation is what matters
    }
    fallback(SIGNUP_PATH)
  }
}
