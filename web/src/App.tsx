import './i18n'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { NavigationHeader } from './components/NavigationHeader'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { GovernanceDomains } from './components/GovernanceDomains'

const AtrocitiesTimeline = lazy(() => import('./components/AtrocitiesTimeline').then(m => ({ default: m.AtrocitiesTimeline })))
const TVKVisionSection = lazy(() => import('./components/TVKVisionSection').then(m => ({ default: m.TVKVisionSection })))
const DomainPage = lazy(() => import('./pages/DomainPage').then(m => ({ default: m.DomainPage })))

function LoadingSkeleton() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-tvk-blue border-t-tvk-gold" />
    </div>
  )
}

function HomePage() {
  const { i18n } = useTranslation()
  const isTamil = i18n.language === 'ta'

  return (
    <>
      <Helmet>
        <title>{isTamil ? 'ஏன் TVK — தரவு சார்ந்த அறிக்கை' : 'Why TVK — Data-Driven Manifesto'}</title>
        <meta name="description" content={isTamil
          ? 'தமிழ்நாடு ஆட்சி தோல்விகள் பற்றிய உண்மை. அரசு ஆதாரங்கள். நிஜ புள்ளிவிவரங்கள்.'
          : 'Real statistics. Government sources. The truth about Tamil Nadu\'s governance failures. See why Tamil Nadu needs TVK.'
        } />
        <meta property="og:title" content={isTamil ? 'ஏன் TVK — தரவு சார்ந்த அறிக்கை' : 'Why TVK — Data-Driven Manifesto'} />
        <meta property="og:description" content="Real statistics. Government sources. The truth about Tamil Nadu's governance failures." />
      </Helmet>
      <HeroSection />
      <GovernanceDomains />
      <Suspense fallback={<LoadingSkeleton />}>
        <AtrocitiesTimeline />
        <TVKVisionSection />
      </Suspense>
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-tvk-dark">
      <NavigationHeader />
      <Suspense fallback={<LoadingSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/domain/:domainKey" element={<DomainPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
