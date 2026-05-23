'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, Check, ChevronDown, Info, Loader2, RefreshCw, Search, Shield, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { dedupeTrackingScripts, type BuilderScannerResult, type ScannerImportCandidate } from '@/lib/scripts/import-candidates'
import type { BannerConfig, TrackingScript } from '@/types'

interface ScriptScannerImportProps {
  currentScripts: BannerConfig['scripts']
  privacyPolicyUrl?: string
  onImport: (scripts: TrackingScript[], summary: { imported: number; skipped: number; warnings: string[] }) => void
  onUsePrivacyPolicy?: (url: string) => void
  onScanComplete?: (result: BuilderScannerResult) => void
}

const CATEGORY_LABELS: Record<TrackingScript['category'], string> = {
  'strictly-necessary': 'Strictly necessary',
  functionality: 'Functionality',
  'tracking-performance': 'Tracking & performance',
  'targeting-advertising': 'Targeting & advertising',
}

const SCAN_STEPS = [
  'Load site',
  'Detect current banner',
  'Detect cookies and scripts',
  'Prepare import',
]

function getCmpLabel(result: BuilderScannerResult | null): string {
  if (!result) return ''
  if (result.consentBanner.detected) {
    if (result.consentBanner.vendor === 'UK Cookie Consent') return 'cookie-banner.ca detected'
    return `${result.consentBanner.vendor || 'Custom / Unknown'} detected`
  }
  // A static HTML scan can't see banners that JavaScript injects after
  // the page loads — which is most of them. Be explicit about that
  // rather than telling the user "No banner detected" when their site
  // clearly has one.
  if (result.scanMethod === 'static-html') {
    return 'Banner check skipped — static-HTML scan only'
  }
  return 'No banner detected'
}

function getCmpSubLabel(result: BuilderScannerResult | null): string | null {
  if (!result) return null
  if (result.scanMethod === 'static-html' && !result.consentBanner.detected) {
    return 'Most cookie banners are added by JavaScript, so a static scan can\'t see them. Click Rescan to retry the full browser scan.'
  }
  return null
}

function getConfidenceVariant(confidence: ScannerImportCandidate['confidence']): 'default' | 'secondary' | 'destructive' {
  if (confidence === 'high') return 'default'
  if (confidence === 'medium') return 'secondary'
  return 'destructive'
}

function getSnippet(script: ScannerImportCandidate): string {
  if (script.sourceUrl) return script.sourceUrl
  return script.scriptCode.replace(/\s+/g, ' ').trim().slice(0, 140)
}

export function ScriptScannerImport({
  currentScripts,
  privacyPolicyUrl,
  onImport,
  onUsePrivacyPolicy,
  onScanComplete,
}: ScriptScannerImportProps) {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<BuilderScannerResult | null>(null)
  const [candidates, setCandidates] = useState<ScannerImportCandidate[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [importSummary, setImportSummary] = useState<{ imported: number; skipped: number; warnings: string[] } | null>(null)
  const [showDetails, setShowDetails] = useState(true)
  const [showManagedDetails, setShowManagedDetails] = useState(false)

  // Split candidates into two groups:
  //   importable — actually-detected scripts the user should consider importing
  //                (including the tag manager itself! — that's what gates everything)
  //   managed    — scripts that already run via a tag manager the site has
  //                installed (only set for entries sourced from GTM container
  //                introspection). Importing these would double-load unless
  //                the user is fully replacing the tag manager.
  //
  // Critically, this keys off `managedByTagManager`, NOT `importNoteType`.
  // The note type is just visual (blue vs amber icon); the grouping is a
  // distinct concept. Conflating them previously caused GTM itself — which
  // has an info-style noscript note — to disappear into the managed group,
  // leaving users with nothing to import.
  const importableCandidates = useMemo(
    () => candidates.filter(c => !c.managedByTagManager),
    [candidates],
  )
  const managedCandidates = useMemo(
    () => candidates.filter(c => !!c.managedByTagManager),
    [candidates],
  )

  const managedByLabel = useMemo(() => {
    if (managedCandidates.length === 0) return null
    return managedCandidates[0].managedByTagManager ?? null
  }, [managedCandidates])

  const groupedCandidates = useMemo(() => {
    return importableCandidates.reduce<Record<TrackingScript['category'], ScannerImportCandidate[]>>((groups, candidate) => {
      groups[candidate.category].push(candidate)
      return groups
    }, {
      'strictly-necessary': [],
      functionality: [],
      'tracking-performance': [],
      'targeting-advertising': [],
    })
  }, [importableCandidates])

  const scanWebsite = async () => {
    if (!url.trim()) {
      setError('Enter a website URL to scan.')
      return
    }

    setIsScanning(true)
    setError(null)
    setImportSummary(null)

    try {
      const response = await fetch('/api/builder/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const data = await response.json()

      if (!response.ok) {
        const retryAfter = response.headers.get('Retry-After')
        const message = response.status === 429 && retryAfter
          ? `Too many scans. Please wait ${Math.ceil(Number(retryAfter) / 60)} minutes.`
          : data.error || 'Unable to scan this website.'
        setError(message)
        toast.error(message)
        return
      }

      const scanResult = data as BuilderScannerResult
      const deduped = dedupeTrackingScripts(currentScripts, scanResult.scripts)
      setResult(scanResult)
      setCandidates(deduped)
      setSelectedIds(new Set(
        deduped
          // Pre-check high-confidence, non-duplicate candidates that the
          // user would normally want to bring over. Skip entries sourced
          // from a tag-manager container (GTM introspection) — the
          // recommended action there is NOT to import unless the user is
          // fully replacing the tag manager.
          .filter(candidate =>
            candidate.confidence === 'high'
            && !candidate.duplicate
            && candidate.scriptCode.trim()
            && !candidate.managedByTagManager
          )
          .map(candidate => candidate.id),
      ))
      onScanComplete?.(scanResult)
      setShowDetails(true)
      const importableCount = deduped.filter(c => !c.managedByTagManager).length
      const managedCount = deduped.length - importableCount
      const parts = [`${importableCount} script${importableCount === 1 ? '' : 's'} to review`]
      if (managedCount > 0) {
        parts.push(`${managedCount} already managed by your tag manager`)
      }
      toast.success(`Scan complete: ${parts.join(', ')}.`)
    } catch (scanError) {
      const message = scanError instanceof Error ? scanError.message : 'Unable to scan this website.'
      setError(message)
      toast.error(message)
    } finally {
      setIsScanning(false)
    }
  }

  const updateCandidateCategory = (id: string, category: TrackingScript['category']) => {
    setCandidates(prev => prev.map(candidate => candidate.id === id ? { ...candidate, category } : candidate))
  }

  const toggleSelected = (id: string, checked: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const importSelected = () => {
    const selected = candidates.filter(candidate => selectedIds.has(candidate.id) && !candidate.duplicate && candidate.scriptCode.trim())
    const skipped = candidates.length - selected.length
    const warnings = [
      ...candidates.filter(candidate => selectedIds.has(candidate.id) && candidate.importWarning).map(candidate => `${candidate.name}: ${candidate.importWarning}`),
      ...candidates.filter(candidate => candidate.duplicate).map(candidate => `${candidate.name}: ${candidate.duplicateReason || 'Already in banner.'}`),
    ]

    const scripts: TrackingScript[] = selected.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      category: candidate.category,
      scriptCode: candidate.scriptCode,
      bodyCode: candidate.bodyCode,
      enabled: true,
      source: 'scanner',
      sourceUrl: candidate.sourceUrl,
      detectedVendor: candidate.detectedVendor,
      confidence: candidate.confidence,
      importWarning: candidate.importWarning,
    }))

    onImport(scripts, { imported: scripts.length, skipped, warnings })
    setImportSummary({ imported: scripts.length, skipped, warnings })
    setCandidates(prev => prev.map(candidate => (
      selectedIds.has(candidate.id)
        ? { ...candidate, duplicate: true, duplicateReason: 'Imported into this banner.' }
        : candidate
    )))
    setSelectedIds(new Set())
  }

  const hasStrictOptInRecommendation = !!result && (
    result.compliance.gdpr.issues.length > 0 || result.compliance.law25.issues.length > 0
  )

  return (
    <Card className="border-primary/20 bg-primary/5 border-l-4 border-l-violet-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Scanner-Assisted Import
        </CardTitle>
        <CardDescription>
          Scan your site, review detected trackers, and move them into this cookie-banner.ca banner before replacing your old CMP.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !isScanning) scanWebsite()
            }}
            className="flex-1"
          />
          <Button onClick={scanWebsite} disabled={isScanning}>
            {isScanning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning...
              </>
            ) : result ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Rescan
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Scan Website
              </>
            )}
          </Button>
        </div>

        {isScanning && (
          <div className="space-y-3 rounded-lg border bg-background p-4">
            <Progress value={65} />
            <div className="grid gap-2 sm:grid-cols-2">
              {SCAN_STEPS.map((step, index) => (
                <div key={step} className="flex items-center gap-2 text-sm text-muted-foreground">
                  {index < 2 ? <Check className="h-4 w-4 text-green-600" /> : <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-background p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{getCmpLabel(result)}</p>
                  <p className="text-xs text-muted-foreground">
                    {result.cookies.length} cookies found · {result.scanMethod === 'headless' ? 'Browser scan' : 'Static HTML scan'}
                  </p>
                  {getCmpSubLabel(result) && (
                    <p className="mt-2 text-xs text-blue-700">{getCmpSubLabel(result)}</p>
                  )}
                </div>
                {result.consentBanner.vendor === 'UK Cookie Consent' ? (
                  <Badge variant="secondary">Audit existing banner</Badge>
                ) : result.consentBanner.detected ? (
                  <Badge variant="destructive">Replace old CMP</Badge>
                ) : (
                  <Badge variant="secondary">No CMP found</Badge>
                )}
              </div>

              {result.consentBanner.vendor === 'UK Cookie Consent' && (
                <p className="mt-3 text-sm text-muted-foreground">
                  This site already appears to use cookie-banner.ca. Use this scan to audit or update the existing banner instead of replacing another CMP.
                </p>
              )}

              {result.privacyPolicyUrl && !privacyPolicyUrl && onUsePrivacyPolicy && (
                <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md bg-muted/50 p-3">
                  <span className="text-sm">Privacy policy found: <span className="font-medium">{result.privacyPolicyUrl}</span></span>
                  <Button size="sm" variant="outline" onClick={() => onUsePrivacyPolicy(result.privacyPolicyUrl!)}>
                    Use detected privacy policy
                  </Button>
                </div>
              )}

              {hasStrictOptInRecommendation && (
                <div className="mt-3 flex gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0" />
                  GDPR or Law 25 issues were found. Consider enabling explicit consent, a visible Reject button, and granular preferences before publishing.
                </div>
              )}
            </div>

            {importSummary && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>
                  Imported {importSummary.imported} script{importSummary.imported === 1 ? '' : 's'}.
                  {importSummary.skipped > 0 ? ` ${importSummary.skipped} skipped or left for review.` : ''}
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-lg border bg-background">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <span className="font-medium">Review detected scripts</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </button>

              {showDetails && (
                <div className="space-y-5 border-t p-4">
                  {/* Top-of-list summary for tags that a detected tag-manager
                      container (typically GTM) is already responsible for
                      loading. The user shouldn't need to import these unless
                      they're replacing the tag manager itself — call that out
                      ONCE here instead of repeating it on every row. */}
                  {managedCandidates.length > 0 && (
                    <div className="rounded-md border border-blue-200 bg-blue-50/70 p-4">
                      <div className="flex gap-3">
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                        <div className="flex-1 space-y-2">
                          <p className="text-sm font-semibold text-blue-900">
                            {managedCandidates.length} script{managedCandidates.length === 1 ? '' : 's'} {managedCandidates.length === 1 ? 'is' : 'are'} already managed by your existing tag manager
                            {managedByLabel ? ` (${managedByLabel})` : ''}
                          </p>
                          <p className="text-sm text-blue-900/90">
                            Your tag manager already loads these on your site. <strong>You don&apos;t need to import them</strong> — once your cookie-banner.ca banner gates the tag manager script, consent will flow through to every tag it manages.
                          </p>
                          <p className="text-xs text-blue-900/70">
                            Only import these individually if you&apos;re fully replacing your tag manager and want cookie-banner.ca to load each tag directly.
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            {managedCandidates.slice(0, showManagedDetails ? managedCandidates.length : 6).map(c => (
                              <Badge key={c.id} variant="secondary" className="bg-white text-blue-900 border border-blue-200">
                                {c.name}
                              </Badge>
                            ))}
                            {!showManagedDetails && managedCandidates.length > 6 && (
                              <span className="text-xs text-blue-900/70">+ {managedCandidates.length - 6} more</span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowManagedDetails(!showManagedDetails)}
                            className="text-xs font-medium text-blue-700 underline-offset-2 hover:underline"
                          >
                            {showManagedDetails ? 'Hide individual scripts' : 'Show each managed script (advanced — only if replacing your tag manager)'}
                          </button>
                        </div>
                      </div>

                      {/* Per-script checkboxes — only shown when the user
                          explicitly expands. Default state keeps the panel
                          quiet so the importable section gets focus. */}
                      {showManagedDetails && (
                        <div className="mt-4 space-y-2 border-t border-blue-200 pt-4">
                          {managedCandidates.map(script => {
                            const disabled = !!script.duplicate || !script.scriptCode.trim()
                            return (
                              <div key={script.id} className="rounded-md border border-blue-200 bg-white p-3">
                                <div className="flex items-start gap-3">
                                  <Checkbox
                                    checked={selectedIds.has(script.id)}
                                    disabled={disabled}
                                    onCheckedChange={(checked) => toggleSelected(script.id, checked === true)}
                                    aria-label={`Import ${script.name} (already managed by ${managedByLabel ?? 'tag manager'})`}
                                  />
                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <p className="text-sm font-medium">{script.name}</p>
                                      <Badge variant="outline" className="text-xs">{CATEGORY_LABELS[script.category]}</Badge>
                                    </div>
                                    <p className="mt-0.5 text-xs text-muted-foreground">{script.importWarning}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {importableCandidates.length === 0 && managedCandidates.length === 0 ? (
                    <div className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
                      No importable tracking scripts were detected. You can still add scripts manually below.
                    </div>
                  ) : importableCandidates.length === 0 ? (
                    <div className="rounded-md bg-muted/50 p-4 text-sm text-muted-foreground">
                      Nothing else to import — every tracker we found is already handled by your tag manager above.
                    </div>
                  ) : (
                    (Object.keys(groupedCandidates) as TrackingScript['category'][]).map(category => {
                      const scripts = groupedCandidates[category]
                      if (scripts.length === 0) return null

                      return (
                        <div key={category} className="space-y-2">
                          <h4 className="text-sm font-semibold">{CATEGORY_LABELS[category]}</h4>
                          {scripts.map(script => {
                            const disabled = !!script.duplicate || !script.scriptCode.trim()
                            return (
                              <div key={script.id} className="rounded-md border p-3">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                  <div className="flex min-w-0 flex-1 gap-3">
                                    <Checkbox
                                      checked={selectedIds.has(script.id)}
                                      disabled={disabled}
                                      onCheckedChange={(checked) => toggleSelected(script.id, checked === true)}
                                      aria-label={`Import ${script.name}`}
                                    />
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-medium">{script.name}</p>
                                        <Badge variant={getConfidenceVariant(script.confidence)}>{script.confidence}</Badge>
                                        {script.duplicate && <Badge variant="secondary">Already in banner</Badge>}
                                      </div>
                                      <p className="mt-1 break-all text-xs text-muted-foreground">{getSnippet(script) || 'No script preview available'}</p>
                                      {(script.importWarning || script.duplicateReason) && (() => {
                                        // Duplicates and explicit warnings get the amber treatment.
                                        // 'info'-tagged notes (e.g. "Loaded by GTM-XXX, only import if
                                        // replacing GTM") get a softer blue style so they don't read
                                        // like errors.
                                        const isInfo = !script.duplicateReason && script.importNoteType === 'info'
                                        const colorClass = isInfo ? 'text-blue-700' : 'text-amber-700'
                                        const Icon = isInfo ? Info : AlertTriangle
                                        return (
                                          <p className={`mt-2 flex gap-1 text-xs ${colorClass}`}>
                                            <Icon className="h-3.5 w-3.5 shrink-0" />
                                            <span>{script.duplicateReason || script.importWarning}</span>
                                          </p>
                                        )
                                      })()}
                                    </div>
                                  </div>
                                  <div className="w-full md:w-56">
                                    <Label className="mb-1 block text-xs text-muted-foreground">Category</Label>
                                    <Select
                                      value={script.category}
                                      onValueChange={(value) => updateCandidateCategory(script.id, value as TrackingScript['category'])}
                                      disabled={disabled}
                                    >
                                      <SelectTrigger className="h-9">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                                          <SelectItem key={value} value={value}>{label}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={importSelected} disabled={selectedIds.size === 0}>
                      <Check className="mr-2 h-4 w-4" />
                      Import selected scripts
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setResult(null)
                        setCandidates([])
                        setSelectedIds(new Set())
                        setImportSummary(null)
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Ignore scan
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
