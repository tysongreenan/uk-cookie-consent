import { describe, expect, it } from 'vitest'
import { cookieDomainRuntimeJs, type CookieDomainMode } from '@/lib/cookie-domain'

/**
 * Browser-ish cookie jar. Enforces Domain matching and a small public-suffix
 * list so these tests catch the bugs jsdom would hide (jsdom ignores Domain).
 */
const PUBLIC_SUFFIXES = new Set([
  'com',
  'ca',
  'uk',
  'net',
  'org',
  'io',
  'co.uk',
  'ac.uk',
  'github.io',
  'herokuapp.com',
])

type Stored = {
  name: string
  value: string
  hostOnly: boolean
  domain: string
  path: string
  expires: number | null
  secure: boolean
}

function parseSetCookie(raw: string) {
  const parts = raw.split(';').map((p) => p.trim())
  const [nv, ...attrs] = parts
  const eq = nv.indexOf('=')
  const name = eq === -1 ? nv : nv.slice(0, eq)
  const value = eq === -1 ? '' : nv.slice(eq + 1)
  const parsed: {
    name: string
    value: string
    domain?: string
    path: string
    expires: number | null
    secure: boolean
    sameSite?: string
  } = { name, value, path: '/', expires: null, secure: false }
  for (const attr of attrs) {
    const [k, ...rest] = attr.split('=')
    const key = k.trim().toLowerCase()
    const v = rest.join('=').trim()
    if (key === 'domain') parsed.domain = v.replace(/^\./, '').toLowerCase()
    else if (key === 'path') parsed.path = v || '/'
    else if (key === 'expires') parsed.expires = Date.parse(v)
    else if (key === 'max-age') parsed.expires = Date.now() + Number(v) * 1000
    else if (key === 'secure') parsed.secure = true
    else if (key === 'samesite') parsed.sameSite = v
  }
  return parsed
}

class CookieJar {
  store: Stored[] = []
  host = 'www.dal.ca'
  protocol = 'https:'
  probeSets = 0

  visible(): Stored[] {
    const now = Date.now()
    const host = this.host.replace(/\.+$/, '').toLowerCase()
    return this.store.filter((c) => {
      if (c.expires !== null && c.expires <= now) return false
      if (c.secure && this.protocol !== 'https:') return false
      if (c.hostOnly) return c.domain === host
      return host === c.domain || host.endsWith('.' + c.domain)
    })
  }

  get cookie() {
    return this.visible()
      .map((c) => c.name + '=' + c.value)
      .join('; ')
  }

  set cookie(raw: string) {
    const parsed = parseSetCookie(raw)
    const host = this.host.replace(/\.+$/, '').toLowerCase()
    let hostOnly = true
    let domain = host
    if (parsed.name === '__cb_dom_t' && parsed.value === '1') this.probeSets += 1
    if (parsed.domain) {
      if (PUBLIC_SUFFIXES.has(parsed.domain)) return
      if (!(host === parsed.domain || host.endsWith('.' + parsed.domain))) return
      hostOnly = false
      domain = parsed.domain
    }
    const expired = parsed.expires !== null && parsed.expires <= Date.now()
    this.store = this.store.filter((c) => {
      const same =
        c.name === parsed.name &&
        c.path === parsed.path &&
        c.hostOnly === hostOnly &&
        c.domain === domain
      return !same
    })
    if (expired) return
    this.store.push({
      name: parsed.name,
      value: parsed.value,
      hostOnly,
      domain,
      path: parsed.path,
      expires: parsed.expires,
      secure: parsed.secure,
    })
  }

  cookiesNamed(name: string) {
    return this.store.filter((c) => c.name === name)
  }
}

type Harness = {
  jar: CookieJar
  getCookieDomain: () => string
  setCookie: (name: string, value: string, days: number) => void
  getCookie: (name: string) => string | null
  window: { CookieBannerOptions?: { domain?: string }; __cbGetCookieDomain?: () => string }
}

function boot(options: {
  host: string
  mode?: CookieDomainMode
  custom?: string
  runtimeDomain?: string
  protocol?: string
}): Harness {
  const jar = new CookieJar()
  jar.host = options.host
  jar.protocol = options.protocol ?? 'https:'
  const windowObj: Harness['window'] = {}
  if (options.runtimeDomain !== undefined) {
    windowObj.CookieBannerOptions = { domain: options.runtimeDomain }
  }
  const location = { hostname: options.host, protocol: jar.protocol }
  const document = {
    get cookie() {
      return jar.cookie
    },
    set cookie(v: string) {
      jar.cookie = v
    },
  }
  const body = `${cookieDomainRuntimeJs(options.mode ?? 'auto', options.custom ?? '')}\nreturn { getCookieDomain: getCookieDomain, setCookie: setCookie, getCookie: getCookie };`
  const fn = new Function('window', 'document', 'location', body)
  const api = fn(windowObj, document, location) as {
    getCookieDomain: () => string
    setCookie: (name: string, value: string, days: number) => void
    getCookie: (name: string) => string | null
  }
  return { jar, window: windowObj, ...api }
}

const CONSENT = JSON.stringify({ essential: true, analytics: true, marketing: false })

function consentBody(raw: string | null) {
  if (!raw) return null
  const parsed = JSON.parse(raw) as Record<string, unknown>
  const { _dom: _ignored, ...rest } = parsed
  return rest
}

describe('runtime cookie jar (Hugh / Dalhousie)', () => {
  it('accepts on www.dal.ca and is already granted on medicine and libraries', () => {
    const www = boot({ host: 'www.dal.ca', runtimeDomain: 'dal.ca' })
    expect(www.getCookieDomain()).toBe('dal.ca')
    www.setCookie('cookie_consent', CONSENT, 12)

    const stored = www.jar.cookiesNamed('cookie_consent')
    expect(stored).toHaveLength(1)
    expect(stored[0].hostOnly).toBe(false)
    expect(stored[0].domain).toBe('dal.ca')

    const medicine = boot({ host: 'medicine.dal.ca', runtimeDomain: 'dal.ca' })
    medicine.jar.store = www.jar.store
    expect(consentBody(medicine.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))

    const libraries = boot({ host: 'libraries.dal.ca' })
    libraries.jar.store = www.jar.store
    expect(consentBody(libraries.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))
    expect(libraries.getCookieDomain()).toBe('dal.ca')
  })

  it('shares across subdomains even without CookieBannerOptions (auto default)', () => {
    const www = boot({ host: 'www.dal.ca' })
    www.setCookie('cookie_consent', CONSENT, 182)
    const medicine = boot({ host: 'medicine.dal.ca' })
    medicine.jar.store = www.jar.store
    expect(consentBody(medicine.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))
  })

  it('skips the domain probe on later loads when _dom is already stored', () => {
    const first = boot({ host: 'www.example.com' })
    first.setCookie('cookie_consent', CONSENT, 182)
    expect(JSON.parse(first.getCookie('cookie_consent')!)._dom).toBe('example.com')
    expect(first.jar.probeSets).toBeGreaterThan(0)

    const second = boot({ host: 'shop.example.com' })
    second.jar.store = first.jar.store
    second.jar.probeSets = 0
    expect(second.getCookieDomain()).toBe('example.com')
    expect(second.jar.probeSets).toBe(0)
  })
})

describe('runtime cookie jar (attacks and refuse-to-set)', () => {
  it('ignores CookieBannerOptions.domain on another site', () => {
    const page = boot({ host: 'medicine.dal.ca', runtimeDomain: 'evil.com' })
    expect(page.getCookieDomain()).toBe('dal.ca')
    page.setCookie('cookie_consent', CONSENT, 182)
    expect(page.jar.cookiesNamed('cookie_consent')[0].domain).toBe('dal.ca')
  })

  it('does not set a cookie on a public suffix (ca / co.uk / github.io)', () => {
    const dal = boot({ host: 'medicine.dal.ca', runtimeDomain: 'ca' })
    expect(dal.getCookieDomain()).toBe('dal.ca')

    const gov = boot({ host: 'www.example.co.uk' })
    expect(gov.getCookieDomain()).toBe('example.co.uk')

    const pages = boot({ host: 'foo.github.io' })
    expect(pages.getCookieDomain()).toBe('foo.github.io')
    pages.setCookie('cookie_consent', CONSENT, 182)
    const bar = boot({ host: 'bar.github.io' })
    bar.jar.store = pages.jar.store
    expect(bar.getCookie('cookie_consent')).toBeNull()
  })

  it('stays host-only on localhost and IPs', () => {
    const local = boot({ host: 'localhost' })
    expect(local.getCookieDomain()).toBe('')
    local.setCookie('cookie_consent', CONSENT, 182)
    expect(local.jar.cookiesNamed('cookie_consent')[0].hostOnly).toBe(true)

    const ip = boot({ host: '127.0.0.1' })
    expect(ip.getCookieDomain()).toBe('')
  })

  it('does not leave the probe cookie behind', () => {
    const page = boot({ host: 'www.dal.ca' })
    page.getCookieDomain()
    expect(page.jar.cookiesNamed('__cb_dom_t')).toEqual([])
    expect(page.getCookie('__cb_dom_t')).toBeNull()
  })
})

describe('runtime cookie jar (mode + leftovers)', () => {
  it('host mode does not share with sibling subdomains', () => {
    const www = boot({ host: 'www.dal.ca', mode: 'host' })
    expect(www.getCookieDomain()).toBe('')
    www.setCookie('cookie_consent', CONSENT, 182)
    const medicine = boot({ host: 'medicine.dal.ca', mode: 'host' })
    medicine.jar.store = www.jar.store
    expect(medicine.getCookie('cookie_consent')).toBeNull()
  })

  it('CookieBannerOptions overrides host mode (Hugh’s GTM snippet)', () => {
    const www = boot({ host: 'www.dal.ca', mode: 'host', runtimeDomain: 'dal.ca' })
    expect(www.getCookieDomain()).toBe('dal.ca')
  })

  it('custom parent on a deep host', () => {
    const page = boot({ host: 'a.b.dal.ca', mode: 'custom', custom: 'dal.ca' })
    expect(page.getCookieDomain()).toBe('dal.ca')
  })

  it('replaces a leftover host-only cookie so it cannot shadow the shared one', () => {
    const www = boot({ host: 'www.dal.ca' })
    www.jar.cookie = 'cookie_consent=old-host-only; path=/'
    expect(www.jar.cookiesNamed('cookie_consent')[0].hostOnly).toBe(true)
    www.setCookie('cookie_consent', CONSENT, 182)
    const copies = www.jar.cookiesNamed('cookie_consent')
    expect(copies).toHaveLength(1)
    expect(copies[0].hostOnly).toBe(false)
    expect(copies[0].domain).toBe('dal.ca')
    expect(consentBody(www.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))
  })

  it('clears the shared cookie on both hostnames when deleted', () => {
    const www = boot({ host: 'www.dal.ca' })
    www.setCookie('cookie_consent', CONSENT, 182)
    www.setCookie('cookie_consent', '', -1)
    const medicine = boot({ host: 'medicine.dal.ca' })
    medicine.jar.store = www.jar.store
    expect(www.getCookie('cookie_consent')).toBeNull()
    expect(medicine.getCookie('cookie_consent')).toBeNull()
  })

  it('host mode expires a leftover parent-domain cookie so siblings stop seeing it', () => {
    const auto = boot({ host: 'www.dal.ca', mode: 'auto' })
    auto.setCookie('cookie_consent', CONSENT, 182)
    expect(auto.jar.cookiesNamed('cookie_consent')[0].domain).toBe('dal.ca')

    const hostOnly = boot({ host: 'www.dal.ca', mode: 'host' })
    hostOnly.jar.store = auto.jar.store
    hostOnly.setCookie('cookie_consent', CONSENT, 182)

    const medicine = boot({ host: 'medicine.dal.ca', mode: 'host' })
    medicine.jar.store = hostOnly.jar.store
    expect(medicine.getCookie('cookie_consent')).toBeNull()
    expect(consentBody(hostOnly.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))
  })
})

describe('runtime cookie jar (weird hosts)', () => {
  it('strips a trailing FQDN dot', () => {
    const page = boot({ host: 'medicine.dal.ca.' })
    expect(page.getCookieDomain()).toBe('dal.ca')
  })

  it('shares from the apex host dal.ca to www', () => {
    const apex = boot({ host: 'dal.ca' })
    expect(apex.getCookieDomain()).toBe('dal.ca')
    apex.setCookie('cookie_consent', CONSENT, 182)
    const www = boot({ host: 'www.dal.ca' })
    www.jar.store = apex.jar.store
    expect(consentBody(www.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))
  })

  it('lowercases the hostname before probing', () => {
    const page = boot({ host: 'Medicine.DAL.CA' })
    expect(page.getCookieDomain()).toBe('dal.ca')
  })

  it('accepts CookieBannerOptions with scheme, leading dot, and case', () => {
    const page = boot({ host: 'WWW.DAL.CA', runtimeDomain: 'https://.DAL.CA/path' })
    expect(page.getCookieDomain()).toBe('dal.ca')
  })

  it('rejects a runtime domain that is only a sibling lookalike', () => {
    const page = boot({ host: 'medicine.dal.ca', runtimeDomain: 'notdal.ca' })
    expect(page.getCookieDomain()).toBe('dal.ca')
  })

  it('falls back to auto when CookieBannerOptions is an injection string', () => {
    const page = boot({
      host: 'medicine.dal.ca',
      runtimeDomain: "dal.ca'; document.cookie='x=1';//",
    })
    expect(page.getCookieDomain()).toBe('dal.ca')
  })

  it('still shares on http (no Secure flag)', () => {
    const www = boot({ host: 'www.dal.ca', protocol: 'http:' })
    www.setCookie('cookie_consent', CONSENT, 182)
    const medicine = boot({ host: 'medicine.dal.ca', protocol: 'http:' })
    medicine.jar.store = www.jar.store
    expect(consentBody(medicine.getCookie('cookie_consent'))).toEqual(JSON.parse(CONSENT))
  })

  it('shares a tree of subdomains under example.com', () => {
    const hosts = ['www.example.com', 'a.example.com', 'b.a.example.com', 'shop.example.com']
    const first = boot({ host: hosts[0] })
    first.setCookie('cookie_consent', CONSENT, 30)
    expect(first.jar.cookiesNamed('cookie_consent')[0].domain).toBe('example.com')
    for (const host of hosts.slice(1)) {
      const page = boot({ host })
      page.jar.store = first.jar.store
      expect(consentBody(page.getCookie('cookie_consent')), host).toEqual(JSON.parse(CONSENT))
    }
  })
})
