import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SH Tools - 빠르고 안전한 파일 변환 도구',
  description: '이미지 리사이즈, PDF 병합, HEIC 변환 등 다양한 파일 변환을 브라우저에서 바로 처리하세요. 업로드 없이 빠르고 안전합니다.',
  keywords: '파일 변환, 이미지 리사이즈, PDF 병합, HEIC 변환, WebP 변환, 온라인 도구',
  authors: [{ name: 'SH Tools' }],
  creator: 'SH Tools',
  publisher: 'SH Tools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sh-utility-builder-dn13.vercel.app'),
  openGraph: {
    title: 'SH Tools - 빠르고 안전한 파일 변환 도구',
    description: '이미지 리사이즈, PDF 병합, HEIC 변환 등 다양한 파일 변환을 브라우저에서 바로 처리하세요.',
    url: 'https://sh-utility-builder-dn13.vercel.app',
    siteName: 'SH Tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SH Tools - 파일 변환 도구',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SH Tools - 빠르고 안전한 파일 변환 도구',
    description: '이미지 리사이즈, PDF 병합, HEIC 변환 등 다양한 파일 변환을 브라우저에서 바로 처리하세요.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}