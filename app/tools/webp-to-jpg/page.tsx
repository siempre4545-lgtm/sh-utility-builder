'use client'

import { useState } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { isMobile, downloadFile, downloadMultipleFiles, previewImage } from '@/lib/mobile'
import { Button } from '@/components/ui/Button'
import { Zap, Download, Globe, Loader2 } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'
import { trackFileConversion, trackUserAction } from '@/components/GoogleAnalytics'
import { handleApiDownload } from '@/lib/download'

export default function WebpToJpgPage() {
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState(90)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('WebP 파일을 선택해주세요.')
      return
    }

    setIsProcessing(true)
    const startTime = Date.now()
    
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('quality', quality.toString())

      const response = await fetch('/api/webp-to-jpg', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '처리 중 오류가 발생했습니다.')
      }

      // 자동 다운로드 처리
      const processingTime = Date.now() - startTime
      const totalSize = files.reduce((sum, file) => sum + file.size, 0)
      
      // 모바일에서는 개별 파일 다운로드, 데스크톱에서는 ZIP 다운로드
      if (isMobile()) {
        // 모바일: 개별 파일로 다운로드
        const blob = await response.blob()
        const zip = new (await import('jszip')).default()
        const zipData = await zip.loadAsync(blob)
        
        const files: File[] = []
        for (const [filename, file] of Object.entries(zipData.files)) {
          if (!file.dir) {
            const content = await file.async('blob')
            const newFile = new File([content], filename, { type: content.type })
            files.push(newFile)
          }
        }
        
        // 개별 파일 다운로드
        await downloadMultipleFiles(files, 300)
        toast.success(`${files.length}개 파일이 개별적으로 다운로드되었습니다.`)
      } else {
        // 데스크톱: ZIP 파일로 다운로드
        await handleApiDownload(response, {
          filename: `webp_converted_${Date.now()}.zip`,
          toolName: 'webp-to-jpg',
          showToast: false // handleApiDownload에서 토스트 표시
        })
      }

      // GA4 이벤트 추적
      const blob = await response.blob()
      trackFileConversion('webp-to-jpg', true, processingTime, blob.size)
      trackUserAction('file_download', 'webp-to-jpg', {
        fileCount: files.length,
        totalSize: totalSize,
        outputSize: blob.size,
        processingTime: processingTime
      })

      toast.success('WebP 변환이 완료되었습니다!')
    } catch (error) {
      console.error('처리 오류:', error)
      
      // 에러 이벤트 추적
      trackFileConversion('webp-to-jpg', false, Date.now() - startTime)
      trackUserAction('conversion_error', 'webp-to-jpg', {
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      
      toast.error(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>무료 WebP JPG 변환기 - Google WebP를 JPG로 변환 | SH Tools</title>
        <meta name="description" content="무료로 Google WebP 이미지를 JPG로 변환하세요. 호환성 향상, 압축 최적화, 메타데이터 보존. WebP 파일을 널리 호환되는 JPG 형식으로 변환하는 온라인 도구." />
        <meta name="keywords" content="WebP JPG 변환, WebP 변환기, 무료 WebP 변환, WebP to JPG, Google WebP 변환, 온라인 WebP 변환, WebP JPG 변환기" />
        <meta property="og:title" content="무료 WebP JPG 변환기 - Google WebP를 JPG로 변환" />
        <meta property="og:description" content="무료로 Google WebP 이미지를 JPG로 변환하세요. 호환성 향상, 압축 최적화, 메타데이터 보존." />
        <meta property="og:url" content="https://sh-utility-builder-dn13.vercel.app/tools/webp-to-jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="무료 WebP JPG 변환기" />
        <meta name="twitter:description" content="무료로 Google WebP 이미지를 JPG로 변환하세요. 호환성 향상, 압축 최적화, 메타데이터 보존." />
      </Head>

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
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedTypes={['image/webp']}
                maxSize={25}
                maxFiles={10}
                disabled={isProcessing}
              />
            </div>

            {/* Conversion Info */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
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
        trigger="webp-to-jpg"
      />
      </div>
    </>
  )
}