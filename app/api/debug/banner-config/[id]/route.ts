import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { migrateBannerConfig, needsMigration } from '@/lib/banner-migration'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the specific banner
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .select('*')
      .eq('id', params.id)
      .eq('userId', session.user.id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Banner not found', details: error },
        { status: 404 }
      )
    }

    // Parse config
    let rawConfig
    let parsedConfig
    let configType = typeof banner.config
    
    try {
      if (typeof banner.config === 'string') {
        parsedConfig = JSON.parse(banner.config)
      } else {
        parsedConfig = banner.config
      }
    } catch (parseError) {
      return NextResponse.json({
        error: 'Config parsing failed',
        details: parseError,
        rawConfig: banner.config
      }, { status: 400 })
    }

    // Check migration status
    const needsMig = needsMigration(parsedConfig)
    const migratedConfig = needsMig ? migrateBannerConfig(parsedConfig) : parsedConfig

    // Analyze scripts
    const scriptAnalysis = {
      hasScripts: !!parsedConfig.scripts,
      scriptCategories: parsedConfig.scripts ? Object.keys(parsedConfig.scripts) : [],
      strictlyNecessary: parsedConfig.scripts?.strictlyNecessary?.length || 0,
      functionality: parsedConfig.scripts?.functionality?.length || 0,
      trackingPerformance: parsedConfig.scripts?.trackingPerformance?.length || 0,
      targetingAdvertising: parsedConfig.scripts?.targetingAdvertising?.length || 0,
      totalScripts: 0
    }

    if (parsedConfig.scripts) {
      scriptAnalysis.totalScripts = Object.values(parsedConfig.scripts).reduce(
        (total: number, scripts) => total + (Array.isArray(scripts) ? scripts.length : 0), 0
      )
    }

    // Analyze integrations
    const integrationAnalysis = {
      hasIntegrations: !!parsedConfig.integrations,
      hasGoogleAnalytics: !!parsedConfig.integrations?.googleAnalytics,
      ga4Enabled: parsedConfig.integrations?.googleAnalytics?.enabled || false,
      ga4MeasurementId: parsedConfig.integrations?.googleAnalytics?.measurementId || '',
      ga4TrackEvents: parsedConfig.integrations?.googleAnalytics?.trackConsentEvents || false,
      ga4AnonymizeIp: parsedConfig.integrations?.googleAnalytics?.anonymizeIp || false
    }

    return NextResponse.json({
      success: true,
      banner: {
        id: banner.id,
        name: banner.name,
        isActive: banner.isActive,
        createdAt: banner.createdAt,
        updatedAt: banner.updatedAt
      },
      config: {
        type: configType,
        needsMigration: needsMig,
        version: parsedConfig.version || 'unknown',
        lastUpdated: parsedConfig.lastUpdated || 'unknown'
      },
      scripts: scriptAnalysis,
      integrations: integrationAnalysis,
      rawConfig: banner.config,
      parsedConfig: parsedConfig,
      migratedConfig: migratedConfig
    })

  } catch (error) {
    console.error('Debug banner config error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    )
  }
}
