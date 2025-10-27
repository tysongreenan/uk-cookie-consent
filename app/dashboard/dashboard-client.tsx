'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Filter, Grid, List, Users, Crown, Shield, Edit, Eye } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { UpdateNotification } from '@/components/dashboard/update-notification'
import { needsMigration } from '@/lib/banner-migration'
import { NewBadge } from '@/components/ui/new-badge'
import { CURRENT_BANNER_VERSION } from '@/lib/banner-migration'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { BannerCard } from '@/components/dashboard/banner-card'

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
  const { data: session, status } = useSession()
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid') // 'grid' or 'list'
  const [hasOutdatedBanners, setHasOutdatedBanners] = useState(false)
  const [teamInfo, setTeamInfo] = useState<{ name: string; memberCount: number; userRole: string } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchBanners()
      fetchTeamInfo()
    }
  }, [session])

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners/simple')
      const data = await response.json()
      
      if (response.ok) {
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
            config
          }
        })
        
        setBanners(parsedBanners)
        // Check if any banners need migration
        const hasOutdated = parsedBanners.some((banner: Banner) => banner.config && needsMigration(banner.config))
        setHasOutdatedBanners(hasOutdated)
      } else {
        console.error('Failed to fetch banners:', data.error)
        setBanners([])
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
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
      const response = await fetch(`/api/banners/simple/${bannerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        setBanners(prevBanners =>
          prevBanners.map(banner =>
            banner.id === bannerId ? { ...banner, isActive: !isActive } : banner
          )
        )
        toast.success(`Banner ${!isActive ? 'activated' : 'deactivated'} successfully!`)
      } else {
        const errorData = await response.json()
        toast.error(`Failed to toggle banner status: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error toggling banner status:', error)
      toast.error('Failed to toggle banner status')
    }
  }

  const copyBannerCode = async (bannerId: string) => {
    try {
      const response = await fetch(`/api/banners/simple/${bannerId}/code`)
      if (!response.ok) {
        throw new Error('Failed to fetch banner code')
      }
      const data = await response.json()
      await navigator.clipboard.writeText(data.code)
      toast.success('Banner code copied to clipboard!')
    } catch (error) {
      console.error('Error copying banner code:', error)
      toast.error('Failed to copy banner code')
    }
  }

  const copyEmbedCode = async (bannerId: string) => {
    try {
      const embedCode = `<script src="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/banner.js?id=${session?.user?.id}"></script>`
      await navigator.clipboard.writeText(embedCode)
      toast.success('Embed code copied to clipboard!', {
        duration: 4000,
        icon: '🚀',
        style: {
          background: '#10b981',
          color: 'white',
        },
      })
    } catch (error) {
      console.error('Error copying embed code:', error)
      toast.error('Failed to copy embed code')
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
    banner.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Cookie Banner' }]} />

        {hasOutdatedBanners && (
          <UpdateNotification 
            isVisible={hasOutdatedBanners}
            onDismiss={() => setHasOutdatedBanners(false)}
          />
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
            <Link href="/dashboard/builder">
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
        ) : filteredBanners.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Banners Found</h3>
              <p className="text-muted-foreground mb-6">
                It looks like you haven't created any cookie banners yet.
              </p>
              <Link href="/dashboard/builder">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Banner
                </Button>
              </Link>
              {searchTerm && (
                <Button variant="link" onClick={() => setSearchTerm('')} className="mt-4">
                  Clear Search
                </Button>
              )}
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
