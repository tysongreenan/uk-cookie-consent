'use client'

import { useState } from 'react'
import { ShoppingCart, Package, TrendingUp, Shield, Eye, EyeOff } from 'lucide-react'

export function EcommerceBannerDemo() {
  const [showBanner, setShowBanner] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          E-commerce Cookie Banner Demo
        </h3>
        <p className="text-gray-600">
          See how our banner works on a real e-commerce product page
        </p>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setShowBanner(!showBanner)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showBanner 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showBanner ? <Eye className="h-4 w-4 mr-2 inline" /> : <EyeOff className="h-4 w-4 mr-2 inline" />}
          {showBanner ? 'Hide Banner' : 'Show Banner'}
        </button>
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showAnalytics 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </button>
      </div>

      {/* E-commerce Page Mockup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <span className="font-semibold text-gray-900">ShopDemo</span>
            </div>
            <div className="flex items-center space-x-4">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Cart (2)</span>
            </div>
          </div>
        </div>

        {/* Product Page Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="h-16 w-16 text-gray-400" />
              </div>
              <div className="flex space-x-2">
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
                <div className="w-16 h-16 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Premium Wireless Headphones</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex text-yellow-400">
                    ★★★★★
                  </div>
                  <span className="text-sm text-gray-600">(127 reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gray-900">$299.99</div>

              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
              </div>

              {/* Product Features */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 30-hour battery life</li>
                  <li>• Active noise cancellation</li>
                  <li>• Wireless charging case</li>
                  <li>• Water resistant (IPX4)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Overlay */}
        {showAnalytics && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Analytics Tracking</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Google Analytics</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Facebook Pixel</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Google Ads</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hotjar</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                All tracking is GDPR compliant with user consent
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  We use cookies to improve your shopping experience
                </h4>
                <p className="text-sm text-gray-600">
                  We use cookies to track your preferences and show you relevant products. 
                  You can manage your preferences at any time.
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-6">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Preferences
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-green-800 mb-2">GDPR Compliant</h4>
          <p className="text-sm text-green-600">
            Automatic consent tracking for all e-commerce analytics
          </p>
        </div>

        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-800 mb-2">Maintain Conversions</h4>
          <p className="text-sm text-blue-600">
            Keep tracking pixels working while staying compliant
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-purple-800 mb-2">E-commerce Ready</h4>
          <p className="text-sm text-purple-600">
            Optimized for shopping carts and product pages
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
          Get My E-commerce Banner
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  )
}
