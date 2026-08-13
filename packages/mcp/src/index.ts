#!/usr/bin/env node
/**
 * cookie-banner.ca MCP server
 *
 * Authenticate with a developer API key (Dashboard → Settings → Developer)
 * and manage banners from Claude Code, Cursor, or any MCP-compatible client.
 *
 * Env:
 *   COOKIE_BANNER_API_KEY  — required (cb_…)
 *   COOKIE_BANNER_API_URL  — optional, default https://www.cookie-banner.ca
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const API_KEY = process.env.COOKIE_BANNER_API_KEY || ''
const BASE_URL = (
  process.env.COOKIE_BANNER_API_URL || 'https://www.cookie-banner.ca'
).replace(/\/$/, '')

if (!API_KEY) {
  console.error(
    'COOKIE_BANNER_API_KEY is required. Generate one at Dashboard → Settings → Developer.'
  )
  process.exit(1)
}

if (!API_KEY.startsWith('cb_')) {
  console.error(
    'COOKIE_BANNER_API_KEY must start with cb_ (developer key). Consumer ck_ keys are not supported.'
  )
  process.exit(1)
}

async function api<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const text = await res.text()
  let body: unknown = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = { raw: text }
  }

  if (!res.ok) {
    const message =
      (body as { message?: string; error?: string } | null)?.message ||
      (body as { error?: string } | null)?.error ||
      `HTTP ${res.status}`
    throw new Error(message)
  }

  return body as T
}

function jsonResult(data: unknown) {
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  }
}

function errorResult(err: unknown) {
  const message = err instanceof Error ? err.message : String(err)
  return {
    content: [{ type: 'text' as const, text: `Error: ${message}` }],
    isError: true,
  }
}

const server = new Server(
  {
    name: 'cookie-banner',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_banners',
      description:
        'List all cookie consent banners for the authenticated account (id, name, active, install URL).',
      inputSchema: {
        type: 'object',
        properties: {},
      },
    },
    {
      name: 'get_banner',
      description:
        'Get full details for a banner including config and install snippet.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: {
            type: 'string',
            description: 'Banner UUID',
          },
        },
        required: ['banner_id'],
      },
    },
    {
      name: 'update_banner',
      description:
        'Update a banner. Supports name, isActive, and common copy/style fields (title, message, acceptButton, rejectButton, position, primaryColor, backgroundColor, textColor) or a full config object merge.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
          name: { type: 'string', description: 'Banner display name' },
          isActive: {
            type: 'boolean',
            description: 'Enable or disable the live banner',
          },
          title: { type: 'string' },
          message: { type: 'string' },
          acceptButton: { type: 'string' },
          rejectButton: { type: 'string' },
          preferencesButton: { type: 'string' },
          position: {
            type: 'string',
            description: 'Layout position e.g. bottom, top, floating-bottom-right, modal',
          },
          primaryColor: { type: 'string' },
          backgroundColor: { type: 'string' },
          textColor: { type: 'string' },
          config: {
            type: 'object',
            description: 'Partial config object merged into the existing banner config',
          },
        },
        required: ['banner_id'],
      },
    },
    {
      name: 'create_banner',
      description: 'Create a new cookie consent banner.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Banner name' },
          config: {
            type: 'object',
            description: 'Optional initial config (title, message, position, colors, etc.)',
          },
        },
        required: ['name'],
      },
    },
    {
      name: 'delete_banner',
      description: 'Permanently delete a banner.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
        },
        required: ['banner_id'],
      },
    },
    {
      name: 'get_install_snippet',
      description:
        'Return the script tag to embed a banner on a website.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
        },
        required: ['banner_id'],
      },
    },
  ],
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  const a = (args || {}) as Record<string, unknown>

  try {
    switch (name) {
      case 'list_banners': {
        const data = await api('/api/v1/developer/banners')
        return jsonResult(data)
      }

      case 'get_banner': {
        const id = String(a.banner_id || '')
        if (!id) throw new Error('banner_id is required')
        const data = await api(`/api/v1/developer/banners/${id}`)
        return jsonResult(data)
      }

      case 'update_banner': {
        const id = String(a.banner_id || '')
        if (!id) throw new Error('banner_id is required')
        const { banner_id: _omit, ...patch } = a
        const data = await api(`/api/v1/developer/banners/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(patch),
        })
        return jsonResult(data)
      }

      case 'create_banner': {
        const bannerName = String(a.name || '').trim()
        if (!bannerName) throw new Error('name is required')
        const data = await api('/api/v1/developer/banners', {
          method: 'POST',
          body: JSON.stringify({
            name: bannerName,
            config: a.config || undefined,
          }),
        })
        return jsonResult(data)
      }

      case 'delete_banner': {
        const id = String(a.banner_id || '')
        if (!id) throw new Error('banner_id is required')
        const data = await api(`/api/v1/developer/banners/${id}`, {
          method: 'DELETE',
        })
        return jsonResult(data)
      }

      case 'get_install_snippet': {
        const id = String(a.banner_id || '')
        if (!id) throw new Error('banner_id is required')
        const data = (await api(`/api/v1/developer/banners/${id}`)) as {
          banner?: { installSnippet?: string; installUrl?: string }
        }
        return jsonResult({
          installSnippet:
            data.banner?.installSnippet ||
            `<script async src="${BASE_URL}/api/v1/banner.js?id=${id}"></script>`,
          installUrl: data.banner?.installUrl,
        })
      }

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (err) {
    return errorResult(err)
  }
})

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error(`cookie-banner MCP ready → ${BASE_URL}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
