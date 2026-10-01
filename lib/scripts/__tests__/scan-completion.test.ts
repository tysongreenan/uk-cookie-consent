import { describe, expect, it } from 'vitest'

import {
  classifyPageLoad,
  classifyScanError,
  isBlockedInterstitial,
} from '../scan-completion'

const loaded = {
  httpStatus: 200,
  title: 'Example',
  textLength: 4000,
  cookieCount: 3,
  scriptCount: 2,
  bannerDetected: true,
  privacyPolicyUrl: 'https://example.com/privacy',
}

describe('classifyPageLoad', () => {
  it('grades a page that actually rendered', () => {
    expect(classifyPageLoad(loaded)).toEqual({ complete: true })
  })

  it('grades a real site that simply has no cookies when the page has content', () => {
    expect(classifyPageLoad({
      httpStatus: 200,
      title: 'A small charity',
      textLength: 1800,
      cookieCount: 0,
      scriptCount: 0,
      bannerDetected: false,
      privacyPolicyUrl: null,
    })).toEqual({ complete: true })
  })

  it('does not grade an Akamai-style Access Denied response', () => {
    expect(classifyPageLoad({
      httpStatus: 403,
      title: 'Access Denied',
      textLength: 180,
      cookieCount: 0,
      scriptCount: 0,
      bannerDetected: false,
      privacyPolicyUrl: null,
    })).toEqual({ complete: false, reason: 'blocked' })
  })

  it('does not grade a 200 challenge interstitial', () => {
    expect(isBlockedInterstitial('Just a moment...')).toBe(true)
    expect(classifyPageLoad({
      ...loaded,
      httpStatus: 200,
      title: 'Just a moment...',
      cookieCount: 0,
      scriptCount: 0,
      bannerDetected: false,
      privacyPolicyUrl: null,
      textLength: 80,
    })).toEqual({ complete: false, reason: 'blocked' })
  })

  it('does not grade a document that is too small to judge', () => {
    expect(classifyPageLoad({
      httpStatus: 200,
      title: '',
      textLength: 12,
      cookieCount: 0,
      scriptCount: 0,
      bannerDetected: false,
      privacyPolicyUrl: null,
    })).toEqual({ complete: false, reason: 'empty' })
  })

  it('treats 404 and 5xx as unreachable rather than a compliance grade', () => {
    expect(classifyPageLoad({ ...loaded, httpStatus: 404, title: 'Not Found' }).complete).toBe(false)
    expect(classifyPageLoad({ ...loaded, httpStatus: 404, title: 'Not Found' })).toEqual({
      complete: false,
      reason: 'unreachable',
    })
    expect(classifyPageLoad({ ...loaded, httpStatus: 503, title: 'Service Unavailable' })).toEqual({
      complete: false,
      reason: 'unreachable',
    })
  })
})

describe('classifyScanError', () => {
  it('maps navigation failures onto incomplete reasons', () => {
    expect(classifyScanError(new Error('Scan timed out before the page finished loading'))).toBe('timeout')
    expect(classifyScanError(new Error('page.goto: net::ERR_CONNECTION_RESET at https://example.com'))).toBe('unreachable')
    expect(classifyScanError(new Error('No response from target site'))).toBe('unreachable')
    expect(classifyScanError(new Error('Could not resolve hostname: missing.example'))).toBe('unreachable')
    expect(classifyScanError(new Error('browserType.launch: Executable doesn\'t exist'))).toBe('browser_failed')
  })
})
