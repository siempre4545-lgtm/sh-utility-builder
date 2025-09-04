import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const width = parseInt(formData.get('width') as string) || 800
    const height = parseInt(formData.get('height') as string) || 600
    const quality = parseInt(formData.get('quality') as string) || 85
    const maintainAspectRatio = formData.get('maintainAspectRatio') === 'true'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: '파일이 선택되지 않았습니다.' }, { status: 400 })
    }

    const processedFiles: { name: string; buffer: Buffer }[] = []

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      
      let sharpInstance = sharp(buffer)
      
      // 메타데이터 가져오기
      const metadata = await sharpInstance.metadata()
      
      // 종횡비 유지 옵션
      if (maintainAspectRatio) {
        sharpInstance = sharpInstance.resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true
        })
      } else {
        sharpInstance = sharpInstance.resize(width, height)
      }

      // JPEG로 변환 및 압축
      const processedBuffer = await sharpInstance
        .jpeg({ quality })
        .toBuffer()

      processedFiles.push({
        name: `${file.name.split('.')[0]}_resized.jpg`,
        buffer: processedBuffer
      })
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
        'Content-Disposition': `attachment; filename="resized_images_${uuidv4()}.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('이미지 리사이즈 오류:', error)
    return NextResponse.json(
      { error: '이미지 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
