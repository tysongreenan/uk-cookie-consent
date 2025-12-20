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
      fetchBanners().catch(err => {
        console.error('Failed to fetch banners:', err)
        setIsLoading(false)
      })
      fetchTeamInfo().catch(err => {
        console.error('Failed to fetch team info:', err)
      })
    }
  }, [session])

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
        // Check if any banners need migration
        const hasOutdated = parsedBanners.some((banner: Banner) => banner.config && needsMigration(banner.config))
        setHasOutdatedBanners(hasOutdated)
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
