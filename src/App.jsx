import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Mission from './sections/Mission.jsx'
import Collections from './sections/Collections.jsx'
import Product from './sections/Product.jsx'
import Community from './sections/Community.jsx'
import RevenueModel from './sections/RevenueModel.jsx'
import Roadmap from './sections/Roadmap.jsx'
import Partnerships from './sections/Partnerships.jsx'
import Impact from './sections/Impact.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <Mission />
      <Collections />
      <Product />
      <Community />
      <RevenueModel />
      <Roadmap />
      <Partnerships />
      <Impact />
      <Contact />
      <Footer />
    </div>
  )
}
