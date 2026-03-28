'use client'

import type { PrivacyPolicyInputs } from '@/types'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

const DATA_PURPOSES = [
  { value: 'service_delivery', label: 'Service Delivery' },
  { value: 'analytics_improvement', label: 'Analytics & Improvement' },
  { value: 'marketing_advertising', label: 'Marketing & Advertising' },
  { value: 'legal_compliance', label: 'Legal Compliance' },
  { value: 'customer_support', label: 'Customer Support' },
  { value: 'account_management', label: 'Account Management' },
  { value: 'personalization', label: 'Personalization' },
]

const RECIPIENT_TYPES = [
  { value: 'payment_processors', label: 'Payment Processors' },
  { value: 'analytics_providers', label: 'Analytics Providers' },
  { value: 'advertising_networks', label: 'Advertising Networks' },
  { value: 'cloud_hosting', label: 'Cloud Hosting' },
  { value: 'email_services', label: 'Email Services' },
  { value: 'crm_providers', label: 'CRM Providers' },
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

export function StepDataUsage({ inputs, onChange }: StepProps) {
  const togglePurpose = (value: string) => {
    const current = inputs.dataPurposes
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ dataPurposes: next })
  }

  const toggleRecipient = (value: string) => {
    const current = inputs.thirdPartyRecipients || []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ thirdPartyRecipients: next })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Data Usage & Sharing</h2>
        <p className="text-sm text-muted-foreground mt-1">
          How do you use the data you collect and who do you share it with?
        </p>
      </div>

      <div className="space-y-2">
        <Label>Purposes of Data Processing</Label>
        <CheckboxGrid
          items={DATA_PURPOSES}
          selected={inputs.dataPurposes}
          onToggle={togglePurpose}
        />
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
          <div>
            <Label htmlFor="sharesData" className="cursor-pointer">
              Do you share data with third parties?
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Including payment processors, analytics, or advertising partners
            </p>
          </div>
          <Switch
            id="sharesData"
            checked={inputs.sharesDataWithThirdParties}
            onCheckedChange={(checked) =>
              onChange({
                sharesDataWithThirdParties: checked,
                thirdPartyRecipients: checked ? inputs.thirdPartyRecipients : [],
              })
            }
          />
        </div>

        {inputs.sharesDataWithThirdParties && (
          <div className="space-y-2">
            <Label>Third-Party Recipient Types</Label>
            <CheckboxGrid
              items={RECIPIENT_TYPES}
              selected={inputs.thirdPartyRecipients || []}
              onToggle={toggleRecipient}
            />
          </div>
        )}

        <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
          <div>
            <Label htmlFor="transfersIntl" className="cursor-pointer">
              Do you transfer data internationally?
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Storing or processing data outside your home country
            </p>
          </div>
          <Switch
            id="transfersIntl"
            checked={inputs.transfersDataInternationally}
            onCheckedChange={(checked) =>
              onChange({ transfersDataInternationally: checked })
            }
          />
        </div>
      </div>
    </div>
  )
}
