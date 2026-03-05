-- Safe query to check existing RLS policies without making changes
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('Team', 'TeamMember', 'TeamInvitation')
ORDER BY tablename, policyname;
