import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// LemonSqueezy 웹훅 시크릿 (환경 변수에서 가져옴)
const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET

// 웹훅 이벤트 처리 캐시 (중복 처리 방지)
const processedEvents = new Set<string>()

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

// 웹훅 서명 검증 함수
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) {
    console.warn('⚠️ LEMONSQUEEZY_WEBHOOK_SECRET이 설정되지 않았습니다.')
    return false
  }

  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload, 'utf8')
      .digest('hex')
    
    const receivedSignature = signature.replace('sha256=', '')
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(receivedSignature, 'hex')
    )
  } catch (error) {
    console.error('❌ 웹훅 서명 검증 오류:', error)
    return false
  }
}

// 이벤트 처리 함수들
async function handleOrderCreated(event: any) {
  console.log('🛒 주문 생성됨:', {
    orderId: event.data.id,
    customerEmail: event.data.attributes.user_email,
    total: event.data.attributes.total,
    status: event.data.attributes.status,
    productName: event.data.attributes.product_name
  })

  // 여기에 주문 생성 시 처리할 로직 추가
  // 예: 사용자에게 환영 이메일 발송, Pro 권한 부여 등
}

async function handleSubscriptionCreated(event: any) {
  console.log('🎉 구독 생성됨:', {
    subscriptionId: event.data.id,
    customerEmail: event.data.attributes.user_email,
    productName: event.data.attributes.product_name,
    status: event.data.attributes.status,
    renewsAt: event.data.attributes.renews_at
  })

  // 여기에 구독 생성 시 처리할 로직 추가
  // 예: Pro 권한 부여, 환영 이메일 발송 등
}

async function handleSubscriptionUpdated(event: any) {
  console.log('🔄 구독 업데이트됨:', {
    subscriptionId: event.data.id,
    customerEmail: event.data.attributes.user_email,
    status: event.data.attributes.status,
    renewsAt: event.data.attributes.renews_at
  })

  // 여기에 구독 업데이트 시 처리할 로직 추가
  // 예: 구독 상태에 따른 권한 조정 등
}

async function handleSubscriptionCancelled(event: any) {
  console.log('❌ 구독 취소됨:', {
    subscriptionId: event.data.id,
    customerEmail: event.data.attributes.user_email,
    cancelledAt: event.data.attributes.cancelled_at,
    endsAt: event.data.attributes.ends_at
  })

  // 여기에 구독 취소 시 처리할 로직 추가
  // 예: Pro 권한 제거, 취소 확인 이메일 발송 등
}

async function handleSubscriptionResumed(event: any) {
  console.log('✅ 구독 재개됨:', {
    subscriptionId: event.data.id,
    customerEmail: event.data.attributes.user_email,
    status: event.data.attributes.status,
    renewsAt: event.data.attributes.renews_at
  })

  // 여기에 구독 재개 시 처리할 로직 추가
  // 예: Pro 권한 복원, 재개 확인 이메일 발송 등
}

async function handleSubscriptionExpired(event: any) {
  console.log('⏰ 구독 만료됨:', {
    subscriptionId: event.data.id,
    customerEmail: event.data.attributes.user_email,
    expiredAt: event.data.attributes.expired_at
  })

  // 여기에 구독 만료 시 처리할 로직 추가
  // 예: Pro 권한 제거, 만료 알림 이메일 발송 등
}

// 메인 웹훅 처리 함수
export async function POST(request: NextRequest) {
  try {
    console.log('🔔 LemonSqueezy 웹훅 수신됨')

    // 요청 본문 읽기
    const body = await request.text()
    const signature = request.headers.get('x-signature') || ''

    // 웹훅 서명 검증
    if (!verifyWebhookSignature(body, signature, webhookSecret || '')) {
      console.error('❌ 웹훅 서명 검증 실패')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // JSON 파싱
    const event = JSON.parse(body)
    console.log('📝 웹훅 이벤트:', {
      type: event.meta.event_name,
      id: event.meta.event_id
    })

    // 중복 처리 방지
    const eventId = event.meta.event_id
    if (processedEvents.has(eventId)) {
      console.log('⚠️ 이미 처리된 이벤트입니다:', eventId)
      return NextResponse.json({ received: true })
    }
    processedEvents.add(eventId)

    // 이벤트 타입에 따른 처리
    switch (event.meta.event_name) {
      case 'order_created':
        await handleOrderCreated(event)
        break

      case 'subscription_created':
        await handleSubscriptionCreated(event)
        break

      case 'subscription_updated':
        await handleSubscriptionUpdated(event)
        break

      case 'subscription_cancelled':
        await handleSubscriptionCancelled(event)
        break

      case 'subscription_resumed':
        await handleSubscriptionResumed(event)
        break

      case 'subscription_expired':
        await handleSubscriptionExpired(event)
        break

      default:
        console.log('ℹ️ 처리되지 않은 이벤트 타입:', event.meta.event_name)
    }

    console.log('✅ 웹훅 처리 완료:', event.meta.event_name)
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('❌ 웹훅 처리 오류:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// GET 요청 처리 (웹훅 URL 테스트용)
export async function GET() {
  return NextResponse.json({
    message: 'LemonSqueezy webhook endpoint is active',
    timestamp: new Date().toISOString(),
    events: [
      'order_created',
      'subscription_created',
      'subscription_updated',
      'subscription_cancelled',
      'subscription_resumed',
      'subscription_expired'
    ]
  })
}
