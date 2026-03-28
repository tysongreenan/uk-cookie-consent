'use client'

import { useEffect } from 'react'
import type { PrivacyPolicyInputs } from '@/types'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

const JURISDICTIONS = [
  { value: 'gdpr', label: 'GDPR (EU/UK)' },
  { value: 'ccpa', label: 'CCPA (California)' },
  { value: 'pipeda', label: 'PIPEDA (Canada)' },
  { value: 'law25', label: 'Quebec Law 25' },
]

const EU_COUNTRIES = ['GB', 'DE', 'FR', 'NL', 'IE', 'SE', 'NO', 'DK', 'FI', 'ES', 'IT', 'PT', 'BE', 'AT', 'CH']

export function StepJurisdictions({ inputs, onChange }: StepProps) {
  // Auto-suggest jurisdictions based on country/province selection
  useEffect(() => {
    const suggestions: string[] = []

    if (inputs.country === 'CA') {
      if (!inputs.jurisdictions.includes('pipeda')) {
        suggestions.push('pipeda')
      }
      if (inputs.province === 'QC' && !inputs.jurisdictions.includes('law25')) {
        suggestions.push('law25')
      }
    }

    if (inputs.country === 'US' && !inputs.jurisdictions.includes('ccpa')) {
      suggestions.push('ccpa')
    }

    if (EU_COUNTRIES.includes(inputs.country) && !inputs.jurisdictions.includes('gdpr')) {
      suggestions.push('gdpr')
    }

    if (suggestions.length > 0) {
      onChange({ jurisdictions: [...inputs.jurisdictions, ...suggestions] })
    }
    // Only run when country/province changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs.country, inputs.province])

  const toggleJurisdiction = (value: string) => {
    const current = inputs.jurisdictions
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ jurisdictions: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Jurisdictions & Language</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select the privacy regulations that apply to your business. We have
          auto-selected suggestions based on your country.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Applicable Regulations</Label>
        <div className="grid grid-cols-2 gap-3">
          {JURISDICTIONS.map((j) => {
            const isChecked = inputs.jurisdictions.includes(j.value)
            return (
              <label
                key={j.value}
                className={`flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleJurisdiction(j.value)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                {j.label}
              </label>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Policy Language</Label>
        <Select
          value={inputs.language}
          onValueChange={(value: 'en' | 'fr') => onChange({ language: value })}
        >
          <SelectTrigger id="language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
