import { PostHog } from 'posthog-node'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import {
  POSTHOG_DISTINCT_COOKIE,
  POSTHOG_SESSION_COOKIE,
  planServerCapture,
  resolvePostHogIdentity,
  type PlannedCapture,
  type PostHogIdentity,
} from '@/lib/posthog-identity'

export { planServerCapture, planSignupFunnelCaptures, resolvePostHogIdentity } from '@/lib/posthog-identity'
export type { PlannedCapture, PostHogIdentity } from '@/lib/posthog-identity'

/**
 * Server-side PostHog client for API routes / auth callbacks.
 * flushAt: 1 + flushInterval: 0 so short-lived serverless handlers send immediately.
 */
export function getPostHogServer(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return null

  return new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  })
}

type HeaderSource = { headers: { get(name: string): string | null } }

function readCookie(name: string): string | undefined {
  try {
    const raw = cookies().get(name)?.value
    if (!raw) return undefined
    return decodeURIComponent(raw).trim() || undefined
  } catch {
    return undefined
  }
}

/**
 * Anonymous id from the consented browser. Header wins; the short-lived cookie
 * covers OAuth and NextAuth callbacks that cannot set custom headers.
 */
export function readBrowserPostHogContext(request?: HeaderSource | null): {
  browserDistinctId?: string
  browserSessionId?: string
} {
  const headerDistinct = request?.headers.get('x-posthog-distinct-id')?.trim() || undefined
  const headerSession = request?.headers.get('x-posthog-session-id')?.trim() || undefined

  return {
    browserDistinctId: headerDistinct || readCookie(POSTHOG_DISTINCT_COOKIE),
    browserSessionId: headerSession || readCookie(POSTHOG_SESSION_COOKIE),
  }
}

/** Canonical person for a signed-in user: DB id, plus the anonymous id to merge. */
export function identityForUser(
  userId: string,
  request?: HeaderSource | NextRequest | null
): PostHogIdentity {
  const browser = readBrowserPostHogContext(request)
  return resolvePostHogIdentity({
    userId,
    browserDistinctId: browser.browserDistinctId,
    browserSessionId: browser.browserSessionId,
  })
}

/**
 * Prefer the browser distinct id only when there is no user yet.
 * Authenticated events must use identityForUser so they match posthog.identify.
 */
export function getPostHogDistinctId(
  request: NextRequest | null | undefined,
  fallbackDistinctId: string
): string {
  const fromHeader = request?.headers.get('x-posthog-distinct-id')?.trim()
  return fromHeader || fallbackDistinctId
}

export function getPostHogSessionId(
  request: NextRequest | null | undefined
): string | undefined {
  return request?.headers.get('x-posthog-session-id')?.trim() || undefined
}

type CaptureArgs = {
  distinctId: string
  event: string
  properties?: Record<string, unknown>
  sessionId?: string
  anonDistinctId?: string
}

export async function capturePlanned(events: PlannedCapture[]): Promise<void> {
  if (events.length === 0) return
  const client = getPostHogServer()
  if (!client) return

  try {
    for (const planned of events) {
      client.capture({
        distinctId: planned.distinctId,
        event: planned.event,
        properties: planned.properties,
      })
    }
    await client.shutdown()
  } catch (error) {
    console.error('PostHog server capture failed:', error)
    try {
      await client.shutdown()
    } catch {
      // ignore shutdown errors
    }
  }
}

/**
 * Fire-and-forget server capture. Never throws into the request path.
 * Pass anonDistinctId to merge the pre-signup browser into distinctId.
 */
export async function captureServerEvent(args: CaptureArgs): Promise<void> {
  await capturePlanned(planServerCapture(args))
}

/**
 * Capture an exception on the server without blocking the request.
 */
export async function captureServerException(
  error: unknown,
  distinctId: string,
  properties?: Record<string, unknown>
): Promise<void> {
  const client = getPostHogServer()
  if (!client) return

  try {
    const err = error instanceof Error ? error : new Error(String(error))
    client.capture({
      distinctId,
      event: '$exception',
      properties: {
        $exception_message: err.message,
        $exception_type: err.name,
        $exception_stack_trace_raw: err.stack,
        ...properties,
      },
    })
    await client.shutdown()
  } catch (captureError) {
    console.error('PostHog server exception capture failed:', captureError)
    try {
      await client.shutdown()
    } catch {
      // ignore
    }
  }
}
