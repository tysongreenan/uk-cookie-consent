-- Developer / MCP API keys (distinct from consumer ck_ extension keys)
CREATE TABLE IF NOT EXISTS developer_api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'MCP Server',
  prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(prefix)
);

CREATE INDEX IF NOT EXISTS developer_api_keys_user_id_idx ON developer_api_keys(user_id);
CREATE INDEX IF NOT EXISTS developer_api_keys_prefix_idx ON developer_api_keys(prefix) WHERE revoked_at IS NULL;

ALTER TABLE developer_api_keys ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'developer_api_keys'
      AND policyname = 'Service role full access developer keys'
  ) THEN
    CREATE POLICY "Service role full access developer keys"
      ON developer_api_keys FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;
