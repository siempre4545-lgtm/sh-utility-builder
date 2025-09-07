# SH Tools - 빠르고 안전한 파일 변환 도구

> Next.js 14 App Router + TypeScript + Tailwind CSS로 구축된 풀스택 웹 유틸리티 빌더

## 🚀 주요 기능

- **이미지 리사이즈**: JPEG, PNG, WebP 크기 조정 및 품질 최적화
- **HEIC → JPG 변환**: iPhone 사진을 널리 호환되는 JPG로 변환
- **PDF 병합**: 여러 PDF를 하나로 병합하여 관리
- **WebP → JPG 변환**: Google WebP를 호환성 높은 JPG로 변환
- **QR 코드 생성**: 텍스트, URL, 연락처 정보를 QR 코드로 생성
- **SRT 자막 편집**: 자막 파일 편집 및 시간 동기화

## 🛠 기술 스택

- **Frontend**: Next.js 14 App Router, React 18, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **UI Components**: Lucide React, Sonner
- **Analytics**: Vercel Analytics, Google Analytics 4
- **Payment**: LemonSqueezy (구독 결제)
- **Ads**: Google AdSense
- **Deployment**: Vercel

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/siempre4545-lgtm/sh-utility-builder.git
cd sh-utility-builder
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
```bash
cp env.example .env.local
```

`.env.local` 파일을 편집하여 필요한 환경변수를 설정하세요:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxx

# LemonSqueezy (결제 시스템)
NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_BUY_LINK=https://shtools.lemonsqueezy.com/checkout/buy/xxxxxxxxxx
NEXT_PUBLIC_LEMONSQUEEZY_YEARLY_BUY_LINK=https://shtools.lemonsqueezy.com/checkout/buy/xxxxxxxxxx
LEMONSQUEEZY_WEBHOOK_SECRET=whsec_xxxxxxxxxx

# 기타
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🏗 빌드 및 배포

### 로컬 빌드
```bash
npm run build
npm start
```

### Vercel 배포
1. [Vercel](https://vercel.com)에 GitHub 저장소 연결
2. 환경변수 설정
3. 자동 배포 완료

## 📊 분석 및 모니터링

### Vercel Analytics
- 자동으로 유입량, 페이지뷰, 성능 지표 추적
- 별도 설정 불필요

### Google Analytics
- 파일 업로드/변환 이벤트 추적
- Pro 업그레이드 클릭 추적
- 광고 클릭 추적
- `NEXT_PUBLIC_GA_ID` 환경변수 설정 필요

## 💰 수익화 시스템

### Pro 구독
- 월간 플랜: ₩7,900/월
- 연간 플랜: ₩79,000/년 (2개월 무료!)
- LemonSqueezy 결제 시스템 연동
- 신용카드, PayPal, Apple Pay, Google Pay 지원

### 광고 시스템
- Google AdSense 준비
- 상단/하단 배너, 사이드바 광고 영역
- 광고 클릭 추적

## 🔧 개발 가이드

### 프로젝트 구조
```
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── tools/             # 도구 페이지들
├── components/            # 재사용 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── Header.tsx        # 헤더
│   ├── Footer.tsx        # 푸터
│   ├── Hero.tsx          # 히어로 섹션
│   ├── UtilityGrid.tsx   # 도구 그리드
│   ├── ProModal.tsx      # Pro 업그레이드 모달
│   ├── AdBanner.tsx      # 광고 배너
│   └── GoogleAnalytics.tsx # GA 컴포넌트
├── lib/                  # 유틸리티 함수
└── public/               # 정적 파일
```

### 새로운 도구 추가
1. `app/tools/[tool-name]/page.tsx` 생성
2. 메타데이터 설정
3. `components/UtilityGrid.tsx`에 추가
4. 이벤트 추적 함수 추가

### 스타일링
- Tailwind CSS v4 사용
- `components/ui/Button.tsx` 참고
- 반응형 디자인 필수

## 🌐 도메인 설정

### Vercel에서 커스텀 도메인 연결
1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 도메인 추가 및 DNS 설정
3. SSL 인증서 자동 발급

### 권장 도메인
- `utility-tools.com`
- `file-converter.kr`
- `sh-tools.com`

## 📈 SEO 최적화

- 각 페이지별 메타데이터 설정
- Open Graph 및 Twitter Cards
- 구조화된 데이터 (Schema.org)
- 사이트맵 자동 생성

## 🔒 보안

- 파일 업로드 제한 (크기, 형식)
- 임시 저장소 사용 (24-48시간 자동 삭제)
- 민감 데이터 처리 금지
- SSL 암호화

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

- 이메일: contact@sh-tools.com
- GitHub Issues: [이슈 등록](https://github.com/siempre4545-lgtm/sh-utility-builder/issues)

---

**SH Tools** - 빠르고 안전한 파일 변환의 새로운 경험을 제공합니다.