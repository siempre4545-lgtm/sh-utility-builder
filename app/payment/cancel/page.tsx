'use client'

import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Cancel Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            결제가 취소되었습니다
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            결제 과정이 중단되었습니다. 언제든지 다시 시도하실 수 있습니다.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium">
                <RefreshCw className="w-5 h-5 mr-2" />
                다시 시도하기
              </Button>
            </Link>
            
            <Link href="/tools">
              <Button variant="outline" className="w-full py-3 px-6 rounded-lg font-medium">
                <ArrowLeft className="w-5 h-5 mr-2" />
                도구 페이지로 돌아가기
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">도움이 필요하신가요?</h3>
            <p className="text-sm text-gray-600 mb-4">
              결제 과정에서 문제가 발생하셨나요? 언제든지 문의해주세요.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>• 결제는 안전하게 처리됩니다</p>
              <p>• 언제든지 취소할 수 있습니다</p>
              <p>• 24/7 고객 지원을 제공합니다</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            SH Tools와 함께 더 나은 경험을 만들어보세요! 💪
          </p>
        </div>
      </div>
    </div>
  )
}
