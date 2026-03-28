import { PrivacyPolicyInputs, PolicySection } from '@/types'

export function getLaw25Sections(inputs: PrivacyPolicyInputs): PolicySection[] {
  const sections: PolicySection[] = [
    // ── Law 25 Overview ───────────────────────────────────────────
    {
      id: 'law25-overview',
      heading: 'Protection des renseignements personnels au Quebec (Loi 25)',
      subheading: 'Privacy Protection in Quebec (Law 25)',
      content: `<p>${inputs.businessName} complies with Quebec's Act respecting the protection of personal information in the private sector, as modernised by Bill 64 (commonly known as "Law 25" or "Loi 25"). Law 25 significantly strengthened privacy protections for Quebec residents beginning September 2023.</p>
<p>This section outlines the additional rights and protections afforded to you if you are a Quebec resident, as well as our specific obligations under this legislation.</p>`,
      applicableJurisdictions: ['law25'],
    },

    // ── Privacy Officer ───────────────────────────────────────────
    {
      id: 'law25-privacy-officer',
      heading: 'Person Responsible for the Protection of Personal Information',
      content: `<p>In accordance with Law 25, ${inputs.businessName} has designated a person responsible for the protection of personal information (the "Privacy Officer"). The Privacy Officer's role is to ensure compliance with Quebec's privacy legislation and to handle all enquiries, complaints, and access requests related to personal information.</p>
<p>You may contact our Privacy Officer at:</p>
<ul>
<li><strong>Email:</strong> <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
</ul>
<p>The title and contact information of our Privacy Officer are published on our website as required by law.</p>`,
      applicableJurisdictions: ['law25'],
    },

    // ── Consent Requirements ──────────────────────────────────────
    {
      id: 'law25-consent',
      heading: 'Consent Requirements Under Law 25',
      content: `<p>Law 25 requires that consent for the collection, use, and disclosure of personal information be:</p>
<ul>
<li><strong>Manifest, free, and informed:</strong> We provide you with clear, simple language explaining what personal information we collect and why, so that you can make an informed decision about providing consent.</li>
<li><strong>Given for specific purposes:</strong> We obtain separate consent for each distinct purpose for which your personal information is collected, used, or disclosed.</li>
<li><strong>Requested separately:</strong> Consent for the collection of personal information is requested separately from any other information or agreement.</li>
<li><strong>Express for sensitive information:</strong> For sensitive personal information (including biometric data, health information, and financial information), we obtain your express consent.</li>
</ul>
<p>Consent obtained under conditions that do not meet these requirements is without effect. You may withdraw your consent at any time. We will inform you in advance of the consequences of withdrawing your consent.</p>
<h3>Consent for Minors</h3>
<p>For persons under the age of 14, consent must be given by a person having parental authority or a tutor. Persons aged 14 and over may consent on their own behalf.</p>`,
      applicableJurisdictions: ['law25'],
    },

    // ── Quebec Resident Rights ────────────────────────────────────
    {
      id: 'law25-rights',
      heading: 'Your Rights as a Quebec Resident',
      content: `<p>Law 25 provides Quebec residents with the following rights regarding their personal information:</p>
<ul>
<li><strong>Right of access:</strong> You have the right to access the personal information we hold about you and to be informed of its use and the persons to whom it has been communicated.</li>
<li><strong>Right to rectification:</strong> You have the right to request the correction of inaccurate, incomplete, or equivocal personal information, or to request the deletion of information whose collection is not authorised by law.</li>
<li><strong>Right to de-indexing:</strong> You have the right to request that a hyperlink attached to your name that provides access to information be de-indexed or that the re-indexing of the link cease, where the link contravenes the law or a court order (the "right to be forgotten").</li>
<li><strong>Right to data portability:</strong> You have the right to receive a copy of your personal information in a structured, commonly used technological format, and to have it transferred to another organisation at your request.</li>
<li><strong>Right to withdraw consent:</strong> You may withdraw your consent to the collection, use, or disclosure of your personal information at any time. We will inform you of the consequences of withdrawal.</li>
<li><strong>Right to be informed of automated decisions:</strong> Where we use automated decision-making processes to make decisions about you, you have the right to be informed of the use of such technology and to submit observations to a person within our organisation who can review the decision.</li>
</ul>
<h3>Exercising Your Rights</h3>
<p>To exercise any of these rights, please contact our Privacy Officer at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. We will respond within 30 days of receiving your request. If we refuse your request in whole or in part, we will provide written reasons for the refusal.</p>`,
      applicableJurisdictions: ['law25'],
    },

    // ── Privacy Impact Assessments ────────────────────────────────
    {
      id: 'law25-pia',
      heading: 'Privacy Impact Assessments',
      content: `<p>In accordance with Law 25, ${inputs.businessName} conducts Privacy Impact Assessments (PIAs) before:</p>
<ul>
<li>Acquiring, developing, or redesigning information systems or electronic service delivery involving personal information</li>
<li>Disclosing personal information outside Quebec</li>
<li>Implementing any new project involving the collection, use, or disclosure of personal information</li>
</ul>
<p>These assessments evaluate the necessity of the project, the personal information involved, the risks to privacy, and the measures in place to mitigate those risks.</p>`,
      applicableJurisdictions: ['law25'],
    },

    // ── Confidentiality Incidents ─────────────────────────────────
    {
      id: 'law25-breach',
      heading: 'Confidentiality Incidents',
      content: `<p>Under Law 25, ${inputs.businessName} is required to take steps to reduce the risk of injury and prevent the recurrence of confidentiality incidents (data breaches). In the event of a confidentiality incident presenting a risk of serious injury, we will:</p>
<ul>
<li>Notify the Commission d'accès à l'information du Québec (CAI) promptly</li>
<li>Notify affected individuals with information about the nature of the incident, the personal information concerned, and the measures taken or to be taken</li>
<li>Maintain a register of all confidentiality incidents, which will be made available to the CAI upon request</li>
</ul>
<h3>Filing a Complaint</h3>
<p>If you believe that your personal information has been handled in violation of Quebec privacy law, you may file a complaint with the Commission d'accès à l'information du Québec:</p>
<ul>
<li><strong>Website:</strong> <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer">www.cai.gouv.qc.ca</a></li>
<li><strong>Toll-free:</strong> 1-888-528-7741</li>
</ul>`,
      applicableJurisdictions: ['law25'],
    },

    // ── French Language ───────────────────────────────────────────
    {
      id: 'law25-language',
      heading: 'Language of Communication / Langue de communication',
      content: `<p>In accordance with Quebec's Charter of the French Language and Law 25's transparency requirements, ${inputs.businessName} provides privacy-related communications in French to Quebec residents. Where consent is required, we ensure that all related information is available in clear and simple language.</p>
<p><em>Conformément à la Charte de la langue française du Québec et aux exigences de transparence de la Loi 25, ${inputs.businessName} fournit les communications relatives à la vie privée en français aux résidents du Québec. Lorsque le consentement est requis, nous veillons à ce que toutes les informations connexes soient disponibles dans un langage clair et simple.</em></p>
<p>If you would like to receive privacy communications in French, please indicate your preference when contacting us at <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`,
      applicableJurisdictions: ['law25'],
    },
  ]

  return sections
}
