-- Check if users still exist
SELECT COUNT(*) as user_count FROM "User";

-- Check if we can see any users
SELECT id, name, email, "createdAt" FROM "User" LIMIT 5;

-- Check if there are any RLS policies blocking access
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'User';

-- Check if RLS is enabled on User table
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'User';
