'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Settings, Cookie, Palette, Move, Type } from 'lucide-react'

interface BannerStyle {
  id: string
  name: string
  theme: 'light' | 'dark'
  position: 'bottom' | 'top' | 'floating'
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
  }
  text: {
    title: string
    message: string
    accept: string
    reject: string
    preferences: string
  }
  layout: {
    borderRadius: number
    shadow: string
    padding: number
  }
}

const bannerStyles: BannerStyle[] = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    theme: 'dark',
    position: 'bottom',
    colors: {
      background: '#1f2937',
      text: '#ffffff',
      button: '#2A6270',
      buttonText: '#ffffff'
    },
    text: {
      title: 'We use cookies',
      message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
      accept: 'Accept All',
      reject: 'Reject',
      preferences: 'Preferences'
    },
    layout: {
      borderRadius: 12,
      shadow: '0 8px 24px rgba(0,0,0,0.2)',
      padding: 24
    }
  },
  {
    id: 'clean-light',
    name: 'Clean Light',
    theme: 'light',
    position: 'bottom',
    colors: {
      background: '#ffffff',
      text: '#1f2937',
      button: '#2A6270',
      buttonText: '#ffffff'
    },
    text: {
      title: 'Cookie Preferences',
      message: 'We use cookies to improve your experience. Choose your preferences below.',
      accept: 'Accept All',
      reject: 'Essential Only',
      preferences: 'Customize'
    },
    layout: {
      borderRadius: 8,
      shadow: '0 4px 12px rgba(0,0,0,0.1)',
      padding: 20
    }
  },
  {
    id: 'floating-premium',
    name: 'Floating Premium',
    theme: 'dark',
    position: 'floating',
    colors: {
      background: '#111827',
      text: '#ffffff',
      button: '#3b82f6',
      buttonText: '#ffffff'
    },
    text: {
      title: 'Privacy & Cookies',
      message: 'We respect your privacy. Manage your cookie preferences here.',
      accept: 'Accept',
      reject: 'Decline',
      preferences: 'Settings'
    },
    layout: {
      borderRadius: 16,
      shadow: '0 12px 32px rgba(0,0,0,0.3)',
      padding: 20
    }
  },
  {
    id: 'minimal-branded',
    name: 'Minimal Branded',
    theme: 'light',
    position: 'top',
    colors: {
      background: '#f8fafc',
      text: '#334155',
      button: '#2A6270',
      buttonText: '#ffffff'
    },
    text: {
      title: 'Cookie Notice',
      message: 'This site uses cookies for analytics and personalization.',
      accept: 'Got it',
      reject: 'No thanks',
      preferences: 'Manage'
    },
    layout: {
      borderRadius: 6,
      shadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: 16
    }
  }
]

export function HeroBannerShowcase() {
  const [isVisible, setIsVisible] = useState(true)
  const [showPreferences, setShowPreferences] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentCustomization, setCurrentCustomization] = useState({
    theme: 'dark' as 'light' | 'dark',
    position: 'bottom' as 'top' | 'bottom' | 'floating',
    colors: {
      background: '#1f2937',
      text: '#ffffff',
      button: '#2A6270',
      buttonText: '#ffffff'
    },
    text: {
      title: 'We use cookies',
      message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
      accept: 'Accept All',
      reject: 'Reject',
      preferences: 'Preferences'
    },
    layout: {
      borderRadius: 12,
      shadow: '0 8px 24px rgba(0,0,0,0.2)',
      padding: 24
    }
  })
  const [customizationStep, setCustomizationStep] = useState(0)

  // Auto-cycle through customization steps to show the power of customization
  useEffect(() => {
    const steps = [
      // Step 1: Change colors
      () => setCurrentCustomization(prev => ({
        ...prev,
        colors: {
          background: '#ffffff',
          text: '#1f2937',
          button: '#3b82f6',
          buttonText: '#ffffff'
        },
        layout: { ...prev.layout, shadow: '0 4px 12px rgba(0,0,0,0.1)' }
      })),
      
      // Step 2: Change position and style
      () => setCurrentCustomization(prev => ({
        ...prev,
        position: 'floating',
        layout: { 
          ...prev.layout, 
          borderRadius: 16,
          shadow: '0 12px 32px rgba(0,0,0,0.3)'
        }
      })),
      
      // Step 3: Change text and theme
      () => setCurrentCustomization(prev => ({
        ...prev,
        text: {
          title: 'Privacy & Cookies',
          message: 'We respect your privacy. Manage your cookie preferences here.',
          accept: 'Accept',
          reject: 'Decline',
          preferences: 'Settings'
        },
        colors: {
          background: '#111827',
          text: '#ffffff',
          button: '#10b981',
          buttonText: '#ffffff'
        }
      })),
      
      // Step 4: Change to top position with different style
      () => setCurrentCustomization(prev => ({
        ...prev,
        position: 'top',
        layout: { 
          ...prev.layout, 
          borderRadius: 8,
          shadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 16
        },
        colors: {
          background: '#f8fafc',
          text: '#334155',
          button: '#2A6270',
          buttonText: '#ffffff'
        },
        text: {
          title: 'Cookie Notice',
          message: 'This site uses cookies for analytics and personalization.',
          accept: 'Got it',
          reject: 'No thanks',
          preferences: 'Manage'
        }
      })),
      
      // Step 5: Back to original
      () => setCurrentCustomization(prev => ({
        ...prev,
        position: 'bottom',
        colors: {
          background: '#1f2937',
          text: '#ffffff',
          button: '#2A6270',
          buttonText: '#ffffff'
        },
        text: {
          title: 'We use cookies',
          message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
          accept: 'Accept All',
          reject: 'Reject',
          preferences: 'Preferences'
        },
        layout: {
          borderRadius: 12,
          shadow: '0 8px 24px rgba(0,0,0,0.2)',
          padding: 24
        }
      }))
    ]

    const interval = setInterval(() => {
      // Add transition effect
      setIsTransitioning(true)
      
      // Update customization after a brief delay
      setTimeout(() => {
        setCustomizationStep((prev) => {
          const nextStep = (prev + 1) % steps.length
          steps[nextStep]()
          return nextStep
        })
        setShowPreferences(false)
        setIsTransitioning(false)
      }, 150)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleAccept = () => {
    setIsVisible(false)
  }

  const handleReject = () => {
    setIsVisible(false)
  }

  const handlePreferences = () => {
    setShowPreferences(!showPreferences)
  }

  const getPositionClasses = () => {
    switch (currentCustomization.position) {
      case 'top':
        return 'top-4 left-4 right-4'
      case 'floating':
        return 'top-1/2 right-4 transform -translate-y-1/2 max-w-sm'
      default:
        return 'bottom-4 left-4 right-4'
    }
  }

  const getCustomizationLabel = () => {
    const labels = [
      'Changing colors...',
      'Moving position...',
      'Updating text...',
      'Switching style...',
      'Resetting...'
    ]
    return labels[customizationStep] || 'Customizing...'
  }

  return (
    <div className="relative h-80 w-full max-w-xl mx-auto">
      {/* Website Preview Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl overflow-hidden">
        {/* Browser Frame */}
        <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 rounded bg-background px-3 py-1 text-xs text-muted-foreground">
            www.your-website.com
          </div>
        </div>

        {/* Website Content Mockup */}
        <div className="p-4 space-y-3">
          <div className="h-5 w-24 rounded bg-muted/60"></div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded bg-muted/40"></div>
            <div className="h-2 w-3/4 rounded bg-muted/40"></div>
            <div className="h-2 w-5/6 rounded bg-muted/40"></div>
          </div>
          <div className="mt-4 h-16 rounded bg-muted/30"></div>
        </div>

        {/* Animated Cookie Banner */}
        <div
          className={`absolute ${getPositionClasses()} z-50 transition-all duration-700 ease-in-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${isTransitioning ? 'animate-pulse' : ''}`}
          style={{
            backgroundColor: currentCustomization.colors.background,
            color: currentCustomization.colors.text,
            borderRadius: `${currentCustomization.layout.borderRadius}px`,
            padding: `${currentCustomization.layout.padding}px`,
            boxShadow: currentCustomization.layout.shadow,
            transition: 'background-color 0.5s ease, color 0.5s ease, border-radius 0.5s ease, box-shadow 0.5s ease, padding 0.5s ease'
          }}
        >
          <div className="relative">
            {/* Close button for floating banners */}
            {currentCustomization.position === 'floating' && (
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                style={{ color: currentCustomization.colors.text }}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <div className="flex items-start gap-3">
              {/* Cookie Icon */}
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-5 w-5 opacity-80" style={{ color: currentCustomization.colors.button }} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-2 transition-colors duration-500" style={{ color: currentCustomization.colors.text }}>
                  {currentCustomization.text.title}
                </h3>
                
                <p className="text-sm mb-4 leading-relaxed opacity-90 transition-colors duration-500" style={{ color: currentCustomization.colors.text }}>
                  {currentCustomization.text.message}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleAccept}
                    size="sm"
                    style={{
                      backgroundColor: currentCustomization.colors.button,
                      color: currentCustomization.colors.buttonText,
                    }}
                    className="hover:opacity-90 transition-all duration-500"
                  >
                    {currentCustomization.text.accept}
                  </Button>
                  
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: currentCustomization.colors.button,
                      color: currentCustomization.colors.button,
                      backgroundColor: 'transparent'
                    }}
                    className="hover:bg-opacity-10 transition-all duration-500"
                  >
                    {currentCustomization.text.reject}
                  </Button>

                  <Button
                    onClick={handlePreferences}
                    variant="ghost"
                    size="sm"
                    style={{ 
                      color: currentCustomization.colors.button,
                      backgroundColor: 'transparent'
                    }}
                    className="hover:bg-opacity-10 transition-all duration-500"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    {currentCustomization.text.preferences}
                  </Button>
                </div>

                {/* Preferences Panel */}
                {showPreferences && (
                  <div 
                    className="mt-4 p-3 rounded border transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderColor: 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <h4 className="font-medium mb-3 text-sm">Cookie Categories</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span>Essential</span>
                        <div className="h-2 w-8 rounded bg-green-500"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Analytics</span>
                        <div className="h-2 w-6 rounded bg-blue-500"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Marketing</span>
                        <div className="h-2 w-4 rounded bg-orange-500"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customization Indicator */}
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 border shadow-lg">
          <div className="flex gap-1">
            {customizationStep === 0 && <Palette className="h-4 w-4 text-blue-500" />}
            {customizationStep === 1 && <Move className="h-4 w-4 text-purple-500" />}
            {customizationStep === 2 && <Type className="h-4 w-4 text-green-500" />}
            {customizationStep === 3 && <Settings className="h-4 w-4 text-orange-500" />}
            {customizationStep === 4 && <Cookie className="h-4 w-4 text-teal-500" />}
          </div>
          <span className="text-foreground font-medium">{getCustomizationLabel()}</span>
        </div>
      </div>

      {/* Customization Progress Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2, 3, 4].map((step) => (
          <button
            key={step}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCustomizationStep(step)
                setIsVisible(true)
                setShowPreferences(false)
                setIsTransitioning(false)
              }, 150)
            }}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              step === customizationStep 
                ? 'bg-primary scale-125' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
      
      {/* Customization Description */}
      <div className="text-center mt-3">
        <p className="text-xs font-medium text-muted-foreground">
          Watch real-time customization →
        </p>
      </div>
    </div>
  )
}
