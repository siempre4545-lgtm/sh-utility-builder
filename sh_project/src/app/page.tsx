import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { UtilityGrid } from '@/components/UtilityGrid';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Pricing } from '@/components/Pricing';

export const metadata: Metadata = {
  title: '홈',
  description: 'SH Utility Builder - 한 화면에서 업로드→처리→다운로드까지 끝나는 초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.',
  openGraph: {
    title: 'SH Utility Builder - 홈',
    description: '한 화면에서 업로드→처리→다운로드까지 끝나는 초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                다양한 유틸리티 도구
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                파일 처리부터 변환까지, 필요한 모든 도구를 한 곳에서 제공합니다.
                각 도구는 단일 기능에 특화되어 빠르고 안정적으로 작동합니다.
              </p>
            </div>
            
            <UtilityGrid />
          </div>
        </section>
        
        <Features />
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
}
