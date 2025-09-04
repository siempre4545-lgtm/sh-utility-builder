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
2. 웹사이트 URL: `https://sh-utility-builder-dn13.vercel.app`
3. 스트림 이름: "SH Tools Main"
4. **측정 ID 복사** (G-XXXXXXXXXX 형식)

### 3단계: 환경 변수 설정
Vercel 대시보드에서 환경 변수 추가:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🎯 Google AdSense 설정

### 1단계: AdSense 계정 생성
1. [Google AdSense](https://www.google.com/adsense/) 접속
2. "시작하기" 클릭
3. 웹사이트 URL: `https://sh-utility-builder-dn13.vercel.app`
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
3. URL 접두어: `https://sh-utility-builder-dn13.vercel.app`

### 2단계: 소유권 확인
1. "HTML 파일" 방법 선택
2. 제공된 HTML 파일을 `public/` 폴더에 업로드
3. "확인" 클릭

### 3단계: 사이트맵 제출
1. "사이트맵" 메뉴 클릭
2. 새 사이트맵 추가: `sitemap.xml`
3. "제출" 클릭

## 🚀 Vercel 환경 변수 설정

### Vercel 대시보드에서 설정할 환경 변수:
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (승인 후)
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX

# Site URL
SITE_URL=https://sh-utility-builder-dn13.vercel.app
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
