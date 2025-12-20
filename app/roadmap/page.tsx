'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
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
  ArrowRight,
  Search,
  X,
  ExternalLink
} from '@phosphor-icons/react'

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

interface SearchResult {
  id: number
  title: string
  description: string
  category?: string
  status?: string
  type: 'roadmap' | 'suggestion'
  votes?: number
}

export default function RoadmapPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [items, setItems] = useState<RoadmapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuggestForm, setShowSuggestForm] = useState(false)
  const [newSuggestion, setNewSuggestion] = useState({ title: '', description: '', category: '' })
  const [voting, setVoting] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const [userSuggestions, setUserSuggestions] = useState<any[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Fetch roadmap items
  useEffect(() => {
    fetchRoadmapItems()
  }, [])

  // Fetch user's suggestions when logged in
  useEffect(() => {
    if (session) {
      fetchUserSuggestions()
    }
  }, [session])

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

  const fetchUserSuggestions = async () => {
    if (!session) return
    
    setLoadingSuggestions(true)
    try {
      const response = await fetch('/api/roadmap/suggestions')
      if (response.ok) {
        const data = await response.json()
        setUserSuggestions(data.suggestions || [])
      } else {
        console.error('Failed to fetch user suggestions')
      }
    } catch (error) {
      console.error('Error fetching user suggestions:', error)
    } finally {
      setLoadingSuggestions(false)
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

  // Search for related features
  const searchFeatures = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(`/api/roadmap/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        const results: SearchResult[] = [
          ...(data.roadmapItems || []).map((item: any) => ({
            ...item,
            type: 'roadmap' as const
          })),
          ...(data.suggestions || []).map((item: any) => ({
            ...item,
            type: 'suggestion' as const
          }))
        ]
        setSearchResults(results)
        setShowSearchResults(results.length > 0)
      }
    } catch (error) {
      console.error('Error searching features:', error)
    } finally {
      setIsSearching(false)
    }
  }

  // Debounced search handler
  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setNewSuggestion({ ...newSuggestion, title: value })

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    // Set new timeout for debounced search
    if (value.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        searchFeatures(value)
      }, 300)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  // Select a search result
  const handleSelectResult = (result: SearchResult) => {
    setNewSuggestion({
      title: result.title,
      description: result.description,
      category: result.category || ''
    })
    setSearchQuery(result.title)
    setShowSearchResults(false)
    setSearchResults([])
  }

  const handleSubmitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)
    
    // Use searchQuery if it's different from newSuggestion.title (user typed but didn't select)
    const titleToSubmit = searchQuery || newSuggestion.title
    if (!titleToSubmit || !newSuggestion.description || !session) {
      setSubmitError('Please fill in both title and description')
      return
    }

    try {
      const response = await fetch('/api/roadmap/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titleToSubmit,
          description: newSuggestion.description,
          category: newSuggestion.category
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setNewSuggestion({ title: '', description: '', category: '' })
        setSearchQuery('')
        setSearchResults([])
        setShowSearchResults(false)
        setSubmitSuccess(true)
        // Refresh user suggestions
        await fetchUserSuggestions()
        // Close form after 2 seconds
        setTimeout(() => {
          setShowSuggestForm(false)
          setSubmitSuccess(false)
        }, 2000)
      } else {
        // Show detailed error message
        let errorMessage = data.error || 'Failed to submit suggestion. Please try again.'
        
        // Add helpful context based on error code
        if (data.code === 'TABLE_NOT_FOUND') {
          errorMessage = 'Database setup issue: The FeatureSuggestion table does not exist. Please contact support.'
        } else if (data.code === 'PERMISSION_DENIED') {
          errorMessage = 'Permission error: Database permissions need to be configured. Please contact support.'
        } else if (data.details) {
          errorMessage = `${errorMessage}\n\nDetails: ${data.details}`
        }
        
        setSubmitError(errorMessage)
        console.error('Failed to submit suggestion:', data)
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

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
      <Header />
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
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSearchResults(false)
            }
          }}
        >
          <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Suggest a New Feature</CardTitle>
              <CardDescription>
                Help us build the features you need most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSuggestion} className="space-y-4">
                {/* Success Message */}
                {submitSuccess && (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your suggestion has been submitted successfully! It will be reviewed and may be added to our roadmap.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error Message */}
                {submitError && (
                  <Alert variant="destructive">
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}

                <div className="relative">
                  <label className="text-sm font-medium mb-2 block">Feature Title</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Start typing to search existing features..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onFocus={() => {
                        if (searchResults.length > 0) {
                          setShowSearchResults(true)
                        }
                      }}
                      className="pl-10 pr-10"
                      required
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('')
                          setNewSuggestion({ ...newSuggestion, title: '' })
                          setSearchResults([])
                          setShowSearchResults(false)
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Search Results Dropdown */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      <div className="p-2 text-xs font-semibold text-muted-foreground uppercase border-b border-border">
                        Related Features Found ({searchResults.length})
                      </div>
                      {searchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() => handleSelectResult(result)}
                          className="w-full text-left p-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{result.title}</span>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs"
                                >
                                  {result.type === 'roadmap' ? 'Roadmap' : 'Suggestion'}
                                </Badge>
                                {result.status && (
                                  <Badge 
                                    className={`text-xs ${
                                      result.status === 'completed' ? 'bg-green-100 text-green-800' :
                                      result.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {result.status}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {result.description}
                              </p>
                              {result.category && (
                                <span className="text-xs text-muted-foreground mt-1 inline-block">
                                  Category: {result.category}
                                </span>
                              )}
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                          </div>
                        </button>
                      ))}
                      <div className="p-2 border-t border-border bg-muted/50">
                        <p className="text-xs text-muted-foreground text-center">
                          Not finding what you're looking for? Continue typing to submit a new feature.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {isSearching && (
                    <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        Searching...
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Description
                    {newSuggestion.description && searchResults.length > 0 && (
                      <span className="text-xs text-muted-foreground ml-2">
                        (You can edit this if you selected a related feature)
                      </span>
                    )}
                  </label>
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
                    onClick={() => {
                      setShowSuggestForm(false)
                      setNewSuggestion({ title: '', description: '', category: '' })
                      setSearchQuery('')
                      setSearchResults([])
                      setShowSearchResults(false)
                      setSubmitError(null)
                      setSubmitSuccess(false)
                    }}
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

      {/* User's Submitted Suggestions */}
      {session && (
        <section className="py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Suggestions</h2>
                  <p className="text-muted-foreground">
                    Track the status of features you've suggested
                  </p>
                </div>
                <Button onClick={() => setShowSuggestForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Suggestion
                </Button>
              </div>

              {loadingSuggestions ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading your suggestions...</p>
                </div>
              ) : userSuggestions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No suggestions yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to suggest a feature! Your ideas help shape our product.
                    </p>
                    <Button onClick={() => setShowSuggestForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Suggest a Feature
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {userSuggestions.map((suggestion) => (
                    <Card key={suggestion.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{suggestion.title}</CardTitle>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge 
                                variant="outline"
                                className={
                                  suggestion.status === 'accepted' ? 'bg-green-100 text-green-800 border-green-300' :
                                  suggestion.status === 'under-review' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                  suggestion.status === 'rejected' ? 'bg-red-100 text-red-800 border-red-300' :
                                  'bg-gray-100 text-gray-800 border-gray-300'
                                }
                              >
                                {suggestion.status === 'pending' ? 'Pending Review' :
                                 suggestion.status === 'under-review' ? 'Under Review' :
                                 suggestion.status === 'accepted' ? 'Accepted' :
                                 suggestion.status === 'rejected' ? 'Not Planned' :
                                 suggestion.status}
                              </Badge>
                              {suggestion.category && (
                                <Badge variant="outline">{suggestion.category}</Badge>
                              )}
                              {suggestion.votes > 0 && (
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" />
                                  {suggestion.votes} votes
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{suggestion.description}</p>
                        <div className="text-xs text-muted-foreground">
                          Submitted {new Date(suggestion.createdAt).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
      <Footer />
    </div>
  )
}
