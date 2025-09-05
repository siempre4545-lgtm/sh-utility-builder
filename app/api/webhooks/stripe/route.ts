import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
import Stripe from 'stripe'

// Stripe 초기화
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

// Idempotency 처리를 위한 메모리 캐시 (실제 환경에서는 Redis 사용 권장)
const processedEvents = new Set<string>()

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Idempotency 처리 - 같은 이벤트 중복 처리 방지
  const eventId = event.id
  if (processedEvents.has(eventId)) {
    console.log(`Event ${eventId} already processed, skipping`)
    return NextResponse.json({ received: true })
  }

  // 이벤트 ID를 처리된 목록에 추가
  processedEvents.add(eventId)

  // 이벤트 타입별 처리
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      await handleCheckoutCompleted(session)
      break

    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription
      await handleSubscriptionCreated(subscription)
      break

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription
      await handleSubscriptionUpdated(updatedSubscription)
      break

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription
      await handleSubscriptionDeleted(deletedSubscription)
      break

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice
      await handlePaymentSucceeded(invoice)
      break

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice
      await handlePaymentFailed(failedInvoice)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// 결제 완료 처리
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id)
  
  // 여기서 사용자 계정에 Pro 권한 부여
  // 예: 데이터베이스 업데이트, 사용자 상태 변경 등
  
  // 이메일 발송 (선택사항)
  if (session.customer_email) {
    // 결제 완료 이메일 발송 로직
    console.log('Sending confirmation email to:', session.customer_email)
  }
}

// 구독 생성 처리
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id)
  
  // 사용자 계정에 Pro 구독 상태 저장
  // 예: 데이터베이스에 구독 정보 저장
}

// 구독 업데이트 처리
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id)
  
  // 구독 상태 변경 처리
  // 예: 플랜 변경, 일시정지 등
}

// 구독 취소 처리
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id)
  
  // 사용자 계정에서 Pro 권한 제거
  // 예: 데이터베이스에서 구독 상태 업데이트
}

// 결제 성공 처리
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded:', invoice.id)
  
  // 정기 결제 성공 처리
  // 예: 구독 연장, 사용자 상태 업데이트
}

// 결제 실패 처리
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed:', invoice.id)
  
  // 결제 실패 처리
  // 예: 사용자에게 알림, 구독 상태 변경
}
