const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://bamunfrbhopzrjobowfx.supabase.co',
  'sb_secret_I8bupz3lhrPKSDeo2oTq_g_Izyksayc',
  { auth: { persistSession: false } }
);

(async () => {
  const { data: user, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', 'rajeev.sharma@well.ca')
    .maybeSingle();

  if (error) { console.error('ERR:', error); process.exit(1); }
  console.log('USER:', JSON.stringify(user, null, 2));

  if (user) {
    const { data: payments } = await supabase
      .from('Payment').select('*').eq('userId', user.id).order('createdAt', { ascending: false });
    console.log('PAYMENTS:', JSON.stringify(payments, null, 2));
  } else {
    const { data: well } = await supabase
      .from('User').select('id,email,planTier,createdAt').ilike('email', '%@well.ca');
    console.log('WELL.CA USERS:', JSON.stringify(well, null, 2));
    const { data: raj } = await supabase
      .from('User').select('id,email,planTier,createdAt').ilike('email', '%rajeev%');
    console.log('RAJEEV MATCHES:', JSON.stringify(raj, null, 2));
  }
})();
