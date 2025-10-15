import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Banner Generator - Demo',
  description: 'Watch our Cookie Banner Generator in action',
  robots: 'noindex, nofollow', // Keep hidden from search engines
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cookie Banner Generator - Demo
            </h1>
            <p className="text-lg text-gray-600">
              Watch how easy it is to create GDPR and PIPEDA compliant cookie banners in Webflow
            </p>
          </div>

          {/* Video Container */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="aspect-video w-full relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/6wZ947TgoUE?rel=0&modestbranding=1"
                title="Cookie Banner Generator Webflow Extension Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg"
              />
              {/* Fallback message if video is blocked */}
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-center p-6">
                  <p className="text-gray-600 mb-4">Video not loading?</p>
                  <a
                    href="https://www.youtube.com/watch?v=6wZ947TgoUE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Description */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What You'll See in This Demo
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  🎨 Visual Banner Builder
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Real-time preview as you customize</li>
                  <li>• Color picker for brand matching</li>
                  <li>• Multiple positioning options</li>
                  <li>• Custom text and button labels</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  🔐 Account Integration
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Sign in with existing accounts</li>
                  <li>• Sync configurations across platforms</li>
                  <li>• Save multiple banner designs</li>
                  <li>• Access from anywhere</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  💻 Webflow Integration
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Direct code insertion into elements</li>
                  <li>• Copy to clipboard functionality</li>
                  <li>• Seamless Designer workflow</li>
                  <li>• No external dependencies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  ⚖️ Legal Compliance
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• GDPR compliant for Europe</li>
                  <li>• PIPEDA/CASL compliant for Canada</li>
                  <li>• Quebec Law 25 compliant</li>
                  <li>• Professional privacy integration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Visual Builder</h3>
                <p className="text-gray-600 text-sm">Create beautiful banners with live preview and no coding required</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Legal Compliance</h3>
                <p className="text-gray-600 text-sm">Built-in GDPR, PIPEDA, CASL, and Quebec Law 25 compliance</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Webflow Native</h3>
                <p className="text-gray-600 text-sm">Direct integration with Webflow Designer workflow</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 mt-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Install the Cookie Banner Generator extension in your Webflow workspace today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Free Account
              </a>
              <a
                href="/"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-gray-100 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Technical Specifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>File Size:</strong> 5.2KB bundle
              </div>
              <div>
                <strong>Compatibility:</strong> All modern browsers
              </div>
              <div>
                <strong>Performance:</strong> Lightweight, no external dependencies
              </div>
              <div>
                <strong>Updates:</strong> Automatic via Webflow
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
