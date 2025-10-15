import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Cookie Banner Generator',
  description: 'Terms of Service for Cookie Banner Generator. Read our terms and conditions for using our cookie consent banner service.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-gray max-w-none">
              
              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Cookie Banner Generator ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website, 
                  services, and products, including but not limited to our cookie consent banner generation tools and Webflow Designer Extension.
                </p>
                <p className="text-gray-600">
                  By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, 
                  then you may not access the service.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By creating an account, using our services, or accessing our website, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and our Privacy Policy.
                </p>
                <p className="text-gray-600">
                  These Terms apply to all visitors, users, and others who access or use the service.
                </p>
              </section>

              {/* Service Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Service Description</h2>
                <p className="text-gray-600 mb-4">
                  Cookie Banner Generator provides tools and services to help website owners create compliant cookie consent banners. 
                  Our services include:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Cookie banner generation tools and templates</li>
                  <li>Webflow Designer Extension</li>
                  <li>GDPR, PIPEDA, CASL, and Quebec Law 25 compliance guidance</li>
                  <li>Account management and banner storage</li>
                  <li>Code generation and customization tools</li>
                </ul>
                <p className="text-gray-600">
                  We reserve the right to modify, suspend, or discontinue any part of our services at any time with or without notice.
                </p>
              </section>

              {/* User Accounts */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts</h2>
                <p className="text-gray-600 mb-4">
                  To access certain features of our service, you may need to create an account. You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Providing accurate and complete information during registration</li>
                  <li>Maintaining the security of your account and password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>
                <p className="text-gray-600">
                  We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
                </p>
              </section>

              {/* Acceptable Use */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use</h2>
                <p className="text-gray-600 mb-4">
                  You agree not to use our services for any unlawful purpose or in any way that could damage, disable, 
                  overburden, or impair our services. Prohibited activities include:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Infringing on intellectual property rights</li>
                  <li>Transmitting viruses or malicious code</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Using our services to compete with us</li>
                  <li>Creating fake or misleading banner content</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  The service and its original content, features, and functionality are owned by Cookie Banner Generator 
                  and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-600 mb-4">
                  You retain ownership of any content you create using our tools. By using our services, you grant us 
                  a limited license to store, process, and display your content as necessary to provide our services.
                </p>
                <p className="text-gray-600">
                  You may not copy, modify, distribute, sell, or lease any part of our services without our written permission.
                </p>
              </section>

              {/* Privacy and Data */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-600 mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information. 
                  By using our services, you agree to the collection and use of information in accordance with our Privacy Policy.
                </p>
                <p className="text-gray-600">
                  We are committed to helping you comply with privacy laws, but you are ultimately responsible for ensuring 
                  your website's compliance with applicable regulations.
                </p>
              </section>

              {/* Service Availability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
                <p className="text-gray-600 mb-4">
                  We strive to maintain high availability of our services, but we cannot guarantee uninterrupted access. 
                  We may experience downtime due to maintenance, updates, or technical issues.
                </p>
                <p className="text-gray-600">
                  We reserve the right to modify or discontinue any part of our services with reasonable notice.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  To the fullest extent permitted by law, Cookie Banner Generator shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
                  data, use, goodwill, or other intangible losses.
                </p>
                <p className="text-gray-600">
                  Our total liability to you for any damages arising from or related to these terms or our services 
                  shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </section>

              {/* Disclaimer */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Disclaimer</h2>
                <p className="text-gray-600 mb-4">
                  Our services are provided "as is" and "as available" without warranties of any kind. While we strive 
                  to provide accurate compliance guidance, we cannot guarantee that our tools will ensure full legal compliance.
                </p>
                <p className="text-gray-600">
                  You are responsible for consulting with legal professionals to ensure your website meets all applicable 
                  legal requirements in your jurisdiction.
                </p>
              </section>

              {/* Termination */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your account and access to our services immediately, without prior notice, 
                  for any reason, including if you breach these Terms.
                </p>
                <p className="text-gray-600">
                  Upon termination, your right to use the service will cease immediately. All provisions of these Terms 
                  that by their nature should survive termination shall survive.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes 
                  via email or through our service.
                </p>
                <p className="text-gray-600">
                  Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be interpreted and governed by the laws of Canada, without regard to conflict of law principles.
                </p>
                <p className="text-gray-600">
                  Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction 
                  of the courts of Canada.
                </p>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">
                    <strong>Email:</strong> <a href="mailto:greenantyson@gmail.com" className="text-blue-600 hover:underline">greenantyson@gmail.com</a>
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Website:</strong> <a href="https://www.cookie-banner.ca" className="text-blue-600 hover:underline">https://www.cookie-banner.ca</a>
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
