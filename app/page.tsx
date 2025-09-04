// app/page.tsx
export default function Home() {
    return (
      <main style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>안녕하세요 👋</h1>
        <p style={{ marginTop: 8 }}>Next.js App Router 최소 페이지가 준비됐어요.</p>
        <div style={{ marginTop: 16 }}>
          <h2>사용 가능한 도구들:</h2>
          <ul>
            <li><a href="/tools/image-resize">이미지 리사이즈</a></li>
            <li><a href="/tools/heic-to-jpg">HEIC → JPG 변환</a></li>
            <li><a href="/tools/pdf-merge">PDF 병합</a></li>
            <li><a href="/tools/webp-to-jpg">WebP → JPG 변환</a></li>
          </ul>
        </div>
      </main>
    );
  }
  