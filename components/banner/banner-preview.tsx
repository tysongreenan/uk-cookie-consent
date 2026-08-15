'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { PreferencesModal } from '@/components/cookie-consent/preferences-modal'

interface BannerConfig {
  name: string
  position: 'top' | 'bottom' | 'floating-bottom-right' | 'floating-bottom-left' | 'floating-top-right' | 'floating-top-left' | 'modal-center' | 'modal-bottom' | 'modal-top' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom'
  theme: 'light' | 'dark' | 'custom'
  language: 'en' | 'fr' | 'es' | 'de' | 'pt' | 'ja' | 'zh' | 'ko' | 'ar' | 'hi' | 'nl' | 'sv' | 'nb' | 'da' | 'it' | 'fi' | 'auto'
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
    rejectButton?: string
    rejectButtonText?: string
  }
  fontFamily?: string
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
    buttonLayout?: 'standard' | 'soft-consent' | 'accept-only'
    showRejectButton?: boolean
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

type PreviewView = 'banner' | 'preferences' | 'floating'

interface BannerPreviewProps {
  config: BannerConfig
  /** Forces a specific preview view. When provided, overrides internal banner/preferences toggle state. */
  view?: PreviewView
  /** Called when the user interacts with the preview in a way that should switch the parent's view chip (e.g., clicking the floating button to open preferences). */
  onViewChange?: (view: PreviewView) => void
  /**
   * When true, fills the parent frame (absolute inset-0) and skips the nested
   * gray "fake website" card chrome. Use inside gallery / browser frames.
   */
  fillParent?: boolean
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
  // iconStyle: 'cookie' (always cookie icon), 'logo' (always logo, falls back to cookie when no logo), 'auto' (logo if available else cookie)
  const iconStyle: 'cookie' | 'logo' | 'auto' = floatingStyle.iconStyle || 'auto'

  const cookieAcceptedIcon = (
    <span className="material-symbols-outlined" style={{fontSize: '20px'}}>cookie</span>
  )
  const cookieRejectedIcon = (
    <span className="material-symbols-outlined" style={{fontSize: '20px'}}>cookie_off</span>
  )

  const consentState = typeof window !== 'undefined'
    ? localStorage.getItem('cookie-consent-preview-state') || 'accepted'
    : 'accepted'
  const cookieIcon = consentState === 'accepted' ? cookieAcceptedIcon : cookieRejectedIcon

  const logoNode = hasLogo ? (
    <img
      src={safeConfig.branding.logo.url}
      alt="Logo"
      style={{ width: '16px', height: '16px', objectFit: 'contain' }}
    />
  ) : null

  // Decide which icon node to render based on iconStyle preference
  const preferLogo = iconStyle === 'logo' || (iconStyle === 'auto' && hasLogo)
  const iconNode = preferLogo && logoNode ? logoNode : cookieIcon

  if (shape === 'circle' || !showText) {
    return <span style={{ display: 'inline-flex', alignItems: 'center' }}>{iconNode}</span>
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {iconNode}
      <span>{text}</span>
    </span>
  )
}

export function BannerPreview({ config, view, onViewChange, fillParent = false }: BannerPreviewProps) {
  const [internalIsVisible, setInternalIsVisible] = useState(true)
  const [internalShowPreferences, setInternalShowPreferences] = useState(false)

  // When a view prop is supplied, derive state from it; otherwise let user interactions drive it.
  const isVisible = view === 'floating' ? false : view === 'preferences' ? true : internalIsVisible
  const showPreferences = view === 'preferences' ? true : view === 'floating' ? false : internalShowPreferences
  const setIsVisible = setInternalIsVisible
  const setShowPreferences = setInternalShowPreferences

  // Load Material Symbols CSS
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cookie,cookie_off'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.textContent = `
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
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

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
      link: config.colors?.link || '#007bff',
      rejectButton: (config.colors as any)?.rejectButton,
      rejectButtonText: (config.colors as any)?.rejectButtonText
    },
    fontFamily: (config as any)?.fontFamily,
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
      cookieExpiry: config.behavior?.cookieExpiry || 365,
      buttonLayout: config.behavior?.buttonLayout || 'standard',
      showRejectButton: config.behavior?.showRejectButton ?? true // Default true for backward compatibility
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
    // When forced to floating view, show the floating button centered in the preview frame.
    if (view === 'floating') {
      const footerEnabled = safeConfig.branding.footerLink.enabled
      const floatingActive = (safeConfig as any).branding.footerLink.style === 'floating' || (safeConfig as any).branding.footerLink.style === 'both'
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          {footerEnabled && floatingActive ? (
            <>
              <div
                className="cursor-pointer shadow-lg transition-transform hover:scale-105 flex items-center justify-center"
                style={generateFloatingButtonPreviewStyles(safeConfig)}
                onClick={() => {
                  // Switch the parent preview chip to 'preferences' so the user lands on the modal view
                  if (onViewChange) onViewChange('preferences')
                  else setShowPreferences(true)
                }}
                title="Click to reopen cookie preferences"
              >
                {generateFloatingButtonPreviewContent(safeConfig)}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Click to reopen preferences</p>
            </>
          ) : (
            <div className="text-sm text-muted-foreground max-w-xs">
              <p className="font-medium text-foreground mb-1">Floating button is disabled</p>
              <p>Enable a Display Style on the Cookie Settings tab to preview the button here.</p>
            </div>
          )}
        </div>
      )
    }
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

  // When forced into preferences view, render the modal full-frame with no banner backdrop
  // or summary controls — gives the user a clean, scrollable view of the entire modal.
  if (view === 'preferences') {
    return (
      <PreferencesModal
        config={config}
        isVisible
        onClose={() => { /* no-op in forced view */ }}
        onAcceptAll={handleAcceptAll}
        onConfirmChoices={handleConfirmChoices}
        domain="cookie-banner.ca"
        previewMode
      />
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
    const baseStyles: CSSProperties = {
      borderRadius: `${safeConfig.layout.borderRadius}px`,
      padding: `${safeConfig.layout.padding}px`,
      margin: `${safeConfig.layout.margin}px`,
      boxSizing: 'border-box',
    }

    // Match production: container/custom width only for full-width bars.
    // Applying max-width: 1200px to floating cards overrides the card size.
    const isFullWidthBar =
      safeConfig.position === 'top' || safeConfig.position === 'bottom'

    if (isFullWidthBar) {
      if (safeConfig.layout.width === 'custom' && safeConfig.layout.customWidth) {
        baseStyles.width = `${safeConfig.layout.customWidth}px`
      } else if (safeConfig.layout.width === 'container') {
        baseStyles.maxWidth = `${safeConfig.layout.maxWidth || 1200}px`
        baseStyles.margin = '0 auto'
      }
    } else if (safeConfig.layout.width === 'custom' && safeConfig.layout.customWidth) {
      baseStyles.maxWidth = `${safeConfig.layout.customWidth}px`
      baseStyles.width = '100%'
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


  const bannerPanel = (
        <div
          className={`absolute ${getPositionClasses()} ${getAnimationClasses()} z-50`}
          style={{
            backgroundColor: safeConfig.colors.background,
            color: safeConfig.colors.text,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 2px 4px rgba(15,23,42,0.04), 0 12px 28px -6px rgba(15,23,42,0.14)',
            ...(safeConfig.fontFamily ? { fontFamily: `"${safeConfig.fontFamily}", sans-serif` } : {}),
            ...getLayoutStyles(),
          }}
        >
          <div className="relative min-w-0 box-border" style={{ paddingRight: 36 }}>
            {/* Mirror production: compact close control that does not cover copy */}
            <button
              onClick={handleClose}
              aria-label="Close"
              type="button"
              className="absolute flex items-center justify-center rounded-lg"
              style={{
                top: -2,
                right: -4,
                width: 36,
                height: 36,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: safeConfig.colors.text,
                fontSize: 22,
                lineHeight: 1,
                opacity: 0.55,
                zIndex: 2,
              }}
            >
              ×
            </button>

            {(() => {
              const isBar =
                safeConfig.position === 'top' || safeConfig.position === 'bottom'
              const logoLeft =
                safeConfig.branding.logo.position === 'left' &&
                safeConfig.branding.logo.enabled &&
                safeConfig.branding.logo.url
              const logoRight =
                safeConfig.branding.logo.position === 'right' &&
                safeConfig.branding.logo.enabled &&
                safeConfig.branding.logo.url
              const logoCenter =
                safeConfig.branding.logo.position === 'center' &&
                safeConfig.branding.logo.enabled &&
                safeConfig.branding.logo.url

              const logoEl = (side: 'left' | 'right' | 'center') => {
                const show =
                  side === 'left' ? logoLeft : side === 'right' ? logoRight : logoCenter
                if (!show) return null
                return (
                  <div
                    className={`flex items-center shrink-0 ${
                      side === 'center' ? 'justify-center mb-2' : ''
                    }`}
                  >
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
                )
              }

              const actions = (
                <div
                  className={`flex flex-wrap gap-2 items-center shrink-0 ${
                    isBar ? 'sm:ml-auto' : 'w-full'
                  }`}
                >
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    style={{
                      backgroundColor: safeConfig.colors.button,
                      color: safeConfig.colors.buttonText,
                      minHeight: 42,
                    }}
                    className={`hover:opacity-90 ${isBar ? '' : 'flex-1'}`}
                  >
                    {safeConfig.text.acceptButton}
                  </Button>

                  {safeConfig.behavior.showRejectButton !== false && (
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      size="sm"
                      style={{
                        backgroundColor: safeConfig.colors.rejectButton || 'transparent',
                        borderColor:
                          safeConfig.colors.rejectButtonText || safeConfig.colors.text,
                        color:
                          safeConfig.colors.rejectButtonText || safeConfig.colors.text,
                        minHeight: 42,
                      }}
                      className={`hover:bg-opacity-10 ${isBar ? '' : 'flex-1'}`}
                    >
                      {safeConfig.text.rejectButton}
                    </Button>
                  )}

                  {safeConfig.behavior.showPreferences && (
                    <Button
                      onClick={handlePreferences}
                      variant="ghost"
                      size="sm"
                      style={{ color: safeConfig.colors.link, minHeight: 40 }}
                      className="hover:bg-opacity-10"
                    >
                      {safeConfig.text.preferencesButton}
                    </Button>
                  )}
                </div>
              )

              const copy = (
                <div className={`min-w-0 max-w-full h-auto ${isBar ? 'flex-1 basis-auto min-w-[min(100%,220px)]' : 'flex-1 basis-auto'}`}>
                  {logoEl('center')}
                  {safeConfig.text.title?.trim() ? (
                    <h3
                      className="font-semibold text-base mb-1 break-words"
                      style={{ color: safeConfig.colors.text, whiteSpace: 'normal' }}
                    >
                      {safeConfig.text.title}
                    </h3>
                  ) : null}
                  <p
                    className={`text-sm leading-relaxed break-words ${isBar ? '' : 'mb-3.5'}`}
                    style={{ whiteSpace: 'normal', opacity: 0.92 }}
                  >
                    {safeConfig.text.message}
                    {safeConfig.branding.privacyPolicy.url && (
                      <>
                        {' '}
                        <a
                          href={safeConfig.branding.privacyPolicy.url}
                          target={
                            safeConfig.branding.privacyPolicy.openInNewTab ? '_blank' : '_self'
                          }
                          rel={
                            safeConfig.branding.privacyPolicy.openInNewTab
                              ? 'noopener noreferrer'
                              : ''
                          }
                          className="underline hover:no-underline"
                          style={{ color: safeConfig.colors.link }}
                        >
                          {safeConfig.branding.privacyPolicy.text}
                        </a>
                      </>
                    )}
                  </p>
                  {!isBar && actions}
                </div>
              )

              return (
                <div
                  className={`flex min-w-0 h-auto gap-4 ${
                    isBar
                      ? 'flex-wrap items-center justify-start gap-x-6 gap-y-3'
                      : 'items-start justify-start flex-nowrap'
                  }`}
                >
                  {logoEl('left')}
                  {copy}
                  {isBar && actions}
                  {logoEl('right')}
                </div>
              )
            })()}
          </div>
        </div>
  )

  const floatingPreview =
    safeConfig.branding.footerLink.enabled &&
    ((safeConfig as any).branding.footerLink.style === 'floating' ||
      (safeConfig as any).branding.footerLink.style === 'both') &&
    !isVisible ? (
      view === 'floating' || fillParent ? (
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-40">
          <div
            className="cursor-pointer shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5 flex items-center justify-center pointer-events-auto"
            style={generateFloatingButtonPreviewStyles(safeConfig)}
            onClick={() => setIsVisible(true)}
          >
            {generateFloatingButtonPreviewContent(safeConfig)}
          </div>
        </div>
      ) : (
        <div
          className="absolute z-20 cursor-pointer shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5 flex items-center justify-center pointer-events-auto"
          style={{
            ...generateFloatingButtonPreviewStyles(safeConfig),
            [safeConfig.branding.footerLink.floatingPosition === 'bottom-right'
              ? 'right'
              : 'left']: '20px',
            bottom: '20px',
          }}
          onClick={() => setIsVisible(true)}
        >
          {generateFloatingButtonPreviewContent(safeConfig)}
        </div>
      )
    ) : null

  const preferences = (
    <PreferencesModal
      config={config}
      isVisible={showPreferences}
      onClose={() => setShowPreferences(false)}
      onAcceptAll={handleAcceptAll}
      onConfirmChoices={handleConfirmChoices}
      domain="cookie-banner.ca"
      previewMode
    />
  )

  // Gallery / framed embed: fill parent, no nested chrome or meta dump
  if (fillParent) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-slate-50 transform-gpu">
        <div className="pointer-events-none p-6 opacity-50">
          <div className="mb-3 h-3 w-1/3 rounded bg-slate-300/80" />
          <div className="mb-2 h-2.5 w-full rounded bg-slate-200" />
          <div className="mb-2 h-2.5 w-5/6 rounded bg-slate-200" />
          <div className="mb-6 h-2.5 w-2/3 rounded bg-slate-200" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 rounded-lg bg-white/80 shadow-sm" />
            <div className="h-20 rounded-lg bg-white/80 shadow-sm" />
          </div>
        </div>
        {isVisible && bannerPanel}
        {floatingPreview}
        {preferences}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Website Preview Background */}
      <div className="bg-gray-100 rounded-lg p-4 mb-4 min-h-[300px] relative overflow-hidden transform-gpu">
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

        {isVisible && bannerPanel}
        {floatingPreview}
        {preferences}
      </div>

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
                Floating:{' '}
                {(safeConfig as any).branding.footerLink.floatingStyle?.shape || 'pill'} (
                {(safeConfig as any).branding.footerLink.floatingStyle?.size || 'small'})
              </p>
            )}
            {(safeConfig as any).branding.footerLink.style === 'inline' && (
              <p className="text-xs">
                Inline: {(safeConfig as any).branding.footerLink.inlineStyle?.linkType || 'plain'}{' '}
                link
              </p>
            )}
            {(safeConfig as any).branding.footerLink.style === 'both' && (
              <p className="text-xs">Both: Floating + Inline options</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
