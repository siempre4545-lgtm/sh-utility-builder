import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보처리방침 - SH Tools',
  description: 'SH Tools의 개인정보처리방침입니다. 사용자의 개인정보 보호를 위해 최선을 다하겠습니다.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            개인정보처리방침
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              최종 업데이트: 2024년 12월 19일
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. 개인정보 수집 및 이용
              </h2>
              <p className="text-gray-700 mb-4">
                SH Tools는 사용자의 개인정보를 최소한으로 수집하며, 서비스 제공에 필요한 정보만을 수집합니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>수집 정보: 업로드된 파일, 사용 통계, 에러 로그</li>
                <li>수집 목적: 서비스 제공, 품질 개선, 에러 해결</li>
                <li>보유 기간: 파일은 처리 완료 후 즉시 삭제, 로그는 30일간 보관</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. 파일 처리 및 자동 삭제
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>중요:</strong> 업로드된 모든 파일은 처리 완료 후 자동으로 삭제됩니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>파일 업로드 시 임시 저장소에만 저장</li>
                <li>처리 완료 후 즉시 파일 삭제</li>
                <li>서버 로그에 파일 내용 저장하지 않음</li>
                <li>개인정보보호법에 따른 자동 삭제 정책 준수</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. 쿠키 및 추적 기술
              </h2>
              <p className="text-gray-700 mb-4">
                서비스 개선을 위해 다음 기술을 사용합니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Google Analytics: 사용자 행동 분석</li>
                <li>Google AdSense: 광고 표시 (승인 후)</li>
                <li>Vercel Analytics: 성능 모니터링</li>
                <li>쿠키: 사용자 설정 저장</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. 제3자 서비스
              </h2>
              <p className="text-gray-700 mb-4">
                다음 제3자 서비스를 사용합니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Vercel: 호스팅 및 CDN</li>
                <li>Google: Analytics, AdSense, Search Console</li>
                <li>Stripe: 결제 처리 (Pro 업그레이드 시)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. 사용자 권리
              </h2>
              <p className="text-gray-700 mb-4">
                사용자는 다음 권리를 가집니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>개인정보 열람 요청</li>
                <li>개인정보 정정·삭제 요청</li>
                <li>개인정보 처리정지 요청</li>
                <li>개인정보 처리방침 변경 통지</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. 연락처
              </h2>
              <p className="text-gray-700 mb-4">
                개인정보 관련 문의사항이 있으시면 다음으로 연락해 주세요:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>이메일: privacy@shtools.com</li>
                <li>문의 페이지: <a href="/contact" className="text-primary-600 hover:text-primary-700">문의하기</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. 정책 변경
              </h2>
              <p className="text-gray-700">
                이 개인정보처리방침은 필요에 따라 변경될 수 있으며, 
                변경 시 웹사이트에 공지하겠습니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
