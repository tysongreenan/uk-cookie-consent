-- Add password reset token fields to User table
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "resetToken" TEXT,
  ADD COLUMN IF NOT EXISTS "resetTokenExpiresAt" TIMESTAMPTZ;
