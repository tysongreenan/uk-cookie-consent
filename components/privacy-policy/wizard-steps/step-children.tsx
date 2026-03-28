'use client'

import type { PrivacyPolicyInputs } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
}

export function StepChildren({ inputs, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Children&apos;s Data</h2>
        <p className="text-sm text-muted-foreground mt-1">
          If your service is directed at or collects data from children, additional
          legal requirements apply.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-md border border-border px-4 py-3">
        <div>
          <Label htmlFor="collectsChildren" className="cursor-pointer">
            Does your service collect data from children?
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Users under the applicable minimum age in your jurisdiction
          </p>
        </div>
        <Switch
          id="collectsChildren"
          checked={inputs.collectsChildrenData}
          onCheckedChange={(checked) =>
            onChange({
              collectsChildrenData: checked,
              minimumAge: checked ? inputs.minimumAge || 13 : undefined,
            })
          }
        />
      </div>

      {inputs.collectsChildrenData && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="minimumAge">Minimum Age Requirement</Label>
            <Input
              id="minimumAge"
              type="number"
              min={0}
              max={18}
              value={inputs.minimumAge ?? 13}
              onChange={(e) =>
                onChange({ minimumAge: parseInt(e.target.value, 10) || 13 })
              }
              className="w-32"
            />
            <p className="text-xs text-muted-foreground">
              COPPA requires 13 in the US. GDPR sets 16 (or lower per member state, minimum 13).
            </p>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Collecting data from children triggers additional requirements under
              COPPA (US), GDPR (EU/UK), and PIPEDA (Canada). You must obtain
              verifiable parental consent before collecting, using, or disclosing
              personal information from children under the applicable age threshold.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
