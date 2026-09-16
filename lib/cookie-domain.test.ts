import { describe, expect, it } from 'vitest'
import type { BannerConfig } from '@/types'
import { generateBannerJS } from '@/lib/banner-generator'
import { generateTcfCmpApiCode } from '@/lib/tcf/cmp-api'
import {
  cookieDomainProbeCandidates,
  cookieDomainRuntimeJs,
  isCookieDomainAllowed,
  normalizeCookieDomain,
  resolveCookieDomain,
  serializeCookieDomainConfig,
} from '@/lib/cookie-domain'

describe('normalizeCookieDomain', () => {
  it('accepts a bare registrable domain', () => {
    expect(normalizeCookieDomain('dal.ca')).toBe('dal.ca')
  })

  it('strips scheme, path, port, and leading dots', () => {
    expect(normalizeCookieDomain('https://.DAL.CA:443/path')).toBe('dal.ca')
    expect(normalizeCookieDomain('.dal.ca.')).toBe('dal.ca')
  })

  it('rejects public-suffix-looking single labels and junk', () => {
    expect(normalizeCookieDomain('ca')).toBeNull()
    expect(normalizeCookieDomain('localhost')).toBeNull()
    expect(normalizeCookieDomain("dal.ca'; evil")).toBeNull()
    expect(normalizeCookieDomain('')).toBeNull()
    expect(normalizeCookieDomain(null)).toBeNull()
  })
})

describe('isCookieDomainAllowed', () => {
  it('allows a parent domain on university-style subdomains', () => {
    expect(isCookieDomainAllowed('dal.ca', 'www.dal.ca')).toBe(true)
    expect(isCookieDomainAllowed('dal.ca', 'medicine.dal.ca')).toBe(true)
    expect(isCookieDomainAllowed('dal.ca', 'libraries.dal.ca')).toBe(true)
    expect(isCookieDomainAllowed('dal.ca', 'dal.ca')).toBe(true)
  })

  it('treats a trailing FQDN dot as the same host', () => {
    expect(isCookieDomainAllowed('dal.ca', 'medicine.dal.ca.')).toBe(true)
    expect(isCookieDomainAllowed('dal.ca.', 'www.dal.ca')).toBe(true)
  })

  it('rejects a domain that is not a suffix of the hostname', () => {
    expect(isCookieDomainAllowed('dal.ca', 'example.com')).toBe(false)
    expect(isCookieDomainAllowed('evil.com', 'medicine.dal.ca')).toBe(false)
    expect(isCookieDomainAllowed('dal.ca', 'notdal.ca')).toBe(false)
  })

  it('rejects localhost and IPs', () => {
    expect(isCookieDomainAllowed('dal.ca', 'localhost')).toBe(false)
    expect(isCookieDomainAllowed('127.0.0.1', '127.0.0.1')).toBe(false)
  })
})

describe('cookieDomainProbeCandidates', () => {
  it('tries the parent before the full host', () => {
    expect(cookieDomainProbeCandidates('medicine.dal.ca')).toEqual([
      'dal.ca',
      'medicine.dal.ca',
    ])
    expect(cookieDomainProbeCandidates('www.dal.ca')).toEqual(['dal.ca', 'www.dal.ca'])
    expect(cookieDomainProbeCandidates('medicine.dal.ca.')).toEqual([
      'dal.ca',
      'medicine.dal.ca',
    ])
  })

  it('keeps multi-part TLD hosts ordered shortest-first so the probe can skip co.uk', () => {
    expect(cookieDomainProbeCandidates('www.example.co.uk')).toEqual([
      'co.uk',
      'example.co.uk',
      'www.example.co.uk',
    ])
  })
})

describe('resolveCookieDomain', () => {
  it('lets CookieBannerOptions.domain win when it is a legal parent', () => {
    expect(
      resolveCookieDomain({
        hostname: 'medicine.dal.ca',
        mode: 'host',
        runtimeDomain: 'dal.ca',
        settableDomains: ['dal.ca', 'medicine.dal.ca'],
      }),
    ).toBe('dal.ca')
  })

  it('ignores a runtime domain the browser would refuse to set', () => {
    expect(
      resolveCookieDomain({
        hostname: 'www.example.co.uk',
        runtimeDomain: 'co.uk',
        settableDomains: ['example.co.uk', 'www.example.co.uk'],
      }),
    ).toBe('example.co.uk')
  })

  it('ignores a runtime domain on a different site', () => {
    expect(
      resolveCookieDomain({
        hostname: 'medicine.dal.ca',
        runtimeDomain: 'evil.com',
        settableDomains: ['dal.ca', 'medicine.dal.ca'],
      }),
    ).toBe('dal.ca')
  })

  it('uses the first settable parent in auto mode (Hugh / Dalhousie)', () => {
    expect(
      resolveCookieDomain({
        hostname: 'www.dal.ca',
        mode: 'auto',
        settableDomains: ['dal.ca', 'www.dal.ca'],
      }),
    ).toBe('dal.ca')
  })

  it('skips public suffixes the browser would reject (co.uk)', () => {
    expect(
      resolveCookieDomain({
        hostname: 'www.example.co.uk',
        mode: 'auto',
        settableDomains: ['example.co.uk', 'www.example.co.uk'],
      }),
    ).toBe('example.co.uk')
  })

  it('stays host-only when asked', () => {
    expect(
      resolveCookieDomain({
        hostname: 'www.dal.ca',
        mode: 'host',
        settableDomains: ['dal.ca', 'www.dal.ca'],
      }),
    ).toBe('')
  })

  it('honors a custom parent', () => {
    expect(
      resolveCookieDomain({
        hostname: 'a.b.dal.ca',
        mode: 'custom',
        custom: 'dal.ca',
        settableDomains: ['dal.ca', 'b.dal.ca', 'a.b.dal.ca'],
      }),
    ).toBe('dal.ca')
  })
})

describe('serializeCookieDomainConfig', () => {
  it('defaults missing config to auto', () => {
    expect(serializeCookieDomainConfig(undefined)).toEqual({ mode: 'auto', custom: '' })
    expect(serializeCookieDomainConfig({})).toEqual({ mode: 'auto', custom: '' })
  })

  it('drops an empty custom domain back to auto', () => {
    expect(
      serializeCookieDomainConfig({ cookieDomainMode: 'custom', cookieDomain: 'nope' }),
    ).toEqual({ mode: 'auto', custom: '' })
  })
})

function banner(overrides: Partial<BannerConfig> = {}): BannerConfig {
  return {
    compliance: {} as BannerConfig['compliance'],
    name: 'Test',
    position: 'bottom',
    theme: 'light',
    colors: { background: '#fff', text: '#111', button: '#3b82f6', buttonText: '#ffffff', link: '#3b82f6' },
    language: 'en',
    text: { title: '', message: '', acceptButton: '', rejectButton: '', preferencesButton: '' },
    behavior: { autoShow: true, dismissOnScroll: false, showPreferences: true, cookieExpiry: 365 },
    branding: {
      logo: { enabled: false, url: '', position: 'left', maxWidth: 120, maxHeight: 40 },
      privacyPolicy: { url: '', text: '', openInNewTab: true, required: false },
      footerLink: { enabled: true, text: 'Cookie Settings', position: 'floating', floatingPosition: 'bottom-left', style: 'floating' },
    },
    layout: { width: 'full', borderRadius: 8, padding: 20, margin: 20, shadow: 'medium', animation: 'fade' },
    scripts: { strictlyNecessary: [], functionality: [], trackingPerformance: [], targetingAdvertising: [] },
    advanced: { googleConsentMode: true, customCSS: '', customJS: '' },
    ...overrides,
  }
}

describe('generated banner.js', () => {
  it('ships auto subdomain sharing and honors CookieBannerOptions.domain', () => {
    const js = generateBannerJS(banner())
    expect(js).toContain('CookieBannerOptions')
    expect(js).toContain('COOKIE_DOMAIN_MODE = "auto"')
    expect(js).toContain('; Domain=')
    expect(js).toContain('__cbGetCookieDomain')
    expect(js).toContain(cookieDomainRuntimeJs('auto', '').slice(0, 40))
    expect(() => new Function(js)).not.toThrow()
  })

  it('bakes a sanitized custom domain into the script', () => {
    const js = generateBannerJS(
      banner({
        behavior: {
          autoShow: true,
          dismissOnScroll: false,
          showPreferences: true,
          cookieExpiry: 365,
          cookieDomainMode: 'custom',
          cookieDomain: 'dal.ca',
        },
      }),
    )
    expect(js).toContain('COOKIE_DOMAIN_MODE = "custom"')
    expect(js).toContain('COOKIE_DOMAIN_CUSTOM = "dal.ca"')
    expect(js).not.toContain("dal.ca';")
  })

  it('can force host-only cookies', () => {
    const js = generateBannerJS(
      banner({
        behavior: {
          autoShow: true,
          dismissOnScroll: false,
          showPreferences: true,
          cookieExpiry: 365,
          cookieDomainMode: 'host',
        },
      }),
    )
    expect(js).toContain('COOKIE_DOMAIN_MODE = "host"')
  })

  it('applies the shared domain to the TCF cookie too', () => {
    const js = generateTcfCmpApiCode({
      enabled: true,
      cmpId: 1,
      cmpVersion: 1,
      publisherCountryCode: 'CA',
      purposeIds: [1],
      specialFeatureIds: [],
      vendorIds: [],
      publisherRestrictions: [],
      showVendorList: false,
      storeConsentGlobally: false,
    })
    expect(js).toContain('__cbGetCookieDomain')
    expect(js).toContain('; Domain=')
  })
})
