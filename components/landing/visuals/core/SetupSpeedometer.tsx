'use client'

import { useState, useEffect } from 'react'
import { Clock, Zap, CheckCircle, XCircle } from 'lucide-react'

export function SetupSpeedometer() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [ourTime, setOurTime] = useState(0)
  const [competitorTime, setCompetitorTime] = useState(0)

  const ourSteps = [
    { name: 'Pick Template', time: 1, icon: CheckCircle },
    { name: 'Customize Colors', time: 2, icon: CheckCircle },
    { name: 'Copy Code', time: 1, icon: CheckCircle },
    { name: 'Deploy', time: 1, icon: CheckCircle }
  ]

  const competitorSteps = [
    { name: 'Research Requirements', time: 30, icon: XCircle },
    { name: 'Find Plugin', time: 15, icon: XCircle },
    { name: 'Install & Configure', time: 45, icon: XCircle },
    { name: 'Test Compliance', time: 60, icon: XCircle },
    { name: 'Fix Issues', time: 30, icon: XCircle }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setOurTime(0)
    setCompetitorTime(0)
  }

  useEffect(() => {
    if (isAnimating) {
      const ourInterval = setInterval(() => {
        setOurTime(prev => {
          if (prev >= 5) {
            clearInterval(ourInterval)
            return 5
          }
          return prev + 0.1
        })
      }, 200)

      const competitorInterval = setInterval(() => {
        setCompetitorTime(prev => {
          if (prev >= 180) {
            clearInterval(competitorInterval)
            return 180
          }
          return prev + 0.3
        })
      }, 200)

      return () => {
        clearInterval(ourInterval)
        clearInterval(competitorInterval)
      }
    }
  }, [isAnimating])

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Setup Speed Comparison
        </h3>
        <p className="text-gray-600">
          See how fast you can get compliant with our tool vs manual setup
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Our Solution */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">Our Solution</h4>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {ourTime.toFixed(1)} min
            </div>
          </div>

          <div className="space-y-3">
            {ourSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <step.icon className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-700">{step.name}</span>
                <div className="flex-1 bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: isAnimating && ourTime >= step.time ? '100%' : '0%' 
                    }}
                  />
                </div>
                <span className="text-xs text-green-600">{step.time}min</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Total Time:</span>
              <span className="text-lg font-bold text-green-600">5 minutes</span>
            </div>
          </div>
        </div>

        {/* Competitor Solution */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <h4 className="text-lg font-semibold text-red-800">Manual Setup</h4>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {competitorTime.toFixed(0)} min
            </div>
          </div>

          <div className="space-y-3">
            {competitorSteps.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <step.icon className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">{step.name}</span>
                <div className="flex-1 bg-red-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: isAnimating && competitorTime >= step.time ? '100%' : '0%' 
                    }}
                  />
                </div>
                <span className="text-xs text-red-600">{step.time}min</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-red-100 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-800">Total Time:</span>
              <span className="text-lg font-bold text-red-600">3+ hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Comparison Bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Speed Comparison</span>
          <span className="text-sm text-gray-500">
            {Math.round((competitorTime / ourTime) * 10) / 10}x faster
          </span>
        </div>
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div 
              className="bg-green-500 transition-all duration-1000"
              style={{ width: `${(ourTime / 180) * 100}%` }}
            />
            <div 
              className="bg-red-500 transition-all duration-1000"
              style={{ width: `${(competitorTime / 180) * 100}%` }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {isAnimating ? 'Running...' : 'Click to start comparison'}
            </span>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center mt-6">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {isAnimating ? 'Running Comparison...' : 'Start Speed Test'}
        </button>
      </div>

      {/* Results Summary */}
      {ourTime >= 5 && (
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              🎉 You Save 3+ Hours Every Time!
            </h4>
            <p className="text-blue-600">
              Our solution is {Math.round(180 / 5)}x faster than manual setup
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
