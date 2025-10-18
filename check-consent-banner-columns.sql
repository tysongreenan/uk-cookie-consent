-- Check the actual column names in ConsentBanner table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ConsentBanner' 
ORDER BY ordinal_position;
