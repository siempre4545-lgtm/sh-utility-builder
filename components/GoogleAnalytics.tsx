'use client'

import Script from 'next/script'

interface GoogleAnalyticsProps {
  gaId: string
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  )
}

// 이벤트 추적 함수들
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    })
  }
}

// 파일 업로드 이벤트 추적 (강화)
export const trackFileUpload = (toolName: string, fileCount: number, totalSize: number, fileTypes: string[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_upload', {
      tool_name: toolName,
      file_count: fileCount,
      total_size_mb: Math.round(totalSize / 1024 / 1024),
      file_types: fileTypes.join(','),
      event_category: 'file_processing',
    })
  }
}

// 파일 변환 완료 이벤트 추적 (강화)
export const trackFileConversion = (toolName: string, success: boolean, processingTime?: number, outputSize?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_conversion', {
      tool_name: toolName,
      success: success,
      processing_time_ms: processingTime,
      output_size_mb: outputSize ? Math.round(outputSize / 1024 / 1024) : undefined,
      event_category: 'file_processing',
    })
  }
}

// Pro 업그레이드 시도 이벤트 추적 (강화)
export const trackProUpgrade = (trigger: string, currentPlan: string = 'free', fileCount?: number, totalSize?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'pro_upgrade_attempt', {
      trigger_location: trigger,
      current_plan: currentPlan,
      file_count: fileCount,
      total_size_mb: totalSize ? Math.round(totalSize / 1024 / 1024) : undefined,
      event_category: 'monetization',
    })
  }
}

// 광고 클릭 이벤트 추적 (강화)
export const trackAdClick = (adPosition: string, adType: string = 'banner') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ad_click', {
      ad_position: adPosition,
      ad_type: adType,
      event_category: 'monetization',
    })
  }
}

// 사용자 행동 이벤트 추적 (신규)
export const trackUserAction = (action: string, tool?: string, details?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_action', {
      action_name: action,
      tool_name: tool,
      action_details: JSON.stringify(details),
      event_category: 'user_behavior',
    })
  }
}

// 에러 이벤트 추적 (신규)
export const trackError = (errorType: string, tool: string, errorMessage: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'error_occurred', {
      error_type: errorType,
      tool_name: tool,
      error_message: errorMessage,
      event_category: 'error_tracking',
    })
  }
}

// 전역 gtag 타입 선언
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
