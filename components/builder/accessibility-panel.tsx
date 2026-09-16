'use client'

import { Accessibility, AlertTriangle, Info, Lock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ColorPicker } from '@/components/ui/color-picker'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'
import type { A11yFeatureKey, A11yTriggerPosition, AccessibilityConfig, BannerConfig } from '@/types'
import {
  A11Y_FEATURE_GROUPS,
  A11Y_OWNER_DISCLAIMER,
  A11Y_TRANSLATIONS,
  contrast,
  cookieFloaterCorner,
  defaultTriggerPosition,
  readableOn,
  triggerCollidesWithCookieFloater,
  withA11yDefaults,
} from '@/lib/accessibility'

interface AccessibilityPanelProps {
  config: BannerConfig
  /** Receives the complete accessibility block (the builder stores it whole). */
  onChange: (next: AccessibilityConfig) => void
  /** Pro Annual / Enterprise: customization + no branding. */
  canCustomize: boolean
  /** Jump to the builder's Install snippet step. */
  onGoToInstall?: () => void
}

const POSITION_LABELS: Record<A11yTriggerPosition, string> = {
  'bottom-left': 'Bottom left',
  'bottom-right': 'Bottom right',
  'top-left': 'Top left',
  'top-right': 'Top right',
  'middle-left': 'Middle left',
  'middle-right': 'Middle right',
}

const GROUP_LABELS = {
  content: 'Content adjustments',
  visual: 'Visual & navigation aids',
  color: 'Colour adjustments',
  tools: 'Additional tools',
} as const

const FEATURE_LABELS: Record<A11yFeatureKey, string> = {
  profiles: 'Accessibility profiles',
  fontSize: 'Font size',
  fontWeight: 'Font weight',
  lineHeight: 'Line height',
  letterSpacing: 'Letter spacing',
  dyslexiaFont: 'Dyslexia font',
  highlightLinks: 'Highlight links',
  highlightTitles: 'Highlight titles',
  superFocus: 'Super focus',
  readAloud: 'Read aloud',
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
}

export function AccessibilityPanel({ config, onChange, canCustomize, onGoToInstall }: AccessibilityPanelProps) {
  const a11y = withA11yDefaults(config.accessibility)
  const set = (patch: Partial<AccessibilityConfig>) => onChange({ ...a11y, ...patch })
  const setTrigger = (patch: Partial<AccessibilityConfig['trigger']>) => set({ trigger: { ...a11y.trigger, ...patch } })
  const setPanel = (patch: Partial<AccessibilityConfig['panel']>) => set({ panel: { ...a11y.panel, ...patch } })
  const setFeature = (key: A11yFeatureKey, on: boolean) => {
    const features = { ...(a11y.features || {}) }
    if (on) delete features[key]
    else features[key] = false
    set({ features })
  }

  const autoPosition = defaultTriggerPosition(config)
  const cookieCorner = cookieFloaterCorner(config)
  const effectivePosition = canCustomize ? a11y.trigger.position : autoPosition
  const collides = canCustomize && triggerCollidesWithCookieFloater(config, a11y.trigger.position)
  const profileNames = Object.values(A11Y_TRANSLATIONS.en.profiles).map((p) => p.name)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" />
                Accessibility Menu
              </CardTitle>
              <CardDescription className="mt-1">
                A floating button that opens a menu where visitors adjust text size, contrast, motion, focus and
                more. It ships through the same snippet you already installed — nothing else to paste.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Label htmlFor="a11y-enabled" className="text-sm">
                {a11y.enabled ? 'On' : 'Off'}
              </Label>
              <Switch id="a11y-enabled" checked={a11y.enabled} onCheckedChange={(checked) => set({ enabled: checked })} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              {A11Y_OWNER_DISCLAIMER} Use it alongside an accessibility statement and real remediation.
            </AlertDescription>
          </Alert>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-3 text-sm">
              <p className="font-medium mb-1">Included on every plan</p>
              <ul className="text-muted-foreground space-y-0.5 list-disc pl-4">
                <li>All {Object.keys(FEATURE_LABELS).length - 1} adjustments and {profileNames.length} profiles</li>
                <li>Button placed opposite your Cookie Settings button</li>
                <li>Uses your banner colours and your website&rsquo;s font</li>
                <li>English &amp; French, visitor-switchable</li>
                <li>&ldquo;Accessibility menu by cookie-banner.ca&rdquo; footer</li>
              </ul>
            </div>
            <div className="rounded-lg border p-3 text-sm">
              <p className="font-medium mb-1 flex items-center gap-1.5">
                Pro Annual adds <Badge variant="secondary">Customize</Badge>
              </p>
              <ul className="text-muted-foreground space-y-0.5 list-disc pl-4">
                <li>Position, size, shape, icon, label, colours</li>
                <li>Choose which adjustments to offer</li>
                <li>Accessibility statement + feedback links</li>
                <li>Keyboard shortcut, open from your own link</li>
                <li>No branding</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {a11y.enabled && (
        <>
          {/* Placement */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-base">Button placement</CardTitle>
              <CardDescription>
                {canCustomize
                  ? 'Pick a corner. The button measures the cookie banner and Cookie Settings button on the page and moves clear of them automatically.'
                  : `Placed automatically at the ${POSITION_LABELS[autoPosition].toLowerCase()}${
                      cookieCorner ? ', opposite your Cookie Settings button' : ''
                    }.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`grid gap-4 sm:grid-cols-2 ${canCustomize ? '' : 'opacity-60 pointer-events-none'}`}>
                <div className="space-y-2">
                  <Label htmlFor="a11y-position">Position</Label>
                  <Select
                    value={effectivePosition}
                    onValueChange={(value: A11yTriggerPosition) => setTrigger({ position: value })}
                    disabled={!canCustomize}
                  >
                    <SelectTrigger id="a11y-position">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(POSITION_LABELS) as A11yTriggerPosition[]).map((p) => (
                        <SelectItem key={p} value={p}>
                          {POSITION_LABELS[p]}
                          {p === autoPosition ? ' (recommended)' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a11y-size">Size</Label>
                  <Select
                    value={a11y.trigger.size}
                    onValueChange={(value: AccessibilityConfig['trigger']['size']) => setTrigger({ size: value })}
                    disabled={!canCustomize}
                  >
                    <SelectTrigger id="a11y-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (40px)</SelectItem>
                      <SelectItem value="medium">Medium (48px)</SelectItem>
                      <SelectItem value="large">Large (56px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a11y-shape">Shape</Label>
                  <Select
                    value={a11y.trigger.shape}
                    onValueChange={(value: AccessibilityConfig['trigger']['shape']) => setTrigger({ shape: value })}
                    disabled={!canCustomize}
                  >
                    <SelectTrigger id="a11y-shape">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="pill">Pill (with label)</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="a11y-icon">Icon</Label>
                  <Select
                    value={a11y.trigger.icon}
                    onValueChange={(value: AccessibilityConfig['trigger']['icon']) => setTrigger({ icon: value })}
                    disabled={!canCustomize}
                  >
                    <SelectTrigger id="a11y-icon">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="universal-access">Universal access (person)</SelectItem>
                      <SelectItem value="wheelchair">Wheelchair</SelectItem>
                      <SelectItem value="eye">Eye</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="a11y-label">Button label (pill / square only)</Label>
                  <Input
                    id="a11y-label"
                    value={a11y.trigger.label || ''}
                    maxLength={40}
                    placeholder="Accessibility"
                    onChange={(e) => setTrigger({ label: e.target.value })}
                    disabled={!canCustomize}
                  />
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2">
                  <Switch
                    id="a11y-hide-mobile"
                    checked={Boolean(a11y.trigger.hideOnMobile)}
                    onCheckedChange={(checked) => setTrigger({ hideOnMobile: checked })}
                    disabled={!canCustomize}
                  />
                  <Label htmlFor="a11y-hide-mobile">Hide the button on phones (menu still opens via shortcut or your own link)</Label>
                </div>
              </div>

              {collides && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Your Cookie Settings button also uses the {POSITION_LABELS[a11y.trigger.position].toLowerCase()}. The
                    accessibility button will sit just above it, so that corner gets two buttons. Choose{' '}
                    {POSITION_LABELS[autoPosition].toLowerCase()} to keep them apart.
                  </AlertDescription>
                </Alert>
              )}

              {!canCustomize && (
                <UpgradePrompt
                  variant="inline"
                  feature="Accessibility Menu customization"
                  description="Choose the corner, size, shape, icon, label and colours, pick which adjustments to offer, add your accessibility statement and remove the footer credit."
                />
              )}
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                Colours &amp; theme {!canCustomize && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
              </CardTitle>
              <CardDescription>
                Accent only paints the header, Reset, and toggles so the list stays easy to read. Whole menu
                paints the panel too. Match cookie banner uses the same background, text, and buttons as Design
                → Colours.
              </CardDescription>
            </CardHeader>
            <CardContent className={`space-y-4 ${canCustomize ? '' : 'opacity-60 pointer-events-none'}`}>
              <div className="flex items-center space-x-2">
                <Switch
                  id="a11y-banner-colors"
                  checked={a11y.trigger.useBannerColors}
                  onCheckedChange={(checked) => setTrigger({ useBannerColors: checked })}
                  disabled={!canCustomize}
                />
                <Label htmlFor="a11y-banner-colors">Use my banner&rsquo;s button colours</Label>
              </div>
              {!a11y.trigger.useBannerColors && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Button background</Label>
                    <ColorPicker
                      value={a11y.trigger.colors?.background || config.colors.button}
                      onChange={(color) => setTrigger({ colors: { ...(a11y.trigger.colors || {}), background: color } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <ColorPicker
                      value={a11y.trigger.colors?.icon || config.colors.buttonText}
                      onChange={(color) => setTrigger({ colors: { ...(a11y.trigger.colors || {}), icon: color } })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Border</Label>
                    <ColorPicker
                      value={a11y.trigger.colors?.border || 'transparent'}
                      onChange={(color) => setTrigger({ colors: { ...(a11y.trigger.colors || {}), border: color } })}
                    />
                  </div>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="a11y-color-mode">How the menu uses colour</Label>
                  <Select
                    value={a11y.panel.colorMode || 'accent'}
                    onValueChange={(value: NonNullable<AccessibilityConfig['panel']['colorMode']>) =>
                      setPanel({ colorMode: value === 'accent' ? undefined : value })
                    }
                    disabled={!canCustomize}
                  >
                    <SelectTrigger id="a11y-color-mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accent">Accent only — header and buttons</SelectItem>
                      <SelectItem value="full">Whole menu — panel, cards, and chrome</SelectItem>
                      <SelectItem value="match-banner">Match cookie banner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(a11y.panel.colorMode || 'accent') === 'accent' && (
                  <div className="space-y-2">
                    <Label htmlFor="a11y-theme">Menu theme</Label>
                    <Select
                      value={a11y.panel.theme}
                      onValueChange={(value: AccessibilityConfig['panel']['theme']) => setPanel({ theme: value })}
                      disabled={!canCustomize}
                    >
                      <SelectTrigger id="a11y-theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Follow visitor&rsquo;s system (recommended)</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {(a11y.panel.colorMode || 'accent') !== 'match-banner' && (
                  <div className="space-y-2">
                    <Label>Menu accent colour</Label>
                    <ColorPicker
                      value={a11y.panel.accentColor || config.colors.button}
                      onChange={(color) => setPanel({ accentColor: color })}
                    />
                  </div>
                )}
                {(a11y.panel.colorMode || 'accent') !== 'match-banner' && (
                  <div className="space-y-2">
                    <Label>Heading text</Label>
                    <ColorPicker
                      value={a11y.panel.headerTextColor || readableOn(a11y.panel.accentColor || config.colors.button)}
                      onChange={(color) => setPanel({ headerTextColor: color })}
                    />
                    <button
                      type="button"
                      className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                      onClick={() => setPanel({ headerTextColor: '' })}
                    >
                      Auto (white or black)
                    </button>
                    {a11y.panel.headerTextColor &&
                      contrast(a11y.panel.headerTextColor, a11y.panel.accentColor || config.colors.button) < 4.5 && (
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                          This heading colour is hard to read on the accent. Auto is safer.
                        </p>
                      )}
                  </div>
                )}
                {a11y.panel.colorMode === 'full' && (
                  <>
                    <div className="space-y-2">
                      <Label>Panel background</Label>
                      <ColorPicker
                        value={a11y.panel.backgroundColor || a11y.panel.accentColor || config.colors.button}
                        onChange={(color) => setPanel({ backgroundColor: color })}
                      />
                      <button
                        type="button"
                        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                        onClick={() => setPanel({ backgroundColor: '' })}
                      >
                        Same as accent
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Label>Body text</Label>
                      <ColorPicker
                        value={
                          a11y.panel.textColor ||
                          readableOn(a11y.panel.backgroundColor || a11y.panel.accentColor || config.colors.button)
                        }
                        onChange={(color) => setPanel({ textColor: color })}
                      />
                      <button
                        type="button"
                        className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
                        onClick={() => setPanel({ textColor: '' })}
                      >
                        Auto (white or black)
                      </button>
                    </div>
                  </>
                )}
                {a11y.panel.colorMode === 'match-banner' && (
                  <p className="text-xs text-muted-foreground sm:col-span-2">
                    The menu body uses your cookie banner background and text. Header and Reset use the banner
                    button colours. Change those under Design → Colours.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                Adjustments offered {!canCustomize && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
              </CardTitle>
              <CardDescription>
                Everything is on by default. Turn something off only if it breaks your layout — visitors always control
                their own settings.
              </CardDescription>
            </CardHeader>
            <CardContent className={`space-y-5 ${canCustomize ? '' : 'opacity-60 pointer-events-none'}`}>
              <div className="flex items-center space-x-2">
                <Switch
                  id="a11y-f-profiles"
                  checked={a11y.features?.profiles !== false}
                  onCheckedChange={(checked) => setFeature('profiles', checked)}
                  disabled={!canCustomize}
                />
                <Label htmlFor="a11y-f-profiles">
                  {FEATURE_LABELS.profiles}{' '}
                  <span className="text-muted-foreground font-normal">({profileNames.join(', ')})</span>
                </Label>
              </div>
              {A11Y_FEATURE_GROUPS.map((group) => (
                <div key={group.id}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    {GROUP_LABELS[group.id]}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {group.features.map((key) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Switch
                          id={`a11y-f-${key}`}
                          checked={a11y.features?.[key] !== false}
                          onCheckedChange={(checked) => setFeature(key, checked)}
                          disabled={!canCustomize}
                        />
                        <Label htmlFor={`a11y-f-${key}`} className="font-normal">
                          {FEATURE_LABELS[key]}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex items-start space-x-2 rounded-lg border p-3">
                <Switch
                  id="a11y-no-filters"
                  checked={Boolean(a11y.disableColorFilters)}
                  onCheckedChange={(checked) => set({ disableColorFilters: checked })}
                  disabled={!canCustomize}
                />
                <Label htmlFor="a11y-no-filters" className="font-normal leading-snug">
                  Disable colour filters (monochrome, saturation, high contrast). Escape hatch for sites where filter
                  effects break fixed headers or video. Light/dark contrast stay available.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Links & advanced */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                Statement, feedback &amp; shortcuts {!canCustomize && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
              </CardTitle>
              <CardDescription>
                AODA (Ontario), the EU Accessibility Act and UK public-sector rules expect a published accessibility
                statement and a way for people to report barriers. Link them here and they appear in the menu footer.
              </CardDescription>
            </CardHeader>
            <CardContent className={`grid gap-4 sm:grid-cols-2 ${canCustomize ? '' : 'opacity-60 pointer-events-none'}`}>
              <div className="space-y-2">
                <Label htmlFor="a11y-statement">Accessibility statement URL</Label>
                <Input
                  id="a11y-statement"
                  type="url"
                  placeholder="https://example.com/accessibility"
                  value={a11y.statementUrl || ''}
                  onChange={(e) => set({ statementUrl: e.target.value })}
                  disabled={!canCustomize}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a11y-feedback">Feedback email</Label>
                <Input
                  id="a11y-feedback"
                  type="email"
                  placeholder="accessibility@example.com"
                  value={a11y.feedbackEmail || ''}
                  onChange={(e) => set({ feedbackEmail: e.target.value })}
                  disabled={!canCustomize}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="a11y-shortcut">Keyboard shortcut</Label>
                <Select
                  value={a11y.shortcut}
                  onValueChange={(value: AccessibilityConfig['shortcut']) => set({ shortcut: value })}
                  disabled={!canCustomize}
                >
                  <SelectTrigger id="a11y-shortcut">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="alt-shift-a">Alt + Shift + A</SelectItem>
                    <SelectItem value="ctrl-u">Ctrl / Cmd + U</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="a11y-selector">Also open from my own link</Label>
                <Input
                  id="a11y-selector"
                  placeholder="#accessibility-link or .a11y-open"
                  value={a11y.trigger.customSelector || ''}
                  onChange={(e) => setTrigger({ customSelector: e.target.value })}
                  disabled={!canCustomize}
                />
                <p className="text-xs text-muted-foreground">A CSS id or class on an element in your footer, for example.</p>
              </div>
            </CardContent>
          </Card>

          {onGoToInstall && (
            <p className="text-sm text-muted-foreground">
              Copy the snippet under{' '}
              <button type="button" className="underline underline-offset-2 hover:text-foreground" onClick={onGoToInstall}>
                Install snippet
              </button>
              . The same cookie-banner line delivers this menu; a menu-only line is there if you keep a different banner.
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Visitor preferences are saved in their own browser (localStorage), never on our servers, and are not a
            cookie — no consent category is needed.
          </p>
        </>
      )}
    </>
  )
}
