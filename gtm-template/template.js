// Cookie Banner Generator — GTM Consent Mode v2 Template
// https://cookie-banner.ca
//
// This template integrates Cookie Banner Generator with Google Tag Manager
// using the Consent Mode v2 API. It sets default consent states on page load
// and listens for consent updates when users interact with the banner.
//
// Trigger: Consent Initialization — All Pages

const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const gtagSet = require('gtagSet');
const log = require('logToConsole');
const callInWindow = require('callInWindow');
const getCookieValues = require('getCookieValues');
const JSON = require('JSON');

try {

// --------------------------------------------------------------------------
// 1. SET DEFAULT CONSENT STATE
// --------------------------------------------------------------------------
// Runs immediately on Consent Initialization trigger (before any other tags).
// Uses regional overrides from the template's "Default Settings" param table.
// If no region is specified, the setting applies globally.

const waitMs = parseInt(data.waitForUpdate, 10) || 500;

if (data.defaultSettings && data.defaultSettings.length > 0) {
  data.defaultSettings.forEach(function(setting) {
    const consentState = {
      'ad_storage': setting.ad_storage || 'denied',
      'ad_user_data': setting.ad_user_data || 'denied',
      'ad_personalization': setting.ad_personalization || 'denied',
      'analytics_storage': setting.analytics_storage || 'denied',
      'wait_for_update': waitMs
    };

    // Apply region-specific defaults if a region is specified
    if (setting.region && setting.region.trim() !== '') {
      consentState.region = setting.region.split(',').map(function(r) {
        return r.trim();
      });
    }

    setDefaultConsentState(consentState);
    log('Cookie Banner Generator: Default consent set', consentState);
  });
} else {
  // Fallback: if no settings configured, deny everything by default (GDPR-safe)
  setDefaultConsentState({
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': waitMs
  });
  log('Cookie Banner Generator: Default consent set to denied (no settings configured)');
}

// --------------------------------------------------------------------------
// 2. SET ADVANCED PRIVACY FEATURES
// --------------------------------------------------------------------------
// ads_data_redaction: When enabled, ad-click identifiers in network requests
// are redacted when ad_storage is denied.
// url_passthrough: Passes ad-click info via URL params when cookies can't be used.

if (data.ads_data_redaction) {
  gtagSet('ads_data_redaction', true);
  log('Cookie Banner Generator: Ads data redaction enabled');
}

if (data.url_passthrough) {
  gtagSet('url_passthrough', true);
  log('Cookie Banner Generator: URL passthrough enabled');
}

// --------------------------------------------------------------------------
// 3. CHECK FOR EXISTING CONSENT (from cookie)
// --------------------------------------------------------------------------
// Cookie Banner Generator stores consent in a cookie named 'cookie_consent'.
// If the user has already made a choice, apply it immediately without waiting
// for the banner script to load.

const cookieName = data.consentCookieName || 'cookie_consent';
const existingConsent = getCookieValues(cookieName);

if (existingConsent && existingConsent.length > 0) {
  try {
    const savedConsent = JSON.parse(decodeURIComponent(existingConsent[0]));
    log('Cookie Banner Generator: Found existing consent cookie', savedConsent);

    const updatedState = {
      'analytics_storage': savedConsent.analytics ? 'granted' : 'denied',
      'ad_storage': savedConsent.marketing ? 'granted' : 'denied',
      'ad_user_data': savedConsent.marketing ? 'granted' : 'denied',
      'ad_personalization': savedConsent.marketing ? 'granted' : 'denied'
    };

    updateConsentState(updatedState);
    log('Cookie Banner Generator: Consent restored from cookie', updatedState);
  } catch (e) {
    log('Cookie Banner Generator: Could not parse consent cookie, using defaults');
  }
}

// --------------------------------------------------------------------------
// 4. LISTEN FOR CONSENT UPDATES FROM THE BANNER
// --------------------------------------------------------------------------
// Cookie Banner Generator exposes a callback registration function on window.
// When the user clicks Accept/Reject/Save Preferences, the banner calls all
// registered callbacks with the updated consent state.
//
// Note: callInWindow silently no-ops if __cbRegisterConsentCallback doesn't exist yet.
// This happens if GTM loads before the banner's consent init script.
// In that case, the banner will still call gtag('consent', 'update', ...) directly,
// which GTM picks up via the dataLayer — so consent updates still work.
//
// The banner script calls: window.__cbConsentCallbacks.forEach(cb => cb(consent))
// where consent = { analytics: true/false, marketing: true/false, functionality: true/false }

callInWindow('__cbRegisterConsentCallback', function(consent) {
  log('Cookie Banner Generator: Consent updated by user', consent);

  const updatedState = {
    'analytics_storage': consent.analytics ? 'granted' : 'denied',
    'ad_storage': consent.marketing ? 'granted' : 'denied',
    'ad_user_data': consent.marketing ? 'granted' : 'denied',
    'ad_personalization': consent.marketing ? 'granted' : 'denied'
  };

  updateConsentState(updatedState);
  log('Cookie Banner Generator: GTM consent state updated', updatedState);
});

// --------------------------------------------------------------------------
// 5. SIGNAL COMPLETION
// --------------------------------------------------------------------------
data.gtmOnSuccess();

} catch (e) {
  log('Cookie Banner Generator: Template error', e);
  data.gtmOnFailure();
}
