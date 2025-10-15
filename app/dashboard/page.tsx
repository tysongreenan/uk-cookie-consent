'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { UpdateNotification } from '@/components/dashboard/update-notification'
import { needsMigration } from '@/lib/banner-migration'

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
      const response = await fetch('/api/banners')
      const data = await response.json()
      
      if (response.ok) {
        setBanners(data.banners)
        // Check if any banners need migration
        const hasOutdated = data.banners.some((banner: Banner) => needsMigration(banner.config))
        setHasOutdatedBanners(hasOutdated)
      } else {
        console.error('Failed to fetch banners:', data.error)
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CC</span>
                </div>
                <h1 className="text-xl font-bold">Cookie Consent Builder</h1>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                  </span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{session.user?.name || 'User'}</div>
                  <div className="text-muted-foreground text-xs">{session.user?.email}</div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-3 p-2 rounded-lg bg-primary text-primary-foreground">
              <img 
                src="/logos/logo.svg" 
                alt="Cookie Banner Generator" 
                width="20"
                height="20"
                className="w-5 h-5 text-white"
              />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
              <div className="w-5 h-5"></div>
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Update Notification */}
          <UpdateNotification
            isVisible={hasOutdatedBanners}
            onDismiss={() => setHasOutdatedBanners(false)}
            onUpdateBanner={() => {
              // Scroll to banners section
              document.querySelector('.banners-grid')?.scrollIntoView({ behavior: 'smooth' })
            }}
          />

          {/* Project Creation Form */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Enter project name"
                className="flex-1 max-w-md"
                id="project-name"
              />
              <Link href="/dashboard/builder">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Start New Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Projects Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Your Projects</h2>
              <p className="text-muted-foreground">Manage your cookie consent banners</p>
            </div>
            
            {/* Search and Sort */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search projects..."
                  className="w-64 pl-8"
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  🔍
                </div>
              </div>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading projects...</p>
            </div>
          ) : banners.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Plus className="h-8 w-8 opacity-50" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                <p className="text-sm">Create your first cookie consent banner to get started</p>
              </div>
              <Link href="/dashboard/builder">
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Banner
                </Button>
              </Link>
            </div>
          ) : (
            <div className="banners-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {banners.map((banner) => (
                <Card key={banner.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className="relative">
                    {/* Project Thumbnail */}
                    <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">🍪</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Cookie Banner</p>
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm truncate">{banner.name}</h3>
                        {banner.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 ml-2" title="Active"></div>
                        )}
                      </div>
                      
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>Position: {banner.config.position}</p>
                        <p>Theme: {banner.config.theme}</p>
                        <p>Scripts: {
                          (banner.config.scripts?.strictlyNecessary?.length || 0) +
                          (banner.config.scripts?.functionality?.length || 0) +
                          (banner.config.scripts?.trackingPerformance?.length || 0) +
                          (banner.config.scripts?.targetingAdvertising?.length || 0)
                        } configured</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/builder?edit=${banner.id}`}>
                            <Edit className="mr-1 h-3 w-3" />
                            Edit
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteBanner(banner.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}