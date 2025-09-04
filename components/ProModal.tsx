'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { X, Check, Zap, Shield, Clock, Star } from 'lucide-react'

interface ProModalProps {
  isOpen: boolean
  onClose: () => void
  trigger?: string
}

export default function ProModal({ isOpen, onClose, trigger = 'upgrade' }: ProModalProps) {
  if (!isOpen) return null

  const features = [
    {
      icon: Zap,
      title: '빠른 처리',
      description: '무제한 파일 크기와 빠른 처리 속도'
    },
    {
      icon: Shield,
      title: '고급 보안',
      description: '엔터프라이즈급 보안과 프라이버시 보호'
    },
    {
      icon: Clock,
      title: '24/7 지원',
      description: '우선 고객 지원과 기술 지원'
    },
    {
      icon: Star,
      title: '프리미엄 기능',
      description: '배치 처리, API 접근, 고급 옵션'
    }
  ]

  const plans = [
    {
      name: '월간',
      price: '9,900',
      period: '월',
      popular: false,
      features: ['무제한 파일 크기', '배치 처리', '우선 지원', '고급 옵션']
    },
    {
      name: '연간',
      price: '99,000',
      period: '년',
      popular: true,
      originalPrice: '118,800',
      features: ['무제한 파일 크기', '배치 처리', '우선 지원', '고급 옵션', 'API 접근', '화이트라벨']
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pro 업그레이드</h2>
            <p className="text-gray-600 mt-1">더 많은 기능과 제한 없는 사용을 경험하세요</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-xl p-6 ${
                  plan.popular
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">₩{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-sm text-gray-500 line-through">₩{plan.originalPrice}</span>
                      <span className="text-sm text-green-600 font-medium">17% 할인</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    // 결제 시스템 연동
                    console.log(`결제 시작: ${plan.name} 플랜`)
                  }}
                >
                  {plan.name} 플랜 선택
                </Button>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 방법</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">신용카드</span>
              </div>
              <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">계좌이체</span>
              </div>
              <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">간편결제</span>
              </div>
              <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">PayPal</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">안전한 결제</h4>
                <p className="text-sm text-gray-600">
                  모든 결제는 SSL 암호화로 보호되며, 언제든지 취소할 수 있습니다. 
                  개인정보는 안전하게 보호됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
