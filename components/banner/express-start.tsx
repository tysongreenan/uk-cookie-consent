'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Check, Globe, Loader2, Palette, Search, ShieldCheck } from 'lucide-react'
import { BrandDiscoveryResult, ComplianceFramework, TrackingScript } from '@/types'
import type { BuilderScannerResult, ScannerImportCandidate } from '@/lib/scripts/import-candidates'

export interface ExpressSetupResult {
  url: string
  domain: string
  /** TLD-based guess; null = keep the builder's default framework */
  framework: ComplianceFramework | null
  brand: BrandDiscoveryResult | null
  scan: BuilderScannerResult | null
  /** High-confidence trackers ready to drop into config.scripts */
  scripts: TrackingScript[]
}

interface ExpressStartProps {
  initialUrl?: string
  onComplete: (result: ExpressSetupResult) => void
  onSkip: () => void
}

// EU/EEA + UK country TLDs → GDPR; .ca → PIPEDA. Everything else keeps the
// default and gets confirmed on the Compliance step the user lands on.
const GDPR_TLDS = new Set([
  'uk', 'eu', 'de', 'fr', 'it', 'es', 'nl', 'ie', 'pl', 'pt', 'se', 'dk',
  'fi', 'at', 'be', 'cz', 'gr', 'hu', 'ro', 'sk', 'bg', 'hr', 'ee', 'lt',
  'lu', 'lv', 'mt', 'si', 'cy', 'no', 'is',
])

function guessFramework(domain: string): ComplianceFramework | null {
  const tld = domain.split('.').pop() || ''
  if (tld === 'ca') return 'pipeda'
  if (GDPR_TLDS.has(tld)) return 'gdpr'
  return null
}

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(withProtocol)
    if (!parsed.hostname.includes('.')) return null
    return parsed.toString()
  } catch {
    return null
  }
}

// Mirror of ScriptScannerImport's default selection: high-confidence,
// non-duplicate candidates that aren't already managed by a tag manager.
function autoImportScripts(candidates: ScannerImportCandidate[]): TrackingScript[] {
  return candidates
    .filter(c => c.confidence === 'high' && !c.duplicate && c.scriptCode.trim() && !c.managedByTagManager)
    .map(c => ({
      id: c.id,
      name: c.name,
      category: c.category,
      scriptCode: c.scriptCode,
      bodyCode: c.bodyCode,
      enabled: true,
      source: 'scanner',
      sourceUrl: c.sourceUrl,
      detectedVendor: c.detectedVendor,
      confidence: c.confidence,
      importWarning: c.importWarning,
    } as TrackingScript))
}

type StepState = 'pending' | 'active' | 'done' | 'failed'

export function ExpressStart({ initialUrl, onComplete, onSkip }: ExpressStartProps) {
  const [url, setUrl] = useState(initialUrl || '')
  const [error, setError] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [brandStep, setBrandStep] = useState<StepState>('pending')
  const [scanStep, setScanStep] = useState<StepState>('pending')
  const autoStarted = useRef(false)

  const runSetup = async (rawUrl: string) => {
    const normalized = normalizeUrl(rawUrl)
    if (!normalized) {
      setError('Enter a valid website URL, e.g. yoursite.com')
      return
    }

    setError(null)
    setIsRunning(true)
    setBrandStep('active')
    setScanStep('active')

    const brandPromise = fetch('/api/brand/discover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: normalized }),
    }).then(async res => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Brand discovery failed')
      return data as BrandDiscoveryResult
    })

    const scanPromise = fetch('/api/builder/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: normalized }),
    }).then(async res => {
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Website scan failed')
      return data as BuilderScannerResult
    })

    const [brandOutcome, scanOutcome] = await Promise.allSettled([
      brandPromise.then(r => { setBrandStep('done'); return r }).catch(e => { setBrandStep('failed'); throw e }),
      scanPromise.then(r => { setScanStep('done'); return r }).catch(e => { setScanStep('failed'); throw e }),
    ])

    const brand = brandOutcome.status === 'fulfilled' ? brandOutcome.value : null
    const scan = scanOutcome.status === 'fulfilled' ? scanOutcome.value : null

    if (!brand && !scan) {
      setIsRunning(false)
      setError('We couldn\'t reach that site. Check the URL, or start from scratch below.')
      return
    }

    const domain = new URL(normalized).hostname.replace(/^www\./, '')
    onComplete({
      url: normalized,
      domain,
      framework: guessFramework(domain),
      brand,
      scan,
      scripts: scan ? autoImportScripts(scan.scripts) : [],
    })
  }

  // Public-builder handoff: /dashboard/builder?url=... auto-starts the setup
  useEffect(() => {
    if (initialUrl && !autoStarted.current) {
      autoStarted.current = true
      runSetup(initialUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl])

  const stepIcon = (state: StepState) => {
    if (state === 'done') return <Check className="h-4 w-4 text-green-600" />
    if (state === 'failed') return <span className="text-xs text-amber-600">skipped</span>
    if (state === 'active') return <Loader2 className="h-4 w-4 animate-spin text-primary" />
    return <span className="h-4 w-4" />
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Globe className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Create your cookie banner
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Enter your website and we&apos;ll set everything up for you — brand colors and logo,
          detected tracking scripts, and the right compliance defaults.
        </p>

        {!isRunning ? (
          <>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
              <Input
                autoFocus
                placeholder="yoursite.com"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') runSetup(url) }}
                className="h-11 flex-1 text-base"
              />
              <Button className="h-11 px-6" onClick={() => runSetup(url)}>
                Build my banner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            <button
              onClick={onSkip}
              className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              I don&apos;t have a website yet
            </button>
          </>
        ) : (
          <Card className="mx-auto mt-8 max-w-md text-left">
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  Importing your brand colors &amp; logo
                </span>
                {stepIcon(brandStep)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  Scanning for tracking scripts &amp; cookies
                </span>
                {stepIcon(scanStep)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  Applying compliance defaults
                </span>
                {stepIcon(brandStep === 'pending' && scanStep === 'pending' ? 'pending' : 'active')}
              </div>
              <p className="pt-1 text-xs text-muted-foreground">
                This usually takes 10–20 seconds.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
