#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const dryRun = process.argv.includes('--dry-run')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function main() {
  const { data: invitations, error } = await supabase
    .from('TeamInvitation')
    .select('id, team_id, email, status, expires_at')
    .eq('status', 'pending')

  if (error) {
    console.error('Failed to fetch pending invitations:', error)
    process.exit(1)
  }

  const repairs = []

  for (const invitation of invitations || []) {
    const normalizedEmail = invitation.email?.trim().toLowerCase()
    if (!normalizedEmail) continue

    const { data: user, error: userError } = await supabase
      .from('User')
      .select('id, email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (userError) {
      console.error(`Failed to look up user for invitation ${invitation.id}:`, userError)
      continue
    }

    if (!user?.id) continue

    const { data: member, error: memberError } = await supabase
      .from('TeamMember')
      .select('id')
      .eq('team_id', invitation.team_id)
      .eq('user_id', user.id)
      .maybeSingle()

    if (memberError) {
      console.error(`Failed to check membership for invitation ${invitation.id}:`, memberError)
      continue
    }

    if (!member?.id) continue

    repairs.push({
      invitationId: invitation.id,
      teamId: invitation.team_id,
      email: normalizedEmail,
      userId: user.id,
      memberId: member.id,
    })
  }

  if (repairs.length === 0) {
    console.log('No stale pending invitations found.')
    return
  }

  console.log(`${dryRun ? 'Would repair' : 'Repairing'} ${repairs.length} stale pending invitation(s):`)

  for (const repair of repairs) {
    console.log(`- ${repair.invitationId} | ${repair.email} | team ${repair.teamId}`)

    if (dryRun) continue

    const now = new Date().toISOString()
    const { error: updateError } = await supabase
      .from('TeamInvitation')
      .update({
        status: 'accepted',
        accepted_at: now,
        updated_at: now,
      })
      .eq('id', repair.invitationId)
      .eq('status', 'pending')

    if (updateError) {
      console.error(`Failed to repair invitation ${repair.invitationId}:`, updateError)
    }
  }
}

main().catch(error => {
  console.error('Repair failed:', error)
  process.exit(1)
})
