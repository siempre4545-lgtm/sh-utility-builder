import { NextRequest, NextResponse } from 'next/server'

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

    // Slack 알림 (선택사항)
    if (process.env.SLACK_WEBHOOK_URL) {
      const slackMessage = {
        text: '🚨 SH Tools API Error',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '🚨 API Error Report',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Error:*\n${errorData.message}`,
              },
              {
                type: 'mrkdwn',
                text: `*Endpoint:*\n${errorData.apiEndpoint || 'Unknown'}`,
              },
              {
                type: 'mrkdwn',
                text: `*Files:*\n${errorData.fileCount || 0} files, ${errorData.totalSize ? (errorData.totalSize / 1024 / 1024).toFixed(2) + 'MB' : 'Unknown size'}`,
              },
              {
                type: 'mrkdwn',
                text: `*Pro User:*\n${errorData.isPro ? 'Yes' : 'No'}`,
              },
            ],
          },
        ],
      }

      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slackMessage),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking failed:', error)
    return NextResponse.json(
      { error: 'Failed to track error' },
      { status: 500 }
    )
  }
}
