'use client'

import { useEffect } from 'react'

export function LiveCookieBanner() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Cookie Banner Configuration (matches the generator output)
    const config = {
      colors: {
        background: '#ffffff',
        text: '#333333',
        button: '#6366f1',
        buttonText: '#ffffff',
        link: '#6366f1'
      },
      text: {
        title: 'We use cookies',
        message: 'This website uses cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
        acceptButton: 'Accept All',
        rejectButton: 'Reject All',
        preferencesButton: 'Preferences'
      }
    }

    // Inject the banner HTML
    const bannerHTML = `
      <div id="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent" style="position: fixed; bottom: 0; left: 0; right: 0; background-color: ${config.colors.background}; color: ${config.colors.text}; padding: 20px; z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); border-top: 1px solid #e5e7eb; display: none;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${config.text.title}</h3>
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5;">
                ${config.text.message}
                <a href="/privacy" style="color: ${config.colors.link}; text-decoration: underline;">Learn more</a>
              </p>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button id="cookie-accept-btn" style="background-color: ${config.colors.button}; color: ${config.colors.buttonText}; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">
                  ${config.text.acceptButton}
                </button>
                <button id="cookie-reject-btn" style="background-color: transparent; color: ${config.colors.button}; border: 1px solid ${config.colors.button}; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">
                  ${config.text.rejectButton}
                </button>
                <button id="cookie-preferences-btn" style="background-color: transparent; color: ${config.colors.link}; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">
                  ${config.text.preferencesButton}
                </button>
              </div>
              
              <div id="cookie-preferences-panel" style="margin-top: 16px; padding: 16px; background-color: rgba(0,0,0,0.03); border-radius: 8px; display: none;">
                <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Cookie Preferences</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <label style="display: flex; align-items: center; font-size: 13px; cursor: not-allowed; opacity: 0.7;">
                    <input type="checkbox" checked disabled style="margin-right: 8px; accent-color: ${config.colors.button};">
                    <span><strong>Strictly Necessary</strong><br><small style="opacity: 0.8;">Essential for website functionality</small></span>
                  </label>
                  <label style="display: flex; align-items: center; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="cookie-func-toggle" style="margin-right: 8px; accent-color: ${config.colors.button};">
                    <span><strong>Functionality</strong><br><small style="opacity: 0.8;">Remember preferences and choices</small></span>
                  </label>
                  <label style="display: flex; align-items: center; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="cookie-analytics-toggle" style="margin-right: 8px; accent-color: ${config.colors.button};">
                    <span><strong>Analytics</strong><br><small style="opacity: 0.8;">Help us improve our website</small></span>
                  </label>
                  <label style="display: flex; align-items: center; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="cookie-marketing-toggle" style="margin-right: 8px; accent-color: ${config.colors.button};">
                    <span><strong>Marketing</strong><br><small style="opacity: 0.8;">Personalized ads and content</small></span>
                  </label>
                </div>
                <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: space-between; align-items: center;">
                  <div style="font-size: 8px; opacity: 0.3;">
                    <a href="https://cookie-banner.ca" style="color: inherit; text-decoration: none;" rel="nofollow">cookie banner</a>
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <button id="cookie-save-prefs-btn" style="background-color: ${config.colors.button}; color: ${config.colors.buttonText}; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500;">Save</button>
                    <button id="cookie-cancel-prefs-btn" style="background-color: transparent; color: ${config.colors.text}; border: 1px solid ${config.colors.text}; padding: 8px 16px; border-radius: 6px; font-size: 13px; cursor: pointer; font-weight: 500;">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `

    // Inject banner into DOM
    const bannerContainer = document.createElement('div')
    bannerContainer.innerHTML = bannerHTML
    document.body.appendChild(bannerContainer)

    // Cookie functions (exactly like generated code)
    const COOKIE_NAME = 'cookie_consent'
    const COOKIE_EXPIRY = 182

    function getCookie(name: string) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? decodeURIComponent(match[2]) : null
    }

    function setCookie(name: string, value: string, days: number) {
      const expires = new Date()
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
      const secure = location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax' + secure
    }

    function getConsent() {
      const cookie = getCookie(COOKIE_NAME)
      if (cookie) {
        try {
          return JSON.parse(cookie)
        } catch(e) {
          return null
        }
      }
      return null
    }

    function saveConsent(consent: any) {
      setCookie(COOKIE_NAME, JSON.stringify(consent), COOKIE_EXPIRY)
      console.log('Cookie consent saved:', consent)
      
      // Update Google Analytics consent mode (gtag) - with retry for deferred loading
      const updateGtagConsent = () => {
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('consent', 'update', {
            'analytics_storage': consent.analytics ? 'granted' : 'denied',
            'ad_storage': consent.marketing ? 'granted' : 'denied',
            'ad_user_data': consent.marketing ? 'granted' : 'denied',
            'ad_personalization': consent.marketing ? 'granted' : 'denied'
          })
          console.log('✅ Google Analytics consent updated:', consent)
          return true
        }
        return false
      }
      
      // Try immediately, then retry every 500ms for up to 5 seconds if GA not loaded yet
      if (!updateGtagConsent()) {
        let retries = 0
        const retryInterval = setInterval(() => {
          if (updateGtagConsent() || retries++ > 10) {
            clearInterval(retryInterval)
          }
        }, 500)
      }
      
      // Update Google Tag Manager consent
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          'event': 'cookie_consent_update',
          'analytics_storage': consent.analytics ? 'granted' : 'denied',
          'ad_storage': consent.marketing ? 'granted' : 'denied',
          'ad_user_data': consent.marketing ? 'granted' : 'denied',
          'ad_personalization': consent.marketing ? 'granted' : 'denied'
        })
        console.log('✅ GTM consent updated:', consent)
      }
    }

    // Initialize banner
    const banner = document.getElementById('cookie-consent-banner')
    const acceptBtn = document.getElementById('cookie-accept-btn')
    const rejectBtn = document.getElementById('cookie-reject-btn')
    const prefsBtn = document.getElementById('cookie-preferences-btn')
    const prefsPanel = document.getElementById('cookie-preferences-panel')
    const savePrefsBtn = document.getElementById('cookie-save-prefs-btn')
    const cancelPrefsBtn = document.getElementById('cookie-cancel-prefs-btn')

    if (!banner) return

    const existingConsent = getConsent()

    // Show banner if no consent exists
    if (!existingConsent) {
      setTimeout(() => {
        banner.style.display = 'block'
      }, 1000)
    }

    // Accept button
    if (acceptBtn) {
      acceptBtn.onclick = function() {
        saveConsent({ essential: true, functionality: true, analytics: true, marketing: true })
        banner.style.display = 'none'
      }
    }

    // Reject button
    if (rejectBtn) {
      rejectBtn.onclick = function() {
        saveConsent({ essential: true, functionality: false, analytics: false, marketing: false })
        banner.style.display = 'none'
      }
    }

    // Preferences button
    if (prefsBtn && prefsPanel) {
      prefsBtn.onclick = function() {
        prefsPanel.style.display = prefsPanel.style.display === 'none' ? 'block' : 'none'
      }
    }

    // Save preferences
    if (savePrefsBtn) {
      savePrefsBtn.onclick = function() {
        const func = document.getElementById('cookie-func-toggle') as HTMLInputElement
        const analytics = document.getElementById('cookie-analytics-toggle') as HTMLInputElement
        const marketing = document.getElementById('cookie-marketing-toggle') as HTMLInputElement

        saveConsent({
          essential: true,
          functionality: func ? func.checked : false,
          analytics: analytics ? analytics.checked : false,
          marketing: marketing ? marketing.checked : false
        })

        banner.style.display = 'none'
      }
    }

    // Cancel preferences
    if (cancelPrefsBtn && prefsPanel) {
      cancelPrefsBtn.onclick = function() {
        prefsPanel.style.display = 'none'
      }
    }

    // Add CSS for button hover effects
    const style = document.createElement('style')
    style.textContent = `
      #cookie-consent-banner button {
        transition: all 0.2s ease;
      }
      #cookie-consent-banner button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      @media (max-width: 768px) {
        #cookie-consent-banner {
          padding: 16px !important;
        }
        #cookie-consent-banner h3 {
          font-size: 16px !important;
        }
        #cookie-consent-banner p {
          font-size: 13px !important;
        }
        #cookie-consent-banner button {
          padding: 8px 12px !important;
          font-size: 13px !important;
        }
      }
    `
    document.head.appendChild(style)

    // Cleanup function
    return () => {
      if (bannerContainer && bannerContainer.parentNode) {
        bannerContainer.parentNode.removeChild(bannerContainer)
      }
      if (style && style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  return null // This component only injects the banner, doesn't render anything
}
