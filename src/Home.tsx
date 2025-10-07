import HeroSection from './components/HeroSection'
import StatsOverview from './components/StatsOverview'
import FeaturesSection from './components/FeaturesSection'
import CallToAction from './components/CallToAction'

function Home() {
  return (
     <div className="min-h-screen bg-gray-50 text-gray-900">
      <HeroSection />
       <StatsOverview />
      {/* <FeaturesSection />  */}
      <CallToAction />
    </div>
  )
}

export default Home