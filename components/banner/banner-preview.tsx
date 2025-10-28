'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { PreferencesModal } from '@/components/cookie-consent/preferences-modal'

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
  advanced: {
    googleConsentMode: boolean
    customCSS: string
    customJS: string
  }
}

interface BannerPreviewProps {
  config: BannerConfig
}

// Helper function to generate floating button preview styles
function generateFloatingButtonPreviewStyles(safeConfig: any): React.CSSProperties {
  const floatingStyle = safeConfig.branding?.footerLink?.floatingStyle || {}
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
    backgroundColor = safeConfig.colors?.button || '#3b82f6'
    color = safeConfig.colors?.buttonText || '#ffffff'
  }
  
  return {
    background: backgroundColor,
    color: color,
    border: border,
    padding: padding,
    borderRadius: borderRadius,
    width: width,
    height: height,
    fontSize: sizeProps.fontSize,
    fontWeight: 500,
    textAlign: 'center' as const
  }
}

// Helper function to generate floating button preview content
function generateFloatingButtonPreviewContent(safeConfig: any): React.ReactNode {
  const floatingStyle = safeConfig.branding?.footerLink?.floatingStyle || {}
  const shape = floatingStyle.shape || 'pill'
  const showText = floatingStyle.showText !== false
  const text = safeConfig.branding?.footerLink?.text || 'Cookie Settings'
  const hasLogo = safeConfig.branding?.logo?.enabled && safeConfig.branding?.logo?.url
  
  // Cookie icons (matching the code generator)
  const cookieAcceptedIcon = (
    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25-17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/>
    </svg>
  )
  
  const cookieRejectedIcon = (
    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
      <path d="m815-260-58-58q18-31 29-66.5t14-73.5q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-49-2-90 10t-76 33l-57-57q61-42 137.5-58.5T563-872q-9 45 6 84.5t45 66.5q30 27 71 37t86-5q-31 69 11 118t96 51q8 72-9.5 138T815-260ZM340-360q-25 0-42.5-17.5T280-420q0-25-17.5-42.5T340-480q25 0 42.5 17.5T400-420q0 25-17.5 42.5T340-360ZM819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM480-160q45 0 85.5-12t76.5-33L205-642q-21 36-33 76.5T160-480q0 133 93.5 226.5T480-160Zm-56-264Zm135-137Z"/>
    </svg>
  )
  
  // Check consent state for icon
  const consentState = typeof window !== 'undefined' 
    ? localStorage.getItem('cookie-consent-preview-state') || 'accepted'
    : 'accepted'
  
  const hasAcceptedNonEssential = consentState === 'accepted'
  const cookieIcon = hasAcceptedNonEssential ? cookieAcceptedIcon : cookieRejectedIcon
  
  if (shape === 'circle') {
    // Circle shows only icon/logo
    if (hasLogo) {
      return (
        <img 
          src={safeConfig.branding.logo.url} 
          alt="Logo" 
          style={{ width: '20px', height: '20px', objectFit: 'contain' }} 
        />
      )
    } else {
      return <span>{cookieIcon}</span>
    }
  } else {
    // Pill and square can show text
    if (hasLogo) {
      return (
        <>
          <img 
            src={safeConfig.branding.logo.url} 
            alt="Logo" 
            style={{ width: '16px', height: '16px', objectFit: 'contain', marginRight: '4px' }} 
          />
          {showText && <span>{text}</span>}
        </>
      )
    } else {
      return (
        <>
          <span>{cookieIcon}</span>
          {showText && <span style={{ marginLeft: '4px' }}>{text}</span>}
        </>
      )
    }
  }
}

export function BannerPreview({ config }: BannerPreviewProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showPreferences, setShowPreferences] = useState(false)

  // Ensure config has all required properties with safe defaults
  const safeConfig: BannerConfig = {
    name: config.name || 'Cookie Banner',
    position: config.position || 'bottom',
    theme: config.theme || 'light',
    language: config.language || 'en',
    colors: {
      background: config.colors?.background || '#ffffff',
      text: config.colors?.text || '#000000',
      button: config.colors?.button || '#007bff',
      buttonText: config.colors?.buttonText || '#ffffff',
      link: config.colors?.link || '#007bff'
    },
    text: {
      title: config.text?.title || 'Cookie Consent',
      message: config.text?.message || 'We use cookies to improve your experience.',
      acceptButton: config.text?.acceptButton || 'Accept All',
      rejectButton: config.text?.rejectButton || 'Reject All',
      preferencesButton: config.text?.preferencesButton || 'Preferences'
    },
    behavior: {
      autoShow: config.behavior?.autoShow ?? true,
      dismissOnScroll: config.behavior?.dismissOnScroll ?? false,
      showPreferences: config.behavior?.showPreferences ?? true,
      cookieExpiry: config.behavior?.cookieExpiry || 365
    },
    branding: {
      logo: {
        enabled: config.branding?.logo?.enabled ?? false,
        url: config.branding?.logo?.url || '',
        position: config.branding?.logo?.position || 'left',
        maxWidth: config.branding?.logo?.maxWidth || 100,
        maxHeight: config.branding?.logo?.maxHeight || 50
      },
      privacyPolicy: {
        url: config.branding?.privacyPolicy?.url || '',
        text: config.branding?.privacyPolicy?.text || 'Privacy Policy',
        openInNewTab: config.branding?.privacyPolicy?.openInNewTab ?? true,
        required: config.branding?.privacyPolicy?.required ?? false
      },
      footerLink: {
        enabled: config.branding?.footerLink?.enabled ?? false,
        text: config.branding?.footerLink?.text || 'Cookie Settings',
        position: config.branding?.footerLink?.position || 'floating',
        floatingPosition: config.branding?.footerLink?.floatingPosition || 'bottom-right',
        ...((config as any).branding?.footerLink?.style && { style: (config as any).branding.footerLink.style }),
        ...((config as any).branding?.footerLink?.floatingStyle && { floatingStyle: (config as any).branding.footerLink.floatingStyle }),
        ...((config as any).branding?.footerLink?.inlineStyle && { inlineStyle: (config as any).branding.footerLink.inlineStyle })
      } as any
    },
    layout: {
      animation: config.layout?.animation || 'fade',
      borderRadius: config.layout?.borderRadius || 8,
      padding: config.layout?.padding || 20,
      margin: config.layout?.margin || 0,
      width: config.layout?.width || 'full',
      maxWidth: config.layout?.maxWidth,
      customWidth: config.layout?.customWidth,
      shadow: config.layout?.shadow || 'medium'
    },
    advanced: {
      googleConsentMode: config.advanced?.googleConsentMode ?? false,
      customCSS: config.advanced?.customCSS || '',
      customJS: config.advanced?.customJS || ''
    }
  }

  const handleAccept = () => {
    setIsVisible(false)
  }

  const handleReject = () => {
    setIsVisible(false)
  }

  const handlePreferences = () => {
    setShowPreferences(true)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleAcceptAll = () => {
    setShowPreferences(false)
    setIsVisible(false)
  }

  const handleConfirmChoices = (preferences: {
    strictlyNecessary: boolean
    functionality: boolean
    trackingPerformance: boolean
    targetingAdvertising: boolean
    socialMedia: boolean
  }) => {
    console.log('Cookie preferences confirmed:', preferences)
    
    // Here you would typically:
    // 1. Save the preferences to localStorage or cookies
    // 2. Load/unload scripts based on preferences
    // 3. Update Google Analytics consent mode
    // 4. Trigger any other tracking scripts based on user choices
    
    // For demo purposes, we'll just log the preferences
    if (preferences.functionality) {
      console.log('✅ Functionality cookies enabled')
    } else {
      console.log('❌ Functionality cookies disabled')
    }
    
    if (preferences.trackingPerformance) {
      console.log('✅ Performance/tracking cookies enabled')
    } else {
      console.log('❌ Performance/tracking cookies disabled')
    }
    
    if (preferences.targetingAdvertising || preferences.socialMedia) {
      console.log('✅ Marketing/advertising cookies enabled')
    } else {
      console.log('❌ Marketing/advertising cookies disabled')
    }
    
    setShowPreferences(false)
    setIsVisible(false)
  }

  if (!isVisible) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Banner is hidden</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsVisible(true)}
          className="mt-2"
        >
          Show Preview
        </Button>
      </div>
    )
  }

  const getPositionClasses = () => {
    switch (safeConfig.position) {
      case 'top':
        return 'top-0 left-0 right-0'
      case 'bottom':
        return 'bottom-0 left-0 right-0'
      case 'floating-bottom-right':
        return 'bottom-4 right-4 max-w-sm'
      case 'floating-bottom-left':
        return 'bottom-4 left-4 max-w-sm'
      case 'floating-top-right':
        return 'top-4 right-4 max-w-sm'
      case 'floating-top-left':
        return 'top-4 left-4 max-w-sm'
      case 'modal-center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md'
      case 'modal-bottom':
        return 'bottom-4 left-1/2 transform -translate-x-1/2 max-w-md'
      case 'modal-top':
        return 'top-4 left-1/2 transform -translate-x-1/2 max-w-md'
      case 'slide-in-right':
        return 'top-1/2 right-0 transform -translate-y-1/2 max-w-sm'
      case 'slide-in-left':
        return 'top-1/2 left-0 transform -translate-y-1/2 max-w-sm'
      case 'slide-in-top':
        return 'top-0 left-1/2 transform -translate-x-1/2 max-w-md'
      case 'slide-in-bottom':
        return 'bottom-0 left-1/2 transform -translate-x-1/2 max-w-md'
      default:
        return 'bottom-0 left-0 right-0'
    }
  }

  const getLayoutStyles = () => {
    const baseStyles: any = {
      borderRadius: `${safeConfig.layout.borderRadius}px`,
      padding: `${safeConfig.layout.padding}px`,
      margin: `${safeConfig.layout.margin}px`,
    }

    // Width handling
    if (safeConfig.layout.width === 'custom' && safeConfig.layout.customWidth) {
      baseStyles.width = `${safeConfig.layout.customWidth}px`
    } else if (safeConfig.layout.width === 'container') {
      baseStyles.maxWidth = `${safeConfig.layout.maxWidth || 1200}px`
      baseStyles.margin = '0 auto'
    }

    // Shadow handling
    switch (safeConfig.layout.shadow) {
      case 'small':
        baseStyles.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
        break
      case 'medium':
        baseStyles.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
        break
      case 'large':
        baseStyles.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'
        break
      default:
        baseStyles.boxShadow = 'none'
    }

    return baseStyles
  }

  const getAnimationClasses = () => {
    const animation = safeConfig.layout?.animation || 'fade'
    switch (animation) {
      case 'fade':
        return 'animate-fade-in'
      case 'slide':
        return 'animate-slide-in'
      case 'bounce':
        return 'animate-bounce-in'
      case 'pulse':
        return 'animate-pulse'
      default:
        return 'animate-fade-in'
    }
  }


  return (
    <div className="relative">
      {/* Website Preview Background */}
      <div className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[300px] relative overflow-hidden">
        <div className="bg-white rounded shadow-sm p-4 h-full">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-4/5"></div>
            <div className="h-2 bg-gray-200 rounded w-3/5"></div>
          </div>
        </div>

        {/* Cookie Banner */}
        <div
          className={`absolute ${getPositionClasses()} ${getAnimationClasses()} z-50`}
          style={{
            backgroundColor: safeConfig.colors.background,
            color: safeConfig.colors.text,
            ...getLayoutStyles(),
          }}
        >
          <div className="relative">
            {(safeConfig.position.includes('floating') || safeConfig.position.includes('modal')) && (
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                style={{ color: safeConfig.colors.text }}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className={`flex items-start ${
              safeConfig.branding.logo.position === 'center' ? 'flex-col' : 'flex-row'
            }`}>
              {safeConfig.branding.logo.position === 'left' && safeConfig.branding.logo.enabled && safeConfig.branding.logo.url && (
                <div className="flex items-center mr-3">
                  <img
                    src={safeConfig.branding.logo.url}
                    alt="Logo"
                    className="object-contain"
                    style={{
                      maxWidth: `${safeConfig.branding.logo.maxWidth}px`,
                      maxHeight: `${safeConfig.branding.logo.maxHeight}px`,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1">
                {safeConfig.branding.logo.position === 'center' && safeConfig.branding.logo.enabled && safeConfig.branding.logo.url && (
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={safeConfig.branding.logo.url}
                      alt="Logo"
                      className="object-contain"
                      style={{
                        maxWidth: `${safeConfig.branding.logo.maxWidth}px`,
                        maxHeight: `${safeConfig.branding.logo.maxHeight}px`,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                
                <h3 className="font-semibold text-lg mb-2">
                  {safeConfig.text.title}
                </h3>
                
                <p className="text-sm mb-4 leading-relaxed">
                  {safeConfig.text.message}
                  {safeConfig.branding.privacyPolicy.url && (
                    <>
                      {' '}
                      <a
                        href={safeConfig.branding.privacyPolicy.url}
                        target={safeConfig.branding.privacyPolicy.openInNewTab ? '_blank' : '_self'}
                        rel={safeConfig.branding.privacyPolicy.openInNewTab ? 'noopener noreferrer' : ''}
                        className="underline hover:no-underline"
                        style={{ color: safeConfig.colors.link }}
                      >
                        {safeConfig.branding.privacyPolicy.text}
                      </a>
                    </>
                  )}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    style={{
                      backgroundColor: safeConfig.colors.button,
                      color: safeConfig.colors.buttonText,
                    }}
                    className="hover:opacity-90"
                  >
                    {safeConfig.text.acceptButton}
                  </Button>
                  
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: safeConfig.colors.button,
                      color: safeConfig.colors.button,
                    }}
                    className="hover:bg-opacity-10"
                  >
                    {safeConfig.text.rejectButton}
                  </Button>

                  {safeConfig.behavior.showPreferences && (
                    <Button
                      onClick={handlePreferences}
                      variant="ghost"
                      size="sm"
                      style={{ color: safeConfig.colors.link }}
                      className="hover:bg-opacity-10"
                    >
                      {safeConfig.text.preferencesButton}
                    </Button>
                  )}
                </div>

              </div>

              {safeConfig.branding.logo.position === 'right' && safeConfig.branding.logo.enabled && safeConfig.branding.logo.url && (
                <div className="flex items-center ml-3">
                  <img
                    src={safeConfig.branding.logo.url}
                    alt="Logo"
                    className="object-contain"
                    style={{
                      maxWidth: `${safeConfig.branding.logo.maxWidth}px`,
                      maxHeight: `${safeConfig.branding.logo.maxHeight}px`,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Cookie Settings Button (Preview) */}
      {safeConfig.branding.footerLink.enabled && ((safeConfig as any).branding.footerLink.style === 'floating' || (safeConfig as any).branding.footerLink.style === 'both') && !isVisible && (
        <div
          className="fixed z-40 cursor-pointer shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5 flex items-center justify-center"
          style={{
            ...generateFloatingButtonPreviewStyles(safeConfig),
            [safeConfig.branding.footerLink.floatingPosition === 'bottom-right' ? 'right' : 'left']: '20px',
            bottom: '20px',
          }}
          onClick={() => setIsVisible(true)}
        >
          {generateFloatingButtonPreviewContent(safeConfig)}
        </div>
      )}

      {/* Preferences Modal */}
      <PreferencesModal
        config={config}
        isVisible={showPreferences}
        onClose={() => setShowPreferences(false)}
        onAcceptAll={handleAcceptAll}
        onConfirmChoices={handleConfirmChoices}
        domain="cookie-banner.ca"
      />

      {/* Preview Controls */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Position: {safeConfig.position}</p>
        <p>Theme: {safeConfig.theme}</p>
        <p>Auto-show: {safeConfig.behavior.autoShow ? 'Yes' : 'No'}</p>
        <p>Cookie expiry: {safeConfig.behavior.cookieExpiry} days</p>
        {safeConfig.branding.footerLink.enabled && (
          <div className="text-primary font-medium space-y-1">
            <p>Cookie Settings: ✓ Enabled</p>
            {(safeConfig as any).branding.footerLink.style === 'floating' && (
              <p className="text-xs">
                Floating: {(safeConfig as any).branding.footerLink.floatingStyle?.shape || 'pill'} ({(safeConfig as any).branding.footerLink.floatingStyle?.size || 'small'})
              </p>
            )}
            {(safeConfig as any).branding.footerLink.style === 'inline' && (
              <p className="text-xs">
                Inline: {(safeConfig as any).branding.footerLink.inlineStyle?.linkType || 'plain'} link
              </p>
            )}
            {(safeConfig as any).branding.footerLink.style === 'both' && (
              <p className="text-xs">
                Both: Floating + Inline options
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
