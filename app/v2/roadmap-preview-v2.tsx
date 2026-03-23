'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Map, Clock, CheckCircle, Lightbulb } from 'lucide-react'
import Link from 'next/link'

/**
 * V2 RoadmapPreview — A/B test variant
 *
 * Changes from V1:
 * 1. Added font-heading to h2
 * 2. Replaced hardcoded colors (gray-900, gray-600, red-50/blue-50) with design system tokens
 * 3. Loading skeleton uses bg-muted instead of bg-gray-200
 */

interface RoadmapItem {
  id: number
  title: string
  description: string
  category: string
  status: string
  vote_count: number
  priority: number
}

const iconMap: Record<string, string> = {
  'analytics': '📊',
  'collaboration': '👥',
  'localization': '🌍',
  'compliance': '🛡️',
  'design': '🎨',
  'optimization': '⚡'
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  'in-progress': { label: 'In Progress', color: 'bg-primary', icon: Clock },
  'planned': { label: 'Planned', color: 'bg-muted-foreground', icon: Lightbulb },
  'completed': { label: 'Completed', color: 'bg-emerald-600', icon: CheckCircle }
}

export function RoadmapPreviewV2() {
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
              {/* V2: Use bg-muted instead of bg-gray-200 */}
              <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded"></div>
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
            <Badge className="mb-4">
              <Map className="w-4 h-4 mr-2" />
              Product Roadmap
            </Badge>
            {/* V2: Added font-heading */}
            <h2 className="font-heading text-3xl font-bold mb-4">
              What We&apos;re Building Next
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              See the most requested features and vote on what matters to you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {topItems.map((item) => {
              const StatusIcon = statusConfig[item.status]?.icon || Lightbulb
              const categoryIcon = iconMap[item.category] || '📋'

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
                            {statusConfig[item.status]?.label || 'Planned'}
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

          {/* V2: Use design system colors instead of hardcoded red-50/blue-50 */}
          <Card className="mb-8 bg-muted/50 border-border">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Canadian Compliance Features Coming Soon
                </h3>
                <p className="text-muted-foreground mb-4">
                  We&apos;re working on advanced compliance features for Canadian privacy laws
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary">Server-side Consent Logging</Badge>
                  <Badge variant="secondary">Geolocation Targeting</Badge>
                  <Badge variant="secondary">Data Residency Info</Badge>
                  <Badge variant="secondary">Legal Updates</Badge>
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
