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

// 파일 업로드 이벤트 추적
export const trackFileUpload = (toolName: string, fileType: string, fileSize: number) => {
  trackEvent('file_upload', 'tool_usage', `${toolName}_${fileType}`, fileSize)
}

// 파일 변환 이벤트 추적
export const trackFileConversion = (toolName: string, fromFormat: string, toFormat: string) => {
  trackEvent('file_conversion', 'tool_usage', `${toolName}_${fromFormat}_to_${toFormat}`)
}

// Pro 업그레이드 클릭 추적
export const trackProUpgrade = (location: string) => {
  trackEvent('pro_upgrade_click', 'monetization', location)
}

// 광고 클릭 추적
export const trackAdClick = (adPosition: string) => {
  trackEvent('ad_click', 'advertising', adPosition)
}

// 전역 gtag 타입 선언
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
