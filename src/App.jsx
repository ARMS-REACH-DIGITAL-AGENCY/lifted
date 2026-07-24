import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Scan from './pages/Scan.jsx'
import Invest from './pages/Invest.jsx'
import Story from './pages/Story.jsx'
import CollectionsPage from './pages/Collections.jsx'
import Collaborate from './pages/Collaborate.jsx'
import FoundingCommunity from './pages/FoundingCommunity.jsx'
import Sample from './pages/Sample.jsx'
import Schedule from './pages/Schedule.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/story" element={<Story />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/founding-community" element={<FoundingCommunity />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

