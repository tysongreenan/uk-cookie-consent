import { describe, expect, it } from 'vitest'
import { aiCrawlerLogLine, detectAiCrawler } from '@/lib/seo/ai-crawlers'

describe('detectAiCrawler', () => {
  it('returns null for browsers and empty agents', () => {
    expect(detectAiCrawler(null)).toBeNull()
    expect(detectAiCrawler('Mozilla/5.0 (Macintosh) Chrome/128.0.0.0')).toBeNull()
  })

  it('identifies search and assistant crawlers', () => {
    expect(detectAiCrawler('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2)')).toBe('GPTBot')
    expect(detectAiCrawler('Mozilla/5.0 (compatible; OAI-SearchBot/1.0)')).toBe('OAI-SearchBot')
    expect(detectAiCrawler('ChatGPT-User/1.0')).toBe('ChatGPT-User')
    expect(detectAiCrawler('Mozilla/5.0 AppleWebKit/537.36 compatible; ClaudeBot/1.0')).toBe('ClaudeBot')
    expect(detectAiCrawler('Mozilla/5.0 (compatible; PerplexityBot/1.0)')).toBe('PerplexityBot')
  })

  it('does not treat a longer token as a shorter one out of order', () => {
    expect(detectAiCrawler('Applebot-Extended/1.0')).toBe('Applebot-Extended')
    expect(detectAiCrawler('Mozilla/5.0 (compatible; Applebot/0.1)')).toBe('Applebot')
  })
})

describe('aiCrawlerLogLine', () => {
  it('emits a filterable JSON line', () => {
    const line = aiCrawlerLogLine({
      bot: 'GPTBot',
      path: '/blog/cookie-consent-canada-guide-2026',
      method: 'GET',
      accept: 'text/markdown',
      markdown: true,
    })
    expect(JSON.parse(line)).toMatchObject({
      event: 'ai_crawler',
      bot: 'GPTBot',
      markdown: true,
    })
  })
})
