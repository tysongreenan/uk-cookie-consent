import type { A11yRuntimeConfig } from './config'
import { a11yWidgetUrl } from './config'

export interface LoaderOptions {
  /** Public base URL of this deployment (no trailing slash). */
  baseUrl: string
  /**
   * Paid-plan analytics ids. When banner.js already defined `_cbQueueEvent`,
   * that path is used. When the menu is installed alone (`a11y.js`), this
   * mini-tracker POSTs the same `/api/v1/track` payload.
   */
  analytics?: { userId: string; bannerId: string }
}

/**
 * JS that banner.js appends after the banner has initialized. It publishes the
 * runtime config on `window`, then loads the static, versioned widget bundle.
 *
 * Design constraints (see docs/ACCESSIBILITY-WIDGET-PLAN.md §2):
 * - Zero extra function invocations: config is inline, the bundle is a static file.
 * - Consent first: runs last, and every line is inside try/catch so a failure here
 *   can never break the banner or the host page.
 * - Idempotent: a page that includes two snippets loads the widget once.
 * - `__cbA11yTrack` is a hook the widget calls for usage analytics. It forwards
 *   to `_cbQueueEvent` when that exists in the enclosing banner.js scope; otherwise
 *   it uses the optional standalone tracker below.
 */
export function generateA11yLoaderScript(runtime: A11yRuntimeConfig, options: LoaderOptions): string {
  const src = a11yWidgetUrl(options.baseUrl)
  // </script> inside JSON would end an inline <script> in the copy-paste path.
  const json = JSON.stringify(runtime).replace(/<\//g, '<\\/')
  const analytics = options.analytics
  const trackUrl = `${options.baseUrl.replace(/\/$/, '')}/api/v1/track`
  const standaloneTracker = analytics
    ? `
    if (typeof _cbA11ySend !== 'function') {
      var _cbA11yUserId = ${JSON.stringify(analytics.userId)};
      var _cbA11yBannerId = ${JSON.stringify(analytics.bannerId)};
      var _cbA11yTrackUrl = ${JSON.stringify(trackUrl)};
      var _cbA11yQueue = [];
      var _cbA11yFlushing = false;
      _cbA11ySend = function(type, extra) {
        if (!_cbA11yUserId || !_cbA11yBannerId) return;
        _cbA11yQueue.push({ type: type });
        if (_cbA11yFlushing) return;
        _cbA11yFlushing = true;
        setTimeout(function () {
          _cbA11yFlushing = false;
          if (!_cbA11yQueue.length) return;
          var batch = _cbA11yQueue.splice(0, 10);
          var body = JSON.stringify({ userId: _cbA11yUserId, bannerId: _cbA11yBannerId, events: batch });
          try {
            if (navigator.sendBeacon) navigator.sendBeacon(_cbA11yTrackUrl, new Blob([body], { type: 'application/json' }));
            else fetch(_cbA11yTrackUrl, { method: 'POST', body: body, headers: { 'Content-Type': 'application/json' }, keepalive: true, mode: 'cors' });
          } catch (e2) {}
        }, 0);
      };
    }`
    : ''

  return `
  // 5. Accessibility Menu (boots after the banner; failures never affect consent)
  try {
    window.__cbA11yConfig = ${json};
    var _cbA11ySend = typeof _cbQueueEvent === 'function' ? _cbQueueEvent : null;
    ${standaloneTracker}
    if (typeof window.__cbA11yTrack !== 'function') {
      window.__cbA11yTrack = function(type, extra) {
        try { if (typeof _cbA11ySend === 'function') _cbA11ySend(type, extra); } catch (e) {}
      };
    }
    if (!document.getElementById('cb-a11y-script')) {
      var _cbA11yScript = document.createElement('script');
      _cbA11yScript.id = 'cb-a11y-script';
      _cbA11yScript.src = ${JSON.stringify(src)};
      _cbA11yScript.async = true;
      _cbA11yScript.crossOrigin = 'anonymous';
      (document.head || document.documentElement).appendChild(_cbA11yScript);
    }
  } catch (e) {
    try { console.warn('[Cookie Banner] Accessibility menu failed to load:', e); } catch (_) {}
  }
`
}

/**
 * Head-code variant for copy-paste installs: a single tag carrying its config in a
 * data attribute. The widget reads `data-cb-a11y` when `window.__cbA11yConfig` is absent.
 */
export function generateA11yHeadTag(runtime: A11yRuntimeConfig, options: LoaderOptions): string {
  const src = a11yWidgetUrl(options.baseUrl)
  const json = JSON.stringify(runtime)
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return `<script id="cb-a11y-script" src="${src}" data-cb-a11y='${json}' async crossorigin="anonymous"></script>`
}
