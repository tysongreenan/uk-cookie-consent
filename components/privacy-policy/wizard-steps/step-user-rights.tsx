'use client'

import type { PrivacyPolicyInputs } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

const RETENTION_PERIODS = [
  { value: '6_months', label: '6 Months' },
  { value: '1_year', label: '1 Year' },
  { value: '2_years', label: '2 Years' },
  { value: '5_years', label: '5 Years' },
  { value: 'until_account_deleted', label: 'Until Account Deleted' },
  { value: 'custom', label: 'Custom' },
]

export function StepUserRights({ inputs, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">User Rights & Data Retention</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure data retention and the rights you provide to your users.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="retention">Data Retention Period</Label>
          <Select
            value={inputs.dataRetentionPeriod}
            onValueChange={(value) =>
              onChange({
                dataRetentionPeriod: value,
                customRetentionPeriod: value === 'custom' ? inputs.customRetentionPeriod : undefined,
              })
            }
          >
            <SelectTrigger id="retention">
              <SelectValue placeholder="Select retention period" />
            </SelectTrigger>
            <SelectContent>
              {RETENTION_PERIODS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {inputs.dataRetentionPeriod === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="customRetention">Custom Retention Period</Label>
            <Input
              id="customRetention"
              value={inputs.customRetentionPeriod || ''}
              onChange={(e) => onChange({ customRetentionPeriod: e.target.value })}
              placeholder="e.g., 18 months after last activity"
            />
          </div>
        )}

        <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
          <div>
            <Label htmlFor="allowDeletion" className="cursor-pointer">
              Allow users to request data deletion?
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Required under GDPR and recommended for most jurisdictions
            </p>
          </div>
          <Switch
            id="allowDeletion"
            checked={inputs.allowsUserDeletion}
            onCheckedChange={(checked) => onChange({ allowsUserDeletion: checked })}
          />
        </div>

        <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
          <div>
            <Label htmlFor="allowExport" className="cursor-pointer">
              Allow users to export their data?
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Data portability right required under GDPR
            </p>
          </div>
          <Switch
            id="allowExport"
            checked={inputs.allowsUserExport}
            onCheckedChange={(checked) => onChange({ allowsUserExport: checked })}
          />
        </div>
      </div>
    </div>
  )
}
