-- Migration: Add Banner Analytics Tracking
-- This migration adds analytics capabilities to track banner performance

-- Create the main analytics table (using TEXT for consistency with existing schema)
CREATE TABLE IF NOT EXISTS banner_stats (
  id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT REFERENCES "User"(id) ON DELETE CASCADE,
  date date NOT NULL,
  
  -- Core metrics
  accepts integer DEFAULT 0,
  rejects integer DEFAULT 0,
  dismisses integer DEFAULT 0,
  impressions integer DEFAULT 0,
  
  -- Advanced metrics
  total_decision_time_ms bigint DEFAULT 0,
  decision_count integer DEFAULT 0,
  returning_visitor_impressions integer DEFAULT 0,
  
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  
  UNIQUE(user_id, date)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_banner_stats_user_date ON banner_stats(user_id, date DESC);

-- Add RLS policies
ALTER TABLE banner_stats ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own stats
CREATE POLICY "Users can view their own stats"
  ON banner_stats FOR SELECT
  USING (user_id = auth.uid());

-- Policy for service role to insert/update stats
CREATE POLICY "Service role can insert/update stats"
  ON banner_stats FOR ALL
  USING (true);

-- Function to increment stats atomically
CREATE OR REPLACE FUNCTION increment_banner_stat(
  p_user_id TEXT,
  p_date date,
  p_event_type text,
  p_decision_time_ms integer DEFAULT NULL,
  p_is_returning boolean DEFAULT false
)
RETURNS void AS $$
BEGIN
  INSERT INTO banner_stats (
    user_id, 
    date, 
    accepts, 
    rejects, 
    dismisses, 
    impressions,
    total_decision_time_ms,
    decision_count,
    returning_visitor_impressions
  )
  VALUES (
    p_user_id,
    p_date,
    CASE WHEN p_event_type = 'accept' THEN 1 ELSE 0 END,
    CASE WHEN p_event_type = 'reject' THEN 1 ELSE 0 END,
    CASE WHEN p_event_type = 'dismiss' THEN 1 ELSE 0 END,
    CASE WHEN p_event_type = 'impression' THEN 1 ELSE 0 END,
    COALESCE(p_decision_time_ms, 0),
    CASE WHEN p_decision_time_ms IS NOT NULL THEN 1 ELSE 0 END,
    CASE WHEN p_is_returning THEN 1 ELSE 0 END
  )
  ON CONFLICT (user_id, date) 
  DO UPDATE SET
    accepts = banner_stats.accepts + CASE WHEN p_event_type = 'accept' THEN 1 ELSE 0 END,
    rejects = banner_stats.rejects + CASE WHEN p_event_type = 'reject' THEN 1 ELSE 0 END,
    dismisses = banner_stats.dismisses + CASE WHEN p_event_type = 'dismiss' THEN 1 ELSE 0 END,
    impressions = banner_stats.impressions + CASE WHEN p_event_type = 'impression' THEN 1 ELSE 0 END,
    total_decision_time_ms = banner_stats.total_decision_time_ms + COALESCE(p_decision_time_ms, 0),
    decision_count = banner_stats.decision_count + CASE WHEN p_decision_time_ms IS NOT NULL THEN 1 ELSE 0 END,
    returning_visitor_impressions = banner_stats.returning_visitor_impressions + CASE WHEN p_is_returning THEN 1 ELSE 0 END,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add subscription fields to User table (or create user_settings if it doesn't exist)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS 
  subscription_tier text DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'agency', 'agency_pro', 'enterprise'));

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS 
  analytics_enabled boolean DEFAULT false;

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS 
  max_websites integer DEFAULT 1;

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS 
  stripe_customer_id text;

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS 
  stripe_subscription_id text;

-- Create banner_configs table if it doesn't exist (for the new embed system)
CREATE TABLE IF NOT EXISTS banner_configs (
  id TEXT NOT NULL PRIMARY KEY,
  user_id TEXT REFERENCES "User"(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'My Banner',
  
  -- Configuration data
  colors jsonb NOT NULL DEFAULT '{
    "background": "#ffffff",
    "text": "#333333", 
    "acceptButton": "#007bff",
    "rejectButton": "#6c757d"
  }'::jsonb,
  
  text jsonb NOT NULL DEFAULT '{
    "message": "We use cookies to enhance your browsing experience.",
    "acceptButton": "Accept All",
    "rejectButton": "Reject All"
  }'::jsonb,
  
  position text DEFAULT 'bottom' CHECK (position IN ('top', 'bottom')),
  
  -- Scripts to inject on accept
  scripts jsonb DEFAULT '[]'::jsonb,
  
  -- Banner settings
  is_active boolean DEFAULT true,
  compliance_framework text DEFAULT 'gdpr' CHECK (compliance_framework IN ('gdpr', 'ccpa', 'pipeda', 'custom')),
  
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Add RLS for banner_configs
ALTER TABLE banner_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own banner configs"
  ON banner_configs FOR ALL
  USING (user_id = auth.uid());

-- Index for banner_configs
CREATE INDEX IF NOT EXISTS idx_banner_configs_user ON banner_configs(user_id);

-- Add a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to both tables
DROP TRIGGER IF EXISTS update_banner_stats_updated_at ON banner_stats;
CREATE TRIGGER update_banner_stats_updated_at
    BEFORE UPDATE ON banner_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_banner_configs_updated_at ON banner_configs;
CREATE TRIGGER update_banner_configs_updated_at
    BEFORE UPDATE ON banner_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
