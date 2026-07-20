import type { PrivacyPolicyInputs, PolicySection } from '@/types'

const CCPA_CATEGORY_LABELS_FR: Record<string, string> = {
  name: 'Identifiants (p. ex. nom, alias, adresse postale, adresse courriel)',
  email: 'Identifiants (p. ex. adresse courriel)',
  phone: 'Identifiants (p. ex. numéro de téléphone)',
  address: 'Identifiants (p. ex. adresse postale)',
  ip_address: 'Informations sur l’activité sur Internet ou d’autres réseaux électroniques (p. ex. adresse IP)',
  device_info: 'Informations sur l’activité sur Internet ou d’autres réseaux électroniques (p. ex. historique de navigation, appareil)',
  location: 'Données de géolocalisation',
  payment_data: 'Informations commerciales (p. ex. historiques d’achat, informations de paiement)',
  browsing_history: 'Informations sur l’activité sur Internet (p. ex. historique de navigation)',
  account_credentials: 'Identifiants (p. ex. nom de compte et identifiants de connexion)',
  social_media_profiles: 'Identifiants (p. ex. pseudonymes de médias sociaux)',
  employment_info: 'Renseignements professionnels ou liés à l’emploi',
  health_info: 'Caractéristiques de classifications protégées / renseignements personnels sensibles (santé)',
  payment: 'Informations commerciales (p. ex. historiques d’achat, informations de paiement)',
  usage_data: 'Informations sur l’activité sur Internet (p. ex. interaction avec un site ou une application)',
  cookies: 'Informations sur l’activité sur Internet (p. ex. témoins et données de suivi)',
  social_profiles: 'Identifiants (p. ex. pseudonymes de médias sociaux)',
  demographics: 'Caractéristiques de classifications protégées en vertu du droit californien ou fédéral',
  employment: 'Renseignements professionnels ou liés à l’emploi',
  government_id: 'Identifiants (p. ex. numéro d’assurance sociale, permis de conduire)',
}

export function getCcpaSectionsFr(inputs: PrivacyPolicyInputs): PolicySection[] {
  const ccpaCategories = Array.from(
    new Set(inputs.dataCollected.map((d) => CCPA_CATEGORY_LABELS_FR[d] || d)),
  )

  return [
    {
      id: 'ccpa-notice',
      heading: 'Vos droits à la vie privée en Californie (CCPA/CPRA)',
      content: `<p>Si vous êtes résident de la Californie, la California Consumer Privacy Act (CCPA), modifiée par la California Privacy Rights Act (CPRA), vous confère des droits spécifiques concernant vos renseignements personnels. La présente section décrit ces droits et explique comment les exercer.</p>
<p>${inputs.businessName} recueille, utilise et communique des renseignements personnels comme décrit dans la présente politique de confidentialité. En vertu de la CCPA, un « renseignement personnel » désigne toute information qui identifie, se rapporte à, décrit, est raisonnablement susceptible d’être associée à, ou pourrait raisonnablement être liée, directement ou indirectement, à un consommateur ou un ménage particulier.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
    {
      id: 'ccpa-categories',
      heading: 'Catégories de renseignements personnels recueillis',
      content: `<p>Au cours des 12 derniers mois, ${inputs.businessName} a recueilli les catégories suivantes de renseignements personnels auprès de consommateurs, telles que définies par la CCPA :</p>
<ul>
${ccpaCategories.map((c) => `<li>${c}</li>`).join('\n')}
</ul>
<h3>Sources des renseignements personnels</h3>
<p>Nous recueillons des renseignements personnels auprès des catégories de sources suivantes :</p>
<ul>
<li>Directement de vous (p. ex. renseignements fournis dans des formulaires ou lors de l’inscription)</li>
<li>Automatiquement depuis votre appareil (p. ex. témoins, balises pixel et technologies similaires)</li>
${inputs.sharesDataWithThirdParties ? '<li>Auprès de sources tierces (p. ex. courtiers en données, fournisseurs d’analyse, plateformes de médias sociaux)</li>' : ''}
</ul>
<h3>Finalités commerciales de la collecte</h3>
<p>Nous recueillons des renseignements personnels aux finalités commerciales décrites dans la section « Comment nous utilisons vos renseignements » de la présente politique.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
    {
      id: 'ccpa-do-not-sell',
      heading: 'Vente et partage de renseignements personnels',
      content: `<p>${inputs.businessName} ne <strong>vend pas</strong> vos renseignements personnels contre une contrepartie monétaire au sens de la CCPA.</p>
<p>${
        inputs.sharesDataWithThirdParties
          ? `Nous pouvons partager des renseignements personnels avec des fournisseurs de services tiers à des fins commerciales, comme décrit dans la section « Comment nous communiquons vos renseignements ». En vertu de la CPRA, certain partage de renseignements personnels à des fins de publicité comportementale intercontexte peut être considéré comme un « partage » même sans échange monétaire. Vous avez le droit de vous retirer de ce partage.`
          : `Nous ne partageons pas vos renseignements personnels à des fins de publicité comportementale intercontexte.`
      }</p>
<p>Nous n’avons pas de connaissance réelle de vendre ou de partager les renseignements personnels de consommateurs de moins de 16 ans.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
    {
      id: 'ccpa-rights',
      heading: 'Vos droits en tant que consommateur californien',
      content: `<p>En vertu de la CCPA/CPRA, les résidents de la Californie disposent des droits suivants :</p>
<ul>
<li><strong>Droit de savoir :</strong> demander la divulgation des catégories et des éléments précis de renseignements personnels que nous avons recueillis à votre sujet, des catégories de sources, des finalités commerciales de la collecte et des catégories de tiers avec qui nous partageons vos renseignements.</li>
<li><strong>Droit de suppression :</strong> demander la suppression de vos renseignements personnels, sous réserve de certaines exceptions prévues par la loi.</li>
<li><strong>Droit de correction :</strong> demander la correction de renseignements personnels inexacts que nous détenons à votre sujet.</li>
<li><strong>Droit de se retirer de la vente ou du partage :</strong> nous interdire de vendre ou de partager vos renseignements personnels. Vous pouvez exercer ce droit via notre lien « Do Not Sell or Share My Personal Information » ou en nous contactant.</li>
<li><strong>Droit de limiter l’utilisation de renseignements personnels sensibles :</strong> si nous recueillons des renseignements personnels sensibles, vous pouvez en limiter l’utilisation aux fins nécessaires pour fournir nos services.</li>
<li><strong>Droit à la non-discrimination :</strong> nous ne vous discriminerons pas pour l’exercice de vos droits CCPA.</li>
</ul>
<h3>Comment soumettre une demande</h3>
<p>Pour exercer vos droits, vous pouvez :</p>
<ul>
<li>Nous écrire à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
<li>Visiter notre site Web à <a href="${inputs.websiteUrl}">${inputs.websiteUrl}</a></li>
</ul>
<p>Nous vérifierons votre identité avant de traiter votre demande. Vous pouvez également désigner un agent autorisé pour soumettre une demande en votre nom en lui fournissant une autorisation écrite et signée.</p>
<p>Nous répondrons aux demandes vérifiables des consommateurs dans un délai de 45 jours. Si nous avons besoin de plus de temps (jusqu’à 45 jours supplémentaires), nous vous en informerons par écrit avec le motif et la durée de la prolongation.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
    {
      id: 'ccpa-financial-incentives',
      heading: 'Incitatifs financiers',
      content: `<p>${inputs.businessName} n’offre pas d’incitatifs financiers ni de différences de prix ou de service en échange de la conservation ou de la vente de vos renseignements personnels. Si nous offrons un tel programme à l’avenir, nous vous fournirons une description claire des conditions importantes et obtiendrons votre consentement préalable avant de vous y inscrire.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
    {
      id: 'ccpa-shine-the-light',
      heading: 'Loi californienne « Shine the Light »',
      content: `<p>En vertu de l’article 1798.83 du California Civil Code (loi « Shine the Light »), les résidents de la Californie qui fournissent des renseignements personnels à une entreprise dans le cadre de l’obtention de produits ou services peuvent demander des informations sur les renseignements personnels partagés avec des tiers à des fins de marketing direct de ces tiers.</p>
<p>${inputs.businessName} ne partage pas de renseignements personnels avec des tiers à des fins de marketing direct pour leur propre compte. Si cette pratique change, nous mettrons à jour la présente politique et vous offrirons la possibilité de vous retirer.</p>`,
      applicableJurisdictions: ['ccpa'],
    },
  ]
}
