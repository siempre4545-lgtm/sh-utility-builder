'use client'

import { useState } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/Button'
import { Download, Smartphone, Camera, Loader2, AlertTriangle, ExternalLink } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'

export default function HeicToJpgPage() {
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  const [showAlternativeTools, setShowAlternativeTools] = useState(false)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('파일을 선택해주세요.')
      return
    }

    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('quality', quality.toString())

      const response = await fetch('/api/heic-to-jpg', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '처리 중 오류가 발생했습니다.')
      }

      // 파일 다운로드
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `heic_converted_${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('HEIC 변환이 완료되었습니다!')
    } catch (error) {
      console.error('처리 오류:', error)
      const errorMessage = error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.'
      
      // HEIC 지원 관련 에러인지 확인
      if (errorMessage.includes('HEIC') || errorMessage.includes('heic') || errorMessage.includes('지원')) {
        setShowAlternativeTools(true)
        toast.error('HEIC 파일 변환에 실패했습니다. 대안 도구를 확인해보세요.')
      } else {
        toast.error(errorMessage)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>무료 HEIC JPG 변환기 - iPhone 사진 변환 도구 | SH Tools</title>
        <meta name="description" content="무료로 iPhone HEIC 사진을 JPG로 변환하세요. 고품질 변환, 빠른 처리, 메타데이터 보존. iPhone, iPad 사진을 널리 호환되는 JPG 형식으로 변환하는 온라인 도구." />
        <meta name="keywords" content="HEIC JPG 변환, iPhone 사진 변환, HEIC 변환기, 무료 HEIC 변환, iPhone 사진 JPG, HEIC to JPG, 온라인 HEIC 변환" />
        <meta property="og:title" content="무료 HEIC JPG 변환기 - iPhone 사진 변환 도구" />
        <meta property="og:description" content="무료로 iPhone HEIC 사진을 JPG로 변환하세요. 고품질 변환, 빠른 처리, 메타데이터 보존." />
        <meta property="og:url" content="https://sh-utility-builder-dn13.vercel.app/tools/heic-to-jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="무료 HEIC JPG 변환기" />
        <meta name="twitter:description" content="무료로 iPhone HEIC 사진을 JPG로 변환하세요. 고품질 변환, 빠른 처리, 메타데이터 보존." />
      </Head>

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
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedTypes={['image/heic', 'image/heif']}
                maxSize={50}
                maxFiles={10}
                disabled={isProcessing}
              />
            </div>

            {/* Conversion Info */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                변환 설정
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    품질 (%) - {quality}
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>낮음</span>
                    <span>높음</span>
                  </div>
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
                <Button 
                  className="w-full" 
                  onClick={handleProcess}
                  disabled={files.length === 0 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      변환 중...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      변환 시작
                    </>
                  )}
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
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsProModalOpen(true)}
              >
                Pro로 업그레이드
              </Button>
            </div>
          </div>
        </div>

        {/* Alternative Tools Section */}
        {showAlternativeTools && (
          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  HEIC 변환에 문제가 있나요?
                </h3>
                <p className="text-yellow-700 mb-4">
                  일부 HEIC 파일은 브라우저 환경에서 변환이 어려울 수 있습니다. 
                  아래 대안 도구들을 시도해보세요:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-gray-900 mb-2">온라인 대안 도구</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <a 
                          href="https://cloudconvert.com/heic-to-jpg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          CloudConvert <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://convertio.co/heic-jpg/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          Convertio <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://www.freeconvert.com/heic-to-jpg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700"
                        >
                          FreeConvert <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-gray-900 mb-2">다른 변환 도구</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>
                        <a 
                          href="/tools/webp-to-jpg" 
                          className="text-primary-600 hover:text-primary-700"
                        >
                          WebP → JPG 변환기
                        </a>
                      </li>
                      <li>
                        <a 
                          href="/tools/image-resize" 
                          className="text-primary-600 hover:text-primary-700"
                        >
                          이미지 리사이즈
                        </a>
                      </li>
                      <li>
                        <a 
                          href="/tools/pdf-merge" 
                          className="text-primary-600 hover:text-primary-700"
                        >
                          PDF 병합
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAlternativeTools(false)}
                  >
                    닫기
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      setShowAlternativeTools(false)
                      setIsProModalOpen(true)
                    }}
                  >
                    Pro로 업그레이드
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

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
      
      {/* Pro Modal */}
      <ProModal 
        isOpen={isProModalOpen} 
        onClose={() => setIsProModalOpen(false)}
        trigger="heic-to-jpg"
      />
      </div>
    </>
  )
}