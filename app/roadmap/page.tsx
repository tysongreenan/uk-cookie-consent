'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Map, 
  Plus, 
  ThumbsUp, 
  Clock, 
  CheckCircle, 
  Lightbulb,
  Zap,
  Users,
  BarChart3,
  Globe,
  Shield,
  Settings,
  ArrowRight
} from 'lucide-react'

// This will be populated from the API
const iconMap = {
  'analytics': BarChart3,
  'collaboration': Users,
  'localization': Globe,
  'compliance': Shield,
  'design': Settings,
  'optimization': Zap
}

const colorMap = {
  'analytics': 'blue',
  'collaboration': 'green',
  'localization': 'purple',
  'compliance': 'red',
  'design': 'orange',
  'optimization': 'yellow'
}

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-blue-500', icon: Clock },
  'planned': { label: 'Planned', color: 'bg-gray-500', icon: Lightbulb },
  'completed': { label: 'Completed', color: 'bg-green-500', icon: CheckCircle }
}

const categoryConfig = {
  'analytics': { label: 'Analytics', color: 'bg-blue-100 text-blue-800' },
  'collaboration': { label: 'Collaboration', color: 'bg-green-100 text-green-800' },
  'localization': { label: 'Localization', color: 'bg-purple-100 text-purple-800' },
  'compliance': { label: 'Compliance', color: 'bg-red-100 text-red-800' },
  'design': { label: 'Design', color: 'bg-orange-100 text-orange-800' },
  'optimization': { label: 'Optimization', color: 'bg-yellow-100 text-yellow-800' }
}

interface RoadmapItem {
  id: number
  title: string
  description: string
  category: string
  status: string
  vote_count: number
  userVoted: boolean
  priority: number
}

export default function RoadmapPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [items, setItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuggestForm, setShowSuggestForm] = useState(false)
  const [newSuggestion, setNewSuggestion] = useState({ title: '', description: '', category: '' })
  const [voting, setVoting] = useState<number | null>(null)

  // Fetch roadmap items
  useEffect(() => {
    fetchRoadmapItems()
  }, [])

  const fetchRoadmapItems = async () => {
    try {
      const response = await fetch('/api/roadmap')
      if (response.ok) {
        const data = await response.json()
        setItems(data.items)
      } else {
        console.error('Failed to fetch roadmap items')
      }
    } catch (error) {
      console.error('Error fetching roadmap items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (itemId: number, currentVoted: boolean) => {
    if (!session) {
      // Redirect to login if not authenticated
      router.push('/auth/signin?callbackUrl=/roadmap')
      return
    }

    setVoting(itemId)
    try {
      const response = await fetch('/api/roadmap/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roadmapItemId: itemId,
          action: currentVoted ? 'unvote' : 'vote'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Update the item with new vote count and status
        setItems(items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              vote_count: data.voteCount,
              userVoted: data.userVoted
            }
          }
          return item
        }))
      } else {
        console.error('Failed to vote')
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoting(null)
    }
  }

  const handleSubmitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSuggestion.title || !newSuggestion.description || !session) return

    try {
      const response = await fetch('/api/roadmap/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSuggestion),
      })

      if (response.ok) {
        setNewSuggestion({ title: '', description: '', category: '' })
        setShowSuggestForm(false)
        // Show success message
        alert('Thank you for your suggestion! We\'ll review it and may add it to our roadmap.')
      } else {
        console.error('Failed to submit suggestion')
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error)
    }
  }

  // Show loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading roadmap...</p>
        </div>
      </div>
    )
  }

  const sortedItems = [...items].sort((a, b) => b.vote_count - a.vote_count)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <Map className="w-4 h-4 mr-2" />
              Product Roadmap
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Help Shape Our Future
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Vote on features you'd like to see and suggest new ideas. Your feedback helps us build the tools you need.
            </p>
            <Button 
              size="lg" 
              onClick={() => {
                if (!session) {
                  router.push('/auth/signin?callbackUrl=/roadmap')
                } else {
                  setShowSuggestForm(true)
                }
              }}
              className="mb-4"
              title={!session ? "Sign in to suggest features" : undefined}
            >
              <Plus className="w-5 h-5 mr-2" />
              Suggest a Feature
              {!session && (
                <span className="text-xs opacity-70 ml-2">(Login required)</span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Suggestion Form Modal */}
      {showSuggestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Suggest a New Feature</CardTitle>
              <CardDescription>
                Help us build the features you need most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSuggestion} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Feature Title</label>
                  <Input
                    placeholder="e.g., Advanced Analytics Dashboard"
                    value={newSuggestion.title}
                    onChange={(e) => setNewSuggestion({...newSuggestion, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe the feature and how it would help you..."
                    value={newSuggestion.description}
                    onChange={(e) => setNewSuggestion({...newSuggestion, description: e.target.value})}
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Input
                    placeholder="e.g., Analytics, Design, Compliance"
                    value={newSuggestion.category}
                    onChange={(e) => setNewSuggestion({...newSuggestion, category: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowSuggestForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Suggestion
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Kanban Board */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Planned Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold">Planned</h3>
                  <Badge variant="outline" className="ml-auto">
                    {sortedItems.filter(item => item.status === 'planned').length}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {sortedItems
                    .filter(item => item.status === 'planned')
                    .map((item) => {
                      const categoryInfo = categoryConfig[item.category as keyof typeof categoryConfig]
                      const ItemIcon = iconMap[item.category as keyof typeof iconMap] || Settings
                      const itemColor = colorMap[item.category as keyof typeof colorMap] || 'blue'
                      
                      return (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${itemColor}-100 flex-shrink-0`}>
                                <ItemIcon className={`w-4 h-4 text-${itemColor}-600`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-sm font-semibold leading-tight mb-1">
                                  {item.title}
                                </CardTitle>
                                <Badge className={categoryInfo?.color || 'bg-gray-100 text-gray-800'} >
                                  {categoryInfo?.label || 'Other'}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Button
                                variant={item.userVoted ? "default" : "outline"}
                                onClick={() => handleVote(item.id, item.userVoted)}
                                disabled={voting === item.id}
                                className="flex items-center space-x-1"
                                title={!session ? "Sign in to vote on features" : undefined}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs">{item.vote_count}</span>
                              </Button>
                              <span className="text-xs text-muted-foreground">
                                Priority {item.priority}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold">In Progress</h3>
                  <Badge variant="outline" className="ml-auto">
                    {sortedItems.filter(item => item.status === 'in-progress').length}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {sortedItems
                    .filter(item => item.status === 'in-progress')
                    .map((item) => {
                      const categoryInfo = categoryConfig[item.category as keyof typeof categoryConfig]
                      const ItemIcon = iconMap[item.category as keyof typeof iconMap] || Settings
                      const itemColor = colorMap[item.category as keyof typeof colorMap] || 'blue'
                      
                      return (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${itemColor}-100 flex-shrink-0`}>
                                <ItemIcon className={`w-4 h-4 text-${itemColor}-600`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-sm font-semibold leading-tight mb-1">
                                  {item.title}
                                </CardTitle>
                                <Badge className={categoryInfo?.color || 'bg-gray-100 text-gray-800'} >
                                  {categoryInfo?.label || 'Other'}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Button
                                variant={item.userVoted ? "default" : "outline"}
                                onClick={() => handleVote(item.id, item.userVoted)}
                                disabled={voting === item.id}
                                className="flex items-center space-x-1"
                                title={!session ? "Sign in to vote on features" : undefined}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs">{item.vote_count}</span>
                              </Button>
                              <span className="text-xs text-muted-foreground">
                                Priority {item.priority}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>

              {/* Completed Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold">Completed</h3>
                  <Badge variant="outline" className="ml-auto">
                    {sortedItems.filter(item => item.status === 'completed').length}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {sortedItems
                    .filter(item => item.status === 'completed')
                    .map((item) => {
                      const categoryInfo = categoryConfig[item.category as keyof typeof categoryConfig]
                      const ItemIcon = iconMap[item.category as keyof typeof iconMap] || Settings
                      const itemColor = colorMap[item.category as keyof typeof colorMap] || 'blue'
                      
                      return (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer border-green-200">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${itemColor}-100 flex-shrink-0`}>
                                <ItemIcon className={`w-4 h-4 text-${itemColor}-600`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-sm font-semibold leading-tight mb-1">
                                  {item.title}
                                </CardTitle>
                                <Badge className={categoryInfo?.color || 'bg-gray-100 text-gray-800'} >
                                  {categoryInfo?.label || 'Other'}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-600" />
                                <span className="text-xs text-green-600 font-medium">Completed</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {item.vote_count} votes
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Recent Updates</h2>
              <p className="text-muted-foreground">
                See what we've been working on
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                    <CardTitle className="text-lg">Enhanced Preferences Modal</CardTitle>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Added advanced cookie category management with individual toggle controls, 
                    improved user experience, and better compliance features.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-blue-100 text-blue-800">
                      <Clock className="w-3 h-3 mr-1" />
                      In Progress
                    </Badge>
                    <CardTitle className="text-lg">Multi-Language Support</CardTitle>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Working on comprehensive translation system with automatic locale detection 
                    and support for 20+ languages including Spanish, French, German, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Have More Ideas?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We'd love to hear your suggestions and feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => {
                  if (!session) {
                    router.push('/auth/signin?callbackUrl=/roadmap')
                  } else {
                    setShowSuggestForm(true)
                  }
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Suggest Feature
                {!session && (
                  <span className="text-xs opacity-70 ml-2">(Login required)</span>
                )}
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:greenantyson@gmail.com">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
