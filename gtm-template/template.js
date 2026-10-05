// Cookie Banner Generator — GTM Consent Mode v2 Template
// https://cookie-banner.ca
//
// This template integrates Cookie Banner Generator with Google Tag Manager
// using the Consent Mode v2 API. It sets default consent states on page load
// and listens for consent updates when users interact with the banner.
//
// Trigger: Consent Initialization — All Pages
//
// GTM sandboxed JavaScript has no try/catch; JSON.parse returns undefined on bad input.

const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const gtagSet = require('gtagSet');
const log = require('logToConsole');
const callInWindow = require('callInWindow');
const getCookieValues = require('getCookieValues');
const JSON = require('JSON');
const makeInteger = require('makeInteger');
const getType = require('getType');

const toConsentState = function(consent) {
  return {
    'analytics_storage': consent.analytics ? 'granted' : 'denied',
    'ad_storage': consent.marketing ? 'granted' : 'denied',
    'ad_user_data': consent.marketing ? 'granted' : 'denied',
    'ad_personalization': consent.marketing ? 'granted' : 'denied'
  };
};

// 1. SET DEFAULT CONSENT STATE
const waitMs = makeInteger(data.waitForUpdate) || 500;

if (data.defaultSettings && data.defaultSettings.length > 0) {
  data.defaultSettings.forEach(function(setting) {
    const consentState = {
      'ad_storage': setting.ad_storage || 'denied',
      'ad_user_data': setting.ad_user_data || 'denied',
      'ad_personalization': setting.ad_personalization || 'denied',
      'analytics_storage': setting.analytics_storage || 'denied',
      'wait_for_update': waitMs
    };

    if (setting.region && setting.region.trim() !== '') {
      consentState.region = setting.region.split(',').map(function(r) {
        return r.trim();
      });
    }

    setDefaultConsentState(consentState);
    log('Cookie Banner Generator: Default consent set', consentState);
  });
} else {
  setDefaultConsentState({
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': waitMs
  });
}

// 2. ADVANCED PRIVACY FEATURES
if (data.ads_data_redaction) {
  gtagSet('ads_data_redaction', true);
}
if (data.url_passthrough) {
  gtagSet('url_passthrough', true);
}

// 3. RESTORE CONSENT FROM COOKIE
// getCookieValues URI-decodes by default, matching how the banner writes the cookie.
const cookieName = data.consentCookieName || 'cookie_consent';
const existingConsent = getCookieValues(cookieName);

if (existingConsent && existingConsent.length > 0) {
  const savedConsent = JSON.parse(existingConsent[0]);
  if (getType(savedConsent) === 'object') {
    updateConsentState(toConsentState(savedConsent));
    log('Cookie Banner Generator: Consent restored from cookie');
  } else {
    log('Cookie Banner Generator: Could not parse consent cookie, using defaults');
  }
}

// 4. LISTEN FOR REAL-TIME CONSENT UPDATES
// Note: callInWindow silently no-ops if __cbRegisterConsentCallback doesn't exist yet.
// This happens if GTM loads before the banner's consent init script.
// In that case, the banner will still call gtag('consent', 'update', ...) directly,
// which GTM picks up via the dataLayer — so consent updates still work.
callInWindow('__cbRegisterConsentCallback', function(consent) {
  updateConsentState(toConsentState(consent));
  log('Cookie Banner Generator: Consent updated by user');
});

data.gtmOnSuccess();
