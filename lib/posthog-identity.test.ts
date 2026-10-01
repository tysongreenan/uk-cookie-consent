import { describe, expect, it } from 'vitest'
import {
  planSignupFunnelCaptures,
  resolvePostHogIdentity,
} from './posthog-identity'

const userId = 'ce182b26-d56b-4871-8d62-532f92f40057'
const anonId = '01a0e8f1-16db-744a-a52e-faf85ec4639c'

describe('resolvePostHogIdentity', () => {
  it('uses the database user id, matching posthog.identify(userId)', () => {
    const identity = resolvePostHogIdentity({
      userId,
      browserDistinctId: anonId,
      browserSessionId: 'session-1',
    })

    expect(identity.distinctId).toBe(userId)
    expect(identity.anonDistinctId).toBe(anonId)
    expect(identity.sessionId).toBe('session-1')
  })

  it('does not link a browser id that is already the user id', () => {
    expect(
      resolvePostHogIdentity({ userId, browserDistinctId: userId })
    ).toEqual({ distinctId: userId })
  })

  it('ignores a blank browser id', () => {
    expect(
      resolvePostHogIdentity({ userId, browserDistinctId: '   ' })
    ).toEqual({ distinctId: userId })
  })

  it('does not merge another database user id left over after logout', () => {
    const otherUserId = '32ac1fa3-a783-4d51-a322-f1a6cfca3996'
    expect(
      resolvePostHogIdentity({ userId, browserDistinctId: otherUserId })
    ).toEqual({ distinctId: userId })
  })
})

describe('signup → banner → snippet identity', () => {
  it('puts all three funnel events on the user id and merges the anonymous session', () => {
    const identity = resolvePostHogIdentity({
      userId,
      browserDistinctId: anonId,
      browserSessionId: 'session-1',
    })

    const planned = planSignupFunnelCaptures({
      identity,
      method: 'credentials',
      product: 'banner',
      userId,
      completedProperties: { has_banner_config: false },
      bannerProperties: {
        source: 'builder',
        user_id: userId,
        is_first_banner: true,
      },
    })

    // Client calls identify(userId) on this same browser, then capture('install_snippet_copied').
    const snippetDistinctId = identity.distinctId
    const distinctIds = [...planned.map((event) => event.distinctId), snippetDistinctId]

    expect(new Set(distinctIds)).toEqual(new Set([userId]))
    expect(planned.map((event) => event.event)).toEqual([
      '$identify',
      'signup_completed',
      'banner_created',
    ])
    expect(planned[0]?.properties.$anon_distinct_id).toBe(anonId)
    expect(planned[0]?.properties.$session_id).toBe('session-1')
    expect(planned.some((event) => event.event === 'signup_started')).toBe(false)
  })

  it('emits signup_started on the user id when the browser has no analytics id', () => {
    const identity = resolvePostHogIdentity({ userId })
    const planned = planSignupFunnelCaptures({
      identity,
      method: 'google',
      product: 'banner',
      userId,
      bannerProperties: {
        source: 'signup_pending_config',
        user_id: userId,
        is_first_banner: true,
      },
    })

    expect(planned.map((event) => event.event)).toEqual([
      'signup_started',
      'signup_completed',
      'banner_created',
    ])
    expect(planned.every((event) => event.distinctId === userId)).toBe(true)
    expect(planned.some((event) => '$anon_distinct_id' in event.properties)).toBe(false)
  })
})
