'use client'

import { useState, useEffect } from 'react'
import { MapPin, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react'

interface Province {
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

export function CanadaMapCompliance() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const provinces: Province[] = [
    {
      id: 'ontario',
      name: 'Ontario',
      code: 'ON',
      status: 'compliant',
      law: 'PIPEDA + Provincial',
      fine: 'Up to $100K',
      description: 'Full PIPEDA compliance required',
      x: 60,
      y: 30
    },
    {
      id: 'quebec',
      name: 'Quebec',
      code: 'QC',
      status: 'warning',
      law: 'Law 25 (Stricter)',
      fine: 'Up to $25M',
      description: 'Enhanced privacy requirements',
      x: 70,
      y: 25
    },
    {
      id: 'alberta',
      name: 'Alberta',
      code: 'AB',
      status: 'compliant',
      law: 'PIPA',
      fine: 'Up to $100K',
      description: 'Alberta PIPA compliance',
      x: 25,
      y: 35
    },
    {
      id: 'bc',
      name: 'British Columbia',
      code: 'BC',
      status: 'compliant',
      law: 'PIPA',
      fine: 'Up to $100K',
      description: 'BC PIPA compliance',
      x: 15,
      y: 20
    },
    {
      id: 'manitoba',
      name: 'Manitoba',
      code: 'MB',
      status: 'compliant',
      law: 'PIPEDA',
      fine: 'Up to $100K',
      description: 'Standard PIPEDA compliance',
      x: 35,
      y: 40
    },
    {
      id: 'saskatchewan',
      name: 'Saskatchewan',
      code: 'SK',
      status: 'compliant',
      law: 'PIPEDA',
      fine: 'Up to $100K',
      description: 'Standard PIPEDA compliance',
      x: 30,
      y: 45
    },
    {
      id: 'nova-scotia',
      name: 'Nova Scotia',
      code: 'NS',
      status: 'compliant',
      law: 'PIPEDA',
      fine: 'Up to $100K',
      description: 'Standard PIPEDA compliance',
      x: 85,
      y: 15
    },
    {
      id: 'new-brunswick',
      name: 'New Brunswick',
      code: 'NB',
      status: 'compliant',
      law: 'PIPEDA',
      fine: 'Up to $100K',
      description: 'Standard PIPEDA compliance',
      x: 80,
      y: 20
    },
    {
      id: 'pei',
      name: 'Prince Edward Island',
      code: 'PE',
      status: 'compliant',
      law: 'PIPEDA',
      fine: 'Up to $100K',
      description: 'Standard PIPEDA compliance',
      x: 90,
      y: 18
    },
    {
      id: 'newfoundland',
      name: 'Newfoundland',
      code: 'NL',
      status: 'compliant',
      law: 'PIPEDA',
      fine: 'Up to $100K',
      description: 'Standard PIPEDA compliance',
      x: 75,
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
          Canadian Privacy Law Compliance Map
        </h3>
        <p className="text-gray-600">
          Interactive map showing privacy laws across Canadian provinces
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="relative w-full h-96">
              {/* Canada Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-80 bg-white rounded-lg shadow-md border-2 border-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white"></div>
                  
                  {/* Province Dots */}
                  {provinces.map((province) => (
                    <button
                      key={province.id}
                      onClick={() => setSelectedProvince(province)}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 ${
                        selectedProvince?.id === province.id ? 'scale-125' : ''
                      } ${getStatusColor(province.status)} ${
                        isAnimating ? 'animate-pulse' : ''
                      }`}
                      style={{
                        left: `${province.x}%`,
                        top: `${province.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-xs font-bold text-white">
                        {province.code}
                      </span>
                    </button>
                  ))}

                  {/* Map Title */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          Canadian Privacy Laws
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
                <span className="text-sm text-gray-600">PIPEDA Compliant</span>
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

        {/* Province Details */}
        <div className="space-y-6">
          {selectedProvince ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                {getStatusIcon(selectedProvince.status)}
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedProvince.name}
                </h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Privacy Law</h5>
                  <p className="text-gray-600">{selectedProvince.law}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Maximum Fine</h5>
                  <p className="text-gray-600">{selectedProvince.fine}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Requirements</h5>
                  <p className="text-gray-600">{selectedProvince.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Click a Province
              </h4>
              <p className="text-gray-600">
                Select any province on the map to see its privacy law requirements
              </p>
            </div>
          )}

          {/* Compliance Summary */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">
              Our Solution Covers All Provinces
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Automatic PIPEDA compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Quebec Law 25 support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Bilingual banner support</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Provincial law updates</span>
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
          {isAnimating ? 'Highlighting Compliance...' : 'Highlight All Provinces'}
        </button>
      </div>
    </div>
  )
}
