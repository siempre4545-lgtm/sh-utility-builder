'use client'

import { useProStatusContext } from './ProStatusProvider'

export default function Watermark() {
  const { isPro, isLoading } = useProStatusContext()

  // 로딩 중이거나 Pro 사용자인 경우 워터마크 숨김
  if (isLoading || isPro) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">
            SH Tools
          </span>
        </div>
      </div>
    </div>
  )
}
