'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TCFVendorSelector } from './tcf-vendor-selector'
import { TCFConfig, PublisherRestriction } from '@/types'
import { ChevronDown, ChevronRight, Info } from 'lucide-react'

interface TCFConfigPanelProps {
  config: TCFConfig
  onChange: (updates: Partial<TCFConfig>) => void
  disabled?: boolean
}

// IAB TCF 2.2 purposes
const TCF_PURPOSES = [
  { id: 1, name: 'Store and/or access information on a device', legalBasis: 'consent', description: 'Cookies, device or similar online identifiers together with other information can be stored or read on your device.' },
  { id: 2, name: 'Use limited data to select advertising', legalBasis: 'consent', description: 'Advertising can be shown based on limited data such as the content viewed or the app being used.' },
  { id: 3, name: 'Create profiles for personalised advertising', legalBasis: 'consent', description: 'A profile can be built about you and your interests to show personalised advertising.' },
  { id: 4, name: 'Use profiles to select personalised advertising', legalBasis: 'consent', description: 'Personalised advertising can be shown based on a profile about you.' },
  { id: 5, name: 'Create profiles to personalise content', legalBasis: 'consent', description: 'A profile can be built about you and your interests to show personalised content.' },
  { id: 6, name: 'Use profiles to select personalised content', legalBasis: 'consent', description: 'Personalised content can be shown based on a profile about you.' },
  { id: 7, name: 'Measure advertising performance', legalBasis: 'consent', description: 'The performance and effectiveness of ads can be measured.' },
  { id: 8, name: 'Measure content performance', legalBasis: 'legitimate_interest', description: 'The performance and effectiveness of content can be measured.' },
  { id: 9, name: 'Understand audiences through statistics or combinations of data', legalBasis: 'legitimate_interest', description: 'Reports can be generated based on the combination of data sets.' },
  { id: 10, name: 'Develop and improve services', legalBasis: 'legitimate_interest', description: 'Your data can be used to improve existing systems and software and to develop new products.' },
  { id: 11, name: 'Use limited data to select content', legalBasis: 'legitimate_interest', description: 'Content can be shown based on limited data such as the content viewed or the app being used.' },
] as const

const SPECIAL_FEATURES = [
  { id: 1, name: 'Use precise geolocation data', description: 'Your precise geolocation data can be used for one or more purposes.' },
  { id: 2, name: 'Actively scan device characteristics for identification', description: 'Your device can be identified based on a scan of unique characteristics.' },
] as const

const RESTRICTION_TYPES = [
  { value: '0', label: 'Not allowed' },
  { value: '1', label: 'Require consent' },
  { value: '2', label: 'Require legitimate interest' },
] as const

export function TCFConfigPanel({ config, onChange, disabled }: TCFConfigPanelProps) {
  const [vendorMode, setVendorMode] = useState<'all' | 'selected'>(
    config.vendorIds.length > 0 ? 'selected' : 'all'
  )
  const [restrictionsOpen, setRestrictionsOpen] = useState(false)

  if (disabled) {
    return null
  }

  const togglePurpose = (purposeId: number) => {
    const current = config.purposeIds
    if (current.includes(purposeId)) {
      onChange({ purposeIds: current.filter(id => id !== purposeId) })
    } else {
      onChange({ purposeIds: [...current, purposeId].sort((a, b) => a - b) })
    }
  }

  const toggleSpecialFeature = (featureId: number) => {
    const current = config.specialFeatureIds
    if (current.includes(featureId)) {
      onChange({ specialFeatureIds: current.filter(id => id !== featureId) })
    } else {
      onChange({ specialFeatureIds: [...current, featureId].sort((a, b) => a - b) })
    }
  }

  const updateRestriction = (purposeId: number, restrictionType: 0 | 1 | 2) => {
    const existing = config.publisherRestrictions.filter(r => r.purposeId !== purposeId)
    const updated: PublisherRestriction[] = [
      ...existing,
      { purposeId, restrictionType, vendorIds: [] },
    ]
    onChange({ publisherRestrictions: updated })
  }

  const removeRestriction = (purposeId: number) => {
    onChange({
      publisherRestrictions: config.publisherRestrictions.filter(r => r.purposeId !== purposeId),
    })
  }

  const getRestriction = (purposeId: number) => {
    return config.publisherRestrictions.find(r => r.purposeId === purposeId)
  }

  const consentPurposes = TCF_PURPOSES.filter(p => p.legalBasis === 'consent')
  const legitimateInterestPurposes = TCF_PURPOSES.filter(p => p.legalBasis === 'legitimate_interest')

  return (
    <div className="space-y-4">
      {/* Enable TCF Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          id="tcf-enabled"
          checked={config.enabled}
          onCheckedChange={(checked) => onChange({ enabled: checked })}
        />
        <Label htmlFor="tcf-enabled" className="text-sm font-medium">
          Enable IAB TCF 2.2
        </Label>
      </div>

      {config.enabled && (
        <div className="space-y-6 pl-2">
          {/* Publisher Country Code */}
          <div className="space-y-2">
            <Label htmlFor="tcf-country-code" className="text-sm font-medium">
              Publisher Country Code
            </Label>
            <Input
              id="tcf-country-code"
              value={config.publisherCountryCode}
              onChange={(e) => onChange({ publisherCountryCode: e.target.value.toUpperCase().slice(0, 2) })}
              placeholder="CA"
              className="w-24 font-mono uppercase"
              maxLength={2}
            />
          </div>

          {/* CMP ID */}
          <div className="space-y-2">
            <Label htmlFor="tcf-cmp-id" className="text-sm font-medium">
              CMP ID
            </Label>
            <Input
              id="tcf-cmp-id"
              type="number"
              value={config.cmpId || ''}
              onChange={(e) => onChange({ cmpId: parseInt(e.target.value) || 0 })}
              placeholder="0"
              className="w-32 font-mono"
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              Get your CMP ID from IAB registration
            </p>
          </div>

          {/* Purpose Selection */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Purpose Selection</h4>

            {/* Consent Purposes */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Consent Purposes
              </Label>
              <div className="space-y-1">
                {consentPurposes.map(purpose => (
                  <label
                    key={purpose.id}
                    className="flex items-start gap-3 p-2.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={config.purposeIds.includes(purpose.id)}
                      onChange={() => togglePurpose(purpose.id)}
                      className="h-4 w-4 mt-0.5 rounded border-input text-primary focus:ring-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Purpose {purpose.id}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">Consent</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{purpose.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Legitimate Interest Purposes */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Legitimate Interest Purposes
              </Label>
              <div className="space-y-1">
                {legitimateInterestPurposes.map(purpose => (
                  <label
                    key={purpose.id}
                    className="flex items-start gap-3 p-2.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={config.purposeIds.includes(purpose.id)}
                      onChange={() => togglePurpose(purpose.id)}
                      className="h-4 w-4 mt-0.5 rounded border-input text-primary focus:ring-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Purpose {purpose.id}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">Leg. Interest</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{purpose.name}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Special Features */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Special Features</h4>
            <div className="space-y-1">
              {SPECIAL_FEATURES.map(feature => (
                <label
                  key={feature.id}
                  className="flex items-start gap-3 p-2.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={config.specialFeatureIds.includes(feature.id)}
                    onChange={() => toggleSpecialFeature(feature.id)}
                    className="h-4 w-4 mt-0.5 rounded border-input text-primary focus:ring-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium">{feature.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Vendor Management */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Vendor Management</h4>
            <div className="flex items-center space-x-2">
              <Switch
                id="tcf-vendor-mode"
                checked={vendorMode === 'selected'}
                onCheckedChange={(checked) => {
                  const mode = checked ? 'selected' : 'all'
                  setVendorMode(mode)
                  if (mode === 'all') {
                    onChange({ vendorIds: [] })
                  }
                }}
              />
              <Label htmlFor="tcf-vendor-mode" className="text-sm">
                {vendorMode === 'all' ? 'All vendors (Global Vendor List)' : 'Selected vendors only'}
              </Label>
            </div>

            {vendorMode === 'selected' && (
              <TCFVendorSelector
                selectedVendorIds={config.vendorIds}
                onChange={(vendorIds) => onChange({ vendorIds })}
              />
            )}
          </div>

          {/* Show Vendor List in Banner */}
          <div className="flex items-center space-x-2">
            <Switch
              id="tcf-show-vendor-list"
              checked={config.showVendorList}
              onCheckedChange={(checked) => onChange({ showVendorList: checked })}
            />
            <Label htmlFor="tcf-show-vendor-list" className="text-sm">
              Show vendor list in banner
            </Label>
          </div>

          {/* Store Consent Globally */}
          <div className="flex items-center space-x-2">
            <Switch
              id="tcf-store-globally"
              checked={config.storeConsentGlobally}
              onCheckedChange={(checked) => onChange({ storeConsentGlobally: checked })}
            />
            <Label htmlFor="tcf-store-globally" className="text-sm">
              Store consent globally (consensu.org)
            </Label>
          </div>

          {/* Publisher Restrictions (Collapsible) */}
          <div className="border rounded-lg">
            <button
              type="button"
              onClick={() => setRestrictionsOpen(!restrictionsOpen)}
              className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <span>Publisher Restrictions</span>
              <div className="flex items-center gap-2">
                {config.publisherRestrictions.length > 0 && (
                  <Badge variant="secondary" className="text-[10px]">
                    {config.publisherRestrictions.length}
                  </Badge>
                )}
                {restrictionsOpen ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {restrictionsOpen && (
              <div className="border-t px-4 py-3 space-y-3">
                <p className="text-xs text-muted-foreground">
                  Override the default legal basis for active purposes. Only active purposes are shown.
                </p>
                {config.purposeIds.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic py-2">
                    No purposes enabled. Enable purposes above to configure restrictions.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {config.purposeIds.map(purposeId => {
                      const purpose = TCF_PURPOSES.find(p => p.id === purposeId)
                      if (!purpose) return null
                      const restriction = getRestriction(purposeId)
                      return (
                        <div key={purposeId} className="flex items-center justify-between gap-3 py-1.5">
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium">
                              P{purposeId}: {purpose.name}
                            </span>
                          </div>
                          <Select
                            value={restriction ? String(restriction.restrictionType) : 'none'}
                            onValueChange={(value) => {
                              if (value === 'none') {
                                removeRestriction(purposeId)
                              } else {
                                updateRestriction(purposeId, parseInt(value) as 0 | 1 | 2)
                              }
                            }}
                          >
                            <SelectTrigger className="w-48 h-8 text-xs">
                              <SelectValue placeholder="No restriction" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none" className="text-xs">No restriction</SelectItem>
                              {RESTRICTION_TYPES.map(rt => (
                                <SelectItem key={rt.value} value={rt.value} className="text-xs">
                                  {rt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
