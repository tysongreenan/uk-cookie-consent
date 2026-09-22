import { describe, expect, it, vi } from 'vitest'
import { deleteAccountOwnedRows } from './delete-account-data'

function createClient(options?: {
  failOn?: Partial<Record<string, string>>
}) {
  const deleted: string[] = []
  return {
    deleted,
    from(table: string) {
      return {
        delete: () => ({
          eq: async (column: string, value: string) => {
            deleted.push(`${table}.${column}=${value}`)
            const fail = options?.failOn?.[table]
            return { error: fail ? { message: fail } : null }
          },
        }),
      }
    },
  }
}

describe('deleteAccountOwnedRows', () => {
  it('deletes SimpleBanners for the user before the account row', async () => {
    const client = createClient()
    await expect(deleteAccountOwnedRows(client, 'user-1')).resolves.toEqual({})
    expect(client.deleted[0]).toBe('SimpleBanners.userId=user-1')
    expect(client.deleted).toContain('User.id=user-1')
  })

  it('fails when SimpleBanners delete fails', async () => {
    const client = createClient({ failOn: { SimpleBanners: 'relation missing' } })
    await expect(deleteAccountOwnedRows(client, 'user-1')).resolves.toEqual({
      error: 'Failed to delete banners',
    })
    expect(client.deleted).toEqual(['SimpleBanners.userId=user-1'])
  })

  it('still deletes the account when leftover ConsentBanner/Project deletes fail', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const client = createClient({
      failOn: {
        ConsentBanner: 'relation "ConsentBanner" does not exist',
        Project: 'relation "Project" does not exist',
      },
    })

    await expect(deleteAccountOwnedRows(client, 'user-1')).resolves.toEqual({})
    expect(client.deleted).toEqual([
      'SimpleBanners.userId=user-1',
      'ConsentBanner.userId=user-1',
      'Project.userId=user-1',
      'UserLogo.userId=user-1',
      'User.id=user-1',
    ])
    errorSpy.mockRestore()
  })
})
