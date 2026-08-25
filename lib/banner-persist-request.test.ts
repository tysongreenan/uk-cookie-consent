import { describe, expect, it } from 'vitest'
import {
  CREATE_NEW_BANNER_HREF,
  activeBannerIdForBuilder,
  isCreateNewBannerQuery,
  isNewBuilderDraft,
  resolveBannerPersistRequest,
  savedBannerIdFromPersistResponse,
  shouldWipeNewDraftIdentity,
} from './banner-persist-request'

describe('resolveBannerPersistRequest', () => {
  it('POSTs a new banner on the first unsaved builder', () => {
    expect(resolveBannerPersistRequest(undefined)).toEqual({
      method: 'POST',
      url: '/api/banners/simple',
    })
    expect(resolveBannerPersistRequest(null)).toEqual({
      method: 'POST',
      url: '/api/banners/simple',
    })
    expect(resolveBannerPersistRequest('')).toEqual({
      method: 'POST',
      url: '/api/banners/simple',
    })
  })

  it('POSTs a second banner on Create New Banner even when others already exist', () => {
    // existingBannerCount is intentionally not an input — persist must not
    // consult how many banners the account already has.
    expect(resolveBannerPersistRequest(null)).toEqual({
      method: 'POST',
      url: '/api/banners/simple',
    })
  })

  it('PUTs when this builder already has an id', () => {
    expect(resolveBannerPersistRequest('banner-1')).toEqual({
      method: 'PUT',
      url: '/api/banners/simple/banner-1',
    })
  })
})

describe('savedBannerIdFromPersistResponse', () => {
  it('uses the created id from a first-banner POST', () => {
    expect(
      savedBannerIdFromPersistResponse({
        currentBannerId: null,
        responseBannerId: 'new-1',
      }),
    ).toBe('new-1')
  })

  it('uses the created id from a Create New Banner POST', () => {
    expect(
      savedBannerIdFromPersistResponse({
        currentBannerId: undefined,
        responseBannerId: 'new-2',
      }),
    ).toBe('new-2')
  })

  it('keeps the existing id on update', () => {
    expect(
      savedBannerIdFromPersistResponse({
        currentBannerId: 'banner-1',
        responseBannerId: undefined,
      }),
    ).toBe('banner-1')
  })
})

describe('isNewBuilderDraft', () => {
  it('treats a builder with no id as a new draft', () => {
    expect(isNewBuilderDraft({})).toBe(true)
    expect(isNewBuilderDraft({ id: null, edit: null })).toBe(true)
  })

  it('treats Create New Banner (?new=1) as a new draft even if cache is stale', () => {
    expect(isNewBuilderDraft({ id: 'stale-id', newDraft: '1' })).toBe(true)
  })

  it('does not treat an existing banner as a new draft', () => {
    expect(isNewBuilderDraft({ id: 'banner-1' })).toBe(false)
    expect(isNewBuilderDraft({ edit: 'banner-1' })).toBe(false)
  })
})

describe('Create New Banner href', () => {
  it('opens an unsaved builder, not an existing banner id', () => {
    expect(CREATE_NEW_BANNER_HREF).toBe('/dashboard/builder?new=1')
    expect(isCreateNewBannerQuery('1')).toBe(true)
    expect(isCreateNewBannerQuery(null)).toBe(false)
  })
})

describe('activeBannerIdForBuilder', () => {
  it('treats the first unsaved builder as having no id', () => {
    expect(activeBannerIdForBuilder({})).toBeNull()
    expect(
      activeBannerIdForBuilder({
        urlId: null,
        urlEdit: null,
        urlNew: null,
        stateBannerId: null,
      }),
    ).toBeNull()
  })

  it('ignores leftover first-banner state on Create New Banner', () => {
    expect(
      activeBannerIdForBuilder({
        urlNew: '1',
        stateBannerId: 'banner-1',
        createdThisDraftId: null,
      }),
    ).toBeNull()
  })

  it('keeps the id created on this draft before the URL updates', () => {
    expect(
      activeBannerIdForBuilder({
        urlNew: '1',
        stateBannerId: 'banner-2',
        createdThisDraftId: 'banner-2',
      }),
    ).toBe('banner-2')
  })

  it('uses the URL id when editing an existing banner', () => {
    expect(
      activeBannerIdForBuilder({
        urlId: 'banner-1',
        stateBannerId: 'banner-1',
      }),
    ).toBe('banner-1')
  })

  it('keeps a minted id on a bare builder when createdThisDraftId is set', () => {
    expect(
      activeBannerIdForBuilder({
        urlId: null,
        urlNew: null,
        stateBannerId: 'minted-id',
        createdThisDraftId: 'minted-id',
      }),
    ).toBe('minted-id')
    expect(shouldWipeNewDraftIdentity('minted-id', 'minted-id')).toBe(false)
  })
})
