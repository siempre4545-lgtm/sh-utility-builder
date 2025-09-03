'use client';
import { useState } from 'react';

export default function ProModal({ buttonLabel = 'Pro 업그레이드' }) {
  const [open, setOpen] = useState(true); // 호출되면 바로 띄워 UX 확인

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ padding: '8px 12px', border: '1px solid #ccc' }}>
      {buttonLabel}
    </button>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'grid', placeItems: 'center', zIndex: 50
    }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 16, width: 360 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Pro 플랜</h3>
        <p style={{ color: '#666', fontSize: 14 }}>
          대량 처리·대용량·광고 제거를 이용해보세요.
        </p>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={() => setOpen(false)} style={{ padding: '8px 12px', marginRight: 8, border: '1px solid #ccc' }}>
            닫기
          </button>
          <a href="#subscribe" style={{ padding: '8px 12px', background: 'black', color: 'white', textDecoration: 'none' }}>
            구독하기
          </a>
        </div>
      </div>
    </div>
  );
}
