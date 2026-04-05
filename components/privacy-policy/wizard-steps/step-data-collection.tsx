'use client'

import type { PrivacyPolicyInputs } from '@/types'
import { Label } from '@/components/ui/label'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

const DATA_TYPES = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'ip_address', label: 'IP Address' },
  { value: 'device_info', label: 'Device Info' },
  { value: 'payment_data', label: 'Payment Data' },
  { value: 'location', label: 'Location' },
  { value: 'browsing_history', label: 'Browsing History' },
  { value: 'account_credentials', label: 'Account Credentials' },
  { value: 'social_media_profiles', label: 'Social Media Profiles' },
  { value: 'employment_info', label: 'Employment Info' },
  { value: 'health_info', label: 'Health Info' },
]

const COLLECTION_METHODS = [
  { value: 'forms', label: 'Forms' },
  { value: 'cookies', label: 'Cookies' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'account_creation', label: 'Account Creation' },
  { value: 'purchases', label: 'Purchases' },
  { value: 'third_party_sources', label: 'Third-Party Sources' },
  { value: 'automatic_collection', label: 'Automatic Collection' },
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

const PRESETS: Record<string, { data: string[]; methods: string[] }> = {
  website: {
    data: ['name', 'email', 'ip_address', 'device_info', 'browsing_history'],
    methods: ['forms', 'cookies', 'analytics', 'automatic_collection'],
  },
  ecommerce: {
    data: ['name', 'email', 'phone', 'ip_address', 'device_info', 'payment_data', 'location', 'browsing_history'],
    methods: ['forms', 'cookies', 'analytics', 'account_creation', 'purchases', 'automatic_collection'],
  },
  saas: {
    data: ['name', 'email', 'ip_address', 'device_info', 'account_credentials', 'browsing_history'],
    methods: ['forms', 'cookies', 'analytics', 'account_creation', 'automatic_collection'],
  },
  mobile_app: {
    data: ['name', 'email', 'ip_address', 'device_info', 'location', 'account_credentials'],
    methods: ['forms', 'analytics', 'account_creation', 'automatic_collection'],
  },
}

export function StepDataCollection({ inputs, onChange }: StepProps) {
  const applyPreset = () => {
    const preset = PRESETS[inputs.businessType] || PRESETS.website
    onChange({ dataCollected: preset.data, collectionMethods: preset.methods })
  }

  const hasSelections = inputs.dataCollected.length > 0 || inputs.collectionMethods.length > 0

  const toggleDataType = (value: string) => {
    const current = inputs.dataCollected
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ dataCollected: next })
  }

  const toggleMethod = (value: string) => {
    const current = inputs.collectionMethods
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ collectionMethods: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Data Collection</h2>
        <p className="text-sm text-muted-foreground mt-1">
          What personal data do you collect and how do you collect it?
        </p>
      </div>

      {/* Quick preset — one click to pre-fill based on business type */}
      {!hasSelections && (
        <button
          type="button"
          onClick={applyPreset}
          className="w-full p-4 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10 transition-colors text-center"
        >
          <p className="font-medium text-sm text-primary">
            Auto-fill for {inputs.businessType === 'ecommerce' ? 'E-Commerce' : inputs.businessType === 'saas' ? 'SaaS' : inputs.businessType === 'mobile_app' ? 'Mobile App' : 'Website'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Pre-selects the most common data types and collection methods for your business type</p>
        </button>
      )}

      <div className="space-y-2">
        <Label>Types of Data Collected</Label>
        <CheckboxGrid
          items={DATA_TYPES}
          selected={inputs.dataCollected}
          onToggle={toggleDataType}
          onSelectAll={() => onChange({ dataCollected: DATA_TYPES.map((d) => d.value) })}
          onDeselectAll={() => onChange({ dataCollected: [] })}
        />
      </div>

      <div className="space-y-2">
        <Label>Collection Methods</Label>
        <CheckboxGrid
          items={COLLECTION_METHODS}
          selected={inputs.collectionMethods}
          onToggle={toggleMethod}
          onSelectAll={() => onChange({ collectionMethods: COLLECTION_METHODS.map((m) => m.value) })}
          onDeselectAll={() => onChange({ collectionMethods: [] })}
        />
      </div>
    </div>
  )
}
