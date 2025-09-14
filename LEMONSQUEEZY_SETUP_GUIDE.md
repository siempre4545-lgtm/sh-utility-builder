# LemonSqueezy 설정 가이드

## 1. LemonSqueezy 계정 설정

### 1.1 계정 생성
1. [LemonSqueezy](https://lemonsqueezy.com)에 가입
2. 이메일 인증 완료
3. 스토어 생성

### 1.2 스토어 설정
1. **스토어 이름**: SH Tools
2. **도메인**: sh-utility-builder.vercel.app
3. **통화**: KRW (한국 원화)

## 2. 제품 및 가격 설정

### 2.1 월간 플랜 제품 생성
1. **제품 이름**: SH Tools Pro - 월간
2. **설명**: 
   ```
   SH Tools Pro 월간 구독
   - 무제한 파일 처리
   - 고급 기능 사용
   - 광고 제거
   - 우선 지원
   ```
3. **가격**: ₩7,900/월
4. **구독 주기**: 월간
5. **제품 유형**: 구독

### 2.2 연간 플랜 제품 생성
1. **제품 이름**: SH Tools Pro - 연간
2. **설명**: 
   ```
   SH Tools Pro 연간 구독 (2개월 무료!)
   - 무제한 파일 처리
   - 고급 기능 사용
   - 광고 제거
   - 우선 지원
   ```
3. **가격**: ₩79,000/년
4. **구독 주기**: 연간
5. **제품 유형**: 구독

## 3. Buy Link 생성

### 3.1 월간 플랜 Buy Link
1. 제품 페이지에서 "Buy Link" 생성
2. 링크 복사 (예: `https://shtools.lemonsqueezy.com/checkout/buy/abc123`)
3. `.env.local`에 추가:
   ```
   NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_BUY_LINK=https://shtools.lemonsqueezy.com/checkout/buy/abc123
   ```

### 3.2 연간 플랜 Buy Link
1. 제품 페이지에서 "Buy Link" 생성
2. 링크 복사 (예: `https://shtools.lemonsqueezy.com/checkout/buy/def456`)
3. `.env.local`에 추가:
   ```
   NEXT_PUBLIC_LEMONSQUEEZY_YEARLY_BUY_LINK=https://shtools.lemonsqueezy.com/checkout/buy/def456
   ```

## 4. 웹훅 설정

### 4.1 웹훅 URL 설정
1. LemonSqueezy 대시보드 → Settings → Webhooks
2. "Create Webhook" 클릭
3. 웹훅 URL 입력:
   ```
   https://sh-utility-builder.vercel.app/api/webhooks/lemonsqueezy
   ```

### 4.2 웹훅 이벤트 선택
다음 이벤트들을 선택:
- ✅ `order_created` - 주문 생성 시
- ✅ `subscription_created` - 구독 생성 시
- ✅ `subscription_updated` - 구독 업데이트 시
- ✅ `subscription_cancelled` - 구독 취소 시
- ✅ `subscription_resumed` - 구독 재개 시
- ✅ `subscription_expired` - 구독 만료 시

### 4.3 웹훅 시크릿 설정
1. 웹훅 생성 후 "Webhook Secret" 복사
2. `.env.local`에 추가:
   ```
   LEMONSQUEEZY_WEBHOOK_SECRET=whsec_실제시크릿값
   ```
3. Vercel 환경 변수에도 동일하게 추가

### 4.4 웹훅 테스트
1. 웹훅 생성 후 "Test Webhook" 클릭
2. 테스트 이벤트가 정상적으로 수신되는지 확인
3. Vercel 로그에서 웹훅 처리 로그 확인

## 5. 결제 방법 설정

### 5.1 지원 결제 방법
- 신용카드 (Visa, Mastercard, American Express)
- PayPal
- Apple Pay
- Google Pay

### 5.2 세금 설정
- 한국 VAT: 10% (필요시)
- 세금 포함 가격으로 설정 권장

## 6. 테스트 설정

### 6.1 테스트 모드
1. LemonSqueezy 대시보드에서 "Test Mode" 활성화
2. 테스트 카드 번호 사용:
   - Visa: 4242 4242 4242 4242
   - 만료일: 미래 날짜
   - CVC: 임의 3자리

### 6.2 테스트 Buy Link
- 테스트 모드에서 생성된 Buy Link 사용
- 실제 결제는 발생하지 않음

## 7. 프로덕션 배포 (정식 승인 후)

### 7.1 LemonSqueezy 정식 승인 확인
1. LemonSqueezy 대시보드에서 계정 상태 확인
2. "Test Mode" 버튼이 비활성화 가능한 상태인지 확인
3. 모든 제품이 "Live" 상태인지 확인

### 7.2 프로덕션 Buy Link 생성
1. **월간 플랜**:
   - 제품 페이지에서 "Live" Buy Link 생성
   - URL 예시: `https://shtools.lemonsqueezy.com/checkout/buy/실제월간링크`
   
2. **연간 플랜**:
   - 제품 페이지에서 "Live" Buy Link 생성  
   - URL 예시: `https://shtools.lemonsqueezy.com/checkout/buy/실제연간링크`

### 7.3 프로덕션 웹훅 설정
1. 기존 테스트 웹훅 삭제 또는 비활성화
2. 새로운 프로덕션 웹훅 생성:
   - URL: `https://sh-utility-builder.vercel.app/api/webhooks/lemonsqueezy`
   - 이벤트: `order_created`, `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_resumed`, `subscription_expired`
3. 웹훅 시크릿 복사 (예: `whsec_실제웹훅시크릿`)

### 7.4 Vercel 환경 변수 업데이트
Vercel 대시보드 → Project Settings → Environment Variables에서 업데이트:
```
NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_BUY_LINK=https://shtools.lemonsqueezy.com/checkout/buy/실제월간링크
NEXT_PUBLIC_LEMONSQUEEZY_YEARLY_BUY_LINK=https://shtools.lemonsqueezy.com/checkout/buy/실제연간링크
LEMONSQUEEZY_WEBHOOK_SECRET=whsec_실제웹훅시크릿
```

### 7.5 테스트 모드 비활성화
1. LemonSqueezy 대시보드에서 "Test Mode" 토글을 OFF로 변경
2. 실제 결제가 활성화됨을 확인
3. 프로덕션 Buy Link로 테스트 결제 진행

### 7.6 배포 및 테스트
1. Vercel에서 자동 배포 확인
2. 프로덕션 사이트에서 결제 플로우 테스트
3. 웹훅 이벤트 수신 확인

## 8. 모니터링 및 분석

### 8.1 LemonSqueezy 대시보드
- 매출 현황
- 구독자 수
- 환불률
- 지표 분석

### 8.2 Google Analytics 연동
- 결제 완료 이벤트 추적
- 구독 전환율 분석
- 사용자 행동 분석

## 9. 고객 지원

### 9.1 구독 관리
- 고객이 직접 구독 취소 가능
- 환불 정책 설정
- 고객 지원 채널 연결

### 9.2 이메일 알림
- 결제 완료 알림
- 구독 갱신 알림
- 구독 취소 알림

## 10. 보안 및 컴플라이언스

### 10.1 PCI DSS 준수
- LemonSqueezy가 PCI DSS Level 1 인증 보유
- 카드 정보 직접 처리 불필요

### 10.2 GDPR 준수
- 개인정보 처리 방침 업데이트
- 데이터 삭제 요청 처리
- 쿠키 정책 설정

---

## 빠른 시작 체크리스트

### 테스트 단계
- [ ] LemonSqueezy 계정 생성
- [ ] 스토어 설정 완료
- [ ] 월간/연간 제품 생성
- [ ] 테스트 Buy Link 생성 및 환경 변수 설정
- [ ] 테스트 결제 완료
- [ ] 웹훅 테스트 완료

### 프로덕션 단계 (정식 승인 후)
- [ ] LemonSqueezy 정식 승인 확인
- [ ] 프로덕션 Buy Link 생성
- [ ] 프로덕션 웹훅 설정
- [ ] Vercel 환경 변수 업데이트
- [ ] 테스트 모드 비활성화
- [ ] 프로덕션 결제 테스트
- [ ] 모니터링 설정

## 문제 해결

### Buy Link가 작동하지 않는 경우
1. 환경 변수 확인
2. Buy Link URL 정확성 확인
3. 제품 상태 확인 (활성화됨)

### 결제가 실패하는 경우
1. 결제 방법 확인
2. 카드 한도 확인
3. LemonSqueezy 대시보드에서 오류 로그 확인
