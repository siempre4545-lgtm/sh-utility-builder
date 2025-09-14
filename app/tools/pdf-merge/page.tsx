'use client'

import { useState } from 'react'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { isMobile, downloadFile } from '@/lib/mobile'
import { Button } from '@/components/ui/Button'
import { FileText, Download, ArrowUpDown, Loader2, Lock } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'
import { useProStatusContext } from '@/components/ProStatusProvider'

export default function PdfMergePage() {
  const { isPro } = useProStatusContext()
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  // 무료 사용자 제한: 최대 3개 파일
  const maxFiles = isPro ? Infinity : 3

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (!isPro && selectedFiles.length > maxFiles) {
      toast.error(`무료 버전은 최대 ${maxFiles}개 파일만 처리할 수 있습니다. Pro로 업그레이드하세요.`)
      setIsProModalOpen(true)
      return
    }
    setFiles(selectedFiles)
  }

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files]
    if (direction === 'up' && index > 0) {
      [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]]
    } else if (direction === 'down' && index < newFiles.length - 1) {
      [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
    }
    setFiles(newFiles)
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
  }

  const handleProcess = async () => {
    if (files.length === 0) {
      toast.error('PDF 파일을 선택해주세요.')
      return
    }

    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('order', JSON.stringify(Array.from({ length: files.length }, (_, i) => i)))

      const response = await fetch('/api/pdf-merge', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || '처리 중 오류가 발생했습니다.')
      }

      // 파일 다운로드 (모바일 최적화)
      const blob = await response.blob()
      const pdfFile = new File([blob], `merged_${Date.now()}.pdf`, { type: 'application/pdf' })
      
      if (isMobile()) {
        // 모바일: 개별 파일 다운로드
        downloadFile(pdfFile)
        toast.success('PDF 파일이 다운로드되었습니다. 파일 앱에서 확인하세요.')
      } else {
        // 데스크톱: 기존 방식
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `merged_${Date.now()}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('PDF 파일이 병합되어 다운로드되었습니다.')
      }

      toast.success('PDF 병합이 완료되었습니다!')
    } catch (error) {
      console.error('처리 오류:', error)
      toast.error(error instanceof Error ? error.message : '처리 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <Head>
        <title>PDF 병합 - SH Tools</title>
        <meta name="description" content="여러 PDF를 한 파일로 병합. 순서 변경, 빠른 처리." />
        <meta name="keywords" content="PDF 병합, 무료 PDF 합치기, PDF 파일 합치기, PDF 병합 도구, 온라인 PDF 병합, PDF 합치기 무료" />
        <meta property="og:title" content="PDF 병합 - SH Tools" />
        <meta property="og:description" content="여러 PDF를 한 파일로 병합. 순서 변경, 빠른 처리." />
        <meta property="og:url" content="https://sh-utility-builder.vercel.app/tools/pdf-merge" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PDF 병합 - SH Tools" />
        <meta name="twitter:description" content="여러 PDF를 한 파일로 병합. 순서 변경, 빠른 처리." />
      </Head>

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
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                <span>PDF 파일 업로드</span>
                {!isPro && (
                  <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    최대 3개
                  </span>
                )}
              </h3>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                acceptedTypes={['application/pdf']}
                maxSize={100}
                maxFiles={maxFiles}
                disabled={isProcessing}
              />
              {!isPro && (
                <p className="text-sm text-gray-500 mt-2">
                  무료 버전은 최대 3개 파일만 처리할 수 있습니다. 
                  <button 
                    onClick={() => setIsProModalOpen(true)}
                    className="text-primary-600 hover:text-primary-700 ml-1 underline"
                  >
                    Pro로 업그레이드
                  </button>
                </p>
              )}
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ArrowUpDown className="w-5 h-5 mr-2" />
                  파일 순서
                </h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-red-500 mr-3" />
                        <span className="text-gray-900">{file.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => moveFile(index, 'up')}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => moveFile(index, 'down')}
                          disabled={index === files.length - 1}
                        >
                          ↓
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                <Button 
                  className="w-full" 
                  onClick={handleProcess}
                  disabled={files.length === 0 || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      병합 중...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      병합 시작
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
        trigger="pdf-merge"
      />
      </div>
    </>
  )
}