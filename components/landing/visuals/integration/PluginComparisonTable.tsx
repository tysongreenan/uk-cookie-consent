'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Star, Zap, Shield, DollarSign } from '@phosphor-icons/react'

interface ComparisonFeature {
  id: string
  name: string
  description: string
  ourSolution: boolean | string
  cookiebot: boolean | string
  oneTrust: boolean | string
  category: 'performance' | 'compliance' | 'cost' | 'ease'
}

export function PluginComparisonTable() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isAnimating, setIsAnimating] = useState(false)

  const features: ComparisonFeature[] = [
    // Performance
    {
      id: 'load-time',
      name: 'Load Time',
      description: 'How fast the banner loads',
      ourSolution: '50ms',
      cookiebot: '200ms',
      oneTrust: '300ms',
      category: 'performance'
    },
    {
      id: 'bundle-size',
      name: 'Bundle Size',
      description: 'JavaScript file size',
      ourSolution: '2KB',
      cookiebot: '15KB',
      oneTrust: '25KB',
      category: 'performance'
    },
    {
      id: 'mobile-optimized',
      name: 'Mobile Optimized',
      description: 'Works perfectly on mobile devices',
      ourSolution: true,
      cookiebot: true,
      oneTrust: true,
      category: 'performance'
    },

    // Compliance
    {
      id: 'gdpr-compliant',
      name: 'GDPR Compliant',
      description: 'Meets all GDPR requirements',
      ourSolution: true,
      cookiebot: true,
      oneTrust: true,
      category: 'compliance'
    },
    {
      id: 'ccpa-compliant',
      name: 'CCPA Compliant',
      description: 'Meets California privacy law',
      ourSolution: true,
      cookiebot: true,
      oneTrust: true,
      category: 'compliance'
    },
    {
      id: 'pipeda-compliant',
      name: 'PIPEDA Compliant',
      description: 'Meets Canadian privacy law',
      ourSolution: true,
      cookiebot: false,
      oneTrust: false,
      category: 'compliance'
    },
    {
      id: 'consent-logging',
      name: 'Consent Logging',
      description: 'Records all consent decisions',
      ourSolution: true,
      cookiebot: true,
      oneTrust: true,
      category: 'compliance'
    },

    // Cost
    {
      id: 'free-tier',
      name: 'Free Tier',
      description: 'Free for small websites',
      ourSolution: 'Unlimited',
      cookiebot: '1 domain',
      oneTrust: 'No free tier',
      category: 'cost'
    },
    {
      id: 'pricing',
      name: 'Pricing',
      description: 'Cost for premium features',
      ourSolution: '$9/month',
      cookiebot: '$99/month',
      oneTrust: '$200/month',
      category: 'cost'
    },
    {
      id: 'setup-fee',
      name: 'Setup Fee',
      description: 'One-time setup cost',
      ourSolution: 'Free',
      cookiebot: '$500',
      oneTrust: '$1000',
      category: 'cost'
    },

    // Ease of Use
    {
      id: 'setup-time',
      name: 'Setup Time',
      description: 'Time to get running',
      ourSolution: '5 minutes',
      cookiebot: '2 hours',
      oneTrust: '1 day',
      category: 'ease'
    },
    {
      id: 'no-coding',
      name: 'No Coding Required',
      description: 'Works without technical knowledge',
      ourSolution: true,
      cookiebot: false,
      oneTrust: false,
      category: 'ease'
    },
    {
      id: 'customization',
      name: 'Easy Customization',
      description: 'Simple to customize appearance',
      ourSolution: true,
      cookiebot: false,
      oneTrust: false,
      category: 'ease'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Features', icon: Star },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'cost', name: 'Cost', icon: DollarSign }
  ]

  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory)

  const getFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )
    }
    return <span className="text-sm font-medium">{value}</span>
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat ? <cat.icon className="h-4 w-4" /> : null
  }

  const startAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Plugin Comparison — See the Difference
        </h3>
        <p className="text-gray-600">
          How we stack up against the competition
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Our Solution</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Cookiebot
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  OneTrust
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeatures.map((feature, index) => (
                <tr 
                  key={feature.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    isAnimating && index < 3 ? 'animate-pulse' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(feature.category)}
                      <div>
                        <div className="font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      {getFeatureValue(feature.ourSolution)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      {getFeatureValue(feature.cookiebot)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      {getFeatureValue(feature.oneTrust)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Performance</h4>
          </div>
          <p className="text-sm text-green-600">
            4x faster load time than competitors
          </p>
        </div>

        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Cost</h4>
          </div>
          <p className="text-sm text-blue-600">
            90% cheaper than enterprise solutions
          </p>
        </div>

        <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <h4 className="font-semibold text-purple-800">Compliance</h4>
          </div>
          <p className="text-sm text-purple-600">
            Covers all major privacy laws globally
          </p>
        </div>
      </div>

      {/* Animation Button */}
      <div className="text-center mt-8">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {isAnimating ? 'Highlighting Features...' : 'Highlight Key Differences'}
        </button>
      </div>
    </div>
  )
}
