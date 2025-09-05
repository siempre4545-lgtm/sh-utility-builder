# Stripe 설정 가이드

## 1. Stripe 대시보드 설정

### Test Mode 설정 (개발용)
1. **Stripe 대시보드** 접속: https://dashboard.stripe.com
2. **Test mode** 토글 활성화
3. **Developers** → **API keys**에서 키 복사

### Products & Pricing 생성
1. **Products** → **Add product** 클릭
2. **Product name**: "SH Tools Pro"
3. **Pricing model**: "Recurring"
4. **Price**: 월간 ₩9,900, 연간 ₩99,000
5. **Billing period**: Monthly/Yearly
6. **Price ID** 복사 (price_xxx 형태)

## 2. Vercel 환경 변수 설정

### Production 환경 변수
Vercel 대시보드 → Settings → Environment Variables에서 설정:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_1...
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_1...
NEXT_PUBLIC_SITE_URL=https://sh-utility-builder.vercel.app
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Preview 환경 변수
동일한 변수들을 Preview 환경에도 설정

## 3. Webhook 설정

### Webhook 엔드포인트 생성
1. **Stripe 대시보드** → **Developers** → **Webhooks**
2. **Add endpoint** 클릭
3. **Endpoint URL**: `https://sh-utility-builder.vercel.app/api/webhooks/stripe`
4. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### Webhook Secret 복사
1. Webhook 생성 후 **Signing secret** 복사
2. Vercel 환경 변수에 `STRIPE_WEBHOOK_SECRET`로 설정

## 4. 테스트 카드 번호

### 성공 케이스
- **4242 4242 4242 4242** (Visa)
- **4000 0566 5566 5556** (Visa Debit)
- **5555 5555 5555 4444** (Mastercard)

### 3D Secure 테스트
- **4000 0025 0000 3155** (3D Secure 인증 필요)

### 실패 케이스
- **4000 0000 0000 0002** (카드 거절)
- **4000 0000 0000 9995** (잔액 부족)

## 5. 확인 사항

### 모드 일치 확인
- 모든 키가 **Test mode**에서 생성되었는지 확인
- **Live mode**와 **Test mode** 키가 섞여있지 않은지 확인

### Price ID 확인
- Stripe 대시보드에서 복사한 정확한 Price ID 사용
- 다른 계정의 Price ID가 아닌지 확인

### URL 확인
- 성공 URL: `https://sh-utility-builder.vercel.app/success`
- 취소 URL: `https://sh-utility-builder.vercel.app/cancel`
- Webhook URL: `https://sh-utility-builder.vercel.app/api/webhooks/stripe`

## 6. 배포 후 확인

### 환경 변수 재배포
환경 변수 변경 후 반드시 **Redeploy** 실행

### 로그 확인
Vercel 대시보드 → Functions → create-checkout-session 로그 확인

### 테스트 결제
1. Pro 업그레이드 버튼 클릭
2. 테스트 카드 번호 입력
3. 결제 완료 확인
4. Webhook 이벤트 수신 확인
