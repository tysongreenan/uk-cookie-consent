-- Data Subject Access Requests (DSAR) table for Law 25 / GDPR compliance
-- Organizations use this to track and fulfill data access requests from individuals

CREATE TABLE data_access_requests (
  id text PRIMARY KEY DEFAULT gen_random_uuid()::text,
  organization_user_id text NOT NULL,
  team_id text,

  -- Subject identification
  subject_identifier_type text NOT NULL CHECK (subject_identifier_type IN ('email', 'ip', 'name')),
  subject_identifier_value text NOT NULL,
  subject_email text,

  -- Request lifecycle
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'identity_verified', 'processing', 'completed', 'partially_refused', 'refused', 'failed')),
  report_format text NOT NULL DEFAULT 'json'
    CHECK (report_format IN ('json', 'csv', 'pdf')),
  report_storage_path text,

  -- Identity verification
  identity_verified boolean NOT NULL DEFAULT false,
  verification_method text CHECK (verification_method IN ('government_id', 'email_confirmation', 'in_person', 'other')),
  verification_notes text,
  verified_at timestamptz,
  verified_by text,

  -- Partial refusal (Law 25 s.28)
  refused_sections jsonb DEFAULT '[]'::jsonb,
  refusal_reason text,

  -- Deadlines (Law 25: 30 calendar days from receipt)
  requested_at timestamptz NOT NULL DEFAULT now(),
  org_timezone text NOT NULL DEFAULT 'America/Toronto',
  deadline_at timestamptz NOT NULL,
  completed_at timestamptz,

  -- Soft delete (compliance evidence must not be destroyed)
  deleted_at timestamptz,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Prevent duplicate active requests for the same subject within an org
CREATE UNIQUE INDEX idx_dsar_no_duplicate_active
  ON data_access_requests (team_id, subject_identifier_type, subject_identifier_value)
  WHERE status IN ('pending', 'identity_verified', 'processing') AND deleted_at IS NULL;

-- Query indexes
CREATE INDEX idx_dsar_team ON data_access_requests (team_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_dsar_org_user ON data_access_requests (organization_user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_dsar_status ON data_access_requests (status) WHERE deleted_at IS NULL;
CREATE INDEX idx_dsar_deadline ON data_access_requests (deadline_at)
  WHERE status NOT IN ('completed', 'refused', 'partially_refused', 'failed') AND deleted_at IS NULL;

-- Row Level Security — only service_role can access (application enforces team scoping)
ALTER TABLE data_access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access"
  ON data_access_requests FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Supabase Storage bucket for DSAR reports (private)
INSERT INTO storage.buckets (id, name, public) VALUES ('dsar-reports', 'dsar-reports', false)
  ON CONFLICT (id) DO NOTHING;
