'use client'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
import { Button } from '@/components/ui/Button'
import { QrCode, Download, Loader2, Copy, Check, Lock } from 'lucide-react'
import ProModal from '@/components/ProModal'
import { toast } from 'sonner'
import Head from 'next/head'
import { useProStatusContext } from '@/components/ProStatusProvider'
import UsageCounter from '@/components/UsageCounter'
import { getConversionCount, incrementConversionCount } from '@/lib/conversionCount'
import { useEffect, useState } from 'react'

export default function QrGeneratorPage() {
  const { isPro } = useProStatusContext()
  const [text, setText] = useState('')
  const [size, setSize] = useState(256)
  const [format, setFormat] = useState('png')
  const [qrCodeData, setQrCodeData] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  // 무료 사용자 제한: 하루 최대 5개 QR 코드 생성
  const maxDailyGenerations = isPro ? Infinity : 5
  const [dailyCount, setDailyCount] = useState(0)
  const [remainingGenerations, setRemainingGenerations] = useState(maxDailyGenerations)

  // 클라이언트에서 변환 카운트 로드
  useEffect(() => {
    const count = getConversionCount('qr-generator')
    setDailyCount(count)
    setRemainingGenerations(maxDailyGenerations - count)
  }, [maxDailyGenerations])

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('QR 코드로 변환할 텍스트를 입력해주세요.')
      return
    }

    // 무료 사용자 제한 확인
    if (!isPro && dailyCount >= maxDailyGenerations) {
      toast.error(`무료 버전은 하루에 최대 ${maxDailyGenerations}개 QR 코드만 생성할 수 있습니다. Pro로 업그레이드하세요.`)
      setIsProModalOpen(true)
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/qr-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, size, format }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'QR 코드 생성 중 오류가 발생했습니다.')
      }

      const result = await response.json()
      setQrCodeData(result.data)
      
      // 무료 사용자 카운트 증가
      if (!isPro) {
        incrementConversionCount('qr-generator', 1)
        const newCount = getConversionCount('qr-generator')
        setDailyCount(newCount)
        setRemainingGenerations(maxDailyGenerations - newCount)
      }
      
      toast.success('QR 코드가 생성되었습니다!')
    } catch (error) {
      console.error('QR 코드 생성 오류:', error)
      toast.error(error instanceof Error ? error.message : 'QR 코드 생성 중 오류가 발생했습니다.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!qrCodeData) return

    const link = document.createElement('a')
    link.href = qrCodeData
    link.download = `qrcode_${Date.now()}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('QR 코드가 다운로드되었습니다!')
  }

  const handleCopy = async () => {
    if (!qrCodeData) return

    try {
      await navigator.clipboard.writeText(qrCodeData)
      setCopied(true)
      toast.success('QR 코드가 클립보드에 복사되었습니다!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('복사에 실패했습니다.')
    }
  }

  return (
    <>
      <Head>
        <title>무료 QR 코드 생성기 - 텍스트, URL을 QR 코드로 변환 | SH Tools</title>
        <meta name="description" content="무료로 QR 코드를 생성하세요. 텍스트, URL, 연락처를 QR 코드로 변환. 커스텀 디자인, 고해상도 출력. 온라인 QR 코드 생성 도구." />
        <meta name="keywords" content="QR 코드 생성, 무료 QR 코드, QR 코드 생성기, 온라인 QR 코드, QR 코드 만들기, 텍스트 QR 코드, URL QR 코드" />
        <meta property="og:title" content="무료 QR 코드 생성기 - 텍스트, URL을 QR 코드로 변환" />
        <meta property="og:description" content="무료로 QR 코드를 생성하세요. 텍스트, URL, 연락처를 QR 코드로 변환. 커스텀 디자인, 고해상도 출력." />
        <meta property="og:url" content="https://sh-utility-builder-dn13.vercel.app/tools/qr-generator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="무료 QR 코드 생성기" />
        <meta name="twitter:description" content="무료로 QR 코드를 생성하세요. 텍스트, URL, 연락처를 QR 코드로 변환. 커스텀 디자인, 고해상도 출력." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QR 코드 생성기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            텍스트, URL, 연락처를 QR 코드로 변환하세요. 
            커스텀 디자인과 고해상도 출력을 지원합니다.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Area */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                <span>QR 코드 설정</span>
                <UsageCounter 
                  remaining={remainingGenerations} 
                  max={maxDailyGenerations} 
                  isPro={isPro} 
                  type="generations" 
                />
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    텍스트 또는 URL
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="input-field h-24 resize-none"
                    placeholder="QR 코드로 변환할 텍스트, URL, 연락처 등을 입력하세요..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      크기 (픽셀)
                    </label>
                    <select
                      value={size}
                      onChange={(e) => setSize(parseInt(e.target.value))}
                      className="input-field"
                    >
                      <option value={128}>128px (작음)</option>
                      <option value={256}>256px (보통)</option>
                      <option value={512}>512px (큼)</option>
                      <option value={1024}>1024px (매우 큼)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      형식
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="input-field"
                    >
                      <option value="png">PNG</option>
                      <option value="svg">SVG</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!text.trim() || isGenerating || (!isPro && dailyCount >= maxDailyGenerations)}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 mr-2" />
                      QR 코드 생성
                    </>
                  )}
                </Button>
                
                {!isPro && (
                  <p className="text-sm text-gray-500 mt-2">
                    무료 버전은 하루에 최대 {maxDailyGenerations}개 QR 코드만 생성할 수 있습니다. 
                    <button 
                      onClick={() => setIsProModalOpen(true)}
                      className="text-primary-600 hover:text-primary-700 ml-1 underline"
                    >
                      Pro로 업그레이드
                    </button>
                  </p>
                )}
              </div>
            </div>

            {/* QR Code Display */}
            {qrCodeData && (
              <div className="card mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  생성된 QR 코드
                </h3>
                <div className="text-center">
                  <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
                    {format === 'svg' ? (
                      <div dangerouslySetInnerHTML={{ __html: qrCodeData }} />
                    ) : (
                      <img src={qrCodeData} alt="Generated QR Code" className="max-w-full h-auto" />
                    )}
                  </div>
                  <div className="flex justify-center gap-3 mt-4">
                    <Button onClick={handleDownload} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      다운로드
                    </Button>
                    <Button onClick={handleCopy} variant="outline">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          복사됨
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          복사
                        </>
                      )}
                    </Button>
                  </div>
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
                  <span className="text-gray-600">텍스트/URL 지원</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">커스텀 크기</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">PNG/SVG 형식</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-600">고해상도 출력</span>
                </li>
              </ul>
            </div>

            {/* Pro Upgrade */}
            <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pro 업그레이드
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                일괄 생성, 커스텀 디자인, 로고 삽입
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
        trigger="qr-generator"
      />
      </div>
    </>
  )
}
