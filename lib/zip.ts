import JSZip from 'jszip';

export async function zipFiles(
  files: { name: string; data: Uint8Array }[],
  zipName: string
): Promise<Response> {
  const zip = new JSZip();
  
  files.forEach(file => {
    zip.file(file.name, file.data);
  });
  
  const zipBuffer = await zip.generateAsync({ type: 'uint8array' });
  
  return new Response(zipBuffer.buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${zipName}"`,
    },
  });
}
