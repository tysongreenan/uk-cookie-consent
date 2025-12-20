'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, AlertTriangle } from '@phosphor-icons/react'

interface FlowStep {
  id: string
  title: string
  description: string
  isCorrect: boolean
  icon: React.ComponentType<{ className?: string }>
}

export function ConsentFlowDiagram() {
  const [activeFlow, setActiveFlow] = useState<'wrong' | 'right'>('wrong')

  const wrongFlow: FlowStep[] = [
    {
      id: 'prechecked',
      title: 'Pre-checked Boxes',
      description: 'All cookies are already enabled by default',
      isCorrect: false,
      icon: XCircle
    },
    {
      id: 'forced',
      title: 'Forced Acceptance',
      description: 'Users must accept all cookies to use the site',
      isCorrect: false,
      icon: XCircle
    },
    {
      id: 'no-choice',
      title: 'No Granular Control',
      description: 'Users cannot choose specific cookie types',
      isCorrect: false,
      icon: XCircle
    },
    {
      id: 'fine',
      title: '€20M+ Fine Risk',
      description: 'Violates GDPR Article 7 - Invalid consent',
      isCorrect: false,
      icon: AlertTriangle
    }
  ]

  const rightFlow: FlowStep[] = [
    {
      id: 'opt-in',
      title: 'Opt-in Required',
      description: 'Users must actively choose to accept cookies',
      isCorrect: true,
      icon: CheckCircle
    },
    {
      id: 'granular',
      title: 'Granular Control',
      description: 'Users can choose specific cookie categories',
      isCorrect: true,
      icon: CheckCircle
    },
    {
      id: 'withdrawal',
      title: 'Easy Withdrawal',
      description: 'Users can change preferences anytime',
      isCorrect: true,
      icon: CheckCircle
    },
    {
      id: 'compliant',
      title: 'GDPR Compliant',
      description: 'Meets all consent requirements',
      isCorrect: true,
      icon: CheckCircle
    }
  ]

  const currentFlow = activeFlow === 'wrong' ? wrongFlow : rightFlow

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Consent Flow Comparison
        </h3>
        <p className="text-gray-600">
          See the difference between compliant and non-compliant approaches
        </p>
      </div>

      {/* Flow Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveFlow('wrong')}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              activeFlow === 'wrong'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ❌ Wrong Way
          </button>
          <button
            onClick={() => setActiveFlow('right')}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              activeFlow === 'right'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ✅ Right Way
          </button>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="relative">
        {/* Flow Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2 hidden md:block" />
        
        <div className="grid md:grid-cols-4 gap-4">
          {currentFlow.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                activeFlow === 'wrong'
                  ? 'bg-red-50 border-red-200 hover:border-red-300'
                  : 'bg-green-50 border-green-200 hover:border-green-300'
              }`}>
                <div className="text-center">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    step.isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow (except last step) */}
              {index < currentFlow.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Result Summary */}
      <div className="mt-8 p-6 rounded-xl border-2 text-center">
        {activeFlow === 'wrong' ? (
          <div className="bg-red-50 border-red-200">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-red-800 mb-2">
              Non-Compliant Approach
            </h4>
            <p className="text-red-600">
              This approach violates GDPR Article 7 and can result in fines up to €20 million or 4% of annual revenue.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border-green-200">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              Compliant Approach
            </h4>
            <p className="text-green-600">
              This approach meets all GDPR requirements and protects your business from costly fines.
            </p>
          </div>
        )}
      </div>

      {/* Key Differences */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h5 className="font-semibold text-red-800 mb-2">❌ Common Mistakes</h5>
          <ul className="text-sm text-red-600 space-y-1">
            <li>• Pre-checked consent boxes</li>
            <li>• "Accept or leave" approach</li>
            <li>• No granular controls</li>
            <li>• Hard to find withdrawal option</li>
          </ul>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-800 mb-2">✅ Best Practices</h5>
          <ul className="text-sm text-green-600 space-y-1">
            <li>• Clear opt-in required</li>
            <li>• Granular cookie controls</li>
            <li>• Easy preference changes</li>
            <li>• Plain language explanations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
