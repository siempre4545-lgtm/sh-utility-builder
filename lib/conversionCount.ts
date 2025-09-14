// 변환 카운트 관리 유틸리티
const CONVERSION_COUNT_KEY = 'sh_tools_conversion_count'
const LAST_RESET_KEY = 'sh_tools_last_reset'

interface ConversionCount {
  [toolName: string]: number
}

// 오늘 날짜를 YYYY-MM-DD 형식으로 반환
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

// 마지막 리셋 날짜 확인 및 필요시 카운트 초기화
function checkAndResetIfNeeded(): ConversionCount {
  const today = getTodayString()
  const lastReset = localStorage.getItem(LAST_RESET_KEY)
  
  if (lastReset !== today) {
    // 날짜가 바뀌었으면 카운트 초기화
    localStorage.setItem(CONVERSION_COUNT_KEY, '{}')
    localStorage.setItem(LAST_RESET_KEY, today)
    return {}
  }
  
  // 기존 카운트 로드
  const stored = localStorage.getItem(CONVERSION_COUNT_KEY)
  return stored ? JSON.parse(stored) : {}
}

// 특정 도구의 변환 카운트 가져오기
export function getConversionCount(toolName: string): number {
  const counts = checkAndResetIfNeeded()
  return counts[toolName] || 0
}

// 특정 도구의 변환 카운트 증가
export function incrementConversionCount(toolName: string, amount: number = 1): void {
  const counts = checkAndResetIfNeeded()
  counts[toolName] = (counts[toolName] || 0) + amount
  localStorage.setItem(CONVERSION_COUNT_KEY, JSON.stringify(counts))
}

// 특정 도구의 변환 카운트 설정
export function setConversionCount(toolName: string, count: number): void {
  const counts = checkAndResetIfNeeded()
  counts[toolName] = count
  localStorage.setItem(CONVERSION_COUNT_KEY, JSON.stringify(counts))
}

// 모든 변환 카운트 초기화 (테스트용)
export function resetAllConversionCounts(): void {
  localStorage.removeItem(CONVERSION_COUNT_KEY)
  localStorage.removeItem(LAST_RESET_KEY)
}

// 특정 도구의 변환 카운트 초기화
export function resetConversionCount(toolName: string): void {
  const counts = checkAndResetIfNeeded()
  delete counts[toolName]
  localStorage.setItem(CONVERSION_COUNT_KEY, JSON.stringify(counts))
}
