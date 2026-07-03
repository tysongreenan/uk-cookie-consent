'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { useRef, useEffect, useState, useMemo } from 'react'
import { Send, Sparkles, RotateCcw } from 'lucide-react'

interface BlogAssistantProps {
  slug: string
}

function getTextFromMessage(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export function BlogAssistant({ slug }: BlogAssistantProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: '/api/blog/chat',
        body: { slug },
      }),
    [slug]
  )

  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  })

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || status === 'submitted' || status === 'streaming') return
    if (!hasInteracted) setHasInteracted(true)
    sendMessage({ text: trimmed })
    setInput('')
  }

  const isActive = status === 'submitted' || status === 'streaming'
  const userCount = messages.filter((m) => m.role === 'user').length
  const isAtLimit = userCount >= 6

  return (
    <div className="rounded-lg border border-border bg-card/60 backdrop-blur-sm overflow-hidden transition-all">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/40 border-b border-border/50">
        <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="text-[13px] font-medium text-foreground/80">
          Ask about Canadian cookie compliance
        </span>
        {hasInteracted && messages.length > 0 && (
          <button
            onClick={() => {
              setMessages([])
              setHasInteracted(false)
              setInput('')
            }}
            className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            title="Start over"
          >
            <RotateCcw className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      {/* Conversation */}
      {hasInteracted && messages.length > 0 && (
        <div className="max-h-[360px] overflow-y-auto">
          {messages.map((message) => {
            const text = getTextFromMessage(message)
            if (!text) return null
            return (
              <div
                key={message.id}
                className={`px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-muted/30 text-foreground/90'
                    : 'bg-transparent text-foreground'
                }`}
              >
                <span
                  className={`inline-block text-[11px] font-medium mb-1 ${
                    message.role === 'user'
                      ? 'text-muted-foreground'
                      : 'text-primary/80'
                  }`}
                >
                  {message.role === 'user' ? 'You' : 'Compliance Assistant'}
                </span>
                <p className="whitespace-pre-wrap">{text}</p>
              </div>
            )
          })}
          {status === 'submitted' && (
            <div className="px-4 py-3 text-sm">
              <span className="inline-block text-[11px] font-medium mb-1 text-primary/80">
                Compliance Assistant
              </span>
              <div className="flex gap-1 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-4 py-2 text-[12px] text-red-500 bg-red-500/5 border-t border-red-500/10">
          {error.message?.includes('429')
            ? 'Too many messages — please wait a moment and try again.'
            : 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Input */}
      {!isAtLimit ? (
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 px-4 py-2.5 border-t border-border/50"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              hasInteracted
                ? 'Ask a follow-up…'
                : 'e.g. Do I need consent for Google Analytics in Canada?'
            }
            maxLength={1000}
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none"
            disabled={isActive}
          />
          <button
            type="submit"
            disabled={isActive || !input.trim()}
            className="text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors shrink-0"
            aria-label="Send question"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <div className="px-4 py-3 text-[12px] text-muted-foreground text-center border-t border-border/50">
          You&apos;ve reached the question limit. Refresh the page to start a
          new conversation.
        </div>
      )}
    </div>
  )
}
