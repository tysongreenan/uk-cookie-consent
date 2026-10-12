import { describe, expect, it } from 'vitest'
import { classifyCookie } from '../cookie-classifier'
import type { BrowserCookie } from '../scan-website-headless'

function cookie(name: string, domain = '.example.com'): BrowserCookie {
  return {
    name,
    value: '',
    domain,
    path: '/',
    expires: -1,
    httpOnly: false,
    secure: true,
    sameSite: 'Lax',
  }
}

describe('cookie-classifier catalog', () => {
  it('names Chartbeat, Optimizely, Permutive, and Piano instead of Unknown', () => {
    expect(classifyCookie(cookie('_chartbeat2'), 'bbc.co.uk').source).toBe('Chartbeat')
    expect(classifyCookie(cookie('optimizelyEndUserId'), 'shop.example.com').source).toBe('Optimizely')
    expect(classifyCookie(cookie('permutive-id'), 'news.example.com').source).toBe('Permutive')
    expect(classifyCookie(cookie('_pcid'), 'publisher.example.com').source).toBe('Piano')
  })
})
