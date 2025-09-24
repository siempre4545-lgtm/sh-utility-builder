export const runtime = 'nodejs';

import sharp from 'sharp';
import { zipFiles } from '@/lib/zip';

export async function POST(req: Request) {
  const form = await req.formData();
  const files = form.getAll('files') as unknown as File[];
  if (!files?.length) return new Response('no files', { status: 400 });

  const results: { name: string; data: Uint8Array }[] = [];

  for (const f of files) {
    const ab = await f.arrayBuffer();
    const input = Buffer.from(ab);
    try {
      // HEIC -> jpeg (품질 85)
      const out = await sharp(input, { limitInputPixels: false })
        .jpeg({ quality: 85 })
        .toBuffer();

      const base = f.name.replace(/\.[^.]+$/, '');
      results.push({ name: `${base}.jpg`, data: new Uint8Array(out) });
    } catch (e) {
      // 서버 런타임이 libheif(HEIC) 미지원인 경우 여기로 옴
      return new Response('HEIC decode failed (libheif support required on server)', { status: 500 });
    }
  }

  return zipFiles(results, 'heic-to-jpg.zip');
}
