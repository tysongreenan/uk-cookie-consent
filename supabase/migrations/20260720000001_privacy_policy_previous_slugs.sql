-- Remember old hosted slugs so /p/{old} can 301 to the current URL after rename.
ALTER TABLE privacy_policies
  ADD COLUMN IF NOT EXISTS previous_slugs text[] NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_privacy_policies_previous_slugs
  ON privacy_policies USING GIN (previous_slugs);
