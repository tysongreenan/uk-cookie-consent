'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Eye, EyeOff } from '@phosphor-icons/react'

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = (x / rect.width) * 100
          setSliderPosition(Math.max(0, Math.min(100, percentage)))
        }
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Before vs After — See the Transformation
        </h3>
        <p className="text-gray-600">
          Drag the slider to see how your website looks with and without our cookie banner
        </p>
      </div>

      {/* Before/After Labels */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <EyeOff className="h-5 w-5 text-red-500" />
          <span className="font-semibold text-red-600">Before: No Cookie Banner</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-green-500" />
          <span className="font-semibold text-green-600">After: GDPR Compliant</span>
        </div>
      </div>

      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-lg cursor-col-resize"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Your Website</h4>
              <p className="text-sm">No cookie banner</p>
              <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-200">
                <p className="text-sm text-red-600 font-medium">
                  ❌ Not GDPR Compliant
                </p>
                <p className="text-xs text-red-500">
                  Risk of €20M+ fines
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* After Image (Overlay) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-blue-800">
              <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🍪</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">With Cookie Banner</h4>
              <p className="text-sm">GDPR compliant</p>
              <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-medium">
                  ✅ GDPR Compliant
                </p>
                <p className="text-xs text-green-500">
                  Protected from fines
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div className="flex space-x-1">
              <ChevronLeft className="h-3 w-3 text-white" />
              <ChevronRight className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>

        {/* Slider Line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          👆 Drag the slider to see the difference
        </p>
      </div>

      {/* Benefits Comparison */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-red-50 rounded-xl border border-red-200">
          <h4 className="font-semibold text-red-800 mb-3 flex items-center">
            <EyeOff className="h-5 w-5 mr-2" />
            Without Cookie Banner
          </h4>
          <ul className="space-y-2 text-sm text-red-600">
            <li>• ❌ Not GDPR compliant</li>
            <li>• ❌ Risk of €20M+ fines</li>
            <li>• ❌ No user consent tracking</li>
            <li>• ❌ Legal liability</li>
            <li>• ❌ Poor user experience</li>
          </ul>
        </div>

        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            With Cookie Banner
          </h4>
          <ul className="space-y-2 text-sm text-green-600">
            <li>• ✅ GDPR compliant</li>
            <li>• ✅ Protected from fines</li>
            <li>• ✅ Consent tracking</li>
            <li>• ✅ Legal protection</li>
            <li>• ✅ Better user experience</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Get Your Cookie Banner Now
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  )
}
