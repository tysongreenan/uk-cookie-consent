'use client'

import { useState, useEffect } from 'react'
import { BannerPreview } from '@/components/banner/banner-preview'

const bannerConfigs = [
  {
    id: 1,
    name: 'Tech Startup',
    config: {
      name: 'Tech Startup Banner',
      position: 'bottom' as const,
      theme: 'light' as const,
      language: 'en' as const,
      colors: {
        background: '#FFFFFF',
        text: '#1F2937',
        button: '#3B82F6',
        buttonText: '#FFFFFF',
        link: '#3B82F6'
      },
      text: {
        title: 'We use cookies to enhance your experience',
        message: 'This website uses cookies to improve your browsing experience and provide personalized content.',
        acceptButton: 'Accept All',
        rejectButton: 'Reject',
        preferencesButton: 'Preferences'
      },
      behavior: {
        autoShow: true,
        dismissOnScroll: false,
        showPreferences: true,
        cookieExpiry: 365
      },
      branding: {
        logo: {
          enabled: false,
          url: '',
          position: 'left' as const,
          maxWidth: 100,
          maxHeight: 50
        },
        privacyPolicy: {
          url: '',
          text: 'Privacy Policy',
          openInNewTab: true,
          required: false
        },
        footerLink: {
          enabled: false,
          text: 'Cookie Settings',
          position: 'floating' as const,
          floatingPosition: 'bottom-right' as const
        }
      },
      layout: {
        width: 'container' as const,
        maxWidth: 1200,
        borderRadius: 8,
        padding: 16,
        margin: 0,
        shadow: 'medium' as const,
        animation: 'fade' as const
      },
      advanced: {
        googleConsentMode: false,
        customCSS: '',
        customJS: ''
      }
    }
  },
  {
    id: 2,
    name: 'E-commerce Store',
    config: {
      name: 'E-commerce Banner',
      position: 'bottom' as const,
      theme: 'dark' as const,
      language: 'en' as const,
      colors: {
        background: '#1F2937',
        text: '#FFFFFF',
        button: '#10B981',
        buttonText: '#FFFFFF',
        link: '#10B981'
      },
      text: {
        title: 'Cookie Preferences',
        message: 'We use cookies to track your shopping preferences and show you relevant ads.',
        acceptButton: 'Accept All',
        rejectButton: 'Decline',
        preferencesButton: 'Customize'
      },
      behavior: {
        autoShow: true,
        dismissOnScroll: false,
        showPreferences: true,
        cookieExpiry: 365
      },
      branding: {
        logo: {
          enabled: false,
          url: '',
          position: 'left' as const,
          maxWidth: 100,
          maxHeight: 50
        },
        privacyPolicy: {
          url: '',
          text: 'Privacy Policy',
          openInNewTab: true,
          required: false
        },
        footerLink: {
          enabled: false,
          text: 'Cookie Settings',
          position: 'floating' as const,
          floatingPosition: 'bottom-right' as const
        }
      },
      layout: {
        width: 'container' as const,
        maxWidth: 1200,
        borderRadius: 12,
        padding: 16,
        margin: 0,
        shadow: 'medium' as const,
        animation: 'fade' as const
      },
      advanced: {
        googleConsentMode: false,
        customCSS: '',
        customJS: ''
      }
    }
  },
  {
    id: 3,
    name: 'Healthcare Site',
    config: {
      name: 'Healthcare Banner',
      position: 'top' as const,
      theme: 'light' as const,
      language: 'en' as const,
      colors: {
        background: '#FEF2F2',
        text: '#1F2937',
        button: '#DC2626',
        buttonText: '#FFFFFF',
        link: '#DC2626'
      },
      text: {
        title: 'Privacy Notice',
        message: 'This site uses essential cookies for security and functionality. Analytics cookies help us improve our services.',
        acceptButton: 'Accept',
        rejectButton: 'Essential Only',
        preferencesButton: 'Settings'
      },
      behavior: {
        autoShow: true,
        dismissOnScroll: false,
        showPreferences: true,
        cookieExpiry: 365
      },
      branding: {
        logo: {
          enabled: false,
          url: '',
          position: 'left' as const,
          maxWidth: 100,
          maxHeight: 50
        },
        privacyPolicy: {
          url: '',
          text: 'Privacy Policy',
          openInNewTab: true,
          required: false
        },
        footerLink: {
          enabled: false,
          text: 'Cookie Settings',
          position: 'floating' as const,
          floatingPosition: 'bottom-right' as const
        }
      },
      layout: {
        width: 'container' as const,
        maxWidth: 1200,
        borderRadius: 4,
        padding: 16,
        margin: 0,
        shadow: 'medium' as const,
        animation: 'fade' as const
      },
      advanced: {
        googleConsentMode: false,
        customCSS: '',
        customJS: ''
      }
    }
  }
]

export function LiveBannerRotator() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerConfigs.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const currentBanner = bannerConfigs[currentIndex]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Banner Preview */}
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          {isVisible && (
            <div className="h-full flex items-center justify-center p-8">
              <div className="w-full max-w-2xl">
                <BannerPreview config={currentBanner.config} />
              </div>
            </div>
          )}
        </div>
        
        {/* Brand Label */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
          {currentBanner.name} Style
        </div>
      </div>

      {/* Brand Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {bannerConfigs.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-600 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Switch to ${banner.name} style`}
          />
        ))}
      </div>

      {/* Brand Names */}
      <div className="flex justify-center space-x-8 mt-4">
        {bannerConfigs.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => setCurrentIndex(index)}
            className={`text-sm font-medium transition-colors duration-300 ${
              index === currentIndex 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {banner.name}
          </button>
        ))}
      </div>

      {/* Auto-rotate indicator */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-500">
          ✨ Automatically cycles through brand styles
        </p>
      </div>
    </div>
  )
}
