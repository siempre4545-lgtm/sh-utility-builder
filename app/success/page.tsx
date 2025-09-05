'use client'

import { useEffect, useState, Suspense } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Download, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // 결제 성공 이벤트 추적
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: sessionId,
          value: 7.9, // 월간 플랜 가격 (USD)
          currency: 'USD',
        })
      }
      setIsLoading(false)
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          결제가 완료되었습니다!
        </h1>
        <p className="text-gray-600 mb-6">
          Pro 플랜이 성공적으로 활성화되었습니다. 
          이제 모든 기능을 제한 없이 사용하실 수 있습니다.
        </p>

        {/* Pro Benefits */}
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-primary-600 mr-2" />
            <span className="font-semibold text-primary-900">Pro 혜택</span>
          </div>
          <ul className="text-sm text-primary-800 space-y-1">
            <li>• 무제한 파일 크기</li>
            <li>• 배치 처리</li>
            <li>• 광고 제거</li>
            <li>• 우선 고객 지원</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/tools" className="block">
            <Button className="w-full bg-primary-600 hover:bg-primary-700">
              <Download className="w-4 h-4 mr-2" />
              도구 사용하기
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* Session ID */}
        {sessionId && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              주문 번호: {sessionId}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
