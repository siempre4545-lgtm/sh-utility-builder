'use client'

import { Button } from '@/components/ui/Button'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="gradient-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            빠르고 안전한
            <span className="text-gradient block">파일 변환 도구</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            이미지 리사이즈, PDF 병합, HEIC 변환 등 다양한 파일 변환을 
            브라우저에서 바로 처리하세요. 업로드 없이 빠르고 안전합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/tools">
              <Button size="lg" className="w-full sm:w-auto">
                도구 사용하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Pro 업그레이드
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">빠른 처리</h3>
              <p className="text-gray-600">최적화된 알고리즘으로 빠른 파일 변환</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">완전 안전</h3>
              <p className="text-gray-600">파일이 서버에 저장되지 않아 개인정보 보호</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24시간 사용</h3>
              <p className="text-gray-600">언제든지 무료로 사용 가능</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
