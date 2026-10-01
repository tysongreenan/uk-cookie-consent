'use client'

import posthog from 'posthog-js'
import {
  isAnonymousDistinctId,
  POSTHOG_DISTINCT_COOKIE,
  POSTHOG_SESSION_COOKIE,
} from '@/lib/posthog-identity'

/**
 * Consent-aware client analytics helpers.
 * Matches the PostHogProvider pattern: only capture after analytics opt-in.
 */

function canCapture(): boolean {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return false
  try {
    return posthog.has_opted_in_capturing()
  } catch {
    return false
  }
}

export function captureEvent(
  event: string,
  properties?: Record<string, unknown>,
  options?: { sendInstantly?: boolean }
): void {
  if (!canCapture()) return
  try {
    // Skip the 3s batch so signup_started is in flight before the Google redirect.
    posthog.capture(
      event,
      properties,
      options?.sendInstantly ? { send_instantly: true } : undefined
    )
  } catch (error) {
    console.error('PostHog capture failed:', error)
  }
}

/**
 * posthog.reset() clears PostHog's own consent flag. If our banner still says
 * analytics is allowed, opt back in so later events are not dropped.
 */
function restoreAnalyticsConsent(): void {
  if (typeof document === 'undefined') return
  const match = document.cookie.match(/(?:^|; )cookie_consent=([^;]+)/)
  if (!match?.[1]) return
  try {
    const consent = JSON.parse(decodeURIComponent(match[1])) as { analytics?: boolean }
    if (!consent.analytics) return
    posthog.opt_in_capturing()
    posthog.set_config({ persistence: 'localStorage+cookie' })
  } catch {
    // malformed consent cookie — leave PostHog opted out
  }
}

/** Drop the identified browser id on sign-out so the next person starts anonymous. */
export function resetPostHogIdentity(): void {
  if (typeof document !== 'undefined') {
    writeIdentityCookie(POSTHOG_DISTINCT_COOKIE, undefined)
    writeIdentityCookie(POSTHOG_SESSION_COOKIE, undefined)
  }
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
  try {
    if (!posthog.has_opted_in_capturing()) return
    posthog.reset()
    restoreAnalyticsConsent()
  } catch (error) {
    console.error('PostHog reset failed:', error)
  }
}

export function identifyUser(
  userId: string,
  traits?: Record<string, unknown>
): boolean {
  if (!canCapture() || !userId) return false
  try {
    const current = posthog.get_distinct_id?.()
    // A leftover database id belongs to whoever was logged in before. Reset
    // so identify() merges this browser's anonymous id, not that other person.
    if (current && current !== userId && !isAnonymousDistinctId(current)) {
      posthog.reset()
      restoreAnalyticsConsent()
    }
    if (!posthog.has_opted_in_capturing()) return false
    posthog.identify(userId, traits)
    return true
  } catch (error) {
    console.error('PostHog identify failed:', error)
    return false
  }
}

export function captureException(
  error: unknown,
  properties?: Record<string, unknown>
): void {
  if (!canCapture()) return
  try {
    const err = error instanceof Error ? error : new Error(String(error))
    if (typeof (posthog as any).captureException === 'function') {
      ;(posthog as any).captureException(err, properties)
    } else {
      posthog.capture('$exception', {
        $exception_message: err.message,
        $exception_type: err.name,
        $exception_stack_trace_raw: err.stack,
        ...properties,
      })
    }
  } catch (captureError) {
    console.error('PostHog exception capture failed:', captureError)
  }
}

function writeIdentityCookie(name: string, value: string | undefined): void {
  if (!value) {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`
    return
  }
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=600; SameSite=Lax`
}

/**
 * Remember the current anonymous id for the next server callback (OAuth / NextAuth),
 * which cannot attach X-POSTHOG-* headers. Only after analytics consent — a
 * memory-only id from an opted-out browser must not become a person.
 * Call this before posthog.identify, while the id is still the anonymous one.
 */
export function stashPostHogIdentity(): void {
  if (typeof document === 'undefined') return
  if (!canCapture()) {
    writeIdentityCookie(POSTHOG_DISTINCT_COOKIE, undefined)
    writeIdentityCookie(POSTHOG_SESSION_COOKIE, undefined)
    return
  }
  try {
    writeIdentityCookie(POSTHOG_DISTINCT_COOKIE, posthog.get_distinct_id?.())
    writeIdentityCookie(POSTHOG_SESSION_COOKIE, posthog.get_session_id?.())
  } catch {
    writeIdentityCookie(POSTHOG_DISTINCT_COOKIE, undefined)
    writeIdentityCookie(POSTHOG_SESSION_COOKIE, undefined)
  }
}

/** Headers so server-side captures can merge this browser. Empty until analytics opt-in. */
export function getPostHogRequestHeaders(): Record<string, string> {
  if (!canCapture()) return {}
  try {
    const distinctId = posthog.get_distinct_id?.()
    const sessionId = posthog.get_session_id?.()
    const headers: Record<string, string> = {}
    if (distinctId) headers['X-POSTHOG-DISTINCT-ID'] = distinctId
    if (sessionId) headers['X-POSTHOG-SESSION-ID'] = sessionId
    return headers
  } catch {
    return {}
  }
}
