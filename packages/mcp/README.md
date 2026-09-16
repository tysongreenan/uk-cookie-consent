# @cookie-banner/mcp

MCP server for [cookie-banner.ca](https://www.cookie-banner.ca). Connect Claude Code, Cursor, Windsurf, VS Code, or any MCP client and let the agent create the banner, attach tracking scripts, and paste the header snippet.

Public setup guide: [https://www.cookie-banner.ca/integrations/ai](https://www.cookie-banner.ca/integrations/ai)

## Install

```bash
npx -y @cookie-banner/mcp
```

You need a developer API key (`cb_…`) from [Set up with AI](https://www.cookie-banner.ca/integrations/ai) or **Dashboard → Settings → Developer**.

## Claude Code

```bash
claude mcp add cookie-banner -e COOKIE_BANNER_API_KEY=cb_your_key -- npx -y @cookie-banner/mcp
```

## Cursor / Windsurf / other clients

```json
{
  "mcpServers": {
    "cookie-banner": {
      "command": "npx",
      "args": ["-y", "@cookie-banner/mcp"],
      "env": {
        "COOKIE_BANNER_API_KEY": "cb_your_key"
      }
    }
  }
}
```

Local API:

```json
{
  "env": {
    "COOKIE_BANNER_API_KEY": "cb_your_key",
    "COOKIE_BANNER_API_URL": "http://localhost:3000"
  }
}
```

## Tools

| Tool | Purpose |
|------|---------|
| `search_domain` | Fetch a live site and return its logo, brand colors, and fonts |
| `setup_site` | One-shot: create banner, attach scripts, apply logo/colors, return header snippet + paste location |
| `list_script_templates` | GA4, GTM, Meta, Clarity, Hotjar, LinkedIn, TikTok, Google Ads, Intercom |
| `add_script` / `list_scripts` / `remove_script` | Manage consent-gated tracking scripts |
| `list_banners` / `get_banner` / `create_banner` / `update_banner` / `delete_banner` | Banner CRUD |
| `get_install_snippet` | Header `<script>` tag, optional `framework` for paste instructions |

## Example prompt

```
Set up cookie-banner.ca on this website. Call search_domain on the live
URL, pass the logo and brand colors into setup_site, attach GA4 / GTM /
Meta IDs from the repo, and paste the snippet in the header.
Then enable the Accessibility Menu with update_banner and
config.accessibility.enabled = true. Same snippet, no second script.
The menu lets visitors adjust display. It does not make the site
WCAG, AODA, or ADA compliant.
```

Sites that already have a different cookie banner can install just the menu:

```html
<script src="https://www.cookie-banner.ca/api/v1/a11y.js?id=BANNER_ID" async></script>
```

## Auth

- Developer keys use the `cb_` prefix
- Consumer / extension keys (`ck_`) are not accepted
- Revoke keys anytime from Dashboard → Settings → Developer
