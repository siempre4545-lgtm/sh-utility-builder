// 퍼널 계측 및 A/B 테스트 유틸리티

export interface FunnelEvent {
  step: string
  action: string
  value?: number
  metadata?: Record<string, any>
}

export const trackFunnelEvent = (event: FunnelEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: 'funnel',
      event_label: event.step,
      value: event.value,
      custom_map: event.metadata,
    })
  }
}

// 퍼널 단계 정의
export const FUNNEL_STEPS = {
  LANDING: 'landing',
  TOOL_SELECTION: 'tool_selection',
  FILE_UPLOAD: 'file_upload',
  PROCESSING: 'processing',
  DOWNLOAD: 'download',
  PRO_UPGRADE: 'pro_upgrade',
  PAYMENT: 'payment',
  SUCCESS: 'success',
} as const

// A/B 테스트 관리
export class ABTestManager {
  private static instance: ABTestManager
  private tests: Map<string, string> = new Map()

  static getInstance(): ABTestManager {
    if (!ABTestManager.instance) {
      ABTestManager.instance = new ABTestManager()
    }
    return ABTestManager.instance
  }

  getVariant(testName: string, variants: string[]): string {
    const stored = localStorage.getItem(`ab-test-${testName}`)
    if (stored && variants.includes(stored)) {
      return stored
    }

    const variant = variants[Math.floor(Math.random() * variants.length)]
    localStorage.setItem(`ab-test-${testName}`, variant)
    this.tests.set(testName, variant)
    
    // Google Analytics에 A/B 테스트 이벤트 전송
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_assignment', {
        test_name: testName,
        variant: variant,
      })
    }

    return variant
  }

  trackConversion(testName: string, conversionValue?: number) {
    const variant = this.tests.get(testName) || localStorage.getItem(`ab-test-${testName}`)
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        test_name: testName,
        variant: variant,
        value: conversionValue,
      })
    }
  }
}

// 가격 A/B 테스트
export const PRICE_TESTS = {
  MONTHLY_PRICE: {
    name: 'monthly_price',
    variants: ['9900', '7900', '11900'], // 원화 기준
    descriptions: ['₩9,900/월', '₩7,900/월', '₩11,900/월']
  },
  ANNUAL_DISCOUNT: {
    name: 'annual_discount',
    variants: ['17%', '25%', '10%'],
    descriptions: ['17% 할인', '25% 할인', '10% 할인']
  }
} as const

// 카피 A/B 테스트
export const COPY_TESTS = {
  HERO_HEADLINE: {
    name: 'hero_headline',
    variants: [
      '빠르고 안전한 파일 변환 도구',
      '전문가가 사용하는 파일 변환 도구',
      '무료로 시작하는 파일 변환 도구'
    ]
  },
  CTA_BUTTON: {
    name: 'cta_button',
    variants: [
      'Pro 업그레이드',
      '무료로 시작하기',
      '지금 업그레이드'
    ]
  }
} as const

// 전환 이벤트 추적
export const trackConversion = (step: string, value?: number) => {
  trackFunnelEvent({
    step,
    action: 'conversion',
    value,
  })
}

// 전역 gtag 타입 선언
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}
