'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Shield,
  Sparkles,
  Target,
} from 'lucide-react'

type WidgetTaskStatus = 'complete' | 'current' | 'pending'
type ChecklistStatus = 'verified' | 'needs_action' | 'pro'

interface WidgetTask {
  id: string
  title: string
  description: string
  href: string
  status: WidgetTaskStatus
  pro?: boolean
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  status: ChecklistStatus
  href: string
}

const PRIMARY_TASKS: WidgetTask[] = [
  {
    id: 'banner-live',
    title: 'Publish your banner',
    description: 'Your live banner is active and collecting consent choices.',
    href: '/dashboard',
    status: 'complete',
  },
  {
    id: 'clear-consent',
    title: 'Enable clear consent choices',
    description: 'Accept and reject controls are visible to visitors.',
    href: '/dashboard/builder',
    status: 'complete',
  },
  {
    id: 'privacy-policy',
    title: 'Add a privacy policy link',
    description: 'Link visitors to your privacy policy directly from the banner.',
    href: '/dashboard/privacy-policy/new',
    status: 'current',
  },
  {
    id: 'consent-logs',
    title: 'Turn on consent logs',
    description: 'Create proof-of-consent records for audits and data requests.',
    href: '/dashboard/consent-logs',
    status: 'pending',
    pro: true,
  },
  {
    id: 'regional-rules',
    title: 'Configure regional rules',
    description: 'Apply stricter behavior for Quebec, EU, and other regions.',
    href: '/dashboard/builder',
    status: 'pending',
    pro: true,
  },
]

const FOUNDATION_ITEMS: ChecklistItem[] = [
  {
    id: 'foundation-live',
    title: 'Banner is active',
    description: 'Visitors can see your banner on a live site.',
    status: 'verified',
    href: '/dashboard',
  },
  {
    id: 'foundation-choice',
    title: 'Clear consent choices',
    description: 'Accept and reject options are available.',
    status: 'verified',
    href: '/dashboard/builder',
  },
  {
    id: 'foundation-privacy',
    title: 'Privacy policy linked',
    description: 'Add a policy link so visitors can review your practices.',
    status: 'needs_action',
    href: '/dashboard/privacy-policy/new',
  },
  {
    id: 'foundation-preferences',
    title: 'Preferences control available',
    description: 'Visitors can reopen and adjust consent settings.',
    status: 'verified',
    href: '/dashboard/builder',
  },
]

const AUDIT_ITEMS: ChecklistItem[] = [
  {
    id: 'audit-logs',
    title: 'Consent logs',
    description: 'Store proof-of-consent records for audits and disputes.',
    status: 'pro',
    href: '/dashboard/consent-logs',
  },
  {
    id: 'audit-dsar',
    title: 'DSAR workflow',
    description: 'Track and respond to data access requests.',
    status: 'pro',
    href: '/dashboard/data-requests',
  },
  {
    id: 'audit-geo',
    title: 'Regional readiness',
    description: 'Apply stricter rules for specific countries or provinces.',
    status: 'pro',
    href: '/dashboard/builder',
  },
  {
    id: 'audit-integrations',
    title: 'Consent-aware integrations',
    description: 'Connect analytics and scripts with stronger controls.',
    status: 'needs_action',
    href: '/dashboard/integrations',
  },
]

interface ComplianceReadinessWidgetProps {
  name?: string | null
}

export function ComplianceReadinessWidget({ name }: ComplianceReadinessWidgetProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [showFullChecklist, setShowFullChecklist] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('compliance-readiness-widget-open')
    if (stored !== null) {
      setIsOpen(stored === 'true')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('compliance-readiness-widget-open', String(isOpen))
  }, [isOpen])

  const firstName = useMemo(() => {
    if (!name) return 'there'
    return name.split(' ')[0]
  }, [name])

  const completedTasks = PRIMARY_TASKS.filter((task) => task.status === 'complete').length
  const totalTasks = PRIMARY_TASKS.length
  const readinessPercent = Math.round((completedTasks / totalTasks) * 100)
  const foundationScore = 75
  const auditScore = 20

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed right-0 top-28 z-40 hidden lg:flex items-center gap-3 rounded-l-2xl border border-r-0 border-border/80 bg-card/95 px-4 py-3 shadow-[0_16px_40px_rgba(14,118,140,0.14)] backdrop-blur transition-all duration-300 hover:-translate-x-1',
          isOpen ? 'pointer-events-none translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        )}
        aria-label="Open compliance readiness widget"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Shield className="h-5 w-5" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Readiness
          </p>
          <p className="text-sm font-semibold text-foreground">{readinessPercent}%</p>
        </div>
      </button>

      <div
        className={cn(
          'fixed right-6 top-24 z-50 hidden w-[360px] lg:block transition-all duration-300',
          isOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-8 opacity-0'
        )}
      >
        <Card className="overflow-hidden rounded-[28px] border-border/70 bg-card/95 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur">
          <div className="bg-gradient-to-r from-primary/12 via-primary/5 to-transparent px-5 pb-4 pt-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <Badge className="rounded-full border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    2 of 5 complete
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  Getting Audit-Ready
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hi {firstName}, let&apos;s turn your live banner into a stronger compliance setup.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-2xl border border-border/70 bg-background/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Collapse compliance readiness widget"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 rounded-[22px] border border-border/70 bg-background/80 p-4">
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span>Progress</span>
                <span>{readinessPercent}% complete</span>
              </div>
              <Progress value={readinessPercent} className="h-2.5 bg-primary/12" />

              <div className="grid grid-cols-2 gap-3 pt-1">
                <ScorePill label="Foundation" value="6 / 8" percent={foundationScore} />
                <ScorePill label="Audit & Ops" value="2 / 10" percent={auditScore} />
              </div>
            </div>
          </div>

          <CardContent className="space-y-4 px-5 pb-5 pt-0">
            <div className="rounded-[22px] border border-border/70 bg-muted/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Next best actions</p>
              </div>
              <div className="space-y-2.5">
                {PRIMARY_TASKS.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </div>

            {showFullChecklist && (
              <div className="rounded-[22px] border border-border/70 bg-background p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Full checklist</h4>
                    <p className="text-xs text-muted-foreground">
                      Guidance first, upgrades only where they genuinely help.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFullChecklist(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/70 bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Hide full checklist"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                </div>

                <ChecklistSection title="Foundation" items={FOUNDATION_ITEMS} />
                <ChecklistSection title="Audit & Ops" items={AUDIT_ITEMS} className="mt-4" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-2xl border-border/70 bg-background"
                onClick={() => setShowFullChecklist((value) => !value)}
              >
                {showFullChecklist ? 'Hide Checklist' : 'Review Checklist'}
              </Button>
              <Button asChild className="h-11 rounded-2xl">
                <Link href="/dashboard/privacy-policy/new">Start Next Step</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function ScorePill({
  label,
  value,
  percent,
}: {
  label: string
  value: string
  percent: number
}) {
  return (
    <div className="rounded-[18px] border border-border/70 bg-card p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </div>
      <Progress value={percent} className="h-1.5 bg-primary/10" />
    </div>
  )
}

function TaskRow({ task }: { task: WidgetTask }) {
  const isComplete = task.status === 'complete'
  const isCurrent = task.status === 'current'

  return (
    <div
      className={cn(
        'rounded-[18px] border p-3 transition-colors',
        isCurrent
          ? 'border-primary/30 bg-primary/5'
          : 'border-border/70 bg-background/90'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">
          {isComplete ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : isCurrent ? (
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
              <div className="h-2 w-2 rounded-full bg-primary" />
            </div>
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground/60" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <p
              className={cn(
                'text-sm font-semibold text-foreground',
                isComplete && 'line-through decoration-2 decoration-emerald-500/70'
              )}
            >
              {task.title}
            </p>
            {task.pro && (
              <Badge className="rounded-full border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                Pro
              </Badge>
            )}
          </div>
          <p className="pr-2 text-xs leading-5 text-muted-foreground">{task.description}</p>
        </div>

        <Button
          asChild
          size="sm"
          variant={isComplete ? 'outline' : 'default'}
          className={cn(
            'mt-0.5 h-9 rounded-xl px-3 text-xs',
            isComplete && 'border-border/70 bg-background'
          )}
        >
          <Link href={task.href}>{isComplete ? 'Open' : 'Start'}</Link>
        </Button>
      </div>
    </div>
  )
}

function ChecklistSection({
  title,
  items,
  className,
}: {
  title: string
  items: ChecklistItem[]
  className?: string
}) {
  return (
    <div className={className}>
      <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h5>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/20 px-3 py-3 transition-colors hover:bg-muted/35"
          >
            <StatusIndicator status={item.status} />
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-xs leading-5 text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function StatusIndicator({ status }: { status: ChecklistStatus }) {
  if (status === 'verified') {
    return (
      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
        <CheckCircle2 className="h-4 w-4" />
      </div>
    )
  }

  if (status === 'needs_action') {
    return (
      <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
        <div className="h-2 w-2 rounded-full bg-amber-500" />
      </div>
    )
  }

  return (
    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Shield className="h-3.5 w-3.5" />
    </div>
  )
}

function StatusBadge({ status }: { status: ChecklistStatus }) {
  if (status === 'verified') {
    return (
      <Badge className="rounded-full border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
        Verified
      </Badge>
    )
  }

  if (status === 'needs_action') {
    return (
      <Badge className="rounded-full border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">
        Needs Action
      </Badge>
    )
  }

  return (
    <Badge className="rounded-full border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
      Available in Pro
    </Badge>
  )
}
