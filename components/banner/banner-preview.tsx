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
        floatingPosition: config.branding?.footerLink?.floatingPosition || 'bottom-right'
      }
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
      enableAccessibility: config.advanced?.enableAccessibility ?? true,
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

      {/* Floating Cookie Settings Button (Preview) */}
      {safeConfig.branding.footerLink.enabled && safeConfig.branding.footerLink.position === 'floating' && !isVisible && (
        <div
          className="fixed z-40 px-4 py-2 rounded cursor-pointer shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: safeConfig.colors.button,
            color: safeConfig.colors.buttonText,
            [safeConfig.branding.footerLink.floatingPosition === 'bottom-right' ? 'right' : 'left']: '20px',
            bottom: '20px',
            fontSize: '14px',
            fontWeight: 500
          }}
          onClick={() => setIsVisible(true)}
        >
          {safeConfig.branding.footerLink.text}
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
          <p className="text-primary font-medium">
            Footer Link: {safeConfig.branding.footerLink.position === 'floating' ? '✓ Floating button enabled' : '✓ Inline HTML available'}
          </p>
        )}
      </div>
    </div>
  )
}
