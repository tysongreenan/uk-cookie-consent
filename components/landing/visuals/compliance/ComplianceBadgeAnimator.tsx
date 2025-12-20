'use client'

import { useState, useEffect } from 'react'
import { Shield, CheckCircle, AlertTriangle, XCircle } from '@phosphor-icons/react'

interface ComplianceItem {
  id: string
  name: string
  status: 'compliant' | 'warning' | 'non-compliant'
  description: string
}

export function ComplianceBadgeAnimator() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedItems, setCompletedItems] = useState<string[]>([])

  const complianceItems: ComplianceItem[] = [
    {
      id: 'consent',
      name: 'Express Consent',
      status: 'compliant',
      description: 'Users must actively opt-in to cookies'
    },
    {
      id: 'granular',
      name: 'Granular Controls',
      status: 'compliant',
      description: 'Users can choose specific cookie categories'
    },
    {
      id: 'withdrawal',
      name: 'Easy Withdrawal',
      status: 'compliant',
      description: 'Users can change preferences anytime'
    },
    {
      id: 'logging',
      name: 'Consent Logging',
      status: 'compliant',
      description: 'All consent decisions are recorded'
    },
    {
      id: 'bilingual',
      name: 'Bilingual Support',
      status: 'compliant',
      description: 'Available in English and French'
    },
    {
      id: 'geolocation',
      name: 'Regional Rules',
      status: 'compliant',
      description: 'Different rules for different provinces'
    }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setCompletedItems([])
  }

  useEffect(() => {
    if (isAnimating && currentStep < complianceItems.length) {
      const timer = setTimeout(() => {
        setCompletedItems(prev => [...prev, complianceItems[currentStep].id])
        setCurrentStep(prev => prev + 1)
      }, 800)

      return () => clearTimeout(timer)
    } else if (isAnimating && currentStep >= complianceItems.length) {
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }, [currentStep, isAnimating, complianceItems.length])

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    
    switch (status) {
      case 'compliant':
        return <Shield className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'non-compliant':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Shield className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string, isCompleted: boolean) => {
    if (isCompleted) return 'bg-green-50 border-green-200'
    
    switch (status) {
      case 'compliant':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'non-compliant':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Compliance Checklist — Live Verification
        </h3>
        <p className="text-gray-600">
          Watch as we verify each compliance requirement in real-time
        </p>
      </div>

      {/* Compliance Shield */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-1000 ${
            completedItems.length === complianceItems.length 
              ? 'bg-green-500' 
              : 'bg-blue-500'
          }`}>
            <Shield className="h-12 w-12 text-white" />
          </div>
          
          {/* Animated Ring */}
          {isAnimating && (
            <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping" />
          )}
        </div>
      </div>

      {/* Compliance Items */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {complianceItems.map((item, index) => {
          const isCompleted = completedItems.includes(item.id)
          const isCurrent = currentStep === index && isAnimating
          
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                isCurrent ? 'scale-105 shadow-lg' : ''
              } ${getStatusColor(item.status, isCompleted)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getStatusIcon(item.status, isCompleted)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
                {isCurrent && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Compliance Progress</span>
          <span>{Math.round((completedItems.length / complianceItems.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedItems.length / complianceItems.length) * 100}%` }}
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
          {isAnimating ? 'Verifying Compliance...' : 'Start Compliance Check'}
        </button>
      </div>

      {/* Completion Message */}
      {completedItems.length === complianceItems.length && !isAnimating && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              🎉 100% Compliant!
            </h4>
            <p className="text-green-600">
              Your banner meets all GDPR and PIPEDA requirements
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
