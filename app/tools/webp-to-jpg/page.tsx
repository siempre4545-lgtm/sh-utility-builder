import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Zap, Upload, Download, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'WebP to JPG 변환기 - WebP를 JPG로 무료 변환 | SH Tools',
  description: 'Google WebP 이미지를 호환성 높은 JPG로 무료 변환하세요. 압축 최적화, 메타데이터 보존, 빠른 처리. 브라우저에서 바로 사용 가능한 안전한 WebP 변환 도구.',
  keywords: 'WebP to JPG, WebP 변환, WebP JPG 변환기, 온라인 WebP 변환, 무료 WebP 변환, Google WebP',
  openGraph: {
    title: 'WebP to JPG 변환기 - WebP를 JPG로 무료 변환',
    description: 'Google WebP 이미지를 호환성 높은 JPG로 무료 변환하세요. 압축 최적화, 메타데이터 보존, 빠른 처리.',
    url: 'https://sh-utility-builder-dn13.vercel.app/tools/webp-to-jpg',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebP to JPG 변환기 - WebP를 JPG로 무료 변환',
    description: 'Google WebP 이미지를 호환성 높은 JPG로 무료 변환하세요. 압축 최적화, 메타데이터 보존, 빠른 처리.',
  },
  alternates: {
    canonical: 'https://sh-utility-builder-dn13.vercel.app/tools/webp-to-jpg',
  },
}

export default function WebpToJpgPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WebP → JPG 변환기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Google WebP 이미지를 호환성 높은 JPG로 변환하세요. 
            압축 최적화와 메타데이터 보존을 제공합니다.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  WebP 파일을 업로드하세요
                </h3>
                <p className="text-gray-600 mb-4">
                  WebP 이미지 파일을 드래그하거나 클릭하여 선택
                </p>
                <Button size="lg">
                  WebP 파일 선택
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  최대 파일 크기: 25MB
                </p>
              </div>
            </div>

            {/* Conversion Info */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                변환 정보
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">WebP 형식이란?</h4>
                <p className="text-green-800 text-sm mb-3">
                  WebP는 Google이 개발한 고효율 이미지 형식입니다. 
                  JPEG보다 25-35% 작은 파일 크기를 제공하지만 일부 구형 브라우저에서 지원하지 않을 수 있습니다.
                </p>
                <h4 className="font-medium text-green-900 mb-2">JPG 변환의 장점</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• 모든 브라우저와 기기에서 호환</li>
                  <li>• 소셜미디어 플랫폼 지원</li>
                  <li>• 이메일 첨부 및 공유 용이</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                주요 기능
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">호환성 향상</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">압축 최적화</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">메타데이터 보존</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">배치 변환 지원</span>
                </li>
              </ul>
            </div>

            {/* Download */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                다운로드
              </h3>
              <div className="text-center">
                <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  변환된 JPG 파일을 다운로드하세요
                </p>
                <Button className="w-full" disabled>
                  변환 준비 중...
                </Button>
              </div>
            </div>

            {/* Pro Upgrade */}
            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pro 업그레이드
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                더 큰 파일, 배치 처리, 고급 옵션
              </p>
              <Button variant="outline" className="w-full">
                Pro로 업그레이드
              </Button>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a 
            href="/" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}