import { describe, expect, it } from 'vitest'
import {
  DEFAULT_SIGNUP_CALLBACK,
  getPasswordRuleStates,
  getSignupFieldErrors,
  isSignupFormValid,
  resolveSignupCallbackUrl,
} from './signup-form'

const validInput = {
  name: 'Jamie Monastyrski',
  email: 'jamie@example.com',
  password: 'ValidPass1',
  agreeToTerms: true,
}

describe('getPasswordRuleStates', () => {
  it('shows every rule unmet on an empty password', () => {
    expect(getPasswordRuleStates('').every((rule) => !rule.met)).toBe(true)
  })

  it('marks lowercase as unmet when the password is only uppercase and digits', () => {
    const states = getPasswordRuleStates('PASSWORD1')
    expect(states.find((rule) => rule.id === 'lower')?.met).toBe(false)
    expect(states.find((rule) => rule.id === 'upper')?.met).toBe(true)
    expect(states.find((rule) => rule.id === 'number')?.met).toBe(true)
  })

  it('marks all rules met for a valid password', () => {
    expect(getPasswordRuleStates('ValidPass1').every((rule) => rule.met)).toBe(true)
  })
})

describe('getSignupFieldErrors', () => {
  it('returns a field-level password error when lowercase is missing', () => {
    const errors = getSignupFieldErrors({
      ...validInput,
      password: 'PASSWORD1',
    })
    expect(errors.password).toMatch(/lowercase/i)
    expect(isSignupFormValid({ ...validInput, password: 'PASSWORD1' })).toBe(false)
  })

  it('returns a terms error when the checkbox is unchecked', () => {
    const errors = getSignupFieldErrors({ ...validInput, agreeToTerms: false })
    expect(errors.terms).toMatch(/terms/i)
  })

  it('returns no errors for a complete valid form', () => {
    expect(getSignupFieldErrors(validInput)).toEqual({})
    expect(isSignupFormValid(validInput)).toBe(true)
  })
})

describe('resolveSignupCallbackUrl', () => {
  it('defaults cookie-banner signups to the builder', () => {
    expect(resolveSignupCallbackUrl(null)).toBe('/dashboard/builder')
    expect(resolveSignupCallbackUrl(undefined)).toBe(DEFAULT_SIGNUP_CALLBACK)
    expect(resolveSignupCallbackUrl('https://evil.example')).toBe('/dashboard/builder')
    expect(resolveSignupCallbackUrl('//evil.example')).toBe('/dashboard/builder')
  })

  it('keeps privacy, upgrade, and tool callbacks', () => {
    expect(resolveSignupCallbackUrl('/upgrade')).toBe('/upgrade')
    expect(resolveSignupCallbackUrl('/tools/privacy-policy')).toBe('/tools/privacy-policy')
    expect(resolveSignupCallbackUrl('/dashboard/privacy')).toBe('/dashboard/privacy')
    expect(resolveSignupCallbackUrl('/tools/cookie-policy')).toBe('/tools/cookie-policy')
  })
})
