'use client'

import { useState, useEffect } from 'react'
import { Calculator, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface ROICalculatorProps {
  industry?: 'ecommerce' | 'healthcare' | 'saas' | 'finance' | 'education'
}

export function ROICalculator({ industry = 'ecommerce' }: ROICalculatorProps) {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Industry-specific data
  const industryData = {
    ecommerce: {
      name: 'E-commerce',
      fineRisk: 0.04, // 4% chance of GDPR fine
      averageFine: 50000, // Average GDPR fine for e-commerce
      conversionImpact: 0.15, // 15% conversion drop without proper consent
      setupTime: 2, // hours saved
      legalCost: 5000, // cost of legal consultation
      color: 'blue'
    },
    healthcare: {
      name: 'Healthcare',
      fineRisk: 0.08, // Higher risk due to HIPAA
      averageFine: 75000,
      conversionImpact: 0.10,
      setupTime: 4,
      legalCost: 8000,
      color: 'green'
    },
    saas: {
      name: 'SaaS',
      fineRisk: 0.06,
      averageFine: 60000,
      conversionImpact: 0.12,
      setupTime: 3,
      legalCost: 6000,
      color: 'purple'
    },
    finance: {
      name: 'Finance',
      fineRisk: 0.10, // Highest risk
      averageFine: 100000,
      conversionImpact: 0.08,
      setupTime: 5,
      legalCost: 10000,
      color: 'red'
    },
    education: {
      name: 'Education',
      fineRisk: 0.05,
      averageFine: 40000,
      conversionImpact: 0.18,
      setupTime: 2,
      legalCost: 4000,
      color: 'orange'
    }
  }

  const data = industryData[industry]

  const calculateROI = () => {
    const annualRevenue = monthlyRevenue * 12
    const potentialFine = data.averageFine * data.fineRisk
    const conversionLoss = annualRevenue * data.conversionImpact
    const legalSavings = data.legalCost
    const timeSavings = data.setupTime * 150 // $150/hour for developer time
    
    const totalRisk = potentialFine + conversionLoss
    const totalSavings = legalSavings + timeSavings
    const roi = ((totalSavings - 0) / 0) * 100 // ROI calculation
    
    return {
      potentialFine: Math.round(potentialFine),
      conversionLoss: Math.round(conversionLoss),
      totalRisk: Math.round(totalRisk),
      legalSavings: Math.round(legalSavings),
      timeSavings: Math.round(timeSavings),
      totalSavings: Math.round(totalSavings),
      roi: Math.round(roi)
    }
  }

  const results = calculateROI()

  const startCalculation = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
      setShowResults(true)
    }, 2000)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600',
      green: 'bg-green-500 text-green-600',
      purple: 'bg-purple-500 text-purple-600',
      red: 'bg-red-500 text-red-600',
      orange: 'bg-orange-500 text-orange-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          ROI Calculator — See Your Savings
        </h3>
        <p className="text-gray-600">
          Calculate how much you could save by avoiding compliance fines and legal costs
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Revenue
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Enter your monthly website revenue
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <div className={`px-4 py-3 rounded-lg border-2 border-gray-200 ${getColorClasses(data.color)}`}>
              <span className="font-medium">{data.name}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Risk level: {Math.round(data.fineRisk * 100)}% chance of fines
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={startCalculation}
            disabled={isCalculating}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {isCalculating ? 'Calculating...' : 'Calculate My ROI'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="space-y-6">
          {/* Risk Analysis */}
          <div className="bg-red-50 rounded-xl border border-red-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h4 className="text-lg font-semibold text-red-800">Current Risk</h4>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  ${results.potentialFine.toLocaleString()}
                </div>
                <div className="text-sm text-red-500">Potential Fine</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  ${results.conversionLoss.toLocaleString()}
                </div>
                <div className="text-sm text-red-500">Conversion Loss</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  ${results.totalRisk.toLocaleString()}
                </div>
                <div className="text-sm text-red-500">Total Annual Risk</div>
              </div>
            </div>
          </div>

          {/* Savings Analysis */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h4 className="text-lg font-semibold text-green-800">With Our Solution</h4>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${results.legalSavings.toLocaleString()}
                </div>
                <div className="text-sm text-green-500">Legal Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${results.timeSavings.toLocaleString()}
                </div>
                <div className="text-sm text-green-500">Time Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${results.totalSavings.toLocaleString()}
                </div>
                <div className="text-sm text-green-500">Total Annual Savings</div>
              </div>
            </div>
          </div>

          {/* ROI Summary */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h4 className="text-xl font-bold text-blue-800">ROI Summary</h4>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${(results.totalRisk - results.totalSavings).toLocaleString()}
              </div>
              <p className="text-blue-600 font-medium">
                Net Annual Savings vs. Risk
              </p>
              <p className="text-sm text-blue-500 mt-2">
                Our solution costs $9/month vs. ${results.totalRisk.toLocaleString()}/year in risk
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Industry-Specific Tips */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-3">
          {data.name} Industry Insights
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Common Risks:</strong>
            <ul className="mt-1 space-y-1">
              <li>• {data.fineRisk * 100}% chance of compliance fines</li>
              <li>• Average fine: ${data.averageFine.toLocaleString()}</li>
              <li>• {data.conversionImpact * 100}% conversion drop without consent</li>
            </ul>
          </div>
          <div>
            <strong>Our Solution:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Saves {data.setupTime} hours of setup time</li>
              <li>• Eliminates ${data.legalCost.toLocaleString()} legal consultation</li>
              <li>• Automatic compliance updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
