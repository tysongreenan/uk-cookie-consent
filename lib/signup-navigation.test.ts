import { describe, expect, it, vi } from 'vitest'
import {
  SIGNUP_PATH,
  buildSignupHref,
  handleSignupCtaClick,
} from './signup-navigation'

describe('buildSignupHref', () => {
  it('keeps the cookie-scanner path as callbackUrl for the header Signup CTA', () => {
    expect(buildSignupHref('/tools/cookie-scanner')).toBe(
      '/auth/signup?callbackUrl=%2Ftools%2Fcookie-scanner'
    )
  })

  it('adds a callback for other free tools', () => {
    expect(buildSignupHref('/tools/privacy-policy')).toBe(
      '/auth/signup?callbackUrl=%2Ftools%2Fprivacy-policy'
    )
  })

  it('uses the canonical signup route from marketing pages', () => {
    expect(buildSignupHref('/')).toBe(SIGNUP_PATH)
    expect(buildSignupHref('/pricing')).toBe(SIGNUP_PATH)
  })
})

describe('handleSignupCtaClick', () => {
  it('navigates to the cookie-scanner signup href on the happy path', () => {
    const href = buildSignupHref('/tools/cookie-scanner')
    const preventDefault = vi.fn()
    const navigate = vi.fn()
    const fallback = vi.fn()

    handleSignupCtaClick({ preventDefault }, href, { navigate, fallback })

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(href)
    expect(fallback).not.toHaveBeenCalled()
  })

  it('falls back to /auth/signup when signup navigation throws', () => {
    const href = buildSignupHref('/tools/cookie-scanner')
    const preventDefault = vi.fn()
    const navigate = vi.fn(() => {
      throw new Error('client navigation failed')
    })
    const fallback = vi.fn()

    handleSignupCtaClick({ preventDefault }, href, { navigate, fallback })

    expect(fallback).toHaveBeenCalledWith(SIGNUP_PATH)
    expect(fallback).not.toHaveBeenCalledWith(href)
  })

  it('lets the default Link navigation proceed when no navigate fn is provided', () => {
    const preventDefault = vi.fn()
    const fallback = vi.fn()

    handleSignupCtaClick(
      { preventDefault },
      buildSignupHref('/tools/cookie-scanner'),
      { fallback }
    )

    expect(preventDefault).not.toHaveBeenCalled()
    expect(fallback).not.toHaveBeenCalled()
  })
})
