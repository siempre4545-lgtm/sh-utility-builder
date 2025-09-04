'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

interface AdSenseProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  adStyle?: React.CSSProperties
  className?: string
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  adStyle = { display: 'block' },
  className = ''
}: AdSenseProps) {
  if (!adSlot) return null

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      <Script
        id={`adsense-${adSlot}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({});
          `,
        }}
      />
    </div>
  )
}

// A/B 테스트용 AdSense 컴포넌트
export function AdSenseAB({ 
  adSlotA, 
  adSlotB, 
  testName = 'ad-test',
  ...props 
}: AdSenseProps & { 
  adSlotA: string
  adSlotB: string
  testName?: string
}) {
  const [variant, setVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    // A/B 테스트 로직
    const testVariant = localStorage.getItem(`ab-test-${testName}`)
    if (testVariant) {
      setVariant(testVariant as 'A' | 'B')
    } else {
      const randomVariant = Math.random() < 0.5 ? 'A' : 'B'
      setVariant(randomVariant)
      localStorage.setItem(`ab-test-${testName}`, randomVariant)
    }
  }, [testName])

  return (
    <AdSense 
      {...props}
      adSlot={variant === 'A' ? adSlotA : adSlotB}
    />
  )
}

// 전역 AdSense 초기화
export function AdSenseInit() {
  return (
    <Script
      id="adsense-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      crossOrigin="anonymous"
    />
  )
}
