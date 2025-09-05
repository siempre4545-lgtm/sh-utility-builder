import { Metadata } from 'next'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: '이용약관 - SH Tools',
  description: 'SH Tools의 이용약관입니다. 서비스 이용 시 다음 약관을 준수해 주세요.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            이용약관
          </h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              최종 업데이트: 2024년 12월 19일
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. 서비스 소개
              </h2>
              <p className="text-gray-700 mb-4">
                SH Tools는 온라인 파일 변환 및 처리 도구를 제공하는 무료 서비스입니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>이미지 리사이즈 (JPEG, PNG, WebP)</li>
                <li>HEIC → JPG 변환</li>
                <li>PDF 병합</li>
                <li>WebP → JPG 변환</li>
                <li>QR 코드 생성</li>
                <li>SRT 자막 편집</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. 서비스 이용
              </h2>
              <p className="text-gray-700 mb-4">
                서비스 이용 시 다음 사항을 준수해 주세요:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>무료 버전: 파일 개수 및 크기 제한 있음</li>
                <li>Pro 버전: 제한 없음 (유료)</li>
                <li>업로드된 파일은 처리 완료 후 자동 삭제</li>
                <li>서비스 이용은 24시간 가능</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. 금지 행위
              </h2>
              <p className="text-gray-700 mb-4">
                다음 행위는 금지됩니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>저작권이 있는 콘텐츠의 무단 변환</li>
                <li>불법적인 콘텐츠 업로드</li>
                <li>서비스 시스템에 악의적인 공격</li>
                <li>다른 사용자의 서비스 이용 방해</li>
                <li>상업적 목적의 대량 사용 (무료 버전)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Pro 서비스
              </h2>
              <p className="text-gray-700 mb-4">
                Pro 서비스 이용 시:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>월 구독료: 9,900원</li>
                <li>연 구독료: 99,000원 (월 8,250원)</li>
                <li>결제: Stripe를 통한 안전한 결제</li>
                <li>환불: 7일 이내 무조건 환불</li>
                <li>해지: 언제든지 해지 가능</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. 서비스 중단 및 변경
              </h2>
              <p className="text-gray-700 mb-4">
                다음 경우 서비스가 중단될 수 있습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>시스템 점검 및 업데이트</li>
                <li>기술적 문제 발생</li>
                <li>서비스 정책 변경</li>
                <li>법적 요구사항</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. 면책 조항
              </h2>
              <p className="text-gray-700 mb-4">
                SH Tools는 다음에 대해 책임지지 않습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>사용자 파일의 손실 또는 손상</li>
                <li>서비스 이용으로 인한 간접적 손해</li>
                <li>제3자 서비스의 문제</li>
                <li>사용자의 부주의로 인한 문제</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. 지적재산권
              </h2>
              <p className="text-gray-700 mb-4">
                SH Tools의 모든 콘텐츠는 저작권법에 의해 보호됩니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>웹사이트 디자인 및 코드</li>
                <li>로고 및 브랜드 요소</li>
                <li>서비스 아이디어 및 알고리즘</li>
                <li>문서 및 가이드</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. 분쟁 해결
              </h2>
              <p className="text-gray-700 mb-4">
                서비스 이용과 관련된 분쟁은 다음에 따라 해결합니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>대한민국 법률 적용</li>
                <li>서울중앙지방법원을 전속 관할법원으로 함</li>
                <li>분쟁 발생 시 우선 협의를 통한 해결</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. 연락처
              </h2>
              <p className="text-gray-700 mb-4">
                서비스 관련 문의사항이 있으시면:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>이메일: support@shtools.com</li>
                <li>문의 페이지: <a href="/contact" className="text-primary-600 hover:text-primary-700">문의하기</a></li>
                <li>FAQ: <a href="/faq" className="text-primary-600 hover:text-primary-700">자주 묻는 질문</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. 약관 변경
              </h2>
              <p className="text-gray-700">
                이 이용약관은 필요에 따라 변경될 수 있으며, 
                변경 시 웹사이트에 공지하겠습니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
