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
  ExternalLink,
  MessageSquare,
  ChevronUp,
  Sparkles,
  Reply,
  Send,
  ShieldCheck,
  Loader2
} from 'lucide-react'

const iconMap: Record<string, any> = {
  'analytics': BarChart3,
  'collaboration': Users,
  'localization': Globe,
  'compliance': Shield,
  'design': Settings,
  'optimization': Zap
}

const categoryConfig: Record<string, { label: string; color: string; accent: string }> = {
  'analytics': { label: 'Analytics', color: 'bg-blue-50 text-blue-700 border-blue-200', accent: 'text-blue-600' },
  'collaboration': { label: 'Collaboration', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: 'text-emerald-600' },
  'localization': { label: 'Localization', color: 'bg-violet-50 text-violet-700 border-violet-200', accent: 'text-violet-600' },
  'compliance': { label: 'Compliance', color: 'bg-rose-50 text-rose-700 border-rose-200', accent: 'text-rose-600' },
  'design': { label: 'Design', color: 'bg-amber-50 text-amber-700 border-amber-200', accent: 'text-amber-600' },
  'optimization': { label: 'Optimization', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', accent: 'text-cyan-600' }
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

interface Comment {
  id: number
  roadmapItemId: number
  userId: string
  parentId: number | null
  content: string
  isAdminReply: boolean
  userName: string
  createdAt: string
  replies: Comment[]
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
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({})
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [loadingComments, setLoadingComments] = useState<Record<number, boolean>>({})
  const [commentText, setCommentText] = useState<Record<number, string>>({})
  const [replyingTo, setReplyingTo] = useState<Record<number, number | null>>({})
  const [replyText, setReplyText] = useState<Record<number, string>>({})
  const [postingComment, setPostingComment] = useState(false)

  useEffect(() => {
    fetchRoadmapItems()
  }, [])

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
      }
    } catch (error) {
      console.error('Error fetching user suggestions:', error)
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const handleVote = async (itemId: number, currentVoted: boolean) => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/roadmap')
      return
    }

    setVoting(itemId)
    try {
      const response = await fetch('/api/roadmap/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roadmapItemId: itemId,
          action: currentVoted ? 'unvote' : 'vote'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setItems(items.map(item => {
          if (item.id === itemId) {
            return { ...item, vote_count: data.voteCount, userVoted: data.userVoted }
          }
          return item
        }))
      } else {
        const data = await response.json()
        console.error('Vote failed:', data.error)
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoting(null)
    }
  }

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
          ...(data.roadmapItems || []).map((item: any) => ({ ...item, type: 'roadmap' as const })),
          ...(data.suggestions || []).map((item: any) => ({ ...item, type: 'suggestion' as const }))
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setNewSuggestion({ ...newSuggestion, title: value })
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    if (value.length >= 2) {
      searchTimeoutRef.current = setTimeout(() => searchFeatures(value), 300)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    setNewSuggestion({ title: result.title, description: result.description, category: result.category || '' })
    setSearchQuery(result.title)
    setShowSearchResults(false)
    setSearchResults([])
  }

  const handleSubmitSuggestion = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)

    const titleToSubmit = searchQuery || newSuggestion.title
    if (!titleToSubmit || !newSuggestion.description || !session) {
      setSubmitError('Please fill in both title and description')
      return
    }

    try {
      const response = await fetch('/api/roadmap/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        await fetchUserSuggestions()
        setTimeout(() => {
          setShowSuggestForm(false)
          setSubmitSuccess(false)
        }, 2000)
      } else {
        let errorMessage = data.error || 'Failed to submit suggestion. Please try again.'
        if (data.code === 'TABLE_NOT_FOUND') {
          errorMessage = 'Database setup issue: The FeatureSuggestion table does not exist. Please contact support.'
        } else if (data.code === 'PERMISSION_DENIED') {
          errorMessage = 'Permission error: Database permissions need to be configured. Please contact support.'
        }
        setSubmitError(errorMessage)
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error)
      setSubmitError('Network error. Please check your connection and try again.')
    }
  }

  const toggleComments = async (itemId: number) => {
    const isOpen = !openComments[itemId]
    setOpenComments(prev => ({ ...prev, [itemId]: isOpen }))
    if (isOpen && !comments[itemId]) {
      await fetchComments(itemId)
    }
  }

  const fetchComments = async (itemId: number) => {
    setLoadingComments(prev => ({ ...prev, [itemId]: true }))
    try {
      const response = await fetch(`/api/roadmap/comments?roadmapItemId=${itemId}`)
      if (response.ok) {
        const data = await response.json()
        setComments(prev => ({ ...prev, [itemId]: data.comments || [] }))
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoadingComments(prev => ({ ...prev, [itemId]: false }))
    }
  }

  const handlePostComment = async (itemId: number, parentId?: number) => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/roadmap')
      return
    }

    const text = parentId ? replyText[parentId] : commentText[itemId]
    if (!text?.trim()) return

    setPostingComment(true)
    try {
      const response = await fetch('/api/roadmap/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roadmapItemId: itemId,
          content: text.trim(),
          parentId: parentId || null
        }),
      })

      if (response.ok) {
        if (parentId) {
          setReplyText(prev => ({ ...prev, [parentId]: '' }))
          setReplyingTo(prev => ({ ...prev, [itemId]: null }))
        } else {
          setCommentText(prev => ({ ...prev, [itemId]: '' }))
        }
        await fetchComments(itemId)
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setPostingComment(false)
    }
  }

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground text-sm">Loading roadmap...</p>
        </div>
      </div>
    )
  }

  const planned = [...items].filter(i => i.status === 'planned').sort((a, b) => b.vote_count - a.vote_count)
  const inProgress = [...items].filter(i => i.status === 'in-progress').sort((a, b) => b.vote_count - a.vote_count)
  const completed = [...items].filter(i => i.status === 'completed').sort((a, b) => b.vote_count - a.vote_count)

  const VoteButton = ({ item }: { item: RoadmapItem }) => (
    <button
      onClick={() => handleVote(item.id, item.userVoted)}
      disabled={voting === item.id}
      className={`
        flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border transition-all duration-200
        ${item.userVoted
          ? 'bg-primary/10 border-primary text-primary'
          : 'bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
        }
        ${voting === item.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      title={!session ? 'Sign in to vote' : item.userVoted ? 'Remove vote' : 'Vote for this feature'}
    >
      <ChevronUp className={`w-4 h-4 ${item.userVoted ? 'text-primary' : ''}`} />
      <span className="text-sm font-semibold">{item.vote_count}</span>
    </button>
  )

  const CommentThread = ({ comment, itemId }: { comment: Comment; itemId: number }) => (
    <div className="space-y-2">
      <div className={`rounded-lg p-3 ${comment.isAdminReply ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold">{comment.userName}</span>
          {comment.isAdminReply && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
              <ShieldCheck className="w-2.5 h-2.5" />
              Team
            </span>
          )}
          <span className="text-[10px] text-muted-foreground ml-auto">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed">{comment.content}</p>
        {session && (
          <button
            onClick={() => setReplyingTo(prev => ({
              ...prev,
              [itemId]: prev[itemId] === comment.id ? null : comment.id
            }))}
            className="text-[10px] text-muted-foreground hover:text-primary mt-1.5 flex items-center gap-1 transition-colors"
          >
            <Reply className="w-3 h-3" />
            Reply
          </button>
        )}
      </div>

      {/* Reply input */}
      {replyingTo[itemId] === comment.id && (
        <div className="ml-4 flex gap-2">
          <Input
            placeholder="Write a reply..."
            value={replyText[comment.id] || ''}
            onChange={(e) => setReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handlePostComment(itemId, comment.id)
              }
            }}
            className="text-xs h-8"
            disabled={postingComment}
          />
          <Button
            size="sm"
            className="h-8 px-2"
            onClick={() => handlePostComment(itemId, comment.id)}
            disabled={postingComment || !replyText[comment.id]?.trim()}
          >
            {postingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
          </Button>
        </div>
      )}

      {/* Nested replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-4 border-l-2 border-muted pl-3 space-y-2">
          {comment.replies.map(reply => (
            <div key={reply.id} className={`rounded-lg p-3 ${reply.isAdminReply ? 'bg-primary/5 border border-primary/20' : 'bg-muted/50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">{reply.userName}</span>
                {reply.isAdminReply && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Team
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {new Date(reply.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const RoadmapCard = ({ item, borderColor = 'border-border' }: { item: RoadmapItem; borderColor?: string }) => {
    const catInfo = categoryConfig[item.category] || { label: item.category, color: 'bg-gray-50 text-gray-700 border-gray-200', accent: 'text-gray-600' }
    const ItemIcon = iconMap[item.category] || Settings
    const isCommentsOpen = openComments[item.id]
    const itemComments = comments[item.id] || []
    const commentCount = itemComments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)

    return (
      <div className={`group bg-white rounded-xl border ${borderColor} hover:shadow-md transition-all duration-200`}>
        <div className="flex gap-3 p-4">
          <VoteButton item={item} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm leading-snug">{item.title}</h4>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-muted/50 flex-shrink-0`}>
                <ItemIcon className={`w-3.5 h-3.5 ${catInfo.accent}`} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${catInfo.color}`}>
                {catInfo.label}
              </Badge>
              <button
                onClick={() => toggleComments(item.id)}
                className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-md transition-colors ${
                  isCommentsOpen
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                {commentCount > 0 ? commentCount : 'Discuss'}
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {isCommentsOpen && (
          <div className="border-t px-4 py-3 space-y-3">
            {loadingComments[item.id] ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {itemComments.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
                {itemComments.map(comment => (
                  <CommentThread key={comment.id} comment={comment} itemId={item.id} />
                ))}

                {/* New comment input */}
                {session ? (
                  <div className="flex gap-2 pt-1">
                    <Input
                      placeholder="Share your thoughts on this feature..."
                      value={commentText[item.id] || ''}
                      onChange={(e) => setCommentText(prev => ({ ...prev, [item.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handlePostComment(item.id)
                        }
                      }}
                      className="text-xs h-8"
                      disabled={postingComment}
                    />
                    <Button
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handlePostComment(item.id)}
                      disabled={postingComment || !commentText[item.id]?.trim()}
                    >
                      {postingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => router.push('/auth/signin?callbackUrl=/roadmap')}
                    className="w-full text-xs text-muted-foreground hover:text-primary text-center py-2 transition-colors"
                  >
                    Sign in to join the discussion
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="border-b bg-[#FAFAF5]">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Map className="w-3.5 h-3.5" />
              Product Roadmap
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Help Shape What We Build Next
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Vote on the features that matter most to you, or suggest something new.
              Your feedback directly influences our priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => {
                  if (!session) {
                    router.push('/auth/signin?callbackUrl=/roadmap')
                  } else {
                    setShowSuggestForm(true)
                  }
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Suggest a Feature
                {!session && <span className="text-xs opacity-70 ml-1">(Login)</span>}
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#board">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Vote on Features
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Suggestion Form Modal */}
      {showSuggestForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuggestForm(false)
              setSubmitError(null)
              setSubmitSuccess(false)
            }
          }}
        >
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Suggest a Feature</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Help us build the tools you need
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSuggestForm(false)
                    setNewSuggestion({ title: '', description: '', category: '' })
                    setSearchQuery('')
                    setSearchResults([])
                    setShowSearchResults(false)
                    setSubmitError(null)
                    setSubmitSuccess(false)
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitSuggestion} className="p-6 space-y-4">
              {submitSuccess && (
                <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Suggestion submitted! We'll review it and may add it to our roadmap.
                  </AlertDescription>
                </Alert>
              )}

              {submitError && (
                <Alert variant="destructive">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <div className="relative">
                <label className="text-sm font-medium mb-1.5 block">Feature Title</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search existing or type a new idea..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) setShowSearchResults(true)
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

                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg max-h-56 overflow-y-auto">
                    <div className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b">
                      Similar Features ({searchResults.length})
                    </div>
                    {searchResults.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        type="button"
                        onClick={() => handleSelectResult(result)}
                        className="w-full text-left px-3 py-2.5 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm flex-1">{result.title}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {result.type === 'roadmap' ? 'Roadmap' : 'Suggestion'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {result.description}
                        </p>
                      </button>
                    ))}
                    <div className="px-3 py-2 bg-muted/30 text-center">
                      <p className="text-[10px] text-muted-foreground">
                        Don't see your idea? Continue to submit it below.
                      </p>
                    </div>
                  </div>
                )}

                {isSearching && (
                  <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-lg p-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                      Searching...
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Description</label>
                <Textarea
                  placeholder="Describe the feature and how it would help you..."
                  value={newSuggestion.description}
                  onChange={(e) => setNewSuggestion({...newSuggestion, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Category <span className="text-muted-foreground font-normal">(optional)</span></label>
                <Input
                  placeholder="e.g., Analytics, Design, Compliance"
                  value={newSuggestion.category}
                  onChange={(e) => setNewSuggestion({...newSuggestion, category: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
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
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <section id="board" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Planned Column */}
              <div>
                <div className="flex items-center gap-2.5 mb-5 px-1">
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Planned</h3>
                  <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted rounded-full w-6 h-6 flex items-center justify-center">
                    {planned.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {planned.map((item) => (
                    <RoadmapCard key={item.id} item={item} />
                  ))}
                  {planned.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No planned items yet
                    </div>
                  )}
                </div>
              </div>

              {/* In Progress Column */}
              <div>
                <div className="flex items-center gap-2.5 mb-5 px-1">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">In Progress</h3>
                  <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted rounded-full w-6 h-6 flex items-center justify-center">
                    {inProgress.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {inProgress.map((item) => (
                    <RoadmapCard key={item.id} item={item} borderColor="border-blue-200" />
                  ))}
                  {inProgress.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      Nothing in progress
                    </div>
                  )}
                </div>
              </div>

              {/* Completed Column */}
              <div>
                <div className="flex items-center gap-2.5 mb-5 px-1">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completed</h3>
                  <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted rounded-full w-6 h-6 flex items-center justify-center">
                    {completed.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {completed.map((item) => (
                    <RoadmapCard key={item.id} item={item} borderColor="border-emerald-200" />
                  ))}
                  {completed.length === 0 && (
                    <div className="text-center py-8 text-sm text-muted-foreground">
                      No completed items yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Suggestions */}
      {session && (
        <section className="py-12 md:py-16 border-t bg-[#FAFAF5]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Your Suggestions</h2>
                  <p className="text-sm text-muted-foreground">
                    Track the status of features you've suggested
                  </p>
                </div>
                <Button onClick={() => setShowSuggestForm(true)} size="sm">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  New
                </Button>
              </div>

              {loadingSuggestions ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : userSuggestions.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-border p-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">No suggestions yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your ideas help shape our product. Be the first to suggest something!
                  </p>
                  <Button onClick={() => setShowSuggestForm(true)} size="sm" variant="outline">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Suggest a Feature
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="bg-white rounded-xl border p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                suggestion.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                suggestion.status === 'under-review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                suggestion.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {suggestion.status === 'pending' ? 'Pending Review' :
                               suggestion.status === 'under-review' ? 'Under Review' :
                               suggestion.status === 'accepted' ? 'Accepted' :
                               suggestion.status === 'rejected' ? 'Not Planned' :
                               suggestion.status}
                            </Badge>
                            {suggestion.category && (
                              <Badge variant="outline" className="text-xs">{suggestion.category}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground ml-auto">
                              {new Date(suggestion.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Have an Idea?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We'd love to hear your suggestions and feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
                <Sparkles className="w-4 h-4 mr-2" />
                Suggest Feature
                {!session && <span className="text-xs opacity-70 ml-1">(Login)</span>}
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="mailto:support@cookie-banner.ca">
                  <ArrowRight className="w-4 h-4 mr-2" />
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
