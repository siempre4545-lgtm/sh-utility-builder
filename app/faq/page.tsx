import type { Metadata } from 'next'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { HelpCircle, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - 자주 묻는 질문 | SH Tools',
  description: 'SH Tools 사용 시 자주 묻는 질문과 답변을 확인하세요. 파일 변환, 개인정보 보호, 오류 해결 방법 등을 안내합니다.',
  keywords: 'FAQ, 자주 묻는 질문, 파일 변환, 개인정보 보호, 오류 해결, SH Tools',
  openGraph: {
    title: 'FAQ - 자주 묻는 질문 | SH Tools',
    description: 'SH Tools 사용 시 자주 묻는 질문과 답변을 확인하세요.',
    url: 'https://sh-utility-builder-dn13.vercel.app/faq',
    type: 'website',
  },
}

const faqData = [
  {
    category: '이미지 리사이즈',
    icon: '🖼️',
    questions: [
      {
        question: '이미지 리사이즈 시 품질이 떨어지는 이유는 무엇인가요?',
        answer: '이미지 리사이즈 시 품질 저하가 발생하는 주요 원인은 다음과 같습니다:\n\n1. **압축률 설정**: 품질 설정이 너무 낮으면 (예: 60% 이하) 이미지가 흐려집니다. 권장 품질은 80-90%입니다.\n2. **원본 해상도**: 원본 이미지가 너무 작은 경우 확대 시 품질이 떨어집니다.\n3. **파일 형식**: JPEG는 손실 압축 형식이므로 반복 편집 시 품질이 점진적으로 저하됩니다.\n\n**해결 방법**:\n- 품질을 85% 이상으로 설정\n- 원본 해상도가 충분한 이미지 사용\n- 필요시 PNG 형식으로 변환 후 리사이즈'
      },
      {
        question: '이미지 리사이즈 후 파일 크기가 예상보다 큰 이유는 무엇인가요?',
        answer: '이미지 리사이즈 후 파일 크기가 큰 이유는 다음과 같습니다:\n\n1. **품질 설정이 높음**: 90% 이상의 높은 품질 설정\n2. **원본 이미지가 고해상도**: 4K 이상의 고해상도 이미지\n3. **복잡한 이미지**: 많은 색상과 디테일이 포함된 이미지\n4. **메타데이터 보존**: EXIF 데이터가 포함된 경우\n\n**해결 방법**:\n- 품질을 80-85%로 조정\n- 이미지 크기를 적절히 조정 (예: 1920px 이하)\n- 메타데이터 제거 옵션 사용 (Pro 기능)\n- WebP 형식으로 변환하여 파일 크기 최적화'
      }
    ]
  },
  {
    category: 'HEIC → JPG 변환',
    icon: '📱',
    questions: [
      {
        question: 'HEIC 파일이 변환되지 않는 이유는 무엇인가요?',
        answer: 'HEIC 파일 변환 실패의 주요 원인은 다음과 같습니다:\n\n1. **손상된 파일**: 파일이 완전히 업로드되지 않았거나 손상된 경우\n2. **지원하지 않는 HEIC 버전**: 일부 특수 HEIC 형식은 지원하지 않을 수 있습니다\n3. **파일 크기 초과**: 무료 버전은 50MB, Pro 버전은 200MB 제한\n4. **네트워크 문제**: 업로드 중 연결이 끊어진 경우\n\n**해결 방법**:\n- 파일을 다시 업로드 시도\n- 파일 크기 확인 (50MB 이하)\n- 다른 HEIC 파일로 테스트\n- Pro 업그레이드로 더 큰 파일 처리'
      },
      {
        question: 'HEIC 변환 후 색상이 이상하게 나오는 이유는 무엇인가요?',
        answer: 'HEIC 변환 후 색상 문제가 발생하는 이유는 다음과 같습니다:\n\n1. **색상 프로필 차이**: HEIC는 Wide Color Gamut를 지원하지만 JPG는 sRGB로 제한\n2. **HDR 이미지**: iPhone의 HDR 사진은 JPG로 변환 시 색상 범위가 축소됨\n3. **메타데이터 손실**: 색상 보정 정보가 변환 과정에서 손실\n\n**해결 방법**:\n- Pro 버전의 고급 색상 보정 옵션 사용\n- 원본 HEIC 파일의 색상 프로필 확인\n- 필요시 전문 이미지 편집 소프트웨어 사용\n- 변환 전 이미지 미리보기로 색상 확인'
      }
    ]
  },
  {
    category: 'PDF 병합',
    icon: '📄',
    questions: [
      {
        question: 'PDF 병합 시 페이지 순서가 바뀌는 이유는 무엇인가요?',
        answer: 'PDF 병합 시 페이지 순서가 바뀌는 이유는 다음과 같습니다:\n\n1. **업로드 순서**: 파일을 업로드한 순서대로 병합됩니다\n2. **파일명 정렬**: 일부 브라우저에서 파일명 알파벳 순으로 정렬될 수 있습니다\n3. **드래그 앤 드롭 순서**: 파일을 드래그한 순서가 반영됩니다\n\n**해결 방법**:\n- 파일을 원하는 순서대로 하나씩 업로드\n- 파일명을 숫자로 시작 (예: 01_문서.pdf, 02_문서.pdf)\n- Pro 버전의 페이지 순서 조정 기능 사용\n- 병합 전 미리보기로 순서 확인'
      },
      {
        question: 'PDF 병합 후 파일 크기가 매우 커지는 이유는 무엇인가요?',
        answer: 'PDF 병합 후 파일 크기가 커지는 이유는 다음과 같습니다:\n\n1. **이미지 압축**: 원본 PDF의 이미지가 고해상도로 저장된 경우\n2. **중복 폰트**: 각 PDF에 동일한 폰트가 포함된 경우\n3. **메타데이터 누적**: 각 PDF의 메타데이터가 모두 포함됨\n4. **압축 설정**: 병합 시 압축이 적용되지 않은 경우\n\n**해결 방법**:\n- Pro 버전의 파일 크기 최적화 옵션 사용\n- 병합 전 개별 PDF 파일 크기 확인\n- 필요시 이미지 해상도 조정\n- 중복 폰트 제거 옵션 사용 (Pro 기능)'
      }
    ]
  },
  {
    category: 'WebP → JPG 변환',
    icon: '🌐',
    questions: [
      {
        question: 'WebP 파일이 변환되지 않는 이유는 무엇인가요?',
        answer: 'WebP 파일 변환 실패의 주요 원인은 다음과 같습니다:\n\n1. **손상된 WebP 파일**: 파일이 완전하지 않거나 손상된 경우\n2. **애니메이션 WebP**: 애니메이션이 포함된 WebP는 정적 이미지로 변환됩니다\n3. **지원하지 않는 WebP 버전**: 최신 WebP 형식 중 일부는 지원하지 않을 수 있습니다\n4. **파일 크기 초과**: 무료 버전은 50MB 제한\n\n**해결 방법**:\n- 파일을 다시 다운로드하여 업로드\n- 애니메이션 WebP의 경우 첫 번째 프레임만 변환됨을 확인\n- 파일 크기 확인 (50MB 이하)\n- Pro 업그레이드로 더 큰 파일 처리'
      },
      {
        question: 'WebP 변환 후 이미지 품질이 떨어지는 이유는 무엇인가요?',
        answer: 'WebP 변환 후 품질 저하가 발생하는 이유는 다음과 같습니다:\n\n1. **압축 방식 차이**: WebP는 고급 압축 알고리즘을 사용하지만 JPG는 기본 압축\n2. **품질 설정**: 변환 시 품질 설정이 낮게 설정된 경우\n3. **색상 공간**: WebP의 색상 정보가 JPG로 변환되면서 손실\n4. **투명도 손실**: WebP의 투명도 정보가 JPG에서 손실됨\n\n**해결 방법**:\n- 품질을 90% 이상으로 설정\n- Pro 버전의 고급 품질 옵션 사용\n- 투명도가 필요한 경우 PNG 형식으로 변환\n- 원본 WebP 파일의 품질 확인'
      }
    ]
  },
  {
    category: 'QR 코드 생성',
    icon: '📱',
    questions: [
      {
        question: 'QR 코드가 스캔되지 않는 이유는 무엇인가요?',
        answer: 'QR 코드 스캔 실패의 주요 원인은 다음과 같습니다:\n\n1. **해상도 부족**: QR 코드 크기가 너무 작아서 스캔이 어려움\n2. **대비 부족**: 배경과 QR 코드의 색상 대비가 부족한 경우\n3. **손상된 QR 코드**: 인쇄나 저장 과정에서 QR 코드가 손상된 경우\n4. **복잡한 내용**: 너무 긴 텍스트나 URL이 포함된 경우\n\n**해결 방법**:\n- QR 코드 크기를 256px 이상으로 설정\n- 검은색 QR 코드를 흰색 배경에 사용\n- 내용을 간결하게 작성 (URL 단축 서비스 사용)\n- Pro 버전의 오류 수정 레벨 조정 기능 사용'
      },
      {
        question: 'QR 코드에 로고를 넣을 수 있나요?',
        answer: 'QR 코드에 로고 삽입은 Pro 버전에서만 가능합니다:\n\n**무료 버전 제한사항**:\n- 기본 QR 코드만 생성 가능\n- 로고 삽입 불가\n- 커스텀 색상 불가\n\n**Pro 버전 기능**:\n- 중앙에 로고 삽입 가능\n- 커스텀 색상 설정\n- 오류 수정 레벨 조정으로 로고 삽입 후에도 스캔 가능\n- 고해상도 출력 (1024px 이상)\n\n**로고 삽입 시 주의사항**:\n- 로고 크기는 QR 코드의 30% 이하로 제한\n- 단색 로고 사용 권장\n- 로고 삽입 후 스캔 테스트 필수'
      }
    ]
  },
  {
    category: 'SRT 자막 편집',
    icon: '🎬',
    questions: [
      {
        question: 'SRT 파일이 업로드되지 않는 이유는 무엇인가요?',
        answer: 'SRT 파일 업로드 실패의 주요 원인은 다음과 같습니다:\n\n1. **파일 형식 오류**: SRT 형식이 아닌 다른 자막 파일 (VTT, ASS 등)\n2. **인코딩 문제**: UTF-8이 아닌 다른 인코딩으로 저장된 파일\n3. **파일 크기 초과**: 5MB를 초과하는 대용량 자막 파일\n4. **파일 손상**: 불완전하게 다운로드되거나 손상된 파일\n\n**해결 방법**:\n- 파일 확장자가 .srt인지 확인\n- 텍스트 에디터로 파일을 열어 UTF-8로 저장\n- 파일 크기를 5MB 이하로 제한\n- 다른 SRT 파일로 테스트하여 문제 확인'
      },
      {
        question: 'SRT 편집 후 동기화가 맞지 않는 이유는 무엇인가요?',
        answer: 'SRT 편집 후 동기화 문제가 발생하는 이유는 다음과 같습니다:\n\n1. **시간 형식 오류**: SRT 시간 형식 (00:00:00,000)을 정확히 입력하지 않은 경우\n2. **순서 변경**: 자막 순서를 변경했지만 시간은 그대로 둔 경우\n3. **오프셋 적용**: 전체 시간을 조정했지만 일부만 적용된 경우\n4. **프레임레이트 차이**: 원본 영상과 다른 프레임레이트로 편집된 경우\n\n**해결 방법**:\n- 시간 형식을 정확히 입력 (시:분:초,밀리초)\n- 자막 순서 변경 시 시간도 함께 조정\n- Pro 버전의 자동 동기화 기능 사용\n- 편집 후 미리보기로 동기화 확인'
      }
    ]
  },
  {
    category: 'Pro 구독 관리',
    icon: '💳',
    questions: [
      {
        question: 'Pro 구독을 취소하려면 어떻게 하나요?',
        answer: 'Pro 구독 취소는 매우 간단합니다:\n\n**구독 취소 방법**:\n1. 헤더의 "구독 관리" 메뉴 클릭\n2. "구독 취소하기" 버튼 클릭\n3. LemonSqueezy 고객 포털에서 구독 취소\n\n**취소 시 주의사항**:\n- 현재 결제 주기까지는 Pro 기능 사용 가능\n- 취소 후 다음 결제일부터 무료 버전으로 전환\n- 언제든지 다시 구독 가능\n- 환불은 LemonSqueezy 정책에 따라 처리\n\n**구독 관리 페이지**:\n- 구독 상태 확인\n- 결제 내역 조회\n- 결제 방법 변경\n- 구독 취소/재개\n\n**문의사항**:\n구독 관련 문제가 있으시면 언제든지 문의해주세요.'
      },
      {
        question: '구독 취소 후 언제 Pro 기능이 제한되나요?',
        answer: '구독 취소 후 Pro 기능 제한 시점은 다음과 같습니다:\n\n**즉시 제한되지 않음**:\n- 구독 취소 즉시 Pro 기능이 제한되지 않음\n- 현재 결제 주기까지는 Pro 기능 계속 사용 가능\n- 예: 1월 15일 결제, 2월 10일 취소 → 2월 15일까지 Pro 기능 사용 가능\n\n**제한 시점**:\n- 다음 결제 예정일부터 무료 버전으로 전환\n- Pro 기능 사용 불가 (파일 크기 제한, 배치 처리 불가 등)\n- 광고가 다시 표시됨\n\n**재구독 시**:\n- 언제든지 다시 Pro 구독 가능\n- 재구독 즉시 Pro 기능 복원\n- 기존 설정과 데이터는 그대로 유지\n\n**확인 방법**:\n구독 관리 페이지에서 다음 결제일과 상태를 확인할 수 있습니다.'
      },
      {
        question: '환불은 언제 받을 수 있나요?',
        answer: '환불 정책은 LemonSqueezy의 정책을 따릅니다:\n\n**환불 가능 기간**:\n- 구독 후 30일 이내 환불 가능\n- 월간 구독: 구독일로부터 30일\n- 연간 구독: 구독일로부터 30일\n\n**환불 처리**:\n- LemonSqueezy 고객 포털에서 환불 요청\n- 자동 환불 처리 (영업일 기준 3-5일)\n- 원래 결제 방법으로 환불\n\n**환불 불가 경우**:\n- 30일 경과 후 환불 요청\n- 과도한 사용 후 환불 요청\n- 정책 위반 시\n\n**환불 문의**:\n환불 관련 문의는 LemonSqueezy 고객 지원팀에 직접 문의하거나, 구독 관리 페이지에서 안내를 받을 수 있습니다.'
      }
    ]
  },
  {
    category: '개인정보 보호',
    icon: '🔒',
    questions: [
      {
        question: '업로드한 파일이 자동으로 삭제되나요?',
        answer: '네, 업로드한 모든 파일은 자동으로 삭제됩니다:\n\n**자동 삭제 정책**:\n- 파일 업로드 즉시 임시 저장소에 저장\n- 처리 완료 후 즉시 삭제 (일반적으로 1-2분 이내)\n- 서버에 영구 저장되지 않음\n- 개인정보보호법 및 GDPR 준수\n\n**삭제 과정**:\n1. 파일 업로드 → 임시 저장소\n2. 파일 처리 (변환/편집)\n3. 처리 완료 → 사용자에게 결과 전송\n4. 즉시 파일 삭제 → 저장소에서 완전 제거\n\n**보안 조치**:\n- 암호화된 임시 저장소 사용\n- 접근 로그 기록 및 모니터링\n- 정기적인 임시 파일 정리 작업'
      },
      {
        question: '개인정보가 수집되나요?',
        answer: 'SH Tools는 최소한의 개인정보만 수집합니다:\n\n**수집하는 정보**:\n- 서비스 이용 통계 (익명화된 데이터)\n- 오류 로그 (개인정보 제외)\n- 성능 지표 (사용자 식별 불가)\n\n**수집하지 않는 정보**:\n- 개인 식별 정보 (이름, 이메일, 전화번호)\n- 업로드한 파일 내용\n- IP 주소 (익명화 처리)\n- 쿠키 (필수 기능 제외)\n\n**데이터 보호**:\n- 개인정보보호법 완전 준수\n- GDPR 규정 준수\n- 데이터 암호화 저장\n- 정기적인 보안 감사\n\n**사용자 권리**:\n- 데이터 삭제 요청 가능\n- 개인정보 처리 현황 조회 가능\n- 동의 철회 가능'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SH Tools 사용 시 자주 묻는 질문과 답변을 확인하세요.
            문제가 해결되지 않으면 문의하기를 이용해 주세요.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                개인정보 보호 안내
              </h3>
              <p className="text-blue-800">
                <strong>업로드한 모든 파일은 자동으로 삭제됩니다.</strong> 
                파일 처리 완료 후 즉시 서버에서 완전히 제거되며, 
                개인정보보호법 및 GDPR을 완전히 준수합니다.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="card">
              <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">{category.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.category}
                </h2>
              </div>
              
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border-l-4 border-primary-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                      <AlertTriangle className="w-5 h-5 text-primary-600 mt-1 mr-2 flex-shrink-0" />
                      {faq.question}
                    </h3>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <Info className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              더 도움이 필요하신가요?
            </h3>
            <p className="text-gray-600 mb-6">
              위의 FAQ에서 답을 찾지 못하셨다면 언제든지 문의해 주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                문의하기
              </a>
              <a 
                href="/" 
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                홈으로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
