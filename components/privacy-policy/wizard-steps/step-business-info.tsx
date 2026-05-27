'use client'

import type { PrivacyPolicyInputs } from '@/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface StepProps {
  inputs: PrivacyPolicyInputs
  onChange: (updates: Partial<PrivacyPolicyInputs>) => void
  errors?: Partial<Record<keyof PrivacyPolicyInputs, string>>
}

const COUNTRIES = [
  { value: 'CA', label: 'Canada' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'IE', label: 'Ireland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'NO', label: 'Norway' },
  { value: 'DK', label: 'Denmark' },
  { value: 'FI', label: 'Finland' },
  { value: 'ES', label: 'Spain' },
  { value: 'IT', label: 'Italy' },
  { value: 'PT', label: 'Portugal' },
  { value: 'BE', label: 'Belgium' },
  { value: 'AT', label: 'Austria' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'SG', label: 'Singapore' },
  { value: 'JP', label: 'Japan' },
  { value: 'IN', label: 'India' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'ZA', label: 'South Africa' },
]

const PROVINCES = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
]

const BUSINESS_TYPES: { value: PrivacyPolicyInputs['businessType']; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'saas', label: 'SaaS Application' },
  { value: 'ecommerce', label: 'E-Commerce Store' },
  { value: 'mobile_app', label: 'Mobile App' },
  { value: 'other', label: 'Other' },
]

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-destructive mt-1">{message}</p>
}

export function StepBusinessInfo({ inputs, onChange, errors }: StepProps) {
  const handleLogoChange = async (file: File | null) => {
    if (!file) {
      onChange({ logoUrl: undefined })
      return
    }
    if (file.size > 400_000) {
      alert('Logo must be under 400 KB. Try a smaller PNG or SVG.')
      return
    }
    const dataUrl = await fileToDataUrl(file)
    onChange({ logoUrl: dataUrl })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Business Information</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about your business so we can tailor the policy to your needs.
        </p>
      </div>

      {/* Logo upload */}
      <div className="space-y-2">
        <Label htmlFor="logo">Business Logo <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <div className="flex items-center gap-4">
          {inputs.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={inputs.logoUrl}
              alt="Business logo preview"
              className="h-16 w-16 rounded-md border border-border object-contain bg-white p-1"
            />
          ) : (
            <div className="h-16 w-16 rounded-md border border-dashed border-border bg-muted/30 flex items-center justify-center text-xs text-muted-foreground">
              Logo
            </div>
          )}
          <div className="space-y-1.5">
            <Input
              id="logo"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={(e) => handleLogoChange(e.target.files?.[0] ?? null)}
              className="cursor-pointer"
            />
            {inputs.logoUrl && (
              <button
                type="button"
                onClick={() => onChange({ logoUrl: undefined })}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Remove logo
              </button>
            )}
            <p className="text-xs text-muted-foreground">PNG, JPG, SVG or WebP, under 400 KB.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">
            Business Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessName"
            value={inputs.businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            placeholder="Acme Inc."
            aria-invalid={!!errors?.businessName}
            className={errors?.businessName ? 'border-destructive' : undefined}
          />
          <FieldError message={errors?.businessName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select
            value={inputs.businessType}
            onValueChange={(value: PrivacyPolicyInputs['businessType']) =>
              onChange({ businessType: value })
            }
          >
            <SelectTrigger id="businessType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {BUSINESS_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl">
            Website URL <span className="text-destructive">*</span>
          </Label>
          <Input
            id="websiteUrl"
            type="url"
            value={inputs.websiteUrl}
            onChange={(e) => onChange({ websiteUrl: e.target.value })}
            placeholder="https://example.com"
            aria-invalid={!!errors?.websiteUrl}
            className={errors?.websiteUrl ? 'border-destructive' : undefined}
          />
          <FieldError message={errors?.websiteUrl} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">
            Contact Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={inputs.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            placeholder="privacy@example.com"
            aria-invalid={!!errors?.contactEmail}
            className={errors?.contactEmail ? 'border-destructive' : undefined}
          />
          <FieldError message={errors?.contactEmail} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">
            Country <span className="text-destructive">*</span>
          </Label>
          <Select
            value={inputs.country}
            onValueChange={(value) => {
              onChange({ country: value, province: undefined })
            }}
          >
            <SelectTrigger
              id="country"
              aria-invalid={!!errors?.country}
              className={errors?.country ? 'border-destructive' : undefined}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors?.country} />
        </div>

        {inputs.country === 'CA' && (
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select
              value={inputs.province || ''}
              onValueChange={(value) => onChange({ province: value })}
            >
              <SelectTrigger id="province">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}
