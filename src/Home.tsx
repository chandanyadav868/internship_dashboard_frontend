import HeroSection from './components/HeroSection'
import StatsOverview from './components/StatsOverview'
import CallToAction from './components/CallToAction'

function Home() {
  return (
     <div className="min-h-screen bg-gray-50 text-gray-900">
      <HeroSection />
       <StatsOverview />
      <CallToAction />
    </div>
  )
}

export default Home