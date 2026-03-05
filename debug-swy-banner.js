const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

// Load env vars manually
const envContent = fs.readFileSync('.env.local', 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=')
  if (key && value) {
    envVars[key] = value
  }
})

process.env.NEXT_PUBLIC_SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = envVars.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)

async function debugSWYBanner() {
  console.log('🔍 Debugging SWY - Cookie Banner configuration...\n')
  
  try {
    // Get the SWY banner specifically
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .select('*')
      .eq('id', 'banner_qf1qo3id2')
      .single()
    
    if (error) {
      console.log('❌ Error fetching SWY banner:', error.message)
      return
    }
    
    console.log('✅ SWY Banner found!')
    console.log('📋 Banner ID:', banner.id)
    console.log('📋 Banner Name:', banner.name)
    console.log('📋 Is Active:', banner.isActive)
    console.log('📋 Created:', banner.createdAt)
    console.log('📋 Updated:', banner.updatedAt)
    
    // Parse the config
    let config
    if (typeof banner.config === 'string') {
      try {
        config = JSON.parse(banner.config)
      } catch (error) {
        console.log('❌ Error parsing config JSON:', error.message)
        return
      }
    } else {
      config = banner.config
    }
    
    console.log('\n📋 Configuration Analysis:')
    console.log('📋 Config type:', typeof banner.config)
    console.log('📋 Config keys:', Object.keys(config))
    
    // Check for old format vs new format
    console.log('\n🔍 Format Analysis:')
    
    if (config.scripts) {
      console.log('✅ Has scripts section')
      console.log('📋 Script categories:', Object.keys(config.scripts))
      
      if (config.scripts.strictlyNecessary) {
        console.log('📋 Strictly Necessary scripts:', config.scripts.strictlyNecessary.length)
      }
      if (config.scripts.functionality) {
        console.log('📋 Functionality scripts:', config.scripts.functionality.length)
      }
      if (config.scripts.trackingPerformance) {
        console.log('📋 Tracking Performance scripts:', config.scripts.trackingPerformance.length)
        config.scripts.trackingPerformance.forEach((script, index) => {
          console.log(`   ${index + 1}. ${script.name} (enabled: ${script.enabled})`)
        })
      }
      if (config.scripts.targetingAdvertising) {
        console.log('📋 Targeting Advertising scripts:', config.scripts.targetingAdvertising.length)
      }
    } else {
      console.log('❌ No scripts section found')
    }
    
    // Check for integrations
    if (config.integrations) {
      console.log('✅ Has integrations section')
      console.log('📋 Integration keys:', Object.keys(config.integrations))
    } else {
      console.log('❌ No integrations section found')
    }
    
    // Check for old format fields
    const oldFormatFields = ['title', 'message', 'acceptText', 'preferencesText', 'primaryColor', 'textColor']
    const hasOldFormat = oldFormatFields.some(field => config[field] !== undefined)
    
    if (hasOldFormat) {
      console.log('⚠️  Has old format fields - needs migration!')
      oldFormatFields.forEach(field => {
        if (config[field] !== undefined) {
          console.log(`   📋 ${field}: ${config[field]}`)
        }
      })
    } else {
      console.log('✅ Uses new format structure')
    }
    
    // Check what the banner builder would see
    console.log('\n🎨 What Banner Builder Would Display:')
    
    // Simulate the transformation from /api/banners
    const transformedBanner = {
      id: banner.id,
      name: banner.name,
      config: config,
      title: config.title || config.text?.title || 'We use cookies',
      message: config.message || config.text?.message || 'This website uses cookies to enhance your browsing experience.',
      primaryColor: config.primaryColor || config.colors?.button || '#0073e6',
      textColor: config.textColor || config.colors?.text || '#ffffff',
      acceptButton: config.acceptText || config.text?.acceptButton || 'Accept All',
      preferencesButton: config.preferencesText || config.text?.preferencesButton || 'Cookie Settings',
      position: config.position || 'bottom',
      theme: config.theme || 'dark',
      isActive: banner.isActive,
      createdAt: banner.createdAt,
      updatedAt: banner.updatedAt
    }
    
    console.log('📋 Transformed title:', transformedBanner.title)
    console.log('📋 Transformed message:', transformedBanner.message)
    console.log('📋 Transformed primaryColor:', transformedBanner.primaryColor)
    console.log('📋 Transformed textColor:', transformedBanner.textColor)
    console.log('📋 Transformed acceptButton:', transformedBanner.acceptButton)
    console.log('📋 Transformed preferencesButton:', transformedBanner.preferencesButton)
    console.log('📋 Transformed position:', transformedBanner.position)
    console.log('📋 Transformed theme:', transformedBanner.theme)
    
  } catch (error) {
    console.error('💥 Unexpected error:', error)
  }
}

debugSWYBanner()
