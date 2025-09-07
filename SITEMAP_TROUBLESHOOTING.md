# 사이트맵 연결 상태 문제 해결 가이드

## 🚨 문제: "가져올 수 없음" 오류

### **원인 분석**
사이트맵 연결 상태가 "가져올 수 없음"으로 표기되는 주요 원인들:

1. **사이트맵 파일 접근 불가**
   - 파일이 존재하지 않음
   - 잘못된 URL 경로
   - 서버 오류 (404, 500 등)

2. **사이트맵 형식 오류**
   - XML 형식이 올바르지 않음
   - 필수 태그 누락
   - 인코딩 문제

3. **robots.txt 문제**
   - 사이트맵 참조 누락
   - 잘못된 사이트맵 URL

4. **빌드/배포 문제**
   - 사이트맵 생성 실패
   - 배포 시 파일 누락

## 🔧 해결 방법

### **1단계: 현재 상태 진단**

#### **자동 진단 실행**
```bash
npm run test:sitemap
```

#### **수동 확인**
1. **브라우저에서 직접 접근**:
   ```
   https://sh-utility-builder.vercel.app/sitemap.xml
   ```

2. **robots.txt 확인**:
   ```
   https://sh-utility-builder.vercel.app/robots.txt
   ```

### **2단계: 사이트맵 재생성**

#### **방법 1: next-sitemap 사용 (권장)**
```bash
npm run sitemap
```

#### **방법 2: 수동 생성**
```bash
npm run generate:sitemap
```

#### **방법 3: 전체 빌드**
```bash
npm run build:sitemap
```

### **3단계: 배포 및 확인**

#### **배포 실행**
```bash
git add .
git commit -m "fix: 사이트맵 연결 상태 문제 해결"
git push origin main
```

#### **배포 후 확인**
1. **5-10분 대기**: Vercel 배포 완료 대기
2. **사이트맵 접근 테스트**: 브라우저에서 직접 접근
3. **구글 서치 콘솔**: 사이트맵 다시 제출

## 📋 사이트맵 설정 최적화

### **next-sitemap.config.js 개선사항**

#### **기본 설정**
```javascript
module.exports = {
  siteUrl: 'https://sh-utility-builder.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*', '/success', '/cancel'],
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
}
```

#### **robots.txt 설정**
```javascript
robotsTxtOptions: {
  policies: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/success', '/cancel'],
    },
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/api/', '/admin/', '/success', '/cancel'],
    },
    {
      userAgent: 'Yeti', // 네이버 검색로봇
      allow: '/',
      disallow: ['/api/', '/admin/', '/success', '/cancel'],
    },
  ],
  additionalSitemaps: [
    'https://sh-utility-builder.vercel.app/sitemap.xml',
  ],
  host: 'https://sh-utility-builder.vercel.app',
}
```

## 🧪 테스트 및 검증

### **사이트맵 테스트 스크립트**

#### **실행 방법**
```bash
npm run test:sitemap
```

#### **테스트 항목**
- ✅ 사이트맵 파일 접근성
- ✅ XML 형식 유효성
- ✅ 포함된 URL 개수
- ✅ 예상 URL 포함 여부
- ✅ robots.txt 사이트맵 참조
- ✅ 로컬 파일 존재 여부

### **수동 검증 방법**

#### **1. XML 형식 검증**
```bash
# 브라우저에서 사이트맵 접근 후 XML 형식 확인
https://sh-utility-builder.vercel.app/sitemap.xml
```

#### **2. URL 개수 확인**
- 예상 URL 개수: 12개
- 포함된 페이지: 홈, 도구, FAQ, 연락처, 개인정보처리방침, 이용약관

#### **3. robots.txt 확인**
```bash
# robots.txt에서 사이트맵 참조 확인
https://sh-utility-builder.vercel.app/robots.txt
```

## 🚀 구글 서치 콘솔 설정

### **사이트맵 제출 방법**

#### **1. 구글 서치 콘솔 접속**
```
https://search.google.com/search-console/
```

#### **2. 사이트맵 제출**
1. **사이드바** → **색인** → **사이트맵**
2. **새 사이트맵 추가** 클릭
3. **사이트맵 URL 입력**: `sitemap.xml`
4. **제출** 클릭

#### **3. 상태 확인**
- ✅ **성공**: 사이트맵이 성공적으로 처리됨
- ⚠️ **경고**: 일부 URL에 문제가 있음
- ❌ **오류**: 사이트맵 처리 실패

### **문제 해결 단계**

#### **"가져올 수 없음" 오류 시**
1. **사이트맵 URL 확인**: `https://sh-utility-builder.vercel.app/sitemap.xml`
2. **직접 접근 테스트**: 브라우저에서 사이트맵 접근
3. **XML 형식 확인**: 올바른 XML 형식인지 확인
4. **재제출**: 구글 서치 콘솔에서 사이트맵 다시 제출

#### **"일부 URL에 문제가 있음" 경고 시**
1. **URL 검사 도구 사용**: 문제가 있는 URL 확인
2. **페이지 접근성 확인**: 404 오류나 접근 불가 페이지 확인
3. **사이트맵에서 제외**: 문제가 있는 URL을 사이트맵에서 제외

## 📊 모니터링 및 유지보수

### **정기적인 확인 사항**

#### **주간 확인**
- [ ] 사이트맵 접근성 확인
- [ ] 구글 서치 콘솔 상태 확인
- [ ] 색인된 페이지 수 확인

#### **월간 확인**
- [ ] 사이트맵 URL 개수 확인
- [ ] 새로운 페이지 사이트맵 추가
- [ ] robots.txt 업데이트

#### **분기별 확인**
- [ ] 사이트맵 성능 분석
- [ ] 검색 노출 현황 확인
- [ ] 최적화 계획 수립

### **자동화 스크립트**

#### **사이트맵 재생성 스크립트**
```bash
#!/bin/bash
# sitemap-regenerate.sh

echo "🔄 사이트맵 재생성 시작..."
npm run sitemap
echo "✅ 사이트맵 재생성 완료"

echo "🧪 사이트맵 테스트 시작..."
npm run test:sitemap
echo "✅ 사이트맵 테스트 완료"

echo "📤 배포 시작..."
git add .
git commit -m "chore: 사이트맵 재생성 및 테스트"
git push origin main
echo "✅ 배포 완료"
```

## 🔍 문제 해결 체크리스트

### **즉시 확인**
- [ ] 사이트맵 파일 존재 여부
- [ ] XML 형식 유효성
- [ ] robots.txt 사이트맵 참조
- [ ] Vercel 배포 상태

### **1시간 후**
- [ ] 사이트맵 접근성 재확인
- [ ] 구글 서치 콘솔 상태 확인
- [ ] 사이트맵 재제출

### **24시간 후**
- [ ] 색인 상태 확인
- [ ] 검색 노출 현황 확인
- [ ] 성능 데이터 분석

## 📞 지원 및 문의

### **기술 지원**
- **Vercel 지원**: https://vercel.com/support
- **Next.js 문서**: https://nextjs.org/docs
- **구글 서치 콘솔 도움말**: https://support.google.com/webmasters

### **문제 신고**
- **GitHub Issues**: 프로젝트 저장소 이슈 등록
- **이메일**: contact@shtools.com

---

## 📋 실행 체크리스트

### **즉시 실행**
- [ ] `npm run test:sitemap` 실행
- [ ] 문제 원인 파악
- [ ] `npm run sitemap` 실행
- [ ] 변경사항 배포

### **1시간 후**
- [ ] 사이트맵 접근성 확인
- [ ] 구글 서치 콘솔에서 사이트맵 재제출
- [ ] 상태 확인

### **24시간 후**
- [ ] 색인 상태 확인
- [ ] 검색 노출 현황 확인
- [ ] 성능 데이터 분석
