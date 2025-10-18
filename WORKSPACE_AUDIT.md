# Workspace System Audit

## Current State Analysis

### Database Schema
- **Team Table**: `id`, `name`, `owner_id`, `created_at`, `updated_at`
- **TeamMember Table**: `id`, `team_id`, `user_id`, `role`, `invited_by`, `joined_at`, `created_at`, `updated_at`
- **TeamInvitation Table**: `id`, `team_id`, `email`, `role`, `token`, `invited_by`, `expires_at`, `accepted_at`, `status`, `created_at`
- **User Table**: Has `current_team_id` column
- **Project Table**: Has `team_id` column

### Current Issues Identified

1. **Multiple Workspace Creation Points**
   - Registration endpoint creates workspaces ✅ (GOOD)
   - Auth flow creates workspaces ❌ (BAD - should only retrieve)
   - Banners route creates workspaces ❌ (BAD - should only retrieve)
   - Invitation endpoint creates workspaces ❌ (BAD - should only retrieve)

2. **Session Management Issues**
   - User session shows `currentTeamId: undefined` even after workspace creation
   - Database is updated but session is not refreshed
   - Multiple API calls trigger multiple workspace creation attempts

3. **Database Schema Inconsistencies**
   - Multiple SQL scripts with different column naming conventions
   - Some use `snake_case` (created_at), others use `camelCase` (createdAt)
   - Foreign key relationships may be broken

4. **Console Output Shows**
   - User has `currentTeamId: undefined` in session
   - Banners route is called multiple times
   - Each call tries to create a new workspace
   - Database queries are failing with relationship errors

### Root Cause Analysis

The fundamental issue is that **the session is not being updated with the workspace information** after workspace creation. This causes:

1. **Auth flow** creates workspace but session still shows `currentTeamId: undefined`
2. **Banners route** sees `currentTeamId: undefined` and tries to create another workspace
3. **Multiple API calls** each trigger workspace creation because session never gets updated
4. **Database gets polluted** with duplicate workspaces

### What We Need to Fix

1. **Single Source of Truth**: Only registration should create workspaces
2. **Session Management**: Ensure session gets updated with `currentTeamId`
3. **Database Cleanup**: Remove duplicate workspaces
4. **Consistent Schema**: Fix any column naming inconsistencies
5. **Proper Error Handling**: Handle cases where workspace doesn't exist gracefully

### Proposed Solution

1. **Remove workspace creation from auth flow and banners route**
2. **Add session refresh after workspace creation in registration**
3. **Clean up existing duplicate workspaces**
4. **Fix any database schema issues**
5. **Add proper error handling for missing workspaces**

## Next Steps

1. First, let's clean up the database
2. Then fix the code to have single source of truth
3. Test the complete flow
4. Verify no more duplicates are created
