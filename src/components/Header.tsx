'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: '홈', href: '/' },
    { name: '도구', href: '/tools' },
    { name: '가격', href: '/pricing' },
    { name: '문서', href: '/docs' },
    { name: '지원', href: '/support' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SH</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Utility Builder
              </span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* 검색 및 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            {/* 검색 버튼 */}
            <button
              className="p-2 text-gray-600 hover:text-primary transition-colors duration-200"
              aria-label="검색"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* 사용자 메뉴 */}
            <div className="hidden sm:flex items-center space-x-2">
              <button
                className="p-2 text-gray-600 hover:text-primary transition-colors duration-200"
                aria-label="사용자 설정"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-600 hover:text-primary transition-colors duration-200"
                aria-label="설정"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* 로그인/회원가입 버튼 */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/login"
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="btn-primary"
              >
                회원가입
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={cn(
            'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-3 border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-600 hover:text-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                className="block text-gray-600 hover:text-primary transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="btn-primary w-full justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
