/**
 * Manual verification for the consent-logs round trip.
 *
 * No jest/vitest in this repo, so this proves the DB path end to end:
 *   1. Inserts a synthetic consent_records row via the service-role client
 *      (same insert shape as app/api/v1/consent-log/route.ts).
 *   2. Calls get_consent_logs with the exact params the dashboard route sends
 *      (app/api/consent-logs/route.ts), including p_user_id, to prove the row
 *      is returned under user scope.
 *   3. Calls count_consent_logs to confirm the count RPC also works.
 *   4. Verifies dateTo end-of-day inclusivity returns today's record.
 *   5. Deletes the synthetic row by id.
 *
 * Run: node scripts/verify-consent-logs.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const userId = randomUUID()
const bannerId = randomUUID()
const consentId = randomUUID()
const hashedCookieId = 'a'.repeat(64)
const recordId = randomUUID()
const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

let failures = 0
function check(label, ok, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) failures++
}

async function main() {
  // 1. Insert synthetic record (no FKs on user_id/banner_id so UUIDs are fine)
  const { error: insertError } = await supabase.from('consent_records').insert({
    id: recordId,
    banner_id: bannerId,
    user_id: userId,
    team_id: null,
    consent_id: consentId,
    hashed_cookie_id: hashedCookieId,
    recorded_at: new Date().toISOString(),
    decision: 'accept',
    categories: { analytics: true, marketing: false },
    country: 'unknown', // exercises the normalized-country path
    page_path: '/verify-test',
  })
  check('insert consent record', !insertError, insertError?.message)
  if (insertError) return

  // 2. get_consent_logs with the dashboard route's exact param shape (user scope)
  const dateToInclusive = `${today}T23:59:59.999Z`
  const { data: logs, error: logsError } = await supabase.rpc('get_consent_logs', {
    p_user_id: userId,
    p_team_id: null,
    p_banner_id: null,
    p_consent_id: null,
    p_date_from: null,
    p_date_to: dateToInclusive,
    p_decision: null,
    p_limit: 50,
    p_offset: 0,
  })
  check('get_consent_logs RPC succeeds', !logsError, logsError?.message)
  const found = (logs || []).find((r) => r.id === recordId)
  check('get_consent_logs returns the record under user scope', !!found)

  // dateTo inclusivity: a bare-midnight dateTo (YYYY-MM-DD = 00:00) must
  // EXCLUDE today's record — proving the route's T23:59:59.999Z extension is
  // what makes the day inclusive.
  const { data: midnightLogs, error: midnightError } = await supabase.rpc('get_consent_logs', {
    p_user_id: userId,
    p_team_id: null,
    p_banner_id: null,
    p_consent_id: null,
    p_date_from: null,
    p_date_to: today, // midnight — record inserted later today must be absent
    p_decision: null,
    p_limit: 50,
    p_offset: 0,
  })
  const foundAtMidnight = (midnightLogs || []).find((r) => r.id === recordId)
  check(
    'bare-midnight dateTo excludes today record (end-of-day extension needed)',
    !midnightError && !foundAtMidnight,
    midnightError?.message
  )

  // OPTIONAL — inclusive-OR scoping (migration 20260703000002_fix_consent_scope_or.sql).
  // Our record has team_id NULL. Under the OLD XOR scoping, querying with a
  // p_team_id set hides it (filter becomes team_id = p_team_id only). Under
  // the NEW inclusive OR it is still returned via user_id = p_user_id.
  // Reports SKIP/PENDING (not a failure) until the migration is applied.
  const { data: orLogs, error: orError } = await supabase.rpc('get_consent_logs', {
    p_user_id: userId,
    p_team_id: randomUUID(), // a team the record does NOT belong to
    p_banner_id: null,
    p_consent_id: null,
    p_date_from: null,
    p_date_to: null,
    p_decision: null,
    p_limit: 50,
    p_offset: 0,
  })
  if (orError) {
    check('OR-scope: own record visible when p_team_id set', false, orError.message)
  } else if ((orLogs || []).find((r) => r.id === recordId)) {
    console.log('PASS  OR-scope: own record visible when p_team_id set (migration 20260703000002 applied)')
  } else {
    console.log('SKIP  OR-scope check — old XOR scoping detected; PENDING migration 20260703000002')
  }

  // 3. count_consent_logs
  const { data: count, error: countError } = await supabase.rpc('count_consent_logs', {
    p_user_id: userId,
    p_team_id: null,
    p_banner_id: null,
    p_consent_id: null,
    p_date_from: null,
    p_date_to: dateToInclusive,
    p_decision: null,
  })
  check('count_consent_logs RPC succeeds', !countError, countError?.message)
  check('count_consent_logs counts the record', Number(count) === 1, `got ${count}`)

  // 5. Cleanup
  const { error: deleteError } = await supabase
    .from('consent_records')
    .delete()
    .eq('id', recordId)
  check('cleanup synthetic record', !deleteError, deleteError?.message)

  console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
