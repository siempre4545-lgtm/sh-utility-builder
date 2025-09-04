import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const order = JSON.parse(formData.get('order') as string || '[]')
    const isPro = formData.get('isPro') === 'true'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'PDF 파일이 선택되지 않았습니다.' }, { status: 400 })
    }

    // 무료 한도 체크
    const maxFiles = isPro ? 20 : 5
    const maxFileSize = isPro ? 100 * 1024 * 1024 : 25 * 1024 * 1024 // 100MB vs 25MB

    if (files.length > maxFiles) {
      return NextResponse.json({ 
        error: `무료 버전은 최대 ${maxFiles}개 PDF만 병합 가능합니다. Pro 업그레이드를 고려해보세요.`,
        requiresPro: true 
      }, { status: 403 })
    }

    // 파일 크기 체크
    for (const file of files) {
      if (file.size > maxFileSize) {
        return NextResponse.json({ 
          error: `PDF 크기가 ${isPro ? '100MB' : '25MB'}를 초과합니다: ${file.name}. Pro 업그레이드를 고려해보세요.`,
          requiresPro: true 
        }, { status: 413 })
      }
    }

    // PDF 문서 생성
    const mergedPdf = await PDFDocument.create()

    // 파일 순서에 따라 처리
    const fileOrder = order.length > 0 ? order : Array.from({ length: files.length }, (_, i) => i)
    
    for (const index of fileOrder) {
      if (index >= files.length) continue
      
      const file = files[index]
      const arrayBuffer = await file.arrayBuffer()
      
      try {
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        
        pages.forEach((page) => {
          mergedPdf.addPage(page)
        })
      } catch (error) {
        console.error(`PDF 처리 오류 (${file.name}):`, error)
        throw new Error(`PDF 파일을 처리할 수 없습니다: ${file.name}`)
      }
    }

    // 병합된 PDF를 바이트 배열로 변환
    const pdfBytes = await mergedPdf.save()
    
    return new NextResponse(pdfBytes as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="merged_${uuidv4()}.pdf"`,
        'Content-Length': pdfBytes.length.toString(),
      },
    })

  } catch (error) {
    console.error('PDF 병합 오류:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'PDF 병합 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
