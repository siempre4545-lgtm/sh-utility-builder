import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { FileText, Upload, Download, ArrowUpDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PDF 병합 도구 - 여러 PDF를 하나로 무료 병합 | SH Tools',
  description: '여러 PDF 파일을 하나로 병합하세요. 순서 조정, 빠른 병합, 고품질 출력. 브라우저에서 바로 사용 가능한 안전한 PDF 병합 도구.',
  keywords: 'PDF 병합, PDF 합치기, PDF 결합, PDF 머지, 온라인 PDF 병합, 무료 PDF 병합',
  openGraph: {
    title: 'PDF 병합 도구 - 여러 PDF를 하나로 무료 병합',
    description: '여러 PDF 파일을 하나로 병합하세요. 순서 조정, 빠른 병합, 고품질 출력.',
    url: 'https://sh-utility-builder-dn13.vercel.app/tools/pdf-merge',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF 병합 도구 - 여러 PDF를 하나로 무료 병합',
    description: '여러 PDF 파일을 하나로 병합하세요. 순서 조정, 빠른 병합, 고품질 출력.',
  },
  alternates: {
    canonical: 'https://sh-utility-builder-dn13.vercel.app/tools/pdf-merge',
  },
}

export default function PdfMergePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDF 병합 도구
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            여러 PDF 파일을 하나로 병합하여 관리하세요. 
            순서 조정과 빠른 병합을 제공합니다.
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
                  PDF 파일들을 업로드하세요
                </h3>
                <p className="text-gray-600 mb-4">
                  병합할 PDF 파일들을 드래그하거나 클릭하여 선택
                </p>
                <Button size="lg">
                  PDF 파일 선택
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  최대 파일 크기: 100MB (총합)
                </p>
              </div>
            </div>

            {/* File List */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ArrowUpDown className="w-5 h-5 mr-2" />
                파일 순서
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-900">document1.pdf</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">↑</Button>
                    <Button variant="outline" size="sm">↓</Button>
                    <Button variant="outline" size="sm">삭제</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-red-500 mr-3" />
                    <span className="text-gray-900">document2.pdf</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">↑</Button>
                    <Button variant="outline" size="sm">↓</Button>
                    <Button variant="outline" size="sm">삭제</Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center py-4">
                  파일을 업로드하면 여기에 표시됩니다
                </p>
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
                  <span className="text-gray-600">순서 조정</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">빠른 병합</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">고품질 출력</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">메타데이터 보존</span>
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
                  병합된 PDF를 다운로드하세요
                </p>
                <Button className="w-full" disabled>
                  병합 준비 중...
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