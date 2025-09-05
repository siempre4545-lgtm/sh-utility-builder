'use client'

import { useState } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/Button'
import { Image, Download, Settings, Loader2, Eye, Smartphone } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'
import { trackFileConversion, trackProUpgrade } from '@/components/GoogleAnalytics'
import { isMobile, downloadFile, downloadMultipleFiles, previewImage } from '@/lib/mobile'

export default function ImageResizePage() {
  const [files, setFiles] = useState<File[]>([])
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [quality, setQuality] = useState(85)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
  }

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('파일을 선택해주세요.')
      return
    }

    setIsProcessing(true)
    const startTime = Date.now()
    
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('width', width.toString())
      formData.append('height', height.toString())
      formData.append('quality', quality.toString())
      formData.append('maintainAspectRatio', maintainAspectRatio.toString())
      formData.append('isPro', 'false') // 무료 버전

      const response = await fetch('/api/image-resize', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        if (error.requiresPro) {
          // Pro 업그레이드 시도 추적
          const totalSize = files.reduce((sum, file) => sum + file.size, 0)
          trackProUpgrade('image-resize', 'free', files.length, totalSize)
          setIsProModalOpen(true)
          return
        }
        throw new Error(error.error || '이미지 리사이즈 중 오류가 발생했습니다.')
      }

      // 응답을 blob으로 변환
      const blob = await response.blob()
      
      // 모바일에서는 개별 파일 다운로드, 데스크톱에서는 ZIP 다운로드
      if (isMobile()) {
        // 모바일: 개별 파일로 다운로드
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
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `resized_images_${Date.now()}.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        toast.success('리사이즈된 이미지들이 ZIP 파일로 다운로드되었습니다.')
      }
      
      // 성공 이벤트 추적
      const processingTime = Date.now() - startTime
      trackFileConversion('image-resize', true, processingTime, blob.size)
      
      toast.success('이미지 리사이즈가 완료되었습니다!')
    } catch (error) {
      console.error('이미지 리사이즈 오류:', error)
      const processingTime = Date.now() - startTime
      trackFileConversion('image-resize', false, processingTime)
      toast.error(error instanceof Error ? error.message : '이미지 리사이즈 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>무료 이미지 리사이즈 도구 - JPEG, PNG, WebP 크기 조정 | SH Tools</title>
        <meta name="description" content="무료로 이미지 크기를 조정하세요. JPEG, PNG, WebP 파일의 해상도를 변경하고 품질을 최적화하는 온라인 도구. 종횡비 유지, 고품질 출력 지원." />
        <meta name="keywords" content="이미지 리사이즈, 무료 이미지 크기 조정, JPEG 리사이즈, PNG 리사이즈, WebP 리사이즈, 온라인 이미지 편집, 이미지 최적화" />
        <meta property="og:title" content="무료 이미지 리사이즈 도구 - JPEG, PNG, WebP 크기 조정" />
        <meta property="og:description" content="무료로 이미지 크기를 조정하세요. JPEG, PNG, WebP 파일의 해상도를 변경하고 품질을 최적화하는 온라인 도구." />
        <meta property="og:url" content="https://sh-utility-builder-dn13.vercel.app/tools/image-resize" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="무료 이미지 리사이즈 도구" />
        <meta name="twitter:description" content="무료로 이미지 크기를 조정하세요. JPEG, PNG, WebP 파일의 해상도를 변경하고 품질을 최적화하는 온라인 도구." />
      </Head>

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
              종횡비를 유지하면서 원하는 크기로 변경할 수 있습니다.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Area */}
            <div className="lg:col-span-2">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  이미지 업로드
                </h3>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  maxSize={50}
                  maxFiles={5}
                  disabled={isProcessing}
                  toolName="image-resize"
                />
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
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value) || 800)}
                      className="input-field"
                      min="1"
                      max="4000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      높이 (픽셀)
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value) || 600)}
                      className="input-field"
                      min="1"
                      max="4000"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    품질 ({quality}%)
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">종횡비 유지</span>
                  </label>
                </div>
                <div className="mt-6 space-y-3">
                  <Button 
                    onClick={handleProcess}
                    disabled={files.length === 0 || isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        이미지 리사이즈
                      </>
                    )}
                  </Button>
                  
                  {/* 모바일 최적화 안내 */}
                  {isMobile() && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <Smartphone className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-900 mb-1">모바일 최적화</h4>
                          <p className="text-xs text-blue-700">
                            모바일에서는 처리된 이미지가 개별 파일로 다운로드되어 바로 갤러리에 저장됩니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
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
                    <span className="text-gray-600">품질 조절 (10-100%)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">종횡비 유지 옵션</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">배치 처리 (최대 5개)</span>
                  </li>
                </ul>
              </div>

              {/* Pro Upgrade */}
              <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Pro 업그레이드
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  더 큰 파일, 더 많은 배치 처리, 고급 옵션
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
      </div>
      
      {/* Pro Modal */}
      <ProModal 
        isOpen={isProModalOpen} 
        onClose={() => setIsProModalOpen(false)}
        trigger="image-resize"
      />
    </>
  )
}