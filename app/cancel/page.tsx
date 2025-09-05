'use client'

import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>

        {/* Cancel Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          결제가 취소되었습니다
        </h1>
        <p className="text-gray-600 mb-6">
          결제 과정이 취소되었습니다. 
          언제든지 다시 시도하실 수 있습니다.
        </p>

        {/* Free Plan Benefits */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">무료 플랜으로도 사용 가능</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 기본 파일 변환 기능</li>
            <li>• 월 10개 파일까지 처리</li>
            <li>• 최대 10MB 파일 크기</li>
            <li>• 커뮤니티 지원</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/tools" className="block">
            <Button className="w-full bg-primary-600 hover:bg-primary-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              무료로 도구 사용하기
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            결제에 문제가 있으셨나요? 
            <Link href="/contact" className="text-primary-600 hover:underline ml-1">
              고객지원
            </Link>
            에 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
