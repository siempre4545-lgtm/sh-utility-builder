// app/tools/webp-to-jpg/page.tsx
export default function WebpToJpgPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>WebP → JPG 변환기</h1>
      <p>Google의 WebP 이미지를 널리 호환되는 JPG 형식으로 변환하세요.</p>
      <div style={{ marginTop: 16 }}>
        <h2>기능:</h2>
        <ul>
          <li>WebP 파일을 JPG로 변환</li>
          <li>고품질 변환</li>
          <li>최적화된 압축</li>
        </ul>
      </div>
      <div style={{ marginTop: 16 }}>
        <a href="/">← 홈으로 돌아가기</a>
      </div>
    </div>
  );
}