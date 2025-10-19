'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Calculator, TrendingUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

interface Competitor {
  name: string
  monthlyCost: number
  annualCost: number
  features: string[]
  limitations: string[]
  color: string
}

export function SavingsCalculator() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>('cookiebot')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const competitors: Competitor[] = [
    {
      name: 'Cookiebot',
      monthlyCost: 9,
      annualCost: 108,
      features: ['Basic compliance', 'Cookie scanning', 'Consent management'],
      limitations: ['Limited customization', 'Slow load times', 'Basic analytics'],
      color: 'red'
    },
    {
      name: 'OneTrust',
      monthlyCost: 50,
      annualCost: 600,
      features: ['Enterprise features', 'Advanced analytics', 'Multi-language'],
      limitations: ['Complex setup', 'Expensive', 'Overkill for small sites'],
      color: 'red'
    },
    {
      name: 'CookieYes',
      monthlyCost: 5,
      annualCost: 60,
      features: ['WordPress integration', 'Basic compliance', 'Simple setup'],
      limitations: ['Limited features', 'WordPress only', 'Basic customization'],
      color: 'yellow'
    },
    {
      name: 'Termly',
      monthlyCost: 20,
      annualCost: 240,
      features: ['Legal compliance', 'Privacy policy', 'Cookie consent'],
      limitations: ['Expensive', 'Complex interface', 'Limited customization'],
      color: 'red'
    }
  ]

  const calculateSavings = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
      setShowResults(true)
    }, 2000)
  }

  const getCompetitorColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const selectedCompetitorData = competitors.find(c => c.name.toLowerCase().replace(/\s+/g, '') === selectedCompetitor)
  const ourCost = 0 // Free plan
  const competitorCost = selectedCompetitorData?.annualCost || 0
  const savings = competitorCost - ourCost
  const savingsPercentage = competitorCost > 0 ? Math.round((savings / competitorCost) * 100) : 0

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Cost Comparison Calculator
        </h3>
        <p className="text-gray-600">
          See how much you can save by choosing our solution over competitors
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">Compare Solutions</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Competitor
                </label>
                <select
                  value={selectedCompetitor}
                  onChange={(e) => setSelectedCompetitor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {competitors.map((competitor) => (
                    <option key={competitor.name} value={competitor.name.toLowerCase().replace(/\s+/g, '')}>
                      {competitor.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateSavings}
                disabled={isCalculating}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Savings'}
              </button>
            </div>
          </div>

          {/* Competitor Details */}
          {selectedCompetitorData && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4">{selectedCompetitorData.name} Details</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Cost:</span>
                  <span className="font-semibold text-gray-900">${selectedCompetitorData.monthlyCost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Cost:</span>
                  <span className="font-semibold text-gray-900">${selectedCompetitorData.annualCost}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Features:</h5>
                  <div className="space-y-1">
                    {selectedCompetitorData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-2">Limitations:</h5>
                  <div className="space-y-1">
                    {selectedCompetitorData.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-gray-600">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {!showResults ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to Calculate
              </h4>
              <p className="text-gray-600">
                Select a competitor and click "Calculate Savings" to see how much you can save
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Savings Summary */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Your Savings</h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${savings.toLocaleString()}
                  </div>
                  <div className="text-lg text-gray-700 mb-1">Annual Savings</div>
                  <div className="text-sm text-gray-600">{savingsPercentage}% less than {selectedCompetitorData?.name}</div>
                </div>
              </div>

              {/* Cost Comparison */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-gray-900">{selectedCompetitorData?.name}</span>
                    </div>
                    <div className="text-lg font-bold text-red-600">
                      ${selectedCompetitorData?.annualCost}
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-gray-900">Our Solution</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      $0
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI Calculation */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4">ROI Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">∞</div>
                    <div className="text-sm text-blue-800">ROI</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">100%</div>
                    <div className="text-sm text-purple-800">Cost Reduction</div>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Start Saving Today</h4>
                </div>
                <p className="text-sm text-blue-800 mb-4">
                  Switch to our free solution and save ${savings.toLocaleString()} per year while getting better features.
                </p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Get Free Solution
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
