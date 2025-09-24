// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body style={{ padding: 24 }}>
        <h2>전역 에러가 발생했어요.</h2>
        <p style={{color:'#666', whiteSpace:'pre-wrap'}}>{error?.message}</p>
        <button
          onClick={() => reset()}
          style={{ marginTop: 12, padding: '8px 12px', border: '1px solid #ccc' }}
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
