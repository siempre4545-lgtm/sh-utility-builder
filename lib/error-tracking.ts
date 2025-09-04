// 에러 추적 및 모니터링 시스템

interface ErrorContext {
  userId?: string
  sessionId?: string
  userAgent: string
  url: string
  timestamp: string
  apiEndpoint?: string
  fileCount?: number
  totalSize?: number
  isPro?: boolean
}

export const trackError = async (error: Error, context: ErrorContext) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    ...context,
    severity: 'error',
    source: 'api'
  }

  // 개발 환경에서는 콘솔에만 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Tracked:', errorData)
    return
  }

  try {
    // Vercel Logs로 전송
    await fetch('/api/error-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData),
    })
  } catch (trackError) {
    console.error('Failed to track error:', trackError)
  }
}

export const trackApiUsage = async (endpoint: string, context: {
  fileCount: number
  totalSize: number
  isPro: boolean
  success: boolean
  processingTime?: number
}) => {
  const usageData = {
    endpoint,
    ...context,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'api'
  }

  try {
    await fetch('/api/usage-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usageData),
    })
  } catch (error) {
    console.error('Failed to track usage:', error)
  }
}

export const trackProUpgradeAttempt = async (context: {
  trigger: string
  currentPlan: 'free' | 'pro'
  fileCount?: number
  totalSize?: number
}) => {
  const upgradeData = {
    ...context,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'api'
  }

  try {
    await fetch('/api/upgrade-track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(upgradeData),
    })
  } catch (error) {
    console.error('Failed to track upgrade attempt:', error)
  }
}
