// app/tools/heic-to-jpg/page.tsx
export default function HeicToJpgPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>HEIC → JPG 변환기</h1>
      <p>iPhone과 iPad의 HEIC 이미지를 널리 사용되는 JPG 형식으로 변환하세요.</p>
      <div style={{ marginTop: 16 }}>
        <h2>기능:</h2>
        <ul>
          <li>HEIC/HEIF 파일을 JPG로 변환</li>
          <li>고품질 변환</li>
          <li>빠른 처리</li>
        </ul>
      </div>
      <div style={{ marginTop: 16 }}>
        <a href="/">← 홈으로 돌아가기</a>
      </div>
    </div>
  );
}