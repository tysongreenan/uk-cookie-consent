type DeleteResult = { error: { message?: string } | null }

type TableDelete = {
  delete: () => { eq: (column: string, value: string) => PromiseLike<DeleteResult> }
}

export type AccountDeleteClient = {
  from: (table: string) => TableDelete
}

/**
 * Hosted banners live in SimpleBanners. ConsentBanner/Project deletes are
 * leftover-only and must not block account removal if those tables are gone.
 */
export async function deleteAccountOwnedRows(
  supabase: AccountDeleteClient,
  userId: string,
): Promise<{ error?: string }> {
  const { error: bannersError } = await supabase
    .from('SimpleBanners')
    .delete()
    .eq('userId', userId)

  if (bannersError) {
    return { error: 'Failed to delete banners' }
  }

  const leftoverConsent = await supabase.from('ConsentBanner').delete().eq('userId', userId)
  if (leftoverConsent.error) {
    console.error('Leftover ConsentBanner delete skipped:', leftoverConsent.error)
  }

  const leftoverProjects = await supabase.from('Project').delete().eq('userId', userId)
  if (leftoverProjects.error) {
    console.error('Leftover Project delete skipped:', leftoverProjects.error)
  }

  const { error: logosError } = await supabase
    .from('UserLogo')
    .delete()
    .eq('userId', userId)

  if (logosError) {
    return { error: 'Failed to delete logos' }
  }

  const { error: userError } = await supabase
    .from('User')
    .delete()
    .eq('id', userId)

  if (userError) {
    return { error: 'Failed to delete user account' }
  }

  return {}
}
