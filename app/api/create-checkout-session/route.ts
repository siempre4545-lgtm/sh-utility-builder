import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Stripe는 환경변수가 있을 때만 초기화
let stripe: any = null
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe')
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  })
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Stripe Checkout Session Creation Started ===')
    
    // Stripe 초기화 확인
    if (!stripe) {
      console.error('❌ Stripe not initialized - STRIPE_SECRET_KEY missing')
      return NextResponse.json({ 
        error: 'Stripe not configured. Please contact support.' 
      }, { status: 500 })
    }

    const { priceId, userId } = await request.json()
    console.log('📝 Request data:', { priceId, userId })

    // Price ID 유효성 검사
    if (!priceId) {
      console.error('❌ Price ID is missing')
      return NextResponse.json({ 
        error: 'Price ID is required' 
      }, { status: 400 })
    }

    if (priceId.includes('placeholder')) {
      console.error('❌ Price ID is placeholder:', priceId)
      return NextResponse.json({ 
        error: 'Payment system not yet configured. Please try again later.' 
      }, { status: 400 })
    }

    // Site URL 확인
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) {
      console.error('❌ NEXT_PUBLIC_SITE_URL not configured')
      return NextResponse.json({ 
        error: 'Site configuration error' 
      }, { status: 500 })
    }

    console.log('✅ Environment check passed')
    console.log('🔗 Site URL:', siteUrl)
    console.log('💰 Creating Stripe session for price:', priceId)

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        userId: userId || 'anonymous',
        plan: priceId.includes('monthly') ? 'monthly' : 'yearly',
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      // customer_creation은 subscription 모드에서 사용할 수 없음
      // subscription 모드에서는 자동으로 고객이 생성됨
    }

    console.log('🔧 Stripe session config:', JSON.stringify(sessionConfig, null, 2))

    // Stripe 세션 생성 시도
    let session
    try {
      session = await stripe.checkout.sessions.create(sessionConfig)
      console.log('✅ Stripe session created successfully:', session.id)
      console.log('🔗 Session URL:', session.url)
    } catch (stripeError) {
      console.error('❌ Stripe API error:', stripeError)
      throw stripeError
    }

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('❌ Stripe checkout session creation error:', error)
    
    // Stripe 오류 타입별 처리
    if (error instanceof Error) {
      console.error('❌ Error message:', error.message)
      console.error('❌ Error stack:', error.stack)
      
      if (error.message.includes('No such price')) {
        console.error('❌ Invalid price ID:', error.message)
        return NextResponse.json({ 
          error: 'Invalid price configuration. Please contact support.' 
        }, { status: 400 })
      }
      
      if (error.message.includes('Invalid API key')) {
        console.error('❌ Invalid Stripe API key')
        return NextResponse.json({ 
          error: 'Payment system configuration error. Please contact support.' 
        }, { status: 500 })
      }
    }
    
    console.error('❌ Unknown error occurred')
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
