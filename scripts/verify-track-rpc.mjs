/**
 * Manual verification for the /api/v1/track visitor RPC path.
 *
 * No jest/vitest in this repo, so this proves the DB path end to end and
 * reproduces the production bug:
 *   `record "new" has no field "updatedAt"`
 *
 * Background: banner_visitors carries a BEFORE UPDATE trigger
 * (update_banner_visitors_updated_at) wired to public.update_updated_at_column().
 * In prod that function was globally redefined to camelCase (NEW."updatedAt" = now())
 * to serve Prisma tables like "ConsentBanner". banner_visitors is snake_case
 * (updated_at), so the trigger throws on every UPDATE.
 *
 * Why two calls: the trigger is BEFORE UPDATE. The first RPC call INSERTs a new
 * row (trigger does NOT fire) and succeeds. Only the SECOND call with the same
 * conflict key takes the ON CONFLICT DO UPDATE path, fires the trigger, and
 * throws. A single call would falsely pass and prove nothing.
 *
 * Why a real user id: banner_visitors.user_id REFERENCES "User"(id). A random
 * UUID fails the FK on INSERT and never reaches the trigger. We fetch a real
 * User id but use synthetic, unique dimension values (random page_path) so the
 * row is our own and is cleaned up by its exact conflict key in finally.
 *
 * Mirrors app/api/v1/track/route.ts: supabase.rpc('increment_banner_visitor', {...10 params})
 * resolved via the supabase-js service client (the 10-arg overload incl p_gpc).
 *
 * Expected:
 *   PRE-migration  -> "second call (UPDATE path) succeeds" FAILS, printing the
 *                     exact `record "new" has no field "updatedAt"` error. (repro)
 *   POST-migration -> all checks PASS.
 *
 * Run: node scripts/verify-track-rpc.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Unique synthetic dimensions so we get our own dedicated row (won't pollute
// real analytics) and can clean it up precisely.
const marker = randomUUID().slice(0, 8)
const dims = {
  source: 'direct',
  device: 'desktop',
  country: 'unknown',
  page_path: `/verify-track-${marker}`,
}
const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

let failures = 0
let userId = null
function check(label, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) failures++
}

// Exactly mirrors the route's rpc('increment_banner_visitor', {...}) call.
function callVisitorRpc(eventType) {
  return supabase.rpc('increment_banner_visitor', {
    p_user_id: userId,
    p_banner_id: null,
    p_date: today,
    p_event_type: eventType,
    p_source: dims.source,
    p_device: dims.device,
    p_country: dims.country,
    p_page_path: dims.page_path,
    p_decision_time_ms: null,
    p_gpc: false,
  })
}

async function main() {
  // Fetch a real User id — banner_visitors.user_id has an FK to "User"(id).
  const { data: someUser, error: userErr } = await supabase
    .from('User')
    .select('id')
    .limit(1)
    .single()
  check('fetched a real User id (FK requirement)', !userErr && !!someUser?.id, userErr?.message)
  if (!someUser?.id) return
  userId = someUser.id

  // Call 1 — INSERT path. Trigger does NOT fire. Should succeed.
  const first = await callVisitorRpc('impression')
  check('first call (INSERT path) succeeds', !first.error, first.error?.message)

  // Call 2 — same conflict key -> ON CONFLICT DO UPDATE -> BEFORE UPDATE trigger fires.
  // PRE-migration this throws `record "new" has no field "updatedAt"`.
  const second = await callVisitorRpc('accept')
  check('second call (UPDATE path / trigger) succeeds', !second.error, second.error?.message)
  if (second.error) {
    console.log(`      ↳ reproduced trigger error: ${second.error.message}`)
  }
}

async function cleanup() {
  if (!userId) return
  const { error } = await supabase
    .from('banner_visitors')
    .delete()
    .eq('user_id', userId)
    .eq('date', today)
    .eq('source', dims.source)
    .eq('device', dims.device)
    .eq('country', dims.country)
    .eq('page_path', dims.page_path)
  check('cleanup synthetic visitor row', !error, error?.message)
}

try {
  await main()
} catch (err) {
  console.error('Unexpected error:', err)
  failures++
} finally {
  await cleanup()
}

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`)
process.exit(failures === 0 ? 0 : 1)
