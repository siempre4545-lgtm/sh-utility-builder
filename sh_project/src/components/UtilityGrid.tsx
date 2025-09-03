'use client';

import Link from 'next/link';
import { 
  Image, 
  FileText, 
  Archive, 
  Video, 
  Music, 
  Code, 
  Database, 
  Globe,
  Crown,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export function UtilityGrid() {
  const categories = [
    {
      name: '이미지 처리',
      icon: Image,
      color: 'from-blue-500 to-purple-600',
      tools: [
        {
          name: '이미지 리사이즈',
          description: '이미지 크기 조정 및 최적화',
          route: '/tools/image-resize',
          isPro: false,
          features: ['다양한 크기 옵션', '품질 조정', '일괄 처리']
        },
        {
          name: '이미지 압축',
          description: '이미지 용량 최적화',
          route: '/tools/image-compress',
          isPro: false,
          features: ['압축률 조정', '원본 품질 유지', '다양한 포맷 지원']
        },
        {
          name: '이미지 변환',
          description: '이미지 포맷 변환',
          route: '/tools/image-convert',
          isPro: true,
          features: ['WebP, AVIF 지원', '배치 처리', '고급 옵션']
        }
      ]
    },
    {
      name: '문서 처리',
      icon: FileText,
      color: 'from-green-500 to-blue-600',
      tools: [
        {
          name: 'PDF 변환',
          description: 'PDF 생성 및 변환',
          route: '/tools/pdf-convert',
          isPro: false,
          features: ['다양한 포맷 지원', '페이지 선택', '워터마크 추가']
        },
        {
          name: 'PDF 압축',
          description: 'PDF 파일 크기 최적화',
          route: '/tools/pdf-compress',
          isPro: false,
          features: ['압축률 조정', '품질 유지', '빠른 처리']
        },
        {
          name: 'PDF 병합/분할',
          description: 'PDF 파일 조작',
          route: '/tools/pdf-manipulate',
          isPro: true,
          features: ['페이지 재정렬', '비밀번호 설정', '고급 편집']
        }
      ]
    },
    {
      name: '압축/압축해제',
      icon: Archive,
      color: 'from-orange-500 to-red-600',
      tools: [
        {
          name: '파일 압축',
          description: '다양한 포맷으로 압축',
          route: '/tools/compress',
          isPro: false,
          features: ['ZIP, RAR, 7Z 지원', '암호 설정', '압축률 조정']
        },
        {
          name: '압축 해제',
          description: '압축 파일 추출',
          route: '/tools/extract',
          isPro: false,
          features: ['모든 포맷 지원', '선택적 추출', '빠른 처리']
        }
      ]
    },
    {
      name: '미디어 처리',
      icon: Video,
      color: 'from-purple-500 to-pink-600',
      tools: [
        {
          name: '비디오 변환',
          description: '비디오 포맷 변환',
          route: '/tools/video-convert',
          isPro: true,
          features: ['다양한 코덱 지원', '해상도 조정', '배치 처리']
        },
        {
          name: '오디오 추출',
          description: '비디오에서 오디오 추출',
          route: '/tools/audio-extract',
          isPro: false,
          features: ['다양한 포맷 지원', '품질 조정', '빠른 처리']
        }
      ]
    },
    {
      name: '개발 도구',
      icon: Code,
      color: 'from-indigo-500 to-purple-600',
      tools: [
        {
          name: 'JSON 포맷터',
          description: 'JSON 코드 정리 및 검증',
          route: '/tools/json-formatter',
          isPro: false,
          features: ['자동 정렬', '구문 검증', '압축/확장']
        },
        {
          name: 'Base64 인코더',
          description: 'Base64 인코딩/디코딩',
          route: '/tools/base64',
          isPro: false,
          features: ['텍스트/파일 지원', '빠른 변환', '다양한 옵션']
        }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* 카테고리 헤더 */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {category.name}
            </h3>
          </div>

          {/* 도구 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map((tool, toolIndex) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (categoryIndex * 0.1) + (toolIndex * 0.1) }}
                viewport={{ once: true }}
              >
                <Link href={tool.route}>
                  <div className="card hover:shadow-soft-lg transition-all duration-300 group cursor-pointer h-full">
                    <div className="card-header pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="card-title text-lg group-hover:text-primary transition-colors">
                              {tool.name}
                            </h4>
                            {tool.isPro && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                <Crown className="w-3 h-3 mr-1" />
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="card-description text-sm">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-content pt-0">
                      <div className="space-y-2">
                        {tool.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="card-footer pt-0">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-gray-500">
                          {tool.isPro ? 'Pro 기능' : '무료'}
                        </span>
                        <div className="flex items-center space-x-1 text-primary group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-medium">시작하기</span>
                          <Zap className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
