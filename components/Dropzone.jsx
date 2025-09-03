'use client';
import { useRef, useState, useCallback } from 'react';

export default function Dropzone({ accept, multiple = true, onFiles }) {
  const [highlight, setHighlight] = useState(false);
  const inputRef = useRef(null);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setHighlight(false);
    const files = Array.from(e.dataTransfer.files || []);
    const accepts = (accept || '').split(',').map(s => s.trim().toLowerCase());
    const filtered = files.filter(f => {
      const n = f.name.toLowerCase();
      const t = (f.type || '').toLowerCase();
      return accepts.length === 0 || accepts.some(a => n.endsWith(a) || t.includes(a.replace('.', '')));
    });
    if (filtered.length) onFiles(filtered);
  }, [accept, onFiles]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setHighlight(true); }}
      onDragLeave={() => setHighlight(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      aria-label="파일 업로드"
      style={{
        border: '2px dashed #ddd',
        borderColor: highlight ? '#333' : '#ddd',
        borderRadius: 16,
        padding: 24,
        textAlign: 'center',
        background: highlight ? '#fafafa' : 'white'
      }}
    >
      <p style={{ color: '#666', fontSize: 14 }}>여기에 파일을 드래그하거나 클릭하여 선택</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) onFiles(files);
        }}
      />
    </div>
  );
}
