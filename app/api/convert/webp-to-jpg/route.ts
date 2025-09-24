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
    // webp -> jpeg (품질 85)
    const out = await sharp(input, { limitInputPixels: false })
      .jpeg({ quality: 85 })
      .toBuffer();

    const base = f.name.replace(/\.[^.]+$/, '');
    results.push({ name: `${base}.jpg`, data: new Uint8Array(out) });
  }

  return zipFiles(results, 'webp-to-jpg.zip');
}
