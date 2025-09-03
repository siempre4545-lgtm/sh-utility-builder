'use client';

import { Check, Crown, Star, Zap, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function Pricing() {
  const plans = [
    {
      name: '무료',
      price: '0',
      currency: '원',
      period: '월',
      description: '개인 사용자를 위한 기본 기능',
      features: [
        '일일 10개 파일 업로드',
        '최대 10MB 파일 크기',
        '기본 이미지 처리',
        'PDF 변환 (5페이지 이하)',
        '기본 압축/압축해제',
        '광고 표시',
        '커뮤니티 지원'
      ],
      limitations: [
        '고급 기능 제한',
        '배치 처리 불가',
        '우선 순위 지원 없음'
      ],
      buttonText: '무료로 시작',
      buttonVariant: 'outline',
      popular: false
    },
    {
      name: 'Pro',
      price: '9,900',
      currency: '원',
      period: '월',
      description: '개발자와 전문가를 위한 고급 기능',
      features: [
        '무제한 파일 업로드',
        '최대 100MB 파일 크기',
        '모든 이미지 처리 도구',
        'PDF 고급 기능 (무제한)',
        '배치 처리 지원',
        '고급 압축 옵션',
        '광고 없음',
        '우선 순위 지원',
        'API 액세스',
        '고급 보안 기능'
      ],
      limitations: [],
      buttonText: 'Pro 시작하기',
      buttonVariant: 'primary',
      popular: true,
      badge: '인기'
    },
    {
      name: 'Enterprise',
      price: '문의',
      currency: '',
      period: '',
      description: '팀과 조직을 위한 맞춤형 솔루션',
      features: [
        '모든 Pro 기능 포함',
        '팀 관리 및 권한 설정',
        'SSO 및 LDAP 연동',
        '전용 서버 및 인프라',
        '맞춤형 통합 및 API',
        '전담 지원 매니저',
        'SLA 보장',
        '온프레미스 배포 옵션',
        '고급 분석 및 리포팅',
        '커스텀 브랜딩'
      ],
      limitations: [],
      buttonText: '문의하기',
      buttonVariant: 'outline',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: '빠른 처리',
      description: '모든 작업이 2초 이내 완료'
    },
    {
      icon: Shield,
      title: '보안 보장',
      description: '엔터프라이즈급 보안 표준'
    },
    {
      icon: Users,
      title: '팀 협업',
      description: '효율적인 팀 워크플로우'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
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
            합리적인 가격으로 <span className="gradient-text">Pro 기능</span>을 경험하세요
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            무료로 시작하고 필요에 따라 업그레이드하세요. 
            모든 요금제는 언제든지 취소할 수 있습니다.
          </p>
        </motion.div>

        {/* 요금제 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{plan.badge}</span>
                  </span>
                </div>
              )}
              
              <div className={`
                card h-full relative
                ${plan.popular 
                  ? 'ring-2 ring-primary shadow-soft-lg scale-105' 
                  : 'hover:shadow-soft-lg'
                }
                transition-all duration-300
              `}>
                <div className="card-header text-center">
                  <div className="flex items-center justify-center mb-4">
                    {plan.popular && (
                      <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                    )}
                    <h3 className="card-title text-2xl">
                      {plan.name}
                    </h3>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.currency && (
                      <span className="text-lg text-gray-600 ml-1">
                        {plan.currency}
                      </span>
                    )}
                    {plan.period && (
                      <span className="text-lg text-gray-600 ml-1">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  
                  <p className="card-description">
                    {plan.description}
                  </p>
                </div>
                
                <div className="card-content">
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 mb-6">
                      <h4 className="font-medium text-gray-900 text-sm">제한사항:</h4>
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-center space-x-3">
                          <div className="w-5 h-5 text-gray-400 flex-shrink-0">×</div>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="card-footer">
                  <button className={`
                    w-full btn text-lg py-3
                    ${plan.buttonVariant === 'primary' 
                      ? 'btn-primary' 
                      : 'btn-outline'
                    }
                  `}>
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pro 혜택 강조 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-primary-600 rounded-3xl p-8 md:p-12 text-white mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Pro로 업그레이드하면 더 많은 혜택을 받을 수 있습니다
            </h3>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              무료 사용자도 언제든지 Pro로 업그레이드할 수 있으며, 
              첫 달은 100% 환불 보장됩니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  {benefit.title}
                </h4>
                <p className="text-primary-100">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ 및 추가 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">
              자주 묻는 질문
            </h4>
            <div className="space-y-4 text-left">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h5 className="font-medium text-gray-900 mb-2">
                  언제든지 요금제를 변경할 수 있나요?
                </h5>
                <p className="text-gray-600 text-sm">
                  네, 언제든지 요금제를 변경할 수 있습니다. 
                  변경은 즉시 적용되며, 사용하지 않은 기간에 대해서는 환불됩니다.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h5 className="font-medium text-gray-900 mb-2">
                  Pro 기능을 체험해볼 수 있나요?
                </h5>
                <p className="text-gray-600 text-sm">
                  네, 7일 무료 체험을 제공합니다. 
                  신용카드 정보 없이도 모든 Pro 기능을 사용해볼 수 있습니다.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h5 className="font-medium text-gray-900 mb-2">
                  팀 할인이 있나요?
                </h5>
                <p className="text-gray-600 text-sm">
                  네, 5명 이상의 팀을 위한 특별 할인을 제공합니다. 
                  Enterprise 요금제는 맞춤형 가격을 문의해주세요.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
