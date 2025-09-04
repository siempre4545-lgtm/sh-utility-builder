import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Image, Upload, Download, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: '이미지 리사이즈 - 무료 온라인 이미지 크기 조정 도구 | SH Tools',
  description: 'JPEG, PNG, WebP 이미지 크기를 무료로 조정하세요. 품질 조절, 종횡비 유지, 빠른 처리. 브라우저에서 바로 사용 가능한 안전한 이미지 리사이즈 도구.',
  keywords: '이미지 리사이즈, 이미지 크기 조정, JPEG 리사이즈, PNG 리사이즈, WebP 리사이즈, 온라인 이미지 편집',
  openGraph: {
    title: '이미지 리사이즈 - 무료 온라인 이미지 크기 조정 도구',
    description: 'JPEG, PNG, WebP 이미지 크기를 무료로 조정하세요. 품질 조절, 종횡비 유지, 빠른 처리.',
    url: 'https://sh-utility-builder-dn13.vercel.app/tools/image-resize',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '이미지 리사이즈 - 무료 온라인 이미지 크기 조정 도구',
    description: 'JPEG, PNG, WebP 이미지 크기를 무료로 조정하세요. 품질 조절, 종횡비 유지, 빠른 처리.',
  },
  alternates: {
    canonical: 'https://sh-utility-builder-dn13.vercel.app/tools/image-resize',
  },
}

export default function ImageResizePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Image className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            이미지 리사이즈
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            JPEG, PNG, WebP 이미지 크기를 조정하고 품질을 최적화하세요. 
            종횡비를 유지하면서 빠르고 안전하게 처리됩니다.
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
                  이미지 파일을 업로드하세요
                </h3>
                <p className="text-gray-600 mb-4">
                  JPEG, PNG, WebP 파일을 드래그하거나 클릭하여 선택
                </p>
                <Button size="lg">
                  파일 선택
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  최대 파일 크기: 10MB
                </p>
              </div>
            </div>

            {/* Settings */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                리사이즈 설정
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    너비 (픽셀)
                  </label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="예: 800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    높이 (픽셀)
                  </label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="예: 600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    품질 (%)
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    defaultValue="85"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>낮음</span>
                    <span>높음</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종횡비 유지
                  </label>
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                </div>
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
                  <span className="text-gray-600">JPEG, PNG, WebP 지원</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">품질 조절 (1-100%)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">종횡비 자동 유지</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">빠른 처리 속도</span>
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
                  리사이즈된 이미지를 다운로드하세요
                </p>
                <Button className="w-full" disabled>
                  다운로드 준비 중...
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