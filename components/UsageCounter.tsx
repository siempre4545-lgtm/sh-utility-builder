'use client'

import { Lock, AlertTriangle } from 'lucide-react'

interface UsageCounterProps {
  remaining: number
  max: number
  isPro: boolean
  type: 'files' | 'generations' | 'entries'
}

export default function UsageCounter({ remaining, max, isPro, type }: UsageCounterProps) {
  const isNearLimit = !isPro && remaining <= max * 0.2 // 20% 이하 남음
  const isOverLimit = !isPro && remaining <= 0
  const isUnlimited = isPro || max === Infinity

  const getTypeText = () => {
    switch (type) {
      case 'files':
        return '변환 가능'
      case 'generations':
        return '생성 가능'
      case 'entries':
        return '처리 가능'
      default:
        return '사용 가능'
    }
  }

  const getDisplayText = () => {
    if (isUnlimited) {
      return '무제한'
    }
    return `${remaining}개 남음`
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
