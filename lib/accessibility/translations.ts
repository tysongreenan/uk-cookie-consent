/**
 * Visitor-facing strings for the Accessibility Menu.
 *
 * Server-side only: the widget bundle ships with no strings of its own. banner.js
 * inlines the languages listed in `A11Y_INLINE_LANGUAGES` into the runtime config so
 * the visitor's language picker works without another request. Other banner
 * languages fall back to English until they are authored here.
 */

export type A11yProfileId =
  | 'seizureSafe'
  | 'readAloud'
  | 'visuallyImpaired'
  | 'adhd'
  | 'cognitive'
  | 'motorImpaired'

export interface A11yStrings {
  // Chrome
  menuTitle: string
  openMenu: string
  closeMenu: string
  resetSettings: string
  resetDone: string
  language: string
  // Sections
  sectionProfiles: string
  sectionContent: string
  sectionVisual: string
  sectionColor: string
  sectionTools: string
  // Profiles: name + description
  profiles: Record<A11yProfileId, { name: string; description: string }>
  // Features
  fontSize: string
  fontSizeDecrease: string
  fontSizeIncrease: string
  fontWeight: string
  lineHeight: string
  letterSpacing: string
  dyslexiaFont: string
  highlightLinks: string
  highlightTitles: string
  superFocus: string
  readAloud: string
  readAloudHint: string
  readAloudShort: string
  readAloudOnSpeak: string
  readAloudOffSpeak: string
  readAloudPreviewOff: string
  readAloudPreviewOn: string
  profilePreview: string
  speakOn: string
  speakOff: string
  menuVoice: string
  menuVoiceOn: string
  menuVoiceOff: string
  menuVoiceOnSpeak: string
  speakHeading: string
  speakLink: string
  speakButton: string
  speakImage: string
  speakRequired: string
  speakImageMissing: string
  speakChecked: string
  speakNotChecked: string
  speakInvalid: string
  ttsUnavailable: string
  readingGuide: string
  bigCursor: string
  pageStructure: string
  monochrome: string
  lowSaturation: string
  highSaturation: string
  highContrast: string
  lightContrast: string
  darkContrast: string
  stopAnimations: string
  hideImages: string
  imageTooltips: string
  muteSounds: string
  // Level labels for cycling buttons (index 0 = off)
  levelOff: string
  levelLabels: string[]
  // Page structure dialog
  structureTitle: string
  structureHeadings: string
  structureLandmarks: string
  structureLinks: string
  structureEmpty: string
  // Image tooltips
  missingAlt: string
  // Footer
  statementLink: string
  feedbackLink: string
  poweredBy: string
  disclaimer: string
  // Live region
  turnedOn: string
  turnedOff: string
  fontSizeAnnounce: string // uses {value}
  profileApplied: string   // uses {name}
}

const en: A11yStrings = {
  menuTitle: 'Accessibility Menu',
  openMenu: 'Open accessibility menu',
  closeMenu: 'Close',
  resetSettings: 'Reset settings',
  resetDone: 'All accessibility settings reset',
  language: 'Language',

  sectionProfiles: 'Accessibility profiles',
  sectionContent: 'Content adjustments',
  sectionVisual: 'Visual & navigation aids',
  sectionColor: 'Colour adjustments',
  sectionTools: 'Additional tools',

  profiles: {
    seizureSafe: { name: 'Seizure Safe Profile', description: 'Stops animations and reduces colour saturation.' },
    readAloud: { name: 'Read Aloud', description: 'Reads the page as you hover or tap.' },
    visuallyImpaired: { name: 'Visually Impaired Profile', description: 'Larger type, stronger contrast, and highlighted links.' },
    adhd: { name: 'ADHD Friendly Profile', description: 'Reduces distractions for better focus.' },
    cognitive: { name: 'Cognitive & Learning Profile', description: 'Helpful tools for reading and comprehension.' },
    motorImpaired: { name: 'Motor Impaired Profile', description: 'Larger cursor and always-visible focus for keyboard-only navigation.' },
  },

  fontSize: 'Adjust font size',
  fontSizeDecrease: 'Decrease font size',
  fontSizeIncrease: 'Increase font size',
  fontWeight: 'Font weight',
  lineHeight: 'Line height',
  letterSpacing: 'Letter spacing',
  dyslexiaFont: 'Dyslexia font',
  highlightLinks: 'Highlight links',
  highlightTitles: 'Highlight titles',
  superFocus: 'Super focus',
  readAloud: 'Read aloud',
  readAloudShort: 'Hover or tap the page to hear it.',
  readAloudHint: 'Hover, tap, or tab the page to hear it. Esc stops. This is not a screen reader.',
  readAloudOnSpeak: 'Read aloud is on. Hover, tap, or tab the page to hear it. Press Escape to stop.',
  readAloudOffSpeak: 'Read aloud is off.',
  readAloudPreviewOff: 'Read aloud. Off. Click to turn it on.',
  readAloudPreviewOn: 'Read aloud. On. Hover the page to hear it.',
  profilePreview: '{name}. {state}.',
  speakOn: 'on',
  speakOff: 'off',
  menuVoice: 'Menu voice',
  menuVoiceOn: 'Turn on spoken menu labels',
  menuVoiceOff: 'Mute spoken menu labels',
  menuVoiceOnSpeak: 'Menu voice is on. Hover a button to hear its name. Tap the microphone again to mute.',
  speakHeading: 'Heading {n}',
  speakLink: 'Link',
  speakButton: 'Button',
  speakImage: 'Image',
  speakRequired: 'required',
  speakImageMissing: 'No description provided',
  speakChecked: 'checked',
  speakNotChecked: 'not checked',
  speakInvalid: 'invalid',
  ttsUnavailable: 'Read aloud is not available in this browser',
  readingGuide: 'Reading guide',
  bigCursor: 'Big cursor',
  pageStructure: 'Page structure',
  monochrome: 'Monochrome',
  lowSaturation: 'Low saturation',
  highSaturation: 'High saturation',
  highContrast: 'High contrast',
  lightContrast: 'Light contrast',
  darkContrast: 'Dark contrast',
  stopAnimations: 'Stop animations',
  hideImages: 'Hide images',
  imageTooltips: 'Image tooltips',
  muteSounds: 'Mute sounds',

  levelOff: 'Off',
  levelLabels: ['Off', 'Level 1', 'Level 2', 'Level 3'],

  structureTitle: 'Page structure',
  structureHeadings: 'Headings',
  structureLandmarks: 'Landmarks',
  structureLinks: 'Links',
  structureEmpty: 'None found on this page',

  missingAlt: 'No description provided for this image',

  statementLink: 'Accessibility statement',
  feedbackLink: 'Report an accessibility issue',
  poweredBy: 'Accessibility menu by cookie-banner.ca',
  disclaimer: 'This menu adjusts how the page is displayed for you. It does not change the site\u2019s underlying content.',

  turnedOn: '{name} on',
  turnedOff: '{name} off',
  fontSizeAnnounce: 'Font size {value}%',
  profileApplied: '{name} applied',
}

const fr: A11yStrings = {
  menuTitle: 'Menu d\u2019accessibilit\u00e9',
  openMenu: 'Ouvrir le menu d\u2019accessibilit\u00e9',
  closeMenu: 'Fermer',
  resetSettings: 'R\u00e9initialiser les param\u00e8tres',
  resetDone: 'Tous les param\u00e8tres d\u2019accessibilit\u00e9 ont \u00e9t\u00e9 r\u00e9initialis\u00e9s',
  language: 'Langue',

  sectionProfiles: 'Profils d\u2019accessibilit\u00e9',
  sectionContent: 'Ajustements du contenu',
  sectionVisual: 'Aides visuelles et de navigation',
  sectionColor: 'Ajustements des couleurs',
  sectionTools: 'Outils suppl\u00e9mentaires',

  profiles: {
    seizureSafe: { name: 'Profil anti-\u00e9pilepsie', description: 'Arr\u00eate les animations et r\u00e9duit la saturation des couleurs.' },
    readAloud: { name: 'Lecture \u00e0 voix haute', description: 'Lit la page au survol ou au tap.' },
    visuallyImpaired: { name: 'Profil malvoyance', description: 'Texte plus grand, meilleur contraste et liens mis en \u00e9vidence.' },
    adhd: { name: 'Profil TDAH', description: 'R\u00e9duit les distractions pour une meilleure concentration.' },
    cognitive: { name: 'Profil cognitif et apprentissage', description: 'Outils utiles pour la lecture et la compr\u00e9hension.' },
    motorImpaired: { name: 'Profil handicap moteur', description: 'Curseur agrandi et focus toujours visible pour la navigation au clavier.' },
  },

  fontSize: 'Ajuster la taille du texte',
  fontSizeDecrease: 'R\u00e9duire la taille du texte',
  fontSizeIncrease: 'Augmenter la taille du texte',
  fontWeight: 'Graisse du texte',
  lineHeight: 'Hauteur de ligne',
  letterSpacing: 'Espacement des lettres',
  dyslexiaFont: 'Police dyslexie',
  highlightLinks: 'Surligner les liens',
  highlightTitles: 'Surligner les titres',
  superFocus: 'Super focus',
  readAloud: 'Lecture \u00e0 voix haute',
  readAloudShort: 'Survolez ou touchez la page pour l\u2019entendre.',
  readAloudHint: 'Survolez, touchez ou tabulez la page pour l\u2019entendre. \u00c9chap pour arr\u00eater. Ceci n\u2019est pas un lecteur d\u2019\u00e9cran.',
  readAloudOnSpeak: 'La lecture \u00e0 voix haute est activ\u00e9e. Survolez, touchez ou tabulez la page pour l\u2019entendre. Appuyez sur \u00c9chap pour arr\u00eater.',
  readAloudOffSpeak: 'La lecture \u00e0 voix haute est d\u00e9sactiv\u00e9e.',
  readAloudPreviewOff: 'Lecture \u00e0 voix haute. D\u00e9sactiv\u00e9. Cliquez pour l\u2019activer.',
  readAloudPreviewOn: 'Lecture \u00e0 voix haute. Activ\u00e9. Survolez la page pour l\u2019entendre.',
  profilePreview: '{name}. {state}.',
  speakOn: 'activ\u00e9',
  speakOff: 'd\u00e9sactiv\u00e9',
  menuVoice: 'Voix du menu',
  menuVoiceOn: 'Activer les libell\u00e9s parlés',
  menuVoiceOff: 'Couper les libell\u00e9s parlés',
  menuVoiceOnSpeak: 'La voix du menu est activ\u00e9e. Survolez un bouton pour entendre son nom. Touchez le microphone pour couper.',
  speakHeading: 'Titre {n}',
  speakLink: 'Lien',
  speakButton: 'Bouton',
  speakImage: 'Image',
  speakRequired: 'obligatoire',
  speakImageMissing: 'Aucune description fournie',
  speakChecked: 'coch\u00e9',
  speakNotChecked: 'non coch\u00e9',
  speakInvalid: 'invalide',
  ttsUnavailable: 'La lecture \u00e0 voix haute n\u2019est pas disponible dans ce navigateur',
  readingGuide: 'Guide de lecture',
  bigCursor: 'Grand curseur',
  pageStructure: 'Structure de la page',
  monochrome: 'Monochrome',
  lowSaturation: 'Saturation faible',
  highSaturation: 'Saturation \u00e9lev\u00e9e',
  highContrast: 'Contraste \u00e9lev\u00e9',
  lightContrast: 'Contraste clair',
  darkContrast: 'Contraste sombre',
  stopAnimations: 'Arr\u00eater les animations',
  hideImages: 'Masquer les images',
  imageTooltips: 'Infobulles des images',
  muteSounds: 'Couper le son',

  levelOff: 'D\u00e9sactiv\u00e9',
  levelLabels: ['D\u00e9sactiv\u00e9', 'Niveau 1', 'Niveau 2', 'Niveau 3'],

  structureTitle: 'Structure de la page',
  structureHeadings: 'Titres',
  structureLandmarks: 'Rep\u00e8res',
  structureLinks: 'Liens',
  structureEmpty: 'Aucun \u00e9l\u00e9ment trouv\u00e9 sur cette page',

  missingAlt: 'Aucune description fournie pour cette image',

  statementLink: 'D\u00e9claration d\u2019accessibilit\u00e9',
  feedbackLink: 'Signaler un probl\u00e8me d\u2019accessibilit\u00e9',
  poweredBy: 'Menu d\u2019accessibilit\u00e9 par cookie-banner.ca',
  disclaimer: 'Ce menu ajuste l\u2019affichage de la page pour vous. Il ne modifie pas le contenu du site.',

  turnedOn: '{name} activ\u00e9',
  turnedOff: '{name} d\u00e9sactiv\u00e9',
  fontSizeAnnounce: 'Taille du texte {value}\u00a0%',
  profileApplied: '{name} appliqu\u00e9',
}

export const A11Y_TRANSLATIONS: Record<string, A11yStrings> = { en, fr }

/** Languages inlined into every served config (keeps the visitor picker useful). */
export const A11Y_INLINE_LANGUAGES = ['en', 'fr'] as const

export function getA11yStrings(lang: string | undefined): A11yStrings {
  return A11Y_TRANSLATIONS[lang || 'en'] || en
}

/** Display names for the visitor language picker (native name). */
export const A11Y_LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Fran\u00e7ais',
}
