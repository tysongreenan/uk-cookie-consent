'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Download, RefreshCw } from 'lucide-react'
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
  language: 'en' | 'fr' | 'auto'
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
    footerLink: {
      enabled: boolean
      text: string
      position: 'floating' | 'inline'
      floatingPosition?: 'bottom-left' | 'bottom-right'
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
    performance?: {
      deferNonCriticalScripts?: boolean
      useRequestIdleCallback?: boolean
      lazyLoadAnalytics?: boolean
      inlineCriticalCSS?: boolean
    }
  }
}

interface CodeGeneratorProps {
  config: BannerConfig
}

export function CodeGenerator({ config }: CodeGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'complete' | 'html' | 'js' | 'css'>('complete')
  const [codeVersion, setCodeVersion] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const regenerateCode = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setCodeVersion(prev => prev + 1)
    setIsGenerating(false)
    toast.success('Code regenerated successfully!')
  }

  // Helper function to safely encode script code for embedding
  const encodeScriptCode = (scriptCode: string): string => {
    if (!scriptCode || !scriptCode.trim()) return ''
    
    // Remove HTML comments and script tags
    let clean = scriptCode
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<script[^>]*>/gi, '')
      .replace(/<\/script>/gi, '')
      .trim()
    
    // Base64 encode to avoid any parsing issues
    return btoa(unescape(encodeURIComponent(clean)))
  }

  // Helper function to generate script loading code
  const generateScriptLoaders = (scripts: TrackingScript[], category: string): string => {
    const enabledScripts = scripts.filter(s => s.enabled && s.scriptCode.trim())
    if (enabledScripts.length === 0) return ''
    
    return enabledScripts.map(script => {
      const escaped = encodeScriptCode(script.scriptCode)
      const varName = `${category}_${script.id.replace(/[^a-zA-Z0-9]/g, '_')}`
      
      // Check if it's an external script URL
      const isExternalScript = script.scriptCode.includes('src=') || script.scriptCode.includes('http')
      
      if (isExternalScript) {
        // Handle external scripts
        const srcMatch = script.scriptCode.match(/src=["']([^"']+)["']/)
        if (srcMatch) {
          return `      // ${script.name} (External)
      try {
        var scriptEl_${varName} = document.createElement('script');
        scriptEl_${varName}.src = '${srcMatch[1]}';
        scriptEl_${varName}.async = true;
        document.head.appendChild(scriptEl_${varName});
        console.log('Loading external script: ${script.name}');
      } catch(e) {
        console.error('Error loading external script ${script.name}:', e);
      }`
        }
      }
      
      // Handle inline scripts - decode Base64 and execute
      return `      // ${script.name}
      try {
        var scriptCode_${varName} = atob('${escaped}');
        var scriptEl_${varName} = document.createElement('script');
        scriptEl_${varName}.textContent = scriptCode_${varName};
        document.head.appendChild(scriptEl_${varName});
        console.log('Loaded script: ${script.name}');
      } catch(e) {
        console.error('Error loading ${script.name}:', e);
      }`
    }).join('\n\n')
  }

  const generateHTML = () => {
    const logoElement = config.branding.logo.enabled && config.branding.logo.url
      ? `<img src="${config.branding.logo.url}" alt="Logo" style="max-width: ${config.branding.logo.maxWidth}px; max-height: ${config.branding.logo.maxHeight}px; object-fit: contain;" />`
      : ''

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
      
      if (config.layout.width === 'custom' && config.layout.customWidth) {
        styles += `width: ${config.layout.customWidth}px;`
      } else if (config.layout.width === 'container') {
        styles += `max-width: ${config.layout.maxWidth || 1200}px; margin: 0 auto;`
      }
      
      if (config.layout.borderRadius > 0) {
        styles += `border-radius: ${config.layout.borderRadius}px;`
      }
      
      styles += `padding: ${config.layout.padding}px;`
      
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
          return 'animation: cookieFadeIn 0.5s ease-out;'
        case 'slide':
          return 'animation: cookieSlideIn 0.5s ease-out;'
        case 'bounce':
          return 'animation: cookieBounceIn 0.6s ease-out;'
        case 'pulse':
          return 'animation: cookiePulse 2s infinite;'
        default:
          return ''
      }
    }

    return `<div id="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent" style="position: fixed; ${getPositionStyles()} background-color: ${config.colors.background}; color: ${config.colors.text}; ${getLayoutStyles()} z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; ${getAnimationStyles()} display: none;">
  <div style="position: relative;">
    ${(config.position.includes('floating') || config.position.includes('modal')) ? `<button id="cookie-close-btn" style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: ${config.colors.text}; font-size: 24px; cursor: pointer; padding: 4px 8px; line-height: 1; opacity: 0.7;" aria-label="Close">&times;</button>` : ''}
    
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      ${config.branding.logo.position === 'left' ? logoElement : ''}
      
      <div style="flex: 1; min-width: 250px;">
        ${config.branding.logo.position === 'center' ? `<div style="text-align: center; margin-bottom: 12px;">${logoElement}</div>` : ''}
        
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${config.text.title}</h3>
        
        <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5;">${config.text.message}${privacyPolicyLink ? ` ${privacyPolicyLink}` : ''}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="cookie-accept-btn" style="background-color: ${config.colors.button}; color: ${config.colors.buttonText}; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${config.text.acceptButton}</button>
          
          <button id="cookie-reject-btn" style="background-color: transparent; color: ${config.colors.button}; border: 1px solid ${config.colors.button}; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${config.text.rejectButton}</button>
          
          ${config.behavior.showPreferences ? `<button id="cookie-preferences-btn" style="background-color: transparent; color: ${config.colors.link}; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${config.text.preferencesButton}</button>` : ''}
        </div>
        
        ${config.behavior.showPreferences ? `
        <div id="cookie-preferences-panel" style="margin-top: 16px; padding: 16px; background-color: rgba(255,255,255,0.1); border-radius: 8px; display: none;">
          <h4 id="prefs-title" style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600;">Cookie Preferences</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <label style="display: flex; align-items: center; font-size: 13px; cursor: not-allowed; opacity: 0.7;"><input type="checkbox" checked disabled style="margin-right: 8px; accent-color: ${config.colors.button};"> <span><strong id="cat-necessary">Strictly Necessary</strong><br><small id="cat-necessary-desc" style="opacity: 0.8;">Essential for website functionality</small></span></label>
            <label style="display: flex; align-items: center; font-size: 13px; cursor: pointer;"><input type="checkbox" id="cookie-func-toggle" style="margin-right: 8px; accent-color: ${config.colors.button};"> <span><strong id="cat-functionality">Functionality</strong><br><small id="cat-functionality-desc" style="opacity: 0.8;">Remember preferences and choices</small></span></label>
            <label style="display: flex; align-items: center; font-size: 13px; cursor: pointer;"><input type="checkbox" id="cookie-analytics-toggle" style="margin-right: 8px; accent-color: ${config.colors.button};"> <span><strong id="cat-analytics">Analytics</strong><br><small id="cat-analytics-desc" style="opacity: 0.8;">Help us improve our website</small></span></label>
            <label style="display: flex; align-items: center; font-size: 13px; cursor: pointer;"><input type="checkbox" id="cookie-marketing-toggle" style="margin-right: 8px; accent-color: ${config.colors.button};"> <span><strong id="cat-marketing">Marketing</strong><br><small id="cat-marketing-desc" style="opacity: 0.8;">Personalized ads and content</small></span></label>
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
        ` : ''}
      </div>
      
      ${config.branding.logo.position === 'right' ? logoElement : ''}
    </div>
  </div>
</div>

${config.branding.footerLink.enabled && config.branding.footerLink.position === 'floating' ? `
<!-- Floating Cookie Settings Button -->
<div id="cookie-settings-float" style="
  position: fixed;
  ${config.branding.footerLink.floatingPosition === 'bottom-right' ? 'bottom: 20px; right: 20px;' : 'bottom: 20px; left: 20px;'}
  z-index: 999998;
  background: ${config.colors.button};
  color: ${config.colors.buttonText};
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border: none;
  display: none;
  transition: all 0.2s ease;
" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
  ${config.branding.footerLink.text}
</div>
` : ''}`
  }

  const generateJavaScript = () => {
    const strictlyNecessaryLoaders = generateScriptLoaders(config.scripts.strictlyNecessary, 'strict')
    const functionalityLoaders = generateScriptLoaders(config.scripts.functionality, 'func')
    const analyticsLoaders = generateScriptLoaders(config.scripts.trackingPerformance, 'analytics')
    const marketingLoaders = generateScriptLoaders(config.scripts.targetingAdvertising, 'marketing')

    return `(function() {
  'use strict';
  
  var COOKIE_NAME = 'cookie_consent';
  var COOKIE_EXPIRY = ${config.behavior.cookieExpiry};
  
  // Language translations
  var TRANSLATIONS = {
    en: {
      title: "${config.text.title.replace(/"/g, '\\"')}",
      message: "${config.text.message.replace(/"/g, '\\"')}",
      acceptButton: "${config.text.acceptButton.replace(/"/g, '\\"')}",
      rejectButton: "${config.text.rejectButton.replace(/"/g, '\\"')}",
      preferencesButton: "${config.text.preferencesButton.replace(/"/g, '\\"')}",
      footerLink: "${config.branding.footerLink.text.replace(/"/g, '\\"')}",
      preferencesTitle: "Cookie Preferences",
      strictlyNecessary: "Strictly Necessary",
      strictlyNecessaryDesc: "Essential for website functionality",
      functionality: "Functionality",
      functionalityDesc: "Remember preferences and choices",
      analytics: "Analytics",
      analyticsDesc: "Help us improve our website",
      marketing: "Marketing",
      marketingDesc: "Personalized ads and content",
      saveButton: "Save",
      cancelButton: "Cancel"
    },
    fr: {
      title: "Nous utilisons des cookies",
      message: "Ce site web utilise des cookies pour améliorer votre expérience de navigation et fournir du contenu personnalisé.",
      acceptButton: "Accepter tout",
      rejectButton: "Rejeter",
      preferencesButton: "Préférences",
      footerLink: "Paramètres des cookies",
      preferencesTitle: "Préférences des cookies",
      strictlyNecessary: "Strictement nécessaire",
      strictlyNecessaryDesc: "Essentiel pour le fonctionnement du site",
      functionality: "Fonctionnalité",
      functionalityDesc: "Mémoriser les préférences et les choix",
      analytics: "Analytique",
      analyticsDesc: "Nous aider à améliorer notre site",
      marketing: "Marketing",
      marketingDesc: "Publicités et contenu personnalisés",
      saveButton: "Enregistrer",
      cancelButton: "Annuler"
    }
  };
  
  function detectLanguage() {
    ${config.language === 'auto' ? `
    var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return browserLang.startsWith('fr') ? 'fr' : 'en';
    ` : `
    return '${config.language}';
    `}
  }
  
  function applyTranslations() {
    var lang = detectLanguage();
    var trans = TRANSLATIONS[lang] || TRANSLATIONS.en;
    
    // Main banner text
    var title = document.getElementById('cookie-title');
    var message = document.getElementById('cookie-message');
    var acceptBtn = document.getElementById('cookie-accept-btn');
    var rejectBtn = document.getElementById('cookie-reject-btn');
    var prefsBtn = document.getElementById('cookie-preferences-btn');
    var floatBtn = document.getElementById('cookie-settings-float');
    
    if (title) title.textContent = trans.title;
    if (message) message.textContent = trans.message;
    if (acceptBtn) acceptBtn.textContent = trans.acceptButton;
    if (rejectBtn) rejectBtn.textContent = trans.rejectButton;
    if (prefsBtn) prefsBtn.textContent = trans.preferencesButton;
    if (floatBtn) floatBtn.textContent = trans.footerLink;
    
    // Preferences panel
    var prefsTitle = document.getElementById('prefs-title');
    var catNecessary = document.getElementById('cat-necessary');
    var catNecessaryDesc = document.getElementById('cat-necessary-desc');
    var catFunctionality = document.getElementById('cat-functionality');
    var catFunctionalityDesc = document.getElementById('cat-functionality-desc');
    var catAnalytics = document.getElementById('cat-analytics');
    var catAnalyticsDesc = document.getElementById('cat-analytics-desc');
    var catMarketing = document.getElementById('cat-marketing');
    var catMarketingDesc = document.getElementById('cat-marketing-desc');
    var saveBtn = document.getElementById('cookie-save-prefs-btn');
    var cancelBtn = document.getElementById('cookie-cancel-prefs-btn');
    
    if (prefsTitle) prefsTitle.textContent = trans.preferencesTitle;
    if (catNecessary) catNecessary.textContent = trans.strictlyNecessary;
    if (catNecessaryDesc) catNecessaryDesc.textContent = trans.strictlyNecessaryDesc;
    if (catFunctionality) catFunctionality.textContent = trans.functionality;
    if (catFunctionalityDesc) catFunctionalityDesc.textContent = trans.functionalityDesc;
    if (catAnalytics) catAnalytics.textContent = trans.analytics;
    if (catAnalyticsDesc) catAnalyticsDesc.textContent = trans.analyticsDesc;
    if (catMarketing) catMarketing.textContent = trans.marketing;
    if (catMarketingDesc) catMarketingDesc.textContent = trans.marketingDesc;
    if (saveBtn) saveBtn.textContent = trans.saveButton;
    if (cancelBtn) cancelBtn.textContent = trans.cancelButton;
  }
  
  ${config.branding.footerLink.enabled ? `
  // Global function for inline cookie settings links
  window.showCookiePreferences = function() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'block';
    }
  };
  ` : ''}
  
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
  
  function setCookie(name, value, days) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    var secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax' + secure;
  }
  
  function getConsent() {
    var cookie = getCookie(COOKIE_NAME);
    if (cookie) {
      try {
        return JSON.parse(cookie);
      } catch(e) {
        return null;
      }
    }
    return null;
  }
  
  function saveConsent(consent) {
    setCookie(COOKIE_NAME, JSON.stringify(consent), COOKIE_EXPIRY);
    loadScripts(consent);
  }
  
  function loadScripts(consent) {
    console.log('Loading scripts with consent:', consent);
    
    // Strictly necessary (always loaded)
${strictlyNecessaryLoaders || '    // No strictly necessary scripts configured'}
    
    // Functionality scripts
    if (consent.functionality) {
${functionalityLoaders || '      // No functionality scripts configured'}
    }
    
    // Analytics scripts  
    if (consent.analytics) {
${analyticsLoaders || '      // No analytics scripts configured'}
    }
    
    // Marketing scripts
    if (consent.marketing) {
${marketingLoaders || '      // No marketing scripts configured'}
    }
    
    ${config.advanced.googleConsentMode ? `
    // Google Consent Mode v2
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'ad_user_data': consent.marketing ? 'granted' : 'denied',
        'ad_personalization': consent.marketing ? 'granted' : 'denied'
      });
    }
    ` : ''}
  }
  
  function init() {
    var banner = document.getElementById('cookie-consent-banner');
    var acceptBtn = document.getElementById('cookie-accept-btn');
    var rejectBtn = document.getElementById('cookie-reject-btn');
    var prefsBtn = document.getElementById('cookie-preferences-btn');
    var closeBtn = document.getElementById('cookie-close-btn');
    var prefsPanel = document.getElementById('cookie-preferences-panel');
    var savePrefsBtn = document.getElementById('cookie-save-prefs-btn');
    var cancelPrefsBtn = document.getElementById('cookie-cancel-prefs-btn');
    
    if (!banner) return;
    
    // Apply language translations
    applyTranslations();
    
    var existingConsent = getConsent();
    
    if (existingConsent) {
      loadScripts(existingConsent);
      
      ${config.branding.footerLink.enabled && config.branding.footerLink.position === 'floating' ? `
      // Show cookie settings floating button after consent is given
      var floatBtn = document.getElementById('cookie-settings-float');
      if (floatBtn) {
        floatBtn.style.display = 'block';
        floatBtn.onclick = function() {
          banner.style.display = 'block';
        };
      }
      ` : ''}
      
      return;
    }
    
    ${config.behavior.autoShow ? 'banner.style.display = "block";' : ''}
    
    if (acceptBtn) {
      acceptBtn.onclick = function() {
        saveConsent({ essential: true, functionality: true, analytics: true, marketing: true });
        banner.style.display = 'none';
        ${config.branding.footerLink.enabled && config.branding.footerLink.position === 'floating' ? `
        // Show floating cookie settings button after accepting
        var floatBtn = document.getElementById('cookie-settings-float');
        if (floatBtn) {
          floatBtn.style.display = 'block';
          floatBtn.onclick = function() {
            banner.style.display = 'block';
          };
        }
        ` : ''}
      };
    }
    
    if (rejectBtn) {
      rejectBtn.onclick = function() {
        saveConsent({ essential: true, functionality: false, analytics: false, marketing: false });
        banner.style.display = 'none';
        ${config.branding.footerLink.enabled && config.branding.footerLink.position === 'floating' ? `
        // Show floating cookie settings button after rejecting (so user can change mind)
        var floatBtn = document.getElementById('cookie-settings-float');
        if (floatBtn) {
          floatBtn.style.display = 'block';
          floatBtn.onclick = function() {
            banner.style.display = 'block';
          };
        }
        ` : ''}
      };
    }
    
    if (closeBtn) {
      closeBtn.onclick = function() {
        banner.style.display = 'none';
      };
    }
    
    if (prefsBtn && prefsPanel) {
      prefsBtn.onclick = function() {
        prefsPanel.style.display = prefsPanel.style.display === 'none' ? 'block' : 'none';
      };
    }
    
    if (savePrefsBtn) {
      savePrefsBtn.onclick = function() {
        var func = document.getElementById('cookie-func-toggle');
        var analytics = document.getElementById('cookie-analytics-toggle');
        var marketing = document.getElementById('cookie-marketing-toggle');
        
        saveConsent({
          essential: true,
          functionality: func ? func.checked : false,
          analytics: analytics ? analytics.checked : false,
          marketing: marketing ? marketing.checked : false
        });
        
        banner.style.display = 'none';
      };
    }
    
    if (cancelPrefsBtn && prefsPanel) {
      cancelPrefsBtn.onclick = function() {
        prefsPanel.style.display = 'none';
      };
    }
    
    ${config.behavior.dismissOnScroll ? `
    var scrolled = false;
    window.addEventListener('scroll', function() {
      if (!scrolled && window.pageYOffset > 100) {
        scrolled = true;
        banner.style.display = 'none';
      }
    });
    ` : ''}
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();`
  }

  const generateCSS = () => {
    return `#cookie-consent-banner * {
  box-sizing: border-box;
}

#cookie-consent-banner button {
  transition: all 0.2s ease;
}

#cookie-consent-banner button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

@keyframes cookieFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cookieSlideIn {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes cookieBounceIn {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes cookiePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@media (max-width: 768px) {
  #cookie-consent-banner {
    padding: 16px !important;
    left: 0 !important;
    right: 0 !important;
    max-width: none !important;
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

${config.advanced.customCSS}`
  }

  const generateCompleteCode = () => {
    return `<!-- Cookie Consent Banner - Copy this entire block -->
<style>
${generateCSS()}
</style>

<script>
${generateJavaScript()}
</script>

${generateHTML()}
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
    const ext = activeTab === 'complete' ? 'html' : activeTab === 'html' ? 'html' : activeTab === 'js' ? 'js' : 'css'
    const filename = `cookie-banner-${activeTab}.${ext}`
    
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
      {/* Instructions at the top */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-medium text-blue-900 mb-2">📋 Installation Instructions:</p>
        <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
          <li><strong>Click the "Copy" button</strong> below to copy the complete code</li>
          <li><strong>Paste it in your website</strong> just before the closing <code>&lt;/body&gt;</code> tag</li>
          <li><strong>Save and refresh</strong> your website to see the banner</li>
        </ol>
        <p className="text-xs text-blue-700 mt-2">⚠️ If you see raw code on your page, you pasted it in the wrong place. Make sure it's inside your HTML file, not in a text editor or CMS text field.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button onClick={copyToClipboard} size="sm" className="flex-1">
          <Copy className="mr-2 h-4 w-4" />
          Copy Code
        </Button>
        <Button onClick={regenerateCode} variant="outline" size="sm" disabled={isGenerating} className="flex-1">
          <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </Button>
        <Button onClick={downloadCode} variant="outline" size="sm" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {['complete', 'html', 'js', 'css'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'complete' ? 'Complete Code' : tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                {activeTab === 'complete' ? 'Paste this code before closing </body> tag' : `${activeTab.toUpperCase()} only`}
              </span>
            </div>
          </div>
          <pre className="p-4 text-sm overflow-x-auto bg-muted/50 max-h-96">
            <code>{getCode()}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}