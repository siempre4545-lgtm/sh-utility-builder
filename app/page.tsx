import Hero from '@/components/Hero'
import UtilityGrid from '@/components/UtilityGrid'
import AdBanner from '@/components/AdBanner'

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