/**
 * PostHog person identity shared by the browser and the server.
 *
 * After signup or login the browser calls posthog.identify(userId) with the
 * database user id. Server captures must use that same id. When the request
 * still carries the pre-signup anonymous id, we emit $identify with
 * $anon_distinct_id so PostHog merges that browser person in — not whatever
 * id a later page load happens to mint.
 */

export const POSTHOG_DISTINCT_COOKIE = 'cb_ph_distinct_id'
export const POSTHOG_SESSION_COOKIE = 'cb_ph_session_id'

export type PostHogIdentity = {
  /** Distinct id the client uses after posthog.identify (the DB user id). */
  distinctId: string
  /** Anonymous browser id to merge, when it is different from distinctId. */
  anonDistinctId?: string
  sessionId?: string
}

export type PlannedCapture = {
  distinctId: string
  event: string
  properties: Record<string, unknown>
}

function clean(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

/** posthog-js anonymous ids are UUID v7. Database user ids are UUID v4. */
const ANONYMOUS_DISTINCT_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isAnonymousDistinctId(id: string | undefined): boolean {
  return !!id && ANONYMOUS_DISTINCT_ID.test(id)
}

export function resolvePostHogIdentity(input: {
  userId: string
  browserDistinctId?: string | null
  browserSessionId?: string | null
}): PostHogIdentity {
  const distinctId = input.userId.trim()
  const browserDistinctId = clean(input.browserDistinctId)
  const sessionId = clean(input.browserSessionId)
  const anonDistinctId =
    isAnonymousDistinctId(browserDistinctId) && browserDistinctId !== distinctId
      ? browserDistinctId
      : undefined

  return {
    distinctId,
    ...(anonDistinctId ? { anonDistinctId } : {}),
    ...(sessionId ? { sessionId } : {}),
  }
}

/**
 * Captures to send for one server event.
 * $identify is first so the anonymous person is linked to the user id.
 */
export function planServerCapture(args: {
  distinctId: string
  event: string
  properties?: Record<string, unknown>
  sessionId?: string
  anonDistinctId?: string
}): PlannedCapture[] {
  const distinctId = args.distinctId.trim()
  if (!distinctId) return []

  const sessionId = clean(args.sessionId)
  const anonDistinctId = clean(args.anonDistinctId)
  const sessionProps = sessionId ? { $session_id: sessionId } : {}
  const planned: PlannedCapture[] = []

  if (anonDistinctId && anonDistinctId !== distinctId) {
    planned.push({
      distinctId,
      event: '$identify',
      properties: {
        $anon_distinct_id: anonDistinctId,
        ...sessionProps,
      },
    })
  }

  planned.push({
    distinctId,
    event: args.event,
    properties: {
      ...args.properties,
      ...sessionProps,
      $lib: 'posthog-node',
    },
  })

  return planned
}

/**
 * signup_started is captured in the browser when analytics consent is on.
 * When it is not, the server emits signup_started itself so the event exists
 * on the same person as signup_completed. Event names stay unchanged.
 */
export function planSignupFunnelCaptures(args: {
  identity: PostHogIdentity
  method: string
  product: string
  userId: string
  completedProperties?: Record<string, unknown>
  bannerProperties?: Record<string, unknown>
}): PlannedCapture[] {
  const { identity } = args
  const startedProps = {
    method: args.method,
    product: args.product,
    user_id: args.userId,
  }
  const planned: PlannedCapture[] = []

  if (!identity.anonDistinctId) {
    planned.push(
      ...planServerCapture({
        distinctId: identity.distinctId,
        event: 'signup_started',
        sessionId: identity.sessionId,
        properties: startedProps,
      })
    )
  }

  planned.push(
    ...planServerCapture({
      distinctId: identity.distinctId,
      event: 'signup_completed',
      sessionId: identity.sessionId,
      anonDistinctId: identity.anonDistinctId,
      properties: {
        ...startedProps,
        ...args.completedProperties,
      },
    })
  )

  if (args.bannerProperties) {
    planned.push(
      ...planServerCapture({
        distinctId: identity.distinctId,
        event: 'banner_created',
        sessionId: identity.sessionId,
        properties: args.bannerProperties,
      })
    )
  }

  return planned
}
