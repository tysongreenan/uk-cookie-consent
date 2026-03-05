'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, ChevronRight } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface BannerConfig {
  branding: {
    logo: {
      enabled: boolean
      url: string
      position: 'left' | 'right' | 'center' | 'hidden'
      maxWidth: number
      maxHeight: number
    }
  }
  text: {
    title: string
    message: string
    acceptButton: string
    rejectButton: string
    preferencesButton: string
  }
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
  }
}

interface PreferencesModalProps {
  config: BannerConfig
  isVisible: boolean
  onClose: () => void
  onAcceptAll: () => void
  onConfirmChoices: (preferences: {
    strictlyNecessary: boolean
    functionality: boolean
    trackingPerformance: boolean
    targetingAdvertising: boolean
    socialMedia: boolean
  }) => void
  domain?: string
}

export function PreferencesModal({ 
  config, 
  isVisible, 
  onClose, 
  onAcceptAll, 
  onConfirmChoices,
  domain = 'cookie-banner.ca'
}: PreferencesModalProps) {
  const [cookiePreferences, setCookiePreferences] = useState({
    strictlyNecessary: true, // Always enabled
    functionality: false,
    trackingPerformance: false,
    targetingAdvertising: false,
    socialMedia: false
  })

  const handleToggle = (category: keyof typeof cookiePreferences) => {
    if (category === 'strictlyNecessary') return // Can't disable
    setCookiePreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
          {config.branding.logo.enabled && config.branding.logo.url ? (
            <img
              src={config.branding.logo.url}
              alt="Logo"
              className="h-8 object-contain flex-shrink-0"
              style={{
                maxWidth: `${config.branding.logo.maxWidth}px`,
                maxHeight: `${config.branding.logo.maxHeight}px`,
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <span className="font-semibold text-gray-900">Cookie Settings</span>
          )}
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full max-h-[calc(90vh-80px)]">
          <div className="p-6 pt-4 flex-1 overflow-y-auto">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Privacy Center
            </h2>
            
            {/* Description */}
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.
            </p>

            {/* Accept All Button */}
            <Button
              onClick={onAcceptAll}
              className="w-full mb-6 h-12 text-base font-medium rounded-lg"
              style={{
                backgroundColor: config.colors.button,
                color: config.colors.buttonText,
              }}
            >
              ACCEPT ALL
            </Button>

            {/* Cookie Preferences Section */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-4">
                Manage cookie preferences
              </h3>
              
              <div className="space-y-3">
                {/* Strictly Necessary */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center flex-1 min-w-0">
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900">Strictly Necessary Cookies</div>
                      <div className="text-xs text-gray-500 mt-1">Always active</div>
                    </div>
                  </div>
                </div>

                {/* Functionality */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900">Functional Cookies</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <Switch
                      checked={cookiePreferences.functionality}
                      onCheckedChange={() => handleToggle('functionality')}
                    />
                  </div>
                </div>

                {/* Performance */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900">Performance Cookies</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <Switch
                      checked={cookiePreferences.trackingPerformance}
                      onCheckedChange={() => handleToggle('trackingPerformance')}
                    />
                  </div>
                </div>

                {/* Targeting */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900">Targeting Cookies</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <Switch
                      checked={cookiePreferences.targetingAdvertising}
                      onCheckedChange={() => handleToggle('targetingAdvertising')}
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center flex-1 min-w-0">
                    <ChevronRight className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900">Social Media Cookies</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <Switch
                      checked={cookiePreferences.socialMedia}
                      onCheckedChange={() => handleToggle('socialMedia')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <div className="p-6 pt-0 border-t border-gray-100 bg-gray-50">
          {/* Confirm Button */}
          <Button
            onClick={() => onConfirmChoices(cookiePreferences)}
            className="w-full mb-4 h-12 text-base font-medium rounded-lg"
            style={{
              backgroundColor: config.colors.button,
              color: config.colors.buttonText,
            }}
          >
            CONFIRM MY CHOICES
          </Button>

            {/* Powered by */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Powered by{' '}
                <a 
                  href="https://cookie-banner.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  cookie-banner.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
