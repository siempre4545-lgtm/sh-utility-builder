'use client';

import Link from 'next/link';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Shield,
  Zap,
  Users
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: '도구', href: '/tools' },
      { name: '가격', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: '문서', href: '/docs' },
      { name: '업데이트', href: '/updates' }
    ],
    company: [
      { name: '회사 소개', href: '/about' },
      { name: '팀', href: '/team' },
      { name: '채용', href: '/careers' },
      { name: '뉴스', href: '/news' },
      { name: '연락처', href: '/contact' }
    ],
    support: [
      { name: '도움말', href: '/help' },
      { name: '지원', href: '/support' },
      { name: '커뮤니티', href: '/community' },
      { name: '상태', href: '/status' },
      { name: '보안', href: '/security' }
    ],
    legal: [
      { name: '이용약관', href: '/terms' },
      { name: '개인정보처리방침', href: '/privacy' },
      { name: '쿠키 정책', href: '/cookies' },
      { name: '라이선스', href: '/license' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'Email', href: 'mailto:contact@example.com', icon: Mail }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 메인 푸터 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* 브랜드 섹션 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SH</span>
              </div>
              <span className="text-xl font-bold">
                Utility Builder
              </span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              한 화면에서 업로드→처리→다운로드까지 끝나는 
              초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.
            </p>
            
            {/* 소셜 링크 */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 제품 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">제품</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">회사</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 지원 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">지원</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 법적 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">법적 정보</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 특징 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 py-8 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">빠른 처리</h4>
              <p className="text-sm text-gray-400">2초 이내 완료</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">보안 우선</h4>
              <p className="text-sm text-gray-400">24-48시간 자동 삭제</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">사용자 친화적</h4>
              <p className="text-sm text-gray-400">직관적인 인터페이스</p>
            </div>
          </div>
        </div>

        {/* 하단 푸터 */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>&copy; {currentYear} SH Utility Builder. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">in Korea</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>버전 1.0.0</span>
              <span>•</span>
              <span>Node.js 18+</span>
              <span>•</span>
              <span>Next.js 14</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
