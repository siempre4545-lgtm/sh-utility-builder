import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SH Utility Builder - 풀스택 웹 유틸리티 빌더',
    template: '%s | SH Utility Builder'
  },
  description: '한 화면에서 업로드→처리→다운로드까지 끝나는 초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.',
  keywords: ['웹 유틸리티', '파일 처리', '이미지 편집', 'PDF 변환', '파일 압축', 'Next.js', 'TypeScript'],
  authors: [{ name: 'SH Utility Builder Team' }],
  creator: 'SH Utility Builder',
  publisher: 'SH Utility Builder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/ko',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: 'SH Utility Builder - 풀스택 웹 유틸리티 빌더',
    description: '한 화면에서 업로드→처리→다운로드까지 끝나는 초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.',
    siteName: 'SH Utility Builder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SH Utility Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SH Utility Builder - 풀스택 웹 유틸리티 빌더',
    description: '한 화면에서 업로드→처리→다운로드까지 끝나는 초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SH Utility Builder",
              "description": "풀스택 웹 유틸리티 빌더 - Next.js App Router + TypeScript + Node 런타임",
              "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "author": {
                "@type": "Organization",
                "name": "SH Utility Builder Team"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <div id="root" className="h-full">
          {children}
        </div>
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  );
}
