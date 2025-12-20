'use client'

import { useState, useEffect } from 'react'
import { Search, Shield, AlertTriangle, CheckCircle, Cookie, Eye, Zap } from '@phosphor-icons/react'

interface CookieResult {
  id: string
  name: string
  domain: string
  category: 'essential' | 'analytics' | 'marketing' | 'functionality'
  risk: 'low' | 'medium' | 'high'
  description: string
}

export function ScannerAnimation() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const cookieResults: CookieResult[] = [
    {
      id: '1',
      name: '_ga',
      domain: '.google-analytics.com',
      category: 'analytics',
      risk: 'medium',
      description: 'Google Analytics tracking cookie'
    },
    {
      id: '2',
      name: '_fbp',
      domain: '.facebook.com',
      category: 'marketing',
      risk: 'high',
      description: 'Facebook Pixel tracking cookie'
    },
    {
      id: '3',
      name: 'session_id',
      domain: '.yoursite.com',
      category: 'essential',
      risk: 'low',
      description: 'Essential session management cookie'
    },
    {
      id: '4',
      name: '_gid',
      domain: '.google-analytics.com',
      category: 'analytics',
      risk: 'medium',
      description: 'Google Analytics user identification'
    },
    {
      id: '5',
      name: 'hotjar',
      domain: '.hotjar.com',
      category: 'functionality',
      risk: 'medium',
      description: 'Hotjar user behavior tracking'
    }
  ]

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setShowResults(false)
    setCurrentStep(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          setShowResults(true)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= 3) {
          clearInterval(stepInterval)
          return 3
        }
        return prev + 1
      })
    }, 600)
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'essential':
        return <Shield className="h-4 w-4" />
      case 'analytics':
        return <Eye className="h-4 w-4" />
      case 'marketing':
        return <Zap className="h-4 w-4" />
      case 'functionality':
        return <Cookie className="h-4 w-4" />
      default:
        return <Cookie className="h-4 w-4" />
    }
  }

  const steps = [
    'Scanning website for cookies...',
    'Analyzing cookie categories...',
    'Checking compliance risks...',
    'Generating report...'
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Free Cookie Scanner — See What's Tracking Your Visitors
        </h3>
        <p className="text-gray-600">
          Instant scan reveals all cookies, their purposes, and compliance risks
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Scanner Interface */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Search className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Cookie Scanner</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter your website URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="https://example.com"
                  />
                </div>
              </div>

              <button
                onClick={startScan}
                disabled={isScanning}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                {isScanning ? 'Scanning...' : 'Start Free Scan'}
              </button>
            </div>

            {/* Progress Bar */}
            {isScanning && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Scan Progress</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {steps[currentStep]}
                </div>
              </div>
            )}
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-900">Instant Results</h4>
                <p className="text-sm text-green-700">Get comprehensive cookie analysis in seconds</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-blue-900">Risk Assessment</h4>
                <p className="text-sm text-blue-700">Identify compliance risks and privacy violations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-purple-600" />
              <div>
                <h4 className="font-semibold text-purple-900">Actionable Insights</h4>
                <p className="text-sm text-purple-700">Get specific recommendations for compliance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {!showResults ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Scan
              </h4>
              <p className="text-gray-600">
                Enter your website URL and click "Start Free Scan" to see what cookies are tracking your visitors
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4">Scan Results</h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{cookieResults.length}</div>
                    <div className="text-sm text-gray-600">Cookies Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {cookieResults.filter(c => c.risk === 'high').length}
                    </div>
                    <div className="text-sm text-gray-600">High Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {cookieResults.filter(c => c.risk === 'medium').length}
                    </div>
                    <div className="text-sm text-gray-600">Medium Risk</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {cookieResults.map((cookie) => (
                  <div
                    key={cookie.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(cookie.category)}
                        <span className="font-medium text-gray-900">{cookie.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(cookie.risk)}`}>
                        {cookie.risk.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{cookie.domain}</div>
                    <div className="text-sm text-gray-700">{cookie.description}</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Get Full Compliance Report
                </h4>
                <p className="text-sm text-blue-800 mb-4">
                  Our detailed scanner provides comprehensive analysis, risk assessment, and compliance recommendations.
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
