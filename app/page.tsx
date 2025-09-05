import Hero from '@/components/Hero'
import UtilityGrid from '@/components/UtilityGrid'
import AdBanner from '@/components/AdBanner'

// 캐싱 비활성화 - 실시간 업데이트 보장
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <>
      <Hero />
      <AdBanner position="top" size="medium" />
      <UtilityGrid />
      <AdBanner position="bottom" size="medium" />
    </>
  )
}