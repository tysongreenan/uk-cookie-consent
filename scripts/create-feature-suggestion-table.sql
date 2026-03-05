-- Create FeatureSuggestion table if it doesn't exist
-- Run this in your Supabase SQL Editor

-- Create FeatureSuggestion table
CREATE TABLE IF NOT EXISTS "FeatureSuggestion" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "votes" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "FeatureSuggestion_userId_idx" ON "FeatureSuggestion"("userId");
CREATE INDEX IF NOT EXISTS "FeatureSuggestion_status_idx" ON "FeatureSuggestion"("status");
CREATE INDEX IF NOT EXISTS "FeatureSuggestion_createdAt_idx" ON "FeatureSuggestion"("createdAt");

-- Enable Row Level Security (RLS)
-- Note: Since we're using NextAuth (not Supabase Auth), we'll disable RLS
-- and rely on application-level security checks
ALTER TABLE "FeatureSuggestion" ENABLE ROW LEVEL SECURITY;

-- Create policy: Allow all operations for authenticated users via API
-- This works because we're checking authentication in the API route
CREATE POLICY "Allow authenticated API access"
    ON "FeatureSuggestion"
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions to authenticated role
GRANT INSERT, SELECT, UPDATE ON "FeatureSuggestion" TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE "FeatureSuggestion_id_seq" TO authenticated;

-- Also grant to anon role if needed (but API should handle auth)
GRANT INSERT, SELECT, UPDATE ON "FeatureSuggestion" TO anon;
GRANT USAGE, SELECT ON SEQUENCE "FeatureSuggestion_id_seq" TO anon;

