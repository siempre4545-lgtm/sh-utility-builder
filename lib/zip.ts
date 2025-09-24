import JSZip from 'jszip';

export async function zipFiles(
  files: { name: string; data: Uint8Array }[],
  zipName: string
): Promise<Response> {
  const zip = new JSZip();
  
  files.forEach(file => {
    zip.file(file.name, file.data);
  });
  
  const zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });
  
  return new Response(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${zipName}"`,
    },
  });
}
