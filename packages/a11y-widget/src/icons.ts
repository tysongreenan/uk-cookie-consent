/** 24×24 stroke icons (paths only; wrapped by dom.svg). Kept tiny on purpose. */
export const ICONS: Record<string, string> = {
  // Trigger options
  'universal-access':
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/><path d="M6.5 10.5c3.7 1 7.3 1 11 0"/><path d="M12 11v3.5l-2 4.5"/><path d="M12 14.5l2 4.5"/>',
  wheelchair:
    '<circle cx="14" cy="4" r="1.5"/><path d="M13 7v5h5l2 5"/><path d="M13 10h4"/><circle cx="10" cy="17" r="4.5"/><path d="M9.5 12.6a4.5 4.5 0 100 8.9"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  // Chrome
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  reset: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
  menuVoice:
    '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M7 11a5 5 0 0010 0"/><path d="M12 16v4M9 20h6"/>',
  menuVoiceOff:
    '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M7 11a5 5 0 0010 0"/><path d="M12 16v4M9 20h6"/><path d="M4 4l16 16"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  back: '<path d="M15 6l-6 6 6 6"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  // Profiles
  seizureSafe: '<path d="M4 12h3l2-6 3 12 2-6h6"/><path d="M3 3l18 18"/>',
  readAloudProfile: '<path d="M4 9v6h3l4 4V5L7 9z"/><path d="M15 9a4 4 0 010 6"/><path d="M17.5 6.5a8 8 0 010 11"/>',
  visuallyImpaired: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  adhd: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l2 2"/>',
  cognitive: '<path d="M12 5.5C10 4 5 4 3 5.5v13c2-1.5 7-1.5 9 0 2-1.5 7-1.5 9 0v-13c-2-1.5-7-1.5-9 0z"/><path d="M12 5.5v13"/>',
  motorImpaired: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/>',
  // Content
  fontSize: '<path d="M4 18L9 6l5 12"/><path d="M6 14h6"/><path d="M15 18l2.5-6 2.5 6"/><path d="M16 16h3"/>',
  fontWeight: '<path d="M7 5h6a3.5 3.5 0 010 7H7z"/><path d="M7 12h7a3.5 3.5 0 010 7H7z"/>',
  lineHeight: '<path d="M4 5h16M4 19h16"/><path d="M12 8v8"/><path d="M9.5 10.5L12 8l2.5 2.5M9.5 13.5L12 16l2.5-2.5"/>',
  letterSpacing: '<path d="M4 4v16M20 4v16"/><path d="M8 16l4-8 4 8"/><path d="M9.5 13h5"/>',
  dyslexiaFont: '<path d="M5 18L9.5 6l4.5 12"/><path d="M6.7 14h5.6"/><path d="M16 12a3 3 0 106 0 3 3 0 10-6 0"/>',
  highlightLinks: '<path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/>',
  highlightTitles: '<path d="M5 5h14"/><path d="M12 5v14"/><path d="M8 19h8"/>',
  // Visual & nav
  superFocus: '<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><circle cx="12" cy="12" r="3.5"/>',
  readAloud: '<path d="M4 9v6h3l4 4V5L7 9z"/><path d="M15 9a4 4 0 010 6"/><path d="M17.5 6.5a8 8 0 010 11"/>',
  readingGuide: '<path d="M12 5.5C10 4 5 4 3 5.5v13c2-1.5 7-1.5 9 0 2-1.5 7-1.5 9 0v-13c-2-1.5-7-1.5-9 0z"/><path d="M6 10h4M14 10h4M6 13h4M14 13h4"/>',
  bigCursor: '<path d="M5 3l14 8.5-6.2 1.6L9.3 20z"/>',
  pageStructure: '<path d="M4 6l8-3 8 3-8 3z"/><path d="M4 12l8 3 8-3"/><path d="M4 18l8 3 8-3"/>',
  // Colour
  monochrome: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 20L20 4"/><path d="M12 4v16" stroke-dasharray="2 2"/>',
  lowSaturation: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16M12 4v16M16 4v16M4 8h16M4 12h16M4 16h16"/>',
  highSaturation: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M5.6 18.4l2.2-2.2M16.2 7.8l2.2-2.2"/>',
  highContrast: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 010 18z" fill="currentColor" stroke="none"/>',
  lightContrast: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  darkContrast: '<path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z"/>',
  // Tools
  stopAnimations: '<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
  hideImages: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 16l5-5 4 4 3-3 6 6"/><path d="M3 3l18 18"/>',
  imageTooltips: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="M7 9h10M7 12h6"/>',
  muteSounds: '<path d="M4 9v6h3l4 4V5L7 9z"/><path d="M16 9l5 6M21 9l-5 6"/>',
  // Footer
  external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
}
