import { PrivacyPolicyInputs, PolicySection } from '@/types'

export function getGdprSections(inputs: PrivacyPolicyInputs): PolicySection[] {
  const sections: PolicySection[] = [
    // ── Legal Basis for Processing ────────────────────────────────
    {
      id: 'gdpr-legal-basis',
      heading: 'Legal Basis for Processing (GDPR)',
      content: `<p>Under the General Data Protection Regulation (GDPR), ${inputs.businessName} must have a valid legal basis for processing your personal data. We rely on the following legal bases depending on the context of processing:</p>
<ul>
<li><strong>Consent (Article 6(1)(a)):</strong> Where you have given clear, informed, and unambiguous consent for us to process your personal data for specific purposes, such as marketing communications or non-essential cookies. You may withdraw your consent at any time without affecting the lawfulness of processing carried out before withdrawal.</li>
<li><strong>Performance of a contract (Article 6(1)(b)):</strong> Where processing is necessary to fulfil our contractual obligations to you, such as providing our services, processing payments, or managing your account.</li>
<li><strong>Legal obligation (Article 6(1)(c)):</strong> Where processing is necessary for compliance with a legal obligation to which we are subject, such as tax reporting, fraud prevention, or responding to lawful requests from public authorities.</li>
<li><strong>Legitimate interests (Article 6(1)(f)):</strong> Where processing is necessary for the purposes of our legitimate interests or those of a third party, provided that such interests are not overridden by your fundamental rights and freedoms. Our legitimate interests include improving our services, ensuring network and information security, and conducting business analytics.</li>
</ul>
<p>You have the right to object to processing based on legitimate interests at any time. We will cease processing unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.</p>`,
      applicableJurisdictions: ['gdpr'],
    },

    // ── Data Protection Officer ───────────────────────────────────
    {
      id: 'gdpr-dpo',
      heading: 'Data Protection Officer',
      content: `<p>${inputs.businessName} has designated a point of contact for data protection matters. If you have questions about how we process your personal data or wish to exercise your rights under the GDPR, you may contact our data protection representative at:</p>
<ul>
<li><strong>Email:</strong> <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
</ul>
<p>You also have the right to lodge a complaint with your local supervisory authority if you believe that our processing of your personal data violates the GDPR. A list of EU/EEA data protection authorities can be found at <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu/about-edpb/about-edpb/members_en</a>.</p>`,
      applicableJurisdictions: ['gdpr'],
    },

    // ── EU Data Subject Rights ────────────────────────────────────
    {
      id: 'gdpr-rights',
      heading: 'Your Rights Under the GDPR',
      content: `<p>If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, you have the following rights under the General Data Protection Regulation:</p>
<ul>
<li><strong>Right of access (Article 15):</strong> You have the right to obtain confirmation as to whether we are processing your personal data and, if so, to request access to that data along with information about how it is processed.</li>
<li><strong>Right to rectification (Article 16):</strong> You have the right to request correction of inaccurate personal data and to have incomplete personal data completed.</li>
<li><strong>Right to erasure (Article 17):</strong> You have the right to request the deletion of your personal data when it is no longer necessary for the purposes for which it was collected, when you withdraw consent, when you object to processing, or when it has been unlawfully processed.</li>
<li><strong>Right to restriction of processing (Article 18):</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances, such as when you contest its accuracy or object to processing.</li>
<li><strong>Right to data portability (Article 20):</strong> You have the right to receive your personal data in a structured, commonly used, machine-readable format and to transmit that data to another controller without hindrance.</li>
<li><strong>Right to object (Article 21):</strong> You have the right to object to the processing of your personal data based on legitimate interests or for direct marketing purposes. We will cease processing unless we demonstrate compelling legitimate grounds.</li>
<li><strong>Right not to be subject to automated decision-making (Article 22):</strong> You have the right not to be subject to a decision based solely on automated processing, including profiling, that produces legal effects or similarly significantly affects you.</li>
</ul>
<p>To exercise any of these rights, please contact us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. We will respond to your request within 30 days, as required by the GDPR. In certain cases, we may extend this period by a further 60 days, in which case we will inform you of the extension and the reasons for it.</p>
<p>We will not charge a fee for processing your request unless the request is manifestly unfounded or excessive, in which case we may charge a reasonable fee or refuse to act on the request.</p>`,
      applicableJurisdictions: ['gdpr'],
    },

    // ── International Data Transfers (GDPR-specific) ──────────────
    {
      id: 'gdpr-transfers',
      heading: 'International Data Transfers (GDPR)',
      content: `<p>Where we transfer personal data outside the EEA, UK, or Switzerland, we ensure that appropriate safeguards are in place as required by the GDPR. These safeguards include:</p>
<ul>
<li><strong>Adequacy decisions:</strong> We may transfer data to countries that the European Commission has determined provide an adequate level of data protection (Article 45).</li>
<li><strong>Standard Contractual Clauses (SCCs):</strong> Where no adequacy decision exists, we use Standard Contractual Clauses approved by the European Commission to ensure your data receives adequate protection (Article 46(2)(c)).</li>
<li><strong>Supplementary measures:</strong> Where necessary, we implement additional technical and organisational measures, such as encryption and pseudonymisation, to supplement the protections provided by SCCs.</li>
</ul>
<p>You may request a copy of the safeguards we use for international data transfers by contacting us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`,
      applicableJurisdictions: ['gdpr'],
    },

    // ── Data Breach Notification ──────────────────────────────────
    {
      id: 'gdpr-breach',
      heading: 'Data Breach Notification',
      content: `<p>In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, ${inputs.businessName} will:</p>
<ul>
<li>Notify the relevant supervisory authority within 72 hours of becoming aware of the breach, as required by Article 33 of the GDPR</li>
<li>Notify affected individuals without undue delay where the breach is likely to result in a high risk to their rights and freedoms, as required by Article 34</li>
<li>Document the breach, its effects, and the remedial action taken</li>
</ul>
<p>We maintain an incident response plan and regularly test our procedures to ensure prompt and effective response to data security incidents.</p>`,
      applicableJurisdictions: ['gdpr'],
    },
  ]

  return sections
}
