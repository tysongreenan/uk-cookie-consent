'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { motion, AnimatePresence } from 'framer-motion'
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
  Loader2,
  Crown,
  Rocket,
  PartyPopper,
  Hammer,
  CalendarCheck,
  Lock,
  ArrowUpRight
} from 'lucide-react'

// --- Annual-exclusive features (post-cutoff) ---
const ANNUAL_EXCLUSIVE_FEATURES = [
  'Consent Logs',
  'consent logs',
]

function isAnnualExclusive(title: string): boolean {
  return ANNUAL_EXCLUSIVE_FEATURES.some(f =>
    title.toLowerCase().includes(f.toLowerCase())
  )
}

const iconMap: Record<string, any> = {
  'analytics': BarChart3,
  'collaboration': Users,
  'localization': Globe,
  'compliance': Shield,
  'design': Settings,
  'optimization': Zap
}

const categoryConfig: Record<string, { label: string; color: string; accent: string }> = {
  'analytics': { label: 'Analytics', color: 'bg-[#6a9bcc]/10 text-[#6a9bcc] border-[#6a9bcc]/20', accent: 'text-[#6a9bcc]' },
  'collaboration': { label: 'Collaboration', color: 'bg-[#788c5d]/10 text-[#788c5d] border-[#788c5d]/20', accent: 'text-[#788c5d]' },
  'localization': { label: 'Localization', color: 'bg-violet-50 text-violet-700 border-violet-200', accent: 'text-violet-600' },
  'compliance': { label: 'Compliance', color: 'bg-[#d97757]/10 text-[#d97757] border-[#d97757]/20', accent: 'text-[#d97757]' },
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

// --- Stagger animation variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
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

  const isAnnualUser = session?.user?.planTier === 'pro_annual' || session?.user?.planTier === 'enterprise'

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
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-2 border-[#d97757] border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-4 text-[#141413]/50 text-sm font-medium tracking-wide" style={{ fontFamily: 'Lora, Georgia, serif' }}>
            Loading roadmap...
          </p>
        </div>
      </div>
    )
  }

  const planned = [...items].filter(i => i.status === 'planned').sort((a, b) => b.vote_count - a.vote_count)
  const inProgress = [...items].filter(i => i.status === 'in-progress').sort((a, b) => b.vote_count - a.vote_count)
  const completed = [...items].filter(i => i.status === 'completed').sort((a, b) => b.vote_count - a.vote_count)

  // --- Sub-components ---

  const VoteButton = ({ item }: { item: RoadmapItem }) => (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={() => handleVote(item.id, item.userVoted)}
      disabled={voting === item.id}
      className={`
        flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 min-w-[52px]
        ${item.userVoted
          ? 'bg-[#d97757]/10 border-[#d97757] text-[#d97757]'
          : 'bg-[#faf9f5] border-[#e8e6dc] text-[#b0aea5] hover:border-[#d97757]/40 hover:text-[#d97757]'
        }
        ${voting === item.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      title={!session ? 'Sign in to vote' : item.userVoted ? 'Remove vote' : 'Vote for this feature'}
    >
      <ChevronUp className={`w-4 h-4 ${item.userVoted ? 'text-[#d97757]' : ''}`} />
      <span className="text-sm font-bold tabular-nums" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
        {item.vote_count}
      </span>
    </motion.button>
  )

  const AnnualExclusiveBadge = () => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300/60"
    >
      <Crown className="w-3 h-3 text-amber-600" />
      <span className="text-[10px] font-semibold text-amber-700 tracking-wide uppercase">Annual</span>
    </motion.div>
  )

  const ShippedStamp = () => (
    <div className="absolute -top-1 -right-1 z-10">
      <div className="relative">
        <div className="w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#788c5d]/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          <div className="relative bg-[#788c5d] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-[#788c5d]/20 -rotate-12">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  )

  const BuildingIndicator = () => (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Hammer className="w-3 h-3 text-[#6a9bcc]" />
        <span className="text-[10px] font-semibold text-[#6a9bcc] uppercase tracking-wider">Building</span>
      </div>
      <div className="h-1.5 bg-[#6a9bcc]/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6a9bcc] to-[#6a9bcc]/60 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '65%' }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )

  const CommentThread = ({ comment, itemId }: { comment: Comment; itemId: number }) => (
    <div className="space-y-2">
      <div className={`rounded-xl p-3 ${comment.isAdminReply ? 'bg-[#d97757]/5 border border-[#d97757]/15' : 'bg-[#141413]/[0.02]'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-[#141413]">{comment.userName}</span>
          {comment.isAdminReply && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#d97757] bg-[#d97757]/10 px-1.5 py-0.5 rounded-full">
              <ShieldCheck className="w-2.5 h-2.5" />
              Team
            </span>
          )}
          <span className="text-[10px] text-[#b0aea5] ml-auto">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-xs text-[#141413]/70 leading-relaxed" style={{ fontFamily: 'Lora, Georgia, serif' }}>
          {comment.content}
        </p>
        {session && (
          <button
            onClick={() => setReplyingTo(prev => ({
              ...prev,
              [itemId]: prev[itemId] === comment.id ? null : comment.id
            }))}
            className="text-[10px] text-[#b0aea5] hover:text-[#d97757] mt-1.5 flex items-center gap-1 transition-colors"
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
            onChange={(e) => setReplyText(prev => ({ ...prev, [comment.id]: e.target.value }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handlePostComment(itemId, comment.id)
              }
            }}
            className="text-xs h-8 border-[#e8e6dc] focus:border-[#d97757] focus:ring-[#d97757]/20"
            disabled={postingComment}
          />
          <Button
            size="sm"
            className="h-8 px-2 bg-[#d97757] hover:bg-[#c4674a]"
            onClick={() => handlePostComment(itemId, comment.id)}
            disabled={postingComment || !replyText[comment.id]?.trim()}
          >
            {postingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
          </Button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="ml-4 border-l-2 border-[#e8e6dc] pl-3 space-y-2">
          {comment.replies.map(reply => (
            <div key={reply.id} className={`rounded-xl p-3 ${reply.isAdminReply ? 'bg-[#d97757]/5 border border-[#d97757]/15' : 'bg-[#141413]/[0.02]'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-[#141413]">{reply.userName}</span>
                {reply.isAdminReply && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#d97757] bg-[#d97757]/10 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Team
                  </span>
                )}
                <span className="text-[10px] text-[#b0aea5] ml-auto">
                  {new Date(reply.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-[#141413]/70 leading-relaxed" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                {reply.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const RoadmapCard = ({ item, columnStatus }: { item: RoadmapItem; columnStatus: 'planned' | 'in-progress' | 'completed' }) => {
    const catInfo = categoryConfig[item.category] || { label: item.category, color: 'bg-[#141413]/5 text-[#141413]/60 border-[#141413]/10', accent: 'text-[#141413]/50' }
    const ItemIcon = iconMap[item.category] || Settings
    const isCommentsOpen = openComments[item.id]
    const itemComments = comments[item.id] || []
    const commentCount = itemComments.reduce((sum, c) => sum + 1 + (c.replies?.length || 0), 0)
    const isExclusive = isAnnualExclusive(item.title)
    const isCompleted = columnStatus === 'completed'
    const isBuilding = columnStatus === 'in-progress'

    return (
      <motion.div
        variants={cardVariants}
        className={`
          group relative bg-white rounded-2xl border transition-all duration-300
          ${isCompleted
            ? 'border-[#788c5d]/30 hover:shadow-lg hover:shadow-[#788c5d]/5'
            : isBuilding
              ? 'border-[#6a9bcc]/30 hover:shadow-lg hover:shadow-[#6a9bcc]/5'
              : 'border-[#e8e6dc] hover:shadow-lg hover:shadow-[#141413]/5'
          }
          ${isExclusive ? 'ring-1 ring-amber-300/40' : ''}
        `}
      >
        {isCompleted && <ShippedStamp />}

        <div className="flex gap-3 p-4">
          <VoteButton item={item} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4
                className="font-semibold text-sm leading-snug text-[#141413]"
                style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
              >
                {item.title}
              </h4>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isCompleted ? 'bg-[#788c5d]/10' : isBuilding ? 'bg-[#6a9bcc]/10' : 'bg-[#141413]/[0.03]'
              }`}>
                <ItemIcon className={`w-3.5 h-3.5 ${catInfo.accent}`} />
              </div>
            </div>
            <p
              className="text-xs text-[#141413]/55 mb-3 line-clamp-2 leading-relaxed"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
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
                onClick={() => toggleComments(item.id)}
                className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg transition-colors ${
                  isCommentsOpen
                    ? 'text-[#d97757] bg-[#d97757]/10'
                    : 'text-[#b0aea5] hover:text-[#141413] hover:bg-[#141413]/[0.03]'
                }`}
              >
                <MessageSquare className="w-3 h-3" />
                {commentCount > 0 ? commentCount : 'Discuss'}
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {isCommentsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#e8e6dc] px-4 py-3 space-y-3">
                {loadingComments[item.id] ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-4 h-4 animate-spin text-[#b0aea5]" />
                  </div>
                ) : (
                  <>
                    {itemComments.length === 0 && (
                      <p className="text-xs text-[#b0aea5] text-center py-2" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                        No comments yet. Be the first to share your thoughts!
                      </p>
                    )}
                    {itemComments.map(comment => (
                      <CommentThread key={comment.id} comment={comment} itemId={item.id} />
                    ))}

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
                          className="text-xs h-8 border-[#e8e6dc] focus:border-[#d97757] focus:ring-[#d97757]/20"
                          disabled={postingComment}
                        />
                        <Button
                          size="sm"
                          className="h-8 px-2 bg-[#d97757] hover:bg-[#c4674a]"
                          onClick={() => handlePostComment(item.id)}
                          disabled={postingComment || !commentText[item.id]?.trim()}
                        >
                          {postingComment ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => router.push('/auth/signin?callbackUrl=/roadmap')}
                        className="w-full text-xs text-[#b0aea5] hover:text-[#d97757] text-center py-2 transition-colors"
                      >
                        Sign in to join the discussion
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // --- Column Component ---
  const StatusColumn = ({
    title,
    icon: Icon,
    accentColor,
    dotColor,
    columnItems,
    columnStatus,
    emptyText
  }: {
    title: string
    icon: any
    accentColor: string
    dotColor: string
    columnItems: RoadmapItem[]
    columnStatus: 'planned' | 'in-progress' | 'completed'
    emptyText: string
  }) => (
    <div>
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${accentColor}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <h3
            className="text-sm font-bold uppercase tracking-wider text-[#141413]"
            style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
          >
            {title}
          </h3>
        </div>
        <span className={`ml-auto text-xs font-bold tabular-nums px-2.5 py-1 rounded-lg ${accentColor}`}>
          {columnItems.length}
        </span>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {columnItems.map((item) => (
          <RoadmapCard key={item.id} item={item} columnStatus={columnStatus} />
        ))}
        {columnItems.length === 0 && (
          <div className="text-center py-12 rounded-2xl border-2 border-dashed border-[#e8e6dc]">
            <p className="text-sm text-[#b0aea5]" style={{ fontFamily: 'Lora, Georgia, serif' }}>{emptyText}</p>
          </div>
        )}
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#faf9f5]">
      <Header />

      {/* --- HERO --- */}
      <section className="relative overflow-hidden border-b border-[#e8e6dc]">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#141413 1px, transparent 1px), linear-gradient(to right, #141413 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Gradient wash */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d97757]/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#6a9bcc]/[0.04] to-transparent" />

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141413] text-[#faf9f5] text-xs font-semibold tracking-wider uppercase mb-8"
            >
              <Map className="w-3.5 h-3.5" />
              Product Roadmap
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#141413] mb-5 leading-[1.1]"
              style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
            >
              Shape What{' '}
              <span className="relative">
                <span className="relative z-10">We Build</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#d97757]/15 -rotate-1 rounded" />
              </span>
              {' '}Next
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-[#141413]/55 mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              Vote on the features that matter most to you, or suggest something new.
              Your feedback directly influences our priorities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Button
                size="lg"
                className="bg-[#d97757] hover:bg-[#c4674a] text-white rounded-xl px-8 h-12 text-sm font-semibold shadow-lg shadow-[#d97757]/20"
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
                className="rounded-xl px-8 h-12 text-sm font-semibold border-[#141413]/15 text-[#141413] hover:bg-[#141413]/[0.03]"
                asChild
              >
                <a href="#board">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Vote on Features
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Suggestion Form Modal --- */}
      <AnimatePresence>
        {showSuggestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#141413]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowSuggestForm(false)
                setSubmitError(null)
                setSubmitSuccess(false)
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e8e6dc]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2
                      className="text-lg font-bold text-[#141413]"
                      style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                    >
                      Suggest a Feature
                    </h2>
                    <p className="text-sm text-[#b0aea5] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
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
                    className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#141413]/[0.03] transition-colors text-[#b0aea5] hover:text-[#141413]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmitSuggestion} className="p-6 space-y-4">
                {submitSuccess && (
                  <Alert className="bg-[#788c5d]/10 border-[#788c5d]/20 text-[#788c5d]">
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
                  <label
                    className="text-sm font-semibold mb-1.5 block text-[#141413]"
                    style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                  >
                    Feature Title
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#b0aea5]" />
                    <Input
                      placeholder="Search existing or type a new idea..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onFocus={() => {
                        if (searchResults.length > 0) setShowSearchResults(true)
                      }}
                      className="pl-10 pr-10 border-[#e8e6dc] focus:border-[#d97757] focus:ring-[#d97757]/20"
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
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b0aea5] hover:text-[#141413]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#e8e6dc] rounded-xl shadow-lg max-h-56 overflow-y-auto">
                      <div className="px-3 py-2 text-[10px] font-semibold text-[#b0aea5] uppercase tracking-wider border-b border-[#e8e6dc]">
                        Similar Features ({searchResults.length})
                      </div>
                      {searchResults.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          type="button"
                          onClick={() => handleSelectResult(result)}
                          className="w-full text-left px-3 py-2.5 hover:bg-[#faf9f5] transition-colors border-b border-[#e8e6dc] last:border-b-0"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm flex-1 text-[#141413]">{result.title}</span>
                            <Badge variant="outline" className="text-[10px] border-[#e8e6dc] text-[#b0aea5]">
                              {result.type === 'roadmap' ? 'Roadmap' : 'Suggestion'}
                            </Badge>
                          </div>
                          <p className="text-xs text-[#b0aea5] line-clamp-1 mt-0.5">
                            {result.description}
                          </p>
                        </button>
                      ))}
                      <div className="px-3 py-2 bg-[#faf9f5] text-center">
                        <p className="text-[10px] text-[#b0aea5]">
                          Don't see your idea? Continue to submit it below.
                        </p>
                      </div>
                    </div>
                  )}

                  {isSearching && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-[#e8e6dc] rounded-xl shadow-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-[#b0aea5]">
                        <Loader2 className="w-3 h-3 animate-spin text-[#d97757]" />
                        Searching...
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="text-sm font-semibold mb-1.5 block text-[#141413]"
                    style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                  >
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe the feature and how it would help you..."
                    value={newSuggestion.description}
                    onChange={(e) => setNewSuggestion({...newSuggestion, description: e.target.value})}
                    rows={3}
                    required
                    className="border-[#e8e6dc] focus:border-[#d97757] focus:ring-[#d97757]/20"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-1.5 block text-[#141413]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                    Category <span className="text-[#b0aea5] font-normal">(optional)</span>
                  </label>
                  <Input
                    placeholder="e.g., Analytics, Design, Compliance"
                    value={newSuggestion.category}
                    onChange={(e) => setNewSuggestion({...newSuggestion, category: e.target.value})}
                    className="border-[#e8e6dc] focus:border-[#d97757] focus:ring-[#d97757]/20"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#e8e6dc] text-[#141413]/60 hover:bg-[#141413]/[0.03] rounded-xl"
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
                  <Button
                    type="submit"
                    className="bg-[#d97757] hover:bg-[#c4674a] text-white rounded-xl"
                  >
                    Submit Suggestion
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- KANBAN BOARD --- */}
      <section id="board" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#d97757] mb-2" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                  The Board
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#141413]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                  Feature Pipeline
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-6 text-xs text-[#b0aea5]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Planned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#6a9bcc]" />
                  <span>Building</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#788c5d]" />
                  <span>Shipped</span>
                </div>
              </div>
            </motion.div>

            {/* Three columns */}
            <div className="grid md:grid-cols-3 gap-8">
              <StatusColumn
                title="Planned"
                icon={Lightbulb}
                accentColor="bg-amber-100 text-amber-700"
                dotColor="bg-amber-400"
                columnItems={planned}
                columnStatus="planned"
                emptyText="No planned items yet"
              />
              <StatusColumn
                title="In Progress"
                icon={Rocket}
                accentColor="bg-[#6a9bcc]/15 text-[#6a9bcc]"
                dotColor="bg-[#6a9bcc]"
                columnItems={inProgress}
                columnStatus="in-progress"
                emptyText="Nothing in progress"
              />
              <StatusColumn
                title="Shipped"
                icon={PartyPopper}
                accentColor="bg-[#788c5d]/15 text-[#788c5d]"
                dotColor="bg-[#788c5d]"
                columnItems={completed}
                columnStatus="completed"
                emptyText="No shipped items yet"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SUBSCRIPTION CTA --- only for non-annual users */}
      {!isAnnualUser && (
        <section className="py-16 md:py-20 border-t border-b border-[#e8e6dc] relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#141413]/[0.015] via-transparent to-[#d97757]/[0.03]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #141413 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d97757]/10 text-[#d97757] text-xs font-semibold tracking-wider uppercase mb-6">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Continuous Delivery
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#141413] mb-4 leading-tight"
                  style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                >
                  New Features, Continuously Delivered
                </h2>
                <p
                  className="text-lg text-[#141413]/50 max-w-2xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Lora, Georgia, serif' }}
                >
                  Annual subscribers unlock every feature as it ships. One-time purchasers keep everything available at their purchase date.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={containerVariants}
                className="grid md:grid-cols-2 gap-5"
              >
                {/* Annual Card */}
                <motion.div variants={cardVariants}>
                  <Card className="relative overflow-hidden border-2 border-[#d97757]/40 bg-white rounded-2xl shadow-lg shadow-[#d97757]/5">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d97757] via-[#d97757] to-amber-400" />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#d97757]/10 flex items-center justify-center">
                          <Crown className="w-5 h-5 text-[#d97757]" />
                        </div>
                        <Badge className="bg-[#d97757] text-white border-0 text-[10px] font-semibold uppercase tracking-wider px-3">
                          Recommended
                        </Badge>
                      </div>
                      <CardTitle
                        className="text-xl font-bold text-[#141413]"
                        style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                      >
                        Pro Annual
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#141413]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>$99</span>
                        <span className="text-[#b0aea5] text-sm">/year</span>
                      </div>
                      <p
                        className="text-sm text-[#141413]/55 leading-relaxed"
                        style={{ fontFamily: 'Lora, Georgia, serif' }}
                      >
                        Always up to date. Every new feature, automatically.
                      </p>
                      <div className="space-y-2.5 pt-2">
                        {[
                          'Every feature on the roadmap',
                          'New features as they ship',
                          'Priority support',
                          'Consent Logs included'
                        ].map((f, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-[#d97757]/10 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3 h-3 text-[#d97757]" />
                            </div>
                            <span className="text-sm text-[#141413]/70">{f}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full bg-[#d97757] hover:bg-[#c4674a] text-white rounded-xl h-11 font-semibold shadow-lg shadow-[#d97757]/15 mt-2"
                        onClick={() => router.push('/upgrade')}
                      >
                        Upgrade to Annual
                        <ArrowUpRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* One-time Card */}
                <motion.div variants={cardVariants}>
                  <Card className="relative overflow-hidden border border-[#e8e6dc] bg-white rounded-2xl">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#e8e6dc]" />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#141413]/[0.03] flex items-center justify-center">
                          <Lock className="w-5 h-5 text-[#b0aea5]" />
                        </div>
                      </div>
                      <CardTitle
                        className="text-xl font-bold text-[#141413]"
                        style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                      >
                        Pro Lifetime
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#141413]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>$99</span>
                        <span className="text-[#b0aea5] text-sm">once</span>
                      </div>
                      <p
                        className="text-sm text-[#141413]/55 leading-relaxed"
                        style={{ fontFamily: 'Lora, Georgia, serif' }}
                      >
                        Lock in today's features forever.
                      </p>
                      <div className="space-y-2.5 pt-2">
                        {[
                          'All current features',
                          'Frozen at purchase date',
                          'No future feature updates',
                          'Standard support'
                        ].map((f, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                              i < 1 ? 'bg-[#788c5d]/10' : 'bg-[#141413]/[0.03]'
                            }`}>
                              {i < 1 ? (
                                <CheckCircle className="w-3 h-3 text-[#788c5d]" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-[#b0aea5]" />
                              )}
                            </div>
                            <span className={`text-sm ${i < 1 ? 'text-[#141413]/70' : 'text-[#b0aea5]'}`}>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-[#e8e6dc] text-[#141413]/60 hover:bg-[#141413]/[0.03] rounded-xl h-11 font-semibold mt-2"
                        onClick={() => router.push('/upgrade')}
                      >
                        View One-Time Option
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* --- YOUR SUGGESTIONS --- */}
      {session && (
        <section className="py-16 md:py-20 border-t border-[#e8e6dc]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="flex items-end justify-between mb-10"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#6a9bcc] mb-2" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                    Your Ideas
                  </p>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#141413]"
                    style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                  >
                    Your Suggestions
                  </h2>
                  <p className="text-sm text-[#b0aea5] mt-1" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                    Track the status of features you've suggested
                  </p>
                </div>
                <Button
                  onClick={() => setShowSuggestForm(true)}
                  size="sm"
                  className="bg-[#d97757] hover:bg-[#c4674a] text-white rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  New
                </Button>
              </motion.div>

              {loadingSuggestions ? (
                <div className="text-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#d97757] mx-auto" />
                </div>
              ) : userSuggestions.length === 0 ? (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border-2 border-dashed border-[#e8e6dc] p-12 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#d97757]/10 flex items-center justify-center mx-auto mb-5">
                    <MessageSquare className="w-6 h-6 text-[#d97757]" />
                  </div>
                  <h3 className="font-bold text-[#141413] mb-2" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                    No suggestions yet
                  </h3>
                  <p className="text-sm text-[#b0aea5] mb-5" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                    Your ideas help shape our product. Be the first to suggest something!
                  </p>
                  <Button
                    onClick={() => setShowSuggestForm(true)}
                    size="sm"
                    variant="outline"
                    className="border-[#e8e6dc] text-[#141413]/60 hover:bg-[#141413]/[0.03] rounded-xl"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Suggest a Feature
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {userSuggestions.map((suggestion) => (
                    <motion.div
                      key={suggestion.id}
                      variants={cardVariants}
                      className="bg-white rounded-2xl border border-[#e8e6dc] p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4
                            className="font-semibold text-[#141413] mb-2"
                            style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
                          >
                            {suggestion.title}
                          </h4>
                          <p className="text-sm text-[#141413]/55 mb-3" style={{ fontFamily: 'Lora, Georgia, serif' }}>
                            {suggestion.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className={`text-xs rounded-lg ${
                                suggestion.status === 'accepted' ? 'bg-[#788c5d]/10 text-[#788c5d] border-[#788c5d]/20' :
                                suggestion.status === 'under-review' ? 'bg-[#6a9bcc]/10 text-[#6a9bcc] border-[#6a9bcc]/20' :
                                suggestion.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-200' :
                                'bg-amber-50 text-amber-600 border-amber-200'
                              }`}
                            >
                              {suggestion.status === 'pending' ? 'Pending Review' :
                               suggestion.status === 'under-review' ? 'Under Review' :
                               suggestion.status === 'accepted' ? 'Accepted' :
                               suggestion.status === 'rejected' ? 'Not Planned' :
                               suggestion.status}
                            </Badge>
                            {suggestion.category && (
                              <Badge variant="outline" className="text-xs border-[#e8e6dc] text-[#b0aea5] rounded-lg">
                                {suggestion.category}
                              </Badge>
                            )}
                            <span className="text-xs text-[#b0aea5] ml-auto">
                              {new Date(suggestion.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* --- BOTTOM CTA --- */}
      <section className="relative overflow-hidden bg-[#141413] py-20">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #faf9f5 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d97757]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#6a9bcc]/10 rounded-full blur-[100px]" />

        <div className="relative container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="max-w-2xl mx-auto text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#faf9f5] mb-4"
              style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
            >
              Have an Idea?
            </h2>
            <p
              className="text-lg text-[#faf9f5]/50 mb-10 leading-relaxed"
              style={{ fontFamily: 'Lora, Georgia, serif' }}
            >
              We'd love to hear your suggestions and feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-[#d97757] hover:bg-[#c4674a] text-white rounded-xl px-8 h-12 font-semibold shadow-lg shadow-[#d97757]/20"
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
                className="border-[#faf9f5]/15 text-[#faf9f5] hover:bg-[#faf9f5]/5 rounded-xl px-8 h-12 font-semibold"
                asChild
              >
                <a href="mailto:support@cookie-banner.ca">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
