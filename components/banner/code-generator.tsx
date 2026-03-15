'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Download, RefreshCw, Globe, AlertTriangle, X } from 'lucide-react'
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
  updatedAt?: string | Date // Not used for URL, but kept for potential future use
  planTier?: string
}

export function CodeGenerator({ config, bannerId, updatedAt, planTier }: CodeGeneratorProps) {
  const showBranding = !planTier || planTier === 'free'
  const [activeTab, setActiveTab] = useState<'head' | 'body' | 'hosted'>('head')
  const [codeVersion, setCodeVersion] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showUpdateNotice, setShowUpdateNotice] = useState(false)

  // Check if user has dismissed the current version's update notice
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
    // Collect all body scripts (e.g., GTM noscript code) from ALL categories
    const bodyScripts: string[] = []
    
    // Check all script categories for body code
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
    
    // Static URL - no version parameter needed!
    // The server uses ETag headers based on updatedAt timestamp
    // Browsers automatically re-fetch when the banner is updated
    const scriptUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cookie-banner.ca'}/api/v1/banner.js?id=${bannerId}`
    
    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 Cookie Consent Banner - HOSTED SCRIPT (cookie-banner.ca)  🍁 -->
<!-- 🍁 Place this code in your <head> section                    🍁 -->
<!-- 🍁 IMPORTANT: Place as high as possible to block trackers    🍁 -->
<!-- 🍁 Updates automatically - no need to change this code!       🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->

<script src="${scriptUrl}" async></script>

<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
<!-- 🍁 End HOSTED SCRIPT - Powered by cookie-banner.ca           🍁 -->
<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->`
  }

  const getCode = () => {
    switch (activeTab) {
      case 'head':
        return generateHeadCode()
      case 'body':
        return generateBodyCode()
      case 'hosted':
        return generateHostedScript()
      default:
        return generateHeadCode()
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCode())
      toast.success('Code copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  const downloadCode = () => {
    const code = getCode()
    const ext = 'html'
    const filename = `cookie-banner-${activeTab}.${ext}`
    
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
      {/* Update notification for copy-paste users */}
      {showUpdateNotice && activeTab !== 'hosted' && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg relative">
          <button
            onClick={dismissUpdateNotice}
            className="absolute top-3 right-3 text-amber-600 hover:text-amber-800"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3 pr-6">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Banner update available: {latestUpdate.title}
              </p>
              <ul className="text-sm text-amber-800 mt-1.5 space-y-0.5 list-disc ml-4">
                {latestUpdate.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
              <div className="flex items-center gap-3 mt-3">
                <Button
                  onClick={regenerateCode}
                  size="sm"
                  variant="outline"
                  className="border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900"
                  disabled={isGenerating}
                >
                  <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  Re-copy code to update
                </Button>
                {bannerId && (
                  <span className="text-xs text-amber-700">
                    Or switch to <button onClick={() => setActiveTab('hosted')} className="underline font-medium">Hosted Script</button> for automatic updates
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions at the top */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-medium text-blue-900 mb-2">📋 Installation Instructions:</p>
        {activeTab === 'hosted' ? (
          <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
            <li><strong>Copy the code below</strong> and paste it in your <code>&lt;head&gt;</code> section</li>
            <li><strong>That's it!</strong> The banner will automatically update when you save changes here.</li>
          </ol>
        ) : (
          <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
            <li><strong>Copy "Head Code"</strong> and paste it in your <code>&lt;head&gt;</code> section</li>
            <li><strong>Copy "Body Code"</strong> and paste it just before the closing <code>&lt;/body&gt;</code> tag</li>
            <li><strong>Save and refresh</strong> your website to see the banner</li>
          </ol>
        )}
        <p className="text-xs text-blue-700 mt-2">
          {activeTab === 'hosted' 
            ? '💡 This is the easiest way to install. Updates are automatic.' 
            : '💡 Use the tabs below to switch between Head Code and Body Code. Both are required for the banner to work!'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button onClick={copyToClipboard} size="sm" className="flex-1">
          <Copy className="mr-2 h-4 w-4" />
          Copy Code
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

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
        {[
          { id: 'head', label: 'Head Code', icon: '📄' },
          { id: 'body', label: 'Body Code', icon: '📋' },
          ...(bannerId ? [{ id: 'hosted', label: 'Hosted Script (Easy)', icon: '🌐' }] : [])
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
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
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
