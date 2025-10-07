'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Download, ExternalLink, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface TrackingScript {
  id: string
  name: string
  category: 'strictly-necessary' | 'functionality' | 'tracking-performance' | 'targeting-advertising'
  scriptCode: string
  enabled: boolean
}

interface BannerConfig {
  name: string
  position: 'top' | 'bottom' | 'floating-bottom-right' | 'floating-bottom-left' | 'floating-top-right' | 'floating-top-left' | 'modal-center' | 'modal-bottom' | 'modal-top' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom'
  theme: 'light' | 'dark' | 'custom'
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
  }
  text: {
    title: string
    message: string
    acceptButton: string
    rejectButton: string
    preferencesButton: string
  }
  behavior: {
    autoShow: boolean
    dismissOnScroll: boolean
    showPreferences: boolean
    cookieExpiry: number
  }
  branding: {
    logo: {
      enabled: boolean
      url: string
      position: 'left' | 'right' | 'center' | 'hidden'
      maxWidth: number
      maxHeight: number
    }
    privacyPolicy: {
      url: string
      text: string
      openInNewTab: boolean
      required: boolean
    }
  }
  layout: {
    width: 'full' | 'container' | 'custom'
    customWidth?: number
    maxWidth?: number
    borderRadius: number
    padding: number
    margin: number
    shadow: 'none' | 'small' | 'medium' | 'large'
    animation: 'none' | 'fade' | 'slide' | 'bounce' | 'pulse'
  }
  scripts: {
    strictlyNecessary: TrackingScript[]
    functionality: TrackingScript[]
    trackingPerformance: TrackingScript[]
    targetingAdvertising: TrackingScript[]
  }
  advanced: {
    googleConsentMode: boolean
    customCSS: string
    customJS: string
  }
}

interface CodeGeneratorProps {
  config: BannerConfig
}

export function CodeGenerator({ config }: CodeGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'complete' | 'html' | 'js' | 'css'>('complete')
  const [codeVersion, setCodeVersion] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  // Function to regenerate code
  const regenerateCode = async () => {
    setIsGenerating(true)
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 500))
    setCodeVersion(prev => prev + 1)
    setIsGenerating(false)
    toast.success('Code regenerated successfully!')
  }

  const generateHTML = () => {
    const logoElement = config.branding.logo.enabled && config.branding.logo.url
      ? `<img src="${config.branding.logo.url}" alt="Logo" style="max-width: ${config.branding.logo.maxWidth}px; max-height: ${config.branding.logo.maxHeight}px; object-fit: contain;" />`
      : ''

    const logoPosition = config.branding.logo.position === 'center' ? 'center' : 
                        config.branding.logo.position === 'right' ? 'flex-end' : 'flex-start'

    const privacyPolicyLink = config.branding.privacyPolicy.url
      ? `<a href="${config.branding.privacyPolicy.url}" ${config.branding.privacyPolicy.openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: ${config.colors.link}; text-decoration: underline;">${config.branding.privacyPolicy.text}</a>`
      : ''

    const getPositionStyles = () => {
      switch (config.position) {
        case 'top':
          return 'top: 0; left: 0; right: 0;'
        case 'bottom':
          return 'bottom: 0; left: 0; right: 0;'
        case 'floating-bottom-right':
          return 'bottom: 20px; right: 20px; max-width: 400px;'
        case 'floating-bottom-left':
          return 'bottom: 20px; left: 20px; max-width: 400px;'
        case 'floating-top-right':
          return 'top: 20px; right: 20px; max-width: 400px;'
        case 'floating-top-left':
          return 'top: 20px; left: 20px; max-width: 400px;'
        case 'modal-center':
          return 'top: 50%; left: 50%; transform: translate(-50%, -50%); max-width: 500px;'
        case 'modal-bottom':
          return 'bottom: 20px; left: 50%; transform: translateX(-50%); max-width: 500px;'
        case 'modal-top':
          return 'top: 20px; left: 50%; transform: translateX(-50%); max-width: 500px;'
        case 'slide-in-right':
          return 'top: 50%; right: 0; transform: translateY(-50%); max-width: 400px;'
        case 'slide-in-left':
          return 'top: 50%; left: 0; transform: translateY(-50%); max-width: 400px;'
        case 'slide-in-top':
          return 'top: 0; left: 50%; transform: translateX(-50%); max-width: 500px;'
        case 'slide-in-bottom':
          return 'bottom: 0; left: 50%; transform: translateX(-50%); max-width: 500px;'
        default:
          return 'bottom: 0; left: 0; right: 0;'
      }
    }

    const getLayoutStyles = () => {
      let styles = ''
      
      // Width handling
      if (config.layout.width === 'custom' && config.layout.customWidth) {
        styles += `width: ${config.layout.customWidth}px;`
      } else if (config.layout.width === 'container') {
        styles += `max-width: ${config.layout.maxWidth || 1200}px; margin: 0 auto;`
      }
      
      // Border radius
      if (config.layout.borderRadius > 0) {
        styles += `border-radius: ${config.layout.borderRadius}px;`
      }
      
      // Padding
      styles += `padding: ${config.layout.padding}px;`
      
      // Shadow
      switch (config.layout.shadow) {
        case 'small':
          styles += 'box-shadow: 0 2px 4px rgba(0,0,0,0.1);'
          break
        case 'medium':
          styles += 'box-shadow: 0 4px 12px rgba(0,0,0,0.15);'
          break
        case 'large':
          styles += 'box-shadow: 0 8px 24px rgba(0,0,0,0.2);'
          break
      }
      
      return styles
    }

    const getAnimationStyles = () => {
      switch (config.layout.animation) {
        case 'fade':
          return 'animation: fadeIn 0.5s ease-out;'
        case 'slide':
          return 'animation: slideIn 0.5s ease-out;'
        case 'bounce':
          return 'animation: bounceIn 0.6s ease-out;'
        case 'pulse':
          return 'animation: pulse 2s infinite;'
        default:
          return ''
      }
    }

    return `<!-- Cookie Consent Banner -->
<div id="cookie-consent-banner" role="dialog" aria-live="polite" style="
  position: fixed;
  ${getPositionStyles()}
  background-color: ${config.colors.background};
  color: ${config.colors.text};
  ${getLayoutStyles()}
  z-index: 10000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  ${getAnimationStyles()}
  display: none;
">
  <div style="position: relative;">
    ${(config.position.includes('floating') || config.position.includes('modal')) ? `
    <button id="close-banner" style="
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      color: ${config.colors.text};
      font-size: 18px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
      opacity: 0.7;
    " aria-label="Close banner">
      ×
    </button>
    ` : ''}
    
    <div style="display: flex; align-items: flex-start; gap: 16px;">
    ${config.branding.logo.position === 'left' ? logoElement : ''}
    
    <div style="flex: 1;">
      ${config.branding.logo.position === 'center' ? `<div style="text-align: center; margin-bottom: 12px;">${logoElement}</div>` : ''}
      
      <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">
        ${config.text.title}
      </h3>
      
      <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5;">
        ${config.text.message}
        ${privacyPolicyLink ? ` ${privacyPolicyLink}` : ''}
      </p>
      
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="accept-cookies" style="
          background-color: ${config.colors.button};
          color: ${config.colors.buttonText};
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        ">
          ${config.text.acceptButton}
        </button>
        
        <button id="reject-cookies" style="
          background-color: transparent;
          color: ${config.colors.button};
          border: 1px solid ${config.colors.button};
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        ">
          ${config.text.rejectButton}
        </button>
        
        ${config.behavior.showPreferences ? `
        <button id="preferences-cookies" style="
          background-color: transparent;
          color: ${config.colors.link};
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        ">
          ${config.text.preferencesButton}
        </button>
        ` : ''}
      </div>
      
      <div id="cookie-preferences" style="
        margin-top: 16px;
        padding: 12px;
        background-color: rgba(255,255,255,0.1);
        border-radius: 4px;
        display: none;
      ">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Cookie Preferences</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="display: flex; align-items: center; font-size: 13px; font-weight: 500;">
              <input type="checkbox" checked disabled style="margin-right: 8px;">
              Strictly Necessary
            </label>
            <p style="font-size: 11px; opacity: 0.75; margin: 4px 0 0 24px;">Essential for website functionality and security</p>
          </div>
          
          <div>
            <label style="display: flex; align-items: center; font-size: 13px; font-weight: 500;">
              <input type="checkbox" id="functionality-cookies" style="margin-right: 8px;">
              Functionality
            </label>
            <p style="font-size: 11px; opacity: 0.75; margin: 4px 0 0 24px;">Remember your choices and preferences</p>
          </div>
          
          <div>
            <label style="display: flex; align-items: center; font-size: 13px; font-weight: 500;">
              <input type="checkbox" id="analytics-cookies" style="margin-right: 8px;">
              Tracking & Performance
            </label>
            <p style="font-size: 11px; opacity: 0.75; margin: 4px 0 0 24px;">Analytics and performance monitoring (Google Analytics, Microsoft Clarity)</p>
          </div>
          
          <div>
            <label style="display: flex; align-items: center; font-size: 13px; font-weight: 500;">
              <input type="checkbox" id="marketing-cookies" style="margin-right: 8px;">
              Targeting & Advertising
            </label>
            <p style="font-size: 11px; opacity: 0.75; margin: 4px 0 0 24px;">Personalized ads and marketing (Facebook Pixel, Google Ads)</p>
          </div>
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
          <button id="save-preferences" style="
            background-color: ${config.colors.button};
            color: ${config.colors.buttonText};
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
          ">
            Save Preferences
          </button>
          <button id="cancel-preferences" style="
            background-color: transparent;
            color: ${config.colors.text};
            border: 1px solid ${config.colors.text};
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            font-weight: 500;
          ">
            Cancel
          </button>
        </div>
      </div>
    </div>
    
    ${config.branding.logo.position === 'right' ? logoElement : ''}
  </div>
  </div>
</div>`
  }

  const generateJavaScript = () => {
    return `// Cookie Consent Banner JavaScript
(function() {
  'use strict';
  
  // Wait for DOM to be ready before accessing elements
  function initializeCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');
    const preferencesBtn = document.getElementById('preferences-cookies');
    const preferencesPanel = document.getElementById('cookie-preferences');
    const closeBtn = document.getElementById('close-banner');
    
    const COOKIE_NAME = 'cookie_consent';
    const COOKIE_EXPIRY = ${config.behavior.cookieExpiry}; // days
    
    // Check if user has already made a choice
    function hasConsent() {
      const cookies = document.cookie.split(';');
      return cookies.some(cookie => cookie.trim().startsWith(COOKIE_NAME + '='));
    }
    
    // Get consent data from cookie
    function getConsentData() {
      const cookies = document.cookie.split(';');
      const consentCookie = cookies.find(cookie => cookie.trim().startsWith(COOKIE_NAME + '='));
      if (consentCookie) {
        try {
          const consentValue = consentCookie.split('=')[1];
          return JSON.parse(decodeURIComponent(consentValue));
        } catch (e) {
          console.warn('Failed to parse consent cookie:', e);
          return null;
        }
      }
      return null;
    }
  
    // Set cookie
    function setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      const secureFlag = location.protocol === 'https:' ? ';Secure' : '';
      document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax' + secureFlag;
    }
    
    // Hide banner
    function hideBanner() {
      if (banner) {
        banner.style.display = 'none';
      }
    }
    
    // Show banner
    function showBanner() {
      if (banner) {
        banner.style.display = 'block';
      }
    }
  
    // Accept all cookies
    function acceptAll() {
      const consent = {
        essential: true,
        functionality: true,
        analytics: true,
        marketing: true
      };
      
      setCookie(COOKIE_NAME, consent, COOKIE_EXPIRY);
      ${config.advanced.googleConsentMode ? `
      // Google Consent Mode v2
      if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
      ` : ''}
      
      // Load all scripts
      loadScriptsByConsent(consent);
      
      hideBanner();
      ${config.advanced.customJS ? `\n      // Custom JavaScript\n      ${config.advanced.customJS}` : ''}
    }
  
  // Reject all cookies
  function rejectAll() {
    const consent = {
      essential: true,
      functionality: false,
      analytics: false,
      marketing: false
    };
    
    setCookie(COOKIE_NAME, consent, COOKIE_EXPIRY);
    ${config.advanced.googleConsentMode ? `
    // Google Consent Mode v2
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    ` : ''}
    
    // Load only essential scripts
    loadScriptsByConsent(consent);
    
    hideBanner();
  }
  
  // Save preferences
  function savePreferences() {
    const functionality = document.getElementById('functionality-cookies')?.checked || false;
    const analytics = document.getElementById('analytics-cookies')?.checked || false;
    const marketing = document.getElementById('marketing-cookies')?.checked || false;
    
    const consent = {
      essential: true,
      functionality: functionality,
      analytics: analytics,
      marketing: marketing
    };
    
    setCookie(COOKIE_NAME, consent, COOKIE_EXPIRY);
    
    ${config.advanced.googleConsentMode ? `
    // Google Consent Mode v2
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': analytics ? 'granted' : 'denied',
        'ad_storage': marketing ? 'granted' : 'denied',
        'ad_user_data': marketing ? 'granted' : 'denied',
        'ad_personalization': marketing ? 'granted' : 'denied'
      });
    }
    ` : ''}
    
    // Load scripts based on consent
    loadScriptsByConsent(consent);
    
    hideBanner();
  }
  

    // Helper function to execute script code safely
    function executeScript(scriptCode, scriptName) {
      try {
        console.log('Executing script:', scriptName);
        
        // Remove all script tags and HTML comments
        let cleanCode = scriptCode.trim();
        
        // Remove HTML comments
        cleanCode = cleanCode.replace(/<!--[\s\S]*?-->/g, '');
        
        // Remove all <script> and </script> tags completely
        cleanCode = cleanCode.replace(/<\/?script[^>]*>/gi, '');
        
        // Handle external script URLs (look for src= in the original code)
        if (scriptCode.includes('src=')) {
          const srcMatch = scriptCode.match(/src=["']([^"']+)["']/);
          if (srcMatch) {
            console.log('Loading external script:', srcMatch[1]);
            const script = document.createElement('script');
            script.src = srcMatch[1];
            script.async = true;
            document.head.appendChild(script);
            return;
          }
        }
        
        // Execute inline JavaScript (now clean of script tags)
        if (cleanCode) {
          console.log('Executing inline script for:', scriptName);
          // Create dynamic script element for safer execution
          const script = document.createElement('script');
          script.textContent = cleanCode;
          document.head.appendChild(script);
          document.head.removeChild(script);
        }
      } catch (error) {
        console.error('Error executing script "' + scriptName + '":', error);
      }
    }

  // Load scripts based on user consent with performance optimizations
  function loadScriptsByConsent(consent) {
    console.log('Loading scripts with consent:', consent);
    
    // Strictly necessary scripts (always loaded immediately)
    ${config.scripts.strictlyNecessary.filter(script => script.enabled && script.scriptCode.trim()).map(script => {
      const cleanCode = script.scriptCode.trim()
      // Remove script tags BEFORE escaping to prevent browser parsing issues
      const noScriptTags = cleanCode.replace(/<\/?script[^>]*>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
      const escapedCode = noScriptTags.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/<\/script>/gi, '<\\/script>')
      return cleanCode ? `    // ${script.name}\n    console.log('Loading strictly necessary script: ${script.name}');\n    executeScript(\`${escapedCode}\`, '${script.name}');` : ''
    }).filter(code => code).join('\n\n')}
    
    // Non-critical scripts loaded with performance optimizations
    const loadNonCriticalScripts = () => {
      // Functionality scripts (deferred)
      if (consent.functionality) {
        ${config.scripts.functionality.filter(script => script.enabled && script.scriptCode.trim()).map(script => {
          const cleanCode = script.scriptCode.trim()
          // Remove script tags BEFORE escaping to prevent browser parsing issues
          const noScriptTags = cleanCode.replace(/<\/?script[^>]*>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
          const escapedCode = noScriptTags.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/<\/script>/gi, '<\\/script>')
          return cleanCode ? `        // ${script.name}\n        console.log('Loading functionality script: ${script.name}');\n        executeScript(\`${escapedCode}\`, '${script.name}');` : ''
        }).filter(code => code).join('\n\n        ')}
      }
      
      // Analytics scripts (deferred + lazy loaded)
      if (consent.analytics) {
        ${config.scripts.trackingPerformance.filter(script => script.enabled && script.scriptCode.trim()).map(script => {
          const cleanCode = script.scriptCode.trim()
          // Remove script tags BEFORE escaping to prevent browser parsing issues
          const noScriptTags = cleanCode.replace(/<\/?script[^>]*>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
          const escapedCode = noScriptTags.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/<\/script>/gi, '<\\/script>')
          return cleanCode ? `        // ${script.name}\n        console.log('Loading analytics script: ${script.name}');\n        executeScript(\`${escapedCode}\`, '${script.name}');` : ''
        }).filter(code => code).join('\n\n        ')}
      }
      
      // Marketing scripts (deferred + lazy loaded)
      if (consent.marketing) {
        ${config.scripts.targetingAdvertising.filter(script => script.enabled && script.scriptCode.trim()).map(script => {
          const cleanCode = script.scriptCode.trim()
          // Remove script tags BEFORE escaping to prevent browser parsing issues
          const noScriptTags = cleanCode.replace(/<\/?script[^>]*>/gi, '').replace(/<!--[\s\S]*?-->/g, '')
          const escapedCode = noScriptTags.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/<\/script>/gi, '<\\/script>')
          return cleanCode ? `        // ${script.name}\n        console.log('Loading marketing script: ${script.name}');\n        executeScript(\`${escapedCode}\`, '${script.name}');` : ''
        }).filter(code => code).join('\n\n        ')}
      }
    };
    
    // Load non-critical scripts with performance optimizations
    ${(config.advanced.performance?.deferNonCriticalScripts ?? true) ? `
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadNonCriticalScripts);
    } else {
      // Use requestIdleCallback for better performance, fallback to setTimeout
      ${(config.advanced.performance?.useRequestIdleCallback ?? true) ? `
      if (window.requestIdleCallback) {
        requestIdleCallback(loadNonCriticalScripts, { timeout: 2000 });
      } else {
        setTimeout(loadNonCriticalScripts, 100);
      }
      ` : `
      setTimeout(loadNonCriticalScripts, 100);
      `}
    }
    ` : `
    // Load immediately (performance optimizations disabled)
    loadNonCriticalScripts();
    `}
  }
  
  // Toggle preferences panel
  function togglePreferences() {
    if (preferencesPanel) {
      const isVisible = preferencesPanel.style.display !== 'none';
      preferencesPanel.style.display = isVisible ? 'none' : 'block';
    }
  }
  
  // Event listeners
  if (acceptBtn) acceptBtn.addEventListener('click', acceptAll);
  if (rejectBtn) rejectBtn.addEventListener('click', rejectAll);
  if (preferencesBtn) preferencesBtn.addEventListener('click', togglePreferences);
  if (closeBtn) closeBtn.addEventListener('click', hideBanner);
  
  // Save and cancel preferences buttons
  const savePrefsBtn = document.getElementById('save-preferences');
  const cancelPrefsBtn = document.getElementById('cancel-preferences');
  if (savePrefsBtn) savePrefsBtn.addEventListener('click', savePreferences);
  if (cancelPrefsBtn) cancelPrefsBtn.addEventListener('click', () => {
    if (preferencesPanel) preferencesPanel.style.display = 'none';
  });
  
  // Dismiss on scroll
  ${config.behavior.dismissOnScroll ? `
  let scrollTimer;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function() {
      if (!hasConsent()) {
        hideBanner();
      }
    }, 1000);
  });
  ` : ''}
  
  // Load existing preferences and show banner
  function initializeBanner() {
    const existingConsent = getConsentData();
    
    if (existingConsent) {
      // Load existing consent preferences
      const functionalityCheckbox = document.getElementById('functionality-cookies');
      const analyticsCheckbox = document.getElementById('analytics-cookies');
      const marketingCheckbox = document.getElementById('marketing-cookies');
      
      if (functionalityCheckbox) functionalityCheckbox.checked = existingConsent.functionality;
      if (analyticsCheckbox) analyticsCheckbox.checked = existingConsent.analytics;
      if (marketingCheckbox) marketingCheckbox.checked = existingConsent.marketing;
      
      // Load scripts based on existing consent
      loadScriptsByConsent(existingConsent);
      hideBanner();
    } else {
      // Show banner for new users
      ${config.behavior.autoShow ? 'showBanner();' : ''}
    }
  }
  
    // Initialize banner
    initializeBanner();
    
    // Initialize Google Consent Mode
    ${config.advanced.googleConsentMode ? `
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
    }
    ` : ''}
  }
  
  // Start the cookie banner when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCookieBanner);
  } else {
    initializeCookieBanner();
  }
})();`
  }

  const generateCSS = () => {
    return `/* Cookie Consent Banner Styles */
#cookie-consent-banner {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
}

#cookie-consent-banner * {
  box-sizing: border-box;
}

#cookie-consent-banner button {
  transition: all 0.2s ease;
}

#cookie-consent-banner button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

#cookie-consent-banner a {
  transition: opacity 0.2s ease;
}

#cookie-consent-banner a:hover {
  opacity: 0.8;
}

#cookie-consent-banner input[type="checkbox"] {
  accent-color: ${config.colors.button};
}

/* Animation keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
}

@keyframes bounceIn {
  0% { 
    transform: scale(0.3); 
    opacity: 0; 
  }
  50% { 
    transform: scale(1.05); 
  }
  70% { 
    transform: scale(0.9); 
  }
  100% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1); 
  }
  50% { 
    transform: scale(1.05); 
  }
}

/* Responsive design */
@media (max-width: 768px) {
  #cookie-consent-banner {
    padding: 16px;
  }
  
  #cookie-consent-banner h3 {
    font-size: 16px !important;
  }
  
  #cookie-consent-banner p {
    font-size: 13px !important;
  }
  
  #cookie-consent-banner button {
    padding: 6px 12px !important;
    font-size: 13px !important;
  }
  
  #cookie-consent-banner div[style*="display: flex"] {
    flex-direction: column !important;
    gap: 8px !important;
  }
}

/* Custom CSS */
${config.advanced.customCSS}`
  }

  const generateCompleteCode = () => {
    const html = generateHTML()
    const js = generateJavaScript()
    const css = generateCSS()
    
    // Ensure the JavaScript is properly closed
    const completeJS = js.endsWith('})();') ? js : js + '\n})();'
    
    return `<!-- Cookie Consent Banner - Performance Optimized -->
<!-- IMPORTANT: Copy the CSS and JavaScript to your <head> section, and the HTML to your <body> section -->

<!-- ===== COPY TO <head> SECTION ===== -->
${(config.advanced.performance?.inlineCriticalCSS ?? true) ? `
<!-- Critical CSS (inline for faster rendering) -->
<style>
${css}
</style>
` : `
<!-- CSS (external for better caching) -->
<link rel="stylesheet" href="data:text/css;base64,${btoa(css)}">
`}

<!-- JavaScript (deferred for better performance) -->
<script>
${completeJS}
</script>

<!-- ===== COPY TO <body> SECTION (before closing </body> tag) ===== -->
<!-- Banner HTML (minimal, non-blocking) -->
${html}

<!-- Performance Optimizations:
${(config.advanced.performance?.deferNonCriticalScripts ?? true) ? '- Non-critical scripts are deferred using requestIdleCallback' : '- All scripts load immediately'}
${(config.advanced.performance?.useRequestIdleCallback ?? true) ? '- Scripts load during browser idle time' : '- Scripts load with standard timing'}
${(config.advanced.performance?.lazyLoadAnalytics ?? true) ? '- Analytics scripts are lazy loaded' : '- Analytics scripts load normally'}
${(config.advanced.performance?.inlineCriticalCSS ?? true) ? '- Critical CSS is inlined to prevent render blocking' : '- CSS is loaded externally for better caching'}
- Strictly necessary scripts always load immediately
-->

<!-- End Cookie Consent Banner -->`
  }

  const getCode = () => {
    switch (activeTab) {
      case 'complete':
        return generateCompleteCode()
      case 'html':
        return generateHTML()
      case 'js':
        return generateJavaScript()
      case 'css':
        return generateCSS()
      default:
        return generateCompleteCode()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCode())
      toast.success('Code copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const downloadCode = () => {
    const code = getCode()
    const filename = `cookie-banner-${activeTab}.${activeTab === 'html' ? 'html' : activeTab === 'js' ? 'js' : 'css'}`
    
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success(`Downloaded ${filename}`)
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('complete')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'complete'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Complete Code
        </button>
        <button
          onClick={() => setActiveTab('html')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'html'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          HTML
        </button>
        <button
          onClick={() => setActiveTab('js')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'js'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          JavaScript
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'css'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          CSS
        </button>
      </div>

      {/* Code Display */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                Code generated {codeVersion > 0 ? `(v${codeVersion})` : '(initial)'}
              </span>
            </div>
            {codeVersion > 0 && (
              <span className="text-xs text-green-600 font-medium">
                ✓ Updated
              </span>
            )}
          </div>
          <pre className="p-4 text-sm overflow-x-auto bg-muted/50 rounded-lg">
            <code className="language-html">{getCode()}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button 
          onClick={regenerateCode} 
          variant="default" 
          size="sm" 
          disabled={isGenerating}
          className="flex-1"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Generate Code'}
        </Button>
        <Button onClick={copyToClipboard} size="sm" className="flex-1">
          <Copy className="mr-2 h-4 w-4" />
          Copy Code
        </Button>
        <Button onClick={downloadCode} variant="outline" size="sm" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground space-y-1">
        {activeTab === 'complete' && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 font-medium">🎉 Complete Code Ready!</p>
            <p className="text-green-700">Click <strong>"Generate Code"</strong> to refresh the code after making changes.</p>
            <p className="text-green-700 mt-2"><strong>📋 Copy Instructions:</strong></p>
            <ul className="text-green-700 text-sm mt-1 ml-4 list-disc">
              <li>Copy the <strong>CSS and JavaScript</strong> to your website's <code>&lt;head&gt;</code> section</li>
              <li>Copy the <strong>HTML</strong> to your website's <code>&lt;body&gt;</code> section (before closing <code>&lt;/body&gt;</code> tag)</li>
            </ul>
            <p className="text-green-700 mt-2"><strong>⚠️ Important:</strong> If you see code displayed on your website, you pasted the HTML in the wrong place!</p>
          </div>
        )}
        <p><strong>Complete Code:</strong> Everything in one block - CSS/JS to &lt;head&gt;, HTML to &lt;body&gt;</p>
        <p><strong>HTML:</strong> Just the banner HTML structure (paste in &lt;body&gt;)</p>
        <p><strong>JavaScript:</strong> Just the functionality code (paste in &lt;head&gt;)</p>
        <p><strong>CSS:</strong> Just the styling code (paste in &lt;head&gt;)</p>
      </div>
    </div>
  )
}
