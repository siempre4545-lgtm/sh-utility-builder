# SH Utility Builder

풀스택 웹 유틸리티 빌더 - Next.js App Router + TypeScript + Node 런타임

한 화면에서 **업로드→처리→다운로드**까지 끝나는 초단순 유틸 페이지를 빠르게 생산하는 풀스택 웹 유틸리티 빌더입니다.

## 🚀 주요 특징

- **초고속 처리**: 모든 작업이 2초 이내 완료, 즉시 피드백
- **보안 우선**: 업로드는 메모리/임시 저장, 24-48시간 내 자동 삭제
- **단순함**: 복잡한 설정 없이 업로드→처리→다운로드까지 한 번에
- **반응형 디자인**: 모든 디바이스에서 완벽하게 작동
- **엄격한 타입 체크**: TypeScript로 런타임 오류 사전 방지
- **SEO 최적화**: SSR 메타/OG/스키마, i18n 구조 준비

## 🛠️ 기술 스택

### Frontend
- **Next.js 14** - App Router 기반의 최신 React 프레임워크
- **TypeScript** - 엄격한 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Framer Motion** - 부드러운 애니메이션
- **Lucide React** - 아이콘 라이브러리

### Backend
- **Node.js** - 서버 사이드 런타임
- **Sharp** - 고성능 이미지 처리
- **PDF-lib** - PDF 조작 및 변환
- **ExcelJS** - Excel 파일 처리
- **Multer** - 파일 업로드 미들웨어

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Jest** - 테스트 프레임워크
- **PostCSS** - CSS 후처리

## 📁 프로젝트 구조

```
sh_project/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 페이지
│   │   ├── globals.css        # 전역 스타일
│   │   └── tools/             # 유틸리티 도구들
│   │       └── image-resize/  # 이미지 리사이즈 도구
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── Header.tsx         # 헤더 컴포넌트
│   │   ├── Hero.tsx           # 히어로 섹션
│   │   ├── UtilityGrid.tsx    # 유틸리티 그리드
│   │   ├── Features.tsx       # 기능 소개
│   │   ├── Pricing.tsx        # 가격 정책
│   │   └── Footer.tsx         # 푸터
│   ├── lib/                    # 유틸리티 함수
│   │   └── utils.ts           # 공통 유틸리티
│   └── types/                  # TypeScript 타입 정의
│       └── index.ts           # 공통 타입
├── package.json                # 의존성 및 스크립트
├── next.config.js             # Next.js 설정
├── tailwind.config.js         # Tailwind CSS 설정
├── tsconfig.json              # TypeScript 설정
└── README.md                  # 프로젝트 문서
```

## 🚀 빠른 시작

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 2. 환경 변수 설정

```bash
# .env.local 파일 생성
cp env.example .env.local

# 필요한 환경 변수 설정
NEXT_PUBLIC_APP_URL=http://localhost:3000
MAX_FILE_SIZE=100MB
UPLOAD_DIR=./uploads
TEMP_DIR=./temp
```

### 3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 4. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 테스트 실행
npm run test
```

## 🎯 사용 가능한 도구들

### 이미지 처리
- **이미지 리사이즈** - 크기 조정 및 최적화
- **이미지 압축** - 용량 최적화
- **이미지 변환** - 포맷 변환 (WebP, AVIF 지원)

### 문서 처리
- **PDF 변환** - 다양한 포맷 지원
- **PDF 압축** - 파일 크기 최적화
- **PDF 병합/분할** - 페이지 조작

### 압축/압축해제
- **파일 압축** - ZIP, RAR, 7Z 지원
- **압축 해제** - 모든 포맷 지원

### 미디어 처리
- **비디오 변환** - 다양한 코덱 지원
- **오디오 추출** - 비디오에서 오디오 추출

### 개발 도구
- **JSON 포맷터** - 코드 정리 및 검증
- **Base64 인코더** - 인코딩/디코딩

## 💰 가격 정책

### 무료 플랜
- 일일 10개 파일 업로드
- 최대 10MB 파일 크기
- 기본 기능 사용
- 광고 표시

### Pro 플랜 (₩9,900/월)
- 무제한 파일 업로드
- 최대 100MB 파일 크기
- 모든 고급 기능
- 광고 없음
- 우선 순위 지원

### Enterprise 플랜
- 맞춤형 솔루션
- 팀 관리 및 권한 설정
- 전담 지원 매니저
- SLA 보장

## 🔒 보안 및 개인정보

- **파일 보안**: 업로드된 파일은 메모리에서만 처리
- **자동 삭제**: 24-48시간 내 자동 삭제
- **암호화**: 모든 전송 데이터 암호화
- **접근 제어**: 사용자별 권한 관리
- **감사 로그**: 모든 활동 기록 및 모니터링

## 🚫 금지 사항

다음과 같은 도구는 제공하지 않습니다:
- 저작권 침해 도구
- 플랫폼 다운로드 도구
- 성인 콘텐츠 관련 도구
- 의약품 관련 도구
- 도박성 도구

## 🧪 테스트

```bash
# 전체 테스트 실행
npm run test

# 테스트 감시 모드
npm run test:watch

# 커버리지 리포트
npm run test:coverage
```

## 📱 반응형 디자인

- **모바일 퍼스트** 접근법
- **터치 친화적** 인터페이스
- **접근성** 표준 준수 (ARIA 라벨, 키보드 포커스)
- **PWA** 지원 준비

## 🌍 국제화 (i18n)

- 한국어 (기본)
- 영어 지원
- 일본어 지원 준비
- 지역별 시간대 및 통화 지원

## 🔧 커스터마이징

### 테마 변경
`tailwind.config.js`에서 색상 및 디자인 토큰을 수정할 수 있습니다.

### 새로운 도구 추가
`src/app/tools/` 디렉토리에 새로운 도구를 추가하고, `src/components/UtilityGrid.tsx`에 등록하세요.

### API 확장
`src/app/api/` 디렉토리에 새로운 API 엔드포인트를 추가할 수 있습니다.

## 📊 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: 자동 코드 스플리팅
- **캐싱**: 정적 자산 및 API 응답 캐싱
- **CDN**: 글로벌 콘텐츠 전송 네트워크 지원

## 🚀 배포

### Vercel (권장)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t sh-utility-builder .
docker run -p 3000:3000 sh-utility-builder
```

### 기타 플랫폼
- Netlify
- AWS Amplify
- Google Cloud Run
- Azure Static Web Apps

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📞 지원

- **문서**: [docs.example.com](https://docs.example.com)
- **이메일**: support@example.com
- **커뮤니티**: [community.example.com](https://community.example.com)
- **GitHub Issues**: [GitHub Issues](https://github.com/example/sh-utility-builder/issues)

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들의 도움을 받았습니다:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/)

---

**SH Utility Builder**로 빠르고 안전한 웹 유틸리티를 만들어보세요! 🚀
