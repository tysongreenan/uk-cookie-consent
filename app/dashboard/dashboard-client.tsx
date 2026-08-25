'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Grid, List, Users, Crown, Shield, Edit, Eye, Sparkles, ArrowRight, Copy, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { UpdateNotification } from '@/components/dashboard/update-notification'
import { needsMigration } from '@/lib/banner-migration'
import { NewBadge } from '@/components/ui/new-badge'
import { CURRENT_BANNER_VERSION } from '@/lib/banner-migration'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { BannerCard } from '@/components/dashboard/banner-card'
import { captureEvent } from '@/lib/analytics'
import { copyToClipboard } from '@/lib/utils'
import {
  hostedInstallSnippet,
  markInstallSnippetCopied,
  anyInstallSnippetCopied,
  isInstallNudgeDismissed,
  dismissInstallNudge,
} from '@/lib/install-snippet'
import {
  shouldRedirectZeroBannerToBuilder,
  shouldShowBannerSearchEmpty,
  shouldShowZeroBannerEmptyState,
} from '@/lib/dashboard-empty'
import { markHasEverCreatedBanner, readHasEverCreatedBanner } from '@/lib/banner-lifetime'
import { copyHostedSnippet, InstallHelpDialog } from '@/components/banner/install-help-dialog'
import { isJustPaid, shouldShowUpgradeCta } from '@/lib/just-paid'
import { CREATE_NEW_BANNER_HREF } from '@/lib/banner-persist-request'

interface Banner {
  id: string
  name: string
  config: any // Can be string or object
  title: string
  message: string
  primaryColor: string
  textColor: string
  acceptButton: string
  preferencesButton: string
  position: string
  theme: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export function DashboardClient() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid') // 'grid' or 'list'
  const [hasOutdatedBanners, setHasOutdatedBanners] = useState(false)
  const [teamInfo, setTeamInfo] = useState<{ name: string; memberCount: number; userRole: string } | null>(null)
  const [showInstallNudge, setShowInstallNudge] = useState(false)
  const sessionRefreshed = useRef(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && !sessionRefreshed.current) {
      sessionRefreshed.current = true
      update()
    }
  }, [status])

  useEffect(() => {
    if (session) {
      fetchBanners().catch(err => {
        console.error('Failed to fetch banners:', err)
        setIsLoading(false)
      })
      fetchTeamInfo().catch(err => {
        console.error('Failed to fetch team info:', err)
      })

      // Safety net: if signup redirect failed to reach /builder, auto-save pending config.
      // After checkout, leave the draft for /dashboard/builder to recover into a real banner.
      const pendingConfig = localStorage.getItem('pendingBannerConfig')
      if (pendingConfig && !isJustPaid()) {
        // Remove immediately to prevent duplicate saves on session changes
        localStorage.removeItem('pendingBannerConfig')
        try {
          const config = JSON.parse(pendingConfig)
          fetch('/api/banners', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'My Cookie Banner', config }),
          }).then(res => {
            if (res.ok) {
              fetchBanners()
              toast.success('Your banner configuration has been saved!')
            }
          }).catch(() => {
            // Silently fail — user can still create manually
          })
        } catch {
          // Invalid JSON — already removed from localStorage
        }
      }
    }
  }, [session])

  useEffect(() => {
    const hasEverCreatedBanner = readHasEverCreatedBanner(session?.user?.id)
    if (!shouldRedirectZeroBannerToBuilder({
      isLoading,
      bannerCount: banners.length,
      hasEverCreatedBanner,
    })) return
    router.replace(isJustPaid() ? '/dashboard/builder?from=upgrade' : '/dashboard/builder')
  }, [isLoading, banners.length, router, session?.user?.id])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners/simple')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (response.ok && data.banners) {
        // Parse and validate banner configs
        const parsedBanners = (data.banners || []).map((banner: Banner) => {
          let config = banner.config
          
          // If config is a string, parse it
          if (typeof config === 'string') {
            try {
              config = JSON.parse(config)
            } catch (e) {
              console.error('Error parsing banner config:', e)
              config = null
            }
          }
          
          // Ensure config has required nested objects
          if (config && typeof config === 'object') {
            config.layout = config.layout || {}
            config.colors = config.colors || {}
            config.text = config.text || {}
            config.behavior = config.behavior || {}
            config.branding = config.branding || {}
            config.advanced = config.advanced || {}
          }
          
          return {
            ...banner,
            config,
            name: banner.name || 'Untitled Banner'
          }
        })
        
        setBanners(parsedBanners)
        if (parsedBanners.length > 0) {
          markHasEverCreatedBanner(session?.user?.id)
        }
        // Check if any banners need migration
        const hasOutdated = parsedBanners.some((banner: Banner) => banner.config && needsMigration(banner.config))
        setHasOutdatedBanners(hasOutdated)
        const ids = parsedBanners.map((b: Banner) => b.id)
        setShowInstallNudge(
          ids.length > 0 && !isInstallNudgeDismissed() && !anyInstallSnippetCopied(ids),
        )
      } else {
        console.error('Failed to fetch banners:', data?.error || 'Unknown error')
        setBanners([])
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
      toast.error('Failed to load banners. Please refresh the page.')
      setBanners([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTeamInfo = async () => {
    if (!session?.user?.currentTeamId) return

    try {
      const response = await fetch(`/api/teams/${session.user.currentTeamId}`)
      const data = await response.json()
      
      if (response.ok && data.success) {
        setTeamInfo({
          name: data.data.name,
          memberCount: data.data.memberCount || 1,
          userRole: data.data.userRole || 'owner'
        })
      }
    } catch (error) {
      console.error('Error fetching team info:', error)
    }
  }

  const deleteBanner = async (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return

    try {
      const response = await fetch(`/api/banners/simple/${bannerId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        markHasEverCreatedBanner(session?.user?.id)
        setBanners(prevBanners => prevBanners.filter(banner => banner.id !== bannerId))
        toast.success('Banner deleted successfully!')
      } else {
        const errorData = await response.json()
        toast.error(`Failed to delete banner: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast.error('Failed to delete banner')
    }
  }

  const toggleBanner = async (bannerId: string, isActive: boolean) => {
    try {
      console.log('🔄 Toggling banner:', { bannerId, currentState: isActive, newState: !isActive })
      
      const response = await fetch(`/api/banners/simple/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      })

      const responseData = await response.json()
      console.log('📡 Toggle response:', { status: response.status, data: responseData })

      if (response.ok) {
        setBanners(prevBanners =>
          prevBanners.map(banner =>
            banner.id === bannerId ? { ...banner, isActive: !isActive } : banner
          )
        )
        toast.success(`Banner ${!isActive ? 'activated' : 'deactivated'} successfully!`)
      } else {
        const errorMsg = responseData.error || responseData.details || 'Unknown error'
        const errorCode = responseData.code ? ` (${responseData.code})` : ''
        console.error('❌ Toggle failed:', { error: errorMsg, code: responseData.code, fullResponse: responseData })
        toast.error(`Failed to toggle banner status: ${errorMsg}${errorCode}`)
      }
    } catch (error) {
      console.error('❌ Error toggling banner status:', error)
      toast.error(`Failed to toggle banner status: ${error instanceof Error ? error.message : 'Network error'}`)
    }
  }

  const copyBannerCode = async (bannerId: string) => {
    try {
      const response = await fetch(`/api/banners/simple/${bannerId}/code`)
      if (!response.ok) {
        throw new Error('Failed to fetch banner code')
      }
      const data = await response.json()
      await copyToClipboard(data.code)
      markInstallSnippetCopied(bannerId)
      captureEvent('install_snippet_copied', {
        banner_id: bannerId,
        snippet_type: 'static',
        plan_tier: session?.user?.planTier || 'free',
        source: 'dashboard_card',
      })
      setShowInstallNudge(false)
      toast.success('Banner code copied to clipboard!')
    } catch (error) {
      console.error('Error copying banner code:', error)
      toast.error('Failed to copy banner code')
    }
  }

  const copyEmbedCode = async (bannerId: string) => {
    try {
      const embedCode = hostedInstallSnippet(bannerId, {
        showBranding: (session?.user?.planTier || 'free') === 'free',
      })
      const { showedHelp } = await copyHostedSnippet({
        snippet: embedCode,
        bannerId,
        source: 'dashboard_card',
        planTier: session?.user?.planTier || 'free',
      })
      setShowInstallNudge(false)
      if (!showedHelp) {
        toast.success('Install snippet copied — paste it in your site header', {
          duration: 4000,
        })
      }
    } catch (error) {
      console.error('Error copying embed code:', error)
      toast.error('Failed to copy install snippet')
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-purple-600" />
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600" />
      case 'editor':
        return <Edit className="h-4 w-4 text-green-600" />
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-800'
      case 'admin':
        return 'bg-blue-100 text-blue-800'
      case 'editor':
        return 'bg-green-100 text-green-800'
      case 'viewer':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredBanners = banners.filter(banner =>
    banner.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    return null // Should redirect via useEffect
  }

  const hasEverCreatedBanner = readHasEverCreatedBanner(session?.user?.id)
  const redirectZeroBanner = shouldRedirectZeroBannerToBuilder({
    isLoading,
    bannerCount: banners.length,
    hasEverCreatedBanner,
  })
  const showZeroBannerEmpty = shouldShowZeroBannerEmptyState({
    isLoading,
    bannerCount: banners.length,
    hasEverCreatedBanner,
  })
  const showSearchEmpty = shouldShowBannerSearchEmpty({
    bannerCount: banners.length,
    filteredCount: filteredBanners.length,
    searchTerm,
  })

  if (redirectZeroBanner) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (showZeroBannerEmpty) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <Card className="p-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-10 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Create a new banner</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  You do not have a cookie banner yet. Start here — you can open Analytics, Team, and Docs after this one is saved.
                </p>
                <Link href={CREATE_NEW_BANNER_HREF}>
                  <Button size="lg" className="h-12 px-8 text-base">
                    Create a new banner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                {shouldShowUpgradeCta(session.user?.planTier) && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Need Law 25 geo-targeting, GPC controls, and no branding?{' '}
                    <Link href="/upgrade" className="text-primary font-medium hover:underline">
                      Upgrade to Pro — $99/year
                    </Link>
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <InstallHelpDialog />
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Cookie Banner' }]} />

        {hasOutdatedBanners && (
          <UpdateNotification 
            isVisible={hasOutdatedBanners}
            onDismiss={() => setHasOutdatedBanners(false)}
          />
        )}

        {showInstallNudge && banners[0] && (
          <Card className="border-2 border-primary">
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="font-semibold">Last step: install your banner</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Copy the snippet and paste it in your site&apos;s &lt;head&gt;. Until you do, visitors won&apos;t see the banner.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button onClick={() => copyEmbedCode(banners[0].id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy install snippet
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/builder?id=${banners[0].id}&tab=code`}>
                    Open installer
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Dismiss install reminder"
                  onClick={() => {
                    dismissInstallNudge()
                    setShowInstallNudge(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Context */}
        {teamInfo && (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">{teamInfo.name}</h3>
                    <p className="text-sm text-blue-700">
                      {teamInfo.memberCount} {teamInfo.memberCount === 1 ? 'member' : 'members'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getRoleIcon(teamInfo.userRole || '')}
                  <Badge className={getRoleBadgeColor(teamInfo.userRole || '')}>
                    {teamInfo.userRole || 'member'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cookie Banners</h1>
            <p className="text-muted-foreground">
              {filteredBanners.length} {filteredBanners.length === 1 ? 'banner' : 'banners'} in your team
            </p>
          </div>
          <Button asChild size="lg">
            <Link href={CREATE_NEW_BANNER_HREF}>
              <Plus className="w-5 h-5 mr-2" />
              Create New Banner
            </Link>
          </Button>
        </div>


        {/* Filters and Search */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search banners..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Banners List/Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : showSearchEmpty ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-3">No banners match “{searchTerm}”.</p>
              <Button variant="link" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredBanners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onToggle={toggleBanner}
                onDelete={deleteBanner}
                onCopy={copyBannerCode}
                onCopyEmbed={copyEmbedCode}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
