'use client'

import Link from 'next/link'
import { Image, FileText, Download, Zap, TrendingUp, QrCode } from 'lucide-react'
import { motion } from 'framer-motion'

const tools = [
  {
    id: 'image-resize',
    title: '이미지 리사이즈',
    description: '이미지 크기를 조정하고 품질을 최적화하세요',
    icon: Image,
    href: '/tools/image-resize',
    color: 'from-purple-500 to-pink-500',
    features: ['JPEG, PNG, WebP 지원', '품질 조절', '종횡비 유지']
  },
  {
    id: 'heic-to-jpg',
    title: 'HEIC → JPG 변환',
    description: 'iPhone 사진을 널리 호환되는 JPG로 변환',
    icon: Download,
    href: '/tools/heic-to-jpg',
    color: 'from-blue-500 to-cyan-500',
    features: ['고품질 변환', '빠른 처리', '메타데이터 보존']
  },
  {
    id: 'pdf-merge',
    title: 'PDF 병합',
    description: '여러 PDF 파일을 하나로 병합하여 관리',
    icon: FileText,
    href: '/tools/pdf-merge',
    color: 'from-red-500 to-orange-500',
    features: ['순서 조정', '빠른 병합', '고품질 출력']
  },
  {
    id: 'webp-to-jpg',
    title: 'WebP → JPG 변환',
    description: 'Google WebP를 호환성 높은 JPG로 변환',
    icon: Zap,
    href: '/tools/webp-to-jpg',
    color: 'from-green-500 to-emerald-500',
    features: ['호환성 향상', '압축 최적화', '메타데이터 보존']
  },
  {
    id: 'qr-generator',
    title: 'QR 코드 생성',
    description: '텍스트, URL, 연락처를 QR 코드로 변환',
    icon: QrCode,
    href: '/tools/qr-generator',
    color: 'from-indigo-500 to-purple-500',
    features: ['다양한 형식 지원', '커스텀 디자인', '고해상도 출력']
  },
  {
    id: 'us-stock-calculator',
    title: '미국주식 계산기',
    description: '복리 투자 수익률과 양도수익세를 계산하세요',
    icon: TrendingUp,
    href: '/tools/us-stock-calculator',
    color: 'from-emerald-500 to-teal-500',
    features: ['복리 계산', '양도수익세 계산', '실시간 주식 데이터']
  }
]

export default function UtilityGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            다양한 유틸리티 도구
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            이미지, PDF, 문서 변환과 투자 계산을 위한 전문 도구들을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={tool.href}>
                <div className="card hover:shadow-lg transition-all duration-300 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  
                  <ul className="space-y-1">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                    사용하기 →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
