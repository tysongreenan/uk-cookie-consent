/**
 * Cookie Banner Privacy Manager — Popup UI
 */

const $ = (sel) => document.querySelector(sel)

// ── Views ─────────────────────────────────────────────────────────────

function showView(name) {
  document.querySelectorAll('.view').forEach((v) => (v.style.display = 'none'))
  $(`#view-${name}`).style.display = 'block'
}

function setConnected(connected) {
  const dot = $('#status-dot')
  dot.className = `status-dot ${connected ? 'connected' : 'disconnected'}`
  dot.title = connected ? 'Connected' : 'Disconnected'
}

// ── Render preferences ────────────────────────────────────────────────

function renderPreferences(prefs) {
  if (!prefs) return

  const actionLabels = {
    accept_all: 'Accept All',
    reject_all: 'Reject All',
    accept_essential: 'Essential Only',
    custom: 'Custom',
  }

  $('#pref-action').textContent = actionLabels[prefs.defaultAction] || prefs.defaultAction
  $('#pref-auto').textContent = prefs.autoApply ? 'On' : 'Off'
  $('#pref-auto').className = `pref-value ${prefs.autoApply ? 'accept' : 'reject'}`

  if (prefs.preferences) {
    const analytics = prefs.preferences.analytics
    const marketing = prefs.preferences.marketing
    $('#pref-analytics').textContent = analytics === 'accept' ? 'Allow' : 'Block'
    $('#pref-analytics').className = `pref-value ${analytics === 'accept' ? 'accept' : 'reject'}`
    $('#pref-marketing').textContent = marketing === 'accept' ? 'Allow' : 'Block'
    $('#pref-marketing').className = `pref-value ${marketing === 'accept' ? 'accept' : 'reject'}`
  }
}

// ── Initialize ────────────────────────────────────────────────────────

async function init() {
  const status = await chrome.runtime.sendMessage({ type: 'GET_STATUS' })

  if (!status?.hasApiKey) {
    showView('setup')
    setConnected(false)
    return
  }

  // Has API key — test connection
  const connection = await chrome.runtime.sendMessage({ type: 'TEST_CONNECTION' })
  setConnected(connection.connected)

  if (connection.connected) {
    showView('connected')
    $('#daily-count').textContent = status.dailyCount || 0
    $('#tier-badge').textContent = connection.tier === 'premium' ? 'Premium' : 'Free'

    if (status.preferences) {
      renderPreferences(status.preferences)
    }
  } else {
    // API key exists but connection failed
    showView('setup')
    $('#setup-error').textContent = `Connection failed: ${connection.error || 'Unknown error'}`
    $('#setup-error').style.display = 'block'
  }
}

// ── Event handlers ────────────────────────────────────────────────────

// Connect button
$('#btn-connect').addEventListener('click', async () => {
  const input = $('#api-key-input')
  const apiKey = input.value.trim()
  const error = $('#setup-error')

  if (!apiKey) {
    error.textContent = 'Please enter your API key'
    error.style.display = 'block'
    return
  }

  if (!apiKey.startsWith('ck_')) {
    error.textContent = 'API key should start with ck_'
    error.style.display = 'block'
    return
  }

  $('#btn-connect').textContent = 'Connecting...'
  $('#btn-connect').disabled = true
  error.style.display = 'none'

  const result = await chrome.runtime.sendMessage({ type: 'SAVE_API_KEY', apiKey })

  if (result.connected) {
    init() // Re-render connected view
  } else {
    error.textContent = `Connection failed: ${result.error || 'Invalid API key'}`
    error.style.display = 'block'
    $('#btn-connect').textContent = 'Connect'
    $('#btn-connect').disabled = false
  }
})

// Enter key in API key input
$('#api-key-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('#btn-connect').click()
})

// Refresh button
$('#btn-refresh').addEventListener('click', async () => {
  $('#btn-refresh').textContent = 'Refreshing...'
  await chrome.runtime.sendMessage({ type: 'REFRESH_PREFERENCES' })
  await init()
  $('#btn-refresh').textContent = 'Refresh'
})

// Disconnect button
$('#btn-disconnect').addEventListener('click', async () => {
  if (confirm('Disconnect this extension from your account?')) {
    await chrome.runtime.sendMessage({ type: 'CLEAR_API_KEY' })
    init()
  }
})

// ── Start ─────────────────────────────────────────────────────────────

init()
