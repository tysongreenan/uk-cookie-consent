'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * PostHog Provider — consent-aware analytics
 *
 * PostHog only starts tracking AFTER the visitor grants analytics consent
 * via the cookie banner. This respects GDPR, PIPEDA, and Law 25.
 *
 * Flow:
 * 1. PostHog loads in "pending" mode (persistence disabled, no cookies)
 * 2. Cookie banner fires consent callback via window.__cbConsentCallbacks
 * 3. If analytics consent granted → PostHog opts in and starts tracking
 * 4. If analytics consent denied → PostHog stays opted out
 * 5. On subsequent visits, checks existing consent cookie
 */

declare global {
  interface Window {
    __cbConsentCallbacks?: Array<(consent: { analytics: boolean; marketing: boolean; functionality: boolean }) => void>
  }
}

function getExistingConsent(): { analytics: boolean } | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/cookie_consent=([^;]+)/)
  if (!match) return null
  try {
    const consent = JSON.parse(decodeURIComponent(match[1]))
    return { analytics: !!consent.analytics }
  } catch {
    return null
  }
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || initialized.current) return
    initialized.current = true

    // Init PostHog in a consent-safe way — no cookies until consent
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      capture_pageview: false,
      capture_pageleave: true,
      persistence: 'memory', // No cookies until consent
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug()

        // Check if user already consented on a previous visit
        const existing = getExistingConsent()
        if (existing?.analytics) {
          ph.opt_in_capturing()
          ph.set_config({ persistence: 'localStorage+cookie' })
          // Capture the first pageview that PostHogPageView would miss
          // (it fires before init completes, so has_opted_in returns false)
          ph.capture('$pageview', { $current_url: window.location.href })
        } else {
          ph.opt_out_capturing() // Stay silent until consent
        }
      },
    })

    // Listen for consent changes from the cookie banner
    window.__cbConsentCallbacks = window.__cbConsentCallbacks || []
    window.__cbConsentCallbacks.push((consent) => {
      if (consent.analytics) {
        posthog.opt_in_capturing()
        posthog.set_config({ persistence: 'localStorage+cookie' })
        // Capture the pageview that was missed while waiting for consent
        posthog.capture('$pageview', { $current_url: window.location.href })
      } else {
        posthog.opt_out_capturing()
      }
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

// Track SPA page views on route change (only fires if opted in)
export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    if (!posthog.has_opted_in_capturing()) return

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}

// Identify user after NextAuth sign-in (only if opted in)
export function PostHogIdentify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    if (!posthog.has_opted_in_capturing()) return
    if (!session?.user) return

    const user = session.user as any
    posthog.identify(user.id, {
      email: user.email,
      name: user.name,
      plan: user.planTier || 'free',
    })
  }, [session])

  return null
}
