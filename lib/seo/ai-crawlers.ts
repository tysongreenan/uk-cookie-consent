const AI_CRAWLERS: Array<{ needle: string; name: string }> = [
  { needle: 'oai-searchbot', name: 'OAI-SearchBot' },
  { needle: 'chatgpt-user', name: 'ChatGPT-User' },
  { needle: 'gptbot', name: 'GPTBot' },
  { needle: 'claudebot', name: 'ClaudeBot' },
  { needle: 'claude-web', name: 'Claude-Web' },
  { needle: 'anthropic-ai', name: 'anthropic-ai' },
  { needle: 'perplexitybot', name: 'PerplexityBot' },
  { needle: 'applebot-extended', name: 'Applebot-Extended' },
  { needle: 'applebot', name: 'Applebot' },
  { needle: 'google-extended', name: 'Google-Extended' },
  { needle: 'amazonbot', name: 'Amazonbot' },
  { needle: 'bytespider', name: 'Bytespider' },
  { needle: 'ccbot', name: 'CCBot' },
  { needle: 'cohere-ai', name: 'cohere-ai' },
]

export function detectAiCrawler(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null
  const ua = userAgent.toLowerCase()
  for (const bot of AI_CRAWLERS) {
    if (ua.includes(bot.needle)) return bot.name
  }
  return null
}

export function aiCrawlerLogLine(input: {
  bot: string
  path: string
  method: string
  accept: string
  markdown: boolean
}): string {
  return JSON.stringify({
    event: 'ai_crawler',
    bot: input.bot,
    path: input.path,
    method: input.method,
    accept: input.accept,
    markdown: input.markdown,
  })
}
