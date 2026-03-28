import { PrivacyPolicyInputs, PolicySection } from '@/types'

export function getPipedaSections(inputs: PrivacyPolicyInputs): PolicySection[] {
  const sections: PolicySection[] = [
    // ── PIPEDA Overview ───────────────────────────────────────────
    {
      id: 'pipeda-overview',
      heading: 'Your Privacy Rights Under Canadian Law (PIPEDA)',
      content: `<p>${inputs.businessName} is committed to complying with the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation. PIPEDA establishes 10 fair information principles that govern the collection, use, and disclosure of personal information in the course of commercial activities in Canada.</p>
<p>This section outlines how we adhere to these principles and describes your rights as a Canadian resident.</p>`,
      applicableJurisdictions: ['pipeda'],
    },

    // ── Accountability ────────────────────────────────────────────
    {
      id: 'pipeda-accountability',
      heading: 'Accountability',
      content: `<p>${inputs.businessName} is responsible for the personal information under our control. We have designated a privacy officer who is accountable for our compliance with PIPEDA and this Privacy Policy.</p>
<p>Our privacy officer can be reached at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>
<p>We are responsible for personal information that has been transferred to third parties for processing on our behalf. We use contractual and other means to ensure that third-party service providers protect your personal information to a comparable level.</p>`,
      applicableJurisdictions: ['pipeda'],
    },

    // ── Consent ───────────────────────────────────────────────────
    {
      id: 'pipeda-consent',
      heading: 'Consent',
      content: `<p>Under PIPEDA, your knowledge and consent are required for the collection, use, or disclosure of personal information, except where inappropriate or as otherwise permitted by law.</p>
<p>${inputs.businessName} obtains consent in the following ways:</p>
<ul>
<li><strong>Express consent:</strong> For sensitive personal information, such as financial or health information, we obtain your express, affirmative consent before collection or use.</li>
<li><strong>Implied consent:</strong> For less sensitive personal information, we may rely on implied consent where the purpose of collection would be obvious to a reasonable person and you voluntarily provide the information.</li>
<li><strong>Opt-out consent:</strong> In certain circumstances, such as marketing communications, we may rely on an opt-out mechanism that allows you to decline further communications.</li>
</ul>
<p>You may withdraw your consent at any time, subject to legal or contractual restrictions and upon providing reasonable notice. Please note that withdrawing consent may affect our ability to provide certain services to you. We will inform you of the implications of withdrawing consent when you make your request.</p>`,
      applicableJurisdictions: ['pipeda'],
    },

    // ── Limiting Collection ───────────────────────────────────────
    {
      id: 'pipeda-limiting-collection',
      heading: 'Limiting Collection',
      content: `<p>${inputs.businessName} limits the collection of personal information to what is necessary for the purposes we have identified. We collect personal information by fair and lawful means and do not collect information indiscriminately.</p>
<p>We will not collect personal information beyond what is required to provide our services and fulfil the purposes described in this Privacy Policy.</p>`,
      applicableJurisdictions: ['pipeda'],
    },

    // ── Canadian Rights ───────────────────────────────────────────
    {
      id: 'pipeda-rights',
      heading: 'Your Rights Under PIPEDA',
      content: `<p>As a Canadian resident, you have the following rights under PIPEDA:</p>
<ul>
<li><strong>Right of access:</strong> You have the right to request access to the personal information we hold about you and to be informed of its use and disclosure. We will respond to your access request within 30 days.</li>
<li><strong>Right to challenge accuracy:</strong> You have the right to challenge the accuracy and completeness of your personal information and request that it be amended. Where we agree that the information is inaccurate or incomplete, we will amend it and, where appropriate, notify third parties to whom the information has been disclosed.</li>
<li><strong>Right to withdraw consent:</strong> You have the right to withdraw your consent for the collection, use, or disclosure of your personal information, subject to legal or contractual restrictions.</li>
<li><strong>Right to complain:</strong> You have the right to file a complaint with the Office of the Privacy Commissioner of Canada (OPC) if you believe we have not complied with PIPEDA.</li>
</ul>
<h3>How to Make a Request</h3>
<p>To exercise any of these rights, please submit your request to <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. We may require you to verify your identity before processing your request. We will respond within 30 days of receiving your request. If we cannot respond within 30 days, we will notify you of the delay and the reason for it.</p>
<h3>Filing a Complaint</h3>
<p>If you are not satisfied with our response to your request, or if you believe we have violated your privacy rights, you may file a complaint with the Office of the Privacy Commissioner of Canada:</p>
<ul>
<li><strong>Website:</strong> <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">www.priv.gc.ca</a></li>
<li><strong>Toll-free:</strong> 1-800-282-1376</li>
</ul>`,
      applicableJurisdictions: ['pipeda'],
    },

    // ── Openness ──────────────────────────────────────────────────
    {
      id: 'pipeda-openness',
      heading: 'Openness and Transparency',
      content: `<p>${inputs.businessName} is committed to being open and transparent about our policies and practices relating to the management of personal information. This Privacy Policy is readily available on our website and describes:</p>
<ul>
<li>The types of personal information we collect and the purposes for which it is used</li>
<li>How personal information is collected, used, disclosed, and retained</li>
<li>How you can access and challenge the accuracy of your personal information</li>
<li>How to contact our privacy officer with questions or complaints</li>
</ul>`,
      applicableJurisdictions: ['pipeda'],
    },
  ]

  return sections
}
