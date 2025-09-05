'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'
import ProModal from '@/components/ProModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 exclude-adsense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">SH Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tools" className="text-gray-600 hover:text-gray-900 transition-colors">
              도구
            </Link>
            <Link href="/tools/qr-generator" className="text-gray-600 hover:text-gray-900 transition-colors">
              QR 생성
            </Link>
            <Link href="/tools/srt-editor" className="text-gray-600 hover:text-gray-900 transition-colors">
              자막 편집
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              문의
            </Link>
            <Button variant="outline" size="sm" onClick={() => setIsProModalOpen(true)}>
              Pro 업그레이드
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4 px-4">
              <Link 
                href="/tools" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                도구
              </Link>
              <Link 
                href="/tools/qr-generator" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                QR 생성
              </Link>
              <Link 
                href="/tools/srt-editor" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                자막 편집
              </Link>
              <Link 
                href="/faq" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                문의
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4" 
                onClick={() => {
                  setIsProModalOpen(true)
                  setIsMenuOpen(false)
                }}
              >
                Pro 업그레이드
              </Button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Pro Modal */}
      <ProModal 
        isOpen={isProModalOpen} 
        onClose={() => setIsProModalOpen(false)}
        trigger="header"
      />
    </header>
  )
}
