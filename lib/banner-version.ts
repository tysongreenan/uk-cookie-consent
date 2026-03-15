// Banner generator version tracking
// Bump GENERATOR_VERSION when making changes that affect the generated banner code.
// Copy-paste embed users need to re-copy their code after these updates.
// Hosted script users get updates automatically.

export const GENERATOR_VERSION = 3

export interface BannerUpdate {
  version: number
  date: string
  title: string
  changes: string[]
}

export const BANNER_UPDATES: BannerUpdate[] = [
  {
    version: 3,
    date: '2026-03-15',
    title: 'Page Builder Compatibility & Brand Customization',
    changes: [
      'Fixed banner not appearing on Brizy, Elementor, and other page builders',
      'Added font selector, color palette presets, and reject button styling',
      'Added WCAG contrast checker and drag-and-drop logo upload',
    ],
  },
  {
    version: 2,
    date: '2026-03-15',
    title: 'Translation & Icon Color Fix',
    changes: [
      'Fixed floating button icon color not matching configured theme',
      'Added complete French translations for preferences modal',
      'Fixed translation replacing privacy policy link in banner message',
    ],
  },
  {
    version: 1,
    date: '2026-03-01',
    title: 'Initial Release',
    changes: ['Cookie consent banner with GDPR compliance'],
  },
]

export function getLatestUpdate(): BannerUpdate {
  return BANNER_UPDATES[0]
}
