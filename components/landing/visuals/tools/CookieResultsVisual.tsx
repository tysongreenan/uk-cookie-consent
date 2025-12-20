'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, CheckCircle, Cookie, Eye, Zap, TrendingUp, Users, Clock } from '@phosphor-icons/react'

interface CookieCategory {
  name: string
  count: number
  risk: 'low' | 'medium' | 'high'
  description: string
  icon: React.ReactNode
  color: string
}

export function CookieResultsVisual() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const categories: CookieCategory[] = [
    {
      name: 'Essential',
      count: 3,
      risk: 'low',
      description: 'Required for website functionality',
      icon: <Shield className="h-5 w-5" />,
      color: 'green'
    },
    {
      name: 'Analytics',
      count: 8,
      risk: 'medium',
      description: 'Track user behavior and performance',
      icon: <Eye className="h-5 w-5" />,
      color: 'blue'
    },
    {
      name: 'Marketing',
      count: 12,
      risk: 'high',
      description: 'Personalized advertising and targeting',
      icon: <Zap className="h-5 w-5" />,
      color: 'red'
    },
    {
      name: 'Functionality',
      count: 5,
      risk: 'medium',
      description: 'Enhanced user experience features',
      icon: <Cookie className="h-5 w-5" />,
      color: 'yellow'
    }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 3000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500'
      case 'blue':
        return 'bg-blue-500'
      case 'red':
        return 'bg-red-500'
      case 'yellow':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const totalCookies = categories.reduce((sum, cat) => sum + cat.count, 0)
  const highRiskCount = categories.filter(cat => cat.risk === 'high').length
  const mediumRiskCount = categories.filter(cat => cat.risk === 'medium').length

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Cookie Analysis Results
        </h3>
        <p className="text-gray-600">
          Comprehensive breakdown of cookies found on your website
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Summary Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">Scan Summary</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{totalCookies}</div>
                <div className="text-sm text-blue-800">Total Cookies</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{highRiskCount}</div>
                <div className="text-sm text-red-800">High Risk</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">Risk Assessment</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Risk Cookies</span>
                <span className="text-sm font-medium text-red-600">{highRiskCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medium Risk Cookies</span>
                <span className="text-sm font-medium text-yellow-600">{mediumRiskCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Low Risk Cookies</span>
                <span className="text-sm font-medium text-green-600">
                  {totalCookies - highRiskCount - mediumRiskCount}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Compliance Score</h4>
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-2xl font-bold text-blue-600">78</span>
              </div>
              <div>
                <div className="text-sm text-gray-600">Overall Score</div>
                <div className="text-xs text-gray-500">Good compliance, needs improvement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Cookie Categories</h4>
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400"
            >
              {isAnimating ? 'Highlighting...' : 'Highlight Risks'}
            </button>
          </div>

          {categories.map((category, index) => (
            <div
              key={category.name}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedCategory === category.name ? 'ring-2 ring-blue-500' : ''
              } ${isAnimating && category.risk === 'high' ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getCategoryColor(category.color)} rounded-full flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-600">{category.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{category.count}</div>
                    <div className="text-xs text-gray-500">cookies</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(category.risk)}`}>
                    {category.risk.toUpperCase()}
                  </span>
                </div>
              </div>

              {selectedCategory === category.name && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Risk Level:</span>
                      <span className={`ml-2 font-medium ${category.risk === 'high' ? 'text-red-600' : category.risk === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {category.risk.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Compliance:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {category.risk === 'high' ? 'Requires Consent' : category.risk === 'medium' ? 'Opt-in Required' : 'Always Allowed'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="bg-yellow-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h4 className="font-semibold text-yellow-900">Action Required</h4>
            </div>
            <p className="text-sm text-yellow-800 mb-3">
              Your website has {highRiskCount} high-risk cookies that require user consent before activation.
            </p>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
              Get Compliance Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
