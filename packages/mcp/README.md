# @cookie-banner/mcp

Manage [cookie-banner.ca](https://www.cookie-banner.ca) consent banners from the terminal or any MCP-compatible AI coding agent (Claude Code, Cursor, Windsurf, etc.).

## What you can do

| Tool | Purpose |
|------|---------|
| `list_banners` | List your banners |
| `get_banner` | Full config + install snippet |
| `update_banner` | Change copy, colors, layout, active state |
| `create_banner` | Create a new banner |
| `delete_banner` | Delete a banner |
| `get_install_snippet` | Script tag for your site |

## Setup

### 1. Create a developer API key

1. Sign in at [cookie-banner.ca](https://www.cookie-banner.ca)
2. Open **Dashboard → Settings → Developer**
3. Generate an API key (`cb_…`)
4. Copy it once — it will not be shown again

### 2. Install

```bash
# From this monorepo
cd packages/mcp
npm install
npm run build
```

Or point your MCP client at `tsx src/index.ts` for local development.

### 3. Configure your MCP client

**Claude Code / Claude Desktop** (`claude_desktop_config.json` or project MCP config):

```json
{
  "mcpServers": {
    "cookie-banner": {
      "command": "node",
      "args": ["/absolute/path/to/packages/mcp/dist/index.js"],
      "env": {
        "COOKIE_BANNER_API_KEY": "cb_your_key_here"
      }
    }
  }
}
```

**Local API (dev):**

```json
{
  "env": {
    "COOKIE_BANNER_API_KEY": "cb_your_key_here",
    "COOKIE_BANNER_API_URL": "http://localhost:3000"
  }
}
```

## Example prompts

- “List my cookie banners”
- “Update banner `<id>` title to We value your privacy and set the accept button to Got it”
- “Disable banner `<id>`”
- “Give me the install snippet for banner `<id>`”

## Auth

- Developer keys use the `cb_` prefix
- Consumer / extension keys (`ck_`) are **not** accepted
- Keys can be revoked anytime from Dashboard → Settings → Developer

## REST API (same auth)

The MCP server is a thin wrapper over:

- `GET/POST /api/v1/developer/banners`
- `GET/PATCH/DELETE /api/v1/developer/banners/:id`

```bash
curl -H "Authorization: Bearer cb_…" \
  https://www.cookie-banner.ca/api/v1/developer/banners
```
