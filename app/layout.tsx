import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Watermark from '@/components/Watermark'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Script from 'next/script'
import { ProStatusProvider } from '@/components/ProStatusProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SH Tools: PDF 병합·이미지 변환 무료 도구',
  description: '웹에서 PDF 병합, WebP·HEIC→JPG, 이미지 리사이즈 등 간단 파일 변환 제공.',
  keywords: 'PDF 병합, WebP JPG 변환, HEIC JPG 변환, 이미지 리사이즈, QR 코드 생성, SRT 자막 편집, 온라인 파일 변환, 무료 유틸리티',
  authors: [{ name: 'SH Tools' }],
  creator: 'SH Tools',
  publisher: 'SH Tools',
  // 캐싱 방지 메타 태그
  other: {
    'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=60',
  },
  verification: {
    google: 'D5PCytY_76rKdtOt_RhpCj_Yx5HnmYFTBe43IZOyUhc',
    other: {
      'naver-site-verification': 'c51fc9864b7f6355bb7ec5f67c10d4933ce6e230',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sh-utility-builder.vercel.app'),
  openGraph: {
    title: 'SH Tools: PDF 병합·이미지 변환 무료 도구',
    description: 'PDF 병합, WebP·HEIC→JPG, 이미지 리사이즈를 빠르게 처리하세요.',
    url: 'https://sh-utility-builder.vercel.app',
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
    title: 'SH Tools - 무료 PDF 병합, WebP JPG 변환기, HEIC JPG 변환 도구',
    description: '무료 PDF 병합, WebP JPG 변환기, HEIC JPG 변환 도구를 제공합니다. 이미지 리사이즈, QR 코드 생성, SRT 자막 편집 등 다양한 온라인 파일 변환 도구를 무료로 사용하세요.',
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
        <ProStatusProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Watermark />
          <Toaster position="top-right" />
          <Analytics />
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
          
          {/* Google AdSense 코드 - next/script로 이동 */}
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1113623105565685"
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        </ProStatusProvider>
      </body>
    </html>
  )
}