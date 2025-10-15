import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support - Cookie Banner Generator',
  description: 'Get help with Cookie Banner Generator. Contact our support team for assistance with your cookie consent banners.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Support Center
            </h1>
            <p className="text-lg text-gray-600">
              We're here to help you create the perfect cookie consent banner
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email Support */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Email Support
                </h3>
                <p className="text-gray-600 mb-6">
                  Get personalized help from our support team. We typically respond within 24 hours.
                </p>
                <a
                  href="mailto:greenantyson@gmail.com"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  greenantyson@gmail.com
                </a>
              </div>
            </div>

            {/* Webflow Extension Support */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Webflow Extension Help
                </h3>
                <p className="text-gray-600 mb-6">
                  Having trouble with the Webflow Designer Extension? We can help you get it working.
                </p>
                <a
                  href="mailto:greenantyson@gmail.com?subject=Webflow Extension Support"
                  className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Extension Support
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How do I install the Webflow Extension?
                </h3>
                <p className="text-gray-600">
                  Install the extension from your Webflow workspace settings, then press 'E' in the Designer to launch it. 
                  Sign in with your Cookie Banner account to access your saved configurations.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Is my banner GDPR compliant?
                </h3>
                <p className="text-gray-600">
                  Yes! All banners generated through our platform are designed to meet GDPR, PIPEDA, CASL, and Quebec Law 25 requirements. 
                  We regularly update our templates to stay current with changing privacy laws.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Can I customize the banner colors and text?
                </h3>
                <p className="text-gray-600">
                  Absolutely! You can customize everything - colors, text, positioning, button labels, and more. 
                  Use the visual builder to see changes in real-time before generating your code.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What if I need help with my specific website?
                </h3>
                <p className="text-gray-600">
                  Our support team can help you implement the banner on your specific platform (WordPress, Shopify, custom sites, etc.). 
                  Just email us with your website details and we'll provide personalized guidance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do you offer custom banner development?
                </h3>
                <p className="text-gray-600">
                  Yes! For complex requirements or custom integrations, we can create tailored solutions. 
                  Contact us with your specific needs and we'll provide a custom quote.
                </p>
              </div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Quick Response Times
            </h2>
            <p className="text-lg mb-6 opacity-90">
              We pride ourselves on fast, helpful support
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">24h</div>
                <div className="text-blue-100">Email Response</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">48h</div>
                <div className="text-blue-100">Complex Issues</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Same Day</div>
                <div className="text-blue-100">Urgent Requests</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Get in Touch
            </h2>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                For any questions, issues, or feedback, we're here to help.
              </p>
              <a
                href="mailto:greenantyson@gmail.com"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                greenantyson@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
