import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'

// Public pages
import Home from './pages/Home.jsx'
import Story from './pages/Story.jsx'
import Collections from './pages/Collections.jsx'
import Collaborate from './pages/Collaborate.jsx'
import FoundingCommunity from './pages/FoundingCommunity.jsx'
import Support from './pages/Support.jsx'
import Wholesale from './pages/Wholesale.jsx'
import Shop from './pages/Shop.jsx'
import InvestorAccess from './pages/InvestorAccess.jsx'
import InvestorLogin from './pages/InvestorLogin.jsx'
import Scan from './pages/Scan.jsx'
import Sample from './pages/Sample.jsx'
import Schedule from './pages/Schedule.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

// Protected investor portal
import InvestorPortal from './pages/portal/InvestorPortal.jsx'
import PortalOverview from './pages/portal/PortalOverview.jsx'
import PortalBrand from './pages/portal/PortalBrand.jsx'
import PortalOpportunity from './pages/portal/PortalOpportunity.jsx'
import PortalMarket from './pages/portal/PortalMarket.jsx'
import PortalDevelopment from './pages/portal/PortalDevelopment.jsx'
import PortalFinancials from './pages/portal/PortalFinancials.jsx'
import PortalDocuments from './pages/portal/PortalDocuments.jsx'
import PortalSchedule from './pages/portal/PortalSchedule.jsx'

// Protected retailer portal
import RetailerPortal from './pages/RetailerPortal.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Public layout with Nav + Footer
function PublicLayout({ children, showFooter = true }) {
  return (
    <>
      <Nav />
      {children}
      {showFooter && <Footer />}
    </>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/story" element={<PublicLayout><Story /></PublicLayout>} />
        <Route path="/collections" element={<PublicLayout><Collections /></PublicLayout>} />
        <Route path="/collaborate" element={<PublicLayout><Collaborate /></PublicLayout>} />
        <Route path="/founding-community" element={<PublicLayout><FoundingCommunity /></PublicLayout>} />
        <Route path="/support" element={<PublicLayout><Support /></PublicLayout>} />
        <Route path="/wholesale" element={<PublicLayout><Wholesale /></PublicLayout>} />
        <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
        <Route path="/scan" element={<PublicLayout><Scan /></PublicLayout>} />
        <Route path="/sample" element={<PublicLayout><Sample /></PublicLayout>} />
        <Route path="/schedule" element={<PublicLayout><Schedule /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

        {/* ── Investor access request + login ── */}
        <Route path="/investor-access" element={<PublicLayout><InvestorAccess /></PublicLayout>} />
        <Route path="/investor-login" element={<InvestorLogin />} />

        {/* ── Old /invest → redirect ── */}
        <Route path="/invest" element={<Navigate to="/investor-access" replace />} />

        {/* ── Protected investor portal ── */}
        <Route path="/investor-portal" element={
          <ProtectedRoute requiredRole="investor">
            <InvestorPortal />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/investor-portal/overview" replace />} />
          <Route path="overview"    element={<PortalOverview />} />
          <Route path="brand"       element={<PortalBrand />} />
          <Route path="opportunity" element={<PortalOpportunity />} />
          <Route path="market"      element={<PortalMarket />} />
          <Route path="development" element={<PortalDevelopment />} />
          <Route path="financials"  element={<PortalFinancials />} />
          <Route path="documents"   element={<PortalDocuments />} />
          <Route path="schedule"    element={<PortalSchedule />} />
        </Route>

        {/* ── Protected retailer portal ── */}
        <Route path="/retailer-portal" element={
          <ProtectedRoute requiredRole="retailer">
            <RetailerPortal />
          </ProtectedRoute>
        } />

        {/* ── 404 ── */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
