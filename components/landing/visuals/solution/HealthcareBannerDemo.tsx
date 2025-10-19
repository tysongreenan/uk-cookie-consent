'use client'

import { useState } from 'react'
import { Heart, Shield, Lock, Eye, EyeOff, Stethoscope, FileText } from 'lucide-react'

export function HealthcareBannerDemo() {
  const [showBanner, setShowBanner] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Healthcare Cookie Banner Demo
        </h3>
        <p className="text-gray-600">
          See how our banner ensures HIPAA compliance on healthcare websites
        </p>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setShowBanner(!showBanner)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showBanner 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showBanner ? <Eye className="h-4 w-4 mr-2 inline" /> : <EyeOff className="h-4 w-4 mr-2 inline" />}
          {showBanner ? 'Hide Banner' : 'Show Banner'}
        </button>
        <button
          onClick={() => setShowCompliance(!showCompliance)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showCompliance 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showCompliance ? 'Hide Compliance' : 'Show Compliance'}
        </button>
      </div>

      {/* Healthcare Website Mockup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">MediCare Clinic</span>
            </div>
            <div className="flex items-center space-x-4">
              <Stethoscope className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Emergency: (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-6">
            <a href="#" className="text-green-600 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Services</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Doctors</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Appointments</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Your Health, Our Priority
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Comprehensive healthcare services with compassionate care. 
                  Book your appointment online or call us today.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Book Appointment
                  </button>
                  <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Services */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Cardiology</h3>
                  <p className="text-sm text-gray-600">Heart health services</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Stethoscope className="h-6 w-6 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">General Medicine</h3>
                  <p className="text-sm text-gray-600">Primary care services</p>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Schedule Your Visit
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Request Appointment
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Compliance Overlay */}
        {showCompliance && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">HIPAA Compliance</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Patient Data Protection</span>
                  <span className="text-sm font-medium text-green-600">✓ Secured</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Consent Tracking</span>
                  <span className="text-sm font-medium text-green-600">✓ Recorded</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Analytics Privacy</span>
                  <span className="text-sm font-medium text-green-600">✓ Protected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Audit Trail</span>
                  <span className="text-sm font-medium text-green-600">✓ Maintained</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                All patient data handling meets HIPAA requirements
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  We respect your privacy and protect your health information
                </h4>
                <p className="text-sm text-gray-600">
                  We use cookies to improve your experience while maintaining HIPAA compliance. 
                  Your health information is always protected.
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-6">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Privacy Settings
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Accept & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-green-50 rounded-xl">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-green-800 mb-2">HIPAA Compliant</h4>
          <p className="text-sm text-green-600">
            Meets all healthcare privacy requirements
          </p>
        </div>

        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-800 mb-2">Patient Data Protected</h4>
          <p className="text-sm text-blue-600">
            Ensures patient information stays secure
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-purple-800 mb-2">Audit Trail</h4>
          <p className="text-sm text-purple-600">
            Complete consent logging for compliance
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
          Get My Healthcare Banner
        </button>
        <p className="text-sm text-gray-500 mt-2">
          HIPAA-ready in minutes
        </p>
      </div>
    </div>
  )
}
