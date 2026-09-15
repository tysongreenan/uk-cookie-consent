#!/usr/bin/env node
/**
 * cookie-banner.ca MCP server
 *
 * npx -y @cookie-banner/mcp
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
    'COOKIE_BANNER_API_KEY is required. Generate one at https://www.cookie-banner.ca/integrations/ai'
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

function requiredString(value: unknown, name: string): string {
  const text = typeof value === 'string' ? value.trim() : ''
  if (!text) throw new Error(`${name} is required`)
  return text
}

const SCRIPT_PROPERTIES = {
  template: {
    type: 'string',
    description:
      'google-analytics-4 | google-tag-manager | facebook-pixel | microsoft-clarity | hotjar | linkedin-insight | tiktok-pixel | google-ads | intercom | custom',
  },
  measurementId: { type: 'string', description: 'GA4 id, e.g. G-XXXXXXXX' },
  containerId: { type: 'string', description: 'GTM container, e.g. GTM-XXXXXXX' },
  pixelId: { type: 'string', description: 'Meta or TikTok pixel id' },
  projectId: { type: 'string', description: 'Microsoft Clarity project id' },
  siteId: { type: 'string', description: 'Hotjar site id' },
  partnerId: { type: 'string', description: 'LinkedIn partner id' },
  conversionId: { type: 'string', description: 'Google Ads id, e.g. AW-123456789' },
  appId: { type: 'string', description: 'Intercom app id' },
  name: { type: 'string', description: 'Optional display name' },
  category: {
    type: 'string',
    description:
      'strictly-necessary | functionality | tracking-performance | targeting-advertising',
  },
  scriptCode: {
    type: 'string',
    description: 'Raw <script> HTML. Required when template is custom.',
  },
  enabled: { type: 'boolean' },
}

const server = new Server(
  {
    name: 'cookie-banner',
    version: '1.0.0',
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
      name: 'setup_site',
      description:
        'One-shot install: create a consent banner, attach tracking scripts (GA4, GTM, Meta, Clarity, Hotjar, …), and return the header snippet plus where to paste it. Prefer this when setting up cookie-banner.ca on a new website. After setup, enable the visitor Accessibility Menu with update_banner({ config: { accessibility: { enabled: true } } }) — it rides in the same snippet.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Banner name, usually the site name' },
          site_url: { type: 'string', description: 'Public site URL' },
          framework: {
            type: 'string',
            description:
              'nextjs | react | wordpress | shopify | squarespace | wix | gtm | html',
          },
          compliance: {
            type: 'string',
            description: 'pipeda | gdpr | ccpa | law25. Default pipeda.',
          },
          privacy_policy_url: { type: 'string' },
          scripts: {
            type: 'array',
            description: 'Tracking scripts to attach. Each item uses the add_script fields.',
            items: {
              type: 'object',
              properties: SCRIPT_PROPERTIES,
            },
          },
        },
        required: ['name'],
      },
    },
    {
      name: 'list_script_templates',
      description:
        'List first-class tracking templates (GA4, GTM, Meta Pixel, Clarity, Hotjar, …) and the id field each one needs.',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'add_script',
      description:
        'Attach a tracking template or custom script to an existing banner. Scripts load only after the matching consent category is granted.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
          ...SCRIPT_PROPERTIES,
        },
        required: ['banner_id', 'template'],
      },
    },
    {
      name: 'list_scripts',
      description: 'List tracking scripts and the GA4 integration on a banner.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
        },
        required: ['banner_id'],
      },
    },
    {
      name: 'remove_script',
      description: 'Remove a script (or the GA4 integration) from a banner.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
          script_id: { type: 'string', description: 'Script id, or ga4-integration' },
        },
        required: ['banner_id', 'script_id'],
      },
    },
    {
      name: 'list_banners',
      description:
        'List all cookie consent banners for the authenticated account (id, name, active, install URL).',
      inputSchema: { type: 'object', properties: {} },
    },
    {
      name: 'get_banner',
      description: 'Get full details for a banner including config and install snippet.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
          framework: {
            type: 'string',
            description:
              'Optional. nextjs | react | wordpress | shopify | squarespace | wix | gtm | html — adds paste-here instructions.',
          },
        },
        required: ['banner_id'],
      },
    },
    {
      name: 'update_banner',
      description:
        'Update a banner. Supports name, isActive, and common copy/style fields (title, message, acceptButton, rejectButton, position, primaryColor, backgroundColor, textColor) or a full config object merge. To turn on the visitor Accessibility Menu (font size, contrast, motion, focus aids — delivered through the same snippet), pass config: { accessibility: { enabled: true } }.',
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
            description:
              'Partial config object merged into the existing banner config. Example: { accessibility: { enabled: true } } enables the Accessibility Menu.',
          },
        },
        required: ['banner_id'],
      },
    },
    {
      name: 'create_banner',
      description:
        'Create a new cookie consent banner. Prefer setup_site when installing on a website for the first time.',
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
        'Return the script tag to embed a banner, plus optional framework-specific paste instructions.',
      inputSchema: {
        type: 'object',
        properties: {
          banner_id: { type: 'string', description: 'Banner UUID' },
          framework: {
            type: 'string',
            description:
              'Optional. nextjs | react | wordpress | shopify | squarespace | wix | gtm | html',
          },
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
      case 'setup_site': {
        const bannerName = requiredString(a.name, 'name')
        const data = await api('/api/v1/developer/setup', {
          method: 'POST',
          body: JSON.stringify({
            name: bannerName,
            site_url: a.site_url,
            framework: a.framework,
            compliance: a.compliance,
            privacy_policy_url: a.privacy_policy_url,
            scripts: a.scripts || [],
          }),
        })
        return jsonResult(data)
      }

      case 'list_script_templates': {
        const data = await api('/api/v1/developer/scripts/templates')
        return jsonResult(data)
      }

      case 'add_script': {
        const id = requiredString(a.banner_id, 'banner_id')
        const { banner_id: _omit, ...script } = a
        const data = await api(`/api/v1/developer/banners/${id}/scripts`, {
          method: 'POST',
          body: JSON.stringify(script),
        })
        return jsonResult(data)
      }

      case 'list_scripts': {
        const id = requiredString(a.banner_id, 'banner_id')
        const data = await api(`/api/v1/developer/banners/${id}/scripts`)
        return jsonResult(data)
      }

      case 'remove_script': {
        const id = requiredString(a.banner_id, 'banner_id')
        const scriptId = requiredString(a.script_id, 'script_id')
        const data = await api(`/api/v1/developer/banners/${id}/scripts`, {
          method: 'DELETE',
          body: JSON.stringify({ script_id: scriptId }),
        })
        return jsonResult(data)
      }

      case 'list_banners': {
        const data = await api('/api/v1/developer/banners')
        return jsonResult(data)
      }

      case 'get_banner': {
        const id = requiredString(a.banner_id, 'banner_id')
        const framework =
          typeof a.framework === 'string' && a.framework
            ? `?framework=${encodeURIComponent(a.framework)}`
            : ''
        const data = await api(`/api/v1/developer/banners/${id}${framework}`)
        return jsonResult(data)
      }

      case 'update_banner': {
        const id = requiredString(a.banner_id, 'banner_id')
        const { banner_id: _omit, ...patch } = a
        const data = await api(`/api/v1/developer/banners/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(patch),
        })
        return jsonResult(data)
      }

      case 'create_banner': {
        const bannerName = requiredString(a.name, 'name')
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
        const id = requiredString(a.banner_id, 'banner_id')
        const data = await api(`/api/v1/developer/banners/${id}`, {
          method: 'DELETE',
        })
        return jsonResult(data)
      }

      case 'get_install_snippet': {
        const id = requiredString(a.banner_id, 'banner_id')
        const framework =
          typeof a.framework === 'string' && a.framework
            ? `?framework=${encodeURIComponent(a.framework)}`
            : ''
        const data = (await api(`/api/v1/developer/banners/${id}${framework}`)) as {
          banner?: {
            installSnippet?: string
            installUrl?: string
            installInstructions?: unknown
          }
        }
        return jsonResult({
          installSnippet:
            data.banner?.installSnippet ||
            `<script src="${BASE_URL}/api/v1/banner.js?id=${id}" async></script>`,
          installUrl: data.banner?.installUrl,
          installInstructions: data.banner?.installInstructions,
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
