import { NextRequest, NextResponse } from 'next/server'

// Stripe는 환경변수가 있을 때만 초기화
let stripe: any = null
if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe')
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  })
}

export async function POST(request: NextRequest) {
  try {
    // Stripe 초기화 확인
    if (!stripe) {
      console.error('Stripe not initialized - STRIPE_SECRET_KEY missing')
      return NextResponse.json({ 
        error: 'Stripe not configured. Please contact support.' 
      }, { status: 500 })
    }

    const { priceId, userId } = await request.json()

    // Price ID 유효성 검사
    if (!priceId) {
      return NextResponse.json({ 
        error: 'Price ID is required' 
      }, { status: 400 })
    }

    if (priceId.includes('placeholder')) {
      return NextResponse.json({ 
        error: 'Payment system not yet configured. Please try again later.' 
      }, { status: 400 })
    }

    // Site URL 확인
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    if (!siteUrl) {
      console.error('NEXT_PUBLIC_SITE_URL not configured')
      return NextResponse.json({ 
        error: 'Site configuration error' 
      }, { status: 500 })
    }

    console.log('Creating Stripe session for price:', priceId)

    const session = await stripe.checkout.sessions.create({
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
      customer_creation: 'always',
    })

    console.log('Stripe session created:', session.id)
    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout session creation error:', error)
    
    // Stripe 오류 타입별 처리
    if (error instanceof Error) {
      if (error.message.includes('No such price')) {
        return NextResponse.json({ 
          error: 'Invalid price configuration. Please contact support.' 
        }, { status: 400 })
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
