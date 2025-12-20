
import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cookie Banner Generator',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl py-16">
        {/* Back link */}
        <Link 
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 font-heading text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: October 9, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none dark:prose-invert">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Welcome to Cookie Banner Generator (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              This policy applies to all information collected through our website and any related services. Please read this privacy policy carefully. By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
            
            <h3 className="mb-3 text-xl font-semibold">Personal Information</h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              When you register for an account, we collect:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Name</li>
              <li>Email address</li>
              <li>Password (encrypted)</li>
              <li>Account preferences</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">Usage Information</h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              We automatically collect certain information when you use our services:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and time spent</li>
              <li>Referring URLs</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">Cookies and Tracking</h3>
            <p className="leading-relaxed text-muted-foreground">
              We use cookies and similar tracking technologies to track activity on our service and store certain information. You can control cookie preferences through our cookie banner.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              We use the information we collect for the following purposes:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>To provide and maintain our service:</strong> Including account creation, authentication, and service delivery</li>
              <li><strong>To improve our service:</strong> Analyzing usage patterns to enhance user experience</li>
              <li><strong>To communicate with you:</strong> Sending updates, security alerts, and support messages</li>
              <li><strong>To prevent fraud:</strong> Monitoring for suspicious activity and security threats</li>
              <li><strong>To comply with legal obligations:</strong> Meeting regulatory requirements under GDPR, PIPEDA, and CASL</li>
            </ul>
          </section>

          {/* Legal Basis for Processing (GDPR) */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Legal Basis for Processing (GDPR)</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Under the General Data Protection Regulation (GDPR), we process your personal data based on:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Consent:</strong> You have given clear consent for us to process your personal data</li>
              <li><strong>Contract:</strong> Processing is necessary for a contract we have with you</li>
              <li><strong>Legal obligation:</strong> Processing is necessary to comply with the law</li>
              <li><strong>Legitimate interests:</strong> Processing is necessary for our legitimate interests (and your interests and fundamental rights do not override those interests)</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Data Retention</h2>
            <p className="leading-relaxed text-muted-foreground">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy. We will retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Data Sharing and Disclosure</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our service (hosting, analytics, email delivery)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          {/* Your Privacy Rights */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Your Privacy Rights</h2>
            
            <h3 className="mb-3 text-xl font-semibold">Under GDPR (European Users)</h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              If you are located in the European Economic Area, you have the following rights:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>Right to access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Right to restrict processing:</strong> Limit how we use your data</li>
              <li><strong>Right to data portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">Under PIPEDA (Canadian Users)</h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              If you are located in Canada, you have the right to:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Withdraw consent for data processing</li>
              <li>File a complaint with the Privacy Commissioner of Canada</li>
            </ul>

            <h3 className="mb-3 text-xl font-semibold">How to Exercise Your Rights</h3>
            <p className="leading-relaxed text-muted-foreground">
              To exercise any of these rights, please contact us at the email address provided below. We will respond to your request within 30 days.
            </p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Security</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure password hashing</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
            <p className="leading-relaxed text-muted-foreground">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Third-Party Links</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Children&apos;s Privacy</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our service is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">International Data Transfers</h2>
            <p className="leading-relaxed text-muted-foreground">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable data protection laws.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
            <p className="leading-relaxed text-muted-foreground">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-12 rounded-lg border bg-muted/30 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              If you have questions about this privacy policy or want to exercise your privacy rights, please contact us:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> privacy@yourdomain.com</p>
              <p><strong>Website:</strong> <Link href="/" className="text-primary hover:underline">https://yourdomain.com</Link></p>
            </div>
          </section>

          {/* GDPR Representative */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">GDPR Data Protection Officer</h2>
            <p className="leading-relaxed text-muted-foreground">
              For GDPR-related inquiries, you may contact our Data Protection Officer at: dpo@yourdomain.com
            </p>
          </section>

          {/* Complaints */}
          <section className="mb-12 rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20">
            <h2 className="mb-4 text-2xl font-semibold">Filing a Complaint</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              If you believe your privacy rights have been violated, you have the right to file a complaint with:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li><strong>EU/EEA users:</strong> Your local Data Protection Authority</li>
              <li><strong>Canadian users:</strong> Office of the Privacy Commissioner of Canada</li>
              <li><strong>UK users:</strong> Information Commissioner&apos;s Office (ICO)</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

