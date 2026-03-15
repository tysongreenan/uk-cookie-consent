'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Eye, Code, Download, Plus, Trash2, Shield, Settings, BarChart3, Target, Palette, Type, Info, Loader2, Search, Upload, X, Image as ImageIcon, PanelTop, SlidersHorizontal, Pencil, Rocket } from 'lucide-react'
import Link from 'next/link'
import { BannerPreview } from '@/components/banner/banner-preview'
import { CodeGenerator } from '@/components/banner/code-generator'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'react-hot-toast'
import { BannerConfig, TrackingScript, ComplianceFramework, BrandDiscoveryResult, BrandLogoSuggestion, ConsentBanner } from '@/types'
import { applyTranslations } from '@/lib/translations'
import { scriptTemplates, getTemplatesByCategory } from '@/lib/script-templates'
import { migrateBannerConfig, needsMigration, getMigrationNotes } from '@/lib/banner-migration'
import { ComplianceSelector } from '@/components/banner/compliance-selector'
import { getBannerTemplate } from '@/lib/banner-templates'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'
import { canAccessFeature, getStandardLayouts, getProLayouts, canUseLayout } from '@/lib/plan-restrictions'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { ColorPicker } from '@/components/ui/color-picker'
import { Slider } from '@/components/ui/slider'
import { ContrastBadge } from '@/components/ui/contrast-badge'
import { COLOR_PRESETS } from '@/lib/color-presets'
import { FONT_PRESETS, getGoogleFontUrl } from '@/lib/font-presets'

// Helper function to generate inline footer link HTML
function generateInlineFooterLinkHTML(footerLink: any): string {
  const text = footerLink.text || 'Cookie Settings'
  const linkType = footerLink.inlineStyle?.linkType || 'plain'
  const includeIcon = footerLink.inlineStyle?.includeIcon || false
  const includeLogo = footerLink.inlineStyle?.includeLogo || false
  const customClass = footerLink.inlineStyle?.customClass || ''
  
  let html = ''
  
  switch (linkType) {
    case 'plain':
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}">${text}</a>`
      break
    case 'button':
      html = `<button onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-btn${customClass ? ' ' + customClass : ''}" style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">${text}</button>`
      break
    case 'icon-text':
      const icon = includeIcon ? '🍪 ' : ''
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}">${icon}${text}</a>`
      break
    case 'custom':
      const customIcon = includeIcon ? '🍪 ' : ''
      const customLogo = includeLogo ? '<img src="YOUR_LOGO_URL" alt="Logo" style="height: 16px; margin-right: 4px;" />' : ''
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link${customClass ? ' ' + customClass : ''}">${customLogo}${customIcon}${text}</a>`
      break
    default:
      html = `<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link">${text}</a>`
  }
  
  return html
}

// Helper functions for live preview
function generateFloatingButtonPreviewStyles(config: any): React.CSSProperties {
  const floatingStyle = config.branding?.footerLink?.floatingStyle || {}
  const shape = floatingStyle.shape || 'pill'
  const size = floatingStyle.size || 'small'
  const showText = floatingStyle.showText ?? true
  const useCustomColors = floatingStyle.useCustomColors || false
  const customColors = floatingStyle.customColors || {}
  
  // Size mapping
  const sizeMap = {
    small: { width: '40px', height: '40px', padding: '8px', fontSize: '12px' },
    medium: { width: '48px', height: '48px', padding: '12px', fontSize: '14px' },
    large: { width: '56px', height: '56px', padding: '16px', fontSize: '16px' }
  }
  
  const sizeConfig = sizeMap[size as keyof typeof sizeMap] || sizeMap.small
  
  // Shape-based styles
  let borderRadius = '4px'
  if (shape === 'circle') {
    borderRadius = '50%'
  } else if (shape === 'pill') {
    borderRadius = '20px'
  }
  
  // Colors
  const backgroundColor = useCustomColors && customColors.background 
    ? customColors.background 
    : config.branding?.primaryColor || '#3b82f6'
  const textColor = useCustomColors && customColors.text 
    ? customColors.text 
    : '#ffffff'
  const borderColor = useCustomColors && customColors.border 
    ? customColors.border 
    : backgroundColor
  
  return {
    backgroundColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    borderRadius,
    padding: showText ? sizeConfig.padding : '8px',
    width: showText ? 'auto' : sizeConfig.width,
    height: showText ? 'auto' : sizeConfig.height,
    minWidth: showText ? 'auto' : sizeConfig.width,
    minHeight: showText ? 'auto' : sizeConfig.height,
    fontSize: sizeConfig.fontSize,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    gap: '6px'
  }
}

function generateFloatingButtonPreviewContent(config: any): React.ReactNode {
  const floatingStyle = config.branding?.footerLink?.floatingStyle || {}
  const shape = floatingStyle.shape || 'pill'
  const showText = floatingStyle.showText ?? true
  const text = config.branding?.footerLink?.text || 'Cookie Settings'
  const hasLogo = config.branding?.logo?.enabled && config.branding?.logo?.url

  // Check consent state for icon
  const consentState = typeof window !== 'undefined'
    ? localStorage.getItem('cookie-consent-preview-state') || 'accepted'
    : 'accepted'

  const hasAcceptedNonEssential = consentState === 'accepted'

  // Cookie icons (matching the code generator)
  const cookieAcceptedIcon = (
    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25-17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/>
    </svg>
  )

  const cookieRejectedIcon = (
    <svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
      <path d="m815-260-58-58q18-31 29-66.5t14-73.5q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-49-2-90 10t-76 33l-57-57q61-42 137.5-58.5T563-872q-9 45 6 84.5t45 66.5q30 27 71 37t86-5q-31 69 11 118t96 51q8 72-9.5 138T815-260ZM340-360q-25 0-42.5-17.5T280-420q0-25-17.5-42.5T340-480q25 0 42.5 17.5T400-420q0 25-17.5 42.5T340-360ZM819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM480-160q45 0 85.5-12t76.5-33L205-642q-21 36-33 76.5T160-480q0 133 93.5 226.5T480-160Zm-56-264Zm135-137Z"/>
    </svg>
  )

  const cookieIcon = (
    <span id="cookie-icon">
      {hasAcceptedNonEssential ? cookieAcceptedIcon : cookieRejectedIcon}
    </span>
  )

  if (shape === 'circle') {
    // Circle always shows only cookie icon (not logo) for dynamic state changes
    return cookieIcon
  }

  // Pill and square: show logo when available and text is enabled
  if (showText && hasLogo) {
    return (
      <>
        <img
          src={config.branding.logo.url}
          alt="Logo"
          style={{ width: '16px', height: '16px', objectFit: 'contain' }}
        />
        <span>{text}</span>
      </>
    )
  }

  if (showText) {
    return (
      <>
        {cookieIcon}
        <span>{text}</span>
      </>
    )
  }

  // No text - show only icon
  return cookieIcon
}

const defaultConfig: BannerConfig = {
  version: '2.1.0',
  lastUpdated: new Date().toISOString(),
  compliance: {
    framework: 'pipeda',
    requiresExplicitConsent: false,
    requiresOptIn: false,
    requiresGranularConsent: false,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false,
    maxPenalty: 'Reputation damage and Privacy Commissioner findings',
    consentExpiry: 24,
  },
  integrations: {
    googleAnalytics: {
      enabled: false,
      measurementId: '',
      trackConsentEvents: true,
      trackImpressions: true,
      anonymizeIp: true
    }
  },
  name: 'My Cookie Banner',
  position: 'bottom',
  theme: 'dark',
  language: 'auto',
  colors: {
    background: '#1f2937',
    text: '#ffffff',
    button: '#3b82f6',
    buttonText: '#ffffff',
    link: '#60a5fa'
  },
  text: {
    title: 'We use cookies',
    message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
    acceptButton: 'Accept All',
    rejectButton: 'Reject',
    preferencesButton: 'Preferences'
  },
  behavior: {
    autoShow: true,
    dismissOnScroll: false,
    showPreferences: true,
    cookieExpiry: 182,
    buttonLayout: 'standard',
    showRejectButton: true
  },
  branding: {
    logo: {
      enabled: false,
      url: '',
      position: 'left',
      maxWidth: 120,
      maxHeight: 40
    },
    privacyPolicy: {
      url: '',
      text: 'Privacy Policy',
      openInNewTab: true,
      required: false
    },
    footerLink: {
      enabled: true,
      text: 'Cookie Settings',
      position: 'floating',
      floatingPosition: 'bottom-left',
      style: 'floating',
      floatingStyle: {
        shape: 'pill',
        size: 'small',
        showText: true,
        useCustomColors: false
      },
      inlineStyle: {
        linkType: 'plain',
        includeIcon: false,
        includeLogo: false
      }
    },
    showPoweredBy: true
  },
  layout: {
    width: 'full',
    customWidth: 400,
    maxWidth: 1200,
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadow: 'medium',
    animation: 'fade'
  },
  scripts: {
    strictlyNecessary: [
      {
        id: 'session-management',
        name: 'Session Management',
        category: 'strictly-necessary',
        scriptCode: `// Essential session management
if (!sessionStorage.getItem('sessionId')) {
  sessionStorage.setItem('sessionId', Date.now().toString());
}`,
        enabled: true
      }
    ],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: []
  },
  advanced: {
    googleConsentMode: true,
    customCSS: '',
    customJS: '',
    performance: {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true
    }
  }
}

// Common script database for autocomplete
const COMMON_SCRIPTS = {
  'strictly-necessary': [
    'Session Management',
    'Security Headers',
    'CSRF Protection',
    'Authentication',
    'Load Balancing',
    'Cookie Consent',
    'GDPR Compliance',
    'SSL Certificate',
    'Firewall Protection',
    'Rate Limiting'
  ],
  'functionality': [
    'User Preferences',
    'Language Selection',
    'Theme Settings',
    'Form Validation',
    'Local Storage',
    'Shopping Cart',
    'User Authentication',
    'Search Functionality',
    'Notifications',
    'Accessibility Tools'
  ],
  'tracking-performance': [
    'Google Analytics',
    'Google Analytics 4',
    'Microsoft Clarity',
    'Hotjar',
    'Mixpanel',
    'Amplitude',
    'Segment',
    'PostHog',
    'Plausible',
    'Fathom Analytics',
    'Adobe Analytics',
    'Piwik Pro',
    'Matomo',
    'Snowplow',
    'Heap Analytics',
    'Kissmetrics',
    'Crazy Egg',
    'FullStory',
    'LogRocket',
    'Sentry',
    'New Relic',
    'DataDog',
    'Cloudflare Analytics',
    'Vercel Analytics',
    'Netlify Analytics'
  ],
  'targeting-advertising': [
    'Facebook Pixel',
    'Google Ads',
    'Google Tag Manager',
    'LinkedIn Insight Tag',
    'Twitter Pixel',
    'Pinterest Tag',
    'TikTok Pixel',
    'Snapchat Pixel',
    'Pinterest Conversion',
    'Bing Ads',
    'YouTube Analytics',
    'Instagram Pixel',
    'Reddit Pixel',
    'Quora Pixel',
    'Outbrain Pixel',
    'Taboola Pixel',
    'Criteo Pixel',
    'The Trade Desk',
    'Amazon DSP',
    'Google Marketing Platform',
    'Adobe Experience Platform',
    'Salesforce Marketing Cloud',
    'HubSpot Tracking',
    'Mailchimp Tracking',
    'Klaviyo Tracking',
    'Intercom',
    'Zendesk Chat',
    'Drift',
    'Crisp',
    'Tidio',
    'LiveChat',
    'Olark',
    'Freshchat'
  ]
}

// Smart input component with autocomplete
const SmartScriptInput = ({ 
  value, 
  onChange, 
  category, 
  placeholder = "Script name" 
}: { 
  value: string
  onChange: (value: string) => void
  category: keyof typeof COMMON_SCRIPTS
  placeholder?: string
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredScripts, setFilteredScripts] = useState<string[]>([])
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Only show suggestions after user stops typing for 300ms
    if (value.trim() && value.length >= 2) {
      typingTimeoutRef.current = setTimeout(() => {
        const suggestions = COMMON_SCRIPTS[category].filter(script =>
          script.toLowerCase().includes(value.toLowerCase()) && 
          script.toLowerCase() !== value.toLowerCase()
        )
        console.log(`Autocomplete for ${category}:`, { value, suggestions })
        setFilteredScripts(suggestions)
        setShowSuggestions(suggestions.length > 0)
      }, 300)
    } else {
      setShowSuggestions(false)
      setFilteredScripts([])
    }

    // Cleanup timeout on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [value, category])

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          // Only show suggestions on focus if we already have filtered results
          if (value.trim() && value.length >= 2 && filteredScripts.length > 0) {
            setShowSuggestions(true)
          }
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder={placeholder}
        className="font-medium border-0 p-0 h-auto"
      />
      {showSuggestions && filteredScripts.length > 0 && value.trim() && (
        <div className="absolute top-full left-0 right-0 z-50 bg-popover border rounded-md shadow-lg mt-1 max-h-32 overflow-y-auto">
          {filteredScripts.map((script, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(script)
                setShowSuggestions(false)
              }}
            >
              {script}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BannerBuilderContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [config, setConfig] = useState<BannerConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('compliance')
  const [isEditing, setIsEditing] = useState(false)
  const [bannerId, setBannerId] = useState<string | null>(null)
  const [bannerUpdatedAt, setBannerUpdatedAt] = useState<Date | null>(null)
  const [isLoadingBanner, setIsLoadingBanner] = useState(false)
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'enterprise'>('free')
  const [brandImportUrl, setBrandImportUrl] = useState('')
  const [isDiscoveringBrand, setIsDiscoveringBrand] = useState(false)
  const [brandDiscovery, setBrandDiscovery] = useState<BrandDiscoveryResult | null>(null)
  const [brandDiscoveryError, setBrandDiscoveryError] = useState<string | null>(null)
  const [scriptScanUrl, setScriptScanUrl] = useState('')
  const [isScanningScripts, setIsScanningScripts] = useState(false)
  const [scriptScanError, setScriptScanError] = useState<string | null>(null)
  const loadedBannerRef = useRef<string | null>(null)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
    } else {
      const planTier = (session.user as any)?.planTier as 'free' | 'pro' | 'enterprise' | undefined
      if (planTier) {
        setUserPlan(planTier)
      }
    }
  }, [session, router])

  useEffect(() => {
    const editId = searchParams.get('id') || searchParams.get('edit')
    // Only load if we have an ID, session, and haven't already loaded this banner
    if (editId && session && loadedBannerRef.current !== editId) {
      loadedBannerRef.current = editId
      loadBannerForEdit(editId)
    }
  }, [searchParams, session])

  // Warn user about unsaved changes before leaving the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const loadBannerForEdit = async (id: string) => {
    setIsLoadingBanner(true)
    try {
      const response = await fetch(`/api/banners/simple/${id}`)
      const data = (await response.json()) as {
        success?: boolean
        banner?: ConsentBanner
        error?: string
      }
      
      if (response.ok && data.banner) {
        // Check if banner needs migration
        const originalConfig = data.banner.config
        const needsUpdate = needsMigration(originalConfig)
        
        let bannerConfig = originalConfig
        
        if (needsUpdate) {
          // Migrate to latest version
          bannerConfig = migrateBannerConfig(originalConfig)
          const migrationNotes = getMigrationNotes(originalConfig.version || '1.0.0', bannerConfig.version!)
          
          // Show migration notification
          toast.success(
            `🎉 Banner updated with new features! ${migrationNotes.length > 0 ? migrationNotes[0] : 'Enhanced preferences modal added.'}`,
            { duration: 6000 }
          )
          
          // Auto-save the migrated configuration
          try {
            await fetch(`/api/banners/simple/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: data.banner.name,
                config: bannerConfig,
                isActive: data.banner.isActive
              })
            })
          } catch (error) {
            console.error('Failed to save migrated banner:', error)
          }
        } else {
          // Even if migration didn't run, ensure new fields exist
          // This handles cases where banners might be at 2.1.0 but missing buttonLayout
          if (!bannerConfig.behavior) {
            bannerConfig.behavior = {
              autoShow: true,
              dismissOnScroll: false,
              showPreferences: true,
              cookieExpiry: 182,
              buttonLayout: 'standard',
              showRejectButton: true
            }
          } else {
            // Ensure new fields exist on existing behavior object
            if (bannerConfig.behavior.buttonLayout === undefined) {
              bannerConfig.behavior.buttonLayout = 'standard'
            }
            if (bannerConfig.behavior.showRejectButton === undefined) {
              bannerConfig.behavior.showRejectButton = true
            }
          }
        }
        
        setConfig(bannerConfig)
        setIsEditing(true)
        setBannerId(id)
        // Store updatedAt for cache-busting in script URLs
        setBannerUpdatedAt(data.banner.updatedAt ? new Date(data.banner.updatedAt) : new Date())
        toast.success(`Loaded "${data.banner.name}" for editing`)
      } else {
        console.error('Failed to load banner:', data.error)
        toast.error(data.error || 'Failed to load banner for editing')
        router.push('/dashboard/builder')
      }
    } catch (error) {
      console.error('Error loading banner:', error)
      toast.error('Failed to load banner for editing')
      router.push('/dashboard/builder')
    } finally {
      setIsLoadingBanner(false)
    }
  }

  const updateConfig = (section: keyof BannerConfig, updates: any) => {
    setIsDirty(true)
    setConfig(prev => {
      const currentValue = prev[section]
      
      // If the current value is a primitive (string, number, boolean) or null/undefined,
      // replace it directly with the new value
      if (typeof currentValue !== 'object' || currentValue === null) {
        return {
          ...prev,
          [section]: updates
        }
      }
      
      // If the current value is an object, merge the updates
      return {
        ...prev,
        [section]: { ...(currentValue as any), ...updates }
      }
    })
  }

  const applyColorUpdates = (updates: Partial<BannerConfig['colors']>) => {
    setConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...updates
      }
    }))
  }

  const applyColorRole = (role: keyof BannerConfig['colors'], value: string) => {
    applyColorUpdates({ [role]: value })
    toast.success(`Applied ${role} color`)
  }

  const applyBrandPalette = () => {
    if (!brandDiscovery?.suggestions) return
    applyColorUpdates(brandDiscovery.suggestions)
    toast.success('Brand palette applied')
  }

  const applyBrandLogo = (logo: BrandLogoSuggestion) => {
    setConfig(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        logo: {
          ...prev.branding.logo,
          enabled: true,
          url: logo.url
        }
      }
    }))
    toast.success('Brand logo applied')
  }

  const handleScriptDiscovery = async () => {
    if (!scriptScanUrl.trim()) {
      setScriptScanError('Enter a website URL to scan for scripts.')
      return
    }

    setIsScanningScripts(true)
    setScriptScanError(null)

    try {
      const response = await fetch('/api/scripts/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scriptScanUrl.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After')
          const message = retryAfter 
            ? `Too many requests. Please wait ${Math.ceil(parseInt(retryAfter) / 60)} minutes.`
            : 'Too many requests. Please wait before trying again.'
          setScriptScanError(message)
          toast.error(message)
        } else {
          setScriptScanError(data.error || 'Unable to discover scripts.')
          toast.error(data.error || 'Unable to discover scripts.')
        }
        return
      }

      if (data.scripts && data.scripts.length > 0) {
        // Add discovered scripts to their respective categories
        const newScripts = { ...config.scripts }
        
        data.scripts.forEach((script: TrackingScript) => {
          const category = script.category
          if (category === 'strictly-necessary') {
            newScripts.strictlyNecessary = [...newScripts.strictlyNecessary, script]
          } else if (category === 'functionality') {
            newScripts.functionality = [...newScripts.functionality, script]
          } else if (category === 'tracking-performance') {
            newScripts.trackingPerformance = [...newScripts.trackingPerformance, script]
          } else if (category === 'targeting-advertising') {
            newScripts.targetingAdvertising = [...newScripts.targetingAdvertising, script]
          }
        })

        setConfig(prev => ({
          ...prev,
          scripts: newScripts
        }))

        toast.success(`Found ${data.scripts.length} script${data.scripts.length > 1 ? 's' : ''}! Added to your banner.`)
        
        if (data.warnings && data.warnings.length > 0) {
          data.warnings.forEach((warning: string) => {
            toast(warning, { icon: 'ℹ️', duration: 5000 })
          })
        }
      } else {
        toast('No tracking scripts detected. You may need to add them manually.', { icon: 'ℹ️', duration: 5000 })
        if (data.warnings && data.warnings.length > 0) {
          data.warnings.forEach((warning: string) => {
            toast(warning, { icon: 'ℹ️', duration: 5000 })
          })
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      setScriptScanError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsScanningScripts(false)
    }
  }

  const handleBrandImport = async () => {
    if (!brandImportUrl.trim()) {
      setBrandDiscoveryError('Enter a website URL to import brand colors.')
      return
    }

    setIsDiscoveringBrand(true)
    setBrandDiscoveryError(null)

    try {
      const response = await fetch('/api/brand/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: brandImportUrl.trim() })
      })

      const data = await response.json()

      if (!response.ok) {
        setBrandDiscoveryError(data.error || 'Unable to discover brand details.')
        return
      }

      setBrandDiscovery(data)
      toast.success('Brand colors discovered')
    } catch (error) {
      setBrandDiscoveryError((error as Error).message)
    } finally {
      setIsDiscoveringBrand(false)
    }
  }

  const handleComplianceFrameworkChange = (framework: ComplianceFramework) => {
    const template = getBannerTemplate(framework)
    
    // Only update compliance settings and required behavior changes
    // Preserve user's colors, text, and other customizations
    setConfig(prev => ({
      ...prev,
      compliance: template.compliance,
      behavior: {
        ...prev.behavior,
        showPreferences: template.compliance.requiresGranularConsent,
        cookieExpiry: template.compliance.consentExpiry
      }
    }))
    
    toast.success(`Switched to ${framework.toUpperCase()} compliance framework`)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'fr' | 'auto') => {
    setConfig(prev => ({
      ...prev,
      language: newLanguage
    }))
    
    // If user selects specific language (not auto), apply translations
    if (newLanguage !== 'auto') {
      const translations = applyTranslations(newLanguage)
      setConfig(prev => ({
        ...prev,
        language: newLanguage,
        text: translations
      }))
      toast.success(`Banner text updated to ${newLanguage === 'fr' ? 'French' : 'English'}`)
    }
  }

  const handleThemeChange = (theme: 'light' | 'dark' | 'custom') => {
    // Check if user has custom colors that differ from default light/dark themes
    if (theme !== 'custom') {
      const lightDefaults = { background: '#ffffff', text: '#1f2937', button: '#3b82f6', buttonText: '#ffffff', link: '#1d4ed8' }
      const darkDefaults = { background: '#1f2937', text: '#ffffff', button: '#3b82f6', buttonText: '#ffffff', link: '#60a5fa' }
      const currentColors = config.colors
      const isDefaultLight = Object.entries(lightDefaults).every(([k, v]) => currentColors[k as keyof typeof currentColors] === v)
      const isDefaultDark = Object.entries(darkDefaults).every(([k, v]) => currentColors[k as keyof typeof currentColors] === v)
      if (!isDefaultLight && !isDefaultDark) {
        if (!window.confirm('Switching themes will reset your custom colors. Continue?')) {
          return
        }
      }
    }
    setIsDirty(true)
    setConfig(prev => ({
      ...prev,
      theme,
      colors: theme === 'light' ? {
        background: '#ffffff',
        text: '#1f2937',
        button: '#3b82f6',
        buttonText: '#ffffff',
        link: '#1d4ed8'
      } : theme === 'dark' ? {
        background: '#1f2937',
        text: '#ffffff',
        button: '#3b82f6',
        buttonText: '#ffffff',
        link: '#60a5fa'
      } : prev.colors
    }))
  }

  const [isPushing, setIsPushing] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const url = isEditing ? `/api/banners/simple/${bannerId}` : '/api/banners/simple'
      const method = isEditing ? 'PUT' : 'POST'
      
      // Add version timestamp to ensure cache invalidation
      const configWithVersion = {
        ...config,
        version: '2.1.0',
        lastUpdated: new Date().toISOString()
      }
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.name,
          config: configWithVersion,
          isActive: true
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Update local config with the version
        setConfig(configWithVersion)
        // Update timestamp for cache-busting
        if (data.banner?.updatedAt) {
          setBannerUpdatedAt(new Date(data.banner.updatedAt))
        } else {
          setBannerUpdatedAt(new Date())
        }
        setIsDirty(false)
        toast.success(isEditing ? 'Banner updated successfully!' : 'Banner saved successfully!')
        if (!isEditing) {
          // For new banners, redirect to dashboard after saving
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
        } else {
          // For updated banners, stay on the page but show success
          console.log('Banner updated successfully:', data.banner)
        }
      } else {
        console.error('Save/Update error:', data.error)
        toast.error(data.error || 'Failed to save banner')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save banner')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePushLive = async () => {
    if (!isEditing || !bannerId) {
      toast.error('Please save the banner first')
      return
    }
    
    setIsPushing(true)
    try {
      // First save any pending changes
      const configWithVersion = {
        ...config,
        version: '2.1.0',
        lastUpdated: new Date().toISOString()
      }
      
      const response = await fetch(`/api/banners/simple/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.name,
          config: configWithVersion,
          isActive: true
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setConfig(configWithVersion)
        // Update timestamp for cache-busting - this will update the script URL automatically
        if (data.banner?.updatedAt) {
          setBannerUpdatedAt(new Date(data.banner.updatedAt))
        } else {
          setBannerUpdatedAt(new Date())
        }
        
        // Force refresh the banner script by hitting it with nocache
        // Use cache: 'no-store' to bypass browser's HTTP cache entirely
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
        await fetch(`${baseUrl}/api/v1/banner.js?id=${bannerId}&nocache=true`, {
          cache: 'no-store'
        })
        
        setIsDirty(false)
        toast.success(
          <div>
            <strong>Changes pushed live!</strong>
            <p className="text-sm mt-1">The script URL has been updated with a new cache-busting parameter.</p>
            <p className="text-sm mt-1">Browsers will automatically fetch the latest version.</p>
            <p className="text-xs mt-1 text-muted-foreground">If you see old content, hard refresh (Ctrl+Shift+R).</p>
          </div>,
          { duration: 6000 }
        )
      } else {
        toast.error(data.error || 'Failed to push changes')
      }
    } catch (error) {
      console.error('Push live error:', error)
      toast.error('Failed to push changes live')
    } finally {
      setIsPushing(false)
    }
  }

  const isStepComplete = (step: string): boolean => {
    switch (step) {
      case 'compliance':
        return false // Always has defaults, no meaningful completion to show
      case 'brand':
        return (
          config.colors.background !== '#1f2937' ||
          config.colors.text !== '#f9fafb' ||
          config.colors.button !== '#3b82f6' ||
          config.colors.buttonText !== '#ffffff' ||
          config.colors.link !== '#60a5fa'
        )
      case 'design':
        return (
          config.position !== 'bottom' ||
          config.layout.borderRadius !== 8 ||
          config.layout.padding !== 20 ||
          config.layout.margin !== 20
        )
      case 'content':
        return config.text.title !== 'We use cookies'
      case 'scripts':
        return (
          config.scripts.strictlyNecessary.some(s => s.scriptCode) ||
          config.scripts.functionality.some(s => s.scriptCode) ||
          config.scripts.trackingPerformance.some(s => s.scriptCode) ||
          config.scripts.targetingAdvertising.some(s => s.scriptCode)
        )
      case 'cookie-settings':
        return config.branding?.footerLink?.enabled === true
      case 'behavior':
        return false // Always has defaults, no meaningful completion to show
      case 'analytics':
        return !!(config.integrations?.googleAnalytics?.measurementId)
      case 'code':
        return false // Always available, no meaningful completion to show
      default:
        return false
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isLoadingBanner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading banner for editing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="h-6 w-px bg-border"></div>
                <div className="flex items-center gap-1.5">
                  <Input
                    value={config.name}
                    onChange={(e) => { setIsDirty(true); setConfig(prev => ({ ...prev, name: e.target.value })) }}
                    placeholder="Banner name"
                    className="text-lg font-semibold border-0 p-0 h-auto bg-transparent focus:bg-background focus:border focus:px-2 focus:py-1 focus:rounded"
                  />
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleSave} disabled={isLoading} size="sm">
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Draft'}
              </Button>
              {isEditing && (
                <Button 
                  onClick={handlePushLive} 
                  disabled={isPushing || isLoading} 
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isPushing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Pushing...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4" />
                      Push Live
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Configuration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-2">
              <div className="sticky top-6">
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {activeTab === 'compliance' ? 'Step 1 of 9' :
                       activeTab === 'brand' ? 'Step 2 of 9' :
                       activeTab === 'design' ? 'Step 3 of 9' :
                       activeTab === 'content' ? 'Step 4 of 9' :
                       activeTab === 'scripts' ? 'Step 5 of 9' :
                       activeTab === 'cookie-settings' ? 'Step 6 of 9' :
                       activeTab === 'behavior' ? 'Step 7 of 9' :
                       activeTab === 'analytics' ? 'Step 8 of 9' : 'Step 9 of 9'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((activeTab === 'compliance' ? 11 :
                                   activeTab === 'brand' ? 22 :
                                   activeTab === 'design' ? 33 :
                                   activeTab === 'content' ? 44 :
                                   activeTab === 'scripts' ? 56 :
                                   activeTab === 'cookie-settings' ? 67 :
                                   activeTab === 'behavior' ? 78 :
                                   activeTab === 'analytics' ? 89 : 100))}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${activeTab === 'compliance' ? 11 :
                                 activeTab === 'brand' ? 22 :
                                 activeTab === 'design' ? 33 :
                                 activeTab === 'content' ? 44 :
                                 activeTab === 'scripts' ? 56 :
                                 activeTab === 'cookie-settings' ? 67 :
                                 activeTab === 'behavior' ? 78 :
                                 activeTab === 'analytics' ? 89 : 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Configuration Steps
                  </div>
                  
                  <button
                    onClick={() => setActiveTab('compliance')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'compliance'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span className="flex-1 text-left">Compliance</span>
                    {isStepComplete('compliance') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('brand')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'brand'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Palette className="h-4 w-4" />
                    <span className="flex-1 text-left">Brand</span>
                    {isStepComplete('brand') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('design')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'design'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <PanelTop className="h-4 w-4" />
                    <span className="flex-1 text-left">Layout</span>
                    {isStepComplete('design') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'content'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Type className="h-4 w-4" />
                    <span className="flex-1 text-left">Content</span>
                    {isStepComplete('content') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('scripts')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'scripts'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Code className="h-4 w-4" />
                    <span className="flex-1 text-left">Scripts</span>
                    {isStepComplete('scripts') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('cookie-settings')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'cookie-settings'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="flex-1 text-left">Cookie Settings</span>
                    {isStepComplete('cookie-settings') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('behavior')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'behavior'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="flex-1 text-left">Behavior</span>
                    {isStepComplete('behavior') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'analytics'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="flex-1 text-left">Analytics</span>
                    {isStepComplete('analytics') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                      activeTab === 'code'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Code className="h-4 w-4" />
                    <span className="flex-1 text-left">Code</span>
                    {isStepComplete('code') && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground capitalize">
                  {activeTab === 'compliance' ? 'Choose Compliance Framework' :
                   activeTab === 'brand' ? 'Brand & Colors' :
                   activeTab === 'design' ? 'Layout & Spacing' :
                   activeTab === 'content' ? 'Set Text & Messages' :
                   activeTab === 'scripts' ? 'Configure Tracking Scripts' :
                   activeTab === 'cookie-settings' ? 'Cookie Settings Management' :
                   activeTab === 'behavior' ? 'Set Banner Behavior' :
                   activeTab === 'analytics' ? 'Analytics Integration' : 'Get Your Code'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === 'compliance' ? 'Select the privacy law that applies to your website. This will configure your banner\'s requirements and legal text.' :
                   activeTab === 'brand' ? 'Import your brand, choose colors, fonts, and logo for your cookie consent banner.' :
                   activeTab === 'design' ? 'Configure position, layout, spacing, and animation settings.' :
                   activeTab === 'content' ? 'Set the text, messages, and button labels for your banner.' :
                   activeTab === 'scripts' ? 'Configure tracking scripts and cookie categories.' :
                   activeTab === 'cookie-settings' ? 'Configure how users can manage their cookie preferences after initial consent.' :
                   activeTab === 'behavior' ? 'Set how your banner behaves and interacts with users.' :
                   activeTab === 'analytics' ? 'Configure Google Analytics 4 integration and tracking settings.' :
                   'Copy the code below and paste it into your website to activate your cookie banner.'}
                </p>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-6" id="compliance-panel" role="tabpanel" aria-labelledby="compliance-tab">
                <ComplianceSelector
                  selectedFramework={config.compliance.framework}
                  onFrameworkChange={handleComplianceFrameworkChange}
                />
                
                {/* Button Layout Section */}
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Button Layout
                    </CardTitle>
                    <CardDescription>
                      Choose which buttons appear on your banner. Some layouts may not meet all compliance requirements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Standard Layout */}
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          (config.behavior.buttonLayout || 'standard') === 'standard'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-muted-foreground/50'
                        }`}
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          behavior: {
                            ...prev.behavior,
                            buttonLayout: 'standard',
                            showRejectButton: true
                          }
                        }))}
                      >
                        <div className="font-medium mb-1">Standard</div>
                        <div className="text-sm text-muted-foreground mb-3">Accept + Reject + Customize</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="default" className="text-xs">Accept</Badge>
                          <Badge variant="outline" className="text-xs">Reject</Badge>
                          <Badge variant="secondary" className="text-xs">Customize</Badge>
                        </div>
                        <div className="mt-2 text-xs text-green-600">✓ GDPR Compliant</div>
                      </div>
                      
                      {/* Soft Consent Layout */}
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          config.behavior.buttonLayout === 'soft-consent'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-muted-foreground/50'
                        }`}
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          behavior: {
                            ...prev.behavior,
                            buttonLayout: 'soft-consent',
                            showRejectButton: false,
                            showPreferences: true
                          }
                        }))}
                      >
                        <div className="font-medium mb-1">Soft Consent</div>
                        <div className="text-sm text-muted-foreground mb-3">Accept + Customize only</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="default" className="text-xs">Accept</Badge>
                          <Badge variant="secondary" className="text-xs">Customize</Badge>
                        </div>
                        <div className="mt-2 text-xs text-amber-600">⚠ Higher acceptance rates</div>
                      </div>
                      
                      {/* Accept Only Layout */}
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          config.behavior.buttonLayout === 'accept-only'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-muted-foreground/50'
                        }`}
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          behavior: {
                            ...prev.behavior,
                            buttonLayout: 'accept-only',
                            showRejectButton: false,
                            showPreferences: false
                          }
                        }))}
                      >
                        <div className="font-medium mb-1">Accept Only</div>
                        <div className="text-sm text-muted-foreground mb-3">Just the Accept button</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="default" className="text-xs">Accept</Badge>
                        </div>
                        <div className="mt-2 text-xs text-red-600">⚠ May not be compliant</div>
                      </div>
                    </div>
                    
                    {/* Compliance Warning */}
                    {config.compliance.framework === 'gdpr' && config.behavior.buttonLayout !== 'standard' && (
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>
                          GDPR requires an easy way to reject cookies. Consider using "Standard" layout for full compliance.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {/* Manual Toggle Override */}
                    <div className="pt-4 border-t space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">Manual Controls</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-reject">Show Reject Button</Label>
                          <p className="text-xs text-muted-foreground">Display a dedicated reject button</p>
                        </div>
                        <Switch
                          id="show-reject"
                          checked={config.behavior.showRejectButton !== false}
                          onCheckedChange={(checked) => setConfig(prev => ({
                            ...prev,
                            behavior: {
                              ...prev.behavior,
                              showRejectButton: checked,
                              buttonLayout: checked ? 'standard' : (prev.behavior.showPreferences ? 'soft-consent' : 'accept-only')
                            }
                          }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="show-preferences">Show Customize Button</Label>
                          <p className="text-xs text-muted-foreground">Allow users to customize cookie preferences</p>
                        </div>
                        <Switch
                          id="show-preferences"
                          checked={config.behavior.showPreferences}
                          onCheckedChange={(checked) => setConfig(prev => ({
                            ...prev,
                            behavior: {
                              ...prev.behavior,
                              showPreferences: checked,
                              buttonLayout: prev.behavior.showRejectButton !== false 
                                ? 'standard' 
                                : (checked ? 'soft-consent' : 'accept-only')
                            }
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Framework Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Framework Comparison</CardTitle>
                    <CardDescription>
                      Quick comparison of key differences between compliance frameworks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Requirement</th>
                            <th className="text-center py-2">PIPEDA</th>
                            <th className="text-center py-2">GDPR</th>
                            <th className="text-center py-2">CCPA</th>
                            <th className="text-center py-2">Custom</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Consent Type</td>
                            <td className="text-center py-2">
                              <Badge variant="outline" className="text-xs">Opt-out</Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant="outline" className="text-xs">Opt-in</Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant="outline" className="text-xs">Opt-out</Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant="outline" className="text-xs">Opt-in</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Granular Controls</td>
                            <td className="text-center py-2">
                              <Badge variant="secondary" className="text-xs">Optional</Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant="default" className="text-xs">Required</Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant="default" className="text-xs">Required</Badge>
                            </td>
                            <td className="text-center py-2">
                              <Badge variant="default" className="text-xs">Required</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Max Penalty</td>
                            <td className="text-center py-2 text-xs">Reputation</td>
                            <td className="text-center py-2 text-xs">€20M</td>
                            <td className="text-center py-2 text-xs">$7,500</td>
                            <td className="text-center py-2 text-xs">Varies</td>
                          </tr>
                          <tr>
                            <td className="py-2">Consent Expiry</td>
                            <td className="text-center py-2 text-xs">24 months</td>
                            <td className="text-center py-2 text-xs">12 months</td>
                            <td className="text-center py-2 text-xs">12 months</td>
                            <td className="text-center py-2 text-xs">12 months</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Brand Tab */}
              <TabsContent value="brand" className="space-y-6" id="brand-panel" role="tabpanel" aria-labelledby="brand-tab">

                  {/* Brand Import */}
                  <Card className="border-l-4 border-l-amber-500">
                    <CardHeader>
                      <CardTitle>Brand Import</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="brand-import" className="text-sm font-medium">Import from Website</Label>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <Input
                            id="brand-import"
                            placeholder="https://example.com"
                            value={brandImportUrl}
                            onChange={(e) => setBrandImportUrl(e.target.value)}
                            className="flex-1"
                            inputMode="url"
                            autoCapitalize="none"
                            autoCorrect="off"
                          />
                          <Button onClick={handleBrandImport} disabled={isDiscoveringBrand}>
                            {isDiscoveringBrand ? 'Importing...' : 'Import Brand'}
                          </Button>
                        </div>
                        {brandDiscoveryError && (
                          <p className="text-sm text-red-500">{brandDiscoveryError}</p>
                        )}
                      </div>

                      {brandDiscovery && (
                        <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold">Detected palette</p>
                              <p className="text-xs text-muted-foreground">Imported from {brandDiscovery.url}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={applyBrandPalette}>Apply Palette</Button>
                            </div>
                          </div>

                          {brandDiscovery.warnings.length > 0 && (
                            <ul className="space-y-1 text-xs text-amber-600">
                              {brandDiscovery.warnings.map((warning, index) => (
                                <li key={index}>Warning: {warning}</li>
                              ))}
                            </ul>
                          )}

                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {brandDiscovery.colors.slice(0, 8).map((color) => (
                              <div key={color.hex} className="overflow-hidden rounded-md border">
                                <div className="h-16" style={{ backgroundColor: color.hex }} title={color.hex} />
                                <div className="space-y-2 p-3">
                                  <div className="flex items-center justify-between text-sm font-medium">
                                    <span>{color.hex}</span>
                                    <span className="text-xs text-muted-foreground">score {color.score}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline" onClick={() => applyColorRole('background', color.hex)}>Background</Button>
                                    <Button size="sm" variant="outline" onClick={() => applyColorRole('text', color.hex)}>Text</Button>
                                    <Button size="sm" variant="outline" onClick={() => applyColorRole('button', color.hex)}>Button</Button>
                                    <Button size="sm" variant="outline" onClick={() => applyColorRole('buttonText', color.hex)}>Button Text</Button>
                                    <Button size="sm" variant="outline" onClick={() => applyColorRole('link', color.hex)}>Link</Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {(() => {
                            const fonts = (brandDiscovery as BrandDiscoveryResult & { fonts?: Array<{ family: string; source: string; weight: number; url?: string }> }).fonts
                            return fonts && fonts.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm font-semibold">Detected fonts</p>
                                <div className="flex flex-wrap gap-2">
                                  {fonts.map((font, index) => (
                                  <Button
                                    key={index}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      updateConfig('fontFamily', font.family)
                                      toast.success(`Applied font: ${font.family}`)
                                    }}
                                    className="text-xs"
                                  >
                                    <span style={{ fontFamily: font.family }}>{font.family}</span>
                                  </Button>
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Click a font to apply it to your banner.
                              </p>
                            </div>
                            )
                          })()}

                          {brandDiscovery.logo && (
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={brandDiscovery.logo.url}
                                alt="Detected brand logo"
                                className="h-16 w-16 rounded border bg-muted object-contain p-2"
                              />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Detected logo</p>
                                <p className="text-xs text-muted-foreground">Source: {brandDiscovery.logo.source}</p>
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => applyBrandLogo(brandDiscovery.logo!)}>Use Logo</Button>
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={brandDiscovery.logo.url} target="_blank" rel="noopener noreferrer">Open logo</a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Theme & Colors */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Theme & Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="theme" className="text-sm font-medium">Theme</Label>
                        <Select value={config.theme} onValueChange={handleThemeChange}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Palette Presets */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Palette Presets</Label>
                        <div className="flex flex-wrap gap-2">
                          {COLOR_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              title={preset.name}
                              className="group relative flex flex-col w-10 h-12 rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
                              onClick={() => {
                                applyColorUpdates(preset.colors)
                                updateConfig('theme', 'custom')
                                toast.success(`Applied "${preset.name}" palette`)
                              }}
                            >
                              <div className="flex-1" style={{ backgroundColor: preset.colors.background }} />
                              <div className="flex-1" style={{ backgroundColor: preset.colors.button }} />
                              <div className="flex-1" style={{ backgroundColor: preset.colors.text }} />
                              <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Pickers with Contrast Badges */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm font-medium">Background</Label>
                            </div>
                            <ColorPicker
                              value={config.colors.background}
                              onChange={(color) => updateConfig('colors', { background: color })}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm font-medium">Text</Label>
                              <ContrastBadge foreground={config.colors.text} background={config.colors.background} />
                            </div>
                            <ColorPicker
                              value={config.colors.text}
                              onChange={(color) => updateConfig('colors', { text: color })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm font-medium">Button</Label>
                            </div>
                            <ColorPicker
                              value={config.colors.button}
                              onChange={(color) => updateConfig('colors', { button: color })}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label className="text-sm font-medium">Button Text</Label>
                              <ContrastBadge foreground={config.colors.buttonText} background={config.colors.button} />
                            </div>
                            <ColorPicker
                              value={config.colors.buttonText}
                              onChange={(color) => updateConfig('colors', { buttonText: color })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label className="text-sm font-medium">Link</Label>
                            <ContrastBadge foreground={config.colors.link} background={config.colors.background} />
                          </div>
                          <ColorPicker
                            value={config.colors.link}
                            onChange={(color) => updateConfig('colors', { link: color })}
                          />
                        </div>

                        {/* Reject Button Colors */}
                        {config.behavior.showRejectButton !== false && (
                          <div className="space-y-3 pt-3 border-t">
                            <Label className="text-sm font-medium">Reject Button Colors</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs">Reject Button Background</Label>
                                <ColorPicker
                                  value={config.colors.rejectButton || 'transparent'}
                                  onChange={(color) => updateConfig('colors', { rejectButton: color })}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Label className="text-xs">Reject Button Text</Label>
                                  <ContrastBadge
                                    foreground={config.colors.rejectButtonText || config.colors.text}
                                    background={config.colors.rejectButton && config.colors.rejectButton !== 'transparent' ? config.colors.rejectButton : config.colors.background}
                                  />
                                </div>
                                <ColorPicker
                                  value={config.colors.rejectButtonText || config.colors.text}
                                  onChange={(color) => updateConfig('colors', { rejectButtonText: color })}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Floating Button Custom Colors */}
                      {config.branding?.footerLink?.floatingStyle?.useCustomColors && (
                        <div className="space-y-3 pt-3 border-t">
                          <Label className="text-sm font-medium">Floating Button Colors</Label>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label className="text-xs">Background</Label>
                              <ColorPicker
                                value={config.branding?.footerLink?.floatingStyle?.customColors?.background || '#6b7280'}
                                onChange={(color) => updateConfig('branding', {
                                  footerLink: {
                                    ...(config.branding?.footerLink || {}),
                                    floatingStyle: {
                                      ...(config.branding?.footerLink?.floatingStyle || {}),
                                      customColors: {
                                        ...(config.branding?.footerLink?.floatingStyle?.customColors || {}),
                                        background: color
                                      }
                                    }
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Text</Label>
                              <ColorPicker
                                value={config.branding?.footerLink?.floatingStyle?.customColors?.text || '#ffffff'}
                                onChange={(color) => updateConfig('branding', {
                                  footerLink: {
                                    ...(config.branding?.footerLink || {}),
                                    floatingStyle: {
                                      ...(config.branding?.footerLink?.floatingStyle || {}),
                                      customColors: {
                                        ...(config.branding?.footerLink?.floatingStyle?.customColors || {}),
                                        text: color
                                      }
                                    }
                                  }
                                })}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Border</Label>
                              <ColorPicker
                                value={config.branding?.footerLink?.floatingStyle?.customColors?.border || '#6b7280'}
                                onChange={(color) => updateConfig('branding', {
                                  footerLink: {
                                    ...(config.branding?.footerLink || {}),
                                    floatingStyle: {
                                      ...(config.branding?.footerLink?.floatingStyle || {}),
                                      customColors: {
                                        ...(config.branding?.footerLink?.floatingStyle?.customColors || {}),
                                        border: color
                                      }
                                    }
                                  }
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Typography */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="font-family" className="text-sm font-medium">Font Family</Label>
                        <Select
                          value={config.fontFamily || 'system-default'}
                          onValueChange={(value) => updateConfig('fontFamily', value === 'system-default' ? '' : value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="System Default" />
                          </SelectTrigger>
                          <SelectContent>
                            {FONT_PRESETS.map((font) => (
                              <SelectItem key={font.value || 'system-default'} value={font.value || 'system-default'}>
                                {font.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {config.fontFamily ? `Using "${config.fontFamily}" from Google Fonts` : 'Using the browser default font'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Logo */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Logo</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="logo-enabled-brand"
                          checked={config.branding.logo.enabled}
                          onCheckedChange={(checked) => updateConfig('branding', {
                            logo: { ...config.branding.logo, enabled: checked }
                          })}
                        />
                        <Label htmlFor="logo-enabled-brand">Enable Logo</Label>
                      </div>

                      {config.branding.logo.enabled && (
                        <div className="space-y-4">
                          {/* Drag and drop zone */}
                          <div>
                            <Label className="text-sm font-medium">Upload Logo</Label>
                            <div
                              className={`mt-2 relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                config.branding.logo.url
                                  ? 'border-primary/30 bg-primary/5'
                                  : 'border-muted-foreground/25 hover:border-primary/50'
                              }`}
                              onDragOver={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                e.currentTarget.classList.add('border-primary', 'bg-primary/10')
                              }}
                              onDragLeave={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                e.currentTarget.classList.remove('border-primary', 'bg-primary/10')
                              }}
                              onDrop={async (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                e.currentTarget.classList.remove('border-primary', 'bg-primary/10')
                                const file = e.dataTransfer.files?.[0]
                                if (!file || !file.type.startsWith('image/')) return
                                const formData = new FormData()
                                formData.append('file', file)
                                try {
                                  const res = await fetch('/api/upload/logo', { method: 'POST', body: formData })
                                  const data = await res.json()
                                  if (data.url) {
                                    updateConfig('branding', { logo: { ...config.branding.logo, url: data.url } })
                                    toast.success('Logo uploaded')
                                  } else {
                                    toast.error(data.error || 'Upload failed')
                                  }
                                } catch (err) {
                                  toast.error('Upload failed')
                                }
                              }}
                            >
                              {config.branding.logo.url ? (
                                <div className="flex flex-col items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={config.branding.logo.url}
                                    alt="Logo preview"
                                    className="max-w-32 max-h-16 object-contain"
                                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateConfig('branding', { logo: { ...config.branding.logo, url: '' } })
                                    }}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <label className="cursor-pointer flex flex-col items-center gap-2">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Drag & drop your logo, or click to browse</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0]
                                      if (!file) return
                                      const formData = new FormData()
                                      formData.append('file', file)
                                      try {
                                        const res = await fetch('/api/upload/logo', { method: 'POST', body: formData })
                                        const data = await res.json()
                                        if (data.url) {
                                          updateConfig('branding', { logo: { ...config.branding.logo, url: data.url } })
                                          toast.success('Logo uploaded')
                                        } else {
                                          toast.error(data.error || 'Upload failed')
                                        }
                                      } catch (err) {
                                        toast.error('Upload failed')
                                      }
                                    }}
                                  />
                                </label>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="logo-url-brand">Or Logo URL</Label>
                            <Input
                              id="logo-url-brand"
                              value={config.branding.logo.url}
                              onChange={(e) => updateConfig('branding', {
                                logo: { ...config.branding.logo, url: e.target.value }
                              })}
                              placeholder="https://example.com/logo.png"
                            />
                          </div>

                          <div>
                            <Label htmlFor="logo-position-brand">Logo Position</Label>
                            <Select
                              value={config.branding.logo.position}
                              onValueChange={(value: any) => updateConfig('branding', {
                                logo: { ...config.branding.logo, position: value }
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="hidden">Hidden</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

              </TabsContent>

              {/* Design/Layout Tab */}
              <TabsContent value="design" className="space-y-6" id="design-panel" role="tabpanel" aria-labelledby="design-tab">

                {/* Layout Settings */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                      <CardTitle>Layout & Spacing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Position Settings */}
                      <div className="space-y-3">
                        <Label htmlFor="position" className="text-sm font-medium">Position</Label>
                        <Select value={config.position} onValueChange={(value: any) => updateConfig('position', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Standard layouts (Free) */}
                            <SelectItem value="top">Top Bar (Full Width)</SelectItem>
                            <SelectItem value="bottom">Bottom Bar (Full Width)</SelectItem>
                            <SelectItem value="floating-bottom-right">Floating - Bottom Right</SelectItem>
                            <SelectItem value="floating-bottom-left">Floating - Bottom Left</SelectItem>
                            <SelectItem value="floating-top-right">Floating - Top Right</SelectItem>
                            <SelectItem value="floating-top-left">Floating - Top Left</SelectItem>
                            
                            {/* Pro layouts */}
                            {canAccessFeature(userPlan, 'hasCustomLayouts') ? (
                              <>
                                <SelectItem value="modal-center">Modal - Center</SelectItem>
                                <SelectItem value="modal-bottom">Modal - Bottom</SelectItem>
                                <SelectItem value="modal-top">Modal - Top</SelectItem>
                                <SelectItem value="slide-in-right">Slide In - Right</SelectItem>
                                <SelectItem value="slide-in-left">Slide In - Left</SelectItem>
                                <SelectItem value="slide-in-top">Slide In - Top</SelectItem>
                                <SelectItem value="slide-in-bottom">Slide In - Bottom</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="modal-center" disabled>Modal - Center (Pro)</SelectItem>
                                <SelectItem value="modal-bottom" disabled>Modal - Bottom (Pro)</SelectItem>
                                <SelectItem value="modal-top" disabled>Modal - Top (Pro)</SelectItem>
                                <SelectItem value="slide-in-right" disabled>Slide In - Right (Pro)</SelectItem>
                                <SelectItem value="slide-in-left" disabled>Slide In - Left (Pro)</SelectItem>
                                <SelectItem value="slide-in-top" disabled>Slide In - Top (Pro)</SelectItem>
                                <SelectItem value="slide-in-bottom" disabled>Slide In - Bottom (Pro)</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        {!canAccessFeature(userPlan, 'hasCustomLayouts') && (
                          <UpgradePrompt 
                            feature="Custom Layouts"
                            description="Modal, slide-in, and other advanced layouts"
                            variant="inline"
                          />
                        )}
                      </div>

                      {/* Width Settings */}
                      <div className="space-y-3">
                        <Label htmlFor="width" className="text-sm font-medium">Width</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Select value={config.layout.width} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, width: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full Width</SelectItem>
                            <SelectItem value="container">Container Width</SelectItem>
                            <SelectItem value="custom">Custom Width</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {config.layout.width === 'custom' && (
                          <div>
                            <Input
                              id="custom-width"
                              type="number"
                              value={config.layout.customWidth || 400}
                              onChange={(e) => updateConfig('layout', { ...config.layout, customWidth: parseInt(e.target.value) || 400 })}
                              placeholder="400"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacing Settings */}
                    <div className="space-y-5">
                      <Label className="text-sm font-medium">Spacing & Effects</Label>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="border-radius" className="text-xs">Border Radius</Label>
                            <span className="text-xs text-muted-foreground font-mono">{config.layout.borderRadius}px</span>
                          </div>
                          <Slider
                            id="border-radius"
                            min={0}
                            max={32}
                            step={1}
                            value={[config.layout.borderRadius]}
                            onValueChange={([value]) => updateConfig('layout', { ...config.layout, borderRadius: value })}
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="padding" className="text-xs">Padding</Label>
                            <span className="text-xs text-muted-foreground font-mono">{config.layout.padding}px</span>
                          </div>
                          <Slider
                            id="padding"
                            min={0}
                            max={48}
                            step={1}
                            value={[config.layout.padding]}
                            onValueChange={([value]) => updateConfig('layout', { ...config.layout, padding: value })}
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label htmlFor="margin" className="text-xs">Margin</Label>
                            <span className="text-xs text-muted-foreground font-mono">{config.layout.margin}px</span>
                          </div>
                          <Slider
                            id="margin"
                            min={0}
                            max={48}
                            step={1}
                            value={[config.layout.margin]}
                            onValueChange={([value]) => updateConfig('layout', { ...config.layout, margin: value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="shadow" className="text-xs">Shadow</Label>
                        <Select value={config.layout.shadow} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, shadow: value })}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Animation */}
                    <div className="space-y-3">
                      <Label htmlFor="animation" className="text-sm font-medium">Animation</Label>
                      <Select value={config.layout.animation} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, animation: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="fade">Fade In</SelectItem>
                          <SelectItem value="slide">Slide In</SelectItem>
                          <SelectItem value="bounce">Bounce</SelectItem>
                          <SelectItem value="pulse">Pulse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6" id="content-panel" role="tabpanel" aria-labelledby="content-tab">

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader>
                    <CardTitle>Language</CardTitle>
                    <CardDescription>
                      Choose your banner language. Auto-detect will show English for English browsers and French for French browsers (required for Quebec Law 25).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language">Banner Language</Label>
                      <Select 
                        value={config.language} 
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto-detect (Recommended)</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français (French)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        {config.language === 'auto' && '🇨🇦 Language will be detected from user\'s browser. Perfect for Canadian sites serving English and French users.'}
                        {config.language === 'en' && 'Banner will always show in English.'}
                        {config.language === 'fr' && 'La bannière sera toujours affichée en français.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Banner Text</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                      <Input
                        id="title"
                        value={config.text.title}
                        onChange={(e) => updateConfig('text', { title: e.target.value })}
                        placeholder="We use cookies"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <textarea
                        id="message"
                        value={config.text.message}
                        onChange={(e) => updateConfig('text', { message: e.target.value })}
                        placeholder="This website uses cookies to enhance your browsing experience and provide personalized content."
                        className="w-full h-20 p-3 border rounded-md resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Button Text</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="accept-text" className="text-xs">Accept Button</Label>
                          <Input
                            id="accept-text"
                            value={config.text.acceptButton}
                            onChange={(e) => updateConfig('text', { acceptButton: e.target.value })}
                            placeholder="Accept All"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reject-text" className="text-xs">Reject Button</Label>
                          <Input
                            id="reject-text"
                            value={config.text.rejectButton}
                            onChange={(e) => updateConfig('text', { rejectButton: e.target.value })}
                            placeholder="Reject"
                            className="mt-1"
                          />
                        </div>
                        <div className="relative">
                          <div className="flex items-center space-x-1 mb-1">
                            <Label htmlFor="preferences-text" className="text-xs">Preferences Button</Label>
                          </div>
                          <Input
                            id="preferences-text"
                            value={config.text.preferencesButton}
                            onChange={(e) => updateConfig('text', { preferencesButton: e.target.value })}
                            placeholder="Preferences"
                            className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Policy & Branding</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="privacy-url">Privacy Policy URL</Label>
                      <Input
                        id="privacy-url"
                        value={config.branding.privacyPolicy.url}
                        onChange={(e) => updateConfig('branding', {
                          privacyPolicy: { ...config.branding.privacyPolicy, url: e.target.value }
                        })}
                        placeholder="https://example.com/privacy-policy"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <Label htmlFor="remove-branding">Remove &quot;Powered by&quot; branding</Label>
                        <p className="text-xs text-muted-foreground">Hide the cookie-banner.ca attribution</p>
                      </div>
                      {canAccessFeature(userPlan, 'hasBrandingRemoval') ? (
                        <Switch
                          id="remove-branding"
                          checked={config.branding.showPoweredBy === false}
                          onCheckedChange={(checked) => updateConfig('branding', {
                            showPoweredBy: !checked
                          })}
                        />
                      ) : (
                        <UpgradePrompt
                          feature="Remove Branding"
                          description="Hide the 'Powered by cookie-banner.ca' attribution"
                          variant="inline"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>

              {/* Cookie Settings Tab */}
        <TabsContent value="cookie-settings" className="space-y-6" id="cookie-settings-panel" role="tabpanel" aria-labelledby="cookie-settings-tab">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle>Cookie Settings Management</CardTitle>
                  <CardDescription>
                    Configure how users can manage their cookie preferences after initial consent. Choose between a floating button or inline footer link.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Cookie Settings Management is mandatory */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Cookie Settings Management</p>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Required for compliance. Users must be able to manage their cookie preferences after initial consent.
                      </p>
                    </div>

                    {(
                      <div className="space-y-6">
                        {/* Style Selection */}
                        <div>
                          <Label htmlFor="cookie-settings-style">Display Style</Label>
                          <Select 
                            value={config.branding?.footerLink?.style || 'floating'} 
                            onValueChange={(value: any) => updateConfig('branding', { 
                              footerLink: { 
                                ...(config.branding?.footerLink || {}), 
                                style: value,
                                // Initialize new properties if switching to floating
                                ...(value === 'floating' && !config.branding?.footerLink?.floatingStyle ? {
                                  floatingStyle: {
                                    shape: 'pill',
                                    size: 'small',
                                    showText: true,
                                    useCustomColors: false
                                  }
                                } : {}),
                                // Initialize new properties if switching to inline
                                ...(value === 'inline' && !config.branding?.footerLink?.inlineStyle ? {
                                  inlineStyle: {
                                    linkType: 'plain',
                                    includeIcon: false,
                                    includeLogo: false
                                  }
                                } : {})
                              }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="floating">Floating Button (Recommended)</SelectItem>
                              <SelectItem value="inline">Inline Footer Link</SelectItem>
                              <SelectItem value="both">Both Options</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Floating Button Configuration */}
                        {(config.branding?.footerLink?.style === 'floating' || config.branding?.footerLink?.style === 'both') && (
                          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                            <h4 className="font-medium flex items-center">
                              <Settings className="h-4 w-4 mr-2" />
                              Floating Button Settings
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="floating-text">Button Text</Label>
                                <Input
                                  id="floating-text"
                                  value={config.branding?.footerLink?.text || 'Cookie Settings'}
                                  onChange={(e) => updateConfig('branding', { 
                                    footerLink: { ...(config.branding?.footerLink || {}), text: e.target.value }
                                  })}
                                  placeholder="Cookie Settings"
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="floating-position">Position</Label>
                                <Select 
                                  value={config.branding?.footerLink?.floatingPosition || 'bottom-left'} 
                                  onValueChange={(value: any) => updateConfig('branding', { 
                                    footerLink: { ...(config.branding?.footerLink || {}), floatingPosition: value }
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="floating-shape">Shape</Label>
                                <Select 
                                  value={config.branding?.footerLink?.floatingStyle?.shape || 'pill'} 
                                  onValueChange={(value: any) => updateConfig('branding', { 
                                    footerLink: { 
                                      ...(config.branding?.footerLink || {}), 
                                      floatingStyle: { 
                                        ...(config.branding?.footerLink?.floatingStyle || {}), 
                                        shape: value 
                                      }
                                    }
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="circle">Circle (Icon Only)</SelectItem>
                                    <SelectItem value="pill">Pill (Icon + Text)</SelectItem>
                                    <SelectItem value="square">Square (Icon + Text)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <Label htmlFor="floating-size">Size</Label>
                                <Select 
                                  value={config.branding?.footerLink?.floatingStyle?.size || 'small'} 
                                  onValueChange={(value: any) => updateConfig('branding', { 
                                    footerLink: { 
                                      ...(config.branding?.footerLink || {}), 
                                      floatingStyle: { 
                                        ...(config.branding?.footerLink?.floatingStyle || {}), 
                                        size: value 
                                      }
                                    }
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="small">Small (40px)</SelectItem>
                                    <SelectItem value="medium">Medium (48px)</SelectItem>
                                    <SelectItem value="large">Large (56px)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="floating-show-text"
                                checked={config.branding?.footerLink?.floatingStyle?.showText ?? true}
                                onCheckedChange={(checked) => updateConfig('branding', { 
                                  footerLink: { 
                                    ...(config.branding?.footerLink || {}), 
                                    floatingStyle: { 
                                      ...(config.branding?.footerLink?.floatingStyle || {}), 
                                      showText: checked 
                                    }
                                  }
                                })}
                              />
                              <Label htmlFor="floating-show-text">Show text with icon</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="floating-custom-colors"
                                checked={config.branding?.footerLink?.floatingStyle?.useCustomColors ?? false}
                                onCheckedChange={(checked) => updateConfig('branding', { 
                                  footerLink: { 
                                    ...(config.branding?.footerLink || {}), 
                                    floatingStyle: { 
                                      ...(config.branding?.footerLink?.floatingStyle || {}), 
                                      useCustomColors: checked 
                                    }
                                  }
                                })}
                              />
                              <Label htmlFor="floating-custom-colors">Use custom colors (otherwise matches banner button)</Label>
                            </div>

                            {config.branding?.footerLink?.floatingStyle?.useCustomColors && (
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label className="text-xs">Background</Label>
                                  <ColorPicker
                                    value={config.branding?.footerLink?.floatingStyle?.customColors?.background || '#6b7280'}
                                    onChange={(color) => updateConfig('branding', {
                                      footerLink: {
                                        ...(config.branding?.footerLink || {}),
                                        floatingStyle: {
                                          ...(config.branding?.footerLink?.floatingStyle || {}),
                                          customColors: {
                                            ...(config.branding?.footerLink?.floatingStyle?.customColors || {}),
                                            background: color
                                          }
                                        }
                                      }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Text</Label>
                                  <ColorPicker
                                    value={config.branding?.footerLink?.floatingStyle?.customColors?.text || '#ffffff'}
                                    onChange={(color) => updateConfig('branding', {
                                      footerLink: {
                                        ...(config.branding?.footerLink || {}),
                                        floatingStyle: {
                                          ...(config.branding?.footerLink?.floatingStyle || {}),
                                          customColors: {
                                            ...(config.branding?.footerLink?.floatingStyle?.customColors || {}),
                                            text: color
                                          }
                                        }
                                      }
                                    })}
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Border</Label>
                                  <ColorPicker
                                    value={config.branding?.footerLink?.floatingStyle?.customColors?.border || '#6b7280'}
                                    onChange={(color) => updateConfig('branding', {
                                      footerLink: {
                                        ...(config.branding?.footerLink || {}),
                                        floatingStyle: {
                                          ...(config.branding?.footerLink?.floatingStyle || {}),
                                          customColors: {
                                            ...(config.branding?.footerLink?.floatingStyle?.customColors || {}),
                                            border: color
                                          }
                                        }
                                      }
                                    })}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Inline Footer Link Configuration */}
                        {(config.branding?.footerLink?.style === 'inline' || config.branding?.footerLink?.style === 'both') && (
                          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                            <h4 className="font-medium flex items-center">
                              <Type className="h-4 w-4 mr-2" />
                              Inline Footer Link Settings
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="inline-link-type">Link Style</Label>
                                <Select 
                                  value={config.branding?.footerLink?.inlineStyle?.linkType || 'plain'} 
                                  onValueChange={(value: any) => updateConfig('branding', { 
                                    footerLink: { 
                                      ...(config.branding?.footerLink || {}), 
                                      inlineStyle: { 
                                        ...(config.branding?.footerLink?.inlineStyle || {}), 
                                        linkType: value 
                                      }
                                    }
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="plain">Plain Text Link</SelectItem>
                                    <SelectItem value="button">Button Style</SelectItem>
                                    <SelectItem value="icon-text">Icon + Text</SelectItem>
                                    <SelectItem value="custom">Custom Styled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="inline-include-icon"
                                  checked={config.branding?.footerLink?.inlineStyle?.includeIcon ?? false}
                                  onCheckedChange={(checked) => updateConfig('branding', { 
                                    footerLink: { 
                                      ...(config.branding?.footerLink || {}), 
                                      inlineStyle: { 
                                        ...(config.branding?.footerLink?.inlineStyle || {}), 
                                        includeIcon: checked 
                                      }
                                    }
                                  })}
                                />
                                <Label htmlFor="inline-include-icon">Include cookie icon</Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="inline-include-logo"
                                  checked={config.branding?.footerLink?.inlineStyle?.includeLogo ?? false}
                                  onCheckedChange={(checked) => updateConfig('branding', { 
                                    footerLink: { 
                                      ...(config.branding?.footerLink || {}), 
                                      inlineStyle: { 
                                        ...(config.branding?.footerLink?.inlineStyle || {}), 
                                        includeLogo: checked 
                                      }
                                    }
                                  })}
                                />
                                <Label htmlFor="inline-include-logo">Include your logo (if uploaded)</Label>
                              </div>

                              {config.branding?.footerLink?.inlineStyle?.linkType === 'custom' && (
                                <div>
                                  <Label htmlFor="inline-custom-class">Custom CSS Class</Label>
                                  <Input
                                    id="inline-custom-class"
                                    value={config.branding?.footerLink?.inlineStyle?.customClass || ''}
                                    onChange={(e) => updateConfig('branding', { 
                                      footerLink: { 
                                        ...(config.branding?.footerLink || {}), 
                                        inlineStyle: { 
                                          ...(config.branding?.footerLink?.inlineStyle || {}), 
                                          customClass: e.target.value 
                                        }
                                      }
                                    })}
                                    placeholder="my-custom-cookie-link"
                                  />
                                </div>
                              )}

                              {/* Generated HTML Preview */}
                              <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="text-sm font-medium mb-2">Generated HTML for your footer:</p>
                                <code className="block p-3 bg-background rounded text-xs overflow-x-auto">
                                  {generateInlineFooterLinkHTML(config.branding?.footerLink || {})}
                                </code>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Copy this code and paste it into your website footer where you want the link to appear.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Live Preview Panel */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Preview</CardTitle>
                    <CardDescription>
                      See how your cookie settings will look on your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Floating Button Preview */}
                      {(config.branding?.footerLink?.style === 'floating' || config.branding?.footerLink?.style === 'both') && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Floating Button Preview</h4>
                          <div className="relative border-2 border-dashed border-border rounded-lg p-8 bg-muted/50 min-h-[200px]">
                            <div className="text-center text-sm text-muted-foreground mb-4">
                              Your website content would appear here
                            </div>
                            
                            {/* Floating Button Preview */}
                            <div 
                              className="inline-block cursor-pointer transition-all duration-200 hover:scale-105"
                              style={{
                                ...generateFloatingButtonPreviewStyles(config),
                                position: 'relative',
                                top: 'auto',
                                left: 'auto',
                                right: 'auto',
                                bottom: 'auto',
                                transform: 'none',
                                margin: '0 auto'
                              }}
                              onClick={() => {
                                // Toggle consent state for preview
                                const currentState = localStorage.getItem('cookie-consent-preview-state') || 'accepted';
                                const newState = currentState === 'accepted' ? 'rejected' : 'accepted';
                                localStorage.setItem('cookie-consent-preview-state', newState);
                                // Force re-render by updating a dummy state
                                setConfig({...config});
                              }}
                            >
                              {generateFloatingButtonPreviewContent(config)}
                            </div>
                            
                            <div className="text-center mt-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  const currentState = localStorage.getItem('cookie-consent-preview-state') || 'accepted';
                                  const newState = currentState === 'accepted' ? 'rejected' : 'accepted';
                                  localStorage.setItem('cookie-consent-preview-state', newState);
                                  setConfig({...config});
                                }}
                              >
                                Toggle Consent State
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Inline Footer Link Preview */}
                      {(config.branding?.footerLink?.style === 'inline' || config.branding?.footerLink?.style === 'both') && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Inline Footer Link Preview</h4>
                          <div className="border border-border rounded-lg p-4 bg-muted/50">
                            <div className="text-xs text-muted-foreground mb-2">Footer area:</div>
                            <div 
                              className="inline-block"
                              dangerouslySetInnerHTML={{ 
                                __html: generateInlineFooterLinkHTML(config.branding?.footerLink) 
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* HTML Snippet Preview */}
                      {(config.branding?.footerLink?.style === 'inline' || config.branding?.footerLink?.style === 'both') && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Generated HTML Snippet</h4>
                          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                            <pre>{generateInlineFooterLinkHTML(config.branding?.footerLink)}</pre>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(generateInlineFooterLinkHTML(config.branding?.footerLink));
                              toast.success('Copied to clipboard!')
                            }}
                          >
                            Copy HTML Snippet
                          </Button>
                        </div>
                      )}

                      {!config.branding?.footerLink?.style && (
                        <div className="text-center text-muted-foreground py-8">
                          <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Select a display style to see preview</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Scripts Tab */}
              <TabsContent value="scripts" className="space-y-6" id="scripts-panel" role="tabpanel" aria-labelledby="scripts-tab">
                {/* Script Discovery */}
                <Card className="border-primary/20 bg-primary/5 border-l-4 border-l-violet-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary" />
                      Auto-Discover Scripts
                    </CardTitle>
                    <CardDescription>
                      Scan your website to automatically find and add tracking scripts. This saves hours of manual work!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://example.com"
                        value={scriptScanUrl}
                        onChange={(e) => setScriptScanUrl(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !isScanningScripts) {
                            handleScriptDiscovery()
                          }
                        }}
                      />
                      <Button 
                        onClick={handleScriptDiscovery} 
                        disabled={isScanningScripts}
                      >
                        {isScanningScripts ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Scan Website
                          </>
                        )}
                      </Button>
                    </div>
                    {scriptScanError && (
                      <Alert variant="destructive">
                        <AlertDescription>{scriptScanError}</AlertDescription>
                      </Alert>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Detects: Google Analytics, Facebook Pixel, Google Tag Manager, Hotjar, Microsoft Clarity, LinkedIn Insight Tag, TikTok Pixel, Google Ads, Intercom, Zendesk, and more.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Scripts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Strictly Necessary Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-green-600" />
                        Strictly Necessary Scripts
                        {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.strictlyNecessary.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.strictlyNecessary]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                    }))
                                  }}
                                  category="strictly-necessary"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.strictlyNecessary]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.strictlyNecessary.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {script.scriptCode.trim() && (
                              <div className="px-3 pb-3 space-y-3">
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-1 block">
                                    {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm') 
                                      ? 'Head Code (Step 1: Paste in <head> section)' 
                                      : 'Script Code'}
                                  </Label>
                                  <textarea
                                    value={script.scriptCode}
                                    onChange={(e) => {
                                      const newScripts = [...config.scripts.strictlyNecessary]
                                      newScripts[index].scriptCode = e.target.value
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                      }))
                                    }}
                                    placeholder="Paste your script code here..."
                                    className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"
                                  />
                                </div>
                                {(script.name.toLowerCase().includes('google tag manager') || 
                                  script.name.toLowerCase().includes('gtm') ||
                                  script.bodyCode) && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">
                                      {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                        ? 'Body Code (Step 2: Paste after <body> tag - Required for GTM)'
                                        : 'Body Code (placed after <body> tag) - Optional'}
                                    </Label>
                                    {(script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')) && (
                                      <p className="text-xs text-amber-600 mb-2 flex items-center">
                                        <Info className="h-3 w-3 mr-1" />
                                        Google Tag Manager requires both Head and Body codes to work properly
                                      </p>
                                    )}
                                    <textarea
                                      value={script.bodyCode || ''}
                                      onChange={(e) => {
                                        const newScripts = [...config.scripts.strictlyNecessary]
                                        newScripts[index].bodyCode = e.target.value
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                        }))
                                      }}
                                      placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                        ? 'Paste your GTM noscript code here (starts with <noscript><iframe...)'
                                        : 'Paste your <body> script code here...'}
                                      className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                            {!script.scriptCode.trim() && (
                              <div className="px-3 pb-3 space-y-3">
                                <div>
                                  <Label className="text-xs text-muted-foreground mb-1 block">
                                    {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm') 
                                      ? 'Head Code (Step 1: Paste in <head> section)' 
                                      : 'Script Code'}
                                  </Label>
                                  <textarea
                                    value={script.scriptCode}
                                    onChange={(e) => {
                                      const newScripts = [...config.scripts.strictlyNecessary]
                                      newScripts[index].scriptCode = e.target.value
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                      }))
                                    }}
                                    placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                      ? 'Paste your GTM <script> code here...'
                                      : 'Paste your script code here...'}
                                    className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"
                                  />
                                </div>
                                {(script.name.toLowerCase().includes('google tag manager') || 
                                  script.name.toLowerCase().includes('gtm')) && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground mb-1 block">
                                      Body Code (Step 2: Paste after &lt;body&gt; tag - Required for GTM)
                                    </Label>
                                    <p className="text-xs text-amber-600 mb-2 flex items-center">
                                      <Info className="h-3 w-3 mr-1" />
                                      Google Tag Manager requires both Head and Body codes to work properly
                                    </p>
                                    <textarea
                                      value={script.bodyCode || ''}
                                      onChange={(e) => {
                                        const newScripts = [...config.scripts.strictlyNecessary]
                                        newScripts[index].bodyCode = e.target.value
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                        }))
                                      }}
                                      placeholder="Paste your GTM noscript code here (starts with <noscript><iframe...)"
                                      className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `strict-${Date.now()}`,
                              name: '',
                              category: 'strictly-necessary' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                strictlyNecessary: [...prev.scripts.strictlyNecessary, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Strictly Necessary Script
                        </Button>
                      </div>
                    </div>

                    {/* Functionality Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Settings className="mr-2 h-4 w-4 text-blue-600" />
                        Functionality Scripts
                        {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.functionality.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.functionality]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, functionality: newScripts }
                                    }))
                                  }}
                                  category="functionality"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.functionality]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, functionality: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.functionality.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, functionality: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (
                                <div className="p-3 bg-muted/50 rounded-lg border">
                                  <Label className="text-xs font-medium mb-2 block">💬 What functionality are you adding?</Label>
                                  <Select onValueChange={(templateKey) => {
                                    const template = scriptTemplates[templateKey]
                                    if (template) {
                                      const newScripts = [...config.scripts.functionality]
                                      newScripts[index].name = template.name
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, functionality: newScripts }
                                      }))
                                    }
                                  }}>
                                    <SelectTrigger className="text-xs h-9">
                                      <SelectValue placeholder="Select tool (Intercom, Zendesk, etc.)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(scriptTemplates)
                                        .filter(([_, template]) => template.category === 'functionality')
                                        .map(([key, template]) => (
                                          <SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  {script.name && scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || ''] && (
                                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || '']?.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div>
                                <Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your script code here:'}
                                </Label>
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.functionality]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, functionality: newScripts }
                                    }))
                                  }}
                                  placeholder={`Paste your ${script.name || 'functionality'} code here...`}
                                  className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `func-${Date.now()}`,
                              name: '',
                              category: 'functionality' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                functionality: [...prev.scripts.functionality, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Functionality Script
                        </Button>
                      </div>
                    </div>

                    {/* Tracking & Performance Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4 text-yellow-600" />
                        Tracking & Performance Scripts
                        {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.trackingPerformance.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.trackingPerformance]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                    }))
                                  }}
                                  category="tracking-performance"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.trackingPerformance]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.trackingPerformance.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (
                                <div className="p-3 bg-muted/50 rounded-lg border">
                                  <Label className="text-xs font-medium mb-2 block">📊 What are you tracking?</Label>
                                  <Select onValueChange={(templateKey) => {
                                    const template = scriptTemplates[templateKey]
                                    if (template) {
                                      const newScripts = [...config.scripts.trackingPerformance]
                                      newScripts[index].name = template.name
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                      }))
                                    }
                                  }}>
                                    <SelectTrigger className="text-xs h-9">
                                      <SelectValue placeholder="Select tool (Google Analytics, Hotjar, etc.)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(scriptTemplates)
                                        .filter(([_, template]) => template.category === 'tracking-performance')
                                        .map(([key, template]) => (
                                          <SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  {script.name && scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || ''] && (
                                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || '']?.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div>
                                <Label className="text-xs font-medium mb-2 block">
                                  {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                    ? 'Head Code (Step 1: Paste in <head> section)'
                                    : (script.scriptCode.trim() ? 'Script Code:' : 'Paste your tracking code here:')}
                                </Label>
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.trackingPerformance]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                    }))
                                  }}
                                  placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                    ? 'Paste your GTM <script> code here...'
                                    : `Paste your ${script.name || 'tracking'} code here...`}
                                  className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              
                              {(script.name.toLowerCase().includes('google tag manager') || 
                                script.name.toLowerCase().includes('gtm') ||
                                script.bodyCode) && (
                                <div>
                                  <Label className="text-xs font-medium mb-2 block">
                                    {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                      ? 'Body Code (Step 2: Paste after <body> tag - Required for GTM)'
                                      : 'Body Code (placed after <body> tag) - Optional'}
                                  </Label>
                                  {(script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')) && (
                                    <p className="text-xs text-amber-600 mb-2 flex items-center">
                                      <Info className="h-3 w-3 mr-1" />
                                      Google Tag Manager requires both Head and Body codes to work properly
                                    </p>
                                  )}
                                  <textarea
                                    value={script.bodyCode || ''}
                                    onChange={(e) => {
                                      const newScripts = [...config.scripts.trackingPerformance]
                                      newScripts[index].bodyCode = e.target.value
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                      }))
                                    }}
                                    placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                                      ? 'Paste your GTM noscript code here (starts with <noscript><iframe...)'
                                      : 'Paste your <body> script code here...'}
                                    className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `tracking-${Date.now()}`,
                              name: '',
                              category: 'tracking-performance' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                trackingPerformance: [...prev.scripts.trackingPerformance, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Tracking Script
                        </Button>
                      </div>
                    </div>

                    {/* Targeting & Advertising Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Target className="mr-2 h-4 w-4 text-red-600" />
                        Targeting & Advertising Scripts
                        {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.targetingAdvertising.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.targetingAdvertising]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                    }))
                                  }}
                                  category="targeting-advertising"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.targetingAdvertising]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.targetingAdvertising.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (
                                <div className="p-3 bg-muted/50 rounded-lg border">
                                  <Label className="text-xs font-medium mb-2 block">🎯 What are you advertising with?</Label>
                                  <Select onValueChange={(templateKey) => {
                                    const template = scriptTemplates[templateKey]
                                    if (template) {
                                      const newScripts = [...config.scripts.targetingAdvertising]
                                      newScripts[index].name = template.name
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                      }))
                                    }
                                  }}>
                                    <SelectTrigger className="text-xs h-9">
                                      <SelectValue placeholder="Select tool (Facebook Pixel, Google Ads, etc.)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(scriptTemplates)
                                        .filter(([_, template]) => template.category === 'targeting-advertising')
                                        .map(([key, template]) => (
                                          <SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  {script.name && scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || ''] && (
                                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || '']?.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div>
                                <Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your tracking code here:'}
                                </Label>
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.targetingAdvertising]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                    }))
                                  }}
                                  placeholder={`Paste your ${script.name || 'advertising'} code here...`}
                                  className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `targeting-${Date.now()}`,
                              name: '',
                              category: 'targeting-advertising' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                targetingAdvertising: [...prev.scripts.targetingAdvertising, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Advertising Script
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Behavior Tab */}
              <TabsContent value="behavior" className="space-y-6" id="behavior-panel" role="tabpanel" aria-labelledby="behavior-tab">
                <Card className="relative border-l-4 border-l-cyan-500">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Banner Behavior</CardTitle>
                    </div>
                    <CardDescription>Configure how the banner behaves and interacts with users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-show"
                        checked={config.behavior.autoShow}
                        onCheckedChange={(checked) => updateConfig('behavior', { autoShow: checked })}
                      />
                      <Label htmlFor="auto-show">Auto-show banner</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dismiss-scroll"
                        checked={config.behavior.dismissOnScroll}
                        onCheckedChange={(checked) => updateConfig('behavior', { dismissOnScroll: checked })}
                      />
                      <Label htmlFor="dismiss-scroll">Dismiss on scroll</Label>
                    </div>

                    <div className="relative p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                      <div className="absolute top-2 right-2">
                      </div>
                      <div className="flex items-center space-x-2 pr-16">
                        <Switch
                          id="show-preferences"
                          checked={config.behavior.showPreferences}
                          onCheckedChange={(checked) => updateConfig('behavior', { showPreferences: checked })}
                        />
                        <Label htmlFor="show-preferences" className="font-medium">
                          Show preferences button
                        </Label>
                      </div>
                      <p className="text-xs text-purple-600 mt-2 ml-6">
                        ✨ Enables the advanced preferences modal with cookie category toggles
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="cookie-expiry">Cookie Expiry (days)</Label>
                      <Input
                        id="cookie-expiry"
                        type="number"
                        value={config.behavior.cookieExpiry}
                        onChange={(e) => updateConfig('behavior', { cookieExpiry: parseInt(e.target.value) })}
                        min="1"
                        max="365"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Performance Optimization
                    </CardTitle>
                    <CardDescription>
                      Optimize your banner's impact on page speed and Core Web Vitals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="defer-scripts" className="text-sm font-medium">
                            Defer Non-Critical Scripts
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Load analytics and marketing scripts after page load
                          </p>
                        </div>
                        <Switch
                          id="defer-scripts"
                          checked={config.advanced.performance?.deferNonCriticalScripts ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), deferNonCriticalScripts: checked }
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="idle-callback" className="text-sm font-medium">
                            Use RequestIdleCallback
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Load scripts during browser idle time for better performance
                          </p>
                        </div>
                        <Switch
                          id="idle-callback"
                          checked={config.advanced.performance?.useRequestIdleCallback ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), useRequestIdleCallback: checked }
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="lazy-analytics" className="text-sm font-medium">
                            Lazy Load Analytics
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Delay analytics scripts until user interaction
                          </p>
                        </div>
                        <Switch
                          id="lazy-analytics"
                          checked={config.advanced.performance?.lazyLoadAnalytics ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), lazyLoadAnalytics: checked }
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="inline-css" className="text-sm font-medium">
                            Inline Critical CSS
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Prevent render-blocking by inlining banner styles
                          </p>
                        </div>
                        <Switch
                          id="inline-css"
                          checked={config.advanced.performance?.inlineCriticalCSS ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), inlineCriticalCSS: checked }
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Performance Benefits</h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                        <li>• <strong>Faster LCP:</strong> Deferred scripts don't block page rendering</li>
                        <li>• <strong>Better INP:</strong> Scripts load during idle time</li>
                        <li>• <strong>Reduced CLS:</strong> Inline CSS prevents layout shifts</li>
                        <li>• <strong>Improved TTFB:</strong> Non-blocking script loading</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Advanced configuration options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="google-consent"
                        checked={config.advanced.googleConsentMode}
                        onCheckedChange={(checked) => updateConfig('advanced', { googleConsentMode: checked })}
                      />
                      <Label htmlFor="google-consent">Enable Google Consent Mode v2</Label>
                    </div>

                    {/* Google Analytics 4 Configuration */}
                    <div className="space-y-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-semibold text-blue-900 dark:text-blue-300">Google Analytics 4</h3>
                      </div>

                      {!canAccessFeature(userPlan, 'hasGA4Integration') ? (
                        <UpgradePrompt
                          feature="GA4 Integration"
                          description="Connect Google Analytics 4 to track consent events and impressions"
                          variant="inline"
                        />
                      ) : (
                      <>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="ga4-enabled"
                          checked={config.integrations?.googleAnalytics?.enabled ?? false}
                          onCheckedChange={(checked) => updateConfig('integrations', {
                            ...config.integrations,
                            googleAnalytics: {
                              ...config.integrations?.googleAnalytics,
                              enabled: checked,
                              measurementId: config.integrations?.googleAnalytics?.measurementId || '',
                              trackConsentEvents: config.integrations?.googleAnalytics?.trackConsentEvents ?? true,
                              anonymizeIp: config.integrations?.googleAnalytics?.anonymizeIp ?? true
                            }
                          })}
                        />
                        <Label htmlFor="ga4-enabled">Enable GA4 Tracking</Label>
                      </div>

                      {(config.integrations?.googleAnalytics?.enabled ?? false) && (
                        <div className="space-y-3 pl-6">
                          <div>
                            <Label htmlFor="ga4-measurement-id" className="text-sm font-medium">
                              Measurement ID
                            </Label>
                            <Input
                              id="ga4-measurement-id"
                              placeholder="G-XXXXXXXXXX"
                              value={config.integrations?.googleAnalytics?.measurementId ?? ''}
                              onChange={(e) => updateConfig('integrations', {
                                ...config.integrations,
                                googleAnalytics: {
                                  ...config.integrations?.googleAnalytics,
                                  measurementId: e.target.value.toUpperCase()
                                }
                              })}
                              className="font-mono mt-1"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="ga4-track-events"
                                checked={config.integrations?.googleAnalytics?.trackConsentEvents ?? true}
                                onCheckedChange={(checked) => updateConfig('integrations', {
                                  ...config.integrations,
                                  googleAnalytics: {
                                    ...config.integrations?.googleAnalytics,
                                    trackConsentEvents: checked
                                  }
                                })}
                              />
                              <Label htmlFor="ga4-track-events" className="text-sm">
                                Track Consent Events
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="ga4-track-impressions"
                                checked={config.integrations?.googleAnalytics?.trackImpressions ?? true}
                                onCheckedChange={(checked) => updateConfig('integrations', {
                                  ...config.integrations,
                                  googleAnalytics: {
                                    ...config.integrations?.googleAnalytics,
                                    trackImpressions: checked
                                  }
                                })}
                              />
                              <Label htmlFor="ga4-track-impressions" className="text-sm">
                                Track Banner Impressions
                              </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="ga4-anonymize-ip"
                                checked={config.integrations?.googleAnalytics?.anonymizeIp ?? true}
                                onCheckedChange={(checked) => updateConfig('integrations', {
                                  ...config.integrations,
                                  googleAnalytics: {
                                    ...config.integrations?.googleAnalytics,
                                    anonymizeIp: checked
                                  }
                                })}
                              />
                              <Label htmlFor="ga4-anonymize-ip" className="text-sm">
                                Anonymize IP Addresses
                              </Label>
                            </div>
                          </div>
                        </div>
                      )}
                      </>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <textarea
                        id="custom-css"
                        className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                        value={config.advanced.customCSS}
                        onChange={(e) => updateConfig('advanced', { customCSS: e.target.value })}
                        placeholder="/* Custom CSS styles */"
                      />
                    </div>

                    <div>
                      <Label htmlFor="custom-js">Custom JavaScript</Label>
                      <textarea
                        id="custom-js"
                        className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                        value={config.advanced.customJS}
                        onChange={(e) => updateConfig('advanced', { customJS: e.target.value })}
                        placeholder="// Custom JavaScript code"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6" id="analytics-panel" role="tabpanel" aria-labelledby="analytics-tab">
                {/* GA4 Events Reference */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-l-4 border-l-rose-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-base">
                      <Info className="mr-2 h-4 w-4 text-blue-600" />
                      Events Sent to Google Analytics 4
                    </CardTitle>
                    <CardDescription>
                      Hover over each event to see what it tracks. These fire automatically when visitors interact with your banner.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 cursor-help text-xs font-semibold bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 px-2.5 py-1.5 rounded-md border border-green-200 dark:border-green-800 hover:bg-green-150 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            cookie_consent
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold mb-1">Consent Decision</p>
                          <p className="text-xs">Fires when a user clicks Accept All, Reject All, or dismisses the banner. Includes <code className="bg-muted px-1 rounded text-[10px]">event_label: accept | reject | dismiss</code> so you can measure opt-in vs opt-out rates.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 cursor-help text-xs font-semibold bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 px-2.5 py-1.5 rounded-md border border-purple-200 dark:border-purple-800 hover:bg-purple-150 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            banner_impression
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold mb-1">Banner View</p>
                          <p className="text-xs">Fires each time the consent banner is shown to a visitor. Divide accepts by impressions to get your consent rate.</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 cursor-help text-xs font-semibold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2.5 py-1.5 rounded-md border border-amber-200 dark:border-amber-800 hover:bg-amber-150 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            cookie_consent_update
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold mb-1">Consent Mode v2 Update</p>
                          <p className="text-xs">Pushed to the dataLayer when preferences change. Includes <code className="bg-muted px-1 rounded text-[10px]">analytics_storage</code>, <code className="bg-muted px-1 rounded text-[10px]">ad_storage</code>, and <code className="bg-muted px-1 rounded text-[10px]">ad_personalization</code> status. Works with Google Consent Mode v2.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      All events work with GA4 Explorations, Audiences, and Looker Studio.
                    </p>
                  </CardContent>
                </Card>

                {!canAccessFeature(userPlan, 'hasGA4Integration') ? (
                  <UpgradePrompt
                    feature="GA4 Analytics Integration"
                    description="Connect Google Analytics 4 to track the events above automatically"
                    variant="card"
                  />
                ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Analytics Configuration
                    </CardTitle>
                    <CardDescription>
                      View and verify your Google Analytics 4 integration settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* GA4 Status */}
                    <div className={`p-4 rounded-lg border ${config.integrations?.googleAnalytics?.measurementId ? 'bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-green-200 dark:border-green-800' : 'bg-gradient-to-r from-blue-50 to-muted dark:from-blue-950/30 dark:to-muted border-border'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${config.integrations?.googleAnalytics?.measurementId ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <h3 className="font-semibold text-foreground">Google Analytics 4</h3>
                            <p className="text-sm text-muted-foreground">
                              {config.integrations?.googleAnalytics?.measurementId 
                                ? '✅ Configured and ready' 
                                : '⚠️ Add your Measurement ID below'}
                            </p>
                          </div>
                        </div>
                        <Badge variant={config.integrations?.googleAnalytics?.measurementId ? 'default' : 'secondary'}>
                          {config.integrations?.googleAnalytics?.measurementId ? 'Configured' : 'Not Set'}
                        </Badge>
                      </div>
                    </div>

                    {/* GA4 Configuration Input */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ga4-measurement-id" className="text-sm font-medium">
                          Measurement ID
                        </Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            id="ga4-measurement-id"
                            placeholder="G-XXXXXXXXXX"
                            value={config.integrations?.googleAnalytics?.measurementId || ''}
                            onChange={(e) => updateConfig('integrations', {
                              ...config.integrations,
                              googleAnalytics: {
                                ...config.integrations?.googleAnalytics,
                                enabled: e.target.value.trim().length > 0,
                                measurementId: e.target.value.toUpperCase(),
                                trackConsentEvents: config.integrations?.googleAnalytics?.trackConsentEvents ?? true,
                                anonymizeIp: config.integrations?.googleAnalytics?.anonymizeIp ?? true
                              }
                            })}
                            className="font-mono"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const measurementId = config.integrations?.googleAnalytics?.measurementId || ''
                              if (measurementId) {
                                navigator.clipboard.writeText(measurementId)
                                toast.success('Measurement ID copied to clipboard!')
                              } else {
                                toast.error('No Measurement ID to copy')
                              }
                            }}
                            disabled={!config.integrations?.googleAnalytics?.measurementId}
                          >
                            <Code className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Enter your Google Analytics 4 Measurement ID (starts with G-)
                        </p>
                      </div>

                      {/* Advanced Settings */}
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Advanced Settings</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="ga4-track-events"
                              checked={config.integrations?.googleAnalytics?.trackConsentEvents ?? true}
                              onCheckedChange={(checked) => updateConfig('integrations', {
                                ...config.integrations,
                                googleAnalytics: {
                                  ...config.integrations?.googleAnalytics,
                                  enabled: config.integrations?.googleAnalytics?.enabled ?? false,
                                  measurementId: config.integrations?.googleAnalytics?.measurementId || '',
                                  trackConsentEvents: checked,
                                  trackImpressions: config.integrations?.googleAnalytics?.trackImpressions ?? true,
                                  anonymizeIp: config.integrations?.googleAnalytics?.anonymizeIp ?? true
                                }
                              })}
                            />
                            <Label htmlFor="ga4-track-events" className="text-sm">
                              Track Consent Events
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="ga4-track-impressions-2"
                              checked={config.integrations?.googleAnalytics?.trackImpressions ?? true}
                              onCheckedChange={(checked) => updateConfig('integrations', {
                                ...config.integrations,
                                googleAnalytics: {
                                  ...config.integrations?.googleAnalytics,
                                  enabled: config.integrations?.googleAnalytics?.enabled ?? false,
                                  measurementId: config.integrations?.googleAnalytics?.measurementId || '',
                                  trackConsentEvents: config.integrations?.googleAnalytics?.trackConsentEvents ?? true,
                                  trackImpressions: checked,
                                  anonymizeIp: config.integrations?.googleAnalytics?.anonymizeIp ?? true
                                }
                              })}
                            />
                            <Label htmlFor="ga4-track-impressions-2" className="text-sm">
                              Track Banner Impressions
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="ga4-anonymize-ip"
                              checked={config.integrations?.googleAnalytics?.anonymizeIp ?? true}
                              onCheckedChange={(checked) => updateConfig('integrations', {
                                ...config.integrations,
                                googleAnalytics: {
                                  ...config.integrations?.googleAnalytics,
                                  enabled: config.integrations?.googleAnalytics?.enabled ?? false,
                                  measurementId: config.integrations?.googleAnalytics?.measurementId || '',
                                  trackConsentEvents: config.integrations?.googleAnalytics?.trackConsentEvents ?? true,
                                  trackImpressions: config.integrations?.googleAnalytics?.trackImpressions ?? true,
                                  anonymizeIp: checked
                                }
                              })}
                            />
                            <Label htmlFor="ga4-anonymize-ip" className="text-sm">
                              Anonymize IP Addresses
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Generated Code Preview */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Generated Code Preview</Label>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <div className="text-green-400 mb-2">// Main Banner Script</div>
                        <div className="text-blue-400">{`<script src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/banner.js?id=${bannerId || session?.user?.id}"></script>`}</div>
                        
                        {config.integrations?.googleAnalytics?.measurementId && (
                          <>
                            <div className="text-green-400 mt-4 mb-2">// Google Analytics 4 Integration</div>
                            <div className="text-yellow-400">{`<script async src="https://www.googletagmanager.com/gtag/js?id=${config.integrations.googleAnalytics.measurementId}"></script>`}</div>
                            <div className="text-purple-400">{`<script>gtag('config', '${config.integrations.googleAnalytics.measurementId}');</script>`}</div>
                          </>
                        )}
                        
                        {config.scripts && (
                          <>
                            <div className="text-green-400 mt-4 mb-2">// Custom Scripts</div>
                            {config.scripts.strictlyNecessary?.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                              <div className="text-blue-400">// Strictly Necessary: {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                            )}
                            {config.scripts.trackingPerformance?.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                              <div className="text-yellow-400">// Tracking/Performance: {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                            )}
                            {config.scripts.functionality?.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                              <div className="text-purple-400">// Functionality: {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                            )}
                            {config.scripts.targetingAdvertising?.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                              <div className="text-red-400">// Targeting/Advertising: {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        {config.integrations?.googleAnalytics?.measurementId
                          ? 'Your GA4 integration is configured and will track consent events.'
                          : 'Enter your GA4 Measurement ID above to enable tracking.'}
                      </div>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard/integrations">
                          <Settings className="h-4 w-4 mr-2" />
                          Advanced Settings
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                )}
              </TabsContent>

              {/* Code Tab */}
              <TabsContent value="code" className="space-y-6" id="code-panel" role="tabpanel" aria-labelledby="code-tab">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="mr-2 h-5 w-5" />
                      Implementation Code
                    </CardTitle>
                    <CardDescription>
                      Copy and paste this code into your website to activate your cookie banner
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CodeGenerator
                      config={config}
                      bannerId={bannerId || undefined}
                      updatedAt={bannerUpdatedAt || undefined}
                      planTier={(session?.user as any)?.planTier || 'free'}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              </Tabs>
            </div>

            {/* Live Preview Area */}
            <div className="lg:col-span-4">
              <div className="sticky top-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Eye className="mr-2 h-5 w-5" />
                        Live Preview
                      </CardTitle>
                    </div>
                    {config.behavior.showPreferences && (
                      <CardDescription className="text-purple-600">
                        ✨ Try clicking the "Preferences" button to see the new modal!
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {/* Browser Chrome Frame */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted rounded-t-lg px-3 py-2 flex items-center gap-2 border-b">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400" />
                          <span className="w-2 h-2 rounded-full bg-yellow-400" />
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 mx-2 bg-muted-foreground/15 rounded-md px-3 py-1 text-xs text-muted-foreground text-center truncate">
                          yoursite.com
                        </div>
                      </div>
                      <div className="bg-white rounded-b-lg min-h-[300px] relative overflow-hidden">
                        <BannerPreview config={config} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

        </main>
    </div>
  )
}

export default function BannerBuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Loading builder...</div>}>
      <BannerBuilderContent />
    </Suspense>
  )
}
