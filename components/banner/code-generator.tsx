'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Download, AlertTriangle, X, Check, ChevronDown, Loader2, Save } from 'lucide-react'
import { PlatformInstructions } from '@/components/banner/platform-instructions'
import { toast } from 'react-hot-toast'
import { BannerConfig } from '@/types'
import {
  generateBannerHTML,
  generateBannerCSS,
  generateBannerJS,
  generateConsentInitScript
} from '@/lib/banner-generator'
import { GENERATOR_VERSION, getLatestUpdate } from '@/lib/banner-version'

interface CodeGeneratorProps {
  config: BannerConfig
  bannerId?: string
  planTier?: string
  detectedCmpVendor?: string
  /** Called when the user clicks "Save & get my script" on an unsaved banner */
  onRequestSave?: () => void
  isSaving?: boolean
}

// The hosted one-line script is ALWAYS the primary thing on this tab — even
// before the banner is saved (when no ID exists yet, it renders as a locked
// placeholder with a save button). Showing manual Head/Body code first for
// unsaved banners made "I get this code part" users copy the wrong thing and
// miss the one-liner entirely. Manual installation lives in the Advanced
// collapsible in both states.
export function CodeGenerator({ config, bannerId, planTier, detectedCmpVendor, onRequestSave, isSaving }: CodeGeneratorProps) {
  const showBranding = !planTier || planTier === 'free'
  const [showUpdateNotice, setShowUpdateNotice] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showManualCode, setShowManualCode] = useState(false)
  const [showSwitchChecklist, setShowSwitchChecklist] = useState(true)
  const [manualTab, setManualTab] = useState<'head' | 'body'>('head')

  useEffect(() => {
    const dismissedVersion = localStorage.getItem('banner_update_dismissed_version')
    if (!dismissedVersion || parseInt(dismissedVersion) < GENERATOR_VERSION) {
      setShowUpdateNotice(true)
    }
  }, [])

  const dismissUpdateNotice = () => {
    localStorage.setItem('banner_update_dismissed_version', String(GENERATOR_VERSION))
    setShowUpdateNotice(false)
  }

  const generateHeadCode = () => {
    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 Cookie Consent Banner - HEAD CODE (cookie-banner.ca)      🍁 -->
<!-- 🍁 Place this code in your <head> section                    🍁 -->
<!-- 🍁 IMPORTANT: Consent script MUST be first to block trackers 🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->

${generateConsentInitScript()}

<style>
${generateBannerCSS(config)}
</style>

<script>
${generateBannerJS(config)}
</script>
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 End HEAD CODE - Powered by cookie-banner.ca               🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->`
  }

  const generateBodyCode = () => {
    const bodyScripts: string[] = []
    const allScriptCategories = [
      ...config.scripts.strictlyNecessary,
      ...config.scripts.functionality,
      ...config.scripts.trackingPerformance,
      ...config.scripts.targetingAdvertising
    ]
    allScriptCategories.forEach((script) => {
      if (script.bodyCode && script.bodyCode.trim()) {
        bodyScripts.push(`\n<!-- ${script.name} (Body Code) -->\n${script.bodyCode.trim()}`)
      }
    })
    const bodyScriptsHTML = bodyScripts.length > 0 ? '\n\n' + bodyScripts.join('\n') : ''

    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 Cookie Consent Banner - BODY CODE (cookie-banner.ca)      🍁 -->
<!-- 🍁 Place this code just before closing </body> tag          🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->${bodyScriptsHTML}

${generateBannerHTML(config, { showBranding })}
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 End BODY CODE - Powered by cookie-banner.ca               🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->`
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cookie-banner.ca'
  const hostedScript = (id: string) =>
    `<script src="${baseUrl}/api/v1/banner.js?id=${id}" async></script>
<noscript><a href="https://cookie-banner.ca/?ref=banner" rel="noopener" style="font-size:10px;color:rgba(128,128,128,0.5);text-decoration:none;">Cookie consent by cookie-banner.ca</a></noscript>`

  const copyHostedScript = async () => {
    if (!bannerId) return
    try {
      await navigator.clipboard.writeText(hostedScript(bannerId))
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const downloadManualCode = () => {
    const code = manualTab === 'head' ? generateHeadCode() : generateBodyCode()
    const filename = `cookie-banner-${manualTab}.html`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`Downloaded ${filename}`)
  }

  const latestUpdate = getLatestUpdate()

  return (
    <div className="space-y-4">
      {/* Update notice — only meaningful once a banner exists that could be
          installed somewhere; hidden while drafting a brand-new banner */}
      {showUpdateNotice && bannerId && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg relative">
          <button onClick={dismissUpdateNotice} className="absolute top-3 right-3 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300" aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">Banner update available: {latestUpdate.title}</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Hosted script users get updates automatically. No action needed. Manual copy-paste users: re-copy your code from the Advanced section below.</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
        <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">One line of code. That&apos;s it.</p>
        <p className="text-sm text-green-800 dark:text-green-300">
          {bannerId
            ? <>Copy the script tag below and paste it in your website&apos;s <code className="bg-green-100 dark:bg-green-900/50 px-1 rounded">&lt;head&gt;</code> section. Your banner will appear automatically and stay up to date.</>
            : <>Your banner gets a unique one-line script tag. Save the banner to generate it, then paste it in your website&apos;s <code className="bg-green-100 dark:bg-green-900/50 px-1 rounded">&lt;head&gt;</code> section.</>}
        </p>
      </div>

      {/* Hosted script — real when saved, locked placeholder when not */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${bannerId ? 'bg-green-500' : 'bg-muted-foreground/40'}`}></div>
              <span className="text-xs text-muted-foreground">
                {bannerId ? 'Paste this in your <head> section' : 'Your script — generated when you save'}
              </span>
            </div>
            <span className="text-[10px] bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold px-1.5 py-0.5 rounded-full">RECOMMENDED</span>
          </div>
          <pre className={`p-4 text-sm overflow-x-auto bg-muted/50 ${bannerId ? '' : 'select-none opacity-50'}`}>
            <code>{hostedScript(bannerId || 'YOUR-BANNER-ID')}</code>
          </pre>
        </CardContent>
      </Card>

      {/* Primary action */}
      {bannerId ? (
        <Button onClick={copyHostedScript} className="w-full h-11" size="default">
          {copied ? (
            <><Check className="mr-2 h-4 w-4" /> Copied!</>
          ) : (
            <><Copy className="mr-2 h-4 w-4" /> Copy Script Tag</>
          )}
        </Button>
      ) : (
        <Button onClick={onRequestSave} disabled={isSaving || !onRequestSave} className="w-full h-11" size="default">
          {isSaving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Save banner &amp; get my script</>
          )}
        </Button>
      )}

      {/* Platform-specific instructions */}
      <PlatformInstructions />

      {/* What's Next? */}
      <div className="p-4 bg-muted/50 border rounded-lg">
        <p className="text-sm font-semibold mb-3">What&apos;s Next?</p>
        <ol className="text-sm text-muted-foreground space-y-2 ml-4 list-decimal">
          {!bannerId && <li>Save your banner to generate its unique script tag</li>}
          <li>Paste the one-line script on your website using the instructions above</li>
          <li>Visit your site to verify the banner appears</li>
          <li>Come back here anytime to customize — changes go live automatically</li>
        </ol>
      </div>

      <div className="border rounded-lg bg-background">
        <button
          type="button"
          onClick={() => setShowSwitchChecklist(!showSwitchChecklist)}
          className="flex w-full items-center gap-2 p-4 text-left text-sm font-semibold"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${showSwitchChecklist ? 'rotate-180' : ''}`} />
          Switch from your old banner
        </button>
        {showSwitchChecklist && (
          <div className="space-y-3 border-t p-4">
            {detectedCmpVendor && detectedCmpVendor !== 'UK Cookie Consent' && (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                We detected {detectedCmpVendor}. Disable that script or plugin before publishing this one.
              </div>
            )}
            {detectedCmpVendor === 'UK Cookie Consent' && (
              <div className="rounded-md border bg-muted/50 p-3 text-sm text-muted-foreground">
                This site already appears to use cookie-banner.ca. Use this code if you are replacing the installed banner ID.
              </div>
            )}
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal ml-4">
              <li>Remove or disable the old CMP script/plugin.</li>
              <li>Remove duplicate manual tracker snippets from your site if those scripts were imported into this banner.</li>
              <li>Paste the cookie-banner.ca hosted script in your <code className="bg-muted px-1 rounded">&lt;head&gt;</code>.</li>
              <li>Clear your site, CDN, and page-builder cache.</li>
              <li>Open a private browser window and verify the banner appears.</li>
              <li>Run the cookie scanner again to confirm only cookie-banner.ca is detected.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Explanation */}
      <p className="text-xs text-muted-foreground text-center">
        This script loads your cookie banner from our global edge network. When you update your banner in the builder and push live, the changes roll out automatically within about 5 minutes — no code changes needed on your website.
      </p>

      {/* Collapsible manual code section */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowManualCode(!showManualCode)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${showManualCode ? 'rotate-180' : ''}`} />
          Advanced: Manual Installation (Head + Body Code)
        </button>
        {showManualCode && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-muted-foreground">
              Only use this method if you cannot add external scripts to your site. You will need to re-copy both code blocks whenever you make changes.
            </p>
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setManualTab('head')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  manualTab === 'head' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Head Code
              </button>
              <button
                onClick={() => setManualTab('body')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  manualTab === 'body' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Body Code
              </button>
            </div>
            <Card className="mt-3">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-3 border-b bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">
                      {manualTab === 'head' ? 'Paste this in your <head> section' : 'Paste this before closing </body> tag'}
                    </span>
                  </div>
                </div>
                <pre className="p-4 text-sm overflow-x-auto bg-muted/50 max-h-72">
                  <code>{manualTab === 'head' ? generateHeadCode() : generateBodyCode()}</code>
                </pre>
              </CardContent>
            </Card>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  try {
                    const code = manualTab === 'head' ? generateHeadCode() : generateBodyCode()
                    await navigator.clipboard.writeText(code)
                    toast.success(`${manualTab === 'head' ? 'Head' : 'Body'} code copied!`)
                  } catch {
                    toast.error('Failed to copy code')
                  }
                }}
                size="sm"
                variant="outline"
              >
                <Copy className="mr-2 h-3.5 w-3.5" />
                Copy {manualTab === 'head' ? 'Head' : 'Body'} Code
              </Button>
              <Button onClick={downloadManualCode} size="sm" variant="outline">
                <Download className="mr-2 h-3.5 w-3.5" />
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
