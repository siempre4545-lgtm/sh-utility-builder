import JSZip from 'jszip';

export async function zipFiles(files, zipName = 'result.zip') {
  const zip = new JSZip();
  for (const f of files) zip.file(f.name, f.data);
  const blob = await zip.generateAsync({ type: 'uint8array' });
  return new Response(blob, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${zipName}"`
    }
  });
}
