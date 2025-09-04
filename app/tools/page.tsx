import type { Metadata } from 'next'
import Link from 'next/link'
import { Image, FileText, Download, Zap, QrCode, Languages, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: '모든 도구 - SH Tools | 파일 변환 도구 모음',
  description: '이미지 리사이즈, PDF 병합, HEIC 변환, WebP 변환, QR 코드 생성 등 다양한 파일 변환 도구를 한 곳에서 사용하세요.',
  keywords: '파일 변환, 이미지 리사이즈, PDF 병합, HEIC 변환, WebP 변환, QR 코드, 온라인 도구',
  openGraph: {
    title: '모든 도구 - SH Tools',
    description: '이미지 리사이즈, PDF 병합, HEIC 변환, WebP 변환, QR 코드 생성 등 다양한 파일 변환 도구를 한 곳에서 사용하세요.',
    url: 'https://sh-utility-builder-dn13.vercel.app/tools',
    type: 'website',
  },
}

const tools = [
  {
    id: 'image-resize',
    title: '이미지 리사이즈',
    description: 'JPEG, PNG, WebP 이미지 크기를 조정하고 품질을 최적화하세요',
    icon: Image,
    href: '/tools/image-resize',
    color: 'from-purple-500 to-pink-500',
    features: ['JPEG, PNG, WebP 지원', '품질 조절', '종횡비 유지'],
    category: '이미지'
  },
  {
    id: 'heic-to-jpg',
    title: 'HEIC → JPG 변환',
    description: 'iPhone HEIC 사진을 널리 호환되는 JPG로 변환',
    icon: Download,
    href: '/tools/heic-to-jpg',
    color: 'from-blue-500 to-cyan-500',
    features: ['고품질 변환', '빠른 처리', '메타데이터 보존'],
    category: '이미지'
  },
  {
    id: 'webp-to-jpg',
    title: 'WebP → JPG 변환',
    description: 'Google WebP를 호환성 높은 JPG로 변환',
    icon: Zap,
    href: '/tools/webp-to-jpg',
    color: 'from-green-500 to-emerald-500',
    features: ['호환성 향상', '압축 최적화', '메타데이터 보존'],
    category: '이미지'
  },
  {
    id: 'pdf-merge',
    title: 'PDF 병합',
    description: '여러 PDF 파일을 하나로 병합하여 관리',
    icon: FileText,
    href: '/tools/pdf-merge',
    color: 'from-red-500 to-orange-500',
    features: ['순서 조정', '빠른 병합', '고품질 출력'],
    category: '문서'
  },
  {
    id: 'qr-generator',
    title: 'QR 코드 생성',
    description: '텍스트, URL, 연락처를 QR 코드로 변환',
    icon: QrCode,
    href: '/tools/qr-generator',
    color: 'from-indigo-500 to-purple-500',
    features: ['텍스트/URL 지원', '커스텀 디자인', '고해상도 출력'],
    category: '생성'
  },
  {
    id: 'srt-editor',
    title: 'SRT 자막 편집',
    description: '자막 파일을 편집하고 시간을 조정하세요',
    icon: Video,
    href: '/tools/srt-editor',
    color: 'from-teal-500 to-cyan-500',
    features: ['시간 조정', '텍스트 편집', '번역 지원'],
    category: '미디어'
  }
]

const categories = ['전체', '이미지', '문서', '생성', '미디어']

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            모든 도구
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            이미지, PDF, 문서 변환을 위한 전문 도구들을 만나보세요
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary-100 hover:text-primary-700"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <Link key={tool.id} href={tool.href}>
              <div className="card hover:shadow-lg transition-all duration-300 h-full group">
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {tool.title}
                  </h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                
                <ul className="space-y-1 mb-4">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                  사용하기 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            href="/" 
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  )
}
