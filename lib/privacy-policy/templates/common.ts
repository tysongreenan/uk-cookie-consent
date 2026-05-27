import { PrivacyPolicyInputs, PolicySection } from '@/types'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const COOKIE_CATEGORY_LABELS: Record<string, string> = {
  necessary: 'Strictly necessary',
  functional: 'Functional',
  analytics: 'Analytics',
  marketing: 'Marketing',
  social_media: 'Social media',
}

function formatCategory(value: string): string {
  return COOKIE_CATEGORY_LABELS[value] || value
}

/** Format a list of items into readable prose or a bullet list */
function formatList(items: string[]): string {
  if (items.length === 0) return 'none'
  if (items.length === 1) return items[0]
  return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1]
}

/** Map data collection keys to human-readable labels */
const DATA_LABELS: Record<string, string> = {
  name: 'Full name',
  email: 'Email address',
  phone: 'Phone number',
  address: 'Mailing or billing address',
  ip_address: 'IP address',
  device_info: 'Device and browser information',
  location: 'Approximate geographic location',
  payment: 'Payment and billing information',
  usage_data: 'Usage and browsing data',
  cookies: 'Cookies and similar tracking technologies',
  social_profiles: 'Social media profile information',
  demographics: 'Demographic information (age, gender)',
  employment: 'Employment information',
  government_id: 'Government-issued identification numbers',
}

function labelData(key: string): string {
  return DATA_LABELS[key] || key
}

const PURPOSE_LABELS: Record<string, string> = {
  service_delivery: 'To provide and maintain our services',
  communication: 'To communicate with you about your account, updates, and support requests',
  analytics: 'To analyse usage patterns and improve our services',
  marketing: 'To send promotional materials and marketing communications (with your consent)',
  legal_compliance: 'To comply with applicable laws, regulations, and legal processes',
  security: 'To detect, prevent, and address fraud, security breaches, and technical issues',
  personalisation: 'To personalise your experience and deliver content relevant to your interests',
  payment_processing: 'To process transactions and manage billing',
  research: 'To conduct research and development to improve our products',
}

const METHOD_LABELS: Record<string, string> = {
  forms: 'Information you provide directly through forms, registrations, and account creation',
  cookies: 'Automated data collection through cookies and similar technologies',
  analytics: 'Analytics tools that record how you interact with our services',
  third_party: 'Information received from third-party services and partners',
  user_content: 'Content you create, upload, or share while using our services',
  support: 'Communications with our support team',
  payment_processor: 'Payment processors when you complete transactions',
}

const THIRD_PARTY_LABELS: Record<string, string> = {
  google_analytics: 'Google Analytics (usage analytics)',
  google_ads: 'Google Ads (advertising)',
  facebook_pixel: 'Meta Pixel / Facebook (advertising and analytics)',
  stripe: 'Stripe (payment processing)',
  mailchimp: 'Mailchimp (email marketing)',
  intercom: 'Intercom (customer support)',
  hotjar: 'Hotjar (session recording and heatmaps)',
  hubspot: 'HubSpot (CRM and marketing)',
  cloudflare: 'Cloudflare (security and performance)',
  aws: 'Amazon Web Services (cloud hosting)',
  sentry: 'Sentry (error monitoring)',
}

function labelThirdParty(key: string): string {
  return THIRD_PARTY_LABELS[key] || key
}

const RETENTION_LABELS: Record<string, string> = {
  '30_days': '30 days',
  '90_days': '90 days',
  '1_year': 'one (1) year',
  '2_years': 'two (2) years',
  '3_years': 'three (3) years',
  '5_years': 'five (5) years',
  as_needed: 'as long as necessary to fulfil the purposes described in this policy',
  custom: '',
}

export function getCommonSections(inputs: PrivacyPolicyInputs): PolicySection[] {
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const retentionText =
    inputs.dataRetentionPeriod === 'custom' && inputs.customRetentionPeriod
      ? inputs.customRetentionPeriod
      : RETENTION_LABELS[inputs.dataRetentionPeriod] || inputs.dataRetentionPeriod

  const sections: PolicySection[] = [
    // ── Introduction ──────────────────────────────────────────────
    {
      id: 'introduction',
      heading: 'Privacy Policy',
      subheading: `Last updated: ${lastUpdated}`,
      content: `<p>${inputs.businessName} ("we", "us", or "our") operates the website <a href="${inputs.websiteUrl}">${inputs.websiteUrl}</a>. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our services.</p>
<p>We are committed to protecting your privacy and handling your personal information with transparency and care. By accessing or using our services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with the practices described herein, please do not use our services.</p>
<p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date above.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Information We Collect ────────────────────────────────────
    {
      id: 'data-collection',
      heading: 'Information We Collect',
      content: `<p>${inputs.businessName} collects personal information to provide and improve our services. The types of personal information we collect include:</p>
<ul>
${inputs.dataCollected.map((d) => `<li><strong>${labelData(d)}</strong></li>`).join('\n')}
</ul>
<h3>How We Collect Your Information</h3>
<p>We collect personal information through the following methods:</p>
<ul>
${inputs.collectionMethods.map((m) => `<li>${METHOD_LABELS[m] || m}</li>`).join('\n')}
</ul>
${
  inputs.cookieCategories.length > 0 || (inputs.cookies && inputs.cookies.length > 0)
    ? `<h3>Cookies and Tracking Technologies</h3>
<p>We use cookies and similar tracking technologies to collect and track information about your activity on our services.${
        inputs.cookieCategories.length > 0
          ? ` The categories of cookies we use include: ${formatList(inputs.cookieCategories)}.`
          : ''
      } You can manage your cookie preferences through our cookie consent banner or your browser settings.</p>${
        inputs.cookies && inputs.cookies.length > 0
          ? `
<p>The specific cookies set on our website are listed below:</p>
<table class="cookie-table" style="width:100%;border-collapse:collapse;margin:1em 0;">
<thead>
<tr><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Name</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Provider</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Category</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Duration</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Purpose</th></tr>
</thead>
<tbody>
${inputs.cookies
  .map(
    (c) =>
      `<tr><td style="padding:6px;border-bottom:1px solid #eee;"><code>${escapeHtml(c.name)}</code></td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(c.provider || '—')}</td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(formatCategory(c.category))}</td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(c.duration || '—')}</td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(c.purpose || '—')}</td></tr>`,
  )
  .join('\n')}
</tbody>
</table>`
          : ''
      }`
    : ''
}`,
      applicableJurisdictions: ['all'],
    },

    // ── How We Use Your Information ───────────────────────────────
    {
      id: 'data-usage',
      heading: 'How We Use Your Information',
      content: `<p>${inputs.businessName} uses the personal information we collect for the following purposes:</p>
<ul>
${inputs.dataPurposes.map((p) => `<li>${PURPOSE_LABELS[p] || p}</li>`).join('\n')}
</ul>
<p>We will not use your personal information for purposes materially different from those described above without first obtaining your consent or providing you with notice as required by applicable law.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Sharing and Disclosure ────────────────────────────────────
    {
      id: 'data-sharing',
      heading: 'How We Share Your Information',
      content: inputs.sharesDataWithThirdParties
        ? `<p>${inputs.businessName} may share your personal information with third parties in the following circumstances:</p>
<h3>Service Providers</h3>
<p>We engage trusted third-party companies and individuals to perform services on our behalf, such as hosting, analytics, payment processing, and customer support. These service providers have access to your personal information only to the extent necessary to perform their tasks and are obligated to protect it.</p>
${
  inputs.thirdPartyServices.length > 0
    ? `<p>The third-party services we currently use include:</p>
<ul>
${inputs.thirdPartyServices.map((s) => `<li>${labelThirdParty(s)}</li>`).join('\n')}
</ul>`
    : ''
}
${
  inputs.thirdPartyRecipients && inputs.thirdPartyRecipients.length > 0
    ? `<h3>Other Recipients</h3>
<p>We may also share your information with: ${formatList(inputs.thirdPartyRecipients)}.</p>`
    : ''
}
<h3>Legal Requirements</h3>
<p>We may disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g., a court order, government agency, or law enforcement request).</p>
<h3>Business Transfers</h3>
<p>In the event of a merger, acquisition, reorganisation, or sale of assets, your personal information may be transferred to the acquiring entity. We will provide notice before your personal information becomes subject to a different privacy policy.</p>`
        : `<p>${inputs.businessName} does not sell, trade, or otherwise share your personal information with third parties for their own marketing purposes.</p>
<p>We may disclose your personal information only in the following limited circumstances:</p>
<ul>
<li><strong>Legal requirements:</strong> When required by law, court order, or governmental regulation.</li>
<li><strong>Protection of rights:</strong> To protect the rights, property, or safety of ${inputs.businessName}, our users, or the public.</li>
<li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, where your information may be transferred to the acquiring entity.</li>
</ul>`,
      applicableJurisdictions: ['all'],
    },

    // ── Data Retention ────────────────────────────────────────────
    {
      id: 'data-retention',
      heading: 'Data Retention',
      content: `<p>${inputs.businessName} retains your personal information for ${retentionText}, unless a longer retention period is required or permitted by law.</p>
<p>When determining the appropriate retention period, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorised use or disclosure, the purposes for which we process your personal information, and applicable legal requirements.</p>
<p>Once your personal information is no longer necessary for the purposes for which it was collected, we will securely delete or anonymise it.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Data Security ─────────────────────────────────────────────
    {
      id: 'data-security',
      heading: 'Data Security',
      content: `<p>${inputs.businessName} implements appropriate technical and organisational security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These measures include, but are not limited to:</p>
<ul>
<li>Encryption of data in transit using TLS/SSL protocols</li>
<li>Secure storage of personal information with access controls</li>
<li>Regular security assessments and vulnerability testing</li>
<li>Employee training on data protection and security practices</li>
<li>Incident response procedures for potential data breaches</li>
</ul>
<p>While we take reasonable steps to protect your personal information, no method of transmission over the Internet or method of electronic storage is completely secure. We cannot guarantee absolute security of your data.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Your Rights ───────────────────────────────────────────────
    {
      id: 'your-rights',
      heading: 'Your Rights',
      content: `<p>Depending on your jurisdiction, you may have certain rights regarding your personal information. These may include:</p>
<ul>
<li><strong>Right of access:</strong> You may request a copy of the personal information we hold about you.</li>
<li><strong>Right to rectification:</strong> You may request that we correct inaccurate or incomplete personal information.</li>
${inputs.allowsUserDeletion ? '<li><strong>Right to erasure:</strong> You may request that we delete your personal information, subject to certain legal exceptions.</li>' : ''}
${inputs.allowsUserExport ? '<li><strong>Right to data portability:</strong> You may request a copy of your personal information in a structured, commonly used, machine-readable format.</li>' : ''}
<li><strong>Right to object:</strong> You may object to certain processing activities, such as direct marketing.</li>
<li><strong>Right to withdraw consent:</strong> Where we rely on your consent to process personal information, you may withdraw your consent at any time.</li>
</ul>
<p>To exercise any of these rights, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. We will respond to your request within the timeframe required by applicable law.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── International Transfers ───────────────────────────────────
    ...(inputs.transfersDataInternationally
      ? [
          {
            id: 'international-transfers',
            heading: 'International Data Transfers',
            content: `<p>Your personal information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that differ from those of your jurisdiction.</p>
<p>When we transfer your personal information internationally, we take appropriate safeguards to ensure that your information receives an adequate level of protection, including:</p>
<ul>
<li>Transferring to countries that have been recognised as providing an adequate level of data protection</li>
<li>Using contractual clauses approved by relevant authorities (such as Standard Contractual Clauses)</li>
<li>Relying on certification schemes or binding corporate rules where applicable</li>
</ul>
<p>By using our services, you acknowledge that your personal information may be processed in jurisdictions outside your own. If you have questions about our international data transfer practices, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`,
            applicableJurisdictions: ['all'] as string[],
          },
        ]
      : []),

    // ── Children's Privacy ────────────────────────────────────────
    {
      id: 'children',
      heading: "Children's Privacy",
      content: inputs.collectsChildrenData
        ? `<p>We recognise the importance of protecting the privacy of children. Portions of our services may be directed at or accessible by individuals under the age of ${inputs.minimumAge || 16}. We collect personal information from children only with verifiable parental or guardian consent as required by applicable law.</p>
<p>If we become aware that we have collected personal information from a child without appropriate consent, we will take steps to delete that information promptly. If you believe we may have collected personal information from a child without proper consent, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`
        : `<p>Our services are not directed at individuals under the age of ${inputs.minimumAge || 16}. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child under this age, we will take steps to delete that information as soon as possible.</p>
<p>If you are a parent or guardian and believe that your child has provided us with personal information, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a> so that we can take appropriate action.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Third-Party Links ─────────────────────────────────────────
    {
      id: 'third-party-links',
      heading: 'Third-Party Links',
      content: `<p>Our services may contain links to third-party websites, services, or applications that are not operated by ${inputs.businessName}. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
<p>We encourage you to review the privacy policy of every site you visit. This Privacy Policy applies solely to information collected by ${inputs.businessName}.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Changes to This Policy ────────────────────────────────────
    {
      id: 'changes',
      heading: 'Changes to This Privacy Policy',
      content: `<p>${inputs.businessName} may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:</p>
<ul>
<li>Post the updated Privacy Policy on this page with a revised "Last updated" date</li>
<li>Notify you by email or through a prominent notice on our website, where required by law</li>
</ul>
<p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your personal information. Your continued use of our services after any changes constitutes your acceptance of the updated Privacy Policy.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── Contact Information ───────────────────────────────────────
    {
      id: 'contact',
      heading: 'Contact Us',
      content: `<p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
<ul>
<li><strong>Email:</strong> <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
<li><strong>Website:</strong> <a href="${inputs.websiteUrl}">${inputs.websiteUrl}</a></li>
</ul>
<p>We will endeavour to respond to all legitimate enquiries within a reasonable timeframe and no later than required by applicable law.</p>`,
      applicableJurisdictions: ['all'],
    },

    // ── FAQ Section (AEO) ─────────────────────────────────────────
    {
      id: 'faq',
      heading: 'Frequently Asked Questions',
      content: `<h3>What personal information does ${inputs.businessName} collect?</h3>
<p>We collect the following types of personal information: ${formatList(inputs.dataCollected.map(labelData))}. This information is collected through ${formatList(inputs.collectionMethods.map((m) => METHOD_LABELS[m] || m).map((s) => s.toLowerCase()))}.</p>

<h3>How does ${inputs.businessName} use my personal information?</h3>
<p>We use your personal information for the following purposes: ${formatList(inputs.dataPurposes.map((p) => (PURPOSE_LABELS[p] || p).toLowerCase()))}. We do not use your information for purposes beyond those described in this policy without your consent.</p>

<h3>Does ${inputs.businessName} share my personal information with third parties?</h3>
<p>${
        inputs.sharesDataWithThirdParties
          ? `Yes, we share personal information with trusted service providers who help us operate our business, including ${formatList(inputs.thirdPartyServices.map(labelThirdParty))}. These providers are contractually obligated to protect your information and may only use it for the specific services they provide to us.`
          : `We do not sell or share your personal information with third parties for their marketing purposes. We may share information only when required by law, to protect our rights, or in connection with a business transfer.`
      }</p>

<h3>How long does ${inputs.businessName} keep my personal information?</h3>
<p>We retain your personal information for ${retentionText}. After this period, your data is securely deleted or anonymised. We may retain certain information for longer periods where required by law or for legitimate business purposes such as resolving disputes.</p>

<h3>How can I exercise my privacy rights?</h3>
<p>You can exercise your privacy rights by contacting us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Depending on your jurisdiction, you may have the right to access, correct, delete, or export your personal information. We will respond to your request within the timeframe required by applicable law.</p>

${
  inputs.allowsUserDeletion
    ? `<h3>Can I request deletion of my personal information?</h3>
<p>Yes. You have the right to request deletion of your personal information. To make a deletion request, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Please note that we may need to retain certain information for legal compliance, dispute resolution, or to complete transactions you have initiated.</p>`
    : ''
}

${
  inputs.allowsUserExport
    ? `<h3>Can I export my personal information?</h3>
<p>Yes. You have the right to request a copy of your personal information in a structured, commonly used, machine-readable format. To make a data portability request, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`
    : ''
}`,
      faqQuestion: `What is ${inputs.businessName}'s privacy policy?`,
      faqAnswer: `${inputs.businessName} collects ${formatList(inputs.dataCollected.map(labelData).slice(0, 3))} and other personal information to ${formatList(inputs.dataPurposes.map((p) => (PURPOSE_LABELS[p] || p).toLowerCase()).slice(0, 2))}. Data is retained for ${retentionText} and users can exercise their privacy rights by contacting ${inputs.contactEmail}.`,
      applicableJurisdictions: ['all'],
    },
  ]

  return sections
}
