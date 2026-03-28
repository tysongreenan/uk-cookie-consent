CREATE TABLE privacy_policies (
  id text NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
  user_id text NOT NULL,
  team_id text,
  name text NOT NULL DEFAULT 'My Privacy Policy',
  slug text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  inputs jsonb NOT NULL DEFAULT '{}',
  content_html text NOT NULL DEFAULT '',
  content_json jsonb NOT NULL DEFAULT '{}',
  is_hosted boolean NOT NULL DEFAULT false,
  jurisdictions text[] NOT NULL DEFAULT '{}',
  language text NOT NULL DEFAULT 'en',
  version int NOT NULL DEFAULT 1,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_privacy_policies_slug ON privacy_policies (slug) WHERE slug IS NOT NULL;
CREATE INDEX idx_privacy_policies_user ON privacy_policies (user_id);

CREATE TABLE privacy_policy_versions (
  id text NOT NULL DEFAULT gen_random_uuid()::text PRIMARY KEY,
  policy_id text NOT NULL REFERENCES privacy_policies(id) ON DELETE CASCADE,
  version int NOT NULL,
  content_html text NOT NULL,
  content_json jsonb NOT NULL DEFAULT '{}',
  inputs jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(policy_id, version)
);

ALTER TABLE privacy_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_policy_versions ENABLE ROW LEVEL SECURITY;
