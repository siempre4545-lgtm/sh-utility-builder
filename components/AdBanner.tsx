'use client'

import { useState } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { trackAdClick } from '@/components/GoogleAnalytics'

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar'
  size?: 'small' | 'medium' | 'large'
}

export default function AdBanner({ position, size = 'medium' }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-32'
      case 'large':
        return 'h-64'
      default:
        return 'h-48'
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'mb-6'
      case 'bottom':
        return 'mt-6'
      case 'sidebar':
        return 'mb-6'
      default:
        return 'mb-6'
    }
  }

  return (
    <div className={`relative ${getPositionClasses()}`}>
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-10 p-1 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Ad Container - AdSense 자동광고와 충돌 방지 */}
      <div 
        className={`w-full ${getSizeClasses()} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden cursor-pointer hover:border-primary-400 transition-colors ad-manual adsense-exclude exclude-adsense`}
        onClick={() => trackAdClick(position)}
        data-ad-slot={position === 'top' ? 'top-banner' : position === 'bottom' ? 'bottom-banner' : 'sidebar-banner'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      >
        {/* Ad Content Placeholder */}
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            광고 영역
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Google AdSense 또는 기타 광고 네트워크
          </p>
          <div className="text-xs text-gray-400">
            {position === 'top' && '상단 배너 (728x90)'}
            {position === 'bottom' && '하단 배너 (728x90)'}
            {position === 'sidebar' && '사이드바 배너 (300x250)'}
          </div>
        </div>

        {/* Ad Overlay for Development */}
        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              개발 모드 - 광고 영역
            </span>
          </div>
        </div>
      </div>

      {/* Ad Label */}
      <div className="text-xs text-gray-400 text-center mt-2">
        광고
      </div>
    </div>
  )
}
