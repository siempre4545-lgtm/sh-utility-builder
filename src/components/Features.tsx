'use client';

import { 
  Zap, 
  Shield, 
  Clock, 
  Smartphone, 
  Globe, 
  Lock,
  BarChart3,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: '초고속 처리',
      description: '모든 작업이 2초 이내에 완료되며, 즉시 피드백을 제공합니다.',
      details: [
        '비동기 처리로 UI 블로킹 방지',
        '프로그레스 바로 실시간 진행상황 표시',
        '캐싱 시스템으로 반복 작업 최적화'
      ]
    },
    {
      icon: Shield,
      title: '보안 우선',
      description: '업로드된 파일은 메모리에서만 처리되며 24-48시간 내 자동 삭제됩니다.',
      details: [
        '민감 데이터 자동 처리 금지',
        '암호화된 임시 저장소 사용',
        '정기적인 보안 감사 및 로그 기록'
      ]
    },
    {
      icon: Clock,
      title: '단순함',
      description: '복잡한 설정 없이 업로드→처리→다운로드까지 한 번에 완료합니다.',
      details: [
        '직관적인 드래그 앤 드롭 인터페이스',
        '자동 포맷 감지 및 최적 설정',
        '원클릭 처리 및 일괄 작업 지원'
      ]
    },
    {
      icon: Smartphone,
      title: '반응형 디자인',
      description: '모든 디바이스에서 완벽하게 작동하는 모던한 UI/UX를 제공합니다.',
      details: [
        '모바일 퍼스트 디자인',
        '터치 친화적 인터페이스',
        '오프라인 지원 및 PWA 기능'
      ]
    },
    {
      icon: Globe,
      title: '국제화 지원',
      description: '다국어 지원과 지역별 최적화로 전 세계 사용자를 지원합니다.',
      details: [
        '한국어, 영어, 일본어 등 다국어',
        '지역별 시간대 및 통화 지원',
        '문화적 맥락을 고려한 UI/UX'
      ]
    },
    {
      icon: Lock,
      title: '엄격한 타입 체크',
      description: 'TypeScript의 엄격한 타입 시스템으로 런타임 오류를 사전에 방지합니다.',
      details: [
        '완전한 타입 안전성 보장',
        '자동 완성 및 IntelliSense 지원',
        '컴파일 타임 오류 검출'
      ]
    }
  ];

  const stats = [
    { label: '지원 파일 형식', value: '100+' },
    { label: '최대 파일 크기', value: '100MB' },
    { label: '동시 처리', value: '무제한' },
    { label: '가동률', value: '99.9%' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            왜 <span className="gradient-text">SH Utility Builder</span>를 선택해야 할까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            빠르고 안전하며 사용하기 쉬운 웹 유틸리티를 제공합니다.
            개발자부터 일반 사용자까지 누구나 쉽게 사용할 수 있습니다.
          </p>
        </motion.div>

        {/* 기능 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card h-full hover:shadow-soft-lg transition-all duration-300">
                <div className="card-header">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="card-title text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="card-description">
                    {feature.description}
                  </p>
                </div>
                
                <div className="card-content">
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 통계 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-primary-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              신뢰할 수 있는 성능
            </h3>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              수많은 사용자들이 선택한 SH Utility Builder의 강력한 성능을 확인해보세요.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 추가 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                실시간 모니터링
              </h4>
              <p className="text-gray-600">
                시스템 성능과 사용자 활동을 실시간으로 모니터링하여 
                지속적인 개선을 제공합니다.
              </p>
            </div>
            
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                커뮤니티 지원
              </h4>
              <p className="text-gray-600">
                활발한 사용자 커뮤니티와 전문가 지원팀이 
                언제든지 도움을 드립니다.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
