// Banner generator version tracking
// Bump GENERATOR_VERSION when making changes that affect the generated banner code.
// Copy-paste embed users need to re-copy their code after these updates.
// Hosted script users get updates automatically.

export const GENERATOR_VERSION = 10

export interface BannerUpdate {
  version: number
  date: string
  title: string
  changes: string[]
}

export const BANNER_UPDATES: BannerUpdate[] = [
  {
    version: 10,
    date: '2026-07-22',
    title: 'iPad & Tablet Banner Layout Fix',
    changes: [
      'Fixed giant empty gap between consent copy and buttons on iPad/tablet',
      'Bar layout no longer uses a 220px flex-basis that became height when stacked',
      'Responsive stacking now covers tablets (≤1024px), not only phones (≤768px)',
      'Banner height hugs content — host CSS cannot stretch it full-screen',
      'Logo size hardened so large brand marks cannot blow out the layout',
    ],
  },
  {
    version: 9,
    date: '2026-07-21',
    title: 'Preferences Modal Scroll Fix',
    changes: [
      'Preferences panel scrolls reliably on phone and desktop',
      'Header and Confirm footer stay pinned while categories scroll',
      'Background page scroll locked while preferences are open',
      'Safe-area padding for notched iPhones',
    ],
  },
  {
    version: 8,
    date: '2026-07-20',
    title: 'Default Bottom Bar Layout Fix',
    changes: [
      'Bottom/top bars use compact side-by-side buttons (no full-width Accept stretch)',
      'Desktop bar layout: copy on the left, actions on the right',
      'Reject shown by default for a compliant starting point',
      'Builder preview matches production bar vs card layouts',
    ],
  },
  {
    version: 7,
    date: '2026-07-20',
    title: 'Professional Banner Appearance',
    changes: [
      'Refined card shadows, borders, and typography for a polished look',
      'Equal-width action buttons with better touch targets',
      'Smoother close control and focus states for keyboard users',
      'Mobile bottom-sheet elevation and scroll for long consent copy',
    ],
  },
  {
    version: 6,
    date: '2026-07-20',
    title: 'Mobile & Desktop Layout Polish',
    changes: [
      'Fixed floating banners overflowing on mobile (close button overlapping text)',
      'Card layouts stay within the viewport on desktop and mobile',
      'Buttons stack full-width on phones for reliable touch targets',
      'Safe-area support for notched iPhones and home indicators',
    ],
  },
  {
    version: 5,
    date: '2026-03-16',
    title: 'Translation & Brand Discovery Fixes',
    changes: [
      'Fixed privacy policy link text not translating to French',
      'Fixed brand color import picking transparent/invisible colors',
      'Brand discovery now correctly parses page builder CSS variables',
    ],
  },
  {
    version: 4,
    date: '2026-03-16',
    title: 'Pro Features & Analytics Fix — Please Republish Your Banners',
    changes: [
      'Fixed Pro layouts (modal, slide-in) not unlocking for Pro users',
      'Fixed brand color import not persisting after apply',
      'Analytics tracking now works without a separate script — just enable the toggle',
      'Please republish and re-embed your banners to get the latest improvements',
    ],
  },
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
