// app/tools/pdf-merge/page.tsx
export default function PdfMergePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>PDF 병합 도구</h1>
      <p>여러 PDF 파일을 하나로 병합하여 문서 관리를 간편하게 하세요.</p>
      <div style={{ marginTop: 16 }}>
        <h2>기능:</h2>
        <ul>
          <li>여러 PDF 파일 병합</li>
          <li>파일 순서 조정</li>
          <li>빠른 처리</li>
        </ul>
      </div>
      <div style={{ marginTop: 16 }}>
        <a href="/">← 홈으로 돌아가기</a>
      </div>
    </div>
  );
}