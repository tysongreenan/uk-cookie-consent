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
