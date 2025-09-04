// 에러 모니터링 및 Slack 알림

interface ErrorReport {
  message: string
  stack?: string
  url: string
  userAgent: string
  timestamp: string
  userId?: string
  sessionId?: string
}

export const reportError = async (error: Error, context?: Record<string, any>) => {
  const errorReport: ErrorReport = {
    message: error.message,
    stack: error.stack,
    url: typeof window !== 'undefined' ? window.location.href : 'server',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    timestamp: new Date().toISOString(),
    ...context,
  }

  // 개발 환경에서는 콘솔에만 출력
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Report:', errorReport)
    return
  }

  try {
    await fetch('/api/error-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport),
    })
  } catch (reportError) {
    console.error('Failed to report error:', reportError)
  }
}

export const setupErrorHandling = () => {
  if (typeof window === 'undefined') return

  // 전역 에러 핸들러
  window.addEventListener('error', (event) => {
    reportError(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })

  // Promise rejection 핸들러
  window.addEventListener('unhandledrejection', (event) => {
    reportError(new Error(event.reason), {
      type: 'unhandledrejection',
    })
  })
}

// 성능 모니터링
export const reportPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_metric', {
      metric_name: metric,
      metric_value: value,
    })
  }
}

// Core Web Vitals 추적
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return

  // LCP (Largest Contentful Paint)
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]
    reportPerformance('LCP', lastEntry.startTime)
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  // FID (First Input Delay)
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      const fidEntry = entry as any
      if (fidEntry.processingStart) {
        reportPerformance('FID', fidEntry.processingStart - fidEntry.startTime)
      }
    })
  }).observe({ entryTypes: ['first-input'] })

  // CLS (Cumulative Layout Shift)
  let clsValue = 0
  new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      const clsEntry = entry as any
      if (!clsEntry.hadRecentInput) {
        clsValue += clsEntry.value || 0
      }
    })
    reportPerformance('CLS', clsValue)
  }).observe({ entryTypes: ['layout-shift'] })
}
