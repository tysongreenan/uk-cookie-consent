import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { isIpHostname, normalizeCookieDomain } from './cookie-domain'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Paths removed after a zero-reference search. Next routes are not in this list. */
const removedPaths = [
  'assign-team-to-user.js',
  'check-table-structure.js',
  'debug-session.js',
  'debug-swy-banner.js',
  'debug-team-creation-detailed.js',
  'debug-team-creation.js',
  'debug-user-plan.js',
  'fix-session-management.js',
  'test-simple-api.js',
  'test-simple.html',
  'components/ab-tracker.tsx',
  'components/blog/blog-recap.tsx',
  'components/blog/copy-all-button.tsx',
  'components/blog/email-signup.tsx',
  'components/blog/reading-progress.tsx',
  'components/dashboard/team-switcher.tsx',
  'components/landing/features-bento.tsx',
  'components/landing/language-section.tsx',
  'components/landing/logo-marquee.tsx',
  'components/landing/pricing.tsx',
  'components/landing/visuals/compliance/BannerTextPreview.tsx',
  'components/landing/visuals/compliance/ComplianceBadgeAnimator.tsx',
  'components/landing/visuals/compliance/ConsentFlowDiagram.tsx',
  'components/landing/visuals/hero.video.tsx',
  'components/landing/visuals/integration/BeforeAfterSlider.tsx',
  'components/landing/visuals/integration/CodeCopyBlock.tsx',
  'components/landing/visuals/integration/PluginComparisonTable.tsx',
  'components/landing/visuals/integration/ThreeStepInstallation.tsx',
  'components/landing/visuals/tools/CookieResultsVisual.tsx',
  'components/landing/visuals/tools/ScannerAnimation.tsx',
  'components/magicui/hero-video-dialog.tsx',
  'components/privacy-policy/policy-preview-card.tsx',
  'components/privacy-policy/policy-renderer.tsx',
  'components/privacy-policy/policy-wizard.tsx',
  'components/privacy-policy/wizard-steps/step-children.tsx',
  'components/privacy-policy/wizard-steps/step-data-usage.tsx',
  'components/privacy-policy/wizard-steps/step-jurisdictions.tsx',
  'components/privacy-policy/wizard-steps/step-user-rights.tsx',
  'components/ui/avatar.tsx',
  'components/ui/breadcrumb.tsx',
  'components/ui/collapsible.tsx',
  'components/ui/command.tsx',
  'components/ui/empty.tsx',
  'components/ui/form.tsx',
  'components/ui/hover-card.tsx',
  'components/ui/input-group.tsx',
  'components/ui/magnetize-button.tsx',
  'components/ui/multi-select.tsx',
  'components/ui/navigation-menu.tsx',
  'components/ui/pagination.tsx',
  'components/ui/password-input.tsx',
  'components/ui/popover.tsx',
  'components/ui/radio-group.tsx',
  'components/ui/rating.tsx',
  'components/ui/scroll-area.tsx',
  'components/ui/shape-landing-hero.tsx',
  'components/ui/sheet.tsx',
  'components/ui/shimmer-button.tsx',
  'components/ui/sonner.tsx',
  'components/ui/table.tsx',
  'components/ui/toggle-group.tsx',
  'components/ui/toggle.tsx',
  'lib/supabase.ts',
  'lib/tcf/index.ts',
  'lib/tcf/purposes.ts',
  'lib/tcf/tc-string.ts',
]

describe('dead code removal', () => {
  it('drops inventoried files and still normalizes a cookie domain', () => {
    for (const rel of removedPaths) {
      expect(fs.existsSync(path.join(root, rel)), rel).toBe(false)
    }

    expect(normalizeCookieDomain('HTTPS://Shop.Example.com/privacy')).toBe('shop.example.com')
    expect(isIpHostname('203.0.113.10')).toBe(true)
    expect(isIpHostname('shop.example.com')).toBe(false)
  })
})
