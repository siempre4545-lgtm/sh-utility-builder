import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const quality = parseInt(formData.get('quality') as string) || 90

    if (!files || files.length === 0) {
      return NextResponse.json({ error: '파일이 선택되지 않았습니다.' }, { status: 400 })
    }

    const processedFiles: { name: string; buffer: Buffer }[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      
      try {
        // WebP 파일을 JPEG로 변환
        const processedBuffer = await sharp(buffer)
          .jpeg({ quality, mozjpeg: true })
          .toBuffer()

        processedFiles.push({
          name: `${file.name.split('.')[0]}.jpg`,
          buffer: processedBuffer
        })
      } catch (error) {
        console.error(`파일 처리 오류 (${file.name}):`, error)
        throw new Error(`WebP 파일을 처리할 수 없습니다: ${file.name}`)
      }
    }

    // ZIP 파일 생성
    const archiver = require('archiver')
    const archive = archiver('zip', { zlib: { level: 9 } })
    
    const chunks: Buffer[] = []
    archive.on('data', (chunk: Buffer) => chunks.push(chunk))
    
    await new Promise<void>((resolve, reject) => {
      archive.on('end', resolve)
      archive.on('error', reject)
      
      processedFiles.forEach(({ name, buffer }) => {
        archive.append(buffer, { name })
      })
      
      archive.finalize()
    })

    const zipBuffer = Buffer.concat(chunks)
    
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="webp_converted_${uuidv4()}.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('WebP 변환 오류:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'WebP 변환 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
