'use client'

import { Lock, AlertTriangle } from 'lucide-react'

interface UsageCounterProps {
  current: number
  max: number
  isPro: boolean
  type: 'files' | 'generations' | 'entries'
}

export default function UsageCounter({ current, max, isPro, type }: UsageCounterProps) {
  const isNearLimit = !isPro && current >= max * 0.8 // 80% 이상 사용 시
  const isOverLimit = !isPro && current >= max
  const isUnlimited = isPro || max === Infinity

  const getTypeText = () => {
    switch (type) {
      case 'files':
        return '파일'
      case 'generations':
        return '생성'
      case 'entries':
        return '항목'
      default:
        return '사용'
    }
  }

  const getDisplayText = () => {
    if (isUnlimited) {
      return '무제한'
    }
    return `${current}/${max}`
  }

  const getTextColor = () => {
    if (isOverLimit) {
      return 'text-red-600'
    }
    if (isNearLimit) {
      return 'text-orange-600'
    }
    return 'text-gray-600'
  }

  const getBgColor = () => {
    if (isOverLimit) {
      return 'bg-red-100 border-red-200'
    }
    if (isNearLimit) {
      return 'bg-orange-100 border-orange-200'
    }
    return 'bg-gray-100 border-gray-200'
  }

  const getIcon = () => {
    if (isOverLimit) {
      return <AlertTriangle className="w-3 h-3" />
    }
    if (!isPro) {
      return <Lock className="w-3 h-3" />
    }
    return null
  }

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBgColor()}`}>
      {getIcon() && (
        <span className="mr-1">
          {getIcon()}
        </span>
      )}
      <span className={getTextColor()}>
        {getDisplayText()} {getTypeText()}
      </span>
    </div>
  )
}
