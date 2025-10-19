'use client'

import { useState, useEffect } from 'react'
import { MapPin, Shield, AlertTriangle, CheckCircle, Globe, Star } from 'lucide-react'

interface State {
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

export function USMapCompliance() {
  const [selectedState, setSelectedState] = useState<State | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const states: State[] = [
    {
      id: 'california',
      name: 'California',
      code: 'CA',
      status: 'warning',
      law: 'CCPA + CPRA',
      fine: 'Up to $7,500',
      description: 'California Consumer Privacy Act with enhanced rights',
      x: 15,
      y: 40
    },
    {
      id: 'virginia',
      name: 'Virginia',
      code: 'VA',
      status: 'compliant',
      law: 'VCDPA',
      fine: 'Up to $7,500',
      description: 'Virginia Consumer Data Protection Act',
      x: 75,
      y: 45
    },
    {
      id: 'colorado',
      name: 'Colorado',
      code: 'CO',
      status: 'compliant',
      law: 'CPA',
      fine: 'Up to $20,000',
      description: 'Colorado Privacy Act',
      x: 35,
      y: 35
    },
    {
      id: 'connecticut',
      name: 'Connecticut',
      code: 'CT',
      status: 'compliant',
      law: 'CTDPA',
      fine: 'Up to $5,000',
      description: 'Connecticut Data Privacy Act',
      x: 80,
      y: 30
    },
    {
      id: 'utah',
      name: 'Utah',
      code: 'UT',
      status: 'compliant',
      law: 'UCPA',
      fine: 'Up to $7,500',
      description: 'Utah Consumer Privacy Act',
      x: 25,
      y: 35
    },
    {
      id: 'texas',
      name: 'Texas',
      code: 'TX',
      status: 'compliant',
      law: 'TDPSA',
      fine: 'Up to $7,500',
      description: 'Texas Data Privacy and Security Act',
      x: 40,
      y: 50
    },
    {
      id: 'florida',
      name: 'Florida',
      code: 'FL',
      status: 'compliant',
      law: 'FDBR',
      fine: 'Up to $50,000',
      description: 'Florida Digital Bill of Rights',
      x: 75,
      y: 60
    },
    {
      id: 'oregon',
      name: 'Oregon',
      code: 'OR',
      status: 'compliant',
      law: 'OPA',
      fine: 'Up to $7,500',
      description: 'Oregon Privacy Act',
      x: 10,
      y: 25
    },
    {
      id: 'montana',
      name: 'Montana',
      code: 'MT',
      status: 'compliant',
      law: 'MCDPA',
      fine: 'Up to $7,500',
      description: 'Montana Consumer Data Privacy Act',
      x: 30,
      y: 20
    },
    {
      id: 'tennessee',
      name: 'Tennessee',
      code: 'TN',
      status: 'compliant',
      law: 'TIPA',
      fine: 'Up to $7,500',
      description: 'Tennessee Information Protection Act',
      x: 65,
      y: 45
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
          US Privacy Law Compliance Map
        </h3>
        <p className="text-gray-600">
          Interactive map showing privacy laws across US states
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="relative w-full h-96">
              {/* US Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-80 bg-white rounded-lg shadow-md border-2 border-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white"></div>
                  
                  {/* State Dots */}
                  {states.map((state) => (
                    <button
                      key={state.id}
                      onClick={() => setSelectedState(state)}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 ${
                        selectedState?.id === state.id ? 'scale-125' : ''
                      } ${getStatusColor(state.status)} ${
                        isAnimating ? 'animate-pulse' : ''
                      }`}
                      style={{
                        left: `${state.x}%`,
                        top: `${state.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-xs font-bold text-white">
                        {state.code}
                      </span>
                    </button>
                  ))}

                  {/* Map Title */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          United States
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
                <span className="text-sm text-gray-600">Privacy Law Active</span>
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

        {/* State Details */}
        <div className="space-y-6">
          {selectedState ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                {getStatusIcon(selectedState.status)}
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedState.name}
                </h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Privacy Law</h5>
                  <p className="text-gray-600">{selectedState.law}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Maximum Fine</h5>
                  <p className="text-gray-600">{selectedState.fine}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Requirements</h5>
                  <p className="text-gray-600">{selectedState.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Click a State
              </h4>
              <p className="text-gray-600">
                Select any US state on the map to see its privacy law requirements
              </p>
            </div>
          )}

          {/* Compliance Summary */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">
              Our Solution Covers All US States
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">CCPA compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">State privacy laws</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">"Do Not Sell" button</span>
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
          {isAnimating ? 'Highlighting Compliance...' : 'Highlight All States'}
        </button>
      </div>
    </div>
  )
}
