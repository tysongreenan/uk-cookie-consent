'use client'

import posthog from 'posthog-js'

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
  properties?: Record<string, unknown>
): void {
  if (!canCapture()) return
  try {
    posthog.capture(event, properties)
  } catch (error) {
    console.error('PostHog capture failed:', error)
  }
}

export function identifyUser(
  userId: string,
  traits?: Record<string, unknown>
): void {
  if (!canCapture()) return
  try {
    posthog.identify(userId, traits)
  } catch (error) {
    console.error('PostHog identify failed:', error)
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

/** Headers so server-side captures share the same person/session as the browser. */
export function getPostHogRequestHeaders(): Record<string, string> {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return {}
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
