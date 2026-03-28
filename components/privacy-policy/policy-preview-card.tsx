'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Clock } from 'lucide-react'

interface PolicyPreviewCardProps {
  policy: {
    id: string
    name: string
    status: 'draft' | 'published'
    jurisdictions: string[]
    updatedAt: string
    inputs: {
      businessName: string
    }
  }
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const JURISDICTION_LABELS: Record<string, string> = {
  gdpr: 'GDPR',
  ccpa: 'CCPA',
  pipeda: 'PIPEDA',
  law25: 'Law 25',
}

export function PolicyPreviewCard({ policy, onEdit, onDelete }: PolicyPreviewCardProps) {
  const formattedDate = new Date(policy.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card className="group hover:border-primary/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="text-base font-semibold truncate">
              {policy.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5 truncate">
              {policy.inputs.businessName}
            </p>
          </div>
          <Badge
            className={
              policy.status === 'published'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-amber-100 text-amber-800 border-amber-200'
            }
          >
            {policy.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {policy.jurisdictions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {policy.jurisdictions.map((j) => (
              <Badge key={j} variant="outline" className="text-xs">
                {JURISDICTION_LABELS[j] || j}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          Updated {formattedDate}
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(policy.id)}
          >
            <Edit className="h-3.5 w-3.5 mr-1.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(policy.id)}
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
