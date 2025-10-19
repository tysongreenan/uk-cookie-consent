'use client'

import { useState, useEffect } from 'react'
import { MapPin, Shield, AlertTriangle, CheckCircle, Globe, Star } from 'lucide-react'

interface Country {
  id: string
  name: string
  code: string
  status: 'compliant' | 'warning' | 'non-compliant'
  law: string
  fine: string
  description: string
  x: number
  y: number
}

export function EUMapCompliance() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const countries: Country[] = [
    {
      id: 'germany',
      name: 'Germany',
      code: 'DE',
      status: 'compliant',
      law: 'GDPR + BDSG',
      fine: 'Up to €20M',
      description: 'GDPR with German data protection law',
      x: 50,
      y: 30
    },
    {
      id: 'france',
      name: 'France',
      code: 'FR',
      status: 'compliant',
      law: 'GDPR + CNIL',
      fine: 'Up to €20M',
      description: 'GDPR with CNIL enforcement',
      x: 45,
      y: 35
    },
    {
      id: 'spain',
      name: 'Spain',
      code: 'ES',
      status: 'compliant',
      law: 'GDPR + LOPD',
      fine: 'Up to €20M',
      description: 'GDPR with Spanish data protection',
      x: 40,
      y: 40
    },
    {
      id: 'italy',
      name: 'Italy',
      code: 'IT',
      status: 'compliant',
      law: 'GDPR + Privacy Code',
      fine: 'Up to €20M',
      description: 'GDPR with Italian privacy code',
      x: 55,
      y: 45
    },
    {
      id: 'netherlands',
      name: 'Netherlands',
      code: 'NL',
      status: 'compliant',
      law: 'GDPR + AVG',
      fine: 'Up to €20M',
      description: 'GDPR with Dutch implementation',
      x: 48,
      y: 25
    },
    {
      id: 'belgium',
      name: 'Belgium',
      code: 'BE',
      status: 'compliant',
      law: 'GDPR',
      fine: 'Up to €20M',
      description: 'Standard GDPR compliance',
      x: 47,
      y: 30
    },
    {
      id: 'austria',
      name: 'Austria',
      code: 'AT',
      status: 'compliant',
      law: 'GDPR + DSG',
      fine: 'Up to €20M',
      description: 'GDPR with Austrian data protection',
      x: 52,
      y: 35
    },
    {
      id: 'poland',
      name: 'Poland',
      code: 'PL',
      status: 'compliant',
      law: 'GDPR + RODO',
      fine: 'Up to €20M',
      description: 'GDPR with Polish implementation',
      x: 58,
      y: 30
    },
    {
      id: 'czech',
      name: 'Czech Republic',
      code: 'CZ',
      status: 'compliant',
      law: 'GDPR',
      fine: 'Up to €20M',
      description: 'Standard GDPR compliance',
      x: 54,
      y: 35
    },
    {
      id: 'sweden',
      name: 'Sweden',
      code: 'SE',
      status: 'compliant',
      law: 'GDPR + PUL',
      fine: 'Up to €20M',
      description: 'GDPR with Swedish privacy law',
      x: 52,
      y: 15
    },
    {
      id: 'denmark',
      name: 'Denmark',
      code: 'DK',
      status: 'compliant',
      law: 'GDPR',
      fine: 'Up to €20M',
      description: 'Standard GDPR compliance',
      x: 50,
      y: 20
    },
    {
      id: 'finland',
      name: 'Finland',
      code: 'FI',
      status: 'compliant',
      law: 'GDPR',
      fine: 'Up to €20M',
      description: 'Standard GDPR compliance',
      x: 55,
      y: 10
    }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'non-compliant':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'non-compliant':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Shield className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          EU Privacy Law Compliance Map
        </h3>
        <p className="text-gray-600">
          Interactive map showing GDPR compliance across European Union countries
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="relative w-full h-96">
              {/* EU Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-80 bg-white rounded-lg shadow-md border-2 border-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
                  
                  {/* Country Dots */}
                  {countries.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => setSelectedCountry(country)}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 ${
                        selectedCountry?.id === country.id ? 'scale-125' : ''
                      } ${getStatusColor(country.status)} ${
                        isAnimating ? 'animate-pulse' : ''
                      }`}
                      style={{
                        left: `${country.x}%`,
                        top: `${country.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-xs font-bold text-white">
                        {country.code}
                      </span>
                    </button>
                  ))}

                  {/* Map Title */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          European Union GDPR
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Enhanced Requirements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Strict Compliance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Country Details */}
        <div className="space-y-6">
          {selectedCountry ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                {getStatusIcon(selectedCountry.status)}
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedCountry.name}
                </h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Privacy Law</h5>
                  <p className="text-gray-600">{selectedCountry.law}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Maximum Fine</h5>
                  <p className="text-gray-600">{selectedCountry.fine}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Requirements</h5>
                  <p className="text-gray-600">{selectedCountry.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Click a Country
              </h4>
              <p className="text-gray-600">
                Select any EU country on the map to see its privacy law requirements
              </p>
            </div>
          )}

          {/* Compliance Summary */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">
              Our Solution Covers All EU Countries
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Full GDPR compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">27 EU countries covered</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Multilingual support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Automatic updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Button */}
      <div className="text-center mt-8">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {isAnimating ? 'Highlighting Compliance...' : 'Highlight All Countries'}
        </button>
      </div>
    </div>
  )
}
