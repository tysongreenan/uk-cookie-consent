'use client'

import { useState } from 'react'
import { Zap, Users, BarChart, Shield, Eye, EyeOff, TrendingUp, Settings } from 'lucide-react'

export function SaaSBannerDemo() {
  const [showBanner, setShowBanner] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          SaaS Cookie Banner Demo
        </h3>
        <p className="text-gray-600">
          See how our banner works on SaaS product pages and dashboards
        </p>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setShowBanner(!showBanner)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showBanner 
              ? 'bg-blue-500 text-white' 
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
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
        </button>
      </div>

      {/* SaaS Dashboard Mockup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">AnalyticsPro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Team Plan</span>
              <Settings className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-6">
            <a href="#" className="text-blue-600 font-medium">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Analytics</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Reports</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Settings</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Billing</a>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, Sarah!
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your analytics today.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-blue-900">12,543</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-blue-600 mt-2">+12% from last month</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Active Sessions</p>
                  <p className="text-2xl font-bold text-green-900">2,847</p>
                </div>
                <BarChart className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">+8% from last week</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-900">3.2%</p>
                </div>
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-purple-600 mt-2">+0.5% from last month</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-orange-900">$45,230</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-sm text-orange-600 mt-2">+15% from last month</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                User Growth
              </h3>
              <div className="h-48 bg-white rounded border flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-400" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Traffic Sources
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Organic Search</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Direct</span>
                  <span className="text-sm font-medium text-gray-900">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Social Media</span>
                  <span className="text-sm font-medium text-gray-900">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-sm font-medium text-gray-900">10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Overlay */}
        {showAnalytics && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Analytics Tracking</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Google Analytics 4</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mixpanel</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hotjar</span>
                  <span className="text-sm font-medium text-green-600">✓ Tracking</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Intercom</span>
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
                  We use cookies to improve your experience
                </h4>
                <p className="text-sm text-gray-600">
                  We use cookies to track your usage and provide personalized insights. 
                  You can manage your preferences at any time.
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-6">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Manage Preferences
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
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-800 mb-2">GDPR Compliant</h4>
          <p className="text-sm text-blue-600">
            Automatic consent tracking for all SaaS analytics
          </p>
        </div>

        <div className="text-center p-6 bg-green-50 rounded-xl">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-green-800 mb-2">Maintain Analytics</h4>
          <p className="text-sm text-green-600">
            Keep all tracking pixels working while staying compliant
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-purple-800 mb-2">SaaS Optimized</h4>
          <p className="text-sm text-purple-600">
            Perfect for dashboards and product analytics
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Get My SaaS Banner
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  )
}
