/**
 * 모바일 기기 감지 유틸리티
 */

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    'android', 'iphone', 'ipad', 'ipod', 'blackberry', 
    'windows phone', 'mobile', 'webos', 'opera mini'
  ]
  
  return mobileKeywords.some(keyword => userAgent.includes(keyword))
}

export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('android')
}

/**
 * 개별 파일 다운로드 (모바일 최적화)
 */
export const downloadFile = (file: File, filename?: string): void => {
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || file.name
  link.style.display = 'none'
  
  // iOS/Android 최적화: 다운로드 속성 설정
  if (isIOS() || isAndroid()) {
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
  }
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // 메모리 정리
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * 여러 파일을 개별적으로 다운로드 (모바일용)
 */
export const downloadMultipleFiles = async (files: File[], delay: number = 500): Promise<void> => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    // 파일명은 이미 리사이즈 페이지에서 적절히 설정됨
    downloadFile(file, file.name)
    
    // iOS/Android 최적화: 다운로드 간격 조정
    const optimizedDelay = isIOS() ? 800 : isAndroid() ? 600 : delay
    if (i < files.length - 1) {
      await new Promise(resolve => setTimeout(resolve, optimizedDelay))
    }
  }
}

/**
 * 브라우저에서 이미지 미리보기 (모바일용)
 */
export const previewImage = (file: File): void => {
  const url = URL.createObjectURL(file)
  const newWindow = window.open(url, '_blank')
  
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>이미지 미리보기</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 20px; background: #f5f5f5; }
            img { max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .download-btn { 
              position: fixed; bottom: 20px; right: 20px; 
              background: #007bff; color: white; padding: 12px 24px; 
              border: none; border-radius: 25px; cursor: pointer;
              font-size: 16px; box-shadow: 0 2px 8px rgba(0,123,255,0.3);
            }
          </style>
        </head>
        <body>
          <img src="${url}" alt="미리보기" />
          <button class="download-btn" onclick="window.open('${url}', '_blank')">다운로드</button>
        </body>
      </html>
    `)
  }
}
