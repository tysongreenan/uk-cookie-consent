'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Grid, List } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { UpdateNotification } from '@/components/dashboard/update-notification'
import { needsMigration } from '@/lib/banner-migration'
import { NewBadge } from '@/components/ui/new-badge'
import { CURRENT_BANNER_VERSION } from '@/lib/banner-migration'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { BannerCard } from '@/components/dashboard/banner-card'
import { Badge } from '@/components/ui/badge'

interface Banner {
  id: string
  name: string
  config: any
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasOutdatedBanners, setHasOutdatedBanners] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchBanners()
    }
  }, [session])

  const fetchBanners = async () => {
    try {
      console.log('Fetching banners for user:', session?.user?.id)
      const response = await fetch('/api/banners')
      const data = await response.json()
      
      console.log('Banners API response:', { status: response.status, data })
      
      if (response.ok) {
        setBanners(data.banners || [])
        // Check if any banners need migration
        const hasOutdated = (data.banners || []).some((banner: Banner) => banner.config && needsMigration(banner.config))
        setHasOutdatedBanners(hasOutdated)
        console.log('Banners loaded:', data.banners?.length || 0)
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

  const deleteBanner = async (bannerId: string) => {
    try {
      const response = await fetch(`/api/banners/${bannerId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        toast.success('Banner deleted successfully')
        fetchBanners() // Refresh the list
      } else {
        toast.error(data.error || 'Failed to delete banner')
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      toast.error('Failed to delete banner')
    }
  }

  const toggleBanner = async (bannerId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/banners/${bannerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      })
      
      if (response.ok) {
        toast.success(`Banner ${isActive ? 'activated' : 'deactivated'}`)
        fetchBanners()
      } else {
        toast.error('Failed to update banner status')
      }
    } catch (error) {
      console.error('Error updating banner:', error)
      toast.error('Failed to update banner status')
    }
  }

  const copyBannerCode = async (bannerId: string) => {
    try {
      const response = await fetch(`/api/banners/${bannerId}/code`)
      const data = await response.json()
      
      if (response.ok) {
        await navigator.clipboard.writeText(data.code)
        toast.success('Banner code copied to clipboard')
      } else {
        toast.error('Failed to copy banner code')
      }
    } catch (error) {
      console.error('Error copying banner code:', error)
      toast.error('Failed to copy banner code')
    }
  }

  const filteredBanners = banners.filter(banner =>
    banner.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Filter out banners with invalid configs and log for debugging
  const validBanners = filteredBanners.filter(banner => {
    if (!banner.config) {
      console.warn('Banner with invalid config:', banner.id, banner.name)
      return false
    }
    return true
  })

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Dashboard' }]} />

        {/* Update Notification */}
        {hasOutdatedBanners && (
          <UpdateNotification 
            isVisible={hasOutdatedBanners}
            onDismiss={() => setHasOutdatedBanners(false)}
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cookie Banners</h1>
            <p className="text-muted-foreground">
              Manage and customize your GDPR-compliant cookie consent banners
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard/builder">
              <Plus className="w-5 h-5 mr-2" />
              Create New Banner
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{validBanners.length}</div>
              <p className="text-xs text-muted-foreground">
                {validBanners.filter(b => b.isActive).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {validBanners.filter(b => b.isActive).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently deployed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Updated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {validBanners.filter(b => needsMigration(b.config)).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-xs text-muted-foreground">
                GDPR & PIPEDA ready
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search banners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Banners Grid/List */}
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : validBanners.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? 'No banners found' : 'No banners yet'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? `No banners match "${searchTerm}". Try adjusting your search.`
                  : 'Create your first cookie consent banner to get started'
                }
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/dashboard/builder">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Banner
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {validBanners.map((banner) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                onToggle={toggleBanner}
                onDelete={deleteBanner}
                onCopy={copyBannerCode}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}