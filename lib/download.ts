/**
 * 파일 다운로드 유틸리티 함수들
 */

export interface DownloadOptions {
  filename?: string
  showToast?: boolean
  trackEvent?: boolean
  toolName?: string
}

/**
 * Blob을 파일로 다운로드
 */
export const downloadBlob = async (
  blob: Blob, 
  options: DownloadOptions = {}
) => {
  const {
    filename = `download_${Date.now()}`,
    showToast = true,
    trackEvent = true,
    toolName = 'unknown'
  } = options

  try {
    // Blob URL 생성
    const url = window.URL.createObjectURL(blob)
    
    // 다운로드 링크 생성
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.style.display = 'none'
    
    // DOM에 추가하고 클릭
    document.body.appendChild(a)
    a.click()
    
    // 정리
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    // 성공 토스트 표시
    if (showToast) {
      const { toast } = await import('sonner')
      toast.success('파일 다운로드가 시작되었습니다!')
    }

    // 이벤트 추적
    if (trackEvent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'file_download', {
        tool_name: toolName,
        file_size_mb: Math.round(blob.size / 1024 / 1024),
        event_category: 'file_processing',
      })
    }

    return true
  } catch (error) {
    console.error('다운로드 오류:', error)
    
    if (showToast) {
      const { toast } = await import('sonner')
      toast.error('다운로드 중 오류가 발생했습니다.')
    }
    
    return false
  }
}

/**
 * API 응답을 처리하고 자동 다운로드
 */
export const handleApiDownload = async (
  response: Response,
  options: DownloadOptions = {}
) => {
  const {
    filename = `converted_${Date.now()}.zip`,
    showToast = true,
    trackEvent = true,
    toolName = 'unknown'
  } = options

  if (!response.ok) {
    throw new Error('서버 응답 오류')
  }

  const blob = await response.blob()
  return downloadBlob(blob, {
    filename,
    showToast,
    trackEvent,
    toolName
  })
}

/**
 * 다운로드 진행률 표시 (큰 파일용)
 */
export const downloadWithProgress = async (
  response: Response,
  options: DownloadOptions & { onProgress?: (progress: number) => void } = {}
) => {
  const {
    filename = `download_${Date.now()}`,
    showToast = true,
    trackEvent = true,
    toolName = 'unknown',
    onProgress
  } = options

  if (!response.ok) {
    throw new Error('서버 응답 오류')
  }

  const contentLength = response.headers.get('content-length')
  const total = contentLength ? parseInt(contentLength, 10) : 0
  
  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('응답 스트림을 읽을 수 없습니다')
  }

  const chunks: BlobPart[] = []
  let received = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      
      if (done) break
      
      chunks.push(value)
      received += value.length
      
      if (total > 0 && onProgress) {
        const progress = (received / total) * 100
        onProgress(progress)
      }
    }

    // Blob 생성
    const blob = new Blob(chunks)
    return downloadBlob(blob, {
      filename,
      showToast,
      trackEvent,
      toolName
    })
  } finally {
    reader.releaseLock()
  }
}

/**
 * 다운로드 링크 생성 (새 탭에서 열기)
 */
export const createDownloadLink = (blob: Blob, filename: string): string => {
  const url = window.URL.createObjectURL(blob)
  return url
}

/**
 * 다운로드 링크 정리
 */
export const revokeDownloadLink = (url: string): void => {
  window.URL.revokeObjectURL(url)
}
