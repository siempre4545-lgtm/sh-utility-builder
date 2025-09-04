'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Video, Download, Upload, Loader2, Clock, Type } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'

interface SubtitleEntry {
  id: number
  startTime: string
  endTime: string
  text: string
}

export default function SrtEditorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [subtitles, setSubtitles] = useState<SubtitleEntry[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      parseSrtFile(files[0])
    }
  }

  const parseSrtFile = async (file: File) => {
    setIsProcessing(true)
    try {
      const text = await file.text()
      const entries: SubtitleEntry[] = []
      
      const blocks = text.split('\n\n').filter(block => block.trim())
      
      blocks.forEach(block => {
        const lines = block.trim().split('\n')
        if (lines.length >= 3) {
          const id = parseInt(lines[0])
          const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/)
          
          if (timeMatch) {
            entries.push({
              id,
              startTime: timeMatch[1],
              endTime: timeMatch[2],
              text: lines.slice(2).join('\n')
            })
          }
        }
      })
      
      setSubtitles(entries)
      toast.success('SRT 파일이 로드되었습니다!')
    } catch (error) {
      toast.error('SRT 파일을 읽는 중 오류가 발생했습니다.')
    } finally {
      setIsProcessing(false)
    }
  }

  const updateSubtitle = (index: number, field: keyof SubtitleEntry, value: string) => {
    const newSubtitles = [...subtitles]
    newSubtitles[index] = { ...newSubtitles[index], [field]: value }
    setSubtitles(newSubtitles)
  }

  const adjustTime = (index: number, field: 'startTime' | 'endTime', seconds: number) => {
    const subtitle = subtitles[index]
    const timeStr = subtitle[field]
    const [time, ms] = timeStr.split(',')
    const [hours, minutes, secs] = time.split(':').map(Number)
    
    let totalSeconds = hours * 3600 + minutes * 60 + secs + seconds
    if (totalSeconds < 0) totalSeconds = 0
    
    const newHours = Math.floor(totalSeconds / 3600)
    const newMinutes = Math.floor((totalSeconds % 3600) / 60)
    const newSecs = totalSeconds % 60
    
    const newTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')},${ms}`
    updateSubtitle(index, field, newTime)
  }

  const exportSrt = () => {
    let srtContent = ''
    subtitles.forEach(subtitle => {
      srtContent += `${subtitle.id}\n`
      srtContent += `${subtitle.startTime} --> ${subtitle.endTime}\n`
      srtContent += `${subtitle.text}\n\n`
    })
    
    const blob = new Blob([srtContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `edited_subtitles_${Date.now()}.srt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('SRT 파일이 다운로드되었습니다!')
  }

  return (
    <>
      <Head>
        <title>무료 SRT 자막 편집기 - 자막 파일 편집 및 시간 조정 | SH Tools</title>
        <meta name="description" content="무료로 SRT 자막 파일을 편집하세요. 시간 조정, 텍스트 편집, 번역 지원. 자막 파일을 쉽고 빠르게 편집하는 온라인 도구." />
        <meta name="keywords" content="SRT 자막 편집, 자막 편집기, SRT 편집, 자막 시간 조정, 자막 텍스트 편집, 온라인 자막 편집, 무료 자막 편집" />
        <meta property="og:title" content="무료 SRT 자막 편집기 - 자막 파일 편집 및 시간 조정" />
        <meta property="og:description" content="무료로 SRT 자막 파일을 편집하세요. 시간 조정, 텍스트 편집, 번역 지원." />
        <meta property="og:url" content="https://sh-utility-builder-dn13.vercel.app/tools/srt-editor" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="무료 SRT 자막 편집기" />
        <meta name="twitter:description" content="무료로 SRT 자막 파일을 편집하세요. 시간 조정, 텍스트 편집, 번역 지원." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SRT 자막 편집기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            자막 파일을 편집하고 시간을 조정하세요. 
            번역 지원과 자동 시간 동기화를 제공합니다.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                파일 업로드
              </h3>
              <FileUpload
                onFilesSelected={handleFileSelected}
                acceptedTypes={['text/plain', '.srt']}
                maxSize={5}
                maxFiles={1}
                disabled={isProcessing}
              />
            </div>

            {/* Tools */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                편집 도구
              </h3>
              <div className="space-y-3">
                <Button 
                  onClick={exportSrt}
                  disabled={subtitles.length === 0}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  SRT 내보내기
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsProModalOpen(true)}
                  className="w-full"
                >
                  번역 기능 (Pro)
                </Button>
              </div>
            </div>

            {/* Pro Upgrade */}
            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pro 업그레이드
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                자동 번역, 시간 동기화, 배치 처리
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

          {/* Editor Area */}
          <div className="lg:col-span-3">
            {subtitles.length > 0 ? (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  자막 편집 ({subtitles.length}개 항목)
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {subtitles.map((subtitle, index) => (
                    <div key={subtitle.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-500">
                          #{subtitle.id}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => adjustTime(index, 'startTime', -1)}
                          >
                            -1s
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => adjustTime(index, 'startTime', 1)}
                          >
                            +1s
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            시작 시간
                          </label>
                          <input
                            type="text"
                            value={subtitle.startTime}
                            onChange={(e) => updateSubtitle(index, 'startTime', e.target.value)}
                            className="input-field text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            종료 시간
                          </label>
                          <input
                            type="text"
                            value={subtitle.endTime}
                            onChange={(e) => updateSubtitle(index, 'endTime', e.target.value)}
                            className="input-field text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          자막 텍스트
                        </label>
                        <textarea
                          value={subtitle.text}
                          onChange={(e) => updateSubtitle(index, 'text', e.target.value)}
                          className="input-field text-sm h-16 resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  SRT 파일을 업로드하세요
                </h3>
                <p className="text-gray-600">
                  자막 파일을 업로드하면 편집할 수 있습니다.
                </p>
              </div>
            )}
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
        trigger="srt-editor"
      />
      </div>
    </>
  )
}
