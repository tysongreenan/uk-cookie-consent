'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Map, Clock, CheckCircle, Lightbulb } from '@phosphor-icons/react'
import Link from 'next/link'

interface RoadmapItem {
  id: number
  title: string
  description: string
  category: string
  status: string
  vote_count: number
  priority: number
}

const iconMap = {
  'analytics': '📊',
  'collaboration': '👥',
  'localization': '🌍',
  'compliance': '🛡️',
  'design': '🎨',
  'optimization': '⚡'
}

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-blue-500', icon: Clock },
  'planned': { label: 'Planned', color: 'bg-gray-500', icon: Lightbulb },
  'completed': { label: 'Completed', color: 'bg-green-500', icon: CheckCircle }
}

export function RoadmapPreview() {
  const [topItems, setTopItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTopRoadmapItems()
  }, [])

  const fetchTopRoadmapItems = async () => {
    try {
      const response = await fetch('/api/roadmap')
      if (response.ok) {
        const data = await response.json()
        // Get top 4 voted items
        const sorted = data.items.sort((a: RoadmapItem, b: RoadmapItem) => b.vote_count - a.vote_count)
        setTopItems(sorted.slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching roadmap items:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500 text-white">
              <Map className="w-4 h-4 mr-2" />
              Product Roadmap
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              What We're Building Next
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              See the most requested features and vote on what matters to you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {topItems.map((item) => {
              const StatusIcon = statusConfig[item.status as keyof typeof statusConfig]?.icon || Lightbulb
              const statusColor = statusConfig[item.status as keyof typeof statusConfig]?.color || 'bg-gray-500'
              const categoryIcon = iconMap[item.category as keyof typeof iconMap] || '📋'
              
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{categoryIcon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg leading-tight mb-2">
                          {item.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[item.status as keyof typeof statusConfig]?.label || 'Planned'}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.vote_count} votes
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Compliance features coming soon */}
          <Card className="mb-8 bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Canadian Compliance Features Coming Soon
                </h3>
                <p className="text-gray-600 mb-4">
                  We're working on advanced compliance features for Canadian privacy laws
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-red-100 text-red-800">Server-side Consent Logging</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Geolocation Targeting</Badge>
                  <Badge className="bg-green-100 text-green-800">Data Residency Info</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Legal Updates</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/roadmap">
                View Full Roadmap
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
