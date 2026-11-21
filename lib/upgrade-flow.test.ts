import { describe, expect, it } from 'vitest'
import {
  authUrlForUpgrade,
  resolveBillingCycle,
  shouldAutoStartCheckout,
  upgradeReturnPath,
} from './upgrade-flow'
import { resolveSignupCallbackUrl } from './signup-form'

describe('resolveBillingCycle', () => {
  it('defaults to lifetime', () => {
    expect(resolveBillingCycle(null)).toBe('one_time')
    expect(resolveBillingCycle('')).toBe('one_time')
    expect(resolveBillingCycle('one_time')).toBe('one_time')
    expect(resolveBillingCycle('junk')).toBe('one_time')
  })

  it('keeps annual when asked for', () => {
    expect(resolveBillingCycle('annual')).toBe('annual')
  })
})

describe('authUrlForUpgrade', () => {
  it('keeps the plan and the auto-checkout flag through sign-in and sign-up', () => {
    for (const kind of ['signin', 'signup'] as const) {
      const url = new URL(authUrlForUpgrade(kind, 'annual'), 'https://x.test')
      expect(url.pathname).toBe(`/auth/${kind}`)
      expect(url.searchParams.get('callbackUrl')).toBe('/upgrade?billing=annual&checkout=1')
    }
  })

  it('produces a callback the sign-up page accepts unchanged', () => {
    const path = upgradeReturnPath('one_time')
    expect(resolveSignupCallbackUrl(path)).toBe(path)
  })
})

describe('shouldAutoStartCheckout', () => {
  const base = { checkoutParam: '1', signedIn: true, planTier: 'free', billing: 'one_time' as const }

  it('starts checkout for a free user coming back from auth', () => {
    expect(shouldAutoStartCheckout(base)).toBe(true)
    expect(shouldAutoStartCheckout({ ...base, planTier: null })).toBe(true)
  })

  it('does nothing without the flag or a session', () => {
    expect(shouldAutoStartCheckout({ ...base, checkoutParam: null })).toBe(false)
    expect(shouldAutoStartCheckout({ ...base, signedIn: false })).toBe(false)
  })

  it('does not re-sell a plan the user already has', () => {
    expect(shouldAutoStartCheckout({ ...base, planTier: 'pro_lifetime' })).toBe(false)
    expect(shouldAutoStartCheckout({ ...base, planTier: 'pro_annual', billing: 'annual' })).toBe(false)
  })

  it('lets a lifetime owner continue to annual', () => {
    expect(shouldAutoStartCheckout({ ...base, planTier: 'pro_lifetime', billing: 'annual' })).toBe(true)
  })
})
