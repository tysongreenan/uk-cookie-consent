'use client'

import { useState, useEffect } from 'react'
import { MapPin, Shield, AlertTriangle, CheckCircle, Globe, Crown } from 'lucide-react'

interface Region {
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

export function UKMapCompliance() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const regions: Region[] = [
    {
      id: 'england',
      name: 'England',
      code: 'ENG',
      status: 'compliant',
      law: 'UK GDPR + DPA 2018',
      fine: 'Up to £17.5M',
      description: 'UK GDPR with Data Protection Act 2018',
      x: 50,
      y: 60
    },
    {
      id: 'scotland',
      name: 'Scotland',
      code: 'SCT',
      status: 'compliant',
      law: 'UK GDPR + DPA 2018',
      fine: 'Up to £17.5M',
      description: 'UK GDPR with Scottish data protection',
      x: 45,
      y: 25
    },
    {
      id: 'wales',
      name: 'Wales',
      code: 'WLS',
      status: 'compliant',
      law: 'UK GDPR + DPA 2018',
      fine: 'Up to £17.5M',
      description: 'UK GDPR with Welsh data protection',
      x: 40,
      y: 55
    },
    {
      id: 'northern-ireland',
      name: 'Northern Ireland',
      code: 'NIR',
      status: 'compliant',
      law: 'UK GDPR + DPA 2018',
      fine: 'Up to £17.5M',
      description: 'UK GDPR with Northern Ireland data protection',
      x: 35,
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
          UK Privacy Law Compliance Map
        </h3>
        <p className="text-gray-600">
          Interactive map showing privacy laws across UK regions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="relative">
          <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-xl p-8 border border-gray-200 shadow-lg">
            <div className="relative w-full h-96">
              {/* UK Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-80 bg-white rounded-lg shadow-md border-2 border-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white"></div>
                  
                  {/* Region Dots */}
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region)}
                      className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-110 ${
                        selectedRegion?.id === region.id ? 'scale-125' : ''
                      } ${getStatusColor(region.status)} ${
                        isAnimating ? 'animate-pulse' : ''
                      }`}
                      style={{
                        left: `${region.x}%`,
                        top: `${region.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-xs font-bold text-white">
                        {region.code}
                      </span>
                    </button>
                  ))}

                  {/* Map Title */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-semibold text-gray-900">
                          United Kingdom
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
                <span className="text-sm text-gray-600">UK GDPR Compliant</span>
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

        {/* Region Details */}
        <div className="space-y-6">
          {selectedRegion ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                {getStatusIcon(selectedRegion.status)}
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedRegion.name}
                </h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Privacy Law</h5>
                  <p className="text-gray-600">{selectedRegion.law}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Maximum Fine</h5>
                  <p className="text-gray-600">{selectedRegion.fine}</p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-1">Requirements</h5>
                  <p className="text-gray-600">{selectedRegion.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Click a Region
              </h4>
              <p className="text-gray-600">
                Select any UK region on the map to see its privacy law requirements
              </p>
            </div>
          )}

          {/* Compliance Summary */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-4">
              Our Solution Covers All UK Regions
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">UK GDPR compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Data Protection Act 2018</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">ICO guidance compliance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-blue-800">Brexit transition support</span>
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
          {isAnimating ? 'Highlighting Compliance...' : 'Highlight All Regions'}
        </button>
      </div>
    </div>
  )
}
