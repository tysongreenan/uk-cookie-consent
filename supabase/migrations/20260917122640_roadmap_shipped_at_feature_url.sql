-- Ship dates + feature links on roadmap cards
ALTER TABLE "RoadmapItem"
  ADD COLUMN IF NOT EXISTS "shippedAt" TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS "featureUrl" TEXT;

COMMENT ON COLUMN "RoadmapItem"."shippedAt" IS 'When the feature shipped (completed items). Shown on the public roadmap.';
COMMENT ON COLUMN "RoadmapItem"."featureUrl" IS 'Optional path or URL to the live feature page (e.g. /integrations/ai).';

-- Mark Developer MCP as shipped and link to Set up with AI
UPDATE "RoadmapItem"
SET
  "status" = 'completed',
  "shippedAt" = TIMESTAMPTZ '2026-09-17 12:00:00+00',
  "featureUrl" = '/integrations/ai',
  "title" = 'Set up with AI (MCP)',
  "description" = 'Model Context Protocol server for Claude Code, Cursor, Grok, and Codex. One prompt installs the MCP, creates the banner, wires consent-gated scripts, and returns the header snippet — no dashboard click-through required.',
  "updatedAt" = NOW()
WHERE "id" = 18
  AND "title" ILIKE '%MCP%';
