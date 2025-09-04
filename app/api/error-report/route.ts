import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const errorReport = await request.json()

    // Slack 웹훅 URL (환경변수에서 가져오기)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    if (!slackWebhookUrl) {
      console.error('Slack webhook URL not configured')
      return NextResponse.json({ error: 'Slack webhook not configured' }, { status: 500 })
    }

    // Slack 메시지 포맷
    const slackMessage = {
      text: '🚨 SH Tools Error Report',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🚨 Error Report',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Message:*\n${errorReport.message}`,
            },
            {
              type: 'mrkdwn',
              text: `*URL:*\n${errorReport.url}`,
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${errorReport.timestamp}`,
            },
            {
              type: 'mrkdwn',
              text: `*User Agent:*\n${errorReport.userAgent}`,
            },
          ],
        },
        ...(errorReport.stack ? [{
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Stack Trace:*\n\`\`\`${errorReport.stack}\`\`\``,
          },
        }] : []),
      ],
    }

    // Slack으로 전송
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    })

    if (!response.ok) {
      throw new Error(`Slack webhook failed: ${response.statusText}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reporting failed:', error)
    return NextResponse.json(
      { error: 'Failed to report error' },
      { status: 500 }
    )
  }
}
