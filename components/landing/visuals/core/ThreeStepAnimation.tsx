'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, ArrowRight, Code, Copy, Eye } from '@phosphor-icons/react'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  content: React.ReactNode
}

export function ThreeStepAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps: Step[] = [
    {
      id: 1,
      title: 'Create Your Banner',
      description: 'Customize colors, text, and layout to match your brand',
      icon: CheckCircle,
      content: (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Pick a template</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Customize colors</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Add your text</span>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-full h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-sm font-medium">Your Banner Preview</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Copy Your Code',
      description: 'Get the code snippet ready to paste into your website',
      icon: Copy,
      content: (
        <div className="p-6 bg-gray-900 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">HTML Code</span>
            <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </button>
          </div>
          <pre className="text-xs text-gray-300 overflow-x-auto">
{`<div id="cookie-banner">
  <div class="banner-content">
    <h3>We use cookies</h3>
    <p>This website uses cookies...</p>
    <div class="banner-actions">
      <button class="accept-btn">Accept All</button>
      <button class="reject-btn">Reject</button>
    </div>
  </div>
</div>`}
          </pre>
        </div>
      )
    },
    {
      id: 3,
      title: 'Deploy & Done',
      description: 'Paste the code and your banner is live on your website',
      icon: Eye,
      content: (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">Code pasted successfully</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">Banner is live</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700">GDPR compliant</span>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  🎉 Your website is now compliant!
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCompletedSteps(prev => [...prev, currentStep])
          setCurrentStep(prev => prev + 1)
        } else {
          setCompletedSteps([0, 1, 2])
          setIsAnimating(false)
        }
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentStep, isAnimating, steps.length])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          How We Solve It — 3 Simple Steps
        </h3>
        <p className="text-gray-600">
          From setup to compliance in under 5 minutes
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  completedSteps.includes(index) 
                    ? 'bg-green-500 text-white' 
                    : currentStep === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-600 mt-2">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="mb-8">
        {steps[currentStep] && (
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h4>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>
        )}
        
        <div className="min-h-[300px] flex items-center justify-center">
          {steps[currentStep]?.content}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {isAnimating ? 'Running Demo...' : 'Start 3-Step Demo'}
        </button>
      </div>

      {/* Completion Message */}
      {completedSteps.length === steps.length && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              🎉 All Done in 5 Minutes!
            </h4>
            <p className="text-green-600">
              Your website is now GDPR compliant and ready to go
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
