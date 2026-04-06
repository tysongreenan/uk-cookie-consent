'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import {
  Map,
  Plus,
  ThumbsUp,
  CheckCircle,
  Lightbulb,
  Zap,
  Users,
  BarChart3,
  Globe,
  Shield,
  Settings,
  Search,
  X,
  MessageSquare,
  ChevronUp,
  Sparkles,
  Reply,
  Send,
  ShieldCheck,
  Loader2,
  Crown,
  Rocket,
  PartyPopper,
  Hammer,
  CalendarCheck,
  Lock,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'

// --- Annual-exclusive features ---
const ANNUAL_EXCLUSIVE_FEATURES = ['Consent Logs', 'consent logs']

function isAnnualExclusive(title: string): boolean {
  return ANNUAL_EXCLUSIVE_FEATURES.some((f) =>
    title.toLowerCase().includes(f.toLowerCase())
  )
}

const iconMap: Record<string, any> = {
  analytics: BarChart3,
  collaboration: Users,
  localization: Globe,
  compliance: Shield,
  design: Settings,
  optimization: Zap,
}

const categoryConfig: Record<string, { label: string; color: string; accent: string }> = {
  analytics: { label: 'Analytics', color: 'bg-accent-cool/10 text-accent-cool border-accent-cool/20', accent: 'text-accent-cool' },
  collaboration: { label: 'Collaboration', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', accent: 'text-emerald-600' },
  localization: { label: 'Localization', color: 'bg-violet-50 text-violet-700 border-violet-200', accent: 'text-violet-600' },
  compliance: { label: 'Compliance', color: 'bg-accent-warm/10 text-accent-warm border-accent-warm/20', accent: 'text-accent-warm' },
  design: { label: 'Design', color: 'bg-amber-50 text-amber-700 border-amber-200', accent: 'text-amber-600' },
  optimization: { label: 'Optimization', color: 'bg-cyan-50 text-cyan-700 border-cyan-200', accent: 'text-cyan-600' },
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

// ─── Sub-components (outside render to prevent remount) ───

function VoteButton({
  item,
  voting,
  session,
  onVote,
}: {
  item: RoadmapItem
  voting: number | null
  session: any
  onVote: (id: number, voted: boolean) => void
}) {
  return (
    <button
      onClick={() => onVote(item.id, item.userVoted)}
      disabled={voting === item.id}
      className={`
        flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 min-w-[52px]
        ${item.userVoted
          ? 'bg-accent-warm/10 border-accent-warm text-accent-warm'
          : 'bg-background border-border text-muted-foreground hover:border-accent-warm/40 hover:text-accent-warm'
        }
        ${voting === item.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      title={!session ? 'Sign in to vote' : item.userVoted ? 'Remove vote' : 'Vote for this feature'}
    >
      <ChevronUp className={`w-4 h-4 ${item.userVoted ? 'text-accent-warm' : ''}`} />
      <span className="text-sm font-bold tabular-nums font-heading">
        {item.vote_count}
      </span>
    </button>
  )
}

function AnnualExclusiveBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300/60">
      <Crown className="w-3 h-3 text-amber-600" />
      <span className="text-[10px] font-semibold text-amber-700 tracking-wide uppercase">Annual</span>
    </div>
  )
}

function ShippedStamp() {
  return (
    <div className="absolute -top-1 -right-1 z-10">
      <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-emerald-600/20 -rotate-12">
        <CheckCircle className="w-5 h-5" />
      </div>
    </div>
  )
}

function BuildingIndicator() {
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Hammer className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Building</span>
      </div>
      <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-1000"
          style={{ width: '65%' }}
        />
      </div>
    </div>
  )
}

function CommentThread({
  comment,
  itemId,
  session,
  replyingTo,
  replyText,
  postingComment,
  onSetReplyingTo,
  onSetReplyText,
  onPostComment,
  router,
}: {
  comment: Comment
  itemId: number
  session: any
  replyingTo: Record<number, number | null>
  replyText: Record<number, string>
  postingComment: boolean
  onSetReplyingTo: (fn: (prev: Record<number, number | null>) => Record<number, number | null>) => void
  onSetReplyText: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  onPostComment: (itemId: number, parentId?: number) => void
  router: any
}) {
  return (
    <div className="space-y-2">
      <div className={`rounded-xl p-3 ${comment.isAdminReply ? 'bg-accent-warm/5 border border-accent-warm/15' : 'bg-muted/50'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-foreground">{comment.userName}</span>
          {comment.isAdminReply && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent-warm bg-accent-warm/10 px-1.5 py-0.5 rounded-full">
              <ShieldCheck className="w-2.5 h-2.5" />
              Team
            </span>
          )}
          <span className="text-[10px] text-muted-foreground ml-auto">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-foreground/70 leading-relaxed">
          {comment.content}
        </p>
        {session && (
          <button
            onClick={() =>
              onSetReplyingTo((prev) => ({
                ...prev,
                [itemId]: prev[itemId] === comment.id ? null : comment.id,
              }))
            }
            className="text-[10px] text-muted-foreground hover:text-accent-warm mt-1.5 flex items-center gap-1 transition-colors"
          >
            <Reply className="w-3 h-3" />
            Reply
          </button>
        )}
      </div>

      {replyingTo[itemId] === comment.id && (
        <div className="ml-4 flex gap-2">
          <Input
            placeholder="Write a reply..."
            value={replyText[comment.id] || ''}
            onChange={(e) => onSetReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                onPostComment(itemId, comment.id)
              }
            }}
            className="text-xs h-8"
            disabled={postingComment}
          />
          <Button
            size="sm"
            className="h-8 px-2"
            onClick={() => onPostComment(itemId, comment.id)}
            disabled={postingComment || !replyText[comment.id]?.trim()}
          >
            {postingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
          </Button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="ml-4 border-l-2 border-border pl-3 space-y-2">
          {comment.replies.map((reply) => (
            <div key={reply.id} className={`rounded-xl p-3 ${reply.isAdminReply ? 'bg-accent-warm/5 border border-accent-warm/15' : 'bg-muted/50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-foreground">{reply.userName}</span>
                {reply.isAdminReply && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent-warm bg-accent-warm/10 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Team
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {new Date(reply.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function RoadmapCard({
  item,
  columnStatus,
  voting,
  session,
  openComments,
  comments,
  loadingComments,
  commentText,
  replyingTo,
  replyText,
  postingComment,
  onVote,
  onToggleComments,
  onSetCommentText,
  onSetReplyingTo,
  onSetReplyText,
  onPostComment,
  router,
}: {
  item: RoadmapItem
  columnStatus: 'planned' | 'in-progress' | 'completed'
  voting: number | null
  session: any
  openComments: Record<number, boolean>
  comments: Record<number, Comment[]>
  loadingComments: Record<number, boolean>
  commentText: Record<number, string>
  replyingTo: Record<number, number | null>
  replyText: Record<number, string>
  postingComment: boolean
  onVote: (id: number, voted: boolean) => void
  onToggleComments: (id: number) => void
  onSetCommentText: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  onSetReplyingTo: (fn: (prev: Record<number, number | null>) => Record<number, number | null>) => void
  onSetReplyText: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  onPostComment: (itemId: number, parentId?: number) => void
  router: any
}) {
  const catInfo = categoryConfig[item.category] || {
    label: item.category,
    color: 'bg-muted text-muted-foreground border-border',
    accent: 'text-muted-foreground',
  }
  const ItemIcon = iconMap[item.category] || Settings
  const isCommentsOpen = openComments[item.id]
  const itemComments = comments[item.id] || []
  const commentCount = itemComments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)
  const isExclusive = isAnnualExclusive(item.title)
  const isCompleted = columnStatus === 'completed'
  const isBuilding = columnStatus === 'in-progress'

  return (
    <Card
      className={`
        group relative transition-all duration-200
        ${isCompleted
          ? 'border-emerald-300/50 hover:shadow-lg hover:shadow-emerald-600/5'
          : isBuilding
            ? 'border-primary/30 hover:shadow-lg hover:shadow-primary/5'
            : 'hover:shadow-lg hover:shadow-foreground/5'
        }
        ${isExclusive ? 'ring-1 ring-amber-300/40' : ''}
      `}
    >
      {isCompleted && <ShippedStamp />}

      <div className="flex gap-3 p-4">
        <VoteButton item={item} voting={voting} session={session} onVote={onVote} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold text-sm leading-snug text-foreground font-heading">
              {item.title}
            </h4>
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCompleted ? 'bg-emerald-600/10' : isBuilding ? 'bg-primary/10' : 'bg-muted'
              }`}
            >
              <ItemIcon className={`w-3.5 h-3.5 ${catInfo.accent}`} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {isBuilding && <BuildingIndicator />}

          <div className={`flex items-center justify-between gap-2 flex-wrap ${isBuilding ? 'mt-3' : ''}`}>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="outline" className={`text-[10px] px-2 py-0.5 rounded-lg ${catInfo.color}`}>
                {catInfo.label}
              </Badge>
              {isExclusive && <AnnualExclusiveBadge />}
            </div>
            <button
              onClick={() => onToggleComments(item.id)}
              className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg transition-colors ${
                isCommentsOpen
                  ? 'text-accent-warm bg-accent-warm/10'
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
        <div className="border-t border-border px-4 py-3 space-y-3">
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
              {itemComments.map((comment) => (
                <CommentThread
                  key={comment.id}
                  comment={comment}
                  itemId={item.id}
                  session={session}
                  replyingTo={replyingTo}
                  replyText={replyText}
                  postingComment={postingComment}
                  onSetReplyingTo={onSetReplyingTo}
                  onSetReplyText={onSetReplyText}
                  onPostComment={onPostComment}
                  router={router}
                />
              ))}

              {session ? (
                <div className="flex gap-2 pt-1">
                  <Input
                    placeholder="Share your thoughts on this feature..."
                    value={commentText[item.id] || ''}
                    onChange={(e) => onSetCommentText((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        onPostComment(item.id)
                      }
                    }}
                    className="text-xs h-8"
                    disabled={postingComment}
                  />
                  <Button
                    size="sm"
                    className="h-8 px-2"
                    onClick={() => onPostComment(item.id)}
                    disabled={postingComment || !commentText[item.id]?.trim()}
                  >
                    {postingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/auth/signin?callbackUrl=/roadmap')}
                  className="w-full text-xs text-muted-foreground hover:text-accent-warm text-center py-2 transition-colors"
                >
                  Sign in to join the discussion
                </button>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  )
}

function StatusColumn({
  title,
  icon: Icon,
  accentColor,
  columnItems,
  columnStatus,
  emptyText,
  ...cardProps
}: {
  title: string
  icon: any
  accentColor: string
  columnItems: RoadmapItem[]
  columnStatus: 'planned' | 'in-progress' | 'completed'
  emptyText: string
  voting: number | null
  session: any
  openComments: Record<number, boolean>
  comments: Record<number, Comment[]>
  loadingComments: Record<number, boolean>
  commentText: Record<number, string>
  replyingTo: Record<number, number | null>
  replyText: Record<number, string>
  postingComment: boolean
  onVote: (id: number, voted: boolean) => void
  onToggleComments: (id: number) => void
  onSetCommentText: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  onSetReplyingTo: (fn: (prev: Record<number, number | null>) => Record<number, number | null>) => void
  onSetReplyText: (fn: (prev: Record<number, string>) => Record<number, string>) => void
  onPostComment: (itemId: number, parentId?: number) => void
  router: any
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${accentColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground font-heading">
          {title}
        </h3>
        <span className={`ml-auto text-xs font-bold tabular-nums px-2.5 py-1 rounded-lg ${accentColor}`}>
          {columnItems.length}
        </span>
      </div>
      <div className="space-y-3">
        {columnItems.map((item) => (
          <RoadmapCard
            key={item.id}
            item={item}
            columnStatus={columnStatus}
            {...cardProps}
          />
        ))}
        {columnItems.length === 0 && (
          <div className="text-center py-12 rounded-2xl border-2 border-dashed border-border">
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page Component ───

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

  const isAnnualUser = session?.user?.planTier === 'pro_annual' || session?.user?.planTier === 'enterprise'

  useEffect(() => {
    fetchRoadmapItems()
  }, [])

  useEffect(() => {
    if (session) {
      fetchUserSuggestions()
    }
  }, [session])

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

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

  const handleVote = useCallback(async (itemId: number, currentVoted: boolean) => {
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
          action: currentVoted ? 'unvote' : 'vote',
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, vote_count: data.voteCount, userVoted: data.userVoted }
              : item
          )
        )
      } else {
        const data = await response.json()
        console.error('Vote failed:', data.error)
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoting(null)
    }
  }, [session, router])

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
          ...(data.suggestions || []).map((item: any) => ({ ...item, type: 'suggestion' as const })),
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
    setNewSuggestion((prev) => ({ ...prev, title: value }))
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
          category: newSuggestion.category,
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

  const toggleComments = useCallback(async (itemId: number) => {
    const isOpen = !openComments[itemId]
    setOpenComments((prev) => ({ ...prev, [itemId]: isOpen }))
    if (isOpen && !comments[itemId]) {
      await fetchComments(itemId)
    }
  }, [openComments, comments])

  const fetchComments = async (itemId: number) => {
    setLoadingComments((prev) => ({ ...prev, [itemId]: true }))
    try {
      const response = await fetch(`/api/roadmap/comments?roadmapItemId=${itemId}`)
      if (response.ok) {
        const data = await response.json()
        setComments((prev) => ({ ...prev, [itemId]: data.comments || [] }))
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoadingComments((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  const handlePostComment = useCallback(async (itemId: number, parentId?: number) => {
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
          parentId: parentId || null,
        }),
      })

      if (response.ok) {
        if (parentId) {
          setReplyText((prev) => ({ ...prev, [parentId]: '' }))
          setReplyingTo((prev) => ({ ...prev, [itemId]: null }))
        } else {
          setCommentText((prev) => ({ ...prev, [itemId]: '' }))
        }
        await fetchComments(itemId)
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    } finally {
      setPostingComment(false)
    }
  }, [session, router, replyText, commentText])

  const closeSuggestForm = () => {
    setShowSuggestForm(false)
    setNewSuggestion({ title: '', description: '', category: '' })
    setSearchQuery('')
    setSearchResults([])
    setShowSearchResults(false)
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full mx-auto animate-spin" />
          <p className="mt-4 text-muted-foreground text-sm font-medium tracking-wide">
            Loading roadmap...
          </p>
        </div>
      </div>
    )
  }

  const planned = [...items].filter((i) => i.status === 'planned').sort((a, b) => b.vote_count - a.vote_count)
  const inProgress = [...items].filter((i) => i.status === 'in-progress').sort((a, b) => b.vote_count - a.vote_count)
  const completed = [...items].filter((i) => i.status === 'completed').sort((a, b) => b.vote_count - a.vote_count)

  const sharedCardProps = {
    voting,
    session,
    openComments,
    comments,
    loadingComments,
    commentText,
    replyingTo,
    replyText,
    postingComment,
    onVote: handleVote,
    onToggleComments: toggleComments,
    onSetCommentText: setCommentText,
    onSetReplyingTo: setReplyingTo,
    onSetReplyText: setReplyText,
    onPostComment: handlePostComment,
    router,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-warm/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/[0.04] to-transparent" />

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold tracking-wider uppercase mb-8">
              <Map className="w-3.5 h-3.5" />
              Product Roadmap
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-5 leading-[1.1]">
              Shape What{' '}
              <span className="relative">
                <span className="relative z-10">We Build</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent-warm/15 -rotate-1 rounded" />
              </span>{' '}
              Next
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Vote on the features that matter most to you, or suggest something new.
              Your feedback directly influences our priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="rounded-xl px-8 h-12 text-sm font-semibold shadow-lg"
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
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 h-12 text-sm font-semibold"
                asChild
              >
                <a href="#board">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Vote on Features
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Suggestion Form Dialog ─── */}
      <Dialog open={showSuggestForm} onOpenChange={(open) => { if (!open) closeSuggestForm() }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Suggest a Feature</DialogTitle>
            <DialogDescription>Help us build the tools you need</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitSuggestion} className="space-y-4">
            {submitSuccess && (
              <Alert className="bg-emerald-50 border-emerald-200 text-emerald-700">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Suggestion submitted! We&apos;ll review it and may add it to our roadmap.
                </AlertDescription>
              </Alert>
            )}

            {submitError && (
              <Alert variant="destructive">
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <div className="relative">
              <label className="text-sm font-semibold mb-1.5 block text-foreground">
                Feature Title
              </label>
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
                      setNewSuggestion((prev) => ({ ...prev, title: '' }))
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
                <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-xl shadow-lg max-h-56 overflow-y-auto">
                  <div className="px-3 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                    Similar Features ({searchResults.length})
                  </div>
                  {searchResults.map((result) => (
                    <button
                      key={`${result.type}-${result.id}`}
                      type="button"
                      onClick={() => handleSelectResult(result)}
                      className="w-full text-left px-3 py-2.5 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm flex-1 text-foreground">{result.title}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {result.type === 'roadmap' ? 'Roadmap' : 'Suggestion'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {result.description}
                      </p>
                    </button>
                  ))}
                  <div className="px-3 py-2 bg-muted/50 text-center">
                    <p className="text-[10px] text-muted-foreground">
                      Don&apos;t see your idea? Continue to submit it below.
                    </p>
                  </div>
                </div>
              )}

              {isSearching && (
                <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-xl shadow-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    Searching...
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">
                Description
              </label>
              <Textarea
                placeholder="Describe the feature and how it would help you..."
                value={newSuggestion.description}
                onChange={(e) => setNewSuggestion((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold mb-1.5 block text-foreground">
                Category <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <Input
                placeholder="e.g., Analytics, Design, Compliance"
                value={newSuggestion.category}
                onChange={(e) => setNewSuggestion((prev) => ({ ...prev, category: e.target.value }))}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeSuggestForm}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Suggestion
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── KANBAN BOARD ─── */}
      <section id="board" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-warm mb-2">
                  The Board
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Feature Pipeline
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Planned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Building</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Shipped</span>
                </div>
              </div>
            </div>

            {/* Desktop: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              <StatusColumn
                title="Planned"
                icon={Lightbulb}
                accentColor="bg-amber-100 text-amber-700"
                columnItems={planned}
                columnStatus="planned"
                emptyText="No planned items yet"
                {...sharedCardProps}
              />
              <StatusColumn
                title="In Progress"
                icon={Rocket}
                accentColor="bg-primary/15 text-primary"
                columnItems={inProgress}
                columnStatus="in-progress"
                emptyText="Nothing in progress"
                {...sharedCardProps}
              />
              <StatusColumn
                title="Shipped"
                icon={PartyPopper}
                accentColor="bg-emerald-100 text-emerald-700"
                columnItems={completed}
                columnStatus="completed"
                emptyText="No shipped items yet"
                {...sharedCardProps}
              />
            </div>

            {/* Mobile: Tabs */}
            <div className="md:hidden">
              <Tabs defaultValue="planned">
                <TabsList className="w-full">
                  <TabsTrigger value="planned" className="flex-1 gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Planned
                    <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">{planned.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="flex-1 gap-1.5">
                    <Rocket className="w-3.5 h-3.5" />
                    Building
                    <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">{inProgress.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex-1 gap-1.5">
                    <PartyPopper className="w-3.5 h-3.5" />
                    Shipped
                    <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">{completed.length}</Badge>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="planned" className="mt-6">
                  <div className="space-y-3">
                    {planned.map((item) => (
                      <RoadmapCard key={item.id} item={item} columnStatus="planned" {...sharedCardProps} />
                    ))}
                    {planned.length === 0 && (
                      <div className="text-center py-12 rounded-2xl border-2 border-dashed border-border">
                        <p className="text-sm text-muted-foreground">No planned items yet</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="in-progress" className="mt-6">
                  <div className="space-y-3">
                    {inProgress.map((item) => (
                      <RoadmapCard key={item.id} item={item} columnStatus="in-progress" {...sharedCardProps} />
                    ))}
                    {inProgress.length === 0 && (
                      <div className="text-center py-12 rounded-2xl border-2 border-dashed border-border">
                        <p className="text-sm text-muted-foreground">Nothing in progress</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="completed" className="mt-6">
                  <div className="space-y-3">
                    {completed.map((item) => (
                      <RoadmapCard key={item.id} item={item} columnStatus="completed" {...sharedCardProps} />
                    ))}
                    {completed.length === 0 && (
                      <div className="text-center py-12 rounded-2xl border-2 border-dashed border-border">
                        <p className="text-sm text-muted-foreground">No shipped items yet</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUBSCRIPTION CTA ─── */}
      {!isAnnualUser && (
        <section className="py-16 md:py-20 border-t border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.015] via-transparent to-accent-warm/[0.03]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-warm/10 text-accent-warm text-xs font-semibold tracking-wider uppercase mb-6">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Continuous Delivery
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  New Features, Continuously Delivered
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Annual subscribers unlock every feature as it ships. One-time purchasers keep everything available at their purchase date.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Annual Card */}
                <Card className="relative overflow-hidden border-2 border-accent-warm/40 shadow-lg shadow-accent-warm/5">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-warm via-accent-warm to-amber-400" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-accent-warm/10 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-accent-warm" />
                      </div>
                      <Badge className="bg-accent-warm text-white border-0 text-[10px] font-semibold uppercase tracking-wider px-3">
                        Recommended
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">Pro Annual</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground font-heading">$99</span>
                      <span className="text-muted-foreground text-sm">/year</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Always up to date. Every new feature, automatically.
                    </p>
                    <div className="space-y-2.5 pt-2">
                      {[
                        'Every feature on the roadmap',
                        'New features as they ship',
                        'Priority support',
                        'Consent Logs included',
                      ].map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-accent-warm/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-accent-warm" />
                          </div>
                          <span className="text-sm text-foreground/70">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full rounded-xl h-11 font-semibold shadow-lg mt-2"
                      onClick={() => router.push('/upgrade')}
                    >
                      Upgrade to Annual
                      <ArrowUpRight className="w-4 h-4 ml-1.5" />
                    </Button>
                  </CardContent>
                </Card>

                {/* One-time Card */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-border" />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">Pro Lifetime</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground font-heading">$99</span>
                      <span className="text-muted-foreground text-sm">once</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Lock in today&apos;s features forever.
                    </p>
                    <div className="space-y-2.5 pt-2">
                      {[
                        'All current features',
                        'Frozen at purchase date',
                        'No future feature updates',
                        'Standard support',
                      ].map((f, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                              i < 1 ? 'bg-emerald-100' : 'bg-muted'
                            }`}
                          >
                            {i < 1 ? (
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                            )}
                          </div>
                          <span className={`text-sm ${i < 1 ? 'text-foreground/70' : 'text-muted-foreground'}`}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full rounded-xl h-11 font-semibold mt-2"
                      onClick={() => router.push('/upgrade')}
                    >
                      View One-Time Option
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── YOUR SUGGESTIONS ─── */}
      {session && (
        <section className="py-16 md:py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                    Your Ideas
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Your Suggestions
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Track the status of features you&apos;ve suggested
                  </p>
                </div>
                <Button
                  onClick={() => setShowSuggestForm(true)}
                  size="sm"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  New
                </Button>
              </div>

              {loadingSuggestions ? (
                <div className="text-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                </div>
              ) : userSuggestions.length === 0 ? (
                <Card className="border-2 border-dashed p-12 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent-warm/10 flex items-center justify-center mx-auto mb-5">
                    <MessageSquare className="w-6 h-6 text-accent-warm" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    No suggestions yet
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Your ideas help shape our product. Be the first to suggest something!
                  </p>
                  <Button
                    onClick={() => setShowSuggestForm(true)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Suggest a Feature
                  </Button>
                </Card>
              ) : (
                <div className="space-y-3">
                  {userSuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className="p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2 font-heading">
                            {suggestion.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {suggestion.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={`text-xs rounded-lg ${
                                suggestion.status === 'accepted'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : suggestion.status === 'under-review'
                                    ? 'bg-primary/10 text-primary border-primary/20'
                                    : suggestion.status === 'rejected'
                                      ? 'bg-red-50 text-red-600 border-red-200'
                                      : 'bg-amber-50 text-amber-600 border-amber-200'
                              }`}
                            >
                              {suggestion.status === 'pending'
                                ? 'Pending Review'
                                : suggestion.status === 'under-review'
                                  ? 'Under Review'
                                  : suggestion.status === 'accepted'
                                    ? 'Accepted'
                                    : suggestion.status === 'rejected'
                                      ? 'Not Planned'
                                      : suggestion.status}
                            </Badge>
                            {suggestion.category && (
                              <Badge variant="outline" className="text-xs rounded-lg">
                                {suggestion.category}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground ml-auto">
                              {new Date(suggestion.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative overflow-hidden bg-foreground py-20">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--background)) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-warm/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
              Have an Idea?
            </h2>
            <p className="text-lg text-background/50 mb-10 leading-relaxed">
              We&apos;d love to hear your suggestions and feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="rounded-xl px-8 h-12 font-semibold shadow-lg"
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
              <Button
                size="lg"
                variant="outline"
                className="border-background/15 text-background hover:bg-background/5 rounded-xl px-8 h-12 font-semibold"
                asChild
              >
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
