'use client'

import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { memo, useMemo, useState } from 'react'

type TokenType = 'comment' | 'string' | 'keyword' | 'tag' | 'attr' | 'fn' | null

type Token = { type: TokenType; content: string }

const tokenStyles: Record<Exclude<TokenType, null>, string> = {
  comment: 'text-muted-foreground',
  string: 'text-emerald-700 dark:text-emerald-400',
  keyword: 'text-sky-800 dark:text-sky-300',
  tag: 'text-rose-700 dark:text-rose-300',
  attr: 'text-amber-800 dark:text-amber-300',
  fn: 'text-foreground',
}

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'true', 'false', 'null',
  'undefined', 'new', 'if', 'else', 'window', 'import', 'export', 'from',
])

function push(tokens: Token[], type: TokenType, content: string) {
  if (content) tokens.push({ type, content })
}

function tokenizeJs(line: string): Token[] {
  const tokens: Token[] = []
  const re = /(\/\/.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b(?:const|let|var|function|return|true|false|null|undefined|new|if|else|window|import|export|from)\b)|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_$][\w$]*)|([^A-Za-z_$"'\s]+)|(\s+)/g
  let match: RegExpExecArray | null
  let last = 0
  while ((match = re.exec(line))) {
    if (match.index > last) push(tokens, null, line.slice(last, match.index))
    if (match[1]) push(tokens, 'comment', match[1])
    else if (match[2]) push(tokens, 'string', match[2])
    else if (match[3] && JS_KEYWORDS.has(match[3])) push(tokens, 'keyword', match[3])
    else if (match[4]) push(tokens, 'fn', match[4])
    else push(tokens, null, match[0])
    last = match.index + match[0].length
  }
  if (last < line.length) push(tokens, null, line.slice(last))
  return tokens.length ? tokens : [{ type: null, content: line || ' ' }]
}

function tokenizeHtml(line: string): Token[] {
  const tokens: Token[] = []
  const re = /(<!--[\s\S]*?-->)|(<\/?[\w:-]+)|(\/?>)|([\w:-]+)(?==)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|([^<\s"']+)|(\s+)/g
  let match: RegExpExecArray | null
  let last = 0
  while ((match = re.exec(line))) {
    if (match.index > last) push(tokens, null, line.slice(last, match.index))
    if (match[1]) push(tokens, 'comment', match[1])
    else if (match[2]) push(tokens, 'tag', match[2])
    else if (match[3]) push(tokens, 'tag', match[3])
    else if (match[4]) push(tokens, 'attr', match[4])
    else if (match[5]) push(tokens, 'string', match[5])
    else push(tokens, null, match[0])
    last = match.index + match[0].length
  }
  if (last < line.length) push(tokens, null, line.slice(last))
  return tokens.length ? tokens : [{ type: null, content: line || ' ' }]
}

function tokenizeLine(line: string, language: string): Token[] {
  if (language === 'html' || language === 'xml') return tokenizeHtml(line)
  if (language === 'js' || language === 'javascript' || language === 'jsx' || language === 'ts' || language === 'tsx') {
    return tokenizeJs(line)
  }
  return [{ type: null, content: line || ' ' }]
}

function splitLines(text: string) {
  const trimmed = text.replace(/^\n/, '').replace(/\n$/, '')
  return trimmed.split('\n')
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export interface CodeBlockProps {
  children: string
  language?: string
  className?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  showHeader?: boolean
}

export const CodeBlock = memo(function CodeBlock({
  children,
  language = 'code',
  className,
  showLineNumbers = true,
  showCopyButton = true,
  showHeader = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lines = useMemo(() => splitLines(children), [children])
  const tokenized = useMemo(
    () => lines.map((line) => tokenizeLine(line, language)),
    [lines, language],
  )

  const handleCopy = async () => {
    const ok = await copyToClipboard(lines.join('\n'))
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={cn('my-0 overflow-hidden rounded-lg border border-border bg-muted/40', className)}>
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border/60 bg-muted px-3 py-2">
          <span className="font-mono text-xs text-muted-foreground">{language}</span>
          {showCopyButton && (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-background hover:text-foreground"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="grid font-mono text-xs text-foreground">
          {lines.map((line, i) => (
            <span
              key={i}
              className={cn('grid gap-4', showLineNumbers ? 'grid-cols-[auto_1fr]' : 'grid-cols-1')}
            >
              {showLineNumbers && (
                <span className="min-w-[2ch] select-none text-right text-xs leading-6 text-muted-foreground/70">
                  {i + 1}
                </span>
              )}
              <span className="whitespace-pre leading-6">
                {(tokenized[i] ?? [{ type: null, content: line || ' ' }]).map((token, j) =>
                  token.type ? (
                    <span key={j} className={tokenStyles[token.type]}>{token.content}</span>
                  ) : (
                    <span key={j}>{token.content || ' '}</span>
                  ),
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
})
