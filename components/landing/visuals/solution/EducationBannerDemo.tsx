'use client'

import { useState } from 'react'
import { GraduationCap, BookOpen, Users, Shield, Eye, EyeOff, TrendingUp, FileText } from 'lucide-react'

export function EducationBannerDemo() {
  const [showBanner, setShowBanner] = useState(false)
  const [showCompliance, setShowCompliance] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Education Cookie Banner Demo
        </h3>
        <p className="text-gray-600">
          See how our banner works on educational platforms and student portals
        </p>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setShowBanner(!showBanner)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showBanner 
              ? 'bg-blue-500 text-white' 
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
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showCompliance ? 'Hide Compliance' : 'Show Compliance'}
        </button>
      </div>

      {/* Education Platform Mockup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-semibold">EduLearn Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Users className="h-5 w-5 text-blue-200" />
              <span className="text-sm text-blue-200">Student Portal</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-6">
            <a href="#" className="text-blue-600 font-medium">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Courses</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Assignments</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Grades</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Resources</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Dashboard */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome back, Alex!
                </h1>
                <p className="text-gray-600">
                  Continue your learning journey. You have 3 assignments due this week.
                </p>
              </div>

              {/* Course Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Courses
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Introduction to Web Development</h4>
                      <span className="text-sm text-blue-600">85% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Next: React Components</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">Data Science Fundamentals</h4>
                      <span className="text-sm text-green-600">60% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Next: Statistical Analysis</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Completed: JavaScript Basics</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Quiz Score: 92%</p>
                        <p className="text-sm text-gray-600">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Assignments */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Upcoming Assignments
                </h3>
                <div className="space-y-3">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="font-medium text-gray-900">React Project</p>
                    <p className="text-sm text-orange-600">Due in 3 days</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="font-medium text-gray-900">Data Analysis</p>
                    <p className="text-sm text-yellow-600">Due in 5 days</p>
                  </div>
                </div>
              </div>

              {/* Student Resources */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    📚 Course Materials
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    💬 Discussion Forum
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    📊 Grade Book
                  </a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">
                    🎓 Certificates
                  </a>
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
                <Shield className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Education Compliance</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">FERPA Compliance</span>
                  <span className="text-sm font-medium text-green-600">✓ Protected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Student Privacy</span>
                  <span className="text-sm font-medium text-green-600">✓ Secured</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">COPPA Compliance</span>
                  <span className="text-sm font-medium text-green-600">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Learning Analytics</span>
                  <span className="text-sm font-medium text-green-600">✓ Compliant</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                All student data handling meets educational privacy requirements
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
                  We use cookies to enhance your learning experience
                </h4>
                <p className="text-sm text-gray-600">
                  We use cookies to track your progress and provide personalized learning 
                  recommendations while protecting your educational privacy.
                </p>
              </div>
              <div className="flex items-center space-x-3 ml-6">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Privacy Settings
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Accept & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-blue-800 mb-2">FERPA Compliant</h4>
          <p className="text-sm text-blue-600">
            Meets all educational privacy requirements
          </p>
        </div>

        <div className="text-center p-6 bg-green-50 rounded-xl">
          <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-green-800 mb-2">Learning Analytics</h4>
          <p className="text-sm text-green-600">
            Track progress while protecting student privacy
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-purple-800 mb-2">Education Ready</h4>
          <p className="text-sm text-purple-600">
            Perfect for schools and online learning platforms
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Get My Education Banner
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Student privacy protected in minutes
        </p>
      </div>
    </div>
  )
}
