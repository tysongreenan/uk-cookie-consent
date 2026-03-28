/**
 * TCF 2.2 CMP API code generator.
 *
 * Generates a self-contained JavaScript IIFE that implements window.__tcfapi
 * per the IAB TCF 2.2 specification. The generated code is prepended to the
 * banner init script so it runs before any vendor scripts.
 *
 * Reference: https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
 */

export interface PublisherRestriction {
  purposeId: number
  restrictionType: 0 | 1 | 2 | 3 // 0=not allowed, 1=require consent, 2=require LI, 3=undefined
  vendorIds: number[]
}

export interface TCFConfig {
  enabled: boolean
  cmpId: number
  cmpVersion: number
  publisherCountryCode: string
  purposeIds: number[]
  specialFeatureIds: number[]
  vendorIds: number[]
  publisherRestrictions: PublisherRestriction[]
  showVendorList: boolean
  storeConsentGlobally: boolean
}

/**
 * Generates the JavaScript code for the __tcfapi CMP API.
 *
 * The returned string is a self-contained IIFE that can be prepended to the
 * banner init script. It:
 *   1. Creates the __tcfapi stub immediately (TCF spec requirement)
 *   2. Implements ping, getTCData, addEventListener, removeEventListener
 *   3. Tracks CMP status: stub -> loading -> loaded
 *   4. Fires listener events on consent changes
 */
export function generateTcfCmpApiCode(config: TCFConfig): string {
  if (!config.enabled) return ''

  const {
    cmpId,
    cmpVersion,
    publisherCountryCode,
    purposeIds,
    specialFeatureIds,
    vendorIds,
    publisherRestrictions,
    storeConsentGlobally,
  } = config

  // Serialize config values into the generated JS
  return `
;(function() {
  'use strict';

  // ── TCF 2.2 CMP API ──────────────────────────────────────────────────

  var CMP_ID = ${JSON.stringify(cmpId)};
  var CMP_VERSION = ${JSON.stringify(cmpVersion)};
  var TCF_POLICY_VERSION = 5; // TCF 2.2
  var PUBLISHER_CC = ${JSON.stringify(publisherCountryCode)};
  var PURPOSE_IDS = ${JSON.stringify(purposeIds)};
  var SPECIAL_FEATURE_IDS = ${JSON.stringify(specialFeatureIds)};
  var VENDOR_IDS = ${JSON.stringify(vendorIds)};
  var PUBLISHER_RESTRICTIONS = ${JSON.stringify(publisherRestrictions)};
  var STORE_GLOBALLY = ${JSON.stringify(storeConsentGlobally)};

  // CMP status: 'stub' -> 'loading' -> 'loaded'
  var cmpStatus = 'stub';
  var displayStatus = 'hidden'; // 'hidden' | 'visible' | 'disabled'
  var listenerId = 0;
  var listeners = {};
  var tcData = null;
  var gdprApplies = true; // Default true, updated by geo detection
  var cmpLoaded = false;

  // TC string storage key
  var TC_COOKIE = STORE_GLOBALLY ? 'euconsent-v2' : 'euconsent-v2';
  var TC_STORAGE_KEY = '__tcf_consent';

  // ── Stub queue (commands called before CMP loads) ─────────────────

  var stubQueue = [];

  // ── Helper: read stored TC string ─────────────────────────────────

  function getStoredTcString() {
    try {
      var match = document.cookie.match(new RegExp('(?:^|; )' + TC_COOKIE + '=([^;]*)'));
      if (match) return decodeURIComponent(match[1]);
    } catch(e) {}
    return null;
  }

  // ── Helper: build TCData object ───────────────────────────────────

  function buildTCData(eventStatus, lid) {
    var stored = getStoredTcString();
    var consentData = null;
    try {
      var raw = localStorage.getItem(TC_STORAGE_KEY);
      if (raw) consentData = JSON.parse(raw);
    } catch(e) {}

    var purposeConsents = {};
    var purposeLIs = {};
    var vendorConsents = {};
    var vendorLIs = {};
    var specialFeatureOptins = {};

    if (consentData) {
      // Populate from stored consent data
      for (var i = 0; i < PURPOSE_IDS.length; i++) {
        var pid = PURPOSE_IDS[i];
        purposeConsents[pid] = !!(consentData.purposeConsents && consentData.purposeConsents[pid]);
        purposeLIs[pid] = !!(consentData.purposeLIs && consentData.purposeLIs[pid]);
      }
      for (var j = 0; j < VENDOR_IDS.length; j++) {
        var vid = VENDOR_IDS[j];
        vendorConsents[vid] = !!(consentData.vendorConsents && consentData.vendorConsents[vid]);
        vendorLIs[vid] = !!(consentData.vendorLIs && consentData.vendorLIs[vid]);
      }
      for (var k = 0; k < SPECIAL_FEATURE_IDS.length; k++) {
        var sfid = SPECIAL_FEATURE_IDS[k];
        specialFeatureOptins[sfid] = !!(consentData.specialFeatureOptins && consentData.specialFeatureOptins[sfid]);
      }
    }

    var data = {
      tcString: stored || '',
      tcfPolicyVersion: TCF_POLICY_VERSION,
      cmpId: CMP_ID,
      cmpVersion: CMP_VERSION,
      gdprApplies: gdprApplies,
      eventStatus: eventStatus || null,
      cmpStatus: cmpStatus,
      listenerId: lid || null,
      isServiceSpecific: !STORE_GLOBALLY,
      useNonStandardTexts: false,
      publisherCC: PUBLISHER_CC,
      purposeOneTreatment: false,
      purpose: {
        consents: purposeConsents,
        legitimateInterests: purposeLIs
      },
      vendor: {
        consents: vendorConsents,
        legitimateInterests: vendorLIs
      },
      specialFeatureOptins: specialFeatureOptins,
      publisher: {
        consents: {},
        legitimateInterests: {},
        customPurpose: { consents: {}, legitimateInterests: {} },
        restrictions: PUBLISHER_RESTRICTIONS
      }
    };

    return data;
  }

  // ── Helper: notify all registered listeners ───────────────────────

  function notifyListeners(eventStatus) {
    var keys = Object.keys(listeners);
    for (var i = 0; i < keys.length; i++) {
      var lid = parseInt(keys[i], 10);
      var cb = listeners[lid];
      if (typeof cb === 'function') {
        try {
          cb(buildTCData(eventStatus, lid), true);
        } catch(e) {
          console.error('[TCF] Listener error:', e);
        }
      }
    }
  }

  // ── Command handlers ──────────────────────────────────────────────

  var commands = {
    ping: function(callback) {
      if (typeof callback !== 'function') return;
      callback({
        gdprApplies: gdprApplies,
        cmpLoaded: cmpLoaded,
        cmpStatus: cmpStatus,
        displayStatus: displayStatus,
        apiVersion: '2.2',
        cmpVersion: CMP_VERSION,
        cmpId: CMP_ID,
        gvlVersion: 0,
        tcfPolicyVersion: TCF_POLICY_VERSION
      });
    },

    getTCData: function(callback, vendorIds) {
      if (typeof callback !== 'function') return;
      var data = buildTCData(null, null);
      // If specific vendor IDs requested, filter
      if (vendorIds && Array.isArray(vendorIds) && vendorIds.length > 0) {
        var filteredConsents = {};
        var filteredLIs = {};
        for (var i = 0; i < vendorIds.length; i++) {
          var vid = vendorIds[i];
          filteredConsents[vid] = !!data.vendor.consents[vid];
          filteredLIs[vid] = !!data.vendor.legitimateInterests[vid];
        }
        data.vendor = { consents: filteredConsents, legitimateInterests: filteredLIs };
      }
      callback(data, true);
    },

    addEventListener: function(callback) {
      if (typeof callback !== 'function') return;
      listenerId++;
      listeners[listenerId] = callback;
      // Immediately fire with current state
      var eventStatus = cmpStatus === 'loaded' ? 'tcloaded' : 'cmpuishown';
      callback(buildTCData(eventStatus, listenerId), true);
    },

    removeEventListener: function(callback, listenerIdToRemove) {
      if (typeof callback !== 'function') return;
      var lid = listenerIdToRemove;
      if (listeners[lid]) {
        delete listeners[lid];
        callback(true);
      } else {
        callback(false);
      }
    }
  };

  // ── __tcfapi implementation ───────────────────────────────────────

  function __tcfapi(command, version, callback, parameter) {
    if (typeof command !== 'string') return;

    // Version check: we support TCF 2.2 (version param should be 2)
    if (command !== 'ping' && version !== 2) {
      if (typeof callback === 'function') {
        callback(null, false);
      }
      return;
    }

    if (commands[command]) {
      commands[command](callback, parameter);
    } else if (cmpStatus === 'stub') {
      // Queue unknown commands for when CMP finishes loading
      stubQueue.push({ command: command, version: version, callback: callback, parameter: parameter });
    } else if (typeof callback === 'function') {
      callback(null, false);
    }
  }

  // ── Expose __tcfapi globally ──────────────────────────────────────

  // Process any calls queued by the IAB stub loader
  var existingQueue = [];
  if (window.__tcfapi && window.__tcfapi.a) {
    existingQueue = window.__tcfapi.a;
  } else if (window.__tcfapi && window.__tcfapi.queue) {
    existingQueue = window.__tcfapi.queue;
  }

  window.__tcfapi = __tcfapi;

  // Replay queued calls
  for (var q = 0; q < existingQueue.length; q++) {
    var args = existingQueue[q];
    if (Array.isArray(args)) {
      __tcfapi.apply(null, args);
    }
  }

  // ── iframe postMessage support (TCF spec for cross-domain) ────────

  function handleTcfMessage(event) {
    var msg;
    try {
      msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    } catch(e) { return; }

    if (msg && msg.__tcfapiCall) {
      var call = msg.__tcfapiCall;
      __tcfapi(call.command, call.version, function(retValue, success) {
        var response = {
          __tcfapiReturn: {
            returnValue: retValue,
            success: success,
            callId: call.callId
          }
        };
        if (event.source) {
          event.source.postMessage(typeof event.data === 'string' ? JSON.stringify(response) : response, '*');
        }
      }, call.parameter);
    }
  }

  if (typeof addEventListener !== 'undefined') {
    addEventListener('message', handleTcfMessage, false);
  }

  // ── CMP lifecycle hooks (called by banner code) ───────────────────

  // Called when CMP UI starts loading
  window.__tcfCmpLoading = function() {
    cmpStatus = 'loading';
    displayStatus = 'visible';
  };

  // Called when CMP finishes loading (banner is displayed)
  window.__tcfCmpReady = function() {
    cmpStatus = 'loaded';
    cmpLoaded = true;

    // Check for returning visitor with existing consent
    var stored = getStoredTcString();
    if (stored) {
      displayStatus = 'hidden';
      notifyListeners('tcloaded');
    } else {
      displayStatus = 'visible';
      notifyListeners('cmpuishown');
    }

    // Process stub queue
    for (var i = 0; i < stubQueue.length; i++) {
      var item = stubQueue[i];
      __tcfapi(item.command, item.version, item.callback, item.parameter);
    }
    stubQueue = [];
  };

  // Called after user makes a consent choice
  window.__tcfConsentChanged = function(consentData, tcString) {
    // Store consent data in localStorage for buildTCData
    try {
      localStorage.setItem(TC_STORAGE_KEY, JSON.stringify(consentData));
    } catch(e) {}

    // Store TC string in cookie
    if (tcString) {
      try {
        var maxAge = 365 * 24 * 60 * 60; // 1 year
        var sameSite = STORE_GLOBALLY ? 'None; Secure' : 'Lax';
        document.cookie = TC_COOKIE + '=' + encodeURIComponent(tcString) +
          '; path=/; max-age=' + maxAge + '; SameSite=' + sameSite;
      } catch(e) {}
    }

    displayStatus = 'hidden';
    notifyListeners('useractioncomplete');
  };

  // ── Create __tcfapi.locator iframe (TCF spec requirement) ─────────

  if (typeof document !== 'undefined') {
    var locator = document.createElement('iframe');
    locator.style.cssText = 'display:none';
    locator.name = '__tcfapiLocator';
    var appendLocator = function() {
      if (document.body && !document.querySelector('iframe[name="__tcfapiLocator"]')) {
        document.body.appendChild(locator);
      }
    };
    if (document.body) {
      appendLocator();
    } else {
      document.addEventListener('DOMContentLoaded', appendLocator);
    }
  }

})();
`
}
