/**
 * Consent-cookie Domain attribute.
 *
 * Default is GA-style "auto": write cookie_consent on the highest domain the
 * browser will accept (dal.ca from medicine.dal.ca / www.dal.ca) so one
 * Accept covers every subdomain. Customers can force host-only, set a custom
 * parent, or override at runtime with window.CookieBannerOptions.domain.
 */

export type CookieDomainMode = 'auto' | 'host' | 'custom'

const DOMAIN_RE =
  /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/

export function normalizeCookieDomain(input: unknown): string | null {
  if (typeof input !== 'string') return null
  let domain = input.trim().toLowerCase()
  if (!domain) return null
  domain = domain.replace(/^https?:\/\//, '').split('/')[0].split(':')[0]
  domain = domain.replace(/^\.+/, '').replace(/\.+$/, '')
  if (!domain || domain.length > 253) return null
  if (!DOMAIN_RE.test(domain)) return null
  return domain
}

export function isIpHostname(hostname: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.includes(':')
}

export function isCookieDomainAllowed(domain: string, hostname: string): boolean {
  const host = hostname.replace(/\.+$/, '').toLowerCase()
  const d = domain.replace(/^\./, '').replace(/\.+$/, '').toLowerCase()
  if (!host || !d) return false
  if (host === 'localhost' || isIpHostname(host)) return false
  return host === d || host.endsWith('.' + d)
}

/** Shortest-first suffixes to try (skips public-suffix-looking 1-label hosts). */
export function cookieDomainProbeCandidates(hostname: string): string[] {
  const host = hostname.replace(/\.+$/, '').toLowerCase()
  if (!host || host === 'localhost' || isIpHostname(host) || !host.includes('.')) {
    return []
  }
  const parts = host.split('.').filter(Boolean)
  const out: string[] = []
  for (let i = 2; i <= parts.length; i++) {
    out.push(parts.slice(parts.length - i).join('.'))
  }
  return out
}

export function serializeCookieDomainConfig(behavior?: {
  cookieDomainMode?: string
  cookieDomain?: string
}): { mode: CookieDomainMode; custom: string } {
  const rawMode = behavior?.cookieDomainMode
  const mode: CookieDomainMode =
    rawMode === 'host' || rawMode === 'custom' ? rawMode : 'auto'
  const custom =
    mode === 'custom' ? normalizeCookieDomain(behavior?.cookieDomain) || '' : ''
  if (mode === 'custom' && !custom) {
    return { mode: 'auto', custom: '' }
  }
  return { mode, custom }
}

/**
 * Pure resolver. Pass `settableDomains` from a real cookie probe (shortest
 * first, public suffixes already rejected by the browser). Without that list,
 * auto returns '' — we never guess eTLD+1.
 */
export function resolveCookieDomain(input: {
  hostname: string
  mode?: string
  custom?: string
  runtimeDomain?: string
  settableDomains?: string[]
}): string {
  const host = (input.hostname || '').replace(/\.+$/, '').toLowerCase()
  if (!host || host === 'localhost' || isIpHostname(host)) return ''

  const runtime = normalizeCookieDomain(input.runtimeDomain)
  if (runtime && isCookieDomainAllowed(runtime, host)) {
    if (!input.settableDomains || input.settableDomains.includes(runtime)) {
      return runtime
    }
  }

  const { mode, custom } = serializeCookieDomainConfig({
    cookieDomainMode: input.mode,
    cookieDomain: input.custom,
  })

  if (mode === 'host') return ''

  if (mode === 'custom') {
    if (custom && isCookieDomainAllowed(custom, host)) {
      if (!input.settableDomains || input.settableDomains.includes(custom)) {
        return custom
      }
    }
  }

  const settable = input.settableDomains || []
  for (const candidate of settable) {
    const normalized = normalizeCookieDomain(candidate)
    if (normalized && isCookieDomainAllowed(normalized, host)) return normalized
  }
  return ''
}

export function cookieDomainRuntimeJs(mode: CookieDomainMode, custom: string): string {
  return `var COOKIE_DOMAIN_MODE = ${JSON.stringify(mode)};
var COOKIE_DOMAIN_CUSTOM = ${JSON.stringify(custom)};
var _cbCookieDomain;

function _cbNormalizedHost() {
  return (location.hostname || '').toLowerCase().replace(/\\.+$/, '');
}

function _cbNormalizeDomain(input) {
  if (!input || typeof input !== 'string') return '';
  var domain = input.replace(/^\\s+|\\s+$/g, '').toLowerCase();
  domain = domain.replace(/^https?:\\/\\//, '').split('/')[0].split(':')[0];
  domain = domain.replace(/^\\.+/, '').replace(/\\.+$/, '');
  if (!domain || domain.length > 253) return '';
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(domain)) return '';
  return domain;
}

function _cbDomainAllowed(domain, host) {
  host = (host || '').toLowerCase().replace(/\\.+$/, '');
  domain = (domain || '').replace(/^\\.+/, '').replace(/\\.+$/, '').toLowerCase();
  if (!domain || !host) return false;
  if (host === 'localhost' || /^\\d{1,3}(\\.\\d{1,3}){3}$/.test(host) || host.indexOf(':') !== -1) return false;
  return host === domain || host.slice(-(domain.length + 1)) === '.' + domain;
}

function _cbSecureAttr() {
  return location.protocol === 'https:' ? '; Secure' : '';
}

function _cbCanSetDomain(domain) {
  var name = '__cb_dom_t';
  var secure = _cbSecureAttr();
  try {
    document.cookie = name + '=1; Domain=' + domain + '; Path=/; SameSite=Lax' + secure;
    var ok = document.cookie.indexOf(name + '=') !== -1;
    document.cookie = name + '=; Domain=' + domain + '; Path=/; SameSite=Lax; expires=Thu, 01 Jan 1970 00:00:00 GMT' + secure;
    return ok;
  } catch (e) {
    return false;
  }
}

function _cbExpireCookie(name, domain) {
  var secure = _cbSecureAttr();
  var domainPart = domain ? '; Domain=' + domain : '';
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domainPart + secure;
}

function _cbExpireVisibleCopies(name) {
  _cbExpireCookie(name, '');
  var host = _cbNormalizedHost();
  if (!host || host === 'localhost' || host.indexOf('.') === -1 || host.indexOf(':') !== -1) return;
  var parts = host.split('.');
  for (var i = 2; i <= parts.length; i++) {
    _cbExpireCookie(name, parts.slice(parts.length - i).join('.'));
  }
}

function getCookieDomain() {
  if (_cbCookieDomain !== undefined) return _cbCookieDomain;
  var host = _cbNormalizedHost();
  var opts = window.CookieBannerOptions || {};
  var runtime = _cbNormalizeDomain(opts.domain);
  if (runtime && _cbDomainAllowed(runtime, host) && _cbCanSetDomain(runtime)) {
    _cbCookieDomain = runtime;
    return _cbCookieDomain;
  }
  if (COOKIE_DOMAIN_MODE === 'host') {
    _cbCookieDomain = '';
    return _cbCookieDomain;
  }
  if (COOKIE_DOMAIN_MODE === 'custom') {
    var custom = _cbNormalizeDomain(COOKIE_DOMAIN_CUSTOM);
    if (custom && _cbDomainAllowed(custom, host) && _cbCanSetDomain(custom)) {
      _cbCookieDomain = custom;
      return _cbCookieDomain;
    }
  }
  _cbCookieDomain = '';
  if (host && host !== 'localhost' && host.indexOf('.') !== -1 && !/^\\d{1,3}(\\.\\d{1,3}){3}$/.test(host) && host.indexOf(':') === -1) {
    var parts = host.split('.');
    for (var i = 2; i <= parts.length; i++) {
      var candidate = parts.slice(parts.length - i).join('.');
      if (_cbCanSetDomain(candidate)) {
        _cbCookieDomain = candidate;
        break;
      }
    }
  }
  return _cbCookieDomain;
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, days) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  var secure = _cbSecureAttr();
  var domain = getCookieDomain();
  _cbExpireVisibleCopies(name);
  if (days < 0 && !value) return;
  var domainPart = domain ? '; Domain=' + domain : '';
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires.toUTCString() + '; path=/' + domainPart + '; SameSite=Lax' + secure;
}

window.__cbGetCookieDomain = getCookieDomain;
window.__cbExpireCookieCopies = _cbExpireVisibleCopies;
`
}
