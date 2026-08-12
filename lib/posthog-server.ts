import { PostHog } from 'posthog-node'
import type { NextRequest } from 'next/server'

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
}

/**
 * Fire-and-forget server capture. Never throws into the request path.
 */
export async function captureServerEvent({
  distinctId,
  event,
  properties,
  sessionId,
}: CaptureArgs): Promise<void> {
  const client = getPostHogServer()
  if (!client) return

  try {
    client.capture({
      distinctId,
      event,
      properties: {
        ...properties,
        ...(sessionId ? { $session_id: sessionId } : {}),
        $lib: 'posthog-node',
      },
    })
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
