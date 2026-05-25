import { BannerConfig, BannerConfigWithGeoOverrides, TrackingScript } from '@/types'

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

const escapeHtml = (value: string): string =>
  (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// SVG path data for cookie icons (fill color applied dynamically)
const COOKIE_ICON_PATH = 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z'
const COOKIE_OFF_ICON_PATH = 'm815-260-58-58q18-31 29-66.5t14-73.5q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-49-2-90 10t-76 33l-57-57q61-42 137.5-58.5T563-872q-9 45 6 84.5t45 66.5q30 27 71 37t86-5q-31 69 11 118t96 51q8 72-9.5 138T815-260ZM340-360q-25 0-42.5-17.5T280-420q0-25 17.5-42.5T340-480q25 0 42.5 17.5T480-420q0 25-17.5 42.5T340-360ZM819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM480-160q45 0 85.5-12t76.5-33L205-642q-21 36-33 76.5T160-480q0 133 93.5 226.5T480-160Zm-56-264Zm135-137Z'

function generateCookieIconSvg(path: string, fillColor: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="${escapeHtml(fillColor)}"><path d="${path}"/></svg>`
  // Use btoa pattern that works in both Node.js and browser environments
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
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
  const safeBorder = border === 'none' ? 'none' : escapeHtml(border)
  
  return `
    background: ${escapeHtml(backgroundColor)} !important;
    color: ${escapeHtml(color)} !important;
    border: ${safeBorder} !important;
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
function generateInlineFooterLinkHTML(footerLink: any, config: any): string {
  const text = escapeHtml(footerLink.text || 'Cookie Settings')
  const linkType = footerLink.inlineStyle?.linkType || 'plain'
  const includeIcon = footerLink.inlineStyle?.includeIcon || false
  const includeLogo = footerLink.inlineStyle?.includeLogo || false
  const customClass = escapeHtml(footerLink.inlineStyle?.customClass || '')

  let html = ''

  switch (linkType) {
    case 'plain':
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}" style="color: ${escapeHtml(config.colors.link)};">${text}</a>`
      break
    case 'button':
      html = `<button onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-btn${customClass ? ' ' + customClass : ''}" style="background: ${escapeHtml(config.colors.button)}; color: ${escapeHtml(config.colors.buttonText)}; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">${text}</button>`
      break
    case 'icon-text':
      const icon = includeIcon ? '🍪 ' : ''
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}" style="color: ${escapeHtml(config.colors.link)};">${icon}${text}</a>`
      break
    case 'custom':
      const customIcon = includeIcon ? '🍪 ' : ''
      const customLogo = includeLogo ? '<img src="YOUR_LOGO_URL" alt="Logo" style="height: 16px; margin-right: 4px;" />' : ''
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}" style="color: ${escapeHtml(config.colors.link)};">${customLogo}${customIcon}${text}</a>`
      break
    default:
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link" style="color: ${escapeHtml(config.colors.link)};">${text}</a>`
  }
  return html
}

// Helper function to generate floating button content
function generateFloatingButtonContent(config: any): string {
  const floatingStyle = config.branding?.footerLink?.floatingStyle || {}
  const shape = floatingStyle.shape || 'pill'
  const showText = floatingStyle.showText !== false
  const text = escapeHtml(config.branding?.footerLink?.text || 'Cookie Settings')
  const hasLogo = config.branding?.logo?.enabled && config.branding?.logo?.url

  // Determine icon color from the floating button text color
  const useCustomColors = floatingStyle.useCustomColors || false
  const customColors = floatingStyle.customColors || {}
  const iconColor = useCustomColors
    ? (customColors.text || '#ffffff')
    : (config.colors?.buttonText || '#ffffff')

  const userAcceptedIcon = config.branding?.footerLink?.icons?.accepted
  const acceptedIconUrl = userAcceptedIcon || generateCookieIconSvg(COOKIE_ICON_PATH, iconColor)
  const cookieAcceptedIcon = `<img src="${escapeHtml(acceptedIconUrl)}" alt="" style="width: 20px; height: 20px; display: inline-flex;" />`

  let content = ''
  
  if (shape === 'circle') {
    // Circle always shows only cookie icon (not logo) for dynamic state changes
    content = `${cookieAcceptedIcon}`
  } else {
    // Pill and square respect the showText setting
    if (showText && hasLogo) {
      // Show logo + text when both are enabled
      content = `<img src="${escapeHtml(config.branding.logo.url)}" alt="Logo" style="width: 16px; height: 16px; object-fit: contain; margin-right: 4px;" />`
      content += `<span>${text}</span>`
    } else if (showText && !hasLogo) {
      // Show icon + text when text is enabled but no logo
      content = `${cookieAcceptedIcon}`
      content += `<span style="margin-left: 4px;">${text}</span>`
    } else {
      // Show only icon when text is disabled (regardless of logo setting)
      content = `${cookieAcceptedIcon}`
    }
  }
  
  return content
}

// Helper function to generate script loading code
const generateScriptLoaders = (
  scripts: TrackingScript[],
  category: string,
  options?: { lazy?: boolean }
): string => {
  const enabledScripts = scripts.filter(s => s.enabled && s.scriptCode.trim())
  if (enabledScripts.length === 0) return ''

  const useLazy = options?.lazy === true
  
  return enabledScripts.map(script => {
    const escaped = encodeScriptCode(script.scriptCode)
    const varName = `${category}_${script.id.replace(/[^a-zA-Z0-9]/g, '_')}`
    
    // Check if it's an external script URL
    const isExternalScript = script.scriptCode.includes('src=') || script.scriptCode.includes('http')
    
    if (isExternalScript) {
      // Handle external scripts
      const srcMatch = script.scriptCode.match(/src=["']([^"']+)["']/)
      if (srcMatch) {
        const srcLiteral = JSON.stringify(srcMatch[1])
        const nameLiteral = JSON.stringify(script.name)

        if (useLazy) {
          return `      // ${script.name} (External, scheduled)
    scheduleTask(function() {
      try {
        loadExternalScript(${srcLiteral}, ${nameLiteral});
      } catch(e) {
        console.error('Error scheduling external script ${script.name}:', e);
      }
    });`
        }

        return `      // ${script.name} (External)
    try {
      loadExternalScript(${srcLiteral}, ${nameLiteral});
    } catch(e) {
      console.error('Error loading external script ${script.name}:', e);
    }`
      }
    }
    
    // Handle inline scripts - decode Base64 and execute
    if (useLazy) {
      const encodedLiteral = JSON.stringify(escaped)
      const nameLiteral = JSON.stringify(script.name)
      const cacheLiteral = JSON.stringify(varName)
      return `      // ${script.name} (scheduled)
    scheduleTask(function() {
      try {
        injectInlineScript(${encodedLiteral}, ${nameLiteral}, ${cacheLiteral});
      } catch(e) {
        console.error('Error scheduling ${script.name}:', e);
      }
    });`
    }

    const encodedLiteral = JSON.stringify(escaped)
    const nameLiteral = JSON.stringify(script.name)
    const cacheLiteral = JSON.stringify(varName)
    return `      // ${script.name}
    try {
      injectInlineScript(${encodedLiteral}, ${nameLiteral}, ${cacheLiteral});
    } catch(e) {
      console.error('Error loading ${script.name}:', e);
    }`
  }).join('\n\n')
}

export const generateBannerHTML = (config: BannerConfig, options?: { showBranding?: boolean }) => {
  // Defensive defaults for optional nested objects (older banners may lack these)
  if (!config.branding) config.branding = {} as any
  if (!config.branding.logo) config.branding.logo = { enabled: false, url: '', position: 'left', maxWidth: 120, maxHeight: 40 }
  if (!config.branding.privacyPolicy) config.branding.privacyPolicy = { url: '', text: 'Privacy Policy', openInNewTab: true, required: false }
  if (!config.branding.footerLink) config.branding.footerLink = { enabled: false, text: 'Cookie Settings', style: 'floating', floatingPosition: 'bottom-right' } as any
  if (!config.behavior) config.behavior = {} as any
  if (!config.text) {
    config.text = {
      title: (config as any).content?.heading || 'Cookie Consent',
      message: (config as any).content?.description || 'We use cookies to enhance your browsing experience and provide personalized content.',
      acceptButton: (config as any).content?.acceptButtonText || 'Accept All',
      rejectButton: (config as any).content?.rejectButtonText || 'Reject All',
    } as any
  }

  const showBranding = options?.showBranding !== false // default true
  const logoElement = config.branding?.logo?.enabled && config.branding?.logo?.url
    ? `<img src="${escapeHtml(config.branding.logo.url)}" alt="Logo" style="max-width: ${config.branding.logo.maxWidth || 120}px; max-height: ${config.branding.logo.maxHeight || 40}px; object-fit: contain;" />`
    : ''

  const privacyPolicyLink = config.branding?.privacyPolicy?.url
    ? `<a href="${escapeHtml(config.branding.privacyPolicy.url)}" ${config.branding.privacyPolicy.openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: ${escapeHtml(config.colors.link)} !important; text-decoration: underline;">${escapeHtml(config.branding.privacyPolicy.text || 'Privacy Policy')}</a>`
    : ''

  // Helper function to calculate border color based on theme
  const getBorderColor = () => {
    if (config.theme === 'dark') {
      return 'rgba(255, 255, 255, 0.2)'
    } else {
      return 'rgba(0, 0, 0, 0.1)'
    }
  }

  // Helper function to calculate secondary text color based on theme
  const getSecondaryTextColor = () => {
    if (config.theme === 'dark') {
      const textColor = config.colors.text
      if (textColor.startsWith('#')) {
        const hex = textColor.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        return `rgba(${r}, ${g}, ${b}, 0.7)`
      } else if (textColor.startsWith('rgb')) {
        return textColor.replace(')', ', 0.7)').replace('rgb', 'rgba')
      }
      return textColor
    } else {
      const textColor = config.colors.text
      if (textColor.startsWith('#')) {
        const hex = textColor.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        return `rgba(${r}, ${g}, ${b}, 0.6)`
      } else if (textColor.startsWith('rgb')) {
        return textColor.replace(')', ', 0.6)').replace('rgb', 'rgba')
      }
      return textColor
    }
  }

  // Helper function to calculate background color for card sections
  const getCardBackgroundColor = () => {
    if (config.theme === 'dark') {
      const bgColor = config.colors.background
      if (bgColor.startsWith('#')) {
        const hex = bgColor.replace('#', '')
        const r = parseInt(hex.substr(0, 2), 16)
        const g = parseInt(hex.substr(2, 2), 16)
        const b = parseInt(hex.substr(4, 2), 16)
        return `rgba(${r}, ${g}, ${b}, 0.3)`
      } else if (bgColor.startsWith('rgb')) {
        return bgColor.replace(')', ', 0.3)').replace('rgb', 'rgba')
      }
      return bgColor
    } else {
      return 'rgba(0, 0, 0, 0.02)'
    }
  }

  const borderColor = getBorderColor()
  const secondaryTextColor = getSecondaryTextColor()
  const cardBackgroundColor = getCardBackgroundColor()

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

  // Main banner HTML
  const mainBanner = `<div id="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent" style="position: fixed; ${getPositionStyles()} background-color: ${escapeHtml(config.colors.background)} !important; color: ${escapeHtml(config.colors.text)} !important; ${getLayoutStyles()} z-index: 10000; font-family: ${config.fontFamily ? `'${escapeHtml(config.fontFamily)}', ` : ''}-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; ${getAnimationStyles()} display: none;">
  <div style="position: relative; padding-right: 40px;">
    <button id="cookie-close-btn" style="position: absolute; top: 0; right: 0; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: none; border: none; color: ${config.colors.text}; font-size: 28px; cursor: pointer; padding: 0; line-height: 1; opacity: 0.7; z-index: 2;" aria-label="Close">&times;</button>
    
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      ${config.branding.logo.position === 'left' ? logoElement : ''}
      
      <div style="flex: 1; min-width: 250px;">
        ${config.branding.logo.position === 'center' ? `<div style="text-align: center; margin-bottom: 12px;">${logoElement}</div>` : ''}
        
        <h3 id="cookie-title" style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: ${escapeHtml(config.colors.text)} !important;">${escapeHtml(config.text.title)}</h3>
        
        <p id="cookie-message" style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: ${escapeHtml(config.colors.text)} !important;">${escapeHtml(config.text.message)}${privacyPolicyLink ? ` ${privacyPolicyLink}` : ''}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="cookie-accept-btn" style="background-color: ${escapeHtml(config.colors.button)} !important; color: ${escapeHtml(config.colors.buttonText)} !important; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${escapeHtml(config.text.acceptButton)}</button>
          
          ${config.behavior.showRejectButton !== false ? `<button id="cookie-reject-btn" style="background-color: ${escapeHtml(config.colors.rejectButton || 'transparent')}; color: ${escapeHtml(config.colors.rejectButtonText || config.colors.text)} !important; border: 1px solid ${escapeHtml(config.colors.rejectButtonText || config.colors.text)} !important; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${escapeHtml(config.text.rejectButton)}</button>` : ''}
          
          ${config.behavior.showPreferences ? `<button id="cookie-preferences-btn" style="background-color: transparent; color: ${escapeHtml(config.colors.link)} !important; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${escapeHtml(config.text.preferencesButton)}</button>` : ''}
        </div>
        ${showBranding ? `
        <div style="margin-top: 8px;">
          <a href="https://cookie-banner.ca/?ref=banner" target="_blank" rel="noopener" style="font-size: 11px; color: ${getSecondaryTextColor()}; text-decoration: none; opacity: 0.7;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.7'">Powered by cookie-banner.ca</a>
        </div>` : ''}
      </div>
      
      ${config.branding.logo.position === 'right' ? logoElement : ''}
    </div>
  </div>
</div>`

  // Preferences modal HTML
  // Generate modal when preferences button is shown OR when the floating cookie settings button is enabled
  // (the floating button always opens the preferences modal)
  const hasFloatingButton = config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both')
  const needsPreferencesModal = config.behavior.showPreferences || hasFloatingButton
  const tcfEnabled = config.integrations?.tcf?.enabled === true

  // TCF purpose toggle HTML helper
  const generateTcfPurposeToggle = (id: number, name: string, description: string, legalBasis: string) => {
    const toggleId = `tcf-purpose-${id}-toggle`
    const sliderId = `tcf-purpose-${id}-slider`
    const thumbId = `tcf-purpose-${id}-thumb`
    const isLI = legalBasis === 'legitimate-interest'
    const thumbBg = config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText
    const inactiveBg = config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af'
    return `
            <div style="display: flex; align-items: flex-start; justify-content: space-between; padding: 14px 16px; border: 1px solid ${borderColor}; border-radius: 8px;">
              <div style="flex: 1; min-width: 0; margin-right: 12px;">
                <div style="font-weight: 500; color: ${config.colors.text}; font-size: 13px;">${escapeHtml(name)}</div>
                <div style="font-size: 11px; color: ${secondaryTextColor}; margin-top: 4px; line-height: 1.4;">${escapeHtml(description)}</div>
                ${isLI ? `<div style="font-size: 10px; color: ${secondaryTextColor}; margin-top: 4px; font-style: italic;">Legitimate Interest</div>` : ''}
              </div>
              <div style="flex-shrink: 0;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="${toggleId}" data-tcf-purpose="${id}" style="opacity: 0; width: 0; height: 0;" />
                  <span id="${sliderId}" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${inactiveBg}; transition: .4s; border-radius: 24px;"></span>
                  <span id="${thumbId}" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${thumbBg}; transition: .4s; border-radius: 50%; pointer-events: none;"></span>
                </label>
              </div>
            </div>`
  }

  // TCF 2.2 purpose definitions
  const tcfPurposes = [
    { id: 1, name: 'Store and/or access information on a device', description: 'Cookies, device or similar online identifiers are used to store and access information on a device.', legalBasis: 'consent' },
    { id: 2, name: 'Select basic ads', description: 'Ads can be shown to you based on the content you are viewing, the app you are using, your approximate location, or your device type.', legalBasis: 'legitimate-interest' },
    { id: 3, name: 'Create a personalised ads profile', description: 'A profile can be built about you and your interests to show you personalised ads that are relevant to you.', legalBasis: 'consent' },
    { id: 4, name: 'Select personalised ads', description: 'Personalised ads can be shown to you based on a profile about you.', legalBasis: 'consent' },
    { id: 5, name: 'Create a personalised content profile', description: 'A profile can be built about you and your interests to show you personalised content that is relevant to you.', legalBasis: 'consent' },
    { id: 6, name: 'Select personalised content', description: 'Personalised content can be shown to you based on a profile about you.', legalBasis: 'consent' },
    { id: 7, name: 'Measure ad performance', description: 'The performance and effectiveness of ads that you see or interact with can be measured.', legalBasis: 'legitimate-interest' },
    { id: 8, name: 'Measure content performance', description: 'The performance and effectiveness of content that you see or interact with can be measured.', legalBasis: 'legitimate-interest' },
    { id: 9, name: 'Understand audiences through statistics or combinations of data from different sources', description: 'Reports can be generated based on the combination of data sets regarding your interactions and those of other users.', legalBasis: 'legitimate-interest' },
    { id: 10, name: 'Develop and improve services', description: 'Your data can be used to improve existing systems and software, and to develop new products.', legalBasis: 'legitimate-interest' },
    { id: 11, name: 'Use limited data to select content', description: 'Content can be selected based on limited data, such as the content you are viewing or your approximate location.', legalBasis: 'legitimate-interest' },
  ]

  const consentPurposes = tcfPurposes.filter(p => p.legalBasis === 'consent')
  const liPurposes = tcfPurposes.filter(p => p.legalBasis === 'legitimate-interest')

  const tcfVendorSection = (tcfEnabled && config.integrations?.tcf?.showVendorList) ? `
        <!-- Vendors Section -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-weight: bold; color: ${config.colors.text}; margin: 0 0 12px 0; font-size: 15px;">Vendors</h3>
          <div id="tcf-vendor-list" style="max-height: 200px; overflow-y: auto; border: 1px solid ${borderColor}; border-radius: 8px; padding: 12px;">
            <p style="font-size: 12px; color: ${secondaryTextColor}; margin: 0;">Vendor list loaded from your TCF configuration.</p>
          </div>
        </div>` : ''

  const preferencesModal = needsPreferencesModal ? `
<!-- Preferences Modal -->
<div id="cookie-preferences-modal" style="position: fixed; inset: 0; z-index: 99999; background-color: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; padding: 16px;">
  <div style="background: ${config.colors.background}; border-radius: 8px; width: 100%; max-width: 512px; max-height: 90vh; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
    <!-- Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 16px 24px; border-bottom: 1px solid ${borderColor};">
      ${config.branding.logo.enabled && config.branding.logo.url ? `
      <img src="${config.branding.logo.url}" alt="Logo" style="height: 32px; object-fit: contain; max-width: ${config.branding.logo.maxWidth}px; max-height: ${config.branding.logo.maxHeight}px; flex-shrink: 0;" onerror="this.style.display='none'" />
      ` : `
      <span id="prefs-header-title" style="font-weight: 600; color: ${config.colors.text};">Cookie Settings</span>
      `}

      <button id="cookie-prefs-close-btn" style="padding: 8px; background: none; border: none; border-radius: 6px; cursor: pointer; color: ${config.colors.text}; font-size: 20px; line-height: 1; flex-shrink: 0; opacity: 0.7;" aria-label="Close">
        ×
      </button>
    </div>

    <!-- Content -->
    <div style="display: flex; flex-direction: column; height: 100%; max-height: calc(90vh - 80px);">
      <div id="cookie-prefs-content" style="padding: 24px 24px 0 24px; flex: 1; overflow-y: auto;">
        <!-- Title -->
        <h2 id="prefs-title" style="font-size: 20px; font-weight: bold; color: ${config.colors.text}; margin: 0 0 12px 0;">
          Privacy Center
        </h2>

        <!-- Description -->
        <p id="prefs-description" style="font-size: 14px; color: ${secondaryTextColor}; margin: 0 0 24px 0; line-height: 1.5;">
          ${tcfEnabled ? 'We and our partners use technologies such as cookies to store and access information on your device. We process personal data for the purposes described below. You may consent to or object to processing based on legitimate interest, for each purpose.' : "By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts."}
        </p>

        <!-- Accept All / Reject All Buttons -->
        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          <button id="cookie-accept-all-btn" style="flex: 1; height: 48px; font-size: 16px; font-weight: 500; border-radius: 8px; border: none; cursor: pointer; background-color: ${config.colors.button}; color: ${config.colors.buttonText};">
            Accept All
          </button>
          ${tcfEnabled ? `<button id="cookie-reject-all-btn" style="flex: 1; height: 48px; font-size: 16px; font-weight: 500; border-radius: 8px; border: 1px solid ${escapeHtml(config.colors.rejectButtonText || config.colors.text)}; cursor: pointer; background-color: ${escapeHtml(config.colors.rejectButton || 'transparent')}; color: ${escapeHtml(config.colors.rejectButtonText || config.colors.text)};">
            Reject All
          </button>` : ''}
        </div>

        ${tcfEnabled ? `
        <!-- TCF Purposes Section: Consent Required -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-weight: bold; color: ${config.colors.text}; margin: 0 0 12px 0; font-size: 15px;">Consent Required</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${consentPurposes.map(p => generateTcfPurposeToggle(p.id, p.name, p.description, p.legalBasis)).join('')}
          </div>
        </div>

        <!-- TCF Purposes Section: Legitimate Interest -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-weight: bold; color: ${config.colors.text}; margin: 0 0 12px 0; font-size: 15px;">Legitimate Interest</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${liPurposes.map(p => generateTcfPurposeToggle(p.id, p.name, p.description, p.legalBasis)).join('')}
          </div>
        </div>

        ${tcfVendorSection}
        ` : `
        <!-- Cookie Preferences Section -->
        <div style="margin-bottom: 24px;">
          <h3 id="prefs-manage-heading" style="font-weight: bold; color: ${config.colors.text}; margin: 0 0 16px 0;">
            Manage cookie preferences
          </h3>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Strictly Necessary -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid ${borderColor}; border-radius: 8px; background-color: ${cardBackgroundColor};">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: ${secondaryTextColor}; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-necessary" style="font-weight: 500; color: ${config.colors.text};">Strictly Necessary Cookies</div>
                  <div id="cat-necessary-desc" style="font-size: 12px; color: ${secondaryTextColor}; margin-top: 4px;">Always active</div>
                </div>
              </div>
            </div>

            <!-- Functionality -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid ${borderColor}; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: ${secondaryTextColor}; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-functionality" style="font-weight: 500; color: ${config.colors.text};">Functional Cookies</div>
                  <div id="cat-functionality-desc" style="font-size: 12px; color: ${secondaryTextColor}; margin-top: 4px;">Remember preferences and choices</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-func-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-func-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-func-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%; pointer-events: none;"></span>
                </label>
              </div>
            </div>

            <!-- Performance -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid ${borderColor}; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: ${secondaryTextColor}; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-analytics" style="font-weight: 500; color: ${config.colors.text};">Performance Cookies</div>
                  <div id="cat-analytics-desc" style="font-size: 12px; color: ${secondaryTextColor}; margin-top: 4px;">Help us improve our website</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-performance-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-performance-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-performance-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%; pointer-events: none;"></span>
                </label>
              </div>
            </div>

            <!-- Targeting -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid ${borderColor}; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: ${secondaryTextColor}; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-marketing" style="font-weight: 500; color: ${config.colors.text};">Targeting Cookies</div>
                  <div id="cat-marketing-desc" style="font-size: 12px; color: ${secondaryTextColor}; margin-top: 4px;">Personalized ads and content</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-targeting-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-targeting-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-targeting-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%; pointer-events: none;"></span>
                </label>
              </div>
            </div>

            <!-- Social Media -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid ${borderColor}; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: ${secondaryTextColor}; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1;">
                  <div id="cat-social" style="font-weight: 500; color: ${config.colors.text};">Social Media Cookies</div>
                  <div id="cat-social-desc" style="font-size: 12px; color: ${secondaryTextColor}; margin-top: 4px;">Social media integration</div>
                </div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-social-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-social-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-social-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%; pointer-events: none;"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        `}
      </div>

      <!-- Footer with buttons -->
      <div style="padding: 24px 24px 0 24px; border-top: 1px solid ${borderColor}; background-color: ${cardBackgroundColor};">
        <!-- Confirm Button -->
        <button id="cookie-confirm-choices-btn" style="width: 100%; height: 48px; margin-bottom: 16px; font-size: 16px; font-weight: 500; border-radius: 8px; border: none; cursor: pointer; background-color: ${config.colors.button}; color: ${config.colors.buttonText};">
          Confirm My Choices
        </button>

        ${showBranding ? `<!-- Powered by -->
        <div style="text-align: center;">
          <p style="font-size: 12px; color: ${secondaryTextColor}; margin: 0;">
            Powered by <a href="https://cookie-banner.ca/" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: ${config.colors.link}; text-decoration: none;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">cookie-banner.ca</a>
          </p>
        </div>` : ''}
      </div>
    </div>
  </div>
</div>` : ''

  // Floating button HTML (separate from main banner)
  const floatingButton = config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both') ? `

<!-- Floating Cookie Settings Button (separate from banner) -->
<div id="cookie-settings-float" style="
  position: fixed;
  ${config.branding.footerLink.floatingPosition === 'bottom-right' ? 'bottom: 16px; right: 16px;' : 'bottom: 16px; left: 16px;'}
  z-index: 999998;
  ${generateFloatingButtonStyles(config)}
  cursor: pointer;
  pointer-events: auto;
  font-family: inherit;
  transition: all 0.2s ease;
  opacity: 0.9;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.9'">
  ${generateFloatingButtonContent(config)}
</div>` : ''

  // Inline footer link HTML (commented out for reference)
  const inlineFooterLink = config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'inline' || (config as any).branding.footerLink.style === 'both') ? `

<!-- Inline Footer Link HTML Snippet -->
<!-- Copy this HTML and paste it in your website footer where you want the cookie settings link to appear -->
<!-- 
${generateInlineFooterLinkHTML(config.branding.footerLink, config)}
-->` : ''

  // Persistent backlink — always visible in DOM for SEO, not inside display:none elements
  // Position opposite to the floating button to avoid overlap
  const floatingButtonRendered = config.branding.footerLink.enabled && ((config as any).branding.footerLink.style === 'floating' || (config as any).branding.footerLink.style === 'both')
  const floatingIsLeft = floatingButtonRendered && config.branding?.footerLink?.floatingPosition === 'bottom-left'
  const backlinkPosition = floatingIsLeft ? 'right: 0;' : 'left: 0;'
  const persistentBacklink = showBranding ? `
<div id="cookie-banner-attribution" style="position: fixed; bottom: env(safe-area-inset-bottom, 0px); ${backlinkPosition} z-index: 9999; pointer-events: auto; padding: 2px 8px;">
  <a href="https://cookie-banner.ca/?ref=banner" target="_blank" rel="noopener" style="font-size: 10px; color: rgba(128,128,128,0.5); text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;" onmouseover="this.style.color='rgba(128,128,128,0.8)'" onmouseout="this.style.color='rgba(128,128,128,0.5)'">Cookie consent by cookie-banner.ca</a>
</div>` : ''

  // Return all components separately
  return mainBanner + preferencesModal + floatingButton + inlineFooterLink + persistentBacklink
}

export const generateBannerCSS = (config: BannerConfig) => {
  if (!config.branding) config.branding = {} as any
  if (!config.branding.footerLink) config.branding.footerLink = { enabled: false, text: 'Cookie Settings', style: 'floating', floatingPosition: 'bottom-right' } as any
  if (!config.behavior) config.behavior = {} as any
  const isBottomBar = config.position === 'bottom'

  return `/* Floating button - hidden by default with strong CSS */
#cookie-settings-float {
  display: none !important; /* This is critical! */
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

#cookie-settings-float.show {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  pointer-events: auto !important;
}

#cookie-settings-float * {
  pointer-events: none !important;
}

#cookie-settings-float:hover {
  opacity: 1 !important;
  transform: translateY(-2px);
}

#cookie-consent-banner {
  position: fixed !important;
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

/* Toggle Switch Styles - Colors handled by JavaScript for theme consistency */
input:checked + span:before {
  transform: translateX(20px);
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
    ${isBottomBar ? `
    top: auto !important;
    bottom: 0 !important;
    width: auto !important;
    margin: 0 !important;` : ''}
  }

  #cookie-consent-banner #cookie-close-btn {
    top: 10px !important;
    right: 10px !important;
    width: 44px !important;
    height: 44px !important;
    padding: 0 !important;
    font-size: 28px !important;
    line-height: 1 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 2 !important;
  }

  #cookie-title {
    padding-right: 48px !important;
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
  
  #cookie-preferences-modal {
    padding: 0 !important;
    align-items: flex-start !important;
  }

  #cookie-preferences-modal > div {
    margin: 0 !important;
    max-height: 100vh !important;
    max-height: 100dvh !important;
    height: 100vh !important;
    height: 100dvh !important;
    border-radius: 0 !important;
  }

  #cookie-preferences-modal > div > div:last-child {
    max-height: calc(100vh - 80px) !important;
    max-height: calc(100dvh - 80px) !important;
  }

}

/* GPC Acknowledgment Bar */
#gpc-acknowledgment {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99998;
  background: ${config.colors.background};
  color: ${config.colors.text};
  border-left: 4px solid ${config.colors.button};
  padding: 12px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
  animation: gpcSlideIn 0.3s ease-out;
  transition: opacity 0.4s ease;
}

#gpc-acknowledgment a {
  color: ${config.colors.link};
}

@keyframes gpcSlideIn {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* GPC Modal Notice */
#gpc-modal-notice {
  background: ${config.theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${config.colors.button};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  color: ${config.colors.text};
  animation: gpcFadeIn 0.3s ease-out;
}

@keyframes gpcFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  #gpc-acknowledgment {
    font-size: 12px;
    padding: 10px 0;
  }
  #gpc-acknowledgment > div {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 6px !important;
  }
}

${config.advanced.customCSS}`
}

export const generateBannerJS = (config: BannerConfigWithGeoOverrides) => {
  if (!config.branding) config.branding = {} as any
  if (!config.branding.logo) config.branding.logo = { enabled: false, url: '', position: 'left', maxWidth: 120, maxHeight: 40 }
  if (!config.branding.privacyPolicy) config.branding.privacyPolicy = { url: '', text: 'Privacy Policy', openInNewTab: true, required: false }
  if (!config.branding.footerLink) config.branding.footerLink = { enabled: false, text: 'Cookie Settings', style: 'floating', floatingPosition: 'bottom-right' } as any
  if (!config.behavior) config.behavior = {} as any
  if (!config.scripts) config.scripts = { strictlyNecessary: [], functionality: [], trackingPerformance: [], targetingAdvertising: [] } as any
  if (!config.text) {
    config.text = {
      title: (config as any).content?.heading || 'Cookie Consent',
      message: (config as any).content?.description || 'We use cookies.',
      acceptButton: (config as any).content?.acceptButtonText || 'Accept All',
      rejectButton: (config as any).content?.rejectButtonText || 'Reject All',
    } as any
  }

  const performanceOptions = config.advanced?.performance ?? {}
  const useLazyLoader = Boolean(
    performanceOptions.deferNonCriticalScripts ||
    performanceOptions.lazyLoadAnalytics ||
    performanceOptions.useRequestIdleCallback
  )
  const useIdleCallback = Boolean(performanceOptions.useRequestIdleCallback)

  const strictlyNecessaryLoaders = generateScriptLoaders(config.scripts.strictlyNecessary, 'strict')
  const functionalityLoaders = generateScriptLoaders(config.scripts.functionality, 'func', {
    lazy: Boolean(performanceOptions.deferNonCriticalScripts)
  })
  const analyticsLoaders = generateScriptLoaders(config.scripts.trackingPerformance, 'analytics', {
    lazy: Boolean(
      performanceOptions.lazyLoadAnalytics ?? performanceOptions.deferNonCriticalScripts
    )
  })
  const marketingLoaders = generateScriptLoaders(config.scripts.targetingAdvertising, 'marketing', {
    lazy: Boolean(performanceOptions.deferNonCriticalScripts)
  })

  // GA4 Integration
  const ga4Integration = config.integrations?.googleAnalytics?.enabled && config.integrations?.googleAnalytics?.measurementId
    ? `
// Google Analytics 4 Integration
var GA_MEASUREMENT_ID = ${JSON.stringify(config.integrations.googleAnalytics.measurementId)};
var GA_TRACK_CONSENT_EVENTS = ${Boolean(config.integrations.googleAnalytics.trackConsentEvents)};
var GA_TRACK_IMPRESSIONS = ${Boolean(config.integrations.googleAnalytics.trackImpressions ?? true)};
var GA_ANONYMIZE_IP = ${Boolean(config.integrations.googleAnalytics.anonymizeIp)};

function initGA4Default() {
  if (!GA_MEASUREMENT_ID) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;

  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });

  gtag('js', new Date());
}

function initGA4() {
  if (!GA_MEASUREMENT_ID) return;
  
  if (!window.gtag) {
    initGA4Default();
  }

  if (!document.querySelector('script[data-cookie-banner-ga="true"]')) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    gaScript.setAttribute('data-cookie-banner-ga', 'true');
    
    // Suppress "Invalid domain for site key" and other GA errors
    gaScript.onerror = function() {
      console.warn('Google Analytics script failed to load. This may be due to domain restrictions.');
      // Silently fail - don't show error to user
    };
    
    document.head.appendChild(gaScript);
  }

  try {
    gtag('config', GA_MEASUREMENT_ID, {
      ${config.integrations.googleAnalytics.anonymizeIp ? "'anonymize_ip': true," : ''}
      'cookie_flags': 'SameSite=None;Secure'
    });
    console.log('Google Analytics 4 initialized with ID:', GA_MEASUREMENT_ID);
  } catch (error) {
    // Suppress GA configuration errors (e.g., invalid domain)
    console.warn('Google Analytics configuration error (suppressed):', error.message);
  }
}

function trackConsentEvent(action, consentCategories) {
  // Send to internal analytics if available
  if (typeof _cbInternalTrack === 'function') _cbInternalTrack(action, consentCategories);
  // For reject events, we need to track them even if GA4 isn't loaded yet
  // This respects user privacy while still providing analytics insights
  if (action === 'reject' && GA_TRACK_CONSENT_EVENTS) {
    // Initialize GA4 temporarily just for tracking the reject event
    if (!window.gtag) {
      initGA4();
    }
  }
  
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
function initGA4Default() {}

function initGA4() {
  console.log('GA4 integration not configured');
}

function trackConsentEvent(action, consentCategories) {
  if (typeof _cbInternalTrack === 'function') _cbInternalTrack(action, consentCategories);
}`

  // Determine icon color for the floating button in JS section
  const floatingStyleJs = config.branding?.footerLink?.floatingStyle || {} as any
  const useCustomColorsJs = (floatingStyleJs as any).useCustomColors || false
  const customColorsJs = (floatingStyleJs as any).customColors || {} as any
  const jsIconColor = useCustomColorsJs
    ? ((customColorsJs as any).text || '#ffffff')
    : (config.colors?.buttonText || '#ffffff')

  const userAcceptedIconJs = config.branding?.footerLink?.icons?.accepted
  const userRejectedIconJs = config.branding?.footerLink?.icons?.rejected
  const acceptedIconUrl = userAcceptedIconJs || generateCookieIconSvg(COOKIE_ICON_PATH, jsIconColor)
  const rejectedIconUrl = userRejectedIconJs || generateCookieIconSvg(COOKIE_OFF_ICON_PATH, jsIconColor)
  const iconStyle = 'width: 20px; height: 20px; display: inline-flex;'
  const acceptedIconMarkup = `<img src="${escapeHtml(acceptedIconUrl)}" alt="" style="${iconStyle}" />`
  const effectiveRejectedIconUrl = rejectedIconUrl || acceptedIconUrl
  const rejectedIconMarkup = `<img src="${escapeHtml(effectiveRejectedIconUrl)}" alt="" style="${iconStyle}" />`

  const cookieAcceptedIconSerialized = JSON.stringify(acceptedIconMarkup)
  const cookieRejectedIconSerialized = JSON.stringify(rejectedIconMarkup)

  return `(function() {
'use strict';

var COOKIE_NAME = 'cookie_consent';
var COOKIE_EXPIRY = ${Number(config.behavior.cookieExpiry) || 182};
var USE_LAZY_LOADER = ${useLazyLoader};
var USE_IDLE_CALLBACK = ${useIdleCallback};
var GEO_REQUIRES_OPT_IN = ${Boolean(config._geoRequiresOptIn)};
var GPC_ENABLED = ${Boolean(config.behavior?.gpc?.enabled ?? true)};
// Detect GPC via client-side DOM property OR server-side Sec-GPC header (defense-in-depth per W3C spec)
var GPC_ACTIVE = GPC_ENABLED && (!!navigator.globalPrivacyControl || !!window.__cbServerGpc);
window.__cbGpcActive = GPC_ACTIVE;

${ga4Integration}

initGA4Default();
initGA4(); // Advanced Consent Mode: load GA4 immediately with consent denied
           // Google sends cookieless pings to model unconsented sessions

${config.integrations?.tcf?.enabled ? `
// ── IAB TCF 2.2 CMP Implementation ────────────────────────────────
var TCF_ENABLED = true;
var TCF_CMP_ID = ${Number(config.integrations.tcf.cmpId) || 0};
var TCF_CMP_VERSION = ${Number(config.integrations.tcf.cmpVersion) || 1};
var TCF_PUBLISHER_CC = ${JSON.stringify(config.integrations.tcf.publisherCountryCode || 'GB')};

var tcfListeners = {};
var tcfListenerId = 0;
var tcfData = {
  tcString: '',
  cmpId: TCF_CMP_ID,
  cmpVersion: TCF_CMP_VERSION,
  gdprApplies: true,
  tcfPolicyVersion: 4,
  publisherCC: TCF_PUBLISHER_CC,
  purpose: { consents: {}, legitimateInterests: {} },
  vendor: { consents: {}, legitimateInterests: {} },
  cmpStatus: 'loaded',
  displayStatus: 'hidden',
  eventStatus: null,
  isServiceSpecific: true
};

// Full CMP API — replaces the stub from init script
window.__tcfapi = function(command, version, callback, param) {
  if (command === 'ping') {
    callback({
      gdprApplies: tcfData.gdprApplies,
      cmpLoaded: true,
      cmpStatus: tcfData.cmpStatus,
      displayStatus: tcfData.displayStatus,
      apiVersion: '2.2',
      cmpVersion: tcfData.cmpVersion,
      cmpId: tcfData.cmpId,
      gvlVersion: 0,
      tcfPolicyVersion: tcfData.tcfPolicyVersion
    });
  } else if (command === 'getTCData') {
    callback(Object.assign({}, tcfData, { eventStatus: tcfData.eventStatus }), true);
  } else if (command === 'addEventListener') {
    var id = ++tcfListenerId;
    tcfListeners[id] = callback;
    callback(Object.assign({}, tcfData, { listenerId: id, eventStatus: tcfData.displayStatus === 'visible' ? 'cmpuishown' : 'tcloaded' }), true);
  } else if (command === 'removeEventListener') {
    delete tcfListeners[param];
    if (typeof callback === 'function') callback(true);
  }
};

// Process queued calls from the init script stub
if (window.__tcfapi.queue) {
  var q = window.__tcfapi.queue;
  delete window.__tcfapi.queue;
  q.forEach(function(args) { window.__tcfapi.apply(null, args); });
}

function tcfNotifyListeners(eventStatus) {
  tcfData.eventStatus = eventStatus;
  Object.keys(tcfListeners).forEach(function(id) {
    try {
      tcfListeners[id](Object.assign({}, tcfData, { listenerId: Number(id), eventStatus: eventStatus }), true);
    } catch(e) { console.error('[TCF] Listener error:', e); }
  });
}

function getTcfConsent() {
  var raw = getCookie('euconsent-v2');
  if (raw) {
    try { return JSON.parse(raw); } catch(e) { return null; }
  }
  return null;
}

function saveTcfConsent(purposes, vendors) {
  var now = Date.now();
  var record = {
    purposes: purposes,
    vendors: vendors || {},
    created: now,
    updated: now
  };

  // Merge with existing record to preserve created timestamp
  var existing = getTcfConsent();
  if (existing && existing.created) {
    record.created = existing.created;
  }

  setCookie('euconsent-v2', JSON.stringify(record), COOKIE_EXPIRY);

  // Update tcfData with purpose consents
  var purposeConsents = {};
  var purposeLI = {};
  // Consent-basis purposes: 1, 3, 4, 5, 6
  [1, 3, 4, 5, 6].forEach(function(id) { purposeConsents[id] = !!purposes[id]; });
  // LI-basis purposes: 2, 7, 8, 9, 10, 11
  [2, 7, 8, 9, 10, 11].forEach(function(id) { purposeLI[id] = !!purposes[id]; });
  tcfData.purpose.consents = purposeConsents;
  tcfData.purpose.legitimateInterests = purposeLI;
  tcfData.vendor = { consents: vendors || {}, legitimateInterests: {} };

  // Map TCF purposes to Google Consent Mode signals
  var analyticsGranted = !!purposes[7] || !!purposes[8] || !!purposes[9];
  var adGranted = !!purposes[2] || !!purposes[3] || !!purposes[4];
  var personalizationGranted = !!purposes[3] || !!purposes[4] || !!purposes[5] || !!purposes[6];

  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': analyticsGranted ? 'granted' : 'denied',
      'ad_storage': adGranted ? 'granted' : 'denied',
      'ad_user_data': adGranted ? 'granted' : 'denied',
      'ad_personalization': personalizationGranted ? 'granted' : 'denied'
    });
  }

  // Notify all TCF listeners
  tcfNotifyListeners('useractioncomplete');
}

function loadTcfConsentOnPageLoad() {
  var tcfRecord = getTcfConsent();
  if (tcfRecord && tcfRecord.purposes) {
    var purposeConsents = {};
    var purposeLI = {};
    [1, 3, 4, 5, 6].forEach(function(id) { purposeConsents[id] = !!tcfRecord.purposes[id]; });
    [2, 7, 8, 9, 10, 11].forEach(function(id) { purposeLI[id] = !!tcfRecord.purposes[id]; });
    tcfData.purpose.consents = purposeConsents;
    tcfData.purpose.legitimateInterests = purposeLI;
    tcfData.vendor = { consents: tcfRecord.vendors || {}, legitimateInterests: {} };
    tcfData.eventStatus = 'tcloaded';
    tcfNotifyListeners('tcloaded');
  }
}
` : `
var TCF_ENABLED = false;
`}

var injectedScripts = window.__cookieBannerInjected || (window.__cookieBannerInjected = {});
var injectedExternalScripts = window.__cookieBannerExternal || (window.__cookieBannerExternal = {});

function scheduleTask(fn) {
  if (!USE_LAZY_LOADER) {
    fn();
    return;
  }

  if (USE_IDLE_CALLBACK && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn);
  } else {
    setTimeout(fn, 1);
  }
}

function loadExternalScript(src, name) {
  if (injectedExternalScripts[src]) {
    return;
  }

  var scriptEl = document.createElement('script');
  scriptEl.async = true;
  scriptEl.src = src;
  scriptEl.setAttribute('data-cookie-banner-src', src);
  scriptEl.onload = function() {
    injectedExternalScripts[src] = true;
  };
  scriptEl.onerror = function(error) {
    delete injectedExternalScripts[src];
    console.error('Error loading external script:', name, error);
  };
  injectedExternalScripts[src] = true;
  document.head.appendChild(scriptEl);
  console.log('Loading external script:', name);
}

function injectInlineScript(encoded, name, cacheKey) {
  if (injectedScripts[cacheKey]) {
    return;
  }

  try {
    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('data-cookie-banner-inline', cacheKey);
    scriptEl.textContent = atob(encoded);
    document.head.appendChild(scriptEl);
    injectedScripts[cacheKey] = true;
    console.log('Loaded script:', name);
  } catch (error) {
    console.error('Error injecting inline script', name, error);
  }
}

// Language translations
var TRANSLATIONS = {
  en: {
    title: ${JSON.stringify(config.text.title)},
    message: ${JSON.stringify(config.text.message)},
    acceptButton: ${JSON.stringify(config.text.acceptButton)},
    rejectButton: ${JSON.stringify(config.text.rejectButton)},
    preferencesButton: ${JSON.stringify(config.text.preferencesButton)},
    footerLink: ${JSON.stringify(config.branding.footerLink.text)},
    preferencesTitle: "Privacy Center",
    preferencesDescription: "By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.",
    acceptAll: "Accept All",
    managePreferences: "Manage cookie preferences",
    strictlyNecessary: "Strictly Necessary Cookies",
    strictlyNecessaryDesc: "Always active",
    functionality: "Functional Cookies",
    functionalityDesc: "Remember preferences and choices",
    analytics: "Performance Cookies",
    analyticsDesc: "Help us improve our website",
    marketing: "Targeting Cookies",
    marketingDesc: "Personalized ads and content",
    socialMedia: "Social Media Cookies",
    socialMediaDesc: "Social media integration",
    confirmChoices: "Confirm My Choices",
    saveButton: "Save",
    cancelButton: "Cancel",
    cookieSettings: "Cookie Settings",
    privacyPolicy: ${JSON.stringify(config.branding.privacyPolicy.text || 'Privacy Policy')}
  },
  fr: {
    title: ${config.language === 'fr' ? JSON.stringify(config.text.title) : '"Nous utilisons des cookies"'},
    message: ${config.language === 'fr' ? JSON.stringify(config.text.message) : '"Ce site web utilise des cookies pour am\\u00e9liorer votre exp\\u00e9rience de navigation et fournir du contenu personnalis\\u00e9."'},
    acceptButton: ${config.language === 'fr' ? JSON.stringify(config.text.acceptButton) : '"Accepter tout"'},
    rejectButton: ${config.language === 'fr' ? JSON.stringify(config.text.rejectButton) : '"Rejeter"'},
    preferencesButton: ${config.language === 'fr' ? JSON.stringify(config.text.preferencesButton) : '"Pr\\u00e9f\\u00e9rences"'},
    footerLink: ${config.language === 'fr' ? JSON.stringify(config.branding.footerLink.text) : '"Param\\u00e8tres des cookies"'},
    preferencesTitle: "Centre de confidentialit\\u00e9",
    preferencesDescription: "En cliquant sur \\u00ab Accepter \\u00bb, vous acceptez le stockage de cookies sur votre appareil pour am\\u00e9liorer la navigation sur le site, analyser l\\u2019utilisation du site et contribuer \\u00e0 nos efforts de marketing.",
    acceptAll: "Accepter tout",
    managePreferences: "G\\u00e9rer les pr\\u00e9f\\u00e9rences de cookies",
    strictlyNecessary: "Cookies strictement n\\u00e9cessaires",
    strictlyNecessaryDesc: "Toujours actif",
    functionality: "Cookies fonctionnels",
    functionalityDesc: "M\\u00e9moriser les pr\\u00e9f\\u00e9rences et les choix",
    analytics: "Cookies de performance",
    analyticsDesc: "Nous aider \\u00e0 am\\u00e9liorer notre site",
    marketing: "Cookies de ciblage",
    marketingDesc: "Publicit\\u00e9s et contenu personnalis\\u00e9s",
    socialMedia: "Cookies de r\\u00e9seaux sociaux",
    socialMediaDesc: "Int\\u00e9gration des r\\u00e9seaux sociaux",
    confirmChoices: "Confirmer mes choix",
    saveButton: "Enregistrer",
    cancelButton: "Annuler",
    cookieSettings: "Param\\u00e8tres des cookies",
    privacyPolicy: "Politique de confidentialit\\u00e9"
  },
  es: {
    title: ${config.language === 'es' ? JSON.stringify(config.text.title) : '"Usamos cookies"'},
    message: ${config.language === 'es' ? JSON.stringify(config.text.message) : '"Este sitio web utiliza cookies para mejorar su experiencia de navegaci\\u00f3n y proporcionar contenido personalizado."'},
    acceptButton: ${config.language === 'es' ? JSON.stringify(config.text.acceptButton) : '"Aceptar todo"'},
    rejectButton: ${config.language === 'es' ? JSON.stringify(config.text.rejectButton) : '"Rechazar"'},
    preferencesButton: ${config.language === 'es' ? JSON.stringify(config.text.preferencesButton) : '"Preferencias"'},
    footerLink: ${config.language === 'es' ? JSON.stringify(config.branding.footerLink.text) : '"Configuraci\\u00f3n de cookies"'},
    preferencesTitle: "Centro de privacidad",
    preferencesDescription: "Al hacer clic en 'Aceptar', acepta el almacenamiento de cookies en su dispositivo para mejorar la navegaci\\u00f3n del sitio, analizar el uso del sitio y colaborar con nuestros esfuerzos de marketing.",
    acceptAll: "Aceptar todo",
    managePreferences: "Gestionar preferencias de cookies",
    strictlyNecessary: "Cookies estrictamente necesarias",
    strictlyNecessaryDesc: "Siempre activas",
    functionality: "Cookies funcionales",
    functionalityDesc: "Recordar preferencias y opciones",
    analytics: "Cookies de rendimiento",
    analyticsDesc: "Ayudarnos a mejorar nuestro sitio",
    marketing: "Cookies de segmentaci\\u00f3n",
    marketingDesc: "Anuncios y contenido personalizado",
    socialMedia: "Cookies de redes sociales",
    socialMediaDesc: "Integraci\\u00f3n de redes sociales",
    confirmChoices: "Confirmar mis opciones",
    saveButton: "Guardar",
    cancelButton: "Cancelar",
    cookieSettings: "Configuraci\\u00f3n de cookies",
    privacyPolicy: "Pol\\u00edtica de privacidad"
  },
  de: {
    title: ${config.language === 'de' ? JSON.stringify(config.text.title) : '"Wir verwenden Cookies"'},
    message: ${config.language === 'de' ? JSON.stringify(config.text.message) : '"Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern und personalisierte Inhalte bereitzustellen."'},
    acceptButton: ${config.language === 'de' ? JSON.stringify(config.text.acceptButton) : '"Alle akzeptieren"'},
    rejectButton: ${config.language === 'de' ? JSON.stringify(config.text.rejectButton) : '"Ablehnen"'},
    preferencesButton: ${config.language === 'de' ? JSON.stringify(config.text.preferencesButton) : '"Einstellungen"'},
    footerLink: ${config.language === 'de' ? JSON.stringify(config.branding.footerLink.text) : '"Cookie-Einstellungen"'},
    preferencesTitle: "Datenschutzzentrum",
    preferencesDescription: "Durch Klicken auf \\u201eAkzeptieren\\u201c stimmen Sie der Speicherung von Cookies auf Ihrem Ger\\u00e4t zu, um die Navigation zu verbessern, die Nutzung zu analysieren und unsere Marketingma\\u00dfnahmen zu unterst\\u00fctzen.",
    acceptAll: "Alle akzeptieren",
    managePreferences: "Cookie-Einstellungen verwalten",
    strictlyNecessary: "Unbedingt erforderliche Cookies",
    strictlyNecessaryDesc: "Immer aktiv",
    functionality: "Funktionale Cookies",
    functionalityDesc: "Einstellungen und Pr\\u00e4ferenzen merken",
    analytics: "Leistungs-Cookies",
    analyticsDesc: "Helfen uns, unsere Website zu verbessern",
    marketing: "Targeting-Cookies",
    marketingDesc: "Personalisierte Werbung und Inhalte",
    socialMedia: "Social-Media-Cookies",
    socialMediaDesc: "Integration sozialer Medien",
    confirmChoices: "Meine Auswahl best\\u00e4tigen",
    saveButton: "Speichern",
    cancelButton: "Abbrechen",
    cookieSettings: "Cookie-Einstellungen",
    privacyPolicy: "Datenschutzerkl\\u00e4rung"
  },
  pt: {
    title: ${config.language === 'pt' ? JSON.stringify(config.text.title) : '"Utilizamos cookies"'},
    message: ${config.language === 'pt' ? JSON.stringify(config.text.message) : '"Este site utiliza cookies para melhorar sua experi\\u00eancia de navega\\u00e7\\u00e3o e fornecer conte\\u00fado personalizado."'},
    acceptButton: ${config.language === 'pt' ? JSON.stringify(config.text.acceptButton) : '"Aceitar tudo"'},
    rejectButton: ${config.language === 'pt' ? JSON.stringify(config.text.rejectButton) : '"Rejeitar"'},
    preferencesButton: ${config.language === 'pt' ? JSON.stringify(config.text.preferencesButton) : '"Prefer\\u00eancias"'},
    footerLink: ${config.language === 'pt' ? JSON.stringify(config.branding.footerLink.text) : '"Configura\\u00e7\\u00f5es de cookies"'},
    preferencesTitle: "Central de Privacidade",
    preferencesDescription: "Ao clicar em 'Aceitar', voc\\u00ea concorda com o armazenamento de cookies em seu dispositivo para melhorar a navega\\u00e7\\u00e3o, analisar o uso do site e auxiliar em nossos esfor\\u00e7os de marketing.",
    acceptAll: "Aceitar tudo",
    managePreferences: "Gerenciar prefer\\u00eancias de cookies",
    strictlyNecessary: "Cookies estritamente necess\\u00e1rios",
    strictlyNecessaryDesc: "Sempre ativo",
    functionality: "Cookies funcionais",
    functionalityDesc: "Lembrar prefer\\u00eancias e escolhas",
    analytics: "Cookies de desempenho",
    analyticsDesc: "Nos ajudam a melhorar o site",
    marketing: "Cookies de segmenta\\u00e7\\u00e3o",
    marketingDesc: "An\\u00fancios e conte\\u00fado personalizados",
    socialMedia: "Cookies de m\\u00eddia social",
    socialMediaDesc: "Integra\\u00e7\\u00e3o de m\\u00eddias sociais",
    confirmChoices: "Confirmar minhas escolhas",
    saveButton: "Salvar",
    cancelButton: "Cancelar",
    cookieSettings: "Configura\\u00e7\\u00f5es de cookies",
    privacyPolicy: "Pol\\u00edtica de Privacidade"
  },
  ja: {
    title: ${config.language === 'ja' ? JSON.stringify(config.text.title) : '"Cookie\\u3092\\u4f7f\\u7528\\u3057\\u3066\\u3044\\u307e\\u3059"'},
    message: ${config.language === 'ja' ? JSON.stringify(config.text.message) : '"\\u5f53\\u30b5\\u30a4\\u30c8\\u3067\\u306f\\u3001\\u95b2\\u89a7\\u4f53\\u9a13\\u306e\\u5411\\u4e0a\\u3068\\u30d1\\u30fc\\u30bd\\u30ca\\u30e9\\u30a4\\u30ba\\u3055\\u308c\\u305f\\u30b3\\u30f3\\u30c6\\u30f3\\u30c4\\u306e\\u63d0\\u4f9b\\u306e\\u305f\\u3081\\u306bCookie\\u3092\\u4f7f\\u7528\\u3057\\u3066\\u3044\\u307e\\u3059\\u3002"'},
    acceptButton: ${config.language === 'ja' ? JSON.stringify(config.text.acceptButton) : '"\\u3059\\u3079\\u3066\\u53d7\\u3051\\u5165\\u308c\\u308b"'},
    rejectButton: ${config.language === 'ja' ? JSON.stringify(config.text.rejectButton) : '"\\u62d2\\u5426"'},
    preferencesButton: ${config.language === 'ja' ? JSON.stringify(config.text.preferencesButton) : '"\\u8a2d\\u5b9a"'},
    footerLink: ${config.language === 'ja' ? JSON.stringify(config.branding.footerLink.text) : '"Cookie\\u8a2d\\u5b9a"'},
    preferencesTitle: "\\u30d7\\u30e9\\u30a4\\u30d0\\u30b7\\u30fc\\u30bb\\u30f3\\u30bf\\u30fc",
    preferencesDescription: "\\u300c\\u53d7\\u3051\\u5165\\u308c\\u308b\\u300d\\u3092\\u30af\\u30ea\\u30c3\\u30af\\u3059\\u308b\\u3068\\u3001\\u30b5\\u30a4\\u30c8\\u306e\\u30ca\\u30d3\\u30b2\\u30fc\\u30b7\\u30e7\\u30f3\\u306e\\u5411\\u4e0a\\u3001\\u5229\\u7528\\u72b6\\u6cc1\\u306e\\u5206\\u6790\\u3001\\u30de\\u30fc\\u30b1\\u30c6\\u30a3\\u30f3\\u30b0\\u6d3b\\u52d5\\u306e\\u652f\\u63f4\\u306e\\u305f\\u3081\\u306b\\u304a\\u4f7f\\u3044\\u306e\\u30c7\\u30d0\\u30a4\\u30b9\\u306bCookie\\u3092\\u4fdd\\u5b58\\u3059\\u308b\\u3053\\u3068\\u306b\\u540c\\u610f\\u3057\\u305f\\u3053\\u3068\\u306b\\u306a\\u308a\\u307e\\u3059\\u3002",
    acceptAll: "\\u3059\\u3079\\u3066\\u53d7\\u3051\\u5165\\u308c\\u308b",
    managePreferences: "Cookie\\u8a2d\\u5b9a\\u3092\\u7ba1\\u7406",
    strictlyNecessary: "\\u5fc5\\u9808Cookie",
    strictlyNecessaryDesc: "\\u5e38\\u306b\\u6709\\u52b9",
    functionality: "\\u6a5f\\u80fdCookie",
    functionalityDesc: "\\u8a2d\\u5b9a\\u3068\\u9078\\u629e\\u3092\\u8a18\\u61b6",
    analytics: "\\u30d1\\u30d5\\u30a9\\u30fc\\u30de\\u30f3\\u30b9Cookie",
    analyticsDesc: "\\u30b5\\u30a4\\u30c8\\u306e\\u6539\\u5584\\u306b\\u5f79\\u7acb\\u3061\\u307e\\u3059",
    marketing: "\\u30bf\\u30fc\\u30b2\\u30c6\\u30a3\\u30f3\\u30b0Cookie",
    marketingDesc: "\\u30d1\\u30fc\\u30bd\\u30ca\\u30e9\\u30a4\\u30ba\\u3055\\u308c\\u305f\\u5e83\\u544a\\u3068\\u30b3\\u30f3\\u30c6\\u30f3\\u30c4",
    socialMedia: "\\u30bd\\u30fc\\u30b7\\u30e3\\u30eb\\u30e1\\u30c7\\u30a3\\u30a2Cookie",
    socialMediaDesc: "\\u30bd\\u30fc\\u30b7\\u30e3\\u30eb\\u30e1\\u30c7\\u30a3\\u30a2\\u306e\\u7d71\\u5408",
    confirmChoices: "\\u9078\\u629e\\u3092\\u78ba\\u8a8d",
    saveButton: "\\u4fdd\\u5b58",
    cancelButton: "\\u30ad\\u30e3\\u30f3\\u30bb\\u30eb",
    cookieSettings: "Cookie\\u8a2d\\u5b9a",
    privacyPolicy: "\\u30d7\\u30e9\\u30a4\\u30d0\\u30b7\\u30fc\\u30dd\\u30ea\\u30b7\\u30fc"
  },
  zh: {
    title: ${config.language === 'zh' ? JSON.stringify(config.text.title) : '"\\u6211\\u4eec\\u4f7f\\u7528Cookie"'},
    message: ${config.language === 'zh' ? JSON.stringify(config.text.message) : '"\\u672c\\u7f51\\u7ad9\\u4f7f\\u7528Cookie\\u6765\\u63d0\\u5347\\u60a8\\u7684\\u6d4f\\u89c8\\u4f53\\u9a8c\\u5e76\\u63d0\\u4f9b\\u4e2a\\u6027\\u5316\\u5185\\u5bb9\\u3002"'},
    acceptButton: ${config.language === 'zh' ? JSON.stringify(config.text.acceptButton) : '"\\u5168\\u90e8\\u63a5\\u53d7"'},
    rejectButton: ${config.language === 'zh' ? JSON.stringify(config.text.rejectButton) : '"\\u62d2\\u7edd"'},
    preferencesButton: ${config.language === 'zh' ? JSON.stringify(config.text.preferencesButton) : '"\\u8bbe\\u7f6e"'},
    footerLink: ${config.language === 'zh' ? JSON.stringify(config.branding.footerLink.text) : '"Cookie\\u8bbe\\u7f6e"'},
    preferencesTitle: "\\u9690\\u79c1\\u4e2d\\u5fc3",
    preferencesDescription: "\\u70b9\\u51fb\\u201c\\u63a5\\u53d7\\u201d\\u5373\\u8868\\u793a\\u60a8\\u540c\\u610f\\u5728\\u60a8\\u7684\\u8bbe\\u5907\\u4e0a\\u5b58\\u50a8Cookie\\uff0c\\u4ee5\\u6539\\u5584\\u7f51\\u7ad9\\u5bfc\\u822a\\u3001\\u5206\\u6790\\u7f51\\u7ad9\\u4f7f\\u7528\\u60c5\\u51b5\\u5e76\\u534f\\u52a9\\u6211\\u4eec\\u7684\\u8425\\u9500\\u6d3b\\u52a8\\u3002",
    acceptAll: "\\u5168\\u90e8\\u63a5\\u53d7",
    managePreferences: "\\u7ba1\\u7406Cookie\\u504f\\u597d",
    strictlyNecessary: "\\u5fc5\\u8981Cookie",
    strictlyNecessaryDesc: "\\u59cb\\u7ec8\\u542f\\u7528",
    functionality: "\\u529f\\u80fdCookie",
    functionalityDesc: "\\u8bb0\\u4f4f\\u504f\\u597d\\u548c\\u9009\\u62e9",
    analytics: "\\u6027\\u80fdCookie",
    analyticsDesc: "\\u5e2e\\u52a9\\u6211\\u4eec\\u6539\\u8fdb\\u7f51\\u7ad9",
    marketing: "\\u5b9a\\u5411Cookie",
    marketingDesc: "\\u4e2a\\u6027\\u5316\\u5e7f\\u544a\\u548c\\u5185\\u5bb9",
    socialMedia: "\\u793e\\u4ea4\\u5a92\\u4f53Cookie",
    socialMediaDesc: "\\u793e\\u4ea4\\u5a92\\u4f53\\u96c6\\u6210",
    confirmChoices: "\\u786e\\u8ba4\\u6211\\u7684\\u9009\\u62e9",
    saveButton: "\\u4fdd\\u5b58",
    cancelButton: "\\u53d6\\u6d88",
    cookieSettings: "Cookie\\u8bbe\\u7f6e",
    privacyPolicy: "\\u9690\\u79c1\\u653f\\u7b56"
  },
  ko: {
    title: ${config.language === 'ko' ? JSON.stringify(config.text.title) : '"\\ucfe0\\ud0a4\\ub97c \\uc0ac\\uc6a9\\ud569\\ub2c8\\ub2e4"'},
    message: ${config.language === 'ko' ? JSON.stringify(config.text.message) : '"\\uc774 \\uc6f9\\uc0ac\\uc774\\ud2b8\\ub294 \\ube0c\\ub77c\\uc6b0\\uc9d5 \\uacbd\\ud5d8\\uc744 \\ud5a5\\uc0c1\\uc2dc\\ud0a4\\uace0 \\ub9de\\ucda4\\ud615 \\ucf58\\ud150\\uce20\\ub97c \\uc81c\\uacf5\\ud558\\uae30 \\uc704\\ud574 \\ucfe0\\ud0a4\\ub97c \\uc0ac\\uc6a9\\ud569\\ub2c8\\ub2e4."'},
    acceptButton: ${config.language === 'ko' ? JSON.stringify(config.text.acceptButton) : '"\\ubaa8\\ub450 \\uc218\\ub77d"'},
    rejectButton: ${config.language === 'ko' ? JSON.stringify(config.text.rejectButton) : '"\\uac70\\ubd80"'},
    preferencesButton: ${config.language === 'ko' ? JSON.stringify(config.text.preferencesButton) : '"\\uc124\\uc815"'},
    footerLink: ${config.language === 'ko' ? JSON.stringify(config.branding.footerLink.text) : '"\\ucfe0\\ud0a4 \\uc124\\uc815"'},
    preferencesTitle: "\\uac1c\\uc778\\uc815\\ubcf4 \\uc13c\\ud130",
    preferencesDescription: "'\\uc218\\ub77d'\\uc744 \\ud074\\ub9ad\\ud558\\uba74 \\uc0ac\\uc774\\ud2b8 \\ud0d0\\uc0c9 \\uac1c\\uc120, \\uc0ac\\uc774\\ud2b8 \\uc0ac\\uc6a9 \\ubd84\\uc11d \\ubc0f \\ub9c8\\ucf00\\ud305 \\ud65c\\ub3d9 \\uc9c0\\uc6d0\\uc744 \\uc704\\ud574 \\uae30\\uae30\\uc5d0 \\ucfe0\\ud0a4\\ub97c \\uc800\\uc7a5\\ud558\\ub294 \\ub370 \\ub3d9\\uc758\\ud558\\ub294 \\uac83\\uc785\\ub2c8\\ub2e4.",
    acceptAll: "\\ubaa8\\ub450 \\uc218\\ub77d",
    managePreferences: "\\ucfe0\\ud0a4 \\uc124\\uc815 \\uad00\\ub9ac",
    strictlyNecessary: "\\ud544\\uc218 \\ucfe0\\ud0a4",
    strictlyNecessaryDesc: "\\ud56d\\uc0c1 \\ud65c\\uc131",
    functionality: "\\uae30\\ub2a5 \\ucfe0\\ud0a4",
    functionalityDesc: "\\uc124\\uc815\\uacfc \\uc120\\ud0dd \\uae30\\uc5b5",
    analytics: "\\uc131\\ub2a5 \\ucfe0\\ud0a4",
    analyticsDesc: "\\uc6f9\\uc0ac\\uc774\\ud2b8 \\uac1c\\uc120\\uc5d0 \\ub3c4\\uc6c0",
    marketing: "\\ud0c0\\uac9f\\ud305 \\ucfe0\\ud0a4",
    marketingDesc: "\\ub9de\\ucda4\\ud615 \\uad11\\uace0 \\ubc0f \\ucf58\\ud150\\uce20",
    socialMedia: "\\uc18c\\uc15c \\ubbf8\\ub514\\uc5b4 \\ucfe0\\ud0a4",
    socialMediaDesc: "\\uc18c\\uc15c \\ubbf8\\ub514\\uc5b4 \\ud1b5\\ud569",
    confirmChoices: "\\uc120\\ud0dd \\ud655\\uc778",
    saveButton: "\\uc800\\uc7a5",
    cancelButton: "\\ucde8\\uc18c",
    cookieSettings: "\\ucfe0\\ud0a4 \\uc124\\uc815",
    privacyPolicy: "\\uac1c\\uc778\\uc815\\ubcf4\\ucc98\\ub9ac\\ubc29\\uce68"
  },
  ar: {
    title: ${config.language === 'ar' ? JSON.stringify(config.text.title) : '"\\u0646\\u0633\\u062a\\u062e\\u062f\\u0645 \\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637"'},
    message: ${config.language === 'ar' ? JSON.stringify(config.text.message) : '"\\u064a\\u0633\\u062a\\u062e\\u062f\\u0645 \\u0647\\u0630\\u0627 \\u0627\\u0644\\u0645\\u0648\\u0642\\u0639 \\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0644\\u062a\\u062d\\u0633\\u064a\\u0646 \\u062a\\u062c\\u0631\\u0628\\u0629 \\u0627\\u0644\\u062a\\u0635\\u0641\\u062d \\u0648\\u062a\\u0642\\u062f\\u064a\\u0645 \\u0645\\u062d\\u062a\\u0648\\u0649 \\u0645\\u062e\\u0635\\u0635."'},
    acceptButton: ${config.language === 'ar' ? JSON.stringify(config.text.acceptButton) : '"\\u0642\\u0628\\u0648\\u0644 \\u0627\\u0644\\u0643\\u0644"'},
    rejectButton: ${config.language === 'ar' ? JSON.stringify(config.text.rejectButton) : '"\\u0631\\u0641\\u0636"'},
    preferencesButton: ${config.language === 'ar' ? JSON.stringify(config.text.preferencesButton) : '"\\u0627\\u0644\\u062a\\u0641\\u0636\\u064a\\u0644\\u0627\\u062a"'},
    footerLink: ${config.language === 'ar' ? JSON.stringify(config.branding.footerLink.text) : '"\\u0625\\u0639\\u062f\\u0627\\u062f\\u0627\\u062a \\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637"'},
    preferencesTitle: "\\u0645\\u0631\\u0643\\u0632 \\u0627\\u0644\\u062e\\u0635\\u0648\\u0635\\u064a\\u0629",
    preferencesDescription: "\\u0628\\u0627\\u0644\\u0646\\u0642\\u0631 \\u0639\\u0644\\u0649 \\u00ab\\u0642\\u0628\\u0648\\u0644\\u00bb \\u0641\\u0625\\u0646\\u0643 \\u062a\\u0648\\u0627\\u0641\\u0642 \\u0639\\u0644\\u0649 \\u062a\\u062e\\u0632\\u064a\\u0646 \\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0639\\u0644\\u0649 \\u062c\\u0647\\u0627\\u0632\\u0643 \\u0644\\u062a\\u062d\\u0633\\u064a\\u0646 \\u0627\\u0644\\u062a\\u0646\\u0642\\u0644 \\u0648\\u062a\\u062d\\u0644\\u064a\\u0644 \\u0627\\u0633\\u062a\\u062e\\u062f\\u0627\\u0645 \\u0627\\u0644\\u0645\\u0648\\u0642\\u0639 \\u0648\\u062f\\u0639\\u0645 \\u062c\\u0647\\u0648\\u062f\\u0646\\u0627 \\u0627\\u0644\\u062a\\u0633\\u0648\\u064a\\u0642\\u064a\\u0629.",
    acceptAll: "\\u0642\\u0628\\u0648\\u0644 \\u0627\\u0644\\u0643\\u0644",
    managePreferences: "\\u0625\\u062f\\u0627\\u0631\\u0629 \\u062a\\u0641\\u0636\\u064a\\u0644\\u0627\\u062a \\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637",
    strictlyNecessary: "\\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0627\\u0644\\u0636\\u0631\\u0648\\u0631\\u064a\\u0629",
    strictlyNecessaryDesc: "\\u0646\\u0634\\u0637 \\u062f\\u0627\\u0626\\u0645\\u064b\\u0627",
    functionality: "\\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0627\\u0644\\u0648\\u0638\\u064a\\u0641\\u064a\\u0629",
    functionalityDesc: "\\u062a\\u0630\\u0643\\u0631 \\u0627\\u0644\\u062a\\u0641\\u0636\\u064a\\u0644\\u0627\\u062a \\u0648\\u0627\\u0644\\u062e\\u064a\\u0627\\u0631\\u0627\\u062a",
    analytics: "\\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0627\\u0644\\u0623\\u062f\\u0627\\u0626\\u064a\\u0629",
    analyticsDesc: "\\u062a\\u0633\\u0627\\u0639\\u062f\\u0646\\u0627 \\u0641\\u064a \\u062a\\u062d\\u0633\\u064a\\u0646 \\u0627\\u0644\\u0645\\u0648\\u0642\\u0639",
    marketing: "\\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0627\\u0644\\u0627\\u0633\\u062a\\u0647\\u062f\\u0627\\u0641\\u064a\\u0629",
    marketingDesc: "\\u0625\\u0639\\u0644\\u0627\\u0646\\u0627\\u062a \\u0648\\u0645\\u062d\\u062a\\u0648\\u0649 \\u0645\\u062e\\u0635\\u0635",
    socialMedia: "\\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637 \\u0644\\u0648\\u0633\\u0627\\u0626\\u0644 \\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644",
    socialMediaDesc: "\\u062a\\u0643\\u0627\\u0645\\u0644 \\u0648\\u0633\\u0627\\u0626\\u0644 \\u0627\\u0644\\u062a\\u0648\\u0627\\u0635\\u0644 \\u0627\\u0644\\u0627\\u062c\\u062a\\u0645\\u0627\\u0639\\u064a",
    confirmChoices: "\\u062a\\u0623\\u0643\\u064a\\u062f \\u062e\\u064a\\u0627\\u0631\\u0627\\u062a\\u064a",
    saveButton: "\\u062d\\u0641\\u0638",
    cancelButton: "\\u0625\\u0644\\u063a\\u0627\\u0621",
    cookieSettings: "\\u0625\\u0639\\u062f\\u0627\\u062f\\u0627\\u062a \\u0645\\u0644\\u0641\\u0627\\u062a \\u062a\\u0639\\u0631\\u064a\\u0641 \\u0627\\u0644\\u0627\\u0631\\u062a\\u0628\\u0627\\u0637",
    privacyPolicy: "\\u0633\\u064a\\u0627\\u0633\\u0629 \\u0627\\u0644\\u062e\\u0635\\u0648\\u0635\\u064a\\u0629"
  },
  hi: {
    title: ${config.language === 'hi' ? JSON.stringify(config.text.title) : '"\\u0939\\u092e \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c \\u0915\\u093e \\u0909\\u092a\\u092f\\u094b\\u0917 \\u0915\\u0930\\u0924\\u0947 \\u0939\\u0948\\u0902"'},
    message: ${config.language === 'hi' ? JSON.stringify(config.text.message) : '"\\u092f\\u0939 \\u0935\\u0947\\u092c\\u0938\\u093e\\u0907\\u091f \\u0906\\u092a\\u0915\\u0947 \\u092c\\u094d\\u0930\\u093e\\u0909\\u091c\\u093c\\u093f\\u0902\\u0917 \\u0905\\u0928\\u0941\\u092d\\u0935 \\u0915\\u094b \\u092c\\u0947\\u0939\\u0924\\u0930 \\u092c\\u0928\\u093e\\u0928\\u0947 \\u0914\\u0930 \\u0935\\u094d\\u092f\\u0915\\u094d\\u0924\\u093f\\u0917\\u0924 \\u0938\\u093e\\u092e\\u0917\\u094d\\u0930\\u0940 \\u092a\\u094d\\u0930\\u0926\\u093e\\u0928 \\u0915\\u0930\\u0928\\u0947 \\u0915\\u0947 \\u0932\\u093f\\u090f \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c \\u0915\\u093e \\u0909\\u092a\\u092f\\u094b\\u0917 \\u0915\\u0930\\u0924\\u0940 \\u0939\\u0948\\u0964"'},
    acceptButton: ${config.language === 'hi' ? JSON.stringify(config.text.acceptButton) : '"\\u0938\\u092d\\u0940 \\u0938\\u094d\\u0935\\u0940\\u0915\\u093e\\u0930 \\u0915\\u0930\\u0947\\u0902"'},
    rejectButton: ${config.language === 'hi' ? JSON.stringify(config.text.rejectButton) : '"\\u0905\\u0938\\u094d\\u0935\\u0940\\u0915\\u093e\\u0930"'},
    preferencesButton: ${config.language === 'hi' ? JSON.stringify(config.text.preferencesButton) : '"\\u092a\\u094d\\u0930\\u093e\\u0925\\u092e\\u093f\\u0915\\u0924\\u093e\\u090f\\u0901"'},
    footerLink: ${config.language === 'hi' ? JSON.stringify(config.branding.footerLink.text) : '"\\u0915\\u0941\\u0915\\u0940\\u091c\\u093c \\u0938\\u0947\\u091f\\u093f\\u0902\\u0917"'},
    preferencesTitle: "\\u0917\\u094b\\u092a\\u0928\\u0940\\u092f\\u0924\\u093e \\u0915\\u0947\\u0902\\u0926\\u094d\\u0930",
    preferencesDescription: "'\\u0938\\u094d\\u0935\\u0940\\u0915\\u093e\\u0930 \\u0915\\u0930\\u0947\\u0902' \\u092a\\u0930 \\u0915\\u094d\\u0932\\u093f\\u0915 \\u0915\\u0930\\u0915\\u0947 \\u0906\\u092a \\u0938\\u093e\\u0907\\u091f \\u0928\\u0947\\u0935\\u093f\\u0917\\u0947\\u0936\\u0928 \\u092c\\u0947\\u0939\\u0924\\u0930 \\u0915\\u0930\\u0928\\u0947, \\u0938\\u093e\\u0907\\u091f \\u0909\\u092a\\u092f\\u094b\\u0917 \\u0915\\u093e \\u0935\\u093f\\u0936\\u094d\\u0932\\u0947\\u0937\\u0923 \\u0915\\u0930\\u0928\\u0947 \\u0914\\u0930 \\u0939\\u092e\\u093e\\u0930\\u0947 \\u0935\\u093f\\u092a\\u0923\\u0928 \\u092a\\u094d\\u0930\\u092f\\u093e\\u0938\\u094b\\u0902 \\u092e\\u0947\\u0902 \\u0938\\u0939\\u093e\\u092f\\u0924\\u093e \\u0915\\u0947 \\u0932\\u093f\\u090f \\u0905\\u092a\\u0928\\u0947 \\u0921\\u093f\\u0935\\u093e\\u0907\\u0938 \\u092a\\u0930 \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c \\u0938\\u0902\\u0917\\u094d\\u0930\\u0939\\u0940\\u0924 \\u0915\\u0930\\u0928\\u0947 \\u0915\\u0947 \\u0932\\u093f\\u090f \\u0938\\u0939\\u092e\\u0924 \\u0939\\u094b\\u0924\\u0947 \\u0939\\u0948\\u0902\\u0964",
    acceptAll: "\\u0938\\u092d\\u0940 \\u0938\\u094d\\u0935\\u0940\\u0915\\u093e\\u0930 \\u0915\\u0930\\u0947\\u0902",
    managePreferences: "\\u0915\\u0941\\u0915\\u0940\\u091c\\u093c \\u092a\\u094d\\u0930\\u093e\\u0925\\u092e\\u093f\\u0915\\u0924\\u093e\\u090f\\u0901 \\u092a\\u094d\\u0930\\u092c\\u0902\\u0927\\u093f\\u0924 \\u0915\\u0930\\u0947\\u0902",
    strictlyNecessary: "\\u0906\\u0935\\u0936\\u094d\\u092f\\u0915 \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c",
    strictlyNecessaryDesc: "\\u0939\\u092e\\u0947\\u0936\\u093e \\u0938\\u0915\\u094d\\u0930\\u093f\\u092f",
    functionality: "\\u0915\\u093e\\u0930\\u094d\\u092f\\u093e\\u0924\\u094d\\u092e\\u0915 \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c",
    functionalityDesc: "\\u092a\\u094d\\u0930\\u093e\\u0925\\u092e\\u093f\\u0915\\u0924\\u093e\\u090f\\u0901 \\u0914\\u0930 \\u091a\\u092f\\u0928 \\u092f\\u093e\\u0926 \\u0930\\u0916\\u0947\\u0902",
    analytics: "\\u092a\\u094d\\u0930\\u0926\\u0930\\u094d\\u0936\\u0928 \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c",
    analyticsDesc: "\\u0935\\u0947\\u092c\\u0938\\u093e\\u0907\\u091f \\u0938\\u0941\\u0927\\u093e\\u0930\\u0928\\u0947 \\u092e\\u0947\\u0902 \\u092e\\u0926\\u0926",
    marketing: "\\u0932\\u0915\\u094d\\u0937\\u094d\\u092f \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c",
    marketingDesc: "\\u0935\\u094d\\u092f\\u0915\\u094d\\u0924\\u093f\\u0917\\u0924 \\u0935\\u093f\\u091c\\u094d\\u091e\\u093e\\u092a\\u0928 \\u0914\\u0930 \\u0938\\u093e\\u092e\\u0917\\u094d\\u0930\\u0940",
    socialMedia: "\\u0938\\u094b\\u0936\\u0932 \\u092e\\u0940\\u0921\\u093f\\u092f\\u093e \\u0915\\u0941\\u0915\\u0940\\u091c\\u093c",
    socialMediaDesc: "\\u0938\\u094b\\u0936\\u0932 \\u092e\\u0940\\u0921\\u093f\\u092f\\u093e \\u090f\\u0915\\u0940\\u0915\\u0930\\u0923",
    confirmChoices: "\\u092e\\u0947\\u0930\\u0947 \\u091a\\u092f\\u0928 \\u0915\\u0940 \\u092a\\u0941\\u0937\\u094d\\u091f\\u093f \\u0915\\u0930\\u0947\\u0902",
    saveButton: "\\u0938\\u0939\\u0947\\u091c\\u0947\\u0902",
    cancelButton: "\\u0930\\u0926\\u094d\\u0926 \\u0915\\u0930\\u0947\\u0902",
    cookieSettings: "\\u0915\\u0941\\u0915\\u0940\\u091c\\u093c \\u0938\\u0947\\u091f\\u093f\\u0902\\u0917",
    privacyPolicy: "\\u0917\\u094b\\u092a\\u0928\\u0940\\u092f\\u0924\\u093e \\u0928\\u0940\\u0924\\u093f"
  },
  nl: {
    title: ${config.language === 'nl' ? JSON.stringify(config.text.title) : '"Wij gebruiken cookies"'},
    message: ${config.language === 'nl' ? JSON.stringify(config.text.message) : '"Deze website maakt gebruik van cookies om uw browse-ervaring te verbeteren en gepersonaliseerde inhoud aan te bieden."'},
    acceptButton: ${config.language === 'nl' ? JSON.stringify(config.text.acceptButton) : '"Alles accepteren"'},
    rejectButton: ${config.language === 'nl' ? JSON.stringify(config.text.rejectButton) : '"Weigeren"'},
    preferencesButton: ${config.language === 'nl' ? JSON.stringify(config.text.preferencesButton) : '"Voorkeuren"'},
    footerLink: ${config.language === 'nl' ? JSON.stringify(config.branding.footerLink.text) : '"Cookie-instellingen"'},
    preferencesTitle: "Privacycentrum",
    preferencesDescription: "Door op \\u201eAccepteren\\u201d te klikken, gaat u akkoord met het opslaan van cookies op uw apparaat om de sitenavigatie te verbeteren, het sitegebruik te analyseren en onze marketingactiviteiten te ondersteunen.",
    acceptAll: "Alles accepteren",
    managePreferences: "Cookievoorkeuren beheren",
    strictlyNecessary: "Strikt noodzakelijke cookies",
    strictlyNecessaryDesc: "Altijd actief",
    functionality: "Functionele cookies",
    functionalityDesc: "Voorkeuren en instellingen onthouden",
    analytics: "Prestatiecookies",
    analyticsDesc: "Helpen ons de website te verbeteren",
    marketing: "Targeting-cookies",
    marketingDesc: "Gepersonaliseerde advertenties en inhoud",
    socialMedia: "Sociale-mediacookies",
    socialMediaDesc: "Sociale-media-integratie",
    confirmChoices: "Mijn keuzes bevestigen",
    saveButton: "Opslaan",
    cancelButton: "Annuleren",
    cookieSettings: "Cookie-instellingen",
    privacyPolicy: "Privacybeleid"
  },
  sv: {
    title: ${config.language === 'sv' ? JSON.stringify(config.text.title) : '"Vi anv\\u00e4nder cookies"'},
    message: ${config.language === 'sv' ? JSON.stringify(config.text.message) : '"Denna webbplats anv\\u00e4nder cookies f\\u00f6r att f\\u00f6rb\\u00e4ttra din upplevelse och erbjuda anpassat inneh\\u00e5ll."'},
    acceptButton: ${config.language === 'sv' ? JSON.stringify(config.text.acceptButton) : '"Acceptera alla"'},
    rejectButton: ${config.language === 'sv' ? JSON.stringify(config.text.rejectButton) : '"Avvisa"'},
    preferencesButton: ${config.language === 'sv' ? JSON.stringify(config.text.preferencesButton) : '"Inst\\u00e4llningar"'},
    footerLink: ${config.language === 'sv' ? JSON.stringify(config.branding.footerLink.text) : '"Cookieinst\\u00e4llningar"'},
    preferencesTitle: "Integritetscenter",
    preferencesDescription: "Genom att klicka p\\u00e5 \\u201dAcceptera\\u201d samtycker du till att cookies lagras p\\u00e5 din enhet f\\u00f6r att f\\u00f6rb\\u00e4ttra navigeringen, analysera anv\\u00e4ndningen och st\\u00f6dja v\\u00e5ra marknadsf\\u00f6ringsinsatser.",
    acceptAll: "Acceptera alla",
    managePreferences: "Hantera cookieinst\\u00e4llningar",
    strictlyNecessary: "Strikt n\\u00f6dv\\u00e4ndiga cookies",
    strictlyNecessaryDesc: "Alltid aktiv",
    functionality: "Funktionella cookies",
    functionalityDesc: "Komma ih\\u00e5g inst\\u00e4llningar och val",
    analytics: "Prestandacookies",
    analyticsDesc: "Hj\\u00e4lper oss f\\u00f6rb\\u00e4ttra webbplatsen",
    marketing: "M\\u00e5linriktade cookies",
    marketingDesc: "Anpassade annonser och inneh\\u00e5ll",
    socialMedia: "Sociala medier-cookies",
    socialMediaDesc: "Integration med sociala medier",
    confirmChoices: "Bekr\\u00e4fta mina val",
    saveButton: "Spara",
    cancelButton: "Avbryt",
    cookieSettings: "Cookieinst\\u00e4llningar",
    privacyPolicy: "Integritetspolicy"
  },
  nb: {
    title: ${config.language === 'nb' ? JSON.stringify(config.text.title) : '"Vi bruker informasjonskapsler"'},
    message: ${config.language === 'nb' ? JSON.stringify(config.text.message) : '"Denne nettsiden bruker informasjonskapsler for \\u00e5 forbedre din nettleseropplevelse og tilby tilpasset innhold."'},
    acceptButton: ${config.language === 'nb' ? JSON.stringify(config.text.acceptButton) : '"Godta alle"'},
    rejectButton: ${config.language === 'nb' ? JSON.stringify(config.text.rejectButton) : '"Avvis"'},
    preferencesButton: ${config.language === 'nb' ? JSON.stringify(config.text.preferencesButton) : '"Innstillinger"'},
    footerLink: ${config.language === 'nb' ? JSON.stringify(config.branding.footerLink.text) : '"Innstillinger for informasjonskapsler"'},
    preferencesTitle: "Personvernsenter",
    preferencesDescription: "Ved \\u00e5 klikke p\\u00e5 \\u00abGodta\\u00bb samtykker du til lagring av informasjonskapsler p\\u00e5 enheten din for \\u00e5 forbedre navigasjonen, analysere nettstedets bruk og st\\u00f8tte v\\u00e5re markedsf\\u00f8ringsaktiviteter.",
    acceptAll: "Godta alle",
    managePreferences: "Administrer innstillinger for informasjonskapsler",
    strictlyNecessary: "Strengt n\\u00f8dvendige informasjonskapsler",
    strictlyNecessaryDesc: "Alltid aktiv",
    functionality: "Funksjonelle informasjonskapsler",
    functionalityDesc: "Husk innstillinger og valg",
    analytics: "Ytelsesrelaterte informasjonskapsler",
    analyticsDesc: "Hjelper oss \\u00e5 forbedre nettstedet",
    marketing: "M\\u00e5lrettede informasjonskapsler",
    marketingDesc: "Personaliserte annonser og innhold",
    socialMedia: "Sosiale medier-informasjonskapsler",
    socialMediaDesc: "Integrasjon med sosiale medier",
    confirmChoices: "Bekreft mine valg",
    saveButton: "Lagre",
    cancelButton: "Avbryt",
    cookieSettings: "Innstillinger for informasjonskapsler",
    privacyPolicy: "Personvernerkl\\u00e6ring"
  },
  da: {
    title: ${config.language === 'da' ? JSON.stringify(config.text.title) : '"Vi bruger cookies"'},
    message: ${config.language === 'da' ? JSON.stringify(config.text.message) : '"Denne hjemmeside bruger cookies til at forbedre din browsingoplevelse og levere personligt indhold."'},
    acceptButton: ${config.language === 'da' ? JSON.stringify(config.text.acceptButton) : '"Accepter alle"'},
    rejectButton: ${config.language === 'da' ? JSON.stringify(config.text.rejectButton) : '"Afvis"'},
    preferencesButton: ${config.language === 'da' ? JSON.stringify(config.text.preferencesButton) : '"Indstillinger"'},
    footerLink: ${config.language === 'da' ? JSON.stringify(config.branding.footerLink.text) : '"Cookieindstillinger"'},
    preferencesTitle: "Privatlivscenter",
    preferencesDescription: "Ved at klikke p\\u00e5 \\u201dAccepter\\u201d accepterer du lagring af cookies p\\u00e5 din enhed for at forbedre navigationen, analysere brugen af hjemmesiden og st\\u00f8tte vores markedsf\\u00f8ringsindsats.",
    acceptAll: "Accepter alle",
    managePreferences: "Administrer cookieindstillinger",
    strictlyNecessary: "Strengt n\\u00f8dvendige cookies",
    strictlyNecessaryDesc: "Altid aktiv",
    functionality: "Funktionelle cookies",
    functionalityDesc: "Husk indstillinger og valg",
    analytics: "Pr\\u00e6stationscookies",
    analyticsDesc: "Hj\\u00e6lper os med at forbedre hjemmesiden",
    marketing: "M\\u00e5lretningscookies",
    marketingDesc: "Personaliserede annoncer og indhold",
    socialMedia: "Sociale medier-cookies",
    socialMediaDesc: "Integration af sociale medier",
    confirmChoices: "Bekr\\u00e6ft mine valg",
    saveButton: "Gem",
    cancelButton: "Annuller",
    cookieSettings: "Cookieindstillinger",
    privacyPolicy: "Privatlivspolitik"
  },
  it: {
    title: ${config.language === 'it' ? JSON.stringify(config.text.title) : '"Utilizziamo i cookie"'},
    message: ${config.language === 'it' ? JSON.stringify(config.text.message) : '"Questo sito web utilizza i cookie per migliorare la tua esperienza di navigazione e offrire contenuti personalizzati."'},
    acceptButton: ${config.language === 'it' ? JSON.stringify(config.text.acceptButton) : '"Accetta tutto"'},
    rejectButton: ${config.language === 'it' ? JSON.stringify(config.text.rejectButton) : '"Rifiuta"'},
    preferencesButton: ${config.language === 'it' ? JSON.stringify(config.text.preferencesButton) : '"Preferenze"'},
    footerLink: ${config.language === 'it' ? JSON.stringify(config.branding.footerLink.text) : '"Impostazioni cookie"'},
    preferencesTitle: "Centro privacy",
    preferencesDescription: "Cliccando su \\u201cAccetta\\u201d, acconsenti alla memorizzazione dei cookie sul tuo dispositivo per migliorare la navigazione, analizzare l\\u2019utilizzo del sito e supportare le nostre attivit\\u00e0 di marketing.",
    acceptAll: "Accetta tutto",
    managePreferences: "Gestisci le preferenze dei cookie",
    strictlyNecessary: "Cookie strettamente necessari",
    strictlyNecessaryDesc: "Sempre attivo",
    functionality: "Cookie funzionali",
    functionalityDesc: "Ricordare preferenze e scelte",
    analytics: "Cookie di prestazione",
    analyticsDesc: "Ci aiutano a migliorare il sito",
    marketing: "Cookie di targeting",
    marketingDesc: "Pubblicit\\u00e0 e contenuti personalizzati",
    socialMedia: "Cookie dei social media",
    socialMediaDesc: "Integrazione con i social media",
    confirmChoices: "Conferma le mie scelte",
    saveButton: "Salva",
    cancelButton: "Annulla",
    cookieSettings: "Impostazioni cookie",
    privacyPolicy: "Informativa sulla privacy"
  },
  fi: {
    title: ${config.language === 'fi' ? JSON.stringify(config.text.title) : '"K\\u00e4yt\\u00e4mme ev\\u00e4steit\\u00e4"'},
    message: ${config.language === 'fi' ? JSON.stringify(config.text.message) : '"T\\u00e4m\\u00e4 verkkosivusto k\\u00e4ytt\\u00e4\\u00e4 ev\\u00e4steit\\u00e4 selauskokemuksesi parantamiseksi ja sis\\u00e4ll\\u00f6n personoimiseksi."'},
    acceptButton: ${config.language === 'fi' ? JSON.stringify(config.text.acceptButton) : '"Hyv\\u00e4ksy kaikki"'},
    rejectButton: ${config.language === 'fi' ? JSON.stringify(config.text.rejectButton) : '"Hylk\\u00e4\\u00e4"'},
    preferencesButton: ${config.language === 'fi' ? JSON.stringify(config.text.preferencesButton) : '"Asetukset"'},
    footerLink: ${config.language === 'fi' ? JSON.stringify(config.branding.footerLink.text) : '"Ev\\u00e4steasetukset"'},
    preferencesTitle: "Tietosuojakeskus",
    preferencesDescription: "Napsauttamalla \\u201dHyv\\u00e4ksy\\u201d hyv\\u00e4ksyt ev\\u00e4steiden tallentamisen laitteellesi sivuston navigoinnin parantamiseksi, k\\u00e4yt\\u00f6n analysoimiseksi ja markkinointitoimiemme tukemiseksi.",
    acceptAll: "Hyv\\u00e4ksy kaikki",
    managePreferences: "Hallitse ev\\u00e4steasetuksia",
    strictlyNecessary: "V\\u00e4ltt\\u00e4m\\u00e4tt\\u00f6m\\u00e4t ev\\u00e4steet",
    strictlyNecessaryDesc: "Aina aktiivinen",
    functionality: "Toiminnalliset ev\\u00e4steet",
    functionalityDesc: "Muista asetukset ja valinnat",
    analytics: "Suorituskykyev\\u00e4steet",
    analyticsDesc: "Auttavat meit\\u00e4 parantamaan sivustoa",
    marketing: "Kohdennusev\\u00e4steet",
    marketingDesc: "Personoidut mainokset ja sis\\u00e4lt\\u00f6",
    socialMedia: "Sosiaalisen median ev\\u00e4steet",
    socialMediaDesc: "Sosiaalisen median integrointi",
    confirmChoices: "Vahvista valintani",
    saveButton: "Tallenna",
    cancelButton: "Peruuta",
    cookieSettings: "Ev\\u00e4steasetukset",
    privacyPolicy: "Tietosuojaseloste"
  }
};

function detectLanguage() {
  ${config.language === 'auto' ? `
  var htmlLang = (document.documentElement.lang || '').toLowerCase();
  var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  var lang = htmlLang || browserLang;
  if (lang.startsWith('fr')) return 'fr';
  if (lang.startsWith('es')) return 'es';
  if (lang.startsWith('de')) return 'de';
  if (lang.startsWith('pt')) return 'pt';
  if (lang.startsWith('ja')) return 'ja';
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ko')) return 'ko';
  if (lang.startsWith('ar')) return 'ar';
  if (lang.startsWith('hi')) return 'hi';
  if (lang.startsWith('nl')) return 'nl';
  if (lang.startsWith('sv')) return 'sv';
  if (lang.startsWith('nb') || lang.startsWith('no')) return 'nb';
  if (lang.startsWith('da')) return 'da';
  if (lang.startsWith('it')) return 'it';
  if (lang.startsWith('fi')) return 'fi';
  return 'en';
  ` : `
  return ${JSON.stringify(config.language)};
  `}
}

function applyTranslations() {
  var lang = detectLanguage();
  var trans = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Set RTL direction for Arabic
  var container = document.getElementById('cookie-consent-container');
  if (container) {
    container.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    if (lang === 'ar') container.style.textAlign = 'right';
  }

  // Helper to set text by ID without destroying child HTML
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Main banner text
  setText('cookie-title', trans.title);
  // Update message text without destroying the privacy policy link inside it
  var msgEl = document.getElementById('cookie-message');
  if (msgEl) {
    var link = msgEl.querySelector('a');
    if (link) {
      // Preserve the link - update only the text node before it
      var firstText = msgEl.firstChild;
      if (firstText && firstText.nodeType === 3) {
        firstText.textContent = trans.message + ' ';
      }
      // Translate the privacy policy link text
      if (trans.privacyPolicy) {
        link.textContent = trans.privacyPolicy;
      }
    } else {
      msgEl.textContent = trans.message;
    }
  }
  setText('cookie-accept-btn', trans.acceptButton);
  setText('cookie-reject-btn', trans.rejectButton);
  setText('cookie-preferences-btn', trans.preferencesButton);

  // Floating button - only update the text span, not the whole element (preserves icon)
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    var textSpan = floatBtn.querySelector('span:not(.material-symbols-outlined)');
    if (textSpan) textSpan.textContent = trans.footerLink;
  }

  // Preferences panel
  setText('prefs-header-title', trans.cookieSettings);
  setText('prefs-title', trans.preferencesTitle);
  setText('prefs-description', trans.preferencesDescription);
  setText('cookie-accept-all-btn', trans.acceptAll);
  setText('prefs-manage-heading', trans.managePreferences);
  setText('cat-necessary', trans.strictlyNecessary);
  setText('cat-necessary-desc', trans.strictlyNecessaryDesc);
  setText('cat-functionality', trans.functionality);
  setText('cat-functionality-desc', trans.functionalityDesc);
  setText('cat-analytics', trans.analytics);
  setText('cat-analytics-desc', trans.analyticsDesc);
  setText('cat-marketing', trans.marketing);
  setText('cat-marketing-desc', trans.marketingDesc);
  setText('cat-social', trans.socialMedia);
  setText('cat-social-desc', trans.socialMediaDesc);
  setText('cookie-confirm-choices-btn', trans.confirmChoices);
  setText('cookie-save-prefs-btn', trans.saveButton);
  setText('cookie-cancel-prefs-btn', trans.cancelButton);
}

${config.branding.footerLink.enabled ? `
// Global function for inline cookie settings links
window.showCookiePreferences = function() {
  showPreferencesModal();
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
      var parsed = JSON.parse(cookie);
      // TCF: also load euconsent-v2 data and populate __tcfapi
      if (TCF_ENABLED && typeof loadTcfConsentOnPageLoad === 'function') {
        loadTcfConsentOnPageLoad();
      }
      return parsed;
    } catch(e) {
      return null;
    }
  }
  return null;
}

function dispatchConsentUpdate(consent) {
  try {
    window.dispatchEvent(new CustomEvent('cookie-consent-update', {
      detail: {
        analytics: !!consent.analytics,
        marketing: !!consent.marketing,
        functionality: !!consent.functionality
      }
    }));
  } catch(e) {}
}

function saveConsent(consent, tcfPurposes) {
  setCookie(COOKIE_NAME, JSON.stringify(consent), COOKIE_EXPIRY);
  dispatchConsentUpdate(consent);
  loadScripts(consent);
  showFloatingButton();
  updateFloatingButtonIcon(consent);
  if (consent.analytics) {
    initGA4();
  }

  // TCF: save purpose consents to euconsent-v2 cookie and fire __tcfapi events
  if (TCF_ENABLED && tcfPurposes) {
    saveTcfConsent(tcfPurposes, {});
  }

  // Notify GTM template and any registered listeners of consent change
  if (window.__cbConsentCallbacks && window.__cbConsentCallbacks.length) {
    window.__cbConsentCallbacks.forEach(function(cb) {
      try { cb(consent); } catch(e) {}
    });
  }
}

// Toggle switches and consent loading - must be in outer scope
// so showPreferencesModal() can call loadConsentIntoModal()
function setupToggleSwitches() {
  var buttonColor = ${JSON.stringify(config.colors.button)};
  var inactiveColor = ${JSON.stringify(config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af')};

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
      if (input.checked) {
        slider.style.backgroundColor = buttonColor;
        thumb.style.transform = 'translateX(20px)';
      } else {
        slider.style.backgroundColor = inactiveColor;
        thumb.style.transform = 'translateX(0)';
      }

      if (!input.dataset.listenerAttached) {
        input.addEventListener('change', function() {
          if (this.checked) {
            slider.style.backgroundColor = buttonColor;
            thumb.style.transform = 'translateX(20px)';
          } else {
            slider.style.backgroundColor = inactiveColor;
            thumb.style.transform = 'translateX(0)';
          }
        });

        input.dataset.listenerAttached = 'true';
      }
    }
  });
}

function setupTcfToggleSwitches() {
  if (!TCF_ENABLED) return;
  var buttonColor = ${JSON.stringify(config.colors.button)};
  var inactiveColor = ${JSON.stringify(config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#9ca3af')};

  for (var pid = 1; pid <= 11; pid++) {
    (function(id) {
      var input = document.getElementById('tcf-purpose-' + id + '-toggle');
      var slider = document.getElementById('tcf-purpose-' + id + '-slider');
      var thumb = document.getElementById('tcf-purpose-' + id + '-thumb');
      if (!input || !slider || !thumb) return;

      if (input.checked) {
        slider.style.backgroundColor = buttonColor;
        thumb.style.transform = 'translateX(20px)';
      } else {
        slider.style.backgroundColor = inactiveColor;
        thumb.style.transform = 'translateX(0)';
      }

      if (!input.dataset.listenerAttached) {
        input.addEventListener('change', function() {
          if (this.checked) {
            slider.style.backgroundColor = buttonColor;
            thumb.style.transform = 'translateX(20px)';
          } else {
            slider.style.backgroundColor = inactiveColor;
            thumb.style.transform = 'translateX(0)';
          }
        });
        input.dataset.listenerAttached = 'true';
      }
    })(pid);
  }
}

function loadTcfConsentIntoModal() {
  if (!TCF_ENABLED) return;
  var tcfRecord = getTcfConsent();
  if (tcfRecord && tcfRecord.purposes) {
    for (var id = 1; id <= 11; id++) {
      var toggle = document.getElementById('tcf-purpose-' + id + '-toggle');
      if (toggle) toggle.checked = !!tcfRecord.purposes[id];
    }
  }
  setupTcfToggleSwitches();
}

function getTcfPurposeConsentsFromModal() {
  var purposes = {};
  for (var id = 1; id <= 11; id++) {
    var toggle = document.getElementById('tcf-purpose-' + id + '-toggle');
    purposes[id] = toggle ? toggle.checked : false;
  }
  return purposes;
}

function loadConsentIntoModal(consent) {
  if (TCF_ENABLED) {
    loadTcfConsentIntoModal();
    return;
  }

  var func = document.getElementById('cookie-func-toggle-modal');
  var performance = document.getElementById('cookie-performance-toggle-modal');
  var targeting = document.getElementById('cookie-targeting-toggle-modal');
  var social = document.getElementById('cookie-social-toggle-modal');

  if (func) func.checked = consent.functionality || false;
  if (performance) performance.checked = consent.analytics || false;
  if (targeting) targeting.checked = consent.marketing || false;
  if (social) social.checked = consent.marketing || false;

  setupToggleSwitches();
}

function showPreferencesModal() {
  var modal = document.getElementById('cookie-preferences-modal');

  if (!modal) {
    console.warn('Cookie preferences modal not found');
    return;
  }

  var currentConsent = getConsent();
  if (currentConsent) {
    loadConsentIntoModal(currentConsent);
  } else {
    loadConsentIntoModal({ essential: true, functionality: false, analytics: false, marketing: false });
  }

  modal.style.display = 'flex';
  applyGpcModalState();
}

function showFloatingButton() {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    floatBtn.classList.add('show');
    floatBtn.style.setProperty('display', 'flex', 'important');
  }
}

function hideFloatingButton() {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    floatBtn.classList.remove('show');
    floatBtn.style.setProperty('display', 'none', 'important');
  }
}

function updateFloatingButtonIcon(consent) {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (!floatBtn) return;
  
  var cookieAcceptedIcon = ${cookieAcceptedIconSerialized};
  var cookieRejectedIcon = ${cookieRejectedIconSerialized};
  
  // Determine if user has accepted any non-essential cookies
  var hasAcceptedNonEssential = consent.functionality || consent.analytics || consent.marketing;
  
  // Check if button should show text (preserve text if showText is enabled)
  var shouldShowText = ${config.branding?.footerLink?.floatingStyle?.showText !== false};
  // Use translated text for floating button
  var trans = TRANSLATIONS[detectLanguage()] || TRANSLATIONS.en;
  var text = trans.footerLink;
  var hasLogo = ${config.branding?.logo?.enabled && config.branding?.logo?.url ? 'true' : 'false'};
  var logoUrl = ${config.branding?.logo?.enabled && config.branding?.logo?.url ? JSON.stringify(escapeHtml(config.branding.logo.url)) : 'null'};
  var shape = ${JSON.stringify(config.branding?.footerLink?.floatingStyle?.shape || 'pill')};
  
  // Get the appropriate icon
  var icon = hasAcceptedNonEssential ? cookieAcceptedIcon : cookieRejectedIcon;
  
  // Update content based on shape and showText setting
  if (shape === 'circle') {
    // Circle always shows only icon
    floatBtn.innerHTML = icon;
  } else {
    // Pill and square respect showText setting
    // Only show logo if user has NOT rejected (hasAcceptedNonEssential is true)
    // This ensures the rejected state is clearly visible with the rejected icon
    if (shouldShowText && hasLogo && logoUrl && hasAcceptedNonEssential) {
      // Show logo + text
      floatBtn.innerHTML = '<img src="' + logoUrl + '" alt="Logo" style="width: 16px; height: 16px; object-fit: contain; margin-right: 4px;" /><span>' + text + '</span>';
    } else if (shouldShowText) {
      // Show icon + text (Icon handles both rejected state and no-logo state)
      floatBtn.innerHTML = icon + '<span style="margin-left: 4px;">' + text + '</span>';
    } else {
      // Show only icon
      floatBtn.innerHTML = icon;
    }
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
  
  // Google Consent Mode v2 - ALWAYS update consent (required for GDPR compliance)
  // This ensures trackers respect user's consent choices
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied'
    });
  }
  
  // Also update dataLayer for GTM compatibility
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'cookie_consent_update',
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied'
    });
  }
}

function showGpcAcknowledgment() {
  if (document.getElementById('gpc-acknowledgment')) return;
  var bar = document.createElement('div');
  bar.id = 'gpc-acknowledgment';
  bar.setAttribute('role', 'status');
  bar.setAttribute('aria-live', 'polite');
  var lang = detectLanguage();
  var gpcMsg = lang === 'fr'
    ? 'Votre signal Global Privacy Control a \u00e9t\u00e9 respect\u00e9. Les cookies marketing sont d\u00e9sactiv\u00e9s.'
    : 'Your Global Privacy Control signal has been respected. Marketing cookies are off.';
  var gpcManage = lang === 'fr' ? 'G\u00e9rer les autres cookies' : 'Manage other cookies';
  // Build acknowledgment bar using safe DOM methods (no innerHTML - all content is trusted static strings)
  var inner = document.createElement('div');
  inner.style.cssText = 'display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin:0 auto;padding:0 16px;gap:12px;flex-wrap:wrap;';
  var msgSpan = document.createElement('span');
  msgSpan.style.cssText = 'display:flex;align-items:center;gap:8px;';
  var icon = document.createElement('span');
  icon.textContent = '\u2713';
  icon.style.cssText = 'flex-shrink:0;font-weight:bold;';
  var text = document.createElement('span');
  text.textContent = gpcMsg;
  msgSpan.appendChild(icon);
  msgSpan.appendChild(text);
  var link = document.createElement('a');
  link.href = '#';
  link.id = 'gpc-manage-link';
  link.style.cssText = 'white-space:nowrap;text-decoration:underline;opacity:0.9;';
  link.textContent = gpcManage;
  inner.appendChild(msgSpan);
  inner.appendChild(link);
  bar.appendChild(inner);
  document.body.appendChild(bar);
  link.addEventListener('click', function(e) {
    e.preventDefault();
    showPreferencesModal();
    bar.style.display = 'none';
  });
  setTimeout(function() {
    bar.style.opacity = '0';
    setTimeout(function() { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 400);
  }, 8000);
}

function applyGpcModalState() {
  if (!GPC_ACTIVE) return;
  // Inject GPC notice at top of modal content using safe DOM methods
  var modalContent = document.getElementById('cookie-prefs-content');
  if (modalContent && !document.getElementById('gpc-modal-notice')) {
    var notice = document.createElement('div');
    notice.id = 'gpc-modal-notice';
    var noticeInner = document.createElement('div');
    noticeInner.style.cssText = 'display:flex;align-items:center;gap:8px;';
    var lockIcon = document.createElement('span');
    lockIcon.textContent = '\uD83D\uDD12';
    lockIcon.style.cssText = 'flex-shrink:0;';
    var noticeText = document.createElement('span');
    noticeText.style.cssText = 'font-size:13px;font-weight:500;';
    noticeText.textContent = 'Global Privacy Control is active. Marketing cookies are automatically disabled.';
    noticeInner.appendChild(lockIcon);
    noticeInner.appendChild(noticeText);
    notice.appendChild(noticeInner);
    modalContent.insertBefore(notice, modalContent.firstChild);
  }
  // Lock targeting/social toggles when GPC is active
  var targeting = document.getElementById('cookie-targeting-toggle-modal');
  var social = document.getElementById('cookie-social-toggle-modal');
  if (targeting) { targeting.checked = false; targeting.disabled = true; }
  if (social) { social.checked = false; social.disabled = true; }
  // Visually dim the targeting/social toggle sliders
  var targetSlider = document.getElementById('cookie-targeting-toggle-slider');
  var socialSlider = document.getElementById('cookie-social-toggle-slider');
  if (targetSlider) targetSlider.style.opacity = '0.4';
  if (socialSlider) socialSlider.style.opacity = '0.4';
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

  ${config.position === 'bottom' ? `
  var syncBottomBannerToViewport = function() {
    if (!banner || banner.style.display === 'none') return;

    banner.style.setProperty('position', 'fixed', 'important');
    banner.style.setProperty('top', 'auto', 'important');
    banner.style.setProperty('bottom', '0', 'important');
    banner.style.setProperty('left', '0', 'important');
    banner.style.setProperty('right', '0', 'important');

    if (!window.visualViewport || window.innerWidth > 768) {
      banner.style.removeProperty('--cookie-banner-viewport-y');
      banner.style.removeProperty('transform');
      return;
    }

    banner.style.setProperty('transform', 'translateY(0px)', 'important');
    var rect = banner.getBoundingClientRect();
    var correction = Math.round(window.visualViewport.height - rect.bottom);
    if (Math.abs(correction) < 1) correction = 0;
    banner.style.setProperty('transform', 'translateY(' + correction + 'px)', 'important');
  };

  var scheduleBottomBannerSync = function() {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(syncBottomBannerToViewport);
    } else {
      setTimeout(syncBottomBannerToViewport, 0);
    }
  };

  if (!banner.dataset.viewportPinAttached) {
    window.addEventListener('scroll', scheduleBottomBannerSync, { passive: true });
    window.addEventListener('resize', scheduleBottomBannerSync);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('scroll', scheduleBottomBannerSync, { passive: true });
      window.visualViewport.addEventListener('resize', scheduleBottomBannerSync);
    }
    banner.dataset.viewportPinAttached = 'true';
  }
  ` : ''}

  // Geo-targeting: strict opt-in enforcement
  // When a geo rule requires opt-in, hide the close button so visitors must explicitly choose
  if (GEO_REQUIRES_OPT_IN && closeBtn) {
    closeBtn.style.display = 'none';
  }

  // Apply language translations
  applyTranslations();
  
  var existingConsent = getConsent();
  
  // Set up banner button handlers ALWAYS (needed even when consent exists, for when user reopens banner)
  // Use addEventListener to prevent handlers from being overwritten
  if (acceptBtn && !acceptBtn.dataset.handlerAttached) {
    acceptBtn.addEventListener('click', function() {
      var consent = { essential: true, functionality: true, analytics: true, marketing: !GPC_ACTIVE };
      if (GPC_ACTIVE) consent.gpc_auto = true;
      // TCF: accept all purposes
      var tcfPurposes = null;
      if (TCF_ENABLED) {
        tcfPurposes = {};
        for (var i = 1; i <= 11; i++) tcfPurposes[i] = true;
      }
      // Track BEFORE saveConsent — saveConsent loads third-party scripts (GTM, GA4, etc.)
      // that may trigger page reloads, killing any pending flush timers
      trackConsentEvent('accept', consent);
      saveConsent(consent, tcfPurposes);
      initGA4(); // Initialize GA4
      banner.style.display = 'none';
      if (GPC_ACTIVE) showGpcAcknowledgment();
    });
    acceptBtn.dataset.handlerAttached = 'true';
  }

  if (rejectBtn && !rejectBtn.dataset.handlerAttached) {
    rejectBtn.addEventListener('click', function() {
      var consent = { essential: true, functionality: false, analytics: false, marketing: false };
      // TCF: reject all purposes
      var tcfPurposes = null;
      if (TCF_ENABLED) {
        tcfPurposes = {};
        for (var i = 1; i <= 11; i++) tcfPurposes[i] = false;
      }
      // Track BEFORE saveConsent — saveConsent loads third-party scripts
      // that may trigger page reloads, killing any pending flush timers
      trackConsentEvent('reject', consent);
      saveConsent(consent, tcfPurposes);
      banner.style.display = 'none';
    });
    rejectBtn.dataset.handlerAttached = 'true';
  }

  if (closeBtn && !closeBtn.dataset.handlerAttached && !GEO_REQUIRES_OPT_IN) {
    closeBtn.addEventListener('click', function() {
      banner.style.display = 'none';
      trackConsentEvent('dismiss');
    });
    closeBtn.dataset.handlerAttached = 'true';
  }

  ${config.behavior.showPreferences ? `
  if (prefsBtn && !prefsBtn.dataset.handlerAttached) {
    prefsBtn.addEventListener('click', function() {
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
        applyGpcModalState();
      }
    });
    prefsBtn.dataset.handlerAttached = 'true';
  }
  ` : ''}

  // Floating cookie settings button click handler
  // Must be inside init() because the element is injected dynamically
  var floatingSettingsBtn = document.getElementById('cookie-settings-float');
  if (floatingSettingsBtn && !floatingSettingsBtn.dataset.handlerAttached) {
    floatingSettingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showPreferencesModal();
    });
    floatingSettingsBtn.dataset.handlerAttached = 'true';
  }

  // Modal event handlers (set up ALWAYS, needed when user reopens banner)
  var modal = document.getElementById('cookie-preferences-modal');
  var modalCloseBtn = document.getElementById('cookie-prefs-close-btn');
  var acceptAllBtn = document.getElementById('cookie-accept-all-btn');
  var confirmChoicesBtn = document.getElementById('cookie-confirm-choices-btn');

  if (modalCloseBtn && !modalCloseBtn.dataset.handlerAttached) {
    modalCloseBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    modalCloseBtn.dataset.handlerAttached = 'true';
  }

  if (acceptAllBtn && !acceptAllBtn.dataset.handlerAttached) {
    acceptAllBtn.addEventListener('click', function() {
      var consent = { essential: true, functionality: true, analytics: true, marketing: !GPC_ACTIVE };
      if (GPC_ACTIVE) consent.gpc_auto = true;
      // TCF: accept all purposes
      var tcfPurposes = null;
      if (TCF_ENABLED) {
        tcfPurposes = {};
        for (var i = 1; i <= 11; i++) tcfPurposes[i] = true;
      }
      trackConsentEvent('accept', consent);
      saveConsent(consent, tcfPurposes);

      // Update modal toggles to show all ON before closing
      loadConsentIntoModal(consent);

      banner.style.display = 'none';
      modal.style.display = 'none';
      if (GPC_ACTIVE) showGpcAcknowledgment();
    });
    acceptAllBtn.dataset.handlerAttached = 'true';
  }

  // TCF: Reject All button in modal
  var rejectAllBtn = document.getElementById('cookie-reject-all-btn');
  if (rejectAllBtn && !rejectAllBtn.dataset.handlerAttached) {
    rejectAllBtn.addEventListener('click', function() {
      var consent = { essential: true, functionality: false, analytics: false, marketing: false };
      var tcfPurposes = null;
      if (TCF_ENABLED) {
        tcfPurposes = {};
        for (var i = 1; i <= 11; i++) tcfPurposes[i] = false;
      }
      trackConsentEvent('reject', consent);
      saveConsent(consent, tcfPurposes);
      banner.style.display = 'none';
      modal.style.display = 'none';
    });
    rejectAllBtn.dataset.handlerAttached = 'true';
  }

  if (confirmChoicesBtn && !confirmChoicesBtn.dataset.handlerAttached) {
    confirmChoicesBtn.addEventListener('click', function() {
      var tcfPurposes = null;

      if (TCF_ENABLED) {
        // Read TCF purpose toggles from modal
        tcfPurposes = getTcfPurposeConsentsFromModal();
        // Map TCF purposes to legacy consent categories
        var analyticsGranted = !!tcfPurposes[7] || !!tcfPurposes[8] || !!tcfPurposes[9];
        var marketingGranted = !!tcfPurposes[2] || !!tcfPurposes[3] || !!tcfPurposes[4];
        var funcGranted = !!tcfPurposes[1];
        if (GPC_ACTIVE) marketingGranted = false;
        var consent = {
          essential: true,
          functionality: funcGranted,
          analytics: analyticsGranted,
          marketing: marketingGranted
        };
        if (GPC_ACTIVE) consent.gpc_auto = true;

        console.log('User confirmed TCF preferences:', tcfPurposes);
      } else {
        var func = document.getElementById('cookie-func-toggle-modal');
        var performance = document.getElementById('cookie-performance-toggle-modal');
        var targeting = document.getElementById('cookie-targeting-toggle-modal');
        var social = document.getElementById('cookie-social-toggle-modal');

        var marketing = (targeting ? targeting.checked : false) || (social ? social.checked : false);
        if (GPC_ACTIVE) marketing = false;
        var consent = {
          essential: true,
          functionality: func ? func.checked : false,
          analytics: performance ? performance.checked : false,
          marketing: marketing
        };
        if (GPC_ACTIVE) consent.gpc_auto = true;
      }

      console.log('User confirmed cookie preferences:', consent);
      trackConsentEvent('custom', consent);
      saveConsent(consent, tcfPurposes);

      banner.style.display = 'none';
      modal.style.display = 'none';
    });
    confirmChoicesBtn.dataset.handlerAttached = 'true';
  }

  // Close modal when clicking outside
  if (modal && !modal.dataset.handlerAttached) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    modal.dataset.handlerAttached = 'true';
  }
  
  // Initialize toggles
  setupToggleSwitches();
  if (TCF_ENABLED) setupTcfToggleSwitches();

  // GPC reconciliation — MUST run BEFORE any loadScripts call
  if (existingConsent && GPC_ACTIVE) {
    var gpcChanged = false;
    if (existingConsent.marketing) { existingConsent.marketing = false; gpcChanged = true; }
    if (!existingConsent.gpc_auto) { existingConsent.gpc_auto = true; gpcChanged = true; }
    if (gpcChanged) setCookie(COOKIE_NAME, JSON.stringify(existingConsent), COOKIE_EXPIRY);
  } else if (existingConsent && existingConsent.gpc_auto && !GPC_ACTIVE) {
    // GPC was active before but is now off — delete cookie, show banner fresh
    setCookie(COOKIE_NAME, '', -1);
    existingConsent = null;
  }

  // If consent already exists, restore it and show floating button (but don't show banner)
  // All handlers are now set up above, so banner will work when reopened
  if (existingConsent) {
    loadScripts(existingConsent);

    // Initialize GA4 if analytics was accepted
    if (existingConsent.analytics) {
      initGA4();
    }

    // Show floating button if consent already exists
    showFloatingButton();
    updateFloatingButtonIcon(existingConsent);

    // Dispatch initial consent state for framework integrations (React, Vue, etc.)
    dispatchConsentUpdate(existingConsent);

    // Show GPC acknowledgment bar only on the first visit where GPC is newly detected
    if (GPC_ACTIVE && gpcChanged) {
      showGpcAcknowledgment();
    }

    // Don't show banner, but all handlers are already set up above
    return;
  }
  
  // No existing consent - show banner
  // Apply GPC state to modal toggles for first-time visitors
  if (GPC_ACTIVE) applyGpcModalState();

  ${config.behavior.autoShow ? `
  banner.style.display = 'block';
  ${config.position === 'bottom' ? 'scheduleBottomBannerSync();' : ''}
  trackConsentEvent('impression'); // Track banner impression
  // TCF: update display status and notify listeners
  if (TCF_ENABLED) {
    tcfData.displayStatus = 'visible';
    tcfNotifyListeners('cmpuishown');
  }

  // Hide floating button while main banner is showing
  hideFloatingButton();
  ` : ''}
  
  ${config.behavior.dismissOnScroll ? `
  var scrolled = false;
  window.addEventListener('scroll', function() {
    if (!scrolled && window.pageYOffset > 100) {
      scrolled = true;
      banner.style.display = 'none';
      showFloatingButton();
      updateFloatingButtonIcon({ functionality: false, analytics: false, marketing: false });
      trackConsentEvent('dismiss');
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

export const generateConsentInitScript = (config?: BannerConfig) => {
  const tcfEnabled = config?.integrations?.tcf?.enabled === true

  return `<script>
// CRITICAL: Initialize consent mode BEFORE any trackers load
// This MUST be synchronous and run immediately to block trackers
// Place this script FIRST in your <head> section, before any other scripts
(function() {
  'use strict';
  ${tcfEnabled ? `
  // IAB TCF 2.2 __tcfapi stub — must be the very first thing so ad tech finds it immediately
  window.__tcfapi = window.__tcfapi || function() {
    (window.__tcfapi.queue = window.__tcfapi.queue || []).push(arguments);
  };
  ` : ''}
  // Initialize dataLayer immediately (for GTM/GA4)
  window.dataLayer = window.dataLayer || [];

  // Initialize gtag function immediately
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;

  // GTM Template callback registration
  // Allows the Cookie Banner Generator GTM template to listen for consent changes
  window.__cbConsentCallbacks = window.__cbConsentCallbacks || [];
  window.__cbRegisterConsentCallback = function(cb) {
    if (typeof cb === 'function') {
      window.__cbConsentCallbacks.push(cb);
    }
  };
  
  // Set consent defaults to DENIED before any trackers load
  // This blocks ALL trackers (GTM, GA4, Meta Pixel, Google Ads, etc.) until user grants consent
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500  // Wait 500ms for consent update before allowing trackers
  });
  
  // Also push to dataLayer for GTM compatibility
  window.dataLayer.push({
    'event': 'cookie_consent_default',
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied'
  });
})();
</script>`
}
