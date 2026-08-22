import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - Cookie Banner Generator',
  description:
    'How Cookie Banner collects, uses, stores, and protects personal information under PIPEDA and Quebec Law 25, including data residency and your privacy rights.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: August 22, 2026
            </p>
          </div>

          {/* Policy Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-gray max-w-none">

              {/* Introduction */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Who We Are</h2>
                <p className="text-gray-600 mb-4">
                  Cookie Banner (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a Montreal-based software company operating
                  cookie-banner.ca. We provide cookie consent banner tools that help website owners meet their
                  obligations under privacy laws such as PIPEDA, Quebec Law 25, GDPR, and CCPA.
                </p>
                <p className="text-gray-600">
                  This policy explains what personal information we collect, why we collect it, where it is stored,
                  who we share it with, and the rights you have over it. It is written to meet the requirements of
                  Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec&apos;s
                  Act respecting the protection of personal information in the private sector (as amended by Law 25).
                </p>
              </section>

              {/* Accountability */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Accountability and Privacy Officer</h2>
                <p className="text-gray-600 mb-4">
                  We have designated a person in charge of the protection of personal information (Privacy Officer),
                  who is responsible for our compliance with this policy and with applicable privacy laws.
                </p>
                <p className="text-gray-600">
                  You can reach our Privacy Officer at{' '}
                  <a href="mailto:privacy@cookie-banner.ca" className="text-blue-600 hover:text-blue-500">
                    privacy@cookie-banner.ca
                  </a>{' '}
                  for any question, access request, correction request, or complaint about how we handle personal
                  information.
                </p>
              </section>

              {/* Information we collect */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information We Collect From You</h2>
                <p className="text-gray-600 mb-4">
                  When you create and use an account, we collect:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Account information</strong> — your name, email address, and a securely hashed password, or your Google profile name and email if you sign in with Google.</li>
                  <li><strong>Billing information</strong> — your subscription plan and payment history. Payments are processed by Stripe; we never see or store your full card number.</li>
                  <li><strong>Content you upload</strong> — banner configurations, logos, and team or project details you add to your workspace.</li>
                  <li><strong>Support communications</strong> — messages you send to our support team.</li>
                  <li><strong>Security audit logs</strong> — records of sensitive account actions (such as sign-ins and settings changes), including the IP address and browser user agent, kept to protect your account.</li>
                </ul>
              </section>

              {/* Information processed for customers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information We Process on Behalf of Our Customers</h2>
                <p className="text-gray-600 mb-4">
                  When a website uses one of our cookie banners, we process limited information about that
                  website&apos;s visitors on the website owner&apos;s behalf, solely to record and prove consent:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>A pseudonymous consent ID and a one-way hashed cookie identifier (we cannot reverse these to identify a person)</li>
                  <li>The consent decision (accepted, rejected, or customized) and the cookie categories chosen</li>
                  <li>The two-letter country code of the visitor, the page path where consent was given, and a timestamp</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  We do <strong>not</strong> store visitor IP addresses, names, email addresses, or browsing
                  history in consent records. Banner analytics are aggregated by country and contain no
                  individual-level identifiers.
                </p>
                <p className="text-gray-600">
                  For this information, the website owner is responsible for the visitor relationship and we act as
                  their service provider. Visitors who have questions about consent collected on a specific website
                  should contact that website&apos;s owner first; we will assist the owner in responding.
                </p>
              </section>

              {/* Purposes */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Why We Collect It</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>To provide, operate, and secure the service you signed up for</li>
                  <li>To process payments and manage subscriptions</li>
                  <li>To generate consent records and compliance reports for our customers</li>
                  <li>To respond to support requests</li>
                  <li>To send service and account emails (for example password resets and billing notices)</li>
                  <li>To meet our own legal obligations</li>
                </ul>
                <p className="text-gray-600">
                  We do not sell personal information, and we do not use it for advertising.
                </p>
              </section>

              {/* Consent */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Consent</h2>
                <p className="text-gray-600">
                  We collect, use, and disclose personal information with your knowledge and consent, except where
                  the law permits or requires otherwise. You may withdraw your consent at any time, subject to legal
                  or contractual restrictions, by contacting us or deleting your account. Withdrawing consent may
                  mean we can no longer provide the service to you.
                </p>
              </section>

              {/* Storage and transfers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Where Your Data Is Stored and Cross-Border Transfers</h2>
                <p className="text-gray-600 mb-4">
                  Our primary database is hosted by Supabase on Amazon Web Services infrastructure. We are in the
                  process of moving primary data storage to AWS Canada (Montreal, Quebec) so that customer and
                  consent data is stored at rest in Canada.
                </p>
                <p className="text-gray-600 mb-4">
                  Some processing necessarily occurs outside Canada: our application is served by Vercel from data
                  centres in the United States, payments are processed by Stripe, and transactional email is sent
                  through Resend. Personal information handled by these providers may be stored or processed in the
                  United States and may be accessible to authorities there under local law.
                </p>
                <p className="text-gray-600">
                  We use contractual and technical safeguards with every provider to ensure a comparable level of
                  protection to that required in Canada.
                </p>
              </section>

              {/* Service providers */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Providers We Share Data With</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Supabase</strong> — database and file storage hosting (AWS)</li>
                  <li><strong>Vercel</strong> — application hosting and content delivery (United States)</li>
                  <li><strong>Stripe</strong> — payment processing (United States)</li>
                  <li><strong>Resend</strong> — transactional email delivery (United States)</li>
                  <li><strong>Google</strong> — optional sign-in with Google (OAuth)</li>
                </ul>
                <p className="text-gray-600">
                  Each provider receives only the information needed to perform its function and is bound by its own
                  data processing terms.
                </p>
              </section>

              {/* Retention */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. How Long We Keep It</h2>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li><strong>Account information</strong> — kept while your account is active and deleted when you delete your account, except where we must retain records (for example billing records for tax purposes).</li>
                  <li><strong>Consent records</strong> — kept for the retention period of the customer&apos;s plan so the customer can demonstrate proof of consent, then deleted.</li>
                  <li><strong>Security audit logs</strong> — automatically purged on a rolling schedule.</li>
                </ul>
              </section>

              {/* Safeguards */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. How We Protect It</h2>
                <p className="text-gray-600">
                  We protect personal information with safeguards appropriate to its sensitivity, including
                  encryption in transit (TLS) and at rest, hashed passwords, hashed visitor identifiers,
                  row-level access controls in our database, role-based team permissions, and audit logging of
                  sensitive account actions. Access to production data is limited to those who need it to operate
                  the service.
                </p>
              </section>

              {/* Breach */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Breach Notification</h2>
                <p className="text-gray-600">
                  If a breach of security safeguards creates a real risk of significant harm, we will notify the
                  Office of the Privacy Commissioner of Canada, the Commission d&apos;accès à l&apos;information du
                  Québec where required, and affected individuals as soon as feasible, and we will keep records of
                  all breaches as required by law.
                </p>
              </section>

              {/* Rights */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  Subject to limited legal exceptions, you have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                  <li>Access the personal information we hold about you and know how it is used and to whom it has been disclosed</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Withdraw consent and request deletion of your information</li>
                  <li>Receive computerized personal information you provided to us in a structured, commonly used format (data portability)</li>
                  <li>Challenge our compliance with this policy</li>
                </ul>
                <p className="text-gray-600">
                  To exercise any of these rights, contact our Privacy Officer at{' '}
                  <a href="mailto:privacy@cookie-banner.ca" className="text-blue-600 hover:text-blue-500">
                    privacy@cookie-banner.ca
                  </a>
                  . We respond to requests within 30 days. If you are not satisfied with our response, you may
                  complain to the Office of the Privacy Commissioner of Canada (priv.gc.ca) or, in Quebec, the
                  Commission d&apos;accès à l&apos;information (cai.gouv.qc.ca).
                </p>
              </section>

              {/* Cookies */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Cookies on Our Own Website</h2>
                <p className="text-gray-600">
                  We practice what we preach: cookie-banner.ca uses only cookies that are necessary to operate the
                  site, such as authentication session cookies. We do not use third-party advertising or tracking
                  cookies on our website.
                </p>
              </section>

              {/* Children */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Children</h2>
                <p className="text-gray-600">
                  Our services are intended for businesses and are not directed at children under 14. We do not
                  knowingly collect personal information from children.
                </p>
              </section>

              {/* Changes */}
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Changes to This Policy</h2>
                <p className="text-gray-600">
                  We may update this policy from time to time. We will post the updated version on this page with a
                  new &quot;Last updated&quot; date, and we will notify account holders of material changes by email
                  or in the dashboard.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Us</h2>
                <p className="text-gray-600">
                  Privacy Officer:{' '}
                  <a href="mailto:privacy@cookie-banner.ca" className="text-blue-600 hover:text-blue-500">
                    privacy@cookie-banner.ca
                  </a>
                  <br />
                  General support:{' '}
                  <a href="mailto:support@cookie-banner.ca" className="text-blue-600 hover:text-blue-500">
                    support@cookie-banner.ca
                  </a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
