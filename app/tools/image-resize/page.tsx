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
  const [resizedFiles, setResizedFiles] = useState<File[]>([])
  const [isDownloading, setIsDownloading] = useState(false)

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setResizedFiles([]) // 새 파일 선택 시 리사이즈된 파일 초기화
  }

  const handleManualDownload = async () => {
    if (resizedFiles.length === 0) return
    
    setIsDownloading(true)
    try {
      await downloadMultipleFiles(resizedFiles, 300)
      toast.success(`${resizedFiles.length}개 파일이 다시 다운로드되었습니다.`)
    } catch (error) {
      toast.error('다운로드 중 오류가 발생했습니다.')
    } finally {
      setIsDownloading(false)
    }
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
        
        const convertedFiles: File[] = []
        for (const [filename, file] of Object.entries(zipData.files)) {
          if (!file.dir) {
            const content = await file.async('blob')
            
            // 원본 파일명에서 확장자 추출
            const fileExtension = filename.split('.').pop() || 'jpg'
            const baseName = filename.replace(/\.[^/.]+$/, '')
            
            // 리사이즈된 파일임을 명확히 표시하는 파일명 생성
            const timestamp = Date.now()
            const resizedFilename = `${baseName}_resized_${timestamp}.${fileExtension}`
            
            const newFile = new File([content], resizedFilename, { type: content.type })
            convertedFiles.push(newFile)
          }
        }
        
        // 리사이즈된 파일들을 상태에 저장
        console.log('모바일 리사이즈 완료:', convertedFiles.length, '개 파일')
        setResizedFiles(convertedFiles)
        
        // 자동 다운로드 시작
        setIsDownloading(true)
        try {
          console.log('모바일 자동 다운로드 시작:', convertedFiles.length, '개 파일')
          await downloadMultipleFiles(convertedFiles, 300)
          console.log('모바일 자동 다운로드 완료')
          toast.success(`📱 ${convertedFiles.length}개 리사이즈된 이미지가 갤러리에 새로 저장되었습니다!`)
        } catch (error) {
          console.error('모바일 다운로드 오류:', error)
          toast.error('다운로드 중 오류가 발생했습니다. 아래 버튼을 눌러 다시 시도해주세요.')
        } finally {
          setIsDownloading(false)
        }
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
                  
                  {/* 모바일 다운로드 상태 및 수동 다운로드 버튼 */}
                  {isMobile() && (
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 shadow-sm">
                      {resizedFiles.length > 0 ? (
                        <>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                <Download className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <span className="text-base font-semibold text-green-900 block">
                                  {resizedFiles.length}개 이미지 리사이즈 완료
                                </span>
                                <span className="text-xs text-green-600">
                                  📱 갤러리/사진첩에 자동 저장됨
                                </span>
                              </div>
                            </div>
                            {isDownloading && (
                              <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <div className="bg-white rounded-lg p-3 border border-green-200">
                              <div className="flex items-center justify-center space-x-2">
                                <span className="text-lg">📱</span>
                                <p className="text-sm text-green-800 font-medium">
                                  {isDownloading ? '갤러리에 저장 중...' : '갤러리에 저장 완료!'}
                                </p>
                              </div>
                              <p className="text-xs text-green-600 text-center mt-1">
                                원본 파일은 그대로 보존되고, 리사이즈된 이미지만 새로 생성됩니다
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleManualDownload}
                              disabled={isDownloading}
                              className="w-full text-green-700 border-green-400 hover:bg-green-100 font-medium"
                            >
                              {isDownloading ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  저장 중...
                                </>
                              ) : (
                                <>
                                  <Download className="w-4 h-4 mr-2" />
                                  다시 저장하기
                                </>
                              )}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Download className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="text-sm font-medium text-green-800 mb-1">
                            📱 모바일 최적화 저장
                          </p>
                          <p className="text-xs text-green-600">
                            원본 파일 보존, 리사이즈된 이미지만 갤러리에 새로 저장됩니다
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* PC 다운로드 안내 */}
                  {!isMobile() && (
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 shadow-sm">
                      <div className="text-center py-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Download className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-blue-800 mb-1">
                          💻 PC 최적화 다운로드
                        </p>
                        <p className="text-xs text-blue-600">
                          리사이즈 완료 후 ZIP 파일로 다운로드됩니다
                        </p>
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