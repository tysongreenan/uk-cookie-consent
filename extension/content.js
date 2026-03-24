/**
 * Cookie Banner Privacy Manager — Content Script
 *
 * Detects cookie consent banners on web pages and automatically
 * applies the user's privacy preferences.
 */

;(async function () {
  'use strict'

  // ── Banner detection selectors ────────────────────────────────────

  // Common cookie banner selectors (covers most CMP implementations)
  const BANNER_SELECTORS = [
    // Generic cookie banner patterns
    '[class*="cookie-banner"]',
    '[class*="cookie-consent"]',
    '[class*="cookie-notice"]',
    '[class*="cookie-popup"]',
    '[class*="cookieBanner"]',
    '[class*="cookieConsent"]',
    '[id*="cookie-banner"]',
    '[id*="cookie-consent"]',
    '[id*="cookie-notice"]',
    '[id*="cookieBanner"]',
    '[id*="cookieConsent"]',
    // GDPR / privacy patterns
    '[class*="gdpr"]',
    '[class*="privacy-banner"]',
    '[class*="consent-banner"]',
    '[class*="consent-modal"]',
    '[id*="gdpr"]',
    '[id*="consent"]',
    // Popular CMP tools
    '#onetrust-banner-sdk',
    '#onetrust-consent-sdk',
    '.cc-banner',
    '.cc-window',
    '#CybotCookiebotDialog',
    '#CybotCookiebotDialogBody',
    '.cky-consent-container',
    '#cookiebot',
    '.osano-cm-dialog',
    '#usercentrics-root',
    '.sp_message_container',
    '#klaro',
    '.klaro',
    '#iubenda-cs-banner',
    '[data-testid="cookie-banner"]',
    '[aria-label*="cookie"]',
    '[aria-label*="consent"]',
  ]

  // Button selectors by intent
  const ACCEPT_SELECTORS = [
    '[class*="accept"]', '[id*="accept"]',
    '[class*="agree"]', '[id*="agree"]',
    '[class*="allow"]', '[id*="allow"]',
    '[data-action="accept"]',
    'button[class*="primary"]',
    '#onetrust-accept-btn-handler',
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
    '.cc-accept',
    '.cc-btn.cc-dismiss',
    '.cky-btn-accept',
    '.osano-cm-accept-all',
  ]

  const REJECT_SELECTORS = [
    '[class*="reject"]', '[id*="reject"]',
    '[class*="decline"]', '[id*="decline"]',
    '[class*="deny"]', '[id*="deny"]',
    '[class*="refuse"]', '[id*="refuse"]',
    '[data-action="reject"]',
    '#onetrust-reject-all-handler',
    '#CybotCookiebotDialogBodyButtonDecline',
    '.cc-deny',
    '.cky-btn-reject',
    '.osano-cm-deny',
  ]

  const MANAGE_SELECTORS = [
    '[class*="manage"]', '[id*="manage"]',
    '[class*="settings"]', '[id*="settings"]',
    '[class*="preferences"]', '[id*="preferences"]',
    '[class*="customize"]', '[id*="customize"]',
    '#onetrust-pc-btn-handler',
    '.cc-settings',
    '.cky-btn-settings',
  ]

  // ── Helpers ─────────────────────────────────────────────────────────

  function getDomain() {
    return window.location.hostname.replace(/^www\./, '')
  }

  function findButton(selectors, container = document) {
    for (const selector of selectors) {
      try {
        const buttons = container.querySelectorAll(selector)
        for (const btn of buttons) {
          if (btn.offsetParent !== null && btn.offsetWidth > 0 && btn.offsetHeight > 0) {
            return btn
          }
        }
      } catch (e) {
        // Invalid selector — skip
      }
    }

    // Fallback: search by button text content
    const allButtons = container.querySelectorAll('button, a[role="button"], [role="button"]')
    for (const btn of allButtons) {
      if (btn.offsetParent === null || btn.offsetWidth === 0) continue
      const text = btn.textContent?.trim().toLowerCase() || ''
      for (const selector of selectors) {
        const keyword = selector.match(/\*="?(\w+)"?\]?/)?.[1]
        if (keyword && text.includes(keyword)) return btn
      }
    }

    return null
  }

  function findBanner() {
    for (const selector of BANNER_SELECTORS) {
      try {
        const el = document.querySelector(selector)
        if (el && el.offsetParent !== null && el.offsetWidth > 0) {
          return el
        }
      } catch (e) {
        // Invalid selector
      }
    }
    return null
  }

  // ── Main logic ──────────────────────────────────────────────────────

  async function handleBanner() {
    // Get status and preferences from background
    const status = await chrome.runtime.sendMessage({ type: 'GET_STATUS' })
    if (!status?.hasApiKey || !status?.hasPreferences) return

    const prefs = status.preferences
    if (!prefs?.autoApply) return

    const banner = findBanner()
    if (!banner) return

    const domain = getDomain()
    const defaultAction = prefs.defaultAction
    let action = 'skipped'
    let categoriesApplied = null
    let clicked = false

    if (defaultAction === 'accept_all') {
      const btn = findButton(ACCEPT_SELECTORS, banner)
      if (btn) {
        btn.click()
        action = 'auto_accept'
        clicked = true
      }
    } else if (defaultAction === 'reject_all') {
      const btn = findButton(REJECT_SELECTORS, banner)
      if (btn) {
        btn.click()
        action = 'auto_reject'
        clicked = true
      } else {
        // Many banners hide the reject button — try accept as fallback
        // so the banner goes away (user configured reject but site doesn't support it)
        const acceptBtn = findButton(ACCEPT_SELECTORS, banner)
        if (acceptBtn) {
          acceptBtn.click()
          action = 'auto_accept'
          clicked = true
        }
      }
    } else if (defaultAction === 'accept_essential') {
      // Try reject first (reject all = accept essential only)
      const btn = findButton(REJECT_SELECTORS, banner)
      if (btn) {
        btn.click()
        action = 'auto_reject'
        clicked = true
      }
    } else if (defaultAction === 'custom') {
      // For custom, we'd need to open preferences and toggle categories
      // This is complex and CMP-specific — for v1, click manage if available
      const manageBtn = findButton(MANAGE_SELECTORS, banner)
      if (manageBtn) {
        // Don't auto-click manage — let the user handle custom manually
        action = 'skipped'
      }
      categoriesApplied = prefs.preferences
        ? {
            functionality: prefs.preferences.functionality === 'accept',
            analytics: prefs.preferences.analytics === 'accept',
            marketing: prefs.preferences.marketing === 'accept',
          }
        : null
    }

    // Log the action
    if (action !== 'skipped' || clicked) {
      chrome.runtime.sendMessage({
        type: 'LOG_CONSENT',
        domain,
        action,
        categoriesApplied,
      })
    }

    // Show a brief notification if configured
    if (clicked && prefs.showNotification) {
      showNotification(action, domain)
    }
  }

  function showNotification(action, domain) {
    const label = action === 'auto_accept' ? 'Accepted' : action === 'auto_reject' ? 'Rejected' : action
    const div = document.createElement('div')
    div.textContent = `Cookie Banner: ${label} on ${domain}`
    Object.assign(div.style, {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      background: '#0E768C',
      color: '#fff',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '13px',
      fontFamily: 'system-ui, sans-serif',
      zIndex: '2147483647',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'opacity 0.3s',
      opacity: '1',
    })
    document.body.appendChild(div)
    setTimeout(() => {
      div.style.opacity = '0'
      setTimeout(() => div.remove(), 300)
    }, 2500)
  }

  // ── Run ─────────────────────────────────────────────────────────────

  // Wait for page to settle, then look for banners
  // Run multiple times since some CMPs lazy-load
  const delays = [500, 1500, 3000]
  for (const delay of delays) {
    setTimeout(() => {
      try {
        handleBanner()
      } catch (e) {
        console.error('[Cookie Banner Extension] Error:', e)
      }
    }, delay)
  }

  // Also watch for dynamically added banners
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node
          // Check if the added element matches a banner selector
          for (const selector of BANNER_SELECTORS) {
            try {
              if (el.matches?.(selector) || el.querySelector?.(selector)) {
                setTimeout(() => handleBanner(), 200)
                return
              }
            } catch (e) {
              // Invalid selector
            }
          }
        }
      }
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })

  // Stop observing after 10 seconds to avoid performance impact
  setTimeout(() => observer.disconnect(), 10000)
})()
