import { BannerConfig, TrackingScript } from '@/types'

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
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const DEFAULT_ACCEPTED_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMWYxZjFmIj48cGF0aCBkPSJNNDgwLTgwcS04MyAwLTE1Ni0zMS41VDE5Ny0xOTdxLTU0LTU0LTg1LjUtMTI3VDgwLTQ4MHEwLTc1IDI5LTE0N3Q4MS0xMjguNXE1Mi01Ni41IDEyNS05MVQ0NzUtODgxcTIxIDAgNDMgMnQ0NSA3cS05IDQ1IDYgODV0NDUgNjYuNXEzMCAyNi41IDcxLjUgMzYuNXQ4NS41LTVxLTI2IDU5IDcuNSAxMTN0OTkuNSA1NnExIDExIDEuNSAyMC41dC41IDIwLjVxMCA4Mi0zMS41IDE1NC41dC04NS41IDEyN3EtNTQgNTQuNS0xMjcgODZUNDgwLTgwWm0tNjAtNDgwcTI1IDAgNDIuNS0xNy41VDQ4MC02MjBxMC0yNS0xNy41LTQyLjVUNDIwLTY4MHEtMjUgMC00Mi41IDE3LjVUMzYwLTYyMHEwIDI1IDE3LjUgNDIuNVQ0MjAtNTYwWm0tODAgMjAwcTI1IDAgNDIuNS0xNy41VDQwMC00MjBxMC0yNS0xNy41LTQyLjVUMzQwLTQ4MHEtMjUgMC00Mi41IDE3LjVUMjgwLTQyMHEwIDI1IDE3LjUgNDIuNVQzNDAtMzYwWm0yNjAgNDBxMTcgMCAyOC41LTExLjVUNjQwLTM2MHEwLTE3LTExLjUtMjguNVQ2MDAtNDAwcS0xNyAwLTI4LjUgMTEuNVQ1NjAtMzYwcTAgMTcgMTEuNSAyOC41VDYwMC0zMjBaTTQ4MC0xNjBxMTIyIDAgMjE2LjUtODRUODAwLTQ1OHEtNTAtMjItNzguNS02MFQ2ODMtNjAzcS03Ny0xMS0xMzItNjZ0LTY4LTEzMnEtODAtMi0xNDAuNSAyOXQtMTAxIDc5LjVRMjAxLTY0NCAxODAuNS01ODdUMTYwLTQ4MHEwIDEzMyA5My41IDIyNi41VDQ4MC0xNjBabTAtMzI0WiIvPjwvc3ZnPg=='
const DEFAULT_REJECTED_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSIjMWYxZjFmIj48cGF0aCBkPSJtODE1LTI2MC01OC01OHExOC0zMSAyOS02Ni41dDE0LTczLjVxLTUwLTIyLTc4LjUtNjBUNjgzLTYwM3EtNzctMTEtMTMyLTY2dC02OC0xMzJxLTQ5LTItOTAgMTB0LTc2IDMzbC01Ny01N3E2MS00MiAxMzcuNS01OC41VDU2My04NzJxLTkgNDUgNiA4NC41dDQ1IDY2LjVxMzAgMjcgNzEgMzd0ODYtNXEtMzEgNjkgMTEgMTE4dDk2IDUxcTggNzItOS41IDEzOFQ4MTUtMjYwWk0zNDAtMzYwcS0yNSAwLTQyLjUtMTcuNVQyODAtNDIwcTAtMjUgMTcuNS00Mi41VDM0MC00ODBxMjUgMCA0Mi41IDE3LjVUNDgwLTQyMHEwIDI1LTE3LjUgNDIuNVQzNDAtMzYwWk04MTktMjggNzAxLTE0NnEtNDggMzItMTAzLjUgNDlUNDgwLTgwcS04MyAwLTE1Ni0zMS41VDE5Ny0xOTdxLTU0LTU0LTg1LjUtMTI3VDgwLTQ4MHEwLTYyIDE3LTExNy41VDE0Ni03MDFMMjctODIwbDU3LTU3TDg3Ni04NWwtNTcgNTdaTTQ4MC0xNjBxNDUgMCA4NS41LTEydDc2LjUtMzNMMjA1LTY0MnEtMjEgMzYtMzMgNzYuNVQxNjAtNDgwcTAgMTMzIDkzLjUgMjI2LjVUNDgwLTE2MFptLTU2LTI2NFptMTM1LTEzN1oiLz48L3N2Zz4='

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

  const acceptedIconUrl = config.branding?.footerLink?.icons?.accepted || DEFAULT_ACCEPTED_ICON
  const rejectedIconUrl = config.branding?.footerLink?.icons?.rejected || DEFAULT_REJECTED_ICON
  const iconStyle = 'style="width: 20px; height: 20px; display: inline-flex;"'
  const cookieAcceptedIcon = acceptedIconUrl
    ? `<img src="${escapeHtml(acceptedIconUrl)}" alt="" style="width: 20px; height: 20px; display: inline-flex;" />`
    : `<span class="material-symbols-outlined" style="font-size: 20px; line-height: 1; display: inline-flex;">cookie</span>`
  const cookieRejectedIcon = rejectedIconUrl
    ? `<img src="${escapeHtml(rejectedIconUrl)}" alt="" style="width: 20px; height: 20px; display: inline-flex;" />`
    : `<span class="material-symbols-outlined" style="font-size: 20px; line-height: 1; display: inline-flex;">cookie_off</span>`

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

export const generateBannerHTML = (config: BannerConfig) => {
  const logoElement = config.branding.logo.enabled && config.branding.logo.url
    ? `<img src="${escapeHtml(config.branding.logo.url)}" alt="Logo" style="max-width: ${config.branding.logo.maxWidth}px; max-height: ${config.branding.logo.maxHeight}px; object-fit: contain;" />`
    : ''

  const privacyPolicyLink = config.branding.privacyPolicy.url
    ? `<a href="${escapeHtml(config.branding.privacyPolicy.url)}" ${config.branding.privacyPolicy.openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ''} style="color: ${escapeHtml(config.colors.link)} !important; text-decoration: underline;">${escapeHtml(config.branding.privacyPolicy.text)}</a>`
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
  const mainBanner = `<div id="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent" style="position: fixed; ${getPositionStyles()} background-color: ${escapeHtml(config.colors.background)} !important; color: ${escapeHtml(config.colors.text)} !important; ${getLayoutStyles()} z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; ${getAnimationStyles()} display: none;">
  <div style="position: relative;">
    <button id="cookie-close-btn" style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: ${config.colors.text}; font-size: 24px; cursor: pointer; padding: 4px 8px; line-height: 1; opacity: 0.7;" aria-label="Close">&times;</button>
    
    <div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
      ${config.branding.logo.position === 'left' ? logoElement : ''}
      
      <div style="flex: 1; min-width: 250px;">
        ${config.branding.logo.position === 'center' ? `<div style="text-align: center; margin-bottom: 12px;">${logoElement}</div>` : ''}
        
        <h3 id="cookie-title" style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: ${escapeHtml(config.colors.text)} !important;">${escapeHtml(config.text.title)}</h3>
        
        <p id="cookie-message" style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.5; color: ${escapeHtml(config.colors.text)} !important;">${escapeHtml(config.text.message)}${privacyPolicyLink ? ` ${privacyPolicyLink}` : ''}</p>
        
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="cookie-accept-btn" style="background-color: ${escapeHtml(config.colors.button)} !important; color: ${escapeHtml(config.colors.buttonText)} !important; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${escapeHtml(config.text.acceptButton)}</button>
          
          ${config.behavior.showRejectButton !== false ? `<button id="cookie-reject-btn" style="background-color: transparent; color: ${escapeHtml(config.colors.text)} !important; border: 1px solid ${escapeHtml(config.colors.text)} !important; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${escapeHtml(config.text.rejectButton)}</button>` : ''}
          
          ${config.behavior.showPreferences ? `<button id="cookie-preferences-btn" style="background-color: transparent; color: ${escapeHtml(config.colors.link)} !important; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: 500;">${escapeHtml(config.text.preferencesButton)}</button>` : ''}
        </div>
        
      </div>
      
      ${config.branding.logo.position === 'right' ? logoElement : ''}
    </div>
  </div>
</div>`

  // Preferences modal HTML
  const preferencesModal = config.behavior.showPreferences ? `
<!-- Preferences Modal -->
<div id="cookie-preferences-modal" style="position: fixed; inset: 0; z-index: 99999; background-color: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; padding: 16px;">
  <div style="background: ${config.colors.background}; border-radius: 8px; width: 100%; max-width: 512px; max-height: 90vh; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
    <!-- Header -->
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 16px 24px; border-bottom: 1px solid ${borderColor};">
      ${config.branding.logo.enabled && config.branding.logo.url ? `
      <img src="${config.branding.logo.url}" alt="Logo" style="height: 32px; object-fit: contain; max-width: ${config.branding.logo.maxWidth}px; max-height: ${config.branding.logo.maxHeight}px; flex-shrink: 0;" onerror="this.style.display='none'" />
      ` : `
      <span style="font-weight: 600; color: ${config.colors.text};">Cookie Settings</span>
      `}
      
      <button id="cookie-prefs-close-btn" style="padding: 8px; background: none; border: none; border-radius: 6px; cursor: pointer; color: ${config.colors.text}; font-size: 20px; line-height: 1; flex-shrink: 0; opacity: 0.7;" aria-label="Close">
        ×
      </button>
    </div>

    <!-- Content -->
    <div style="display: flex; flex-direction: column; height: 100%; max-height: calc(90vh - 80px);">
      <div style="padding: 24px 24px 0 24px; flex: 1; overflow-y: auto;">
        <!-- Title -->
        <h2 id="prefs-title" style="font-size: 20px; font-weight: bold; color: ${config.colors.text}; margin: 0 0 12px 0;">
          Privacy Center
        </h2>
        
        <!-- Description -->
        <p style="font-size: 14px; color: ${secondaryTextColor}; margin: 0 0 24px 0; line-height: 1.5;">
          By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.
        </p>

        <!-- Accept All Button -->
        <button id="cookie-accept-all-btn" style="width: 100%; height: 48px; margin-bottom: 24px; font-size: 16px; font-weight: 500; border-radius: 8px; border: none; cursor: pointer; background-color: ${config.colors.button}; color: ${config.colors.buttonText};">
          ACCEPT ALL
        </button>

        <!-- Cookie Preferences Section -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-weight: bold; color: ${config.colors.text}; margin: 0 0 16px 0;">
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
                  <span id="cookie-func-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#ccc'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-func-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%;"></span>
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
                  <span id="cookie-performance-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#ccc'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-performance-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%;"></span>
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
                  <span id="cookie-targeting-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#ccc'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-targeting-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%;"></span>
                </label>
              </div>
            </div>

            <!-- Social Media -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border: 1px solid ${borderColor}; border-radius: 8px;">
              <div style="display: flex; align-items: center; flex: 1; min-width: 0;">
                <span style="margin-right: 12px; color: ${secondaryTextColor}; font-size: 20px; flex-shrink: 0;">›</span>
                <div style="min-width: 0; flex: 1; font-weight: 500; color: ${config.colors.text};">Social Media Cookies</div>
              </div>
              <div style="flex-shrink: 0; margin-left: 12px;">
                <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
                  <input type="checkbox" id="cookie-social-toggle-modal" style="opacity: 0; width: 0; height: 0;" />
                  <span id="cookie-social-toggle-slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: ${config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#ccc'}; transition: .4s; border-radius: 24px;"></span>
                  <span id="cookie-social-toggle-thumb" style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: ${config.colors.background === '#ffffff' || config.colors.background === '#fff' || config.colors.background === 'white' ? '#ffffff' : config.colors.buttonText}; transition: .4s; border-radius: 50%;"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer with buttons -->
      <div style="padding: 24px 24px 0 24px; border-top: 1px solid ${borderColor}; background-color: ${cardBackgroundColor};">
        <!-- Confirm Button -->
        <button id="cookie-confirm-choices-btn" style="width: 100%; height: 48px; margin-bottom: 16px; font-size: 16px; font-weight: 500; border-radius: 8px; border: none; cursor: pointer; background-color: ${config.colors.button}; color: ${config.colors.buttonText};">
          CONFIRM MY CHOICES
        </button>

        <!-- Powered by -->
        <div style="text-align: center;">
          <p style="font-size: 12px; color: ${secondaryTextColor}; margin: 0;">
            Powered by <a href="https://cookie-banner.ca/" target="_blank" rel="noopener noreferrer" style="font-weight: 600; color: ${config.colors.link}; text-decoration: none;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">cookie-banner.ca</a>
          </p>
        </div>
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

  // Return all components separately
  return mainBanner + preferencesModal + floatingButton + inlineFooterLink
}

export const generateBannerCSS = (config: BannerConfig) => {
  return `/* Material Symbols CSS - font file loaded asynchronously via <link> */
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

/* Floating button - hidden by default with strong CSS */
#cookie-settings-float {
  display: none !important; /* This is critical! */
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
}

#cookie-settings-float.show {
  display: flex !important; /* Better for centering content */
  align-items: center !important;
  justify-content: center !important;
}

#cookie-settings-float:hover {
  opacity: 1 !important;
  transform: translateY(-2px);
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

export const generateBannerJS = (config: BannerConfig) => {
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

function trackConsentEvent(action) {
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

function trackConsentEvent(action) {
  console.log('GA4 consent event not tracked (not configured):', action);
}`

  const acceptedIconUrl = config.branding?.footerLink?.icons?.accepted || DEFAULT_ACCEPTED_ICON
  const rejectedIconUrl = config.branding?.footerLink?.icons?.rejected || DEFAULT_REJECTED_ICON
  const iconStyle = 'width: 20px; height: 20px; display: inline-flex;'
  const acceptedIconMarkup = acceptedIconUrl
    ? `<img src="${escapeHtml(acceptedIconUrl)}" alt="" style="${iconStyle}" />`
    : `<span class="material-symbols-outlined" style="font-size: 20px; line-height: 1; display: inline-flex;">cookie</span>`
  const effectiveRejectedIconUrl = rejectedIconUrl || acceptedIconUrl
  const rejectedIconMarkup = effectiveRejectedIconUrl
    ? `<img src="${escapeHtml(effectiveRejectedIconUrl)}" alt="" style="${iconStyle}" />`
    : `<span class="material-symbols-outlined" style="font-size: 20px; line-height: 1; display: inline-flex;">cookie_off</span>`

  const cookieAcceptedIconSerialized = JSON.stringify(acceptedIconMarkup)
  const cookieRejectedIconSerialized = JSON.stringify(rejectedIconMarkup)

  return `(function() {
'use strict';

var COOKIE_NAME = 'cookie_consent';
var COOKIE_EXPIRY = ${Number(config.behavior.cookieExpiry) || 182};
var USE_LAZY_LOADER = ${useLazyLoader};
var USE_IDLE_CALLBACK = ${useIdleCallback};

// Load Material Symbols font for cookie icons (if not already loaded)
(function loadMaterialSymbolsFont() {
  if (document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
    return; // Font already loaded
  }
  
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cookie,cookie_off&display=swap';
  document.head.appendChild(link);
})();

${ga4Integration}

initGA4Default();

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
  return ${JSON.stringify(config.language)};
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
  showFloatingButton();
  updateFloatingButtonIcon(consent);
  if (consent.analytics) {
    initGA4();
  }
}

function showFloatingButton() {
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    floatBtn.classList.add('show');
    floatBtn.style.setProperty('display', 'flex', 'important');
    floatBtn.onclick = function() {
      var banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.style.display = 'block';
      }
    };
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
  // Security: Escape text and URL to prevent XSS when injecting via innerHTML
  var text = ${JSON.stringify(escapeHtml(config.branding?.footerLink?.text || 'Cookie Settings'))};
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
  
  // Set up banner button handlers ALWAYS (needed even when consent exists, for when user reopens banner)
  // Use addEventListener to prevent handlers from being overwritten
  if (acceptBtn && !acceptBtn.dataset.handlerAttached) {
    acceptBtn.addEventListener('click', function() {
      saveConsent({ essential: true, functionality: true, analytics: true, marketing: true });
      initGA4(); // Initialize GA4
      trackConsentEvent('accept'); // Track consent event
      banner.style.display = 'none';
    });
    acceptBtn.dataset.handlerAttached = 'true';
  }

  if (rejectBtn && !rejectBtn.dataset.handlerAttached) {
    rejectBtn.addEventListener('click', function() {
      saveConsent({ essential: true, functionality: false, analytics: false, marketing: false });
      trackConsentEvent('reject'); // Track consent event (but don't init GA4)
      banner.style.display = 'none';
    });
    rejectBtn.dataset.handlerAttached = 'true';
  }

  if (closeBtn && !closeBtn.dataset.handlerAttached) {
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
      }
    });
    prefsBtn.dataset.handlerAttached = 'true';
  }
  ` : ''}
  
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
      var consent = { essential: true, functionality: true, analytics: true, marketing: true };
      saveConsent(consent);

      // Update modal toggles to show all ON before closing
      loadConsentIntoModal(consent);

      banner.style.display = 'none';
      modal.style.display = 'none';
    });
    acceptAllBtn.dataset.handlerAttached = 'true';
  }

  if (confirmChoicesBtn && !confirmChoicesBtn.dataset.handlerAttached) {
    confirmChoicesBtn.addEventListener('click', function() {
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
  
  // Make toggle switches functional
  function setupToggleSwitches() {
    var buttonColor = ${JSON.stringify(config.colors.button)};
    var inactiveColor = ${JSON.stringify(config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#ccc')};
    
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
          slider.style.backgroundColor = buttonColor;
          thumb.style.transform = 'translateX(20px)';
        } else {
          slider.style.backgroundColor = inactiveColor;
          thumb.style.transform = 'translateX(0)';
        }
        
        // Add change event listener
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
          
          // Add click event listener to slider for better UX
          slider.addEventListener('click', function() {
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change'));
          });
          
          input.dataset.listenerAttached = 'true';
        }
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
    
    // Don't show banner, but all handlers are already set up above
    return;
  }
  
  // No existing consent - show banner
  ${config.behavior.autoShow ? `
  banner.style.display = 'block';
  trackConsentEvent('impression'); // Track banner impression
  
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

export const generateConsentInitScript = () => {
  return `<script>
// CRITICAL: Initialize consent mode BEFORE any trackers load
// This MUST be synchronous and run immediately to block trackers
// Place this script FIRST in your <head> section, before any other scripts
(function() {
  'use strict';
  
  // Initialize dataLayer immediately (for GTM/GA4)
  window.dataLayer = window.dataLayer || [];
  
  // Initialize gtag function immediately
  function gtag(){dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  
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

