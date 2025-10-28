'use client'

import { useState } from 'react'
import { BannerPreview } from '@/components/banner/banner-preview'

const colorPresets = [
  { name: 'Blue', value: '#3B82F6', bg: 'bg-blue-500' },
  { name: 'Green', value: '#10B981', bg: 'bg-green-500' },
  { name: 'Purple', value: '#8B5CF6', bg: 'bg-purple-500' },
  { name: 'Red', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
  { name: 'Pink', value: '#EC4899', bg: 'bg-pink-500' }
]

export function BrandColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6')
  const [isCustomizing, setIsCustomizing] = useState(false)

  const bannerConfig = {
    name: 'Demo Banner',
    position: 'bottom' as const,
    theme: 'light' as const,
    language: 'en' as const,
    colors: {
      background: '#FFFFFF',
      text: '#1F2937',
      button: selectedColor,
      buttonText: '#FFFFFF',
      link: selectedColor
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
        floatingPosition: 'bottom-right' as const,
        style: 'floating' as const,
        floatingStyle: {
          shape: 'pill' as const,
          size: 'small' as const,
          showText: true,
          useCustomColors: false
        },
        inlineStyle: {
          linkType: 'plain' as const,
          includeIcon: false,
          includeLogo: false
        }
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Color Picker */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Pick Your Brand Color
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose a color and see your banner update instantly
            </p>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Colors
            </label>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                    selectedColor === color.value
                      ? 'border-gray-900 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Custom Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                placeholder="#3B82F6"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {isCustomizing ? 'Done Customizing' : 'Customize More'}
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Copy Code
            </button>
          </div>

          {/* Live Preview Label */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              ✨ Live preview updates instantly
            </p>
          </div>
        </div>

        {/* Banner Preview */}
        <div className="relative">
          <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="h-full flex items-center justify-center p-8">
              <div className="w-full max-w-lg">
                <BannerPreview config={bannerConfig} />
              </div>
            </div>
          </div>
          
          {/* Preview Label */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 border border-gray-200">
            Live Preview
          </div>
        </div>
      </div>

      {/* Expanded Customization (when toggled) */}
      {isCustomizing && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="text-md font-semibold text-gray-900 mb-4">
            Advanced Customization
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Position
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Bottom</option>
                <option>Top</option>
                <option>Center</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Rounded (8px)</option>
                <option>Sharp (0px)</option>
                <option>Pill (24px)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
