'use client'

import { useState } from 'react'
import { DollarSign, Shield, Lock, Eye, EyeOff, TrendingUp, CreditCard, FileText } from 'lucide-react'

export function FinanceBannerDemo() {
  const [showBanner, setShowBanner] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Finance Cookie Banner Demo
        </h3>
        <p className="text-gray-600">
          See how our banner ensures financial compliance and data protection
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

      {/* Financial Website Mockup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-gray-900 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold">FinancePro</span>
            </div>
            <div className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 text-gray-300" />
              <span className="text-sm text-gray-300">Secure Banking</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-6">
            <a href="#" className="text-green-600 font-medium">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Accounts</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Investments</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Loans</a>
            <a href="#" className="text-gray-600 hover:text-green-600">Support</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Account Summary */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Account Overview
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-600 font-medium">Checking Account</p>
                    <p className="text-2xl font-bold text-green-900">$12,543.21</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-medium">Savings Account</p>
                    <p className="text-2xl font-bold text-blue-900">$45,230.87</p>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Transactions
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Grocery Store</p>
                          <p className="text-sm text-gray-600">Today, 2:30 PM</p>
                        </div>
                      </div>
                      <span className="font-medium text-red-600">-$87.45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Salary Deposit</p>
                          <p className="text-sm text-gray-600">Yesterday, 9:00 AM</p>
                        </div>
                      </div>
                      <span className="font-medium text-green-600">+$3,200.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Transfer Money
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Pay Bills
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    View Statements
                  </button>
                </div>
              </div>

              {/* Security Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Security Status</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Two-Factor Auth</span>
                    <span className="text-sm font-medium text-green-600">✓ Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">SSL Encryption</span>
                    <span className="text-sm font-medium text-green-600">✓ Secure</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fraud Protection</span>
                    <span className="text-sm font-medium text-green-600">✓ Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Overlay */}
        {showCompliance && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Financial Compliance</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">PCI DSS Compliance</span>
                  <span className="text-sm font-medium text-green-600">✓ Certified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SOX Compliance</span>
                  <span className="text-sm font-medium text-green-600">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data Encryption</span>
                  <span className="text-sm font-medium text-green-600">✓ AES-256</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Audit Trail</span>
                  <span className="text-sm font-medium text-green-600">✓ Complete</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                All financial data handling meets regulatory requirements
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
                  We protect your financial information with the highest security standards
                </h4>
                <p className="text-sm text-gray-600">
                  We use cookies to improve your banking experience while maintaining strict 
                  financial compliance and data protection.
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
          <h4 className="font-semibold text-green-800 mb-2">Financial Compliance</h4>
          <p className="text-sm text-green-600">
            Meets PCI DSS, SOX, and other financial regulations
          </p>
        </div>

        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-800 mb-2">Data Protection</h4>
          <p className="text-sm text-blue-600">
            Bank-level encryption and security measures
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <FileText className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-purple-800 mb-2">Audit Trail</h4>
          <p className="text-sm text-purple-600">
            Complete transaction and consent logging
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
          Get My Finance Banner
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Bank-level security in minutes
        </p>
      </div>
    </div>
  )
}
