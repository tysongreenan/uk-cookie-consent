import type { PrivacyPolicyInputs, PolicySection } from '@/types'

export function getLaw25SectionsFr(inputs: PrivacyPolicyInputs): PolicySection[] {
  return [
    {
      id: 'law25-overview',
      heading: 'Protection des renseignements personnels au Québec (Loi 25)',
      content: `<p>${inputs.businessName} se conforme à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec, modernisée par le projet de loi 64 (couramment appelée « Loi 25 »). La Loi 25 a considérablement renforcé les protections de la vie privée des résidents du Québec à compter de septembre 2023.</p>
<p>La présente section décrit les droits et protections supplémentaires qui vous sont conférés si vous êtes résident du Québec, ainsi que nos obligations particulières en vertu de cette législation.</p>`,
      applicableJurisdictions: ['law25'],
    },
    {
      id: 'law25-privacy-officer',
      heading: 'Personne responsable de la protection des renseignements personnels',
      content: `<p>Conformément à la Loi 25, ${inputs.businessName} a désigné une personne responsable de la protection des renseignements personnels (le « responsable de la protection des renseignements personnels »). Son rôle est d’assurer la conformité à la législation québécoise sur la vie privée et de traiter toutes les demandes de renseignement, plaintes et demandes d’accès relatives aux renseignements personnels.</p>
<p>Vous pouvez joindre notre responsable de la protection des renseignements personnels à :</p>
<ul>
<li><strong>Courriel :</strong> <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
</ul>
<p>Le titre et les coordonnées de notre responsable sont publiés sur notre site Web, comme l’exige la loi.</p>`,
      applicableJurisdictions: ['law25'],
    },
    {
      id: 'law25-consent',
      heading: 'Exigences de consentement en vertu de la Loi 25',
      content: `<p>La Loi 25 exige que le consentement à la collecte, à l’utilisation et à la communication de renseignements personnels soit :</p>
<ul>
<li><strong>Manifeste, libre et éclairé :</strong> nous vous fournissons un langage clair et simple expliquant quels renseignements personnels nous recueillons et pourquoi, afin que vous puissiez prendre une décision éclairée.</li>
<li><strong>Donné pour des finalités spécifiques :</strong> nous obtenons un consentement distinct pour chaque finalité distincte pour laquelle vos renseignements personnels sont recueillis, utilisés ou communiqués.</li>
<li><strong>Demandé séparément :</strong> le consentement à la collecte de renseignements personnels est demandé séparément de toute autre information ou entente.</li>
<li><strong>Exprès pour les renseignements sensibles :</strong> pour les renseignements personnels sensibles (y compris les données biométriques, de santé et financières), nous obtenons votre consentement exprès.</li>
</ul>
<p>Un consentement obtenu dans des conditions qui ne respectent pas ces exigences est sans effet. Vous pouvez retirer votre consentement en tout temps. Nous vous informerons à l’avance des conséquences du retrait de votre consentement.</p>
<h3>Consentement pour les mineurs</h3>
<p>Pour les personnes de moins de 14 ans, le consentement doit être donné par le titulaire de l’autorité parentale ou un tuteur. Les personnes de 14 ans et plus peuvent consentir pour elles-mêmes.</p>`,
      applicableJurisdictions: ['law25'],
    },
    {
      id: 'law25-rights',
      heading: 'Vos droits en tant que résident du Québec',
      content: `<p>La Loi 25 confère aux résidents du Québec les droits suivants concernant leurs renseignements personnels :</p>
<ul>
<li><strong>Droit d’accès :</strong> accéder aux renseignements personnels que nous détenons à votre sujet et être informé de leur utilisation et des personnes à qui ils ont été communiqués.</li>
<li><strong>Droit de rectification :</strong> demander la correction de renseignements personnels inexacts, incomplets ou équivoques, ou la suppression de renseignements dont la collecte n’est pas autorisée par la loi.</li>
<li><strong>Droit à la désindexation :</strong> demander qu’un hyperlien rattaché à votre nom donnant accès à de l’information soit désindexé ou que la réindexation du lien cesse, lorsque le lien contrevient à la loi ou à une ordonnance judiciaire (le « droit à l’oubli »).</li>
<li><strong>Droit à la portabilité des données :</strong> recevoir une copie de vos renseignements personnels dans un format technologique structuré et couramment utilisé, et les faire transférer à une autre organisation à votre demande.</li>
<li><strong>Droit de retirer le consentement :</strong> retirer en tout temps votre consentement à la collecte, à l’utilisation ou à la communication de vos renseignements personnels. Nous vous informerons des conséquences du retrait.</li>
<li><strong>Droit d’être informé des décisions automatisées :</strong> lorsque nous utilisons des processus décisionnels automatisés pour prendre des décisions à votre sujet, vous avez le droit d’en être informé et de soumettre des observations à une personne au sein de notre organisation pouvant réviser la décision.</li>
</ul>
<h3>Exercice de vos droits</h3>
<p>Pour exercer l’un de ces droits, contactez notre responsable de la protection des renseignements personnels à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Nous répondrons dans un délai de 30 jours suivant la réception de votre demande. Si nous refusons votre demande en tout ou en partie, nous vous fournirons les motifs écrits du refus.</p>`,
      applicableJurisdictions: ['law25'],
    },
    {
      id: 'law25-pia',
      heading: 'Évaluations des facteurs relatifs à la vie privée',
      content: `<p>Conformément à la Loi 25, ${inputs.businessName} effectue des évaluations des facteurs relatifs à la vie privée (EFVP) avant :</p>
<ul>
<li>D’acquérir, de développer ou de refondre des systèmes d’information ou des prestations de services électroniques impliquant des renseignements personnels</li>
<li>De communiquer des renseignements personnels à l’extérieur du Québec</li>
<li>De mettre en œuvre tout nouveau projet impliquant la collecte, l’utilisation ou la communication de renseignements personnels</li>
</ul>
<p>Ces évaluations portent sur la nécessité du projet, les renseignements personnels en cause, les risques pour la vie privée et les mesures en place pour atténuer ces risques.</p>`,
      applicableJurisdictions: ['law25'],
    },
    {
      id: 'law25-breach',
      heading: 'Incidents de confidentialité',
      content: `<p>En vertu de la Loi 25, ${inputs.businessName} est tenu de prendre des mesures pour réduire le risque de préjudice et prévenir la récurrence des incidents de confidentialité (violations de données). En cas d’incident de confidentialité présentant un risque de préjudice sérieux, nous :</p>
<ul>
<li>Aviserons promptement la Commission d’accès à l’information du Québec (CAI)</li>
<li>Aviserons les personnes concernées en indiquant la nature de l’incident, les renseignements personnels en cause et les mesures prises ou à prendre</li>
<li>Tiendrons un registre de tous les incidents de confidentialité, qui sera mis à la disposition de la CAI sur demande</li>
</ul>
<h3>Déposer une plainte</h3>
<p>Si vous croyez que vos renseignements personnels ont été traités en violation de la loi québécoise sur la vie privée, vous pouvez déposer une plainte auprès de la Commission d’accès à l’information du Québec :</p>
<ul>
<li><strong>Site Web :</strong> <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noopener noreferrer">www.cai.gouv.qc.ca</a></li>
<li><strong>Sans frais :</strong> 1-888-528-7741</li>
</ul>`,
      applicableJurisdictions: ['law25'],
    },
    {
      id: 'law25-language',
      heading: 'Langue de communication',
      content: `<p>Conformément à la Charte de la langue française du Québec et aux exigences de transparence de la Loi 25, ${inputs.businessName} fournit les communications relatives à la vie privée en français aux résidents du Québec. Lorsque le consentement est requis, nous veillons à ce que toutes les informations connexes soient disponibles dans un langage clair et simple.</p>
<p>Si vous souhaitez recevoir des communications relatives à la vie privée dans une autre langue, veuillez indiquer votre préférence en nous contactant à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`,
      applicableJurisdictions: ['law25'],
    },
  ]
}
