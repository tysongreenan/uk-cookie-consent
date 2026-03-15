'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Download, RefreshCw, AlertTriangle, X, Check, ChevronDown } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { BannerConfig } from '@/types'
import {
  generateBannerHTML,
  generateBannerCSS,
  generateBannerJS,
  generateConsentInitScript,
  generateConsentInitScript as generateConsentInitScriptUtil
} from '@/lib/banner-generator'
import { GENERATOR_VERSION, getLatestUpdate } from '@/lib/banner-version'

interface CodeGeneratorProps {
  config: BannerConfig
  bannerId?: string
  updatedAt?: string | Date
  planTier?: string
}

export function CodeGenerator({ config, bannerId, updatedAt, planTier }: CodeGeneratorProps) {
  const showBranding = !planTier || planTier === 'free'
  const [activeTab, setActiveTab] = useState<'head' | 'body' | 'hosted'>(bannerId ? 'hosted' : 'head')
  const [codeVersion, setCodeVersion] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showUpdateNotice, setShowUpdateNotice] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showManualCode, setShowManualCode] = useState(false)
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

  const regenerateCode = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setCodeVersion(prev => prev + 1)
    setIsGenerating(false)
    dismissUpdateNotice()
    toast.success('Code regenerated successfully!')
  }

  const generateHeadCode = () => {
    const materialFontUrl = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cookie,cookie_off&display=swap'

    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 Cookie Consent Banner - HEAD CODE (cookie-banner.ca)      🍁 -->
<!-- 🍁 Place this code in your <head> section                    🍁 -->
<!-- 🍁 IMPORTANT: Consent script MUST be first to block trackers 🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->

${generateConsentInitScriptUtil()}

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" as="style" href="${materialFontUrl}" />
<link rel="stylesheet" href="${materialFontUrl}" media="print" onload="this.media='all'" />
<noscript><link rel="stylesheet" href="${materialFontUrl}" /></noscript>
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

  const generateHostedScript = () => {
    if (!bannerId) return ''
    const scriptUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cookie-banner.ca'}/api/v1/banner.js?id=${bannerId}`

    return `<script src="${scriptUrl}" async></script>`
  }

  const getCode = () => {
    switch (activeTab) {
      case 'head': return generateHeadCode()
      case 'body': return generateBodyCode()
      case 'hosted': return generateHostedScript()
      default: return generateHeadCode()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCode())
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const downloadCode = () => {
    const code = getCode()
    const filename = `cookie-banner-${activeTab}.html`
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

  // Hosted script view (recommended, shown by default for saved banners)
  if (activeTab === 'hosted' && bannerId) {
    return (
      <div className="space-y-4">
        {/* Update notice */}
        {showUpdateNotice && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg relative">
            <button onClick={dismissUpdateNotice} className="absolute top-3 right-3 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300" aria-label="Dismiss">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3 pr-6">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">Banner update available: {latestUpdate.title}</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Hosted script users get updates automatically. No action needed.</p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">One line of code. That's it.</p>
          <p className="text-sm text-green-800 dark:text-green-300">Copy the script tag below and paste it in your website's <code className="bg-green-100 dark:bg-green-900/50 px-1 rounded">&lt;head&gt;</code> section. Your banner will appear automatically and stay up to date.</p>
        </div>

        {/* Code block */}
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-3 border-b bg-muted/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Paste this in your &lt;head&gt; section</span>
              </div>
              <span className="text-[10px] bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold px-1.5 py-0.5 rounded-full">RECOMMENDED</span>
            </div>
            <pre className="p-4 text-sm overflow-x-auto bg-muted/50">
              <code>{getCode()}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Big copy button */}
        <Button onClick={copyToClipboard} className="w-full h-11" size="default">
          {copied ? (
            <><Check className="mr-2 h-4 w-4" /> Copied!</>
          ) : (
            <><Copy className="mr-2 h-4 w-4" /> Copy Script Tag</>
          )}
        </Button>

        {/* Explanation */}
        <p className="text-xs text-muted-foreground text-center">
          This script loads your cookie banner from our servers. When you update your banner in the builder and save, the changes go live automatically — no code changes needed on your website.
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
              <Button
                onClick={async () => {
                  const code = manualTab === 'head' ? generateHeadCode() : generateBodyCode()
                  await navigator.clipboard.writeText(code)
                  toast.success(`${manualTab === 'head' ? 'Head' : 'Body'} code copied!`)
                }}
                size="sm"
                variant="outline"
                className="mt-2"
              >
                <Copy className="mr-2 h-3.5 w-3.5" />
                Copy {manualTab === 'head' ? 'Head' : 'Body'} Code
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Head/Body code view (manual installation or no bannerId)
  return (
    <div className="space-y-4">
      {/* Update notification for copy-paste users */}
      {showUpdateNotice && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-lg relative">
          <button onClick={dismissUpdateNotice} className="absolute top-3 right-3 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300" aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">Banner update available: {latestUpdate.title}</p>
              <ul className="text-sm text-amber-800 dark:text-amber-300 mt-1.5 space-y-0.5 list-disc ml-4">
                {latestUpdate.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mt-3">
                <Button onClick={regenerateCode} size="sm" variant="outline" className="border-amber-400 dark:border-amber-700 bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-900/70 text-amber-900 dark:text-amber-300" disabled={isGenerating}>
                  <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  Re-copy code to update
                </Button>
                {bannerId && (
                  <span className="text-xs text-amber-700 dark:text-amber-400">
                    Or switch to <button onClick={() => setActiveTab('hosted')} className="underline font-medium">Hosted Script</button> for automatic updates
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Manual Installation:</p>
        <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1 ml-4 list-decimal">
          <li><strong>Copy "Head Code"</strong> and paste it in your <code>&lt;head&gt;</code> section</li>
          <li><strong>Copy "Body Code"</strong> and paste it just before the closing <code>&lt;/body&gt;</code> tag</li>
          <li><strong>Save and refresh</strong> your website to see the banner</li>
        </ol>
        {bannerId && (
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-2">
            Want easier installation? <button onClick={() => setActiveTab('hosted')} className="underline font-medium">Switch to Hosted Script</button> — one line of code, automatic updates.
          </p>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'head', label: 'Head Code' },
          { id: 'body', label: 'Body Code' },
          ...(bannerId ? [{ id: 'hosted', label: 'Hosted Script' }] : [])
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'head' | 'body' | 'hosted')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {tab.id === 'hosted' && <span className="ml-1.5 text-[10px] bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold px-1.5 py-0.5 rounded-full">RECOMMENDED</span>}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button onClick={copyToClipboard} size="sm" className="flex-[2]">
          {copied ? <><Check className="mr-2 h-4 w-4" /> Copied!</> : <><Copy className="mr-2 h-4 w-4" /> Copy Code</>}
        </Button>
        <Button onClick={regenerateCode} variant="outline" size="sm" disabled={isGenerating} className="flex-1">
          <RefreshCw className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </Button>
        <Button onClick={downloadCode} variant="outline" size="sm" className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Code Display */}
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-3 border-b bg-muted/30">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">
                {activeTab === 'head' ? 'Paste this code in your <head> section' :
                 activeTab === 'body' ? 'Paste this code before closing </body> tag' :
                 'Paste this single line in your <head> section'}
              </span>
            </div>
          </div>
          <pre className="p-4 text-sm overflow-x-auto bg-muted/50 max-h-96">
            <code>{getCode()}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
