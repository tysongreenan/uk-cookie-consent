'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react'

interface TextExample {
  id: string
  title: string
  text: string
  isGood: boolean
  explanation: string
}

export function BannerTextPreview() {
  const [activeExample, setActiveExample] = useState<'bad' | 'good'>('bad')

  const badExamples: TextExample[] = [
    {
      id: 'legal-jargon',
      title: 'Legal Jargon',
      text: 'This website utilizes cookies and similar tracking technologies in accordance with applicable data protection legislation to enhance user experience and provide personalized content delivery mechanisms.',
      isGood: false,
      explanation: 'Too complex and legalistic. Users won\'t understand what they\'re agreeing to.'
    },
    {
      id: 'vague',
      title: 'Vague Language',
      text: 'We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.',
      isGood: false,
      explanation: 'Doesn\'t explain what cookies are used for or give users control.'
    },
    {
      id: 'forced',
      title: 'Forced Acceptance',
      text: 'This site uses cookies. You must accept cookies to continue using this website.',
      isGood: false,
      explanation: 'Forces acceptance without giving users a real choice.'
    }
  ]

  const goodExamples: TextExample[] = [
    {
      id: 'clear-simple',
      title: 'Clear & Simple',
      text: 'We use cookies to make our website work better for you. You can choose which cookies to allow.',
      isGood: true,
      explanation: 'Plain language that explains the purpose and gives users control.'
    },
    {
      id: 'specific',
      title: 'Specific Purpose',
      text: 'We use cookies to remember your preferences and show you relevant ads. You can turn off non-essential cookies.',
      isGood: true,
      explanation: 'Explains exactly what cookies are used for and offers granular control.'
    },
    {
      id: 'friendly',
      title: 'Friendly Tone',
      text: 'Hi! We use a few cookies to make this site work smoothly. You can customize which ones you\'re comfortable with.',
      isGood: true,
      explanation: 'Friendly, approachable tone that builds trust and explains the benefit.'
    }
  ]

  const currentExamples = activeExample === 'bad' ? badExamples : goodExamples

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Banner Text Comparison
        </h3>
        <p className="text-gray-600">
          See how different wording affects user trust and compliance
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveExample('bad')}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              activeExample === 'bad'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ❌ Bad Examples
          </button>
          <button
            onClick={() => setActiveExample('good')}
            className={`px-6 py-2 rounded-md transition-all duration-300 ${
              activeExample === 'good'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ✅ Good Examples
          </button>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {currentExamples.map((example) => (
          <div key={example.id} className="relative">
            <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              example.isGood
                ? 'bg-green-50 border-green-200 hover:border-green-300'
                : 'bg-red-50 border-red-200 hover:border-red-300'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">
                  {example.title}
                </h4>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  example.isGood ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {example.isGood ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <XCircle className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>

              {/* Banner Preview */}
              <div className="mb-4">
                <div className={`p-4 rounded-lg border ${
                  example.isGood 
                    ? 'bg-white border-green-200' 
                    : 'bg-white border-red-200'
                }`}>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {example.text}
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className={`px-3 py-1 rounded text-xs font-medium ${
                      example.isGood
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {example.isGood ? 'Accept' : 'Accept All'}
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600">
                      {example.isGood ? 'Customize' : 'Reject'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="text-sm text-gray-600">
                <strong>Why {example.isGood ? 'this works' : 'this fails'}:</strong> {example.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Principles */}
      <div className="mt-8 p-6 rounded-xl border-2 text-center">
        {activeExample === 'bad' ? (
          <div className="bg-red-50 border-red-200">
            <XCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-red-800 mb-2">
              What Makes Text Bad
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-red-600">
              <div>• Legal jargon</div>
              <div>• Vague purposes</div>
              <div>• No user control</div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border-green-200">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-green-800 mb-2">
              What Makes Text Good
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-green-600">
              <div>• Plain language</div>
              <div>• Clear purposes</div>
              <div>• User control</div>
            </div>
          </div>
        )}
      </div>

      {/* Writing Tips */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <h5 className="font-semibold text-red-800 mb-2">❌ Avoid These</h5>
          <ul className="text-sm text-red-600 space-y-1">
            <li>• "In accordance with applicable legislation"</li>
            <li>• "By continuing to use this site..."</li>
            <li>• "We reserve the right to..."</li>
            <li>• Technical jargon users don't understand</li>
          </ul>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h5 className="font-semibold text-green-800 mb-2">✅ Use These Instead</h5>
          <ul className="text-sm text-green-600 space-y-1">
            <li>• "We use cookies to..."</li>
            <li>• "You can choose which cookies..."</li>
            <li>• "This helps us..."</li>
            <li>• Simple, friendly language</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
