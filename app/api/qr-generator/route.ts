import { NextRequest, NextResponse } from 'next/server'
import QRCode from 'qrcode'

export async function POST(request: NextRequest) {
  try {
    const { text, size = 256, format = 'png' } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'QR 코드로 변환할 텍스트가 필요합니다.' }, { status: 400 })
    }

    const options = {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }

    let qrCodeData: string

    if (format === 'svg') {
      qrCodeData = await QRCode.toString(text, { ...options, type: 'svg' })
    } else {
      qrCodeData = await QRCode.toDataURL(text, options)
    }

    return NextResponse.json({
      success: true,
      data: qrCodeData,
      format,
      size
    })

  } catch (error) {
    console.error('QR 코드 생성 오류:', error)
    return NextResponse.json(
      { error: 'QR 코드 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
