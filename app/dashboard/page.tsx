'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Settings, BarChart3, Code, Palette, Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

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
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cookie Consent Builder</h1>
            <p className="text-muted-foreground">Welcome back, {session.user?.name || session.user?.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Projects</h2>
          <p className="text-muted-foreground">Create and manage your cookie consent banners</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" asChild>
            <Link href="/dashboard/builder">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">New Project</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create a new cookie consent banner project
                </CardDescription>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" asChild>
            <Link href="/dashboard/builder">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Banner Builder</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Design and customize your consent banner
                </CardDescription>
              </CardContent>
            </Link>
          </Card>


          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                View banner performance and consent rates
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Manage your account and preferences
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Banners</h3>
          
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading banners...</p>
                </div>
              </CardContent>
            </Card>
          ) : banners.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">
                    <Plus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No banners yet</p>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/builder">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Banner
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((banner) => (
                <Card key={banner.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{banner.name}</CardTitle>
                        <CardDescription>
                          Created {new Date(banner.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        {banner.isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Active"></div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        <p>Position: {banner.config.position}</p>
                        <p>Theme: {banner.config.theme}</p>
                        <p>Scripts: {
                          (banner.config.scripts?.strictlyNecessary?.length || 0) +
                          (banner.config.scripts?.functionality?.length || 0) +
                          (banner.config.scripts?.trackingPerformance?.length || 0) +
                          (banner.config.scripts?.targetingAdvertising?.length || 0)
                        } configured</p>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button asChild size="sm" className="flex-1">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
