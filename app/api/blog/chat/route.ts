import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { RateLimit } from '@/lib/rate-limit'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const chatRateLimit = new RateLimit({
  name: 'blog-chat',
  windowMs: 60 * 1000,
  maxRequests: 10,
})

const MAX_MESSAGES = 12
const MAX_INPUT_LENGTH = 1000

export async function POST(req: Request) {
  const { allowed } = await chatRateLimit.check(req)
  if (!allowed) {
    return new Response('Too many requests. Please try again in a minute.', {
      status: 429,
    })
  }

  let body: { messages?: unknown; slug?: unknown }
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid request', { status: 400 })
  }

  const { messages, slug } = body

  if (!slug || typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) {
    return new Response('Invalid slug', { status: 400 })
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('Missing messages', { status: 400 })
  }

  if (messages.length > MAX_MESSAGES) {
    return new Response(
      'Conversation limit reached. Please refresh to start a new one.',
      { status: 400 }
    )
  }

  const lastMessage = messages[messages.length - 1] as UIMessage | undefined
  const lastText = lastMessage?.parts
    ?.filter((p: { type: string }) => p.type === 'text')
    .map((p: { type: string; text?: string }) => p.text ?? '')
    .join('')
  if (lastText && lastText.length > MAX_INPUT_LENGTH) {
    return new Response(
      'Message too long. Keep questions under 1,000 characters.',
      { status: 400 }
    )
  }

  const blogContent = getBlogMarkdown(slug)
  if (!blogContent) {
    return new Response('Blog post not found', { status: 404 })
  }

  const modelMessages = await convertToModelMessages(
    messages as UIMessage[]
  )

  const result = streamText({
    model: createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })('anthropic/claude-haiku-4-5-20251001'),
    system: `You are a knowledgeable compliance assistant embedded in a blog article about Canadian cookie consent laws. Help readers understand the requirements covered in this article.

Rules:
- Answer based ONLY on the article content below — do not invent legal requirements
- Reference specific sections when relevant (e.g. "As covered in the PIPEDA section…")
- Be concise — 2-4 sentences unless the question genuinely needs more
- If the article doesn't cover something, say so and suggest consulting a privacy lawyer
- Decline questions unrelated to Canadian privacy or cookie compliance
- You're not a lawyer — recommend professional legal advice for complex situations
- Use plain text only, no markdown formatting
- Be warm and helpful, not robotic

Article:
${blogContent}`,
    messages: modelMessages,
  })

  return result.toUIMessageStreamResponse()
}

function getBlogMarkdown(slug: string): string | null {
  try {
    const blogDir = fs.realpathSync(path.join(process.cwd(), 'content/blog'))
    const filePath = path.join(blogDir, `${slug}.md`)
    const resolved = fs.realpathSync(filePath)
    if (!resolved.startsWith(blogDir + path.sep)) return null
    const fileContents = fs.readFileSync(resolved, 'utf8')
    const { content } = matter(fileContents)
    return content
  } catch {
    return null
  }
}
