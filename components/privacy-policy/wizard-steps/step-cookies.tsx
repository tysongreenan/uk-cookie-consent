'use client'

import type { PrivacyPolicyInputs } from '@/types'
import { Label } from '@/components/ui/label'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

const COOKIE_CATEGORIES = [
  { value: 'necessary', label: 'Necessary' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'functional', label: 'Functional' },
  { value: 'social_media', label: 'Social Media' },
]

const THIRD_PARTY_SERVICES = [
  { value: 'google_analytics', label: 'Google Analytics' },
  { value: 'facebook_pixel', label: 'Facebook Pixel' },
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'stripe', label: 'Stripe' },
  { value: 'mailchimp', label: 'Mailchimp' },
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'intercom', label: 'Intercom' },
  { value: 'hotjar', label: 'Hotjar' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter_x', label: 'Twitter/X' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'wordpress_plugins', label: 'WordPress Plugins' },
]

function CheckboxGrid({
  items,
  selected,
  onToggle,
}: {
  items: { value: string; label: string }[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => {
        const isChecked = selected.includes(item.value)
        return (
          <label
            key={item.value}
            className={`flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm cursor-pointer transition-colors ${
              isChecked
                ? 'border-primary bg-primary/5 text-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(item.value)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            {item.label}
          </label>
        )
      })}
    </div>
  )
}

export function StepCookies({ inputs, onChange }: StepProps) {
  const toggleCategory = (value: string) => {
    const current = inputs.cookieCategories
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ cookieCategories: next })
  }

  const toggleService = (value: string) => {
    const current = inputs.thirdPartyServices
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ thirdPartyServices: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Cookies & Third-Party Services</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select the cookie categories and third-party services your site uses.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Cookie Categories</Label>
        <CheckboxGrid
          items={COOKIE_CATEGORIES}
          selected={inputs.cookieCategories}
          onToggle={toggleCategory}
        />
      </div>

      <div className="space-y-2">
        <Label>Third-Party Services</Label>
        <CheckboxGrid
          items={THIRD_PARTY_SERVICES}
          selected={inputs.thirdPartyServices}
          onToggle={toggleService}
        />
      </div>
    </div>
  )
}
