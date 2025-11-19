-- Fixed ConsentBanner table setup for NextAuth.js
-- Run this in your Supabase SQL Editor

-- Drop the table if it exists (in case of previous failed attempts)
DROP TABLE IF EXISTS "ConsentBanner";

-- Create the ConsentBanner table with lowercase column names
CREATE TABLE "ConsentBanner" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  name TEXT NOT NULL,
  config JSONB NOT NULL,
  "isActive" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on userId for faster queries
CREATE INDEX "ConsentBanner_userId_idx" ON "ConsentBanner"("userId");

-- Create an index on createdAt for sorting
CREATE INDEX "ConsentBanner_createdAt_idx" ON "ConsentBanner"("createdAt");

-- Create a function to automatically update the updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updatedAt when a row is updated
CREATE TRIGGER update_consent_banner_updated_at 
  BEFORE UPDATE ON "ConsentBanner" 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON "ConsentBanner" TO postgres;
GRANT ALL ON "ConsentBanner" TO authenticated;
GRANT ALL ON "ConsentBanner" TO service_role;
