import { z } from 'zod'
import { A11Y_ALL_FEATURES } from './config'

const featureKey = z.enum(A11Y_ALL_FEATURES as unknown as [string, ...string[]])

const triggerSchema = z
  .object({
    position: z.enum(['bottom-left', 'bottom-right', 'top-left', 'top-right', 'middle-left', 'middle-right']),
    offset: z.object({ x: z.number().finite(), y: z.number().finite() }).partial().optional(),
    size: z.enum(['small', 'medium', 'large']),
    shape: z.enum(['circle', 'pill', 'square']),
    icon: z.enum(['universal-access', 'wheelchair', 'eye']),
    label: z.string().max(80).optional(),
    hideOnMobile: z.boolean().optional(),
    customSelector: z.string().max(80).optional(),
    useBannerColors: z.boolean().optional(),
    colors: z
      .object({
        background: z.string().max(64).optional(),
        icon: z.string().max(64).optional(),
        border: z.string().max(64).optional(),
      })
      .optional(),
  })
  .partial()

const panelSchema = z
  .object({
    theme: z.enum(['light', 'dark', 'auto']),
    colorMode: z.enum(['accent', 'full', 'match-banner']).optional(),
    accentColor: z.string().max(64).optional(),
    headerTextColor: z.string().max(64).optional(),
    backgroundColor: z.string().max(64).optional(),
    textColor: z.string().max(64).optional(),
    language: z.string().max(16).optional(),
  })
  .partial()

/**
 * Accepts a partial block so MCP `update_banner({ accessibility: { enabled: true } })`
 * and the builder's first save both validate. Unknown keys are stripped; hardening
 * fills defaults afterwards.
 */
export const accessibilityConfigSchema = z.object({
  enabled: z.boolean(),
  trigger: triggerSchema.optional(),
  panel: panelSchema.optional(),
  features: z.record(featureKey, z.boolean()).optional(),
  disableColorFilters: z.boolean().optional(),
  shortcut: z.enum(['none', 'alt-shift-a', 'ctrl-u']).optional(),
  statementUrl: z.string().max(2048).optional(),
  feedbackEmail: z.string().max(320).optional(),
  showPoweredBy: z.boolean().optional(),
})

export type AccessibilityConfigInput = z.infer<typeof accessibilityConfigSchema>
