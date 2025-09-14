'use client'

import { useState } from 'react'
import { AlertTriangle, XCircle, CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function SubscriptionCancelPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleCancelSubscription = async () => {
    setIsLoading(true)
    try {
      // LemonSqueezy 고객 포털로 리다이렉트
      // 실제 구현에서는 사용자 이메일을 기반으로 포털 URL을 생성해야 함
      const customerPortalUrl = 'https://sh-utility.lemonsqueezy.com/my-orders'
      window.open(customerPortalUrl, '_blank')
    } catch (error) {
      console.error('구독 취소 페이지 오류:', error)
      alert('구독 취소 페이지로 이동하는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const reasons = [
    '더 이상 필요하지 않음',
    '가격이 부담스러움',
    '다른 서비스를 사용하기로 함',
    '기술적 문제가 있음',
    '고객 지원이 부족함',
    '기타'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Cancel Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              구독 취소
            </h1>
            
            <p className="text-lg text-gray-600">
              정말로 Pro 구독을 취소하시겠습니까?
            </p>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">구독 취소 시 주의사항</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 즉시 Pro 기능 사용이 제한됩니다</li>
                  <li>• 현재 결제 주기까지는 Pro 기능을 계속 사용할 수 있습니다</li>
                  <li>• 취소 후 언제든지 다시 구독할 수 있습니다</li>
                  <li>• 환불은 LemonSqueezy 정책에 따라 처리됩니다</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Current Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-800 mb-4">현재 Pro 혜택</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">무제한 파일 크기</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">배치 처리</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">우선 지원</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700">광고 제거</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleCancelSubscription}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium"
            >
              {isLoading ? (
                '구독 취소 페이지로 이동 중...'
              ) : (
                <>
                  <ExternalLink className="w-5 h-5 mr-2" />
                  구독 취소하기
                </>
              )}
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full py-3 px-6 rounded-lg font-medium">
                <ArrowLeft className="w-5 h-5 mr-2" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">도움이 필요하신가요?</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>구독 관리:</strong> LemonSqueezy 고객 포털에서 구독 상태를 확인하고 관리할 수 있습니다.
              </p>
              <p>
                <strong>환불 정책:</strong> 30일 이내 환불이 가능하며, 자세한 내용은 LemonSqueezy 정책을 참조하세요.
              </p>
              <p>
                <strong>문의사항:</strong> 구독 관련 문의가 있으시면 언제든지 연락해주세요.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            SH Tools를 이용해주셔서 감사합니다! 🙏
          </p>
        </div>
      </div>
    </div>
  )
}
