'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatFileSize, validateFileType, validateFileSize } from '@/lib/utils'
import { trackFileUpload, trackUserAction, trackError } from '@/components/GoogleAnalytics'

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void
  acceptedTypes: string[]
  maxSize: number // MB
  maxFiles?: number
  disabled?: boolean
  toolName?: string // GA4 추적용
}

export default function FileUpload({
  onFilesSelected,
  acceptedTypes,
  maxSize,
  maxFiles = 10,
  disabled = false,
  toolName = 'unknown'
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setErrors([])
    
    // 파일 검증
    const validFiles: File[] = []
    const newErrors: string[] = []

    // 허용된 파일들 처리
    acceptedFiles.forEach(file => {
      if (validateFileSize(file, maxSize)) {
        validFiles.push(file)
      } else {
        newErrors.push(`${file.name}: 파일 크기가 ${maxSize}MB를 초과합니다.`)
      }
    })

    // 거부된 파일들 처리
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((error: any) => {
        if (error.code === 'file-too-large') {
          newErrors.push(`${file.name}: 파일 크기가 너무 큽니다.`)
        } else if (error.code === 'file-invalid-type') {
          newErrors.push(`${file.name}: 지원하지 않는 파일 형식입니다.`)
        } else {
          newErrors.push(`${file.name}: ${error.message}`)
        }
      })
    })

    // 최대 파일 수 확인
    if (validFiles.length > maxFiles) {
      newErrors.push(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`)
      validFiles.splice(maxFiles)
    }

    setFiles(validFiles)
    setErrors(newErrors)
    onFilesSelected(validFiles)
    
    // GA4 이벤트 추적
    if (validFiles.length > 0) {
      const totalSize = validFiles.reduce((sum, file) => sum + file.size, 0)
      const fileTypes = validFiles.map(file => file.type)
      trackFileUpload(toolName, validFiles.length, totalSize, fileTypes)
      trackUserAction('file_upload_success', toolName, {
        fileCount: validFiles.length,
        totalSize: totalSize,
        fileTypes: fileTypes
      })
    }

    // 에러 이벤트 추적
    if (newErrors.length > 0) {
      newErrors.forEach(error => {
        trackError('file_validation_error', toolName, error)
      })
    }
  }, [maxSize, maxFiles, onFilesSelected, toolName])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize: maxSize * 1024 * 1024,
    maxFiles,
    disabled
  })

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onFilesSelected(newFiles)
  }

  return (
    <div className="space-y-4">
      {/* 업로드 영역 */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isDragActive ? '파일을 여기에 놓으세요' : '파일을 드래그하거나 클릭하여 선택하세요'}
        </h3>
        <p className="text-gray-600 mb-4">
          지원 형식: {acceptedTypes.join(', ')}
        </p>
        <p className="text-sm text-gray-500">
          최대 파일 크기: {maxSize}MB, 최대 {maxFiles}개 파일
        </p>
      </div>

      {/* 에러 메시지 */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-red-800 mb-2">오류가 발생했습니다:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 업로드된 파일 목록 */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">업로드된 파일:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <File className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
