import type { PrivacyPolicyInputs, PolicySection } from '@/types'

export function getGdprSectionsFr(inputs: PrivacyPolicyInputs): PolicySection[] {
  return [
    {
      id: 'gdpr-legal-basis',
      heading: 'Base juridique du traitement (RGPD)',
      content: `<p>En vertu du Règlement général sur la protection des données (RGPD), ${inputs.businessName} doit disposer d’une base juridique valable pour traiter vos données personnelles. Nous nous appuyons sur les bases juridiques suivantes selon le contexte du traitement :</p>
<ul>
<li><strong>Consentement (article 6(1)(a)) :</strong> lorsque vous avez donné un consentement clair, éclairé et non ambigu au traitement de vos données pour des finalités précises, telles que les communications marketing ou les témoins non essentiels. Vous pouvez retirer votre consentement en tout temps sans compromettre la licéité du traitement effectué avant le retrait.</li>
<li><strong>Exécution d’un contrat (article 6(1)(b)) :</strong> lorsque le traitement est nécessaire pour exécuter nos obligations contractuelles envers vous, par exemple fournir nos services, traiter des paiements ou gérer votre compte.</li>
<li><strong>Obligation légale (article 6(1)(c)) :</strong> lorsque le traitement est nécessaire au respect d’une obligation légale à laquelle nous sommes assujettis, par exemple la déclaration fiscale, la prévention de la fraude ou la réponse à des demandes légitimes d’autorités publiques.</li>
<li><strong>Intérêts légitimes (article 6(1)(f)) :</strong> lorsque le traitement est nécessaire aux fins de nos intérêts légitimes ou de ceux d’un tiers, pourvu que ces intérêts ne prévalent pas sur vos droits et libertés fondamentaux. Nos intérêts légitimes comprennent l’amélioration de nos services, la sécurité des réseaux et de l’information, et l’analyse commerciale.</li>
</ul>
<p>Vous avez le droit de vous opposer en tout temps au traitement fondé sur les intérêts légitimes. Nous cesserons le traitement sauf si nous pouvons démontrer des motifs légitimes impérieux qui prévalent sur vos intérêts, droits et libertés.</p>`,
      applicableJurisdictions: ['gdpr'],
    },
    {
      id: 'gdpr-dpo',
      heading: 'Délégué à la protection des données',
      content: `<p>${inputs.businessName} a désigné un point de contact pour les questions relatives à la protection des données. Si vous avez des questions sur la façon dont nous traitons vos données personnelles ou souhaitez exercer vos droits en vertu du RGPD, vous pouvez contacter notre représentant à :</p>
<ul>
<li><strong>Courriel :</strong> <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a></li>
</ul>
<p>Vous avez également le droit de déposer une plainte auprès de votre autorité de contrôle locale si vous croyez que notre traitement de vos données personnelles contrevient au RGPD. Une liste des autorités de protection des données de l’UE/EEE est disponible à <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu/about-edpb/about-edpb/members_en</a>.</p>`,
      applicableJurisdictions: ['gdpr'],
    },
    {
      id: 'gdpr-rights',
      heading: 'Vos droits en vertu du RGPD',
      content: `<p>Si vous êtes situé dans l’Espace économique européen (EEE), au Royaume-Uni ou en Suisse, vous disposez des droits suivants en vertu du Règlement général sur la protection des données :</p>
<ul>
<li><strong>Droit d’accès (article 15) :</strong> obtenir la confirmation que nous traitons vos données personnelles et, le cas échéant, y accéder ainsi qu’aux informations sur la façon dont elles sont traitées.</li>
<li><strong>Droit de rectification (article 16) :</strong> demander la correction de données personnelles inexactes et le complément de données incomplètes.</li>
<li><strong>Droit à l’effacement (article 17) :</strong> demander la suppression de vos données personnelles lorsqu’elles ne sont plus nécessaires aux finalités pour lesquelles elles ont été recueillies, lorsque vous retirez votre consentement, vous opposez au traitement, ou lorsqu’elles ont été traitées illicitement.</li>
<li><strong>Droit à la limitation du traitement (article 18) :</strong> demander la limitation du traitement dans certaines circonstances, par exemple lorsque vous contestez l’exactitude des données ou vous opposez au traitement.</li>
<li><strong>Droit à la portabilité des données (article 20) :</strong> recevoir vos données personnelles dans un format structuré, couramment utilisé et lisible par machine, et les transmettre à un autre responsable du traitement sans entrave.</li>
<li><strong>Droit d’opposition (article 21) :</strong> vous opposer au traitement fondé sur les intérêts légitimes ou à des fins de marketing direct. Nous cesserons le traitement sauf motifs légitimes impérieux.</li>
<li><strong>Droit de ne pas faire l’objet d’une décision automatisée (article 22) :</strong> ne pas être soumis à une décision fondée uniquement sur un traitement automatisé, y compris le profilage, produisant des effets juridiques ou vous affectant de façon similaire de manière significative.</li>
</ul>
<p>Pour exercer l’un de ces droits, contactez-nous à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Nous répondrons dans un délai de 30 jours, comme l’exige le RGPD. Dans certains cas, ce délai peut être prolongé de 60 jours supplémentaires; nous vous en informerons alors avec les motifs de la prolongation.</p>
<p>Nous ne facturerons aucun frais pour le traitement de votre demande, sauf si celle-ci est manifestement infondée ou excessive, auquel cas nous pouvons facturer des frais raisonnables ou refuser d’y donner suite.</p>`,
      applicableJurisdictions: ['gdpr'],
    },
    {
      id: 'gdpr-transfers',
      heading: 'Transferts internationaux de données (RGPD)',
      content: `<p>Lorsque nous transférons des données personnelles hors de l’EEE, du Royaume-Uni ou de la Suisse, nous veillons à ce que des garanties appropriées soient en place conformément au RGPD. Ces garanties comprennent :</p>
<ul>
<li><strong>Décisions d’adéquation :</strong> nous pouvons transférer des données vers des pays pour lesquels la Commission européenne a reconnu un niveau adéquat de protection (article 45).</li>
<li><strong>Clauses contractuelles types (CCT) :</strong> en l’absence de décision d’adéquation, nous utilisons des clauses contractuelles types approuvées par la Commission européenne (article 46(2)(c)).</li>
<li><strong>Mesures supplémentaires :</strong> au besoin, nous mettons en œuvre des mesures techniques et organisationnelles supplémentaires, telles que le chiffrement et la pseudonymisation.</li>
</ul>
<p>Vous pouvez demander une copie des garanties que nous utilisons pour les transferts internationaux en nous contactant à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>`,
      applicableJurisdictions: ['gdpr'],
    },
    {
      id: 'gdpr-breach',
      heading: 'Notification de violation de données',
      content: `<p>En cas de violation de données personnelles susceptible d’entraîner un risque pour vos droits et libertés, ${inputs.businessName} :</p>
<ul>
<li>Notifiera l’autorité de contrôle compétente dans les 72 heures suivant la prise de connaissance de la violation, conformément à l’article 33 du RGPD</li>
<li>Notifiera les personnes concernées sans retard injustifié lorsque la violation est susceptible d’entraîner un risque élevé pour leurs droits et libertés, conformément à l’article 34</li>
<li>Documentera la violation, ses effets et les mesures correctives prises</li>
</ul>
<p>Nous maintenons un plan d’intervention en cas d’incident et testons régulièrement nos procédures afin d’assurer une réponse rapide et efficace.</p>`,
      applicableJurisdictions: ['gdpr'],
    },
  ]
}
