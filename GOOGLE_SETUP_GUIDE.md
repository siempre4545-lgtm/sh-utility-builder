# Google 서비스 연결 가이드

## 📊 Google Analytics 4 (GA4) 설정

### 1단계: GA4 계정 생성
1. [Google Analytics](https://analytics.google.com/) 접속
2. "측정 시작" 클릭
3. 계정 이름: "SH Tools"
4. 속성 이름: "SH Tools Website"
5. 보고서 시간대: "대한민국"
6. 통화: "대한민국 원 (₩)"

### 2단계: 데이터 스트림 설정
1. 플랫폼: "웹" 선택
2. 웹사이트 URL: `https://sh-utility-builder.vercel.app`
3. 스트림 이름: "SH Tools Main"
4. **측정 ID 복사** (G-FGQK44BJR9)

### 3단계: 환경 변수 설정
Vercel 대시보드에서 환경 변수 추가:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🎯 Google AdSense 설정

### 1단계: AdSense 계정 생성
1. [Google AdSense](https://www.google.com/adsense/) 접속
2. "시작하기" 클릭
3. 웹사이트 URL: `https://sh-utility-builder.vercel.app`
4. 국가/지역: "대한민국"
5. 결제 정보 입력

### 2단계: 사이트 승인 대기
- **승인 시간**: 1-2주 소요
- **필요 조건**:
  - 충분한 콘텐츠 (현재 6개 도구 페이지)
  - 개인정보처리방침 페이지
  - 이용약관 페이지
  - 사이트맵 및 robots.txt

### 3단계: 광고 단위 생성
승인 후:
1. "광고" → "광고 단위" 클릭
2. 광고 단위 생성:
   - **배너 광고**: `1234567890`
   - **사이드바 광고**: `0987654321`
   - **모바일 광고**: `1122334455`

### 4단계: 환경 변수 설정
Vercel 대시보드에서 환경 변수 추가:
```
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
```

## 🔍 Google Search Console 설정

### 1단계: 사이트 등록
1. [Google Search Console](https://search.google.com/search-console/) 접속
2. "속성 추가" 클릭
3. URL 접두어: `https://sh-utility-builder.vercel.app`

### 2단계: 소유권 확인
1. "HTML 파일" 방법 선택
2. 제공된 HTML 파일을 `public/` 폴더에 업로드
3. "확인" 클릭

### 3단계: 사이트맵 제출
1. "사이트맵" 메뉴 클릭
2. 새 사이트맵 추가: `sitemap.xml`
3. "제출" 클릭

## 📊 **Google AdSense 자동광고 충돌 해결**

### **문제:** 자동광고가 수동 광고 영역 위쪽으로 영역을 잡는 현상

### **해결책:**

#### **1. 자동광고 세부 설정:**
- **의도된 기반형식 (인피드):** ✅ 활성화 - 콘텐츠 사이 자연스러운 배치
- **오버레이형식:** ❌ 비활성화 - 사용자 경험 저하 방지
- **인페이지 형식:** ✅ 활성화 - 사이드바, 콘텐츠 하단 배치
- **광고 밀도:** 보통 (3-5개/페이지)

#### **2. 제외된 영역 설정:**
```
제외할 영역:
- 헤더 (브랜딩 보호)
- 네비게이션 메뉴 (사용성 보장)
- 수동 광고 영역 (중복 방지)
- 푸터 (정책 정보 보호)
```

#### **3. 제외된 페이지 설정:**
```
제외할 페이지:
- / (홈페이지)
- /404, /500 (에러 페이지)
- /privacy, /terms (정책 페이지)
- /contact, /faq (고객지원 페이지)
```

#### **4. CSS 충돌 방지:**
```css
/* 수동 광고 영역 */
.ad-manual {
  position: relative;
  z-index: 5;
  isolation: isolate;
}

/* 자동광고 제외 영역 */
.exclude-adsense {
  position: relative;
  z-index: 15;
  pointer-events: auto;
}

/* 인피드 광고 영역 */
.infeed-ad-zone {
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}
```

#### **5. 광고 배치 전략:**
- **상단:** 수동 배너만 사용 (자동광고 제외)
- **중간:** 인피드 자동광고 활성화
- **하단:** 인페이지 자동광고 + 수동 배너 조합

## 🚀 Vercel 환경 변수 설정

### Vercel 대시보드에서 설정할 환경 변수:
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (승인 후)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX

# Site URL
SITE_URL=https://sh-utility-builder.vercel.app
```

## 📋 체크리스트

### GA4 설정
- [ ] GA4 계정 생성
- [ ] 측정 ID 복사
- [ ] Vercel 환경 변수 설정
- [ ] 실시간 데이터 확인

### AdSense 설정
- [ ] AdSense 계정 생성
- [ ] 사이트 승인 대기 (1-2주)
- [ ] 광고 단위 생성
- [ ] Vercel 환경 변수 설정

### Search Console 설정
- [ ] 사이트 등록
- [ ] 소유권 확인
- [ ] 사이트맵 제출
- [ ] 색인 요청

## 🔧 설정 완료 후 확인사항

1. **GA4 실시간 데이터**: 사이트 방문 시 실시간 보고서에서 확인
2. **AdSense 광고 표시**: 승인 후 광고가 정상적으로 표시되는지 확인
3. **Search Console 색인**: 사이트맵이 정상적으로 처리되는지 확인
4. **에러 모니터링**: Vercel Logs에서 에러 발생 여부 확인

## 📞 지원

설정 과정에서 문제가 발생하면:
1. Vercel 대시보드의 Functions 탭에서 로그 확인
2. 브라우저 개발자 도구에서 콘솔 에러 확인
3. Google 서비스별 도움말 센터 참조
