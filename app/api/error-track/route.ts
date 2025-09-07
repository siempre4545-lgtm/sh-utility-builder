import { NextRequest, NextResponse } from 'next/server'
import { slackNotifier } from '@/lib/slack-notifications'

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json()

    // Vercel Logs에 에러 기록
    console.error('API Error:', {
      message: errorData.message,
      stack: errorData.stack,
      endpoint: errorData.apiEndpoint,
      fileCount: errorData.fileCount,
      totalSize: errorData.totalSize,
      isPro: errorData.isPro,
      userAgent: errorData.userAgent,
      url: errorData.url,
      timestamp: errorData.timestamp
    })

    // Slack 알림 전송
    await slackNotifier.sendErrorNotification({
      error: errorData.message,
      stack: errorData.stack,
      url: errorData.url,
      userAgent: errorData.userAgent,
      timestamp: errorData.timestamp || new Date().toISOString(),
      userId: errorData.userId,
      sessionId: errorData.sessionId
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking failed:', error)
    return NextResponse.json(
      { error: 'Failed to track error' },
      { status: 500 }
    )
  }
}
