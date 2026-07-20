import type { PrivacyPolicyInputs, PolicySection } from '@/types'
import {
  escapeHtml,
  formatLastUpdated,
  formatList,
  humanizeKey,
  labelCookieCategory,
  labelData,
  labelMethod,
  labelPurpose,
  labelThirdParty,
  resolvePurposes,
  resolveRetentionText,
} from './shared'

/**
 * French (fr-CA) common privacy policy sections.
 * Tuned for Quebec/Canadian French where relevant.
 */
export function getCommonSectionsFr(inputs: PrivacyPolicyInputs): PolicySection[] {
  const lastUpdated = formatLastUpdated('fr')
  const purposes = resolvePurposes(inputs)
  const retentionText = resolveRetentionText(inputs, 'fr')
  const hasServiceProviders = inputs.thirdPartyServices.length > 0
  const minAge = inputs.minimumAge || 16

  const sections: PolicySection[] = [
    {
      id: 'introduction',
      heading: 'Politique de confidentialité',
      subheading: `Dernière mise à jour : ${lastUpdated}`,
      content: `<p>${inputs.businessName} (« nous », « notre » ou « nos ») exploite le site Web <a href="${inputs.websiteUrl}">${inputs.websiteUrl}</a>. La présente politique de confidentialité explique comment nous recueillons, utilisons, communiquons et protégeons vos renseignements personnels lorsque vous visitez notre site Web ou utilisez nos services.</p>
<p>Nous nous engageons à protéger votre vie privée et à traiter vos renseignements personnels avec transparence et diligence. En accédant à nos services ou en les utilisant, vous reconnaissez avoir lu et compris la présente politique de confidentialité. Si vous n’acceptez pas les pratiques qui y sont décrites, veuillez ne pas utiliser nos services.</p>
<p>Nous pouvons mettre à jour la présente politique de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page et en mettant à jour la date de « Dernière mise à jour » ci-dessus.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'data-collection',
      heading: 'Renseignements que nous recueillons',
      content: `<p>${inputs.businessName} recueille des renseignements personnels afin de fournir et d’améliorer nos services. Les types de renseignements personnels que nous recueillons comprennent :</p>
<ul>
${inputs.dataCollected.map((d) => `<li><strong>${labelData(d, 'fr')}</strong></li>`).join('\n')}
</ul>
<h3>Comment nous recueillons vos renseignements</h3>
<p>Nous recueillons des renseignements personnels par les moyens suivants :</p>
<ul>
${inputs.collectionMethods.map((m) => `<li>${labelMethod(m, 'fr')}</li>`).join('\n')}
</ul>
${
  inputs.cookieCategories.length > 0 || (inputs.cookies && inputs.cookies.length > 0)
    ? `<h3>Témoins (cookies) et technologies de suivi</h3>
<p>Nous utilisons des témoins (cookies) et des technologies de suivi similaires pour recueillir et suivre des renseignements sur votre activité sur nos services.${
        inputs.cookieCategories.length > 0
          ? ` Les catégories de témoins que nous utilisons comprennent : ${formatList(inputs.cookieCategories.map((c) => labelCookieCategory(c, 'fr')), 'fr')}.`
          : ''
      } Vous pouvez gérer vos préférences relatives aux témoins au moyen de notre bannière de consentement aux cookies ou des paramètres de votre navigateur.</p>${
        inputs.cookies && inputs.cookies.length > 0
          ? `
<p>Les témoins précis déposés sur notre site Web sont énumérés ci-dessous :</p>
<table class="cookie-table" style="width:100%;border-collapse:collapse;margin:1em 0;">
<thead>
<tr><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Nom</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Fournisseur</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Catégorie</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Durée</th><th style="text-align:left;border-bottom:1px solid #ccc;padding:6px;">Finalité</th></tr>
</thead>
<tbody>
${inputs.cookies
  .map(
    (c) =>
      `<tr><td style="padding:6px;border-bottom:1px solid #eee;"><code>${escapeHtml(c.name)}</code></td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(c.provider || '—')}</td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(labelCookieCategory(c.category, 'fr'))}</td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(c.duration || '—')}</td><td style="padding:6px;border-bottom:1px solid #eee;">${escapeHtml(c.purpose || '—')}</td></tr>`,
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

    {
      id: 'data-usage',
      heading: 'Comment nous utilisons vos renseignements',
      content: `<p>${inputs.businessName} utilise les renseignements personnels que nous recueillons aux fins suivantes :</p>
<ul>
${purposes.map((p) => `<li>${labelPurpose(p, 'fr')}</li>`).join('\n')}
</ul>
<p>Nous n’utiliserons pas vos renseignements personnels à des fins substantiellement différentes de celles décrites ci-dessus sans d’abord obtenir votre consentement ou vous en aviser, conformément à la loi applicable.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'data-sharing',
      heading: 'Comment nous communiquons vos renseignements',
      content: inputs.sharesDataWithThirdParties
        ? `<p>${inputs.businessName} peut communiquer vos renseignements personnels à des tiers dans les circonstances suivantes :</p>
<h3>Fournisseurs de services</h3>
<p>Nous faisons appel à des entreprises et des personnes de confiance pour fournir des services en notre nom, notamment l’hébergement, l’analyse, le traitement des paiements et le soutien à la clientèle. Ces fournisseurs n’ont accès à vos renseignements personnels que dans la mesure nécessaire à l’exécution de leurs tâches et sont tenus de les protéger.</p>
${
  hasServiceProviders
    ? `<p>Les services tiers que nous utilisons actuellement comprennent :</p>
<ul>
${inputs.thirdPartyServices.map((s) => `<li>${labelThirdParty(s, 'fr')}</li>`).join('\n')}
</ul>`
    : ''
}
${
  inputs.thirdPartyRecipients && inputs.thirdPartyRecipients.length > 0
    ? `<h3>Autres destinataires</h3>
<p>Nous pouvons également communiquer vos renseignements à : ${formatList(inputs.thirdPartyRecipients.map(humanizeKey), 'fr')}.</p>`
    : ''
}
<h3>Exigences légales</h3>
<p>Nous pouvons communiquer vos renseignements personnels si la loi l’exige ou en réponse à des demandes valides d’autorités publiques (par ex. ordonnance d’un tribunal, organisme gouvernemental ou demande des forces de l’ordre).</p>
<h3>Transferts d’entreprise</h3>
<p>En cas de fusion, d’acquisition, de réorganisation ou de vente d’actifs, vos renseignements personnels peuvent être transférés à l’entité acquéreuse. Nous vous en aviserons avant que vos renseignements ne soient assujettis à une autre politique de confidentialité.</p>`
        : `<p>${inputs.businessName} ne vend, n’échange ni ne communique autrement vos renseignements personnels à des tiers à des fins de marketing pour leur propre compte.</p>
${
  hasServiceProviders
    ? `<h3>Fournisseurs de services</h3>
<p>Nous faisons appel à des entreprises tierces de confiance pour nous aider à exploiter notre site Web et nos services (par exemple analyse, paiements ou hébergement). Ces fournisseurs traitent les renseignements personnels uniquement en notre nom et sont tenus de les protéger :</p>
<ul>
${inputs.thirdPartyServices.map((s) => `<li>${labelThirdParty(s, 'fr')}</li>`).join('\n')}
</ul>`
    : ''
}
<p>Nous ne pouvons communiquer vos renseignements personnels que dans les circonstances limitées suivantes :</p>
<ul>
<li><strong>Exigences légales :</strong> lorsque la loi, une ordonnance d’un tribunal ou un règlement gouvernemental l’exige.</li>
<li><strong>Protection des droits :</strong> pour protéger les droits, les biens ou la sécurité de ${inputs.businessName}, de nos utilisateurs ou du public.</li>
<li><strong>Transferts d’entreprise :</strong> dans le cadre d’une fusion, d’une acquisition ou d’une vente d’actifs, où vos renseignements peuvent être transférés à l’entité acquéreuse.</li>
</ul>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'data-retention',
      heading: 'Conservation des données',
      content: `<p>${inputs.businessName} conserve vos renseignements personnels pendant ${retentionText}, sauf si une période de conservation plus longue est exigée ou permise par la loi.</p>
<p>Pour déterminer la période de conservation appropriée, nous tenons compte de la quantité, de la nature et de la sensibilité des renseignements personnels, du risque de préjudice en cas d’utilisation ou de communication non autorisée, des finalités pour lesquelles nous traitons vos renseignements et des exigences légales applicables.</p>
<p>Lorsque vos renseignements personnels ne sont plus nécessaires aux fins pour lesquelles ils ont été recueillis, nous les supprimons ou les anonymisons de façon sécuritaire.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'data-security',
      heading: 'Sécurité des données',
      content: `<p>${inputs.businessName} met en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos renseignements personnels contre l’accès, la modification, la communication ou la destruction non autorisés. Ces mesures comprennent notamment :</p>
<ul>
<li>Le chiffrement des données en transit au moyen de protocoles TLS/SSL</li>
<li>Le stockage sécurisé des renseignements personnels avec des contrôles d’accès</li>
<li>Des évaluations de sécurité et des tests de vulnérabilité réguliers</li>
<li>La formation du personnel sur la protection des données et les pratiques de sécurité</li>
<li>Des procédures d’intervention en cas d’incidents de confidentialité potentiels</li>
</ul>
<p>Bien que nous prenions des mesures raisonnables pour protéger vos renseignements personnels, aucune méthode de transmission sur Internet ni de stockage électronique n’est totalement sécuritaire. Nous ne pouvons garantir une sécurité absolue de vos données.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'your-rights',
      heading: 'Vos droits',
      content: `<p>Selon votre territoire, vous pouvez disposer de certains droits concernant vos renseignements personnels. Ceux-ci peuvent comprendre :</p>
<ul>
<li><strong>Droit d’accès :</strong> vous pouvez demander une copie des renseignements personnels que nous détenons à votre sujet.</li>
<li><strong>Droit de rectification :</strong> vous pouvez demander que nous corrigeons des renseignements personnels inexacts ou incomplets.</li>
${inputs.allowsUserDeletion ? '<li><strong>Droit à l’effacement :</strong> vous pouvez demander que nous supprimions vos renseignements personnels, sous réserve de certaines exceptions légales.</li>' : ''}
${inputs.allowsUserExport ? '<li><strong>Droit à la portabilité :</strong> vous pouvez demander une copie de vos renseignements personnels dans un format structuré, couramment utilisé et lisible par machine.</li>' : ''}
<li><strong>Droit d’opposition :</strong> vous pouvez vous opposer à certaines activités de traitement, notamment le marketing direct.</li>
<li><strong>Droit de retirer votre consentement :</strong> lorsque nous nous appuyons sur votre consentement pour traiter des renseignements personnels, vous pouvez le retirer en tout temps.</li>
</ul>
<p>Pour exercer l’un de ces droits, veuillez nous contacter à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Nous répondrons à votre demande dans le délai prévu par la loi applicable.</p>`,
      applicableJurisdictions: ['all'],
    },

    ...(inputs.transfersDataInternationally
      ? [
          {
            id: 'international-transfers',
            heading: 'Transferts internationaux de données',
            content: `<p>Vos renseignements personnels peuvent être transférés et traités dans des pays autres que celui où vous résidez. Ces pays peuvent avoir des lois sur la protection des données différentes de celles de votre territoire.</p>
<p>Lorsque nous transférons vos renseignements personnels à l’étranger, nous prenons des mesures de protection appropriées pour assurer un niveau de protection adéquat, notamment :</p>
<ul>
<li>Le transfert vers des pays reconnus comme offrant un niveau adéquat de protection des données</li>
<li>L’utilisation de clauses contractuelles approuvées par les autorités compétentes (telles que les clauses contractuelles types)</li>
<li>Le recours à des mécanismes de certification ou à des règles d’entreprise contraignantes, le cas échéant</li>
</ul>
<p>En utilisant nos services, vous reconnaissez que vos renseignements personnels peuvent être traités dans des territoires situés hors du vôtre. Si vous avez des questions sur nos pratiques de transfert international, contactez-nous à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`,
            applicableJurisdictions: ['all'] as string[],
          },
        ]
      : []),

    {
      id: 'children',
      heading: 'Confidentialité des enfants',
      content: inputs.collectsChildrenData
        ? `<p>Nous reconnaissons l’importance de protéger la vie privée des enfants. Certaines parties de nos services peuvent être destinées à des personnes de moins de ${minAge} ans ou leur être accessibles. Nous ne recueillons des renseignements personnels auprès d’enfants qu’avec le consentement vérifiable d’un parent ou tuteur, tel que l’exige la loi applicable.</p>
<p>Si nous apprenons que nous avons recueilli des renseignements personnels d’un enfant sans le consentement approprié, nous prendrons des mesures pour les supprimer rapidement. Si vous croyez que nous avons pu recueillir des renseignements d’un enfant sans consentement adéquat, contactez-nous à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`
        : `<p>Nos services ne s’adressent pas aux personnes de moins de ${minAge} ans. Nous ne recueillons pas sciemment de renseignements personnels auprès d’enfants. Si nous apprenons que nous avons recueilli par inadvertance des renseignements personnels d’un enfant de cet âge, nous prendrons des mesures pour les supprimer dans les plus brefs délais.</p>
<p>Si vous êtes un parent ou un tuteur et croyez que votre enfant nous a fourni des renseignements personnels, contactez-nous à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a> afin que nous puissions prendre les mesures appropriées.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'third-party-links',
      heading: 'Liens vers des sites tiers',
      content: `<p>Nos services peuvent contenir des liens vers des sites Web, services ou applications de tiers qui ne sont pas exploités par ${inputs.businessName}. Nous n’avons aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques de ces sites ou services tiers et n’en assumons aucune responsabilité.</p>
<p>Nous vous encourageons à consulter la politique de confidentialité de chaque site que vous visitez. La présente politique s’applique uniquement aux renseignements recueillis par ${inputs.businessName}.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'changes',
      heading: 'Modifications de la présente politique',
      content: `<p>${inputs.businessName} peut mettre à jour la présente politique de confidentialité de temps à autre afin de refléter des changements dans nos pratiques, la technologie, les exigences légales ou d’autres facteurs. En cas de changements importants, nous :</p>
<ul>
<li>Publierons la politique mise à jour sur cette page avec une date de « Dernière mise à jour » révisée</li>
<li>Vous aviserons par courriel ou par un avis bien en vue sur notre site Web, lorsque la loi l’exige</li>
</ul>
<p>Nous vous encourageons à consulter périodiquement la présente politique pour rester informé de la façon dont nous protégeons vos renseignements personnels. Votre utilisation continue de nos services après toute modification constitue votre acceptation de la politique mise à jour.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'contact',
      heading: 'Nous joindre',
      content: `<p>Si vous avez des questions, des préoccupations ou des demandes concernant la présente politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter :</p>
<ul>
<li><strong>Courriel :</strong> <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
<li><strong>Site Web :</strong> <a href="${inputs.websiteUrl}">${inputs.websiteUrl}</a></li>
</ul>
<p>Nous nous efforcerons de répondre à toutes les demandes légitimes dans un délai raisonnable et au plus tard dans le délai exigé par la loi applicable.</p>`,
      applicableJurisdictions: ['all'],
    },

    {
      id: 'faq',
      heading: 'Foire aux questions',
      content: `<h3>Quels renseignements personnels ${inputs.businessName} recueille-t-il?</h3>
<p>Nous recueillons les types de renseignements personnels suivants : ${formatList(inputs.dataCollected.map((d) => labelData(d, 'fr')), 'fr')}. Ces renseignements sont recueillis par : ${formatList(inputs.collectionMethods.map((m) => labelMethod(m, 'fr').toLowerCase()), 'fr')}.</p>

<h3>Comment ${inputs.businessName} utilise-t-il mes renseignements personnels?</h3>
<p>Nous utilisons vos renseignements personnels aux fins suivantes : ${formatList(purposes.map((p) => labelPurpose(p, 'fr').toLowerCase()), 'fr')}. Nous n’utilisons pas vos renseignements à des fins autres que celles décrites dans la présente politique sans votre consentement.</p>

<h3>${inputs.businessName} communique-t-il mes renseignements personnels à des tiers?</h3>
<p>${
        inputs.sharesDataWithThirdParties
          ? `Oui, nous communiquons des renseignements personnels à des fournisseurs de services de confiance qui nous aident à exploiter notre entreprise${
              hasServiceProviders
                ? `, notamment ${formatList(inputs.thirdPartyServices.map((s) => labelThirdParty(s, 'fr')), 'fr')}`
                : ''
            }. Ces fournisseurs sont contractuellement tenus de protéger vos renseignements et ne peuvent les utiliser que pour les services qu’ils nous rendent.`
          : hasServiceProviders
            ? `Nous ne vendons ni ne communiquons vos renseignements personnels à des tiers à des fins de marketing pour leur propre compte. Nous utilisons des fournisseurs de services tels que ${formatList(inputs.thirdPartyServices.map((s) => labelThirdParty(s, 'fr')), 'fr')} pour nous aider à exploiter nos services; ils traitent les données uniquement en notre nom.`
            : `Nous ne vendons ni ne communiquons vos renseignements personnels à des tiers à des fins de marketing pour leur propre compte. Nous ne pouvons communiquer des renseignements que lorsque la loi l’exige, pour protéger nos droits ou dans le cadre d’un transfert d’entreprise.`
      }</p>

<h3>Combien de temps ${inputs.businessName} conserve-t-il mes renseignements personnels?</h3>
<p>Nous conservons vos renseignements personnels pendant ${retentionText}. Après cette période, vos données sont supprimées ou anonymisées de façon sécuritaire. Nous pouvons conserver certains renseignements plus longtemps lorsque la loi l’exige ou pour des finalités commerciales légitimes telles que le règlement de différends.</p>

<h3>Comment puis-je exercer mes droits en matière de vie privée?</h3>
<p>Vous pouvez exercer vos droits en nous contactant à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Selon votre territoire, vous pouvez avoir le droit d’accéder à vos renseignements, de les corriger, de les supprimer ou de les exporter. Nous répondrons dans le délai exigé par la loi applicable.</p>

${
  inputs.allowsUserDeletion
    ? `<h3>Puis-je demander la suppression de mes renseignements personnels?</h3>
<p>Oui. Vous avez le droit de demander la suppression de vos renseignements personnels. Pour faire une demande de suppression, contactez-nous à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Veuillez noter que nous pourrions devoir conserver certains renseignements pour le respect de la loi, le règlement de différends ou l’achèvement de transactions que vous avez amorcées.</p>`
    : ''
}

${
  inputs.allowsUserExport
    ? `<h3>Puis-je exporter mes renseignements personnels?</h3>
<p>Oui. Vous avez le droit de demander une copie de vos renseignements personnels dans un format structuré, couramment utilisé et lisible par machine. Pour faire une demande de portabilité, contactez-nous à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`
    : ''
}`,
      faqQuestion: `Quelle est la politique de confidentialité de ${inputs.businessName}?`,
      faqAnswer: `${inputs.businessName} recueille ${formatList(inputs.dataCollected.map((d) => labelData(d, 'fr')).slice(0, 3), 'fr')} et d’autres renseignements personnels afin de ${formatList(purposes.map((p) => labelPurpose(p, 'fr').toLowerCase()).slice(0, 2), 'fr')}. Les données sont conservées pendant ${retentionText} et les utilisateurs peuvent exercer leurs droits en contactant ${inputs.contactEmail}.`,
      applicableJurisdictions: ['all'],
    },
  ]

  return sections
}
