'use client'

import React, { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Loader2,
  Check,
  Shield,
  Zap,
  Activity,
  AlertTriangle,
  Download,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
} from 'lucide-react'
import Link from 'next/link'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CookieData {
  name: string
  domain: string
  purpose: string
  category: 'necessary' | 'analytics' | 'marketing' | 'functional'
  expires: string
  secure: boolean
  httpOnly: boolean
  sameSite: string
  thirdParty: boolean
}

interface ComplianceResult {
  score: number
  grade: string
  issues: string[]
}

interface ScanResult {
  url: string
  cookies: CookieData[]
  overallGrade: string
  overallScore: number
  compliance: {
    gdpr: ComplianceResult
    pipeda: ComplianceResult
    ccpa: ComplianceResult
    law25: ComplianceResult
  }
  recommendations: { text: string; regulation: string }[]
  timestamp: string
}

type ScanStep = {
  label: string
  description: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SCAN_STEPS: ScanStep[] = [
  { label: 'Loading page', description: 'Rendering your website in a real browser' },
  { label: 'Detecting cookies', description: 'Scanning HTTP headers, JavaScript, and third-party scripts' },
  { label: 'Analyzing compliance', description: 'Checking against GDPR, CCPA, PIPEDA & Law 25' },
  { label: 'Generating report', description: 'Compiling results and recommendations' },
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string; ring: string; chart: string }> = {
  necessary: { bg: 'bg-teal-50', text: 'text-teal-700', ring: 'ring-teal-200', chart: '#0E768C' },
  analytics: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200', chart: '#6a9bcc' },
  marketing: { bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-200', chart: '#E8553A' },
  functional: { bg: 'bg-green-50', text: 'text-green-700', ring: 'ring-green-200', chart: '#788c5d' },
}

const GRADE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  A: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  B: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  C: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  D: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  F: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
}

const EXAMPLE_URLS = ['shopify.com', 'wordpress.org', 'stripe.com']

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 65) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

function normalizeUrl(input: string): string {
  let cleaned = input.trim().toLowerCase()
  // Strip leading protocol if present
  cleaned = cleaned.replace(/^https?:\/\//, '')
  // Strip leading www.
  cleaned = cleaned.replace(/^www\./, '')
  // Remove trailing slashes
  cleaned = cleaned.replace(/\/+$/, '')
  // Remove any path/query — we only need the domain for scanning
  cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0]
  return cleaned
}

function validateUrl(inputUrl: string): boolean {
  const domain = normalizeUrl(inputUrl)
  // Must have at least one dot and a TLD of 2+ chars
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/.test(domain)) {
    return false
  }
  return true
}

// Calls the real backend scanner. The endpoint loads the page in a headless
// browser, observes the cookies and tracking scripts that actually fire, and
// returns per-regulation compliance scores. Falls back to a static HTML scan
// server-side when a full browser scan is unavailable.
async function performScan(targetUrl: string): Promise<ScanResult> {
  const domain = new URL(targetUrl).hostname

  const response = await fetch('/api/tools/cookie-scanner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: domain }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data?.error || 'Scan failed. Please try again.')
  }

  const cookies: CookieData[] = (data.cookies ?? []).map((c: any) => ({
    name: c.name,
    domain: c.domain,
    purpose: c.purpose,
    category: c.category,
    expires: c.expires,
    secure: c.secure,
    httpOnly: c.httpOnly,
    sameSite: c.sameSite,
    thirdParty: c.thirdParty,
  }))

  return {
    url: targetUrl,
    cookies,
    overallGrade: data.overallGrade,
    overallScore: data.overallScore,
    compliance: data.compliance,
    recommendations: data.recommendations ?? [],
    timestamp: data.fetchedAt ?? new Date().toISOString(),
  }
}

// ─── SVG Donut Chart ─────────────────────────────────────────────────────────

const DonutChart = React.memo(function DonutChart({ cookies }: { cookies: CookieData[] }) {
  const categories = ['necessary', 'analytics', 'marketing', 'functional'] as const
  const counts = categories.map(cat => cookies.filter(c => c.category === cat).length)
  const total = cookies.length
  const radius = 70
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 200" className="w-48 h-48" role="img" aria-label="Cookie category breakdown chart">
        {categories.map((cat, i) => {
          const pct = total > 0 ? counts[i] / total : 0
          const strokeLen = pct * circumference
          const currentOffset = offset
          offset += strokeLen
          if (counts[i] === 0) return null
          return (
            <circle
              key={cat}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={CATEGORY_COLORS[cat].chart}
              strokeWidth="24"
              strokeDasharray={`${strokeLen} ${circumference - strokeLen}`}
              strokeDashoffset={-currentOffset}
              transform="rotate(-90 100 100)"
              className="transition-all duration-700"
            />
          )
        })}
        <text x="100" y="92" textAnchor="middle" className="fill-foreground text-3xl font-bold" style={{ fontSize: '36px', fontWeight: 700 }}>
          {total}
        </text>
        <text x="100" y="115" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '13px' }}>
          cookies
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {categories.map((cat, i) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat].chart }} />
            <span className="capitalize text-muted-foreground">{cat}</span>
            <span className="font-semibold text-foreground">{counts[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

// ─── Circular Score Gauge ────────────────────────────────────────────────────

function ScoreGauge({ score, size = 64 }: { score: number; size?: number }) {
  const grade = getGrade(score)
  const colors = GRADE_COLORS[grade]
  const r = (size - 8) / 2
  const circumference = 2 * Math.PI * r
  const filled = (score / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={`transition-all duration-1000 ${score >= 80 ? 'stroke-emerald-600' : score >= 65 ? 'stroke-amber-600' : score >= 50 ? 'stroke-orange-600' : 'stroke-red-600'}`}
          strokeWidth="5"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${colors.text}`}>{score}</span>
      </div>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function CookieScanner() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [expandedCookie, setExpandedCookie] = useState<number | null>(null)
  const [expandedRegulation, setExpandedRegulation] = useState<string | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleScan = async (inputUrl?: string) => {
    const rawUrl = inputUrl || url
    if (!rawUrl.trim()) {
      setError('Please enter a website URL')
      return
    }

    const domain = normalizeUrl(rawUrl)
    if (!validateUrl(rawUrl)) {
      setError('Enter a valid domain (e.g., example.com)')
      return
    }

    // Show the clean domain in the input
    setUrl(domain)
    setIsScanning(true)
    setError('')
    setResult(null)
    setCurrentStep(0)
    setActiveFilter('all')
    setExpandedCookie(null)
    setExpandedRegulation(null)

    // Step progression
    const stepTimers = [2000, 3000, 3000]
    for (let i = 0; i < stepTimers.length; i++) {
      await new Promise(r => setTimeout(r, stepTimers[i]))
      setCurrentStep(i + 1)
    }

    try {
      const targetUrl = `https://${domain}`
      const scanResult = await performScan(targetUrl)
      setResult(scanResult)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    } catch {
      setError('Failed to scan website. Please try again.')
    } finally {
      setIsScanning(false)
      setCurrentStep(-1)
    }
  }

  const filteredCookies = useMemo(
    () => result?.cookies.filter(c => activeFilter === 'all' || c.category === activeFilter) ?? [],
    [result, activeFilter]
  )

  return (
    <div className="w-full">
      {/* ── Scanner Input ── */}
      <div className={`transition-all duration-500 ${result ? 'pb-6' : ''}`}>
        <div className="bg-card border-2 border-border rounded-xl p-2 shadow-lg">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center flex-1 gap-2 px-3">
              <span className="text-muted-foreground text-sm font-mono hidden sm:inline select-none">https://</span>
              <input
                type="text"
                aria-label="Website URL"
                placeholder="example.com"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError('') }}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                disabled={isScanning}
                className="flex-1 text-lg h-14 bg-transparent border-0 outline-none placeholder:text-muted-foreground/50 font-sans disabled:opacity-60"
              />
            </div>
            <Button
              onClick={() => handleScan()}
              disabled={isScanning || !url.trim()}
              size="lg"
              className="h-12 px-8 rounded-lg text-base font-semibold shrink-0"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  Scan Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-3 text-sm text-red-600"
          >
            <AlertTriangle className="h-4 w-4" />
            {error}
          </motion.div>
        )}
      </div>

      {/* ── Scanning Progress ── */}
      <AnimatePresence mode="wait">
        {isScanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 overflow-hidden"
          >
            <div className="space-y-1">
              {SCAN_STEPS.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-4 py-3"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      i < currentStep
                        ? 'bg-primary text-primary-foreground'
                        : i === currentStep
                        ? 'bg-primary/10 text-primary ring-2 ring-primary/40 animate-pulse'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {i < currentStep ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${i <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden" role="progressbar" aria-label="Scan progress" aria-valuemin={0} aria-valuemax={100}>
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 10, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trust Signals & Examples (only when no results and not scanning) ── */}
      {!result && !isScanning && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5" /> 47,000+ scans run
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" /> 4 privacy laws checked
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Results in &lt;30s
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Try it:</span>
            {EXAMPLE_URLS.map((example) => (
              <button
                key={example}
                onClick={() => handleScan(example)}
                className="font-mono px-2 py-1 rounded border border-border hover:bg-accent transition-colors cursor-pointer"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Results ── */}
      {result && (
        <motion.div
          ref={resultsRef}
          initial="hidden"
          animate="visible"
          className="mt-2"
        >
          {/* Overall Grade */}
          <motion.div variants={fadeUp} custom={0} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-8 border-b border-border">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 ${GRADE_COLORS[result.overallGrade].bg} ${GRADE_COLORS[result.overallGrade].text} ${GRADE_COLORS[result.overallGrade].border}`}
            >
              <span className="text-5xl font-heading font-bold leading-none">{result.overallGrade}</span>
              <span className="text-[10px] font-mono uppercase tracking-wider mt-1 opacity-70">Overall</span>
            </motion.div>
            <div>
              <p className="text-sm font-mono text-muted-foreground truncate max-w-md">{result.url}</p>
              <p className="text-lg font-semibold text-foreground mt-1">
                {result.cookies.length} cookies found — {result.cookies.filter(c => c.category !== 'necessary').length} require consent
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Scanned on {new Date(result.timestamp).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })} at{' '}
                {new Date(result.timestamp).toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs font-mono">
                  {result.cookies.filter(c => !c.thirdParty).length} first-party
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs font-mono">
                  {result.cookies.filter(c => c.thirdParty).length} third-party
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs font-mono">
                  {result.cookies.filter(c => c.category !== 'necessary').length} non-essential
                </span>
              </div>
            </div>
          </motion.div>

          {/* Cookie Category Breakdown */}
          <motion.div variants={fadeUp} custom={1} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-border">
            <DonutChart cookies={result.cookies} />
            <div className="space-y-3">
              {(['necessary', 'analytics', 'marketing', 'functional'] as const).map((cat) => {
                const count = result.cookies.filter(c => c.category === cat).length
                const colors = CATEGORY_COLORS[cat]
                return (
                  <div key={cat} className={`flex items-center gap-3 p-3 rounded-lg border border-border ${count === 0 ? 'opacity-40' : ''}`}>
                    <div className="w-1 h-10 rounded-full" style={{ backgroundColor: colors.chart }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold capitalize">{cat}</span>
                        <span className="text-lg font-bold">{count}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {cat === 'necessary' && 'Required for basic site functionality'}
                        {cat === 'analytics' && 'Used to measure traffic and usage'}
                        {cat === 'marketing' && 'Used for ad targeting and retargeting'}
                        {cat === 'functional' && 'Enhances user experience and preferences'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Compliance Scores */}
          <motion.div variants={fadeUp} custom={2} className="py-8 border-b border-border">
            <h3 className="text-xl font-heading font-semibold mb-6">Compliance Analysis</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(Object.entries(result.compliance) as [string, ComplianceResult][]).map(([key, reg]) => {
                const label = key === 'law25' ? 'Law 25' : key.toUpperCase()
                const isExpanded = expandedRegulation === key
                return (
                  <div key={key} className="p-4 rounded-xl border border-border bg-card">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">{label}</p>
                    <div className="flex justify-center mb-3">
                      <ScoreGauge score={reg.score} />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">{reg.issues.length} issues found</p>
                    <button
                      onClick={() => setExpandedRegulation(isExpanded ? null : key)}
                      className="text-xs text-primary hover:underline mt-2 w-full text-center flex items-center justify-center gap-1"
                    >
                      {isExpanded ? 'Hide' : 'View'} details
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 space-y-2 overflow-hidden"
                        >
                          {reg.issues.map((issue, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />
                              {issue}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Cookie Detail Table */}
          <motion.div variants={fadeUp} custom={3} className="py-8 border-b border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-xl font-heading font-semibold">Cookie Details</h3>
              <div className="flex flex-wrap gap-1">
                {['all', 'necessary', 'analytics', 'marketing', 'functional'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                    className={`text-xs px-3 py-1.5 rounded-md capitalize transition-colors ${
                      activeFilter === filter
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {filter} {filter !== 'all' && `(${result.cookies.filter(c => c.category === filter).length})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-3 pr-4 font-medium text-muted-foreground">Cookie</th>
                    <th className="py-3 pr-4 font-medium text-muted-foreground">Domain</th>
                    <th className="py-3 pr-4 font-medium text-muted-foreground">Category</th>
                    <th className="py-3 pr-4 font-medium text-muted-foreground">Expires</th>
                    <th className="py-3 pr-4 font-medium text-muted-foreground">Secure</th>
                    <th className="py-3 font-medium text-muted-foreground">SameSite</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCookies.map((cookie, i) => (
                    <React.Fragment key={cookie.name}>
                      <tr
                        onClick={() => setExpandedCookie(expandedCookie === i ? null : i)}
                        className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && setExpandedCookie(expandedCookie === i ? null : i)}
                      >
                        <td className="py-3 pr-4 font-mono text-sm font-medium">{cookie.name}</td>
                        <td className="py-3 pr-4 font-mono text-sm text-muted-foreground">{cookie.domain}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORY_COLORS[cookie.category].bg} ${CATEGORY_COLORS[cookie.category].text}`}>
                            {cookie.category}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-sm">{cookie.expires}</td>
                        <td className="py-3 pr-4">
                          {cookie.secure ? (
                            <Lock className="h-4 w-4 text-emerald-600" aria-label="Secure" />
                          ) : (
                            <Unlock className="h-4 w-4 text-red-500" aria-label="Not secure" />
                          )}
                        </td>
                        <td className="py-3 font-mono text-xs">{cookie.sameSite}</td>
                      </tr>
                      <AnimatePresence>
                        {expandedCookie === i && (
                          <tr>
                            <td colSpan={6}>
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-muted/30 px-4 py-3 text-sm overflow-hidden"
                              >
                                <div className="grid grid-cols-3 gap-4">
                                  <div><strong className="text-muted-foreground">Purpose:</strong> {cookie.purpose}</div>
                                  <div><strong className="text-muted-foreground">HttpOnly:</strong> {cookie.httpOnly ? 'Yes' : 'No'}</div>
                                  <div><strong className="text-muted-foreground">Third-party:</strong> {cookie.thirdParty ? 'Yes' : 'No'}</div>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filteredCookies.map((cookie, i) => (
                <div
                  key={cookie.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setExpandedCookie(expandedCookie === i ? null : i)}
                  onKeyDown={(e) => e.key === 'Enter' && setExpandedCookie(expandedCookie === i ? null : i)}
                  className="p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-medium">{cookie.name}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${CATEGORY_COLORS[cookie.category].bg} ${CATEGORY_COLORS[cookie.category].text}`}>
                      {cookie.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{cookie.domain}</p>
                  <AnimatePresence>
                    {expandedCookie === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pt-2 border-t border-border/50 grid grid-cols-2 gap-2 text-xs overflow-hidden"
                      >
                        <div><strong className="text-muted-foreground">Purpose:</strong> {cookie.purpose}</div>
                        <div><strong className="text-muted-foreground">Expires:</strong> {cookie.expires}</div>
                        <div><strong className="text-muted-foreground">Secure:</strong> {cookie.secure ? 'Yes' : 'No'}</div>
                        <div><strong className="text-muted-foreground">SameSite:</strong> {cookie.sameSite}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={fadeUp} custom={4} className="py-8 border-b border-border">
            <h3 className="text-xl font-heading font-semibold mb-6">How to Fix These Issues</h3>
            <div className="space-y-0">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-4 py-4 border-b border-border/50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{rec.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">Applies to: {rec.regulation}</p>
                    {i === 0 && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-3">
                        <p className="text-sm text-foreground">
                          Cookie Banner can fix this automatically — starting free, or $99 one-time for Pro.{' '}
                          <Link href="/free-cookie-banner-generator" className="text-primary font-medium hover:underline">
                            Build your banner now
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Block */}
          <motion.div variants={fadeUp} custom={5} className="py-8">
            <div className="bg-foreground text-background rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-heading font-bold">
                Fix your compliance issues in 5 minutes
              </h3>
              <p className="text-base text-background/70 mt-2 max-w-xl">
                Our cookie banner generator creates a fully compliant consent banner based on your scan results. Free plan available — no credit card needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/free-cookie-banner-generator">
                  <Button className="bg-background text-foreground hover:bg-background/90 px-6 py-3 h-auto rounded-lg font-semibold">
                    Build Your Cookie Banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-background/30 text-background hover:bg-background/10 px-6 py-3 h-auto rounded-lg font-medium"
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
                    const downloadUrl = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = downloadUrl
                    a.download = `cookie-scan-${new Date().toISOString().slice(0, 10)}.json`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                    URL.revokeObjectURL(downloadUrl)
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Scan Another */}
          <div className="text-center pb-4">
            <button
              onClick={() => {
                setResult(null)
                setUrl('')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-sm text-primary hover:underline"
            >
              Scan another website
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
