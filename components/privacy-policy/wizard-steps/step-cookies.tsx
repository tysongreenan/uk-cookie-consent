'use client'

import { useState } from 'react'
import type { CookieDetail, PrivacyPolicyInputs } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Plus, Trash2, ScanLine } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

const COOKIE_CATEGORIES: { value: CookieDetail['category']; label: string }[] = [
  { value: 'necessary', label: 'Necessary' },
  { value: 'functional', label: 'Functional' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'marketing', label: 'Marketing' },
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
  onSelectAll,
  onDeselectAll,
  onToggle,
}: {
  items: { value: string; label: string }[]
  selected: string[]
  onSelectAll: () => void
  onDeselectAll: () => void
  onToggle: (value: string) => void
}) {
  const allSelected = items.every((item) => selected.includes(item.value))

  return (
    <div className="space-y-2">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>
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
    </div>
  )
}

function deriveProvider(domain: string): string {
  // Strip leading dot and www.
  return domain.replace(/^\./, '').replace(/^www\./, '')
}

export function StepCookies({ inputs, onChange }: StepProps) {
  const [scanning, setScanning] = useState(false)
  const cookies = inputs.cookies ?? []

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

  const addCookie = () => {
    onChange({
      cookies: [
        ...cookies,
        { name: '', provider: '', category: 'necessary', duration: '', purpose: '' },
      ],
    })
  }

  const updateCookie = (index: number, patch: Partial<CookieDetail>) => {
    const next = cookies.map((c, i) => (i === index ? { ...c, ...patch } : c))
    onChange({ cookies: next })
  }

  const removeCookie = (index: number) => {
    onChange({ cookies: cookies.filter((_, i) => i !== index) })
  }

  const importFromScan = async () => {
    if (!inputs.websiteUrl) {
      toast.error('Add your website URL in Step 1 first.')
      return
    }
    setScanning(true)
    try {
      const res = await fetch('/api/tools/cookie-scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputs.websiteUrl }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || `Scan failed (${res.status})`)
        return
      }
      const scanned = Array.isArray(data.cookies) ? data.cookies : []
      if (scanned.length === 0) {
        toast('No cookies detected on your site.', { icon: 'ℹ️' })
        return
      }
      const existingNames = new Set(cookies.map((c) => c.name.toLowerCase()))
      const imported: CookieDetail[] = scanned
        .filter((c: { name?: string }) => c.name && !existingNames.has(c.name.toLowerCase()))
        .map((c: { name: string; domain?: string; purpose?: string; category?: string; expires?: string }) => ({
          name: c.name,
          provider: c.domain ? deriveProvider(c.domain) : '',
          category: (['necessary', 'analytics', 'marketing', 'functional', 'social_media'].includes(c.category || '')
            ? c.category
            : 'necessary') as CookieDetail['category'],
          duration: c.expires || '',
          purpose: c.purpose || '',
        }))
      if (imported.length === 0) {
        toast('All scanned cookies are already in your list.', { icon: 'ℹ️' })
        return
      }
      const mergedCategories = new Set([...inputs.cookieCategories, ...imported.map((c) => c.category)])
      onChange({
        cookies: [...cookies, ...imported],
        cookieCategories: Array.from(mergedCategories),
      })
      toast.success(`Imported ${imported.length} cookie${imported.length === 1 ? '' : 's'} from your site.`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Scan failed'
      toast.error(message)
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Cookies &amp; Third-Party Services</h2>
        <p className="text-sm text-muted-foreground mt-1">
          List the cookies your site sets, then pick the third-party services you use. We&apos;ll generate a compliant cookie table.
        </p>
      </div>

      {/* Cookie table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Label>Cookies on your site</Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Scan your site to auto-fill, or add each cookie manually.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={importFromScan}
              disabled={scanning}
            >
              {scanning ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Scanning…
                </>
              ) : (
                <>
                  <ScanLine className="h-3.5 w-3.5 mr-1.5" />
                  Import from scan
                </>
              )}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={addCookie}>
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add cookie
            </Button>
          </div>
        </div>

        {cookies.length === 0 ? (
          <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            No cookies added yet. Click <span className="font-medium">Import from scan</span> to auto-detect them, or <span className="font-medium">Add cookie</span> to enter manually.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Provider</th>
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Duration</th>
                  <th className="px-3 py-2 font-medium">Purpose</th>
                  <th className="px-2 py-2" />
                </tr>
              </thead>
              <tbody>
                {cookies.map((cookie, i) => (
                  <tr key={i} className="border-t border-border align-top">
                    <td className="px-2 py-1.5">
                      <Input
                        value={cookie.name}
                        onChange={(e) => updateCookie(i, { name: e.target.value })}
                        placeholder="_ga"
                        className="h-8 text-xs"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <Input
                        value={cookie.provider || ''}
                        onChange={(e) => updateCookie(i, { provider: e.target.value })}
                        placeholder="google.com"
                        className="h-8 text-xs"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <select
                        value={cookie.category}
                        onChange={(e) => updateCookie(i, { category: e.target.value as CookieDetail['category'] })}
                        className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {COOKIE_CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-1.5">
                      <Input
                        value={cookie.duration || ''}
                        onChange={(e) => updateCookie(i, { duration: e.target.value })}
                        placeholder="2 years"
                        className="h-8 text-xs"
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <Input
                        value={cookie.purpose || ''}
                        onChange={(e) => updateCookie(i, { purpose: e.target.value })}
                        placeholder="Tracks usage"
                        className="h-8 text-xs"
                      />
                    </td>
                    <td className="px-2 py-1.5 text-right">
                      <button
                        type="button"
                        onClick={() => removeCookie(i)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove cookie"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cookie categories */}
      <div className="space-y-2">
        <Label>Cookie Categories</Label>
        <p className="text-xs text-muted-foreground">
          High-level groups used by your site (auto-filled from the cookies above).
        </p>
        <CheckboxGrid
          items={COOKIE_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
          selected={inputs.cookieCategories}
          onToggle={toggleCategory}
          onSelectAll={() => onChange({ cookieCategories: COOKIE_CATEGORIES.map((c) => c.value) })}
          onDeselectAll={() => onChange({ cookieCategories: [] })}
        />
      </div>

      {/* Third-party services */}
      <div className="space-y-2">
        <Label>Third-Party Services</Label>
        <CheckboxGrid
          items={THIRD_PARTY_SERVICES}
          selected={inputs.thirdPartyServices}
          onToggle={toggleService}
          onSelectAll={() => onChange({ thirdPartyServices: THIRD_PARTY_SERVICES.map((s) => s.value) })}
          onDeselectAll={() => onChange({ thirdPartyServices: [] })}
        />
      </div>
    </div>
  )
}
