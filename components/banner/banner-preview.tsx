'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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

  const handleAccept = () => {
    setIsVisible(false)
  }

  const handleReject = () => {
    setIsVisible(false)
  }

  const handlePreferences = () => {
    setShowPreferences(!showPreferences)
  }

  const handleClose = () => {
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
    switch (config.position) {
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
      borderRadius: `${config.layout.borderRadius}px`,
      padding: `${config.layout.padding}px`,
      margin: `${config.layout.margin}px`,
    }

    // Width handling
    if (config.layout.width === 'custom' && config.layout.customWidth) {
      baseStyles.width = `${config.layout.customWidth}px`
    } else if (config.layout.width === 'container') {
      baseStyles.maxWidth = `${config.layout.maxWidth || 1200}px`
      baseStyles.margin = '0 auto'
    }

    // Shadow handling
    switch (config.layout.shadow) {
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
    switch (config.layout.animation) {
      case 'fade':
        return 'animate-fade-in'
      case 'slide':
        return 'animate-slide-in'
      case 'bounce':
        return 'animate-bounce-in'
      case 'pulse':
        return 'animate-pulse'
      default:
        return ''
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
            backgroundColor: config.colors.background,
            color: config.colors.text,
            ...getLayoutStyles(),
          }}
        >
          <div className="relative">
            {(config.position.includes('floating') || config.position.includes('modal')) && (
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                style={{ color: config.colors.text }}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className={`flex items-start ${
              config.branding.logo.position === 'center' ? 'flex-col' : 'flex-row'
            }`}>
              {config.branding.logo.position === 'left' && config.branding.logo.enabled && config.branding.logo.url && (
                <div className="flex items-center mr-3">
                  <img
                    src={config.branding.logo.url}
                    alt="Logo"
                    className="object-contain"
                    style={{
                      maxWidth: `${config.branding.logo.maxWidth}px`,
                      maxHeight: `${config.branding.logo.maxHeight}px`,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              
              <div className="flex-1">
                {config.branding.logo.position === 'center' && config.branding.logo.enabled && config.branding.logo.url && (
                  <div className="flex items-center justify-center mb-2">
                    <img
                      src={config.branding.logo.url}
                      alt="Logo"
                      className="object-contain"
                      style={{
                        maxWidth: `${config.branding.logo.maxWidth}px`,
                        maxHeight: `${config.branding.logo.maxHeight}px`,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                
                <h3 className="font-semibold text-lg mb-2">
                  {config.text.title}
                </h3>
                
                <p className="text-sm mb-4 leading-relaxed">
                  {config.text.message}
                  {config.branding.privacyPolicy.url && (
                    <>
                      {' '}
                      <a
                        href={config.branding.privacyPolicy.url}
                        target={config.branding.privacyPolicy.openInNewTab ? '_blank' : '_self'}
                        rel={config.branding.privacyPolicy.openInNewTab ? 'noopener noreferrer' : ''}
                        className="underline hover:no-underline"
                        style={{ color: config.colors.link }}
                      >
                        {config.branding.privacyPolicy.text}
                      </a>
                    </>
                  )}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    style={{
                      backgroundColor: config.colors.button,
                      color: config.colors.buttonText,
                    }}
                    className="hover:opacity-90"
                  >
                    {config.text.acceptButton}
                  </Button>
                  
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: config.colors.button,
                      color: config.colors.button,
                    }}
                    className="hover:bg-opacity-10"
                  >
                    {config.text.rejectButton}
                  </Button>

                  {config.behavior.showPreferences && (
                    <Button
                      onClick={handlePreferences}
                      variant="ghost"
                      size="sm"
                      style={{ color: config.colors.link }}
                      className="hover:bg-opacity-10"
                    >
                      {config.text.preferencesButton}
                    </Button>
                  )}
                </div>

                {showPreferences && (
                  <div className="mt-4 p-3 rounded border" style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.2)'
                  }}>
                    <h4 className="font-medium mb-3">Cookie Preferences</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked disabled className="mr-2" />
                          <span className="font-medium">Strictly Necessary</span>
                        </label>
                        <p className="text-xs opacity-75 ml-6">Essential for website functionality and security</p>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" id="functionality-cookies" className="mr-2" />
                          <span className="font-medium">Functionality</span>
                        </label>
                        <p className="text-xs opacity-75 ml-6">Remember your choices and preferences</p>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" id="analytics-cookies" className="mr-2" />
                          <span className="font-medium">Tracking & Performance</span>
                        </label>
                        <p className="text-xs opacity-75 ml-6">Analytics and performance monitoring (Google Analytics, Microsoft Clarity)</p>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" id="marketing-cookies" className="mr-2" />
                          <span className="font-medium">Targeting & Advertising</span>
                        </label>
                        <p className="text-xs opacity-75 ml-6">Personalized ads and marketing (Facebook Pixel, Google Ads)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {config.branding.logo.position === 'right' && config.branding.logo.enabled && config.branding.logo.url && (
                <div className="flex items-center ml-3">
                  <img
                    src={config.branding.logo.url}
                    alt="Logo"
                    className="object-contain"
                    style={{
                      maxWidth: `${config.branding.logo.maxWidth}px`,
                      maxHeight: `${config.branding.logo.maxHeight}px`,
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
      {config.branding.footerLink.enabled && config.branding.footerLink.position === 'floating' && !isVisible && (
        <div
          className="fixed z-40 px-4 py-2 rounded cursor-pointer shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: config.colors.button,
            color: config.colors.buttonText,
            [config.branding.footerLink.floatingPosition === 'bottom-right' ? 'right' : 'left']: '20px',
            bottom: '20px',
            fontSize: '14px',
            fontWeight: 500
          }}
          onClick={() => setIsVisible(true)}
        >
          {config.branding.footerLink.text}
        </div>
      )}

      {/* Preview Controls */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Position: {config.position}</p>
        <p>Theme: {config.theme}</p>
        <p>Auto-show: {config.behavior.autoShow ? 'Yes' : 'No'}</p>
        <p>Cookie expiry: {config.behavior.cookieExpiry} days</p>
        {config.branding.footerLink.enabled && (
          <p className="text-primary font-medium">
            Footer Link: {config.branding.footerLink.position === 'floating' ? '✓ Floating button enabled' : '✓ Inline HTML available'}
          </p>
        )}
      </div>
    </div>
  )
}
