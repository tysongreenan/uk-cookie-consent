___TERMS_OF_SERVICE___

By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.


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
  "description": "Connects Cookie Banner Generator (cookie-banner.ca) to Google Consent Mode v2. Sets default consent, restores saved choices, and updates consent when visitors use the banner.",
  "categories": [
    "TAG_MANAGEMENT",
    "ANALYTICS",
    "ADVERTISING"
  ],
  "containerContexts": [
    "WEB"
  ]
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
          "displayName": "Region (ISO codes)",
          "simpleValueType": true
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "ad_storage",
          "displayName": "Ad Storage",
          "selectItems": [
            {
              "value": "denied",
              "displayValue": "Denied"
            },
            {
              "value": "granted",
              "displayValue": "Granted"
            }
          ],
          "defaultValue": "denied",
          "simpleValueType": true
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "analytics_storage",
          "displayName": "Analytics Storage",
          "selectItems": [
            {
              "value": "denied",
              "displayValue": "Denied"
            },
            {
              "value": "granted",
              "displayValue": "Granted"
            }
          ],
          "defaultValue": "denied",
          "simpleValueType": true
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "ad_user_data",
          "displayName": "Ad User Data",
          "selectItems": [
            {
              "value": "denied",
              "displayValue": "Denied"
            },
            {
              "value": "granted",
              "displayValue": "Granted"
            }
          ],
          "defaultValue": "denied",
          "simpleValueType": true
        }
      },
      {
        "param": {
          "type": "SELECT",
          "name": "ad_personalization",
          "displayName": "Ad Personalization",
          "selectItems": [
            {
              "value": "denied",
              "displayValue": "Denied"
            },
            {
              "value": "granted",
              "displayValue": "Granted"
            }
          ],
          "defaultValue": "denied",
          "simpleValueType": true
        }
      }
    ],
    "newRowButtonText": "Add Region Override"
  },
  {
    "type": "GROUP",
    "name": "advancedSettings",
    "displayName": "Optional settings",
    "groupStyle": "ZIPPY_CLOSED",
    "subParams": [
      {
        "type": "TEXT",
        "name": "waitForUpdate",
        "displayName": "Wait for Update (ms)",
        "defaultValue": "500",
        "valueValidators": [
          {
            "type": "POSITIVE_NUMBER"
          }
        ],
        "simpleValueType": true
      },
      {
        "type": "TEXT",
        "name": "consentCookieName",
        "displayName": "Consent Cookie Name",
        "defaultValue": "cookie_consent",
        "simpleValueType": true
      },
      {
        "type": "CHECKBOX",
        "name": "ads_data_redaction",
        "checkboxText": "Enable Ads Data Redaction",
        "defaultValue": false,
        "simpleValueType": true
      },
      {
        "type": "CHECKBOX",
        "name": "url_passthrough",
        "checkboxText": "Enable URL Passthrough",
        "defaultValue": false,
        "simpleValueType": true
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


___WEB_PERMISSIONS___

[
  {
    "instance": {
      "key": {
        "publicId": "logging",
        "versionId": "1"
      },
      "param": [
        {
          "key": "environments",
          "value": {
            "type": 1,
            "string": "debug"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_consent",
        "versionId": "1"
      },
      "param": [
        {
          "key": "consentTypes",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "analytics_storage"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_user_data"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              },
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "consentType"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "ad_personalization"
                  },
                  {
                    "type": 8,
                    "boolean": true
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "write_data_layer",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keyPatterns",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 1,
                "string": "ads_data_redaction"
              },
              {
                "type": 1,
                "string": "url_passthrough"
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "access_globals",
        "versionId": "1"
      },
      "param": [
        {
          "key": "keys",
          "value": {
            "type": 2,
            "listItem": [
              {
                "type": 3,
                "mapKey": [
                  {
                    "type": 1,
                    "string": "key"
                  },
                  {
                    "type": 1,
                    "string": "read"
                  },
                  {
                    "type": 1,
                    "string": "write"
                  },
                  {
                    "type": 1,
                    "string": "execute"
                  }
                ],
                "mapValue": [
                  {
                    "type": 1,
                    "string": "__cbRegisterConsentCallback"
                  },
                  {
                    "type": 8,
                    "boolean": false
                  },
                  {
                    "type": 8,
                    "boolean": false
                  },
                  {
                    "type": 8,
                    "boolean": true
                  }
                ]
              }
            ]
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  },
  {
    "instance": {
      "key": {
        "publicId": "get_cookies",
        "versionId": "1"
      },
      "param": [
        {
          "key": "cookieAccess",
          "value": {
            "type": 1,
            "string": "any"
          }
        }
      ]
    },
    "clientAnnotations": {
      "isEditedByUser": true
    },
    "isRequired": true
  }
]


___TESTS___

scenarios:
- name: Sets default consent to denied when no settings configured
  code: |-
    mock('getCookieValues', function() { return []; });
    mock('callInWindow', function() {});

    let defaultState;
    mock('setDefaultConsentState', function(state) { defaultState = state; });

    runCode({});

    assertThat(defaultState.ad_storage).isEqualTo('denied');
    assertThat(defaultState.analytics_storage).isEqualTo('denied');
    assertThat(defaultState.ad_user_data).isEqualTo('denied');
    assertThat(defaultState.ad_personalization).isEqualTo('denied');
    assertApi('gtmOnSuccess').wasCalled();
- name: Restores consent from existing cookie
  code: |-
    mock('callInWindow', function() {});
    mock('setDefaultConsentState', function() {});
    mock('getCookieValues', function(name) {
      if (name === 'cookie_consent') {
        return ['{"analytics":true,"marketing":true,"functionality":true}'];
      }
      return [];
    });

    let updatedState;
    mock('updateConsentState', function(state) { updatedState = state; });

    runCode({ consentCookieName: 'cookie_consent' });

    assertThat(updatedState.ad_storage).isEqualTo('granted');
    assertThat(updatedState.analytics_storage).isEqualTo('granted');
    assertApi('gtmOnSuccess').wasCalled();
- name: Ignores an unreadable consent cookie
  code: |-
    mock('callInWindow', function() {});
    mock('setDefaultConsentState', function() {});
    mock('getCookieValues', function() { return ['not json']; });

    runCode({});

    assertApi('updateConsentState').wasNotCalled();
    assertApi('gtmOnSuccess').wasCalled();
- name: Ignores a null consent cookie
  code: |-
    mock('callInWindow', function() {});
    mock('setDefaultConsentState', function() {});
    mock('getCookieValues', function() { return ['null']; });

    runCode({});

    assertApi('updateConsentState').wasNotCalled();
    assertApi('gtmOnSuccess').wasCalled();
- name: Applies regional defaults
  code: |-
    mock('getCookieValues', function() { return []; });
    mock('callInWindow', function() {});

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


___NOTES___

Created on 2026-10-05
