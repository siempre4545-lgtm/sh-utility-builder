'use client'

import { useState, useEffect } from 'react'

export interface ProStatus {
  isPro: boolean
  isLoading: boolean
  planType?: 'monthly' | 'yearly'
  expiresAt?: string
}

export function useProStatus(): ProStatus {
  const [isPro, setIsPro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [planType, setPlanType] = useState<'monthly' | 'yearly' | undefined>()
  const [expiresAt, setExpiresAt] = useState<string | undefined>()

  useEffect(() => {
    // 실제 구현에서는 서버에서 구독 상태를 확인해야 함
    // 현재는 로컬 스토리지에서 Pro 상태를 확인
    const checkProStatus = () => {
      try {
        const proStatus = localStorage.getItem('sh-tools-pro-status')
        if (proStatus) {
          const status = JSON.parse(proStatus)
          setIsPro(status.isPro || false)
          setPlanType(status.planType)
          setExpiresAt(status.expiresAt)
        } else {
          setIsPro(false)
        }
      } catch (error) {
        console.error('Pro 상태 확인 오류:', error)
        setIsPro(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkProStatus()

    // Pro 상태 변경 이벤트 리스너
    const handleProStatusChange = (event: StorageEvent) => {
      if (event.key === 'sh-tools-pro-status') {
        checkProStatus()
      }
    }

    window.addEventListener('storage', handleProStatusChange)
    
    return () => {
      window.removeEventListener('storage', handleProStatusChange)
    }
  }, [])

  return {
    isPro,
    isLoading,
    planType,
    expiresAt
  }
}

// Pro 상태 설정 함수
export function setProStatus(status: {
  isPro: boolean
  planType?: 'monthly' | 'yearly'
  expiresAt?: string
}) {
  try {
    localStorage.setItem('sh-tools-pro-status', JSON.stringify(status))
    // 다른 탭에 상태 변경 알림
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'sh-tools-pro-status',
      newValue: JSON.stringify(status)
    }))
  } catch (error) {
    console.error('Pro 상태 설정 오류:', error)
  }
}

// Pro 상태 초기화 함수
export function clearProStatus() {
  try {
    localStorage.removeItem('sh-tools-pro-status')
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'sh-tools-pro-status',
      newValue: null
    }))
  } catch (error) {
    console.error('Pro 상태 초기화 오류:', error)
  }
}
