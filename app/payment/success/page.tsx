'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Zap, Shield, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const planParam = searchParams.get('plan')
    if (planParam) {
      setPlan(planParam)
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const planName = plan === 'monthly' ? '월간' : plan === 'yearly' ? '연간' : 'Pro'
  const planPrice = plan === 'monthly' ? '₩7,900/월' : plan === 'yearly' ? '₩79,000/년' : ''

  const features = [
    {
      icon: Zap,
      title: '빠른 처리',
      description: '무제한 파일 크기와 빠른 처리 속도'
    },
    {
      icon: Shield,
      title: '고급 보안',
      description: '엔터프라이즈급 보안과 프라이버시 보호'
    },
    {
      icon: Clock,
      title: '24/7 지원',
      description: '우선 고객 지원과 기술 지원'
    },
    {
      icon: Star,
      title: '프리미엄 기능',
      description: '배치 처리, API 접근, 고급 옵션'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            결제가 완료되었습니다! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold text-primary-600">{planName} 플랜</span>에 성공적으로 가입하셨습니다.
          </p>
          
          {planPrice && (
            <p className="text-gray-500 mb-8">
              {planPrice} • 언제든지 취소 가능
            </p>
          )}

          {/* Pro Features */}
          <div className="bg-primary-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              이제 사용할 수 있는 Pro 기능들
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 text-sm">{feature.title}</h3>
                    <p className="text-gray-600 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/tools">
              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium">
                도구 사용하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" className="w-full py-3 px-6 rounded-lg font-medium">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-700">
              <Shield className="w-4 h-4" />
              <span>결제 확인 이메일이 발송되었습니다</span>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              구독 관리나 문의사항이 있으시면 언제든지 연락해주세요.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            SH Tools Pro를 선택해주셔서 감사합니다! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}
