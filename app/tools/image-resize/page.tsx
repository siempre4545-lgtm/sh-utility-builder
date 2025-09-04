// app/tools/image-resize/page.tsx
export default function ImageResizePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>이미지 리사이즈 도구</h1>
      <p>이미지 크기를 조정하고 품질을 최적화하세요.</p>
      <div style={{ marginTop: 16 }}>
        <h2>기능:</h2>
        <ul>
          <li>이미지 크기 조정</li>
          <li>품질 최적화</li>
          <li>다양한 형식 지원 (JPEG, PNG, WebP)</li>
        </ul>
      </div>
      <div style={{ marginTop: 16 }}>
        <a href="/">← 홈으로 돌아가기</a>
      </div>
    </div>
  );
}