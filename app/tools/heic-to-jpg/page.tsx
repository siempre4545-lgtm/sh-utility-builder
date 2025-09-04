'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Download, Smartphone, Camera, Loader2 } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'

export default function HeicToJpgPage() {
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState(90)
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
  )
}