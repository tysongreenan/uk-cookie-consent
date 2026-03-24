/**
 * Cookie Banner Privacy Manager — Background Service Worker
 *
 * Manages API communication, preference caching, and coordinates
 * with content scripts on each page.
 */

const API_BASE = 'https://cookie-banner.ca'
const PREFS_CACHE_KEY = 'cached_preferences'
const API_KEY_KEY = 'api_key'
const PREFS_ETAG_KEY = 'prefs_etag'
const DAILY_COUNT_KEY = 'daily_consent_count'
const DAILY_COUNT_DATE_KEY = 'daily_consent_date'

// ── API helpers ───────────────────────────────────────────────────────

async function getApiKey() {
  const result = await chrome.storage.local.get(API_KEY_KEY)
  return result[API_KEY_KEY] || null
}

async function apiRequest(path, options = {}) {
  const apiKey = await getApiKey()
  if (!apiKey) throw new Error('No API key configured')

  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  return response
}

// ── Preferences ───────────────────────────────────────────────────────

async function fetchPreferences(force = false) {
  try {
    const headers = {}
    if (!force) {
      const cached = await chrome.storage.local.get(PREFS_ETAG_KEY)
      if (cached[PREFS_ETAG_KEY]) {
        headers['If-None-Match'] = cached[PREFS_ETAG_KEY]
      }
    }

    const response = await apiRequest('/api/v1/consumer/preferences', { headers })

    if (response.status === 304) {
      // Preferences unchanged — use cached
      const cached = await chrome.storage.local.get(PREFS_CACHE_KEY)
      return cached[PREFS_CACHE_KEY] || null
    }

    if (!response.ok) {
      console.error('[BG] Preferences fetch failed:', response.status)
      return null
    }

    const data = await response.json()
    const etag = response.headers.get('ETag')

    // Cache preferences and ETag
    await chrome.storage.local.set({
      [PREFS_CACHE_KEY]: data,
      [PREFS_ETAG_KEY]: etag || '',
    })

    return data
  } catch (error) {
    console.error('[BG] Preferences fetch error:', error)
    // Fall back to cached
    const cached = await chrome.storage.local.get(PREFS_CACHE_KEY)
    return cached[PREFS_CACHE_KEY] || null
  }
}

// ── Consent logging ───────────────────────────────────────────────────

async function logConsent(domain, action, categoriesApplied) {
  try {
    const response = await apiRequest('/api/v1/consumer/consent', {
      method: 'POST',
      body: JSON.stringify({
        domain,
        action,
        categoriesApplied,
        extensionVersion: chrome.runtime.getManifest().version,
      }),
    })

    const data = await response.json()

    // Track daily count locally for UI
    if (data.logged) {
      await incrementDailyCount()
    }

    return data
  } catch (error) {
    console.error('[BG] Consent log error:', error)
    return { logged: false, error: error.message }
  }
}

async function incrementDailyCount() {
  const today = new Date().toISOString().split('T')[0]
  const result = await chrome.storage.local.get([DAILY_COUNT_KEY, DAILY_COUNT_DATE_KEY])

  if (result[DAILY_COUNT_DATE_KEY] === today) {
    await chrome.storage.local.set({
      [DAILY_COUNT_KEY]: (result[DAILY_COUNT_KEY] || 0) + 1,
    })
  } else {
    await chrome.storage.local.set({
      [DAILY_COUNT_KEY]: 1,
      [DAILY_COUNT_DATE_KEY]: today,
    })
  }
}

// ── Connection test ───────────────────────────────────────────────────

async function testConnection() {
  try {
    const response = await apiRequest('/api/v1/consumer/ping')
    if (!response.ok) return { connected: false, error: `HTTP ${response.status}` }
    const data = await response.json()
    return { connected: true, tier: data.tier }
  } catch (error) {
    return { connected: false, error: error.message }
  }
}

// ── Message handler ───────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const handler = async () => {
    switch (message.type) {
      case 'GET_PREFERENCES':
        return await fetchPreferences()

      case 'LOG_CONSENT':
        return await logConsent(message.domain, message.action, message.categoriesApplied)

      case 'TEST_CONNECTION':
        return await testConnection()

      case 'GET_STATUS': {
        const apiKey = await getApiKey()
        const prefs = await chrome.storage.local.get(PREFS_CACHE_KEY)
        const countData = await chrome.storage.local.get([DAILY_COUNT_KEY, DAILY_COUNT_DATE_KEY])
        const today = new Date().toISOString().split('T')[0]
        return {
          hasApiKey: !!apiKey,
          hasPreferences: !!prefs[PREFS_CACHE_KEY],
          preferences: prefs[PREFS_CACHE_KEY] || null,
          dailyCount: countData[DAILY_COUNT_DATE_KEY] === today ? (countData[DAILY_COUNT_KEY] || 0) : 0,
        }
      }

      case 'SAVE_API_KEY': {
        await chrome.storage.local.set({ [API_KEY_KEY]: message.apiKey })
        // Test connection immediately
        const result = await testConnection()
        if (result.connected) {
          await fetchPreferences(true)
        }
        return result
      }

      case 'CLEAR_API_KEY':
        await chrome.storage.local.remove([API_KEY_KEY, PREFS_CACHE_KEY, PREFS_ETAG_KEY])
        return { cleared: true }

      case 'REFRESH_PREFERENCES':
        return await fetchPreferences(true)

      default:
        return { error: 'Unknown message type' }
    }
  }

  handler().then(sendResponse).catch((err) => sendResponse({ error: err.message }))
  return true // Keep message channel open for async response
})

// ── Periodic refresh ──────────────────────────────────────────────────

// Refresh preferences every 5 minutes
chrome.alarms.create('refresh-preferences', { periodInMinutes: 5 })

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'refresh-preferences') {
    const apiKey = await getApiKey()
    if (apiKey) {
      await fetchPreferences()
    }
  }
})

// Refresh on startup
chrome.runtime.onStartup.addListener(async () => {
  const apiKey = await getApiKey()
  if (apiKey) {
    await fetchPreferences(true)
  }
})
