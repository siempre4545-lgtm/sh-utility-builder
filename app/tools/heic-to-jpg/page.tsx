import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Download, Upload, Smartphone, Camera } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HEIC to JPG 변환기 - iPhone 사진을 JPG로 무료 변환 | SH Tools',
  description: 'iPhone HEIC 사진을 널리 호환되는 JPG로 무료 변환하세요. 고품질 변환, 빠른 처리, 메타데이터 보존. 브라우저에서 바로 사용 가능한 안전한 HEIC 변환 도구.',
  keywords: 'HEIC to JPG, HEIC 변환, iPhone 사진 변환, HEIC JPG 변환기, 온라인 HEIC 변환, 무료 HEIC 변환',
  openGraph: {
    title: 'HEIC to JPG 변환기 - iPhone 사진을 JPG로 무료 변환',
    description: 'iPhone HEIC 사진을 널리 호환되는 JPG로 무료 변환하세요. 고품질 변환, 빠른 처리, 메타데이터 보존.',
    url: 'https://sh-utility-builder-dn13.vercel.app/tools/heic-to-jpg',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEIC to JPG 변환기 - iPhone 사진을 JPG로 무료 변환',
    description: 'iPhone HEIC 사진을 널리 호환되는 JPG로 무료 변환하세요. 고품질 변환, 빠른 처리, 메타데이터 보존.',
  },
  alternates: {
    canonical: 'https://sh-utility-builder-dn13.vercel.app/tools/heic-to-jpg',
  },
}

export default function HeicToJpgPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HEIC → JPG 변환기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            iPhone HEIC 사진을 널리 호환되는 JPG로 변환하세요. 
            고품질 변환과 빠른 처리를 제공합니다.
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
                  HEIC 파일을 업로드하세요
                </h3>
                <p className="text-gray-600 mb-4">
                  iPhone에서 촬영한 HEIC 파일을 드래그하거나 클릭하여 선택
                </p>
                <Button size="lg">
                  HEIC 파일 선택
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  최대 파일 크기: 50MB
                </p>
              </div>
            </div>

            {/* Conversion Info */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                변환 정보
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">HEIC 형식이란?</h4>
                <p className="text-blue-800 text-sm mb-3">
                  HEIC(High Efficiency Image Container)는 Apple이 iPhone에서 사용하는 
                  고효율 이미지 형식입니다. 파일 크기는 작지만 호환성 문제가 있을 수 있습니다.
                </p>
                <h4 className="font-medium text-blue-900 mb-2">JPG 변환의 장점</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• 모든 기기와 소프트웨어에서 호환</li>
                  <li>• 웹사이트 업로드 및 공유 용이</li>
                  <li>• 소셜미디어 플랫폼 지원</li>
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
                  <span className="text-gray-600">고품질 변환</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">빠른 처리 속도</span>
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