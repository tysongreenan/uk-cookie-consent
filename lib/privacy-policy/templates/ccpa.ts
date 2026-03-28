import { PrivacyPolicyInputs, PolicySection } from '@/types'

const CCPA_CATEGORY_LABELS: Record<string, string> = {
  name: 'Identifiers (e.g., real name, alias, postal address, email address)',
  email: 'Identifiers (e.g., email address)',
  phone: 'Identifiers (e.g., telephone number)',
  address: 'Identifiers (e.g., postal address)',
  ip_address: 'Internet or other electronic network activity information (e.g., IP address)',
  device_info: 'Internet or other electronic network activity information (e.g., browsing history, device information)',
  location: 'Geolocation data',
  payment: 'Commercial information (e.g., purchasing or consuming histories, payment information)',
  usage_data: 'Internet or other electronic network activity information (e.g., interaction with a website or application)',
  cookies: 'Internet or other electronic network activity information (e.g., cookies and tracking data)',
  social_profiles: 'Identifiers (e.g., social media handles)',
  demographics: 'Characteristics of protected classifications under California or federal law',
  employment: 'Professional or employment-related information',
  government_id: 'Identifiers (e.g., Social Security number, driver\'s license number)',
}

export function getCcpaSections(inputs: PrivacyPolicyInputs): PolicySection[] {
  // Deduplicate CCPA categories
  const ccpaCategories = Array.from(new Set(inputs.dataCollected.map((d) => CCPA_CATEGORY_LABELS[d] || d)))

  const sections: PolicySection[] = [
    // ── CCPA Notice ───────────────────────────────────────────────
    {
      id: 'ccpa-notice',
      heading: 'Your California Privacy Rights (CCPA/CPRA)',
      content: `<p>If you are a California resident, the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), provides you with specific rights regarding your personal information. This section describes your rights and explains how to exercise them.</p>
<p>${inputs.businessName} collects, uses, and discloses personal information as described in this Privacy Policy. Under the CCPA, "personal information" means information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household.</p>`,
      applicableJurisdictions: ['ccpa'],
    },

    // ── Categories of Personal Information ────────────────────────
    {
      id: 'ccpa-categories',
      heading: 'Categories of Personal Information Collected',
      content: `<p>In the preceding 12 months, ${inputs.businessName} has collected the following categories of personal information from consumers, as defined by the CCPA:</p>
<ul>
${ccpaCategories.map((c) => `<li>${c}</li>`).join('\n')}
</ul>
<h3>Sources of Personal Information</h3>
<p>We collect personal information from the following categories of sources:</p>
<ul>
<li>Directly from you (e.g., information you provide in forms or through account registration)</li>
<li>Automatically from your device (e.g., through cookies, pixel tags, and similar technologies)</li>
${inputs.sharesDataWithThirdParties ? '<li>From third-party sources (e.g., data brokers, analytics providers, social media platforms)</li>' : ''}
</ul>
<h3>Business or Commercial Purposes for Collection</h3>
<p>We collect personal information for the business and commercial purposes described in the "How We Use Your Information" section of this Privacy Policy.</p>`,
      applicableJurisdictions: ['ccpa'],
    },

    // ── Sale and Sharing ──────────────────────────────────────────
    {
      id: 'ccpa-do-not-sell',
      heading: 'Sale and Sharing of Personal Information',
      content: `<p>${inputs.businessName} does <strong>not sell</strong> your personal information for monetary consideration as defined under the CCPA.</p>
<p>${
        inputs.sharesDataWithThirdParties
          ? `We may share personal information with third-party service providers for business purposes as described in the "How We Share Your Information" section. Under the CPRA, certain sharing of personal information for cross-context behavioural advertising may be considered "sharing" even without monetary exchange. You have the right to opt out of such sharing.`
          : `We do not share your personal information for cross-context behavioural advertising purposes.`
      }</p>
<p>We do not have actual knowledge that we sell or share the personal information of consumers under the age of 16.</p>`,
      applicableJurisdictions: ['ccpa'],
    },

    // ── California Consumer Rights ────────────────────────────────
    {
      id: 'ccpa-rights',
      heading: 'Your Rights as a California Consumer',
      content: `<p>Under the CCPA/CPRA, California residents have the following rights:</p>
<ul>
<li><strong>Right to know:</strong> You have the right to request that we disclose the categories and specific pieces of personal information we have collected about you, the categories of sources, the business or commercial purposes for collection, and the categories of third parties with whom we share your personal information.</li>
<li><strong>Right to delete:</strong> You have the right to request the deletion of your personal information, subject to certain exceptions provided by law (e.g., completing a transaction, detecting security incidents, complying with legal obligations).</li>
<li><strong>Right to correct:</strong> You have the right to request that we correct inaccurate personal information that we maintain about you.</li>
<li><strong>Right to opt out of sale or sharing:</strong> You have the right to direct us not to sell or share your personal information. You may exercise this right through our "Do Not Sell or Share My Personal Information" link or by contacting us.</li>
<li><strong>Right to limit use of sensitive personal information:</strong> If we collect sensitive personal information, you have the right to limit its use to purposes necessary to provide our services.</li>
<li><strong>Right to non-discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights. We will not deny you services, charge different prices, provide a different level of service, or suggest that you will receive a different price or level of service for exercising your rights.</li>
</ul>
<h3>How to Submit a Request</h3>
<p>To exercise your rights, you may:</p>
<ul>
<li>Email us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
<li>Visit our website at <a href="${inputs.websiteUrl}">${inputs.websiteUrl}</a></li>
</ul>
<p>We will verify your identity before processing your request. You may also designate an authorised agent to submit a request on your behalf by providing the agent with written, signed permission.</p>
<p>We will respond to verifiable consumer requests within 45 days. If we need more time (up to an additional 45 days), we will inform you of the reason and the extension period in writing.</p>`,
      applicableJurisdictions: ['ccpa'],
    },

    // ── Financial Incentives ──────────────────────────────────────
    {
      id: 'ccpa-financial-incentives',
      heading: 'Financial Incentives',
      content: `<p>${inputs.businessName} does not offer financial incentives or price or service differences in exchange for the retention or sale of your personal information. If we offer any such programme in the future, we will provide you with a clear description of the material terms and obtain your opt-in consent before enrolling you.</p>`,
      applicableJurisdictions: ['ccpa'],
    },

    // ── Shine the Light ───────────────────────────────────────────
    {
      id: 'ccpa-shine-the-light',
      heading: 'California "Shine the Light" Law',
      content: `<p>Under California Civil Code Section 1798.83 ("Shine the Light" law), California residents who provide personal information to a business in connection with obtaining products or services may request information about the personal information shared with third parties for their direct marketing purposes.</p>
<p>${inputs.businessName} does not share personal information with third parties for their direct marketing purposes. If this practice changes, we will update this policy and provide you with an opportunity to opt out.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
  ]

  return sections
}
