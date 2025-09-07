interface SlackMessage {
  text: string
  blocks?: any[]
  attachments?: any[]
}

interface ErrorDetails {
  error: string
  stack?: string
  url?: string
  userAgent?: string
  timestamp: string
  userId?: string
  sessionId?: string
}

export class SlackNotifier {
  private webhookUrl: string

  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL || ''
  }

  private async sendMessage(message: SlackMessage): Promise<boolean> {
    if (!this.webhookUrl) {
      console.warn('Slack webhook URL not configured')
      return false
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      return response.ok
    } catch (error) {
      console.error('Failed to send Slack notification:', error)
      return false
    }
  }

  async sendErrorNotification(errorDetails: ErrorDetails): Promise<boolean> {
    const message: SlackMessage = {
      text: `🚨 SH Tools Error Alert`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🚨 SH Tools Error Alert',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Error:*\n\`\`\`${errorDetails.error}\`\`\``,
            },
            {
              type: 'mrkdwn',
              text: `*URL:*\n${errorDetails.url || 'Unknown'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${errorDetails.timestamp}`,
            },
            {
              type: 'mrkdwn',
              text: `*User Agent:*\n${errorDetails.userAgent || 'Unknown'}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Stack Trace:*\n\`\`\`${errorDetails.stack || 'No stack trace'}\`\`\``,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Vercel Logs',
              },
              url: 'https://vercel.com/dashboard',
              style: 'primary',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Site',
              },
              url: 'https://sh-utility-builder.vercel.app',
            },
          ],
        },
      ],
    }

    return this.sendMessage(message)
  }

  async sendPerformanceAlert(metrics: {
    page: string
    loadTime: number
    threshold: number
    timestamp: string
  }): Promise<boolean> {
    const message: SlackMessage = {
      text: `⚠️ SH Tools Performance Alert`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '⚠️ Performance Alert',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Page:*\n${metrics.page}`,
            },
            {
              type: 'mrkdwn',
              text: `*Load Time:*\n${metrics.loadTime}ms`,
            },
            {
              type: 'mrkdwn',
              text: `*Threshold:*\n${metrics.threshold}ms`,
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${metrics.timestamp}`,
            },
          ],
        },
      ],
    }

    return this.sendMessage(message)
  }

  async sendPaymentNotification(paymentDetails: {
    amount: number
    currency: string
    plan: string
    customerEmail: string
    timestamp: string
  }): Promise<boolean> {
    const message: SlackMessage = {
      text: `💰 New Pro Subscription`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '💰 New Pro Subscription',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Plan:*\n${paymentDetails.plan}`,
            },
            {
              type: 'mrkdwn',
              text: `*Amount:*\n${paymentDetails.amount} ${paymentDetails.currency}`,
            },
            {
              type: 'mrkdwn',
              text: `*Customer:*\n${paymentDetails.customerEmail}`,
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${paymentDetails.timestamp}`,
            },
          ],
        },
      ],
    }

    return this.sendMessage(message)
  }

  async sendUptimeAlert(alertDetails: {
    status: 'up' | 'down'
    duration?: number
    timestamp: string
  }): Promise<boolean> {
    const emoji = alertDetails.status === 'up' ? '✅' : '🔴'
    const message: SlackMessage = {
      text: `${emoji} SH Tools Uptime Alert`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `${emoji} Uptime Alert`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Status:*\n${alertDetails.status.toUpperCase()}`,
            },
            {
              type: 'mrkdwn',
              text: `*Duration:*\n${alertDetails.duration ? `${alertDetails.duration}ms` : 'N/A'}`,
            },
            {
              type: 'mrkdwn',
              text: `*Timestamp:*\n${alertDetails.timestamp}`,
            },
          ],
        },
      ],
    }

    return this.sendMessage(message)
  }
}

// 싱글톤 인스턴스
export const slackNotifier = new SlackNotifier()
