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
  bodyCode?: string // Optional body code (e.g., for GTM noscript)
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
  integrations?: {
    googleAnalytics?: {
      enabled: boolean
      measurementId: string
      trackConsentEvents: boolean
      trackImpressions: boolean
      anonymizeIp: boolean
    }
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

// Helper function to generate floating button styles
function generateFloatingButtonStyles(config: any): string {
  const floatingStyle = config.branding?.footerLink?.floatingStyle || {}
  const shape = floatingStyle.shape || 'pill'
  const size = floatingStyle.size || 'small'
  const useCustomColors = floatingStyle.useCustomColors || false
  const customColors = floatingStyle.customColors || {}
  
  // Size mapping
  const sizeMap = {
    small: { width: '40px', height: '40px', padding: '8px', fontSize: '12px' },
    medium: { width: '48px', height: '48px', padding: '12px', fontSize: '14px' },
    large: { width: '56px', height: '56px', padding: '16px', fontSize: '16px' }
  }
  
  const sizeProps = sizeMap[size as keyof typeof sizeMap] || sizeMap.small
  
  // Shape-specific styles
  let borderRadius = '6px'
  let width = 'auto'
  let height = 'auto'
  let padding = sizeProps.padding
  
  if (shape === 'circle') {
    borderRadius = '50%'
    width = sizeProps.width
    height = sizeProps.height
    padding = '0'
  } else if (shape === 'square') {
    borderRadius = '8px'
    width = sizeProps.width
    height = sizeProps.height
    padding = '0'
  }
  
  // Color handling
  let backgroundColor = 'rgba(107, 114, 128, 0.9)'
  let color = '#ffffff'
  let border = 'none'
  
  if (useCustomColors) {
    backgroundColor = customColors.background || 'rgba(107, 114, 128, 0.9)'
    color = customColors.text || '#ffffff'
    if (customColors.border) {
      border = `1px solid ${customColors.border}`
    }
  } else {
    // Use banner button colors
    backgroundColor = config.colors?.button || '#3b82f6'
    color = config.colors?.buttonText || '#ffffff'
  }
  
  return `
    background: ${backgroundColor} !important;
    color: ${color} !important;
    border: ${border} !important;
    padding: ${padding} !important;
    border-radius: ${borderRadius} !important;
    width: ${width} !important;
    height: ${height} !important;
    font-size: ${sizeProps.fontSize} !important;
    font-weight: 500 !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    overflow: hidden !important;
  `
}

// Helper function to generate inline footer link HTML
function generateInlineFooterLinkHTML(footerLink: any): string {
  const text = footerLink.text || 'Cookie Settings'
  const linkType = footerLink.inlineStyle?.linkType || 'plain'
  const includeIcon = footerLink.inlineStyle?.includeIcon || false
  const includeLogo = footerLink.inlineStyle?.includeLogo || false
  const customClass = footerLink.inlineStyle?.customClass || ''

  let html = ''

  switch (linkType) {
    case 'plain':
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}">${text}</a>`
      break
    case 'button':
      html = `<button onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-btn${customClass ? ' ' + customClass : ''}" style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">${text}</button>`
      break
    case 'icon-text':
      const icon = includeIcon ? '🍪 ' : ''
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}">${icon}${text}</a>`
      break
    case 'custom':
      const customIcon = includeIcon ? '🍪 ' : ''
      const customLogo = includeLogo ? '<img src="YOUR_LOGO_URL" alt="Logo" style="height: 16px; margin-right: 4px;" />' : ''
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}">${customLogo}${customIcon}${text}</a>`
      break
    default:
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link">${text}</a>`
  }
  return html
}

// Helper function to generate floating button content
function generateFloatingButtonContent(config: any): string {
  const floatingStyle = config.branding?.footerLink?.floatingStyle || {}
  const shape = floatingStyle.shape || 'pill'
  const showText = floatingStyle.showText !== false
  const text = config.branding?.footerLink?.text || 'Cookie Settings'
  const hasLogo = config.branding?.logo?.enabled && config.branding?.logo?.url
  
  // Cookie icons using Material Symbols - clean and scalable with perfect centering
  const cookieAcceptedIcon = `<span class="material-symbols-outlined" style="font-size: 20px;">cookie</span>`
  
  const cookieRejectedIcon = `<span class="material-symbols-outlined" style="font-size: 20px;">cookie_off</span>`
  
  let content = ''
  
  if (shape === 'circle') {
    // Circle shows only cookie icon (not logo) for dynamic state changes
    content = `${cookieAcceptedIcon}`
  } else {
    // Pill and square can show text
    if (hasLogo) {
      content = `<img src="${config.branding.logo.url}" alt="Logo" style="width: 16px; height: 16px; object-fit: contain; margin-right: 4px;" />`
      if (showText) {
        content += `<span>${text}</span>`
      }
    } else {
      content = `${cookieAcceptedIcon}`
      if (showText) {
        content += `<span style="margin-left: 4px;">${text}</span>`
      }
    }
  }
  
  return content
}

export function CodeGenerator({ config }: CodeGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'head' | 'body'>('head')
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
    <button id="cookie-close-btn" style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: ${config.colors.text}; font-size: 24px; cursor: pointer; padding: 4px 8px; line-height: 1; opacity: 0.7;" aria-label="Close">&times;</button>
    
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      ${config.branding.logo.position === 'left' ? logoElement : ''}
      
      <div style="flex: 1; min-width: 250px;">
        ${config.branding.logo.position === 'center' ? `<div style="text-align: center; margin-bottom: 12px;">${logoElement}</div>` : ''}
        
        <h3 id="cookie-title" style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">${config.text.title}</h3>
        
        <p id="cookie-message" style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5;">${config.text.message}${privacyPolicyLink ? ` ${privacyPolicyLink}` : ''}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="cookie-accept-btn" style="background-color: ${config.colors.button}; color: ${config.colors.buttonText}; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${config.text.acceptButton}</button>
          
          <button id="cookie-reject-btn" style="background-color: transparent; color: ${config.colors.button}; border: 1px solid ${config.colors.button}; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${config.text.rejectButton}</button>
          
          ${config.behavior.showPreferences ? `<button id="cookie-preferences-btn" style="background-color: transparent; color: ${config.colors.link}; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${config.text.preferencesButton}</button>` : ''}
        </div>
        
      </div>
      
      ${config.branding.logo.position === 'right' ? logoElement : ''}
    </div>
  </div>
</div>

${config.behavior.showPreferences ? `
<!-- Preferences Modal -->
<div id="cookie-preferences-modal" style="position: fixed; inset: 0; z-index: 99999; background-color: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; padding: 16px;">
  <div style="background: white; border-radius: 8px; width: 100%; max-width: 512px; max-height: 90vh; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
    <!-- Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 16px 24px; border-bottom: 1px solid #e5e7eb;">
      ${config.branding.logo.enabled && config.branding.logo.url ? `
      <img src="${config.branding.logo.url}" alt="Logo" style="height: 32px; object-fit: contain; max-width: ${config.branding.logo.maxWidth}px; max-height: ${config.branding.logo.maxHeight}px; flex-shrink: 0;" onerror="this.style.display='none'" />
      ` : `
      <span style="font-weight: 600; color: #111827;">Cookie Settings</span>
      `}
      
      <button id="cookie-prefs-close-btn" style="padding: 8px; background: none; border: none; border-radius: 6px; cursor: pointer; color: #6b7280; font-size: 20px; line-height: 1; flex-shrink: 0;" aria-label="Close">
        ×
      </button>
    </div>

    <!-- Content -->
    <div style="display: flex; flex-direction: column; height: 100%; max-height: calc(90vh - 80px);">
      <div style="padding: 24px 24px 0 24px; flex: 1; overflow-y: auto;">
        <!-- Title -->
        <h2 id="prefs-title" style="font-size: 20px; font-weight: bold; color: #111827; margin: 0 0 12px 0;">
          Privacy Center
        </h2>
        
        <!-- Description -->
        <p style="font-size: 14px; color: #6b7280; margin: 0 0 24px 0; line-height: 1.5;">
          By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.
        </p>

        <!-- Accept All Button -->
        <button id="cookie-accept-all-btn" style="width: 100%; height: 48px; margin-bottom: 24px; font-size: 16px; font-weight: 500; border-radius: 8px; border: none; cursor: pointer; background-color: ${config.colors.button}; color: ${config.colors.buttonText};">
          ACCEPT ALL
        </button>

        <!-- Cookie Preferences Section -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-weight: bold; color: #111827; margin: 0 0 16px 0;">
            Manage cookie preferences
          </h3>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Strictly Necessary -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #f9fafb;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: #9ca3af; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-necessary" style="font-weight: 500; color: #111827;">Strictly Necessary Cookies</div>
                  <div id="cat-necessary-desc" style="font-size: 12px; color: #6b7280; margin-top: 4px;">Always active</div>
                </div>
              </div>
            </div>

            <!-- Functionality -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: #9ca3af; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-functionality" style="font-weight: 500; color: #111827;">Functional Cookies</div>
                  <div id="cat-functionality-desc" style="font-size: 12px; color: #6b7280; margin-top: 4px;">Remember preferences and choices</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-func-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-func-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-func-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                </label>
              </div>
            </div>

            <!-- Performance -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: #9ca3af; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-analytics" style="font-weight: 500; color: #111827;">Performance Cookies</div>
                  <div id="cat-analytics-desc" style="font-size: 12px; color: #6b7280; margin-top: 4px;">Help us improve our website</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-performance-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-performance-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-performance-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                </label>
              </div>
            </div>

            <!-- Targeting -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: #9ca3af; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-marketing" style="font-weight: 500; color: #111827;">Targeting Cookies</div>
                  <div id="cat-marketing-desc" style="font-size: 12px; color: #6b7280; margin-top: 4px;">Personalized ads and content</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-targeting-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-targeting-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-targeting-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                </label>
              </div>
            </div>

            <!-- Social Media -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: #9ca3af; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1; font-weight: 500; color: #111827;">Social Media Cookies</div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-social-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-social-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-social-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with buttons -->
      <div style="padding: 24px 24px 0 24px; border-top: 1px solid #f3f4f6; background-color: #f9fafb;">
        <!-- Confirm Button -->
        <button id="cookie-confirm-choices-btn" style="width: 100%; height: 48px; margin-bottom: 16px; font-size: 16px; font-weight: 500; border-radius: 8px; border: none; cursor: pointer; background-color: ${config.colors.button}; color: ${config.colors.buttonText};">
          CONFIRM MY CHOICES
        </button>

        <!-- Powered by -->
        <div style="text-align: center;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">
            Powered by <a href="https://cookie-banner.ca/" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: #6b7280; text-decoration: none;" onmouseover="this.style.color='#374151'" onmouseout="this.style.color='#6b7280'">cookie-banner.ca</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
` : ''}

${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `
<!-- Enhanced Floating Cookie Settings Button -->
<div id="cookie-settings-float" style="
  position: fixed;
  ${config.branding.footerLink.floatingPosition === 'bottom-right' ? 'bottom: 16px; right: 16px;' : 'bottom: 16px; left: 16px;'}
  z-index: 999998;
  ${generateFloatingButtonStyles(config)}
  cursor: pointer;
  font-family: inherit;
  display: none;
  transition: all 0.2s ease;
  opacity: 0.7;
" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">
  ${generateFloatingButtonContent(config)}
</div>
` : ''}

${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'inline' || (config as any).branding.footerLink.style === 'both') ? `
<!-- Inline Footer Link HTML Snippet -->
<!-- Copy this HTML and paste it in your website footer where you want the cookie settings link to appear -->
<!-- 
${generateInlineFooterLinkHTML(config.branding.footerLink)}
-->
` : ''}`
  }

  const generateJavaScript = () => {
    const strictlyNecessaryLoaders = generateScriptLoaders(config.scripts.strictlyNecessary, 'strict')
    const functionalityLoaders = generateScriptLoaders(config.scripts.functionality, 'func')
    const analyticsLoaders = generateScriptLoaders(config.scripts.trackingPerformance, 'analytics')
    const marketingLoaders = generateScriptLoaders(config.scripts.targetingAdvertising, 'marketing')

    // GA4 Integration
    const ga4Integration = config.integrations?.googleAnalytics?.enabled && config.integrations?.googleAnalytics?.measurementId
      ? `
  // Google Analytics 4 Integration
  var GA_MEASUREMENT_ID = '${config.integrations.googleAnalytics.measurementId}';
  var GA_TRACK_CONSENT_EVENTS = ${config.integrations.googleAnalytics.trackConsentEvents};
  var GA_TRACK_IMPRESSIONS = ${config.integrations.googleAnalytics.trackImpressions ?? true};
  var GA_ANONYMIZE_IP = ${config.integrations.googleAnalytics.anonymizeIp};
  
  function initGA4() {
    if (!GA_MEASUREMENT_ID) return;
    
    // Load GA4 script
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(gaScript);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      ${config.integrations.googleAnalytics.anonymizeIp ? "'anonymize_ip': true," : ''}
      'cookie_flags': 'SameSite=None;Secure'
    });
    
    console.log('Google Analytics 4 initialized with ID:', GA_MEASUREMENT_ID);
  }
  
  function trackConsentEvent(action) {
    if (!window.gtag) return;
    
    // Track consent events (accept/reject/dismiss)
    if (GA_TRACK_CONSENT_EVENTS && (action === 'accept' || action === 'reject' || action === 'dismiss')) {
      gtag('event', 'cookie_consent', {
        'event_category': 'Cookie Consent',
        'event_label': action,
        'value': action === 'accept' ? 1 : 0
      });
      console.log('GA4 consent event tracked:', action);
    }
    
    // Track banner impressions
    if (GA_TRACK_IMPRESSIONS && action === 'impression') {
      gtag('event', 'banner_impression', {
        'event_category': 'Cookie Banner',
        'event_label': 'banner_shown',
        'value': 1
      });
      console.log('GA4 impression event tracked');
    }
  }`
      : `
  // GA4 Integration not configured
  function initGA4() {
    console.log('GA4 integration not configured');
  }
  
  function trackConsentEvent(action) {
    console.log('GA4 consent event not tracked (not configured):', action);
  }`

    return `(function() {
  'use strict';
  
  var COOKIE_NAME = 'cookie_consent';
  var COOKIE_EXPIRY = ${config.behavior.cookieExpiry};
  
  ${ga4Integration}
  
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
  
  ${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'inline' || (config as any).branding.footerLink.style === 'both') ? `
  // Initialize floating button icon on page load
  document.addEventListener('DOMContentLoaded', function() {
    var consent = getConsent();
    if (consent) {
      updateFloatingButtonIcon(consent);
    }
  });
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
    updateFloatingButtonIcon(consent);
  }
  
  function updateFloatingButtonIcon(consent) {
    var floatBtn = document.getElementById('cookie-settings-float');
    if (!floatBtn) return;
    
    // Cookie icons using Material Symbols - clean and scalable with perfect centering
    var cookieAcceptedIcon = '<span class="material-symbols-outlined" style="font-size: 20px;">cookie</span>';
    
    var cookieRejectedIcon = '<span class="material-symbols-outlined" style="font-size: 20px;">cookie_off</span>';
    
    // Determine if user has accepted any non-essential cookies
    var hasAcceptedNonEssential = consent.functionality || consent.analytics || consent.marketing;
    
    // Update icon based on consent state
    if (hasAcceptedNonEssential) {
      floatBtn.innerHTML = cookieAcceptedIcon;
    } else {
      floatBtn.innerHTML = cookieRejectedIcon;
    }
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
      
      // Initialize GA4 if analytics was accepted
      if (existingConsent.analytics) {
        initGA4();
      }
      
      ${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `
      // Show cookie settings floating button after consent is given
      var floatBtn = document.getElementById('cookie-settings-float');
      if (floatBtn) {
        floatBtn.classList.add('show');
        updateFloatingButtonIcon(existingConsent);
        floatBtn.onclick = function() {
          var modal = document.getElementById('cookie-preferences-modal');
          if (modal) {
            modal.style.display = 'flex';
            loadConsentIntoModal(existingConsent);
          }
        };
      }
      ` : ''}
      
      return;
    }
    
    ${config.behavior.autoShow ? `
    banner.style.display = 'block';
    trackConsentEvent('impression'); // Track banner impression
    
    // Hide floating button while main banner is showing
    var floatBtn = document.getElementById('cookie-settings-float');
    if (floatBtn) {
      floatBtn.classList.remove('show');
    }
    ` : ''}
    
    if (acceptBtn) {
      acceptBtn.onclick = function() {
        saveConsent({ essential: true, functionality: true, analytics: true, marketing: true });
        initGA4(); // Initialize GA4
        trackConsentEvent('accept'); // Track consent event
        banner.style.display = 'none';
        ${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `
        // Show floating cookie settings button after accepting
        var floatBtn = document.getElementById('cookie-settings-float');
        if (floatBtn) {
          floatBtn.classList.add('show');
          updateFloatingButtonIcon({ essential: true, functionality: true, analytics: true, marketing: true });
          floatBtn.onclick = function() {
            var modal = document.getElementById('cookie-preferences-modal');
            if (modal) {
              modal.style.display = 'flex';
              loadConsentIntoModal({ essential: true, functionality: true, analytics: true, marketing: true });
            }
          };
        }
        ` : ''}
      };
    }
    
    if (rejectBtn) {
      rejectBtn.onclick = function() {
        saveConsent({ essential: true, functionality: false, analytics: false, marketing: false });
        trackConsentEvent('reject'); // Track consent event (but don't init GA4)
        banner.style.display = 'none';
        ${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `
        // Show floating cookie settings button after rejecting (so user can change mind)
        var floatBtn = document.getElementById('cookie-settings-float');
        if (floatBtn) {
          floatBtn.classList.add('show');
          updateFloatingButtonIcon({ essential: true, functionality: false, analytics: false, marketing: false });
          floatBtn.onclick = function() {
            var modal = document.getElementById('cookie-preferences-modal');
            if (modal) {
              modal.style.display = 'flex';
              loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false });
            }
          };
        }
        ` : ''}
      };
    }
    
    if (closeBtn) {
      closeBtn.onclick = function() {
        banner.style.display = 'none';
        trackConsentEvent('dismiss');
      };
    }
    
    ${config.behavior.showPreferences ? `
    if (prefsBtn) {
      prefsBtn.onclick = function() {
        var modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
          modal.style.display = 'flex';
          // Load current consent state into modal
          var currentConsent = getConsent();
          if (currentConsent) {
            loadConsentIntoModal(currentConsent);
          } else {
            loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false });
          }
        }
      };
    }
    
    // Modal event handlers
    var modal = document.getElementById('cookie-preferences-modal');
    var modalCloseBtn = document.getElementById('cookie-prefs-close-btn');
    var acceptAllBtn = document.getElementById('cookie-accept-all-btn');
    var confirmChoicesBtn = document.getElementById('cookie-confirm-choices-btn');
    
    if (modalCloseBtn) {
      modalCloseBtn.onclick = function() {
        modal.style.display = 'none';
      };
    }
    
    if (acceptAllBtn) {
      acceptAllBtn.onclick = function() {
        var consent = { essential: true, functionality: true, analytics: true, marketing: true };
        saveConsent(consent);
        
        // Update modal toggles to show all ON before closing
        loadConsentIntoModal(consent);
        
        banner.style.display = 'none';
        modal.style.display = 'none';
        
        ${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `
        // Show floating cookie settings button after accepting all in modal
        var floatBtn = document.getElementById('cookie-settings-float');
        if (floatBtn) {
          floatBtn.classList.add('show');
          updateFloatingButtonIcon(consent);
          floatBtn.onclick = function() {
            var modal = document.getElementById('cookie-preferences-modal');
            if (modal) {
              modal.style.display = 'flex';
              loadConsentIntoModal(consent);
            }
          };
        }
        ` : ''}
      };
    }
    
    if (confirmChoicesBtn) {
      confirmChoicesBtn.onclick = function() {
        var func = document.getElementById('cookie-func-toggle-modal');
        var performance = document.getElementById('cookie-performance-toggle-modal');
        var targeting = document.getElementById('cookie-targeting-toggle-modal');
        var social = document.getElementById('cookie-social-toggle-modal');
        
        var consent = {
          essential: true,
          functionality: func ? func.checked : false,
          analytics: performance ? performance.checked : false,
          marketing: (targeting ? targeting.checked : false) || (social ? social.checked : false)
        };
        
        console.log('User confirmed cookie preferences:', consent);
        saveConsent(consent);
        
        banner.style.display = 'none';
        modal.style.display = 'none';
        
        ${config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `
        // Show floating cookie settings button after confirming preferences
        var floatBtn = document.getElementById('cookie-settings-float');
        if (floatBtn) {
          floatBtn.classList.add('show');
          updateFloatingButtonIcon(consent);
          floatBtn.onclick = function() {
            var modal = document.getElementById('cookie-preferences-modal');
            if (modal) {
              modal.style.display = 'flex';
              loadConsentIntoModal(consent);
            }
          };
        }
        ` : ''}
      };
    }
    
    // Close modal when clicking outside
    if (modal) {
      modal.onclick = function(e) {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      };
    }
    
    // Make toggle switches functional
    function setupToggleSwitches() {
      var toggles = [
        { input: 'cookie-func-toggle-modal', slider: 'cookie-func-toggle-slider', thumb: 'cookie-func-toggle-thumb' },
        { input: 'cookie-performance-toggle-modal', slider: 'cookie-performance-toggle-slider', thumb: 'cookie-performance-toggle-thumb' },
        { input: 'cookie-targeting-toggle-modal', slider: 'cookie-targeting-toggle-slider', thumb: 'cookie-targeting-toggle-thumb' },
        { input: 'cookie-social-toggle-modal', slider: 'cookie-social-toggle-slider', thumb: 'cookie-social-toggle-thumb' }
      ];
      
      toggles.forEach(function(toggle) {
        var input = document.getElementById(toggle.input);
        var slider = document.getElementById(toggle.slider);
        var thumb = document.getElementById(toggle.thumb);
        
        if (input && slider && thumb) {
          // Set initial state
          if (input.checked) {
            slider.style.backgroundColor = '#3b82f6';
            thumb.style.transform = 'translateX(20px)';
          } else {
            slider.style.backgroundColor = '#ccc';
            thumb.style.transform = 'translateX(0)';
          }
          
          // Add change event listener
          input.addEventListener('change', function() {
            if (this.checked) {
              slider.style.backgroundColor = '#3b82f6';
              thumb.style.transform = 'translateX(20px)';
            } else {
              slider.style.backgroundColor = '#ccc';
              thumb.style.transform = 'translateX(0)';
            }
          });
          
          // Add click event listener to slider for better UX
          slider.addEventListener('click', function() {
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change'));
          });
        }
      });
    }
    
    function loadConsentIntoModal(consent) {
      var func = document.getElementById('cookie-func-toggle-modal');
      var performance = document.getElementById('cookie-performance-toggle-modal');
      var targeting = document.getElementById('cookie-targeting-toggle-modal');
      var social = document.getElementById('cookie-social-toggle-modal');
      
      if (func) func.checked = consent.functionality || false;
      if (performance) performance.checked = consent.analytics || false;
      if (targeting) targeting.checked = consent.marketing || false;
      if (social) social.checked = consent.marketing || false;
      
      // Update visual state
      setupToggleSwitches();
    }
    
    // Initialize toggles
    setupToggleSwitches();
    ` : ''}
    
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
    return `/* Material Symbols CSS */
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cookie,cookie_off');

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24 !important;
  font-family: 'Material Symbols Outlined' !important;
  font-weight: normal !important;
  font-style: normal !important;
  display: inline-block !important;
  line-height: 1 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  word-wrap: normal !important;
  white-space: nowrap !important;
  direction: ltr !important;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
  vertical-align: middle !important;
}

/* Specific styles for cookie floating button icons - Extra strong to override site CSS */
#cookie-settings-float .material-symbols-outlined {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
  vertical-align: baseline !important;
  text-align: center !important;
  box-sizing: border-box !important;
  position: relative !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  transform: none !important;
}

/* Extra protection against common CSS resets and frameworks */
#cookie-settings-float .material-symbols-outlined * {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

/* Ensure the button itself has strong centering - only when visible */
#cookie-settings-float.show {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
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

/* Toggle Switch Styles */
input:checked + span {
  background-color: #3b82f6 !important;
}

input:checked + span:before {
  transform: translateX(20px);
}

input:focus + span {
  box-shadow: 0 0 1px #3b82f6;
}

/* Modal Styles */
#cookie-preferences-modal {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
  
  #cookie-preferences-modal > div {
    margin: 0 !important;
    max-height: 100vh !important;
    border-radius: 0 !important;
  }
}

${config.advanced.customCSS}`
  }

  const generateHeadCode = () => {
    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 Cookie Consent Banner - HEAD CODE (cookie-banner.ca)      🍁 -->
<!-- 🍁 Place this code in your <head> section                    🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<style>
${generateCSS()}
</style>

<script>
${generateJavaScript()}
</script>
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 End HEAD CODE - Powered by cookie-banner.ca               🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->`
  }

  const generateBodyCode = () => {
    // Collect all body scripts (e.g., GTM noscript code) from ALL categories
    const bodyScripts: string[] = []
    
    // Check all script categories for body code
    const allScriptCategories = [
      ...config.scripts.strictlyNecessary,
      ...config.scripts.functionality,
      ...config.scripts.trackingPerformance,
      ...config.scripts.targetingAdvertising
    ]
    
    allScriptCategories.forEach((script) => {
      if (script.bodyCode && script.bodyCode.trim()) {
        bodyScripts.push(`\n<!-- ${script.name} (Body Code) -->\n${script.bodyCode.trim()}`)
      }
    })
    
    const bodyScriptsHTML = bodyScripts.length > 0 ? '\n\n' + bodyScripts.join('\n') : ''
    
    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 Cookie Consent Banner - BODY CODE (cookie-banner.ca)      🍁 -->
<!-- 🍁 Place this code just before closing </body> tag          🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->${bodyScriptsHTML}

${generateHTML()}
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 End BODY CODE - Powered by cookie-banner.ca               🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->`
  }

  const getCode = () => {
    switch (activeTab) {
      case 'head':
        return generateHeadCode()
      case 'body':
        return generateBodyCode()
      default:
        return generateHeadCode()
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
    const ext = 'html'
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
          <li><strong>Copy "Head Code"</strong> and paste it in your <code>&lt;head&gt;</code> section</li>
          <li><strong>Copy "Body Code"</strong> and paste it just before the closing <code>&lt;/body&gt;</code> tag</li>
          <li><strong>Save and refresh</strong> your website to see the banner</li>
        </ol>
        <p className="text-xs text-blue-700 mt-2">💡 Use the tabs below to switch between Head Code and Body Code. Both are required for the banner to work!</p>
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
        {[
          { id: 'head', label: 'Head Code', icon: '📄' },
          { id: 'body', label: 'Body Code', icon: '📋' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'head' | 'body')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
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
                {activeTab === 'head' ? 'Paste this code in your <head> section' : 'Paste this code before closing </body> tag'}
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