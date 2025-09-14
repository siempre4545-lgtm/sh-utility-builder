'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useProStatus, ProStatus } from '@/lib/useProStatus'

const ProStatusContext = createContext<ProStatus | null>(null)

interface ProStatusProviderProps {
  children: ReactNode
}

export function ProStatusProvider({ children }: ProStatusProviderProps) {
  const proStatus = useProStatus()

  return (
    <ProStatusContext.Provider value={proStatus}>
      {children}
    </ProStatusContext.Provider>
  )
}

export function useProStatusContext() {
  const context = useContext(ProStatusContext)
  if (!context) {
    throw new Error('useProStatusContext must be used within a ProStatusProvider')
  }
  return context
}
