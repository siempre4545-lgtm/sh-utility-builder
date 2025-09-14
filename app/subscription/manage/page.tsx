'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { 
  Settings, 
  CreditCard, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  ExternalLink,
  ArrowLeft,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function SubscriptionManagePage() {
  const searchParams = useSearchParams()
  const [subscriptionStatus, setSubscriptionStatus] = useState<'active' | 'cancelled' | 'expired' | 'loading'>('loading')
  const [subscriptionData, setSubscriptionData] = useState<any>(null)

  useEffect(() => {
    // 실제 구현에서는 사용자의 구독 정보를 API에서 가져와야 함
    // 현재는 시뮬레이션 데이터 사용
    setTimeout(() => {
      setSubscriptionStatus('active')
      setSubscriptionData({
        plan: 'Pro 연간',
        price: '₩79,000/년',
        nextBilling: '2024-12-15',
        status: 'active',
        startDate: '2024-01-15'
      })
    }, 1000)
  }, [])

  const handleManageSubscription = () => {
    // LemonSqueezy 고객 포털로 리다이렉트
    const customerPortalUrl = 'https://sh-utility.lemonsqueezy.com/my-orders'
    window.open(customerPortalUrl, '_blank')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'cancelled':
        return <AlertCircle className="w-6 h-6 text-orange-600" />
      case 'expired':
        return <AlertCircle className="w-6 h-6 text-red-600" />
      default:
        return <RefreshCw className="w-6 h-6 text-gray-400 animate-spin" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '활성'
      case 'cancelled':
        return '취소됨'
      case 'expired':
        return '만료됨'
      default:
        return '로딩 중...'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'cancelled':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (subscriptionStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">구독 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">구독 관리</h1>
          <p className="text-gray-600">Pro 구독 상태를 확인하고 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Status */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">구독 상태</h2>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(subscriptionStatus)}`}>
                  {getStatusIcon(subscriptionStatus)}
                  <span className="font-medium">{getStatusText(subscriptionStatus)}</span>
                </div>
              </div>

              {subscriptionData && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">플랜</label>
                      <p className="text-lg font-semibold text-gray-900">{subscriptionData.plan}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">가격</label>
                      <p className="text-lg font-semibold text-gray-900">{subscriptionData.price}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">시작일</label>
                      <p className="text-gray-900">{subscriptionData.startDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">다음 결제일</label>
                      <p className="text-gray-900">{subscriptionData.nextBilling}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleManageSubscription}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  구독 관리하기
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Manage Subscription */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">구독 관리</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                결제 방법 변경, 구독 취소, 환불 요청 등을 할 수 있습니다.
              </p>
              <Button
                onClick={handleManageSubscription}
                variant="outline"
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                LemonSqueezy 포털 열기
              </Button>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">결제 내역</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                과거 결제 내역과 영수증을 확인할 수 있습니다.
              </p>
              <Button
                onClick={handleManageSubscription}
                variant="outline"
                className="w-full"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                결제 내역 보기
              </Button>
            </div>

            {/* Cancel Subscription */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">구독 취소</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                언제든지 구독을 취소할 수 있습니다.
              </p>
              <Link href="/subscription/cancel">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  구독 취소하기
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-4">도움이 필요하신가요?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">구독 관련 문의</h4>
              <p>구독 상태, 결제, 환불 등에 대한 문의사항이 있으시면 연락해주세요.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">기술 지원</h4>
              <p>Pro 기능 사용 중 문제가 있으시면 기술 지원팀에 문의해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
