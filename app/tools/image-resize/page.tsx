'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Image, Download, Settings, Loader2 } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'

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
    
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('width', width.toString())
      formData.append('height', height.toString())
      formData.append('quality', quality.toString())
      formData.append('maintainAspectRatio', maintainAspectRatio.toString())

      const response = await fetch('/api/image-resize', {
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
      a.download = `resized_images_${Date.now()}.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('이미지 리사이즈가 완료되었습니다!')
    } catch (error) {
      console.error('처리 오류:', error)
      toast.error(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

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
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/webp']}
                maxSize={10}
                maxFiles={10}
                disabled={isProcessing}
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
                    className="input-field" 
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value) || 800)}
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
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 600)}
                    placeholder="예: 600"
                  />
                </div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    종횡비 유지
                  </label>
                  <input 
                    type="checkbox" 
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
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
                <Button 
                  className="w-full" 
                  onClick={handleProcess}
                  disabled={files.length === 0 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      처리 중...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      리사이즈 시작
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
        trigger="image-resize"
      />
    </div>
  )
}