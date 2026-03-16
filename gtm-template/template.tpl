___INFO___

{
  "type": "TAG",
  "id": "cookie_banner_generator_consent",
  "version": 1,
  "securityGroups": [],
  "displayName": "Cookie Banner Generator — Consent Mode v2",
  "brand": {
    "id": "cookie_banner_generator",
    "displayName": "Cookie Banner Generator",
    "thumbnail": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  },
  "description": "Integrates Cookie Banner Generator (cookie-banner.ca) with Google Consent Mode v2. Sets default consent states, restores saved preferences from cookies, and listens for real-time consent updates when users interact with the banner. Supports regional consent defaults for GDPR/PECR compliance.",
  "categories": ["TAG_MANAGEMENT", "ANALYTICS", "ADVERTISING"],
  "containerContexts": ["WEB"]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "LABEL",
    "name": "headerLabel",
    "displayName": "<strong>Cookie Banner Generator — Consent Mode v2</strong><br>Configure default consent states for your cookie banner. Use the <a href=\"https://cookie-banner.ca\">Cookie Banner Generator</a> dashboard to customize your banner appearance and behavior."
  },
  {
    "type": "PARAM_TABLE",
    "name": "defaultSettings",
    "displayName": "Default Consent Settings",
    "help": "Set default consent states per region. Use ISO 3166-2 country codes (e.g., 'GB', 'DE', 'US-CA'). Comma-separate multiple regions (e.g., 'GB,DE,FR'). Leave region blank for global defaults. For GDPR compliance, EEA/UK regions should default to 'denied'.",
    "paramTableColumns": [
      {
        "param": {
          "type": "TEXT",
          "name": "region",
          "displayName": "Region (ISO codes)"
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "ad_storage",
          "displayName": "Ad Storage",
          "selectItems": [
            { "value": "denied", "displayValue": "Denied" },
            { "value": "granted", "displayValue": "Granted" }
          ],
          "defaultValue": "denied"
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "analytics_storage",
          "displayName": "Analytics Storage",
          "selectItems": [
            { "value": "denied", "displayValue": "Denied" },
            { "value": "granted", "displayValue": "Granted" }
          ],
          "defaultValue": "denied"
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "ad_user_data",
          "displayName": "Ad User Data",
          "selectItems": [
            { "value": "denied", "displayValue": "Denied" },
            { "value": "granted", "displayValue": "Granted" }
          ],
          "defaultValue": "denied"
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "ad_personalization",
          "displayName": "Ad Personalization",
          "selectItems": [
            { "value": "denied", "displayValue": "Denied" },
            { "value": "granted", "displayValue": "Granted" }
          ],
          "defaultValue": "denied"
        }
      }
    ],
    "newRowButtonText": "Add Region Override"
  },
  {
    "type": "GROUP",
    "name": "advancedSettings",
    "displayName": "Advanced Settings",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "waitForUpdate",
        "displayName": "Wait for Update (ms)",
        "defaultValue": "500",
        "valueValidators": [{ "type": "POSITIVE_NUMBER" }]
      },
      {
        "type": "TEXT",
        "name": "consentCookieName",
        "displayName": "Consent Cookie Name",
        "defaultValue": "cookie_consent"
      },
      {
        "type": "CHECKBOX",
        "name": "ads_data_redaction",
        "checkboxText": "Enable Ads Data Redaction",
        "defaultValue": false
      },
      {
        "type": "CHECKBOX",
        "name": "url_passthrough",
        "checkboxText": "Enable URL Passthrough",
        "defaultValue": false
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const gtagSet = require('gtagSet');
const log = require('logToConsole');
const callInWindow = require('callInWindow');
const getCookieValues = require('getCookieValues');
const JSON = require('JSON');

try {

// 1. SET DEFAULT CONSENT STATE
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
const cookieName = data.consentCookieName || 'cookie_consent';
const existingConsent = getCookieValues(cookieName);

if (existingConsent && existingConsent.length > 0) {
  try {
    const savedConsent = JSON.parse(decodeURIComponent(existingConsent[0]));
    updateConsentState({
      'analytics_storage': savedConsent.analytics ? 'granted' : 'denied',
      'ad_storage': savedConsent.marketing ? 'granted' : 'denied',
      'ad_user_data': savedConsent.marketing ? 'granted' : 'denied',
      'ad_personalization': savedConsent.marketing ? 'granted' : 'denied'
    });
    log('Cookie Banner Generator: Consent restored from cookie');
  } catch (e) {
    log('Cookie Banner Generator: Could not parse consent cookie, using defaults');
  }
}

// 4. LISTEN FOR REAL-TIME CONSENT UPDATES
// Note: callInWindow silently no-ops if __cbRegisterConsentCallback doesn't exist yet.
// This happens if GTM loads before the banner's consent init script.
// In that case, the banner will still call gtag('consent', 'update', ...) directly,
// which GTM picks up via the dataLayer — so consent updates still work.
callInWindow('__cbRegisterConsentCallback', function(consent) {
  updateConsentState({
    'analytics_storage': consent.analytics ? 'granted' : 'denied',
    'ad_storage': consent.marketing ? 'granted' : 'denied',
    'ad_user_data': consent.marketing ? 'granted' : 'denied',
    'ad_personalization': consent.marketing ? 'granted' : 'denied'
  });
  log('Cookie Banner Generator: Consent updated by user');
});

data.gtmOnSuccess();

} catch (e) {
  log('Cookie Banner Generator: Template error', e);
  data.gtmOnFailure();
}


___WEB_PERMISSIONS___

[
  {
    "type": "set_consent",
    "commandName": "setDefaultConsentState",
    "requiredAccess": "write",
    "consentTypes": ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"]
  },
  {
    "type": "set_consent",
    "commandName": "updateConsentState",
    "requiredAccess": "write",
    "consentTypes": ["ad_storage", "analytics_storage", "ad_user_data", "ad_personalization"]
  },
  {
    "type": "access_globals",
    "allowedKeys": [
      { "key": "__cbConsentCallbacks", "access": "read" },
      { "key": "__cbRegisterConsentCallback", "access": "execute" }
    ]
  },
  {
    "type": "get_cookies",
    "allowedCookies": [
      { "name": "cookie_consent" }
    ]
  }
]


___TESTS___

scenarios:
  - name: "Sets default consent to denied when no settings configured"
    code: |
      mock('logToConsole', function(){});
      mock('getCookieValues', function(){ return []; });
      mock('callInWindow', function(){});

      let defaultState;
      mock('setDefaultConsentState', function(state) { defaultState = state; });

      runCode({});

      assertThat(defaultState.ad_storage).isEqualTo('denied');
      assertThat(defaultState.analytics_storage).isEqualTo('denied');
      assertThat(defaultState.ad_user_data).isEqualTo('denied');
      assertThat(defaultState.ad_personalization).isEqualTo('denied');

  - name: "Restores consent from existing cookie"
    code: |
      mock('logToConsole', function(){});
      mock('callInWindow', function(){});
      mock('setDefaultConsentState', function(){});
      mock('getCookieValues', function(name) {
        if (name === 'cookie_consent') {
          return [encodeURIComponent(JSON.stringify({ analytics: true, marketing: true, functionality: true }))];
        }
        return [];
      });

      let updatedState;
      mock('updateConsentState', function(state) { updatedState = state; });

      runCode({ consentCookieName: 'cookie_consent' });

      assertThat(updatedState.ad_storage).isEqualTo('granted');
      assertThat(updatedState.analytics_storage).isEqualTo('granted');

  - name: "Applies regional defaults"
    code: |
      mock('logToConsole', function(){});
      mock('getCookieValues', function(){ return []; });
      mock('callInWindow', function(){});

      let states = [];
      mock('setDefaultConsentState', function(state) { states.push(state); });

      runCode({
        defaultSettings: [
          { region: 'GB,DE', ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' },
          { region: '', ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' }
        ]
      });

      assertThat(states.length).isEqualTo(2);
      assertThat(states[0].region).contains('GB');
      assertThat(states[1].region).isUndefined();
