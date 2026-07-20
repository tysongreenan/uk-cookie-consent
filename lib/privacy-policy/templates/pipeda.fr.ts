import type { PrivacyPolicyInputs, PolicySection } from '@/types'

export function getPipedaSectionsFr(inputs: PrivacyPolicyInputs): PolicySection[] {
  return [
    {
      id: 'pipeda-overview',
      heading: 'Vos droits à la vie privée en vertu du droit canadien (LPRPDE)',
      content: `<p>${inputs.businessName} s’engage à respecter la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) ainsi que la législation provinciale applicable en matière de protection de la vie privée. La LPRPDE établit 10 principes de pratique équitable qui régissent la collecte, l’utilisation et la communication de renseignements personnels dans le cadre d’activités commerciales au Canada.</p>
<p>La présente section décrit la façon dont nous respectons ces principes et énonce vos droits en tant que résident canadien.</p>`,
      applicableJurisdictions: ['pipeda'],
    },
    {
      id: 'pipeda-accountability',
      heading: 'Responsabilité',
      content: `<p>${inputs.businessName} est responsable des renseignements personnels sous son contrôle. Nous avons désigné un responsable de la protection de la vie privée qui est imputable de notre conformité à la LPRPDE et à la présente politique de confidentialité.</p>
<p>Notre responsable de la protection de la vie privée peut être joint à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>.</p>
<p>Nous sommes responsables des renseignements personnels qui ont été transférés à des tiers pour traitement en notre nom. Nous utilisons des moyens contractuels et autres pour veiller à ce que les fournisseurs de services tiers protègent vos renseignements personnels à un niveau comparable.</p>`,
      applicableJurisdictions: ['pipeda'],
    },
    {
      id: 'pipeda-consent',
      heading: 'Consentement',
      content: `<p>En vertu de la LPRPDE, votre connaissance et votre consentement sont requis pour la collecte, l’utilisation ou la communication de renseignements personnels, sauf lorsque cela est inapproprié ou autrement permis par la loi.</p>
<p>${inputs.businessName} obtient le consentement de la façon suivante :</p>
<ul>
<li><strong>Consentement exprès :</strong> pour les renseignements personnels sensibles, tels que les renseignements financiers ou de santé, nous obtenons votre consentement exprès et affirmatif avant la collecte ou l’utilisation.</li>
<li><strong>Consentement implicite :</strong> pour des renseignements moins sensibles, nous pouvons nous appuyer sur un consentement implicite lorsque la finalité de la collecte serait évidente pour une personne raisonnable et que vous fournissez volontairement les renseignements.</li>
<li><strong>Consentement par retrait (opt-out) :</strong> dans certaines circonstances, telles que les communications marketing, nous pouvons nous appuyer sur un mécanisme de retrait qui vous permet de refuser d’autres communications.</li>
</ul>
<p>Vous pouvez retirer votre consentement en tout temps, sous réserve des restrictions légales ou contractuelles et moyennant un préavis raisonnable. Veuillez noter que le retrait du consentement peut affecter notre capacité à vous fournir certains services. Nous vous informerons des conséquences du retrait lorsque vous en ferez la demande.</p>`,
      applicableJurisdictions: ['pipeda'],
    },
    {
      id: 'pipeda-limiting-collection',
      heading: 'Limitation de la collecte',
      content: `<p>${inputs.businessName} limite la collecte de renseignements personnels à ce qui est nécessaire aux fins que nous avons identifiées. Nous recueillons les renseignements personnels par des moyens justes et licites et ne recueillons pas d’information de façon indiscriminée.</p>
<p>Nous ne recueillerons pas de renseignements personnels au-delà de ce qui est requis pour fournir nos services et réaliser les finalités décrites dans la présente politique de confidentialité.</p>`,
      applicableJurisdictions: ['pipeda'],
    },
    {
      id: 'pipeda-rights',
      heading: 'Vos droits en vertu de la LPRPDE',
      content: `<p>En tant que résident canadien, vous disposez des droits suivants en vertu de la LPRPDE :</p>
<ul>
<li><strong>Droit d’accès :</strong> vous avez le droit de demander l’accès aux renseignements personnels que nous détenons à votre sujet et d’être informé de leur utilisation et de leur communication. Nous répondrons à votre demande d’accès dans un délai de 30 jours.</li>
<li><strong>Droit de contester l’exactitude :</strong> vous avez le droit de contester l’exactitude et l’exhaustivité de vos renseignements personnels et de demander qu’ils soient modifiés. Lorsque nous convenons que l’information est inexacte ou incomplète, nous la corrigerons et, le cas échéant, en aviserons les tiers à qui elle a été communiquée.</li>
<li><strong>Droit de retirer le consentement :</strong> vous avez le droit de retirer votre consentement à la collecte, à l’utilisation ou à la communication de vos renseignements personnels, sous réserve des restrictions légales ou contractuelles.</li>
<li><strong>Droit de porter plainte :</strong> vous avez le droit de déposer une plainte auprès du Commissariat à la protection de la vie privée du Canada (CPVP) si vous croyez que nous n’avons pas respecté la LPRPDE.</li>
</ul>
<h3>Comment faire une demande</h3>
<p>Pour exercer l’un de ces droits, soumettez votre demande à <a href="mailto:${inputs.contactEmail}">${inputs.contactEmail}</a>. Nous pourrions devoir vérifier votre identité avant de traiter votre demande. Nous répondrons dans les 30 jours suivant la réception. Si nous ne pouvons pas répondre dans ce délai, nous vous aviserons du retard et de la raison.</p>
<h3>Déposer une plainte</h3>
<p>Si vous n’êtes pas satisfait de notre réponse, ou si vous croyez que nous avons violé vos droits à la vie privée, vous pouvez déposer une plainte auprès du Commissariat à la protection de la vie privée du Canada :</p>
<ul>
<li><strong>Site Web :</strong> <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">www.priv.gc.ca</a></li>
<li><strong>Sans frais :</strong> 1-800-282-1376</li>
</ul>`,
      applicableJurisdictions: ['pipeda'],
    },
    {
      id: 'pipeda-openness',
      heading: 'Ouverture et transparence',
      content: `<p>${inputs.businessName} s’engage à être ouvert et transparent quant à ses politiques et pratiques relatives à la gestion des renseignements personnels. La présente politique de confidentialité est facilement accessible sur notre site Web et décrit :</p>
<ul>
<li>Les types de renseignements personnels que nous recueillons et les finalités pour lesquelles ils sont utilisés</li>
<li>La façon dont les renseignements personnels sont recueillis, utilisés, communiqués et conservés</li>
<li>Comment vous pouvez accéder à vos renseignements personnels et en contester l’exactitude</li>
<li>Comment joindre notre responsable de la protection de la vie privée pour des questions ou plaintes</li>
</ul>`,
      applicableJurisdictions: ['pipeda'],
    },
  ]
}
