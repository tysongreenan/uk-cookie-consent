'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Code, Copy, Eye, Settings } from '@phosphor-icons/react'

interface InstallationStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  content: React.ReactNode
  isCompleted: boolean
}

export function ThreeStepInstallation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps: InstallationStep[] = [
    {
      id: 1,
      title: 'Get Your Code',
      description: 'Copy the integration code from your dashboard',
      icon: Code,
      isCompleted: false,
      content: (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Go to your dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Click "Get Code"</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Copy the code snippet</span>
            </div>
            <div className="mt-4 p-3 bg-gray-900 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Integration Code</span>
                <button className="flex items-center space-x-1 px-2 py-1 bg-blue-600 text-white rounded text-xs">
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-xs text-gray-300">
{`<script>
  window.cookieConsent = {
    position: 'bottom',
    theme: 'light',
    primaryColor: '#3B82F6'
  };
</script>
<script src="https://cdn.cookiebanner.com/banner.js"></script>`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Add to Website',
      description: 'Paste the code into your website\'s head section',
      icon: Copy,
      isCompleted: false,
      content: (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Open your website files</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Find the &lt;head&gt; section</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Paste the code before &lt;/head&gt;</span>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> Add the code to your main template file so it appears on all pages.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Test & Deploy',
      description: 'Verify your banner is working and deploy to production',
      icon: Eye,
      isCompleted: false,
      content: (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Refresh your website</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Check banner appears</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Test all buttons work</span>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  🎉 Your banner is live and GDPR compliant!
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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep])
      setCurrentStep(prev => prev + 1)
    } else {
      setCompletedSteps([0, 1, 2])
      setIsAnimating(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Installation in 3 Simple Steps
        </h3>
        <p className="text-gray-600">
          From code to live banner in under 5 minutes
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
                <span className="text-xs font-medium text-gray-600 mt-2 text-center">
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
              Step {currentStep + 1}: {steps[currentStep].title}
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
          <span>Installation Progress</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {isAnimating ? 'Running Demo...' : 'Start Installation Demo'}
        </button>
        
        {isAnimating && currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Next Step
          </button>
        )}
      </div>

      {/* Completion Message */}
      {completedSteps.length === steps.length && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              🎉 Installation Complete!
            </h4>
            <p className="text-green-600">
              Your cookie banner is now live and GDPR compliant
            </p>
          </div>
        </div>
      )}

      {/* Platform-Specific Tips */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">WordPress</h5>
          <p className="text-sm text-blue-600">
            Add to your theme's functions.php or use a plugin
          </p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2">HTML/CSS</h5>
          <p className="text-sm text-green-600">
            Paste directly into your website's head section
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <h5 className="font-semibold text-purple-800 mb-2">React/Next.js</h5>
          <p className="text-sm text-purple-600">
            Add to your main component or _app.js file
          </p>
        </div>
      </div>
    </div>
  )
}
