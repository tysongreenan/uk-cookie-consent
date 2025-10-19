'use client'

import { useState, useEffect } from 'react'
import { Zap, Clock, Trophy, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

interface LoadTimeData {
  name: string
  time: number
  color: string
  description: string
  features: string[]
}

export function LoadTimeComparison() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const loadTimes: LoadTimeData[] = [
    {
      name: 'Our Solution',
      time: 50,
      color: 'green',
      description: 'Lightning-fast cookie consent',
      features: ['50ms load time', 'Zero impact on performance', 'Instant activation']
    },
    {
      name: 'Cookiebot',
      time: 200,
      color: 'red',
      description: 'Heavy cookie consent solution',
      features: ['200ms load time', '4x slower than ours', 'Performance impact']
    },
    {
      name: 'OneTrust',
      time: 300,
      color: 'red',
      description: 'Enterprise cookie management',
      features: ['300ms load time', '6x slower than ours', 'Complex setup']
    },
    {
      name: 'CookieYes',
      time: 150,
      color: 'yellow',
      description: 'Popular cookie consent plugin',
      features: ['150ms load time', '3x slower than ours', 'Limited features']
    }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setAnimationStep(0)

    const steps = [0, 1, 2, 3]
    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnimationStep(step)
        if (index === steps.length - 1) {
          setTimeout(() => setIsAnimating(false), 1000)
        }
      }, index * 800)
    })
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500 text-white'
      case 'red':
        return 'bg-red-500 text-white'
      case 'yellow':
        return 'bg-yellow-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getBarColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-500'
      case 'red':
        return 'bg-red-500'
      case 'yellow':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const maxTime = Math.max(...loadTimes.map(lt => lt.time))

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Performance Comparison — Speed Test
        </h3>
        <p className="text-gray-600">
          See how our solution outperforms competitors in load time and performance
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Race Animation */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900">Load Time Race</h4>
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-sm font-medium"
              >
                {isAnimating ? 'Racing...' : 'Start Race'}
              </button>
            </div>

            <div className="space-y-4">
              {loadTimes.map((loadTime, index) => (
                <div key={loadTime.name} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getColorClasses(loadTime.color)}`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{loadTime.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{loadTime.time}ms</div>
                      <div className="text-xs text-gray-500">load time</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
                    <div
                      className={`h-4 rounded-full transition-all duration-1000 ${getBarColor(loadTime.color)} ${
                        isAnimating && animationStep >= index ? 'animate-pulse' : ''
                      }`}
                      style={{
                        width: isAnimating && animationStep >= index ? `${(loadTime.time / maxTime) * 100}%` : '0%'
                      }}
                    >
                      {isAnimating && animationStep >= index && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <Zap className="h-3 w-3 text-white animate-bounce" />
                        </div>
                      )}
                    </div>
                  </div>

                  {isAnimating && animationStep >= index && (
                    <div className="mt-2 text-sm text-gray-600 animate-fade-in">
                      {loadTime.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Performance Impact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">50ms</div>
                <div className="text-sm text-green-800">Our Solution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">200ms</div>
                <div className="text-sm text-red-800">Average Competitor</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg font-bold text-gray-900">4x Faster</div>
              <div className="text-sm text-gray-600">than industry average</div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">Why Speed Matters</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Better User Experience</div>
                  <div className="text-sm text-gray-600">Faster load times improve user satisfaction and conversion rates</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">SEO Benefits</div>
                  <div className="text-sm text-gray-600">Google considers page speed as a ranking factor</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Mobile Performance</div>
                  <div className="text-sm text-gray-600">Critical for mobile users with slower connections</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">Technical Comparison</h4>
            <div className="space-y-3">
              {loadTimes.map((loadTime, index) => (
                <div key={loadTime.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getColorClasses(loadTime.color)}`}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{loadTime.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{loadTime.time}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Winner: Our Solution</h4>
            </div>
            <p className="text-sm text-blue-800 mb-4">
              Our lightweight cookie consent solution loads 4x faster than competitors while providing the same compliance features.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Try Our Fast Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
