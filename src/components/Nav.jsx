import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LiftedLogo } from './LiftedLogo.jsx'
import { SHOW_SHOP_NAV, SHOP_URL } from '../config/launchState.js'

const NAV_LINKS = [
  { to: '/story', label: 'Our Story' },
  { to: '/collections', label: 'Collections' },
  { to: '/collaborate', label: 'Collaborate' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/shop', label: 'Shop' },
]
const MOBILE_EXTRA = [
  { to: '/schedule', label: 'Schedule a Call' },
  { to: '/scan', label: 'Scan a QR Code' },
]
const MOBILE_INVESTOR = { to: '/investor-access', label: 'Investor Opportunity' }

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const transparent = isHome && !scrolled && !open
  // White nav when scrolled or on non-home pages; transparent only on home hero
  const navBg = transparent ? 'transparent' : 'var(--off-white)'
  const navBorder = transparent ? 'none' : '2px solid var(--burnt-orange)'
  const navTextColor = transparent ? 'rgba(247,244,236,0.75)' : 'rgba(41,42,40,0.75)'
  const navActiveColor = transparent ? 'var(--sand)' : 'var(--burnt-orange)'
  const logoVariant = transparent ? 'light' : 'dark'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        borderBottom: navBorder,
        transition: 'background 0.25s, border-color 0.25s',
        boxShadow: transparent ? 'none' : '0 1px 12px rgba(0,0,0,0.10)',
      }}>
        {/* L-hand gesture — bleeds in from left edge, always visible */}
        <img
          src="/brand/lifted/l-hand-gesture.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: -28,
            height: 110,
            width: 'auto',
            pointerEvents: 'none',
            zIndex: 1001,
            opacity: 1,
            userSelect: 'none',
          }}
        />
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 64,
        }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, marginLeft: 28 }}>
            <LiftedLogo variant={logoVariant} height={120} />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1, justifyContent: 'center' }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: location.pathname === l.to ? navActiveColor : navTextColor,
                textDecoration: 'none', transition: 'color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (location.pathname !== l.to) e.currentTarget.style.color = transparent ? 'var(--off-white)' : 'var(--burnt-orange)' }}
              onMouseLeave={e => { e.currentTarget.style.color = location.pathname === l.to ? navActiveColor : navTextColor }}
              >{l.label}</Link>
            ))}
            {SHOW_SHOP_NAV && (
              <a href={SHOP_URL} style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sand)', textDecoration: 'none' }}>Shop</a>
            )}
          </nav>

          {/* Desktop CTAs */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }} className="nav-desktop">
            <Link to="/schedule" style={{
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: transparent ? 'rgba(247,244,236,0.7)' : 'rgba(41,42,40,0.7)', textDecoration: 'none',
              padding: '7px 14px', border: transparent ? '1.5px solid rgba(247,244,236,0.3)' : '1.5px solid rgba(41,42,40,0.25)',
              borderRadius: 'var(--radius)', transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = transparent ? 'var(--off-white)' : 'var(--burnt-orange)'; e.currentTarget.style.color = transparent ? 'var(--off-white)' : 'var(--burnt-orange)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = transparent ? 'rgba(247,244,236,0.3)' : 'rgba(41,42,40,0.25)'; e.currentTarget.style.color = transparent ? 'rgba(247,244,236,0.7)' : 'rgba(41,42,40,0.7)' }}
            >Schedule</Link>
            <Link to="/founding-community" style={{
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: '#EEBF68', color: 'var(--black)',
              textDecoration: 'none', padding: '8px 16px',
              borderRadius: 'var(--radius)', border: '2px solid #EEBF68',
              transition: 'background 0.15s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B85C28'; e.currentTarget.style.borderColor = '#B85C28' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#EEBF68'; e.currentTarget.style.borderColor = '#EEBF68' }}
            >Join Community</Link>
          </div>

          {/* Mobile: Join + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="nav-mobile">
            <Link to="/founding-community" style={{
              fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              background: '#EEBF68', color: 'var(--black)',
              textDecoration: 'none', padding: '8px 14px',
              borderRadius: 'var(--radius)', whiteSpace: 'nowrap',
            }}>Join</Link>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 10, display: 'flex', flexDirection: 'column', gap: 5,
                minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center',
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 22, height: 2,
                  background: transparent ? 'var(--off-white)' : 'var(--charcoal)', borderRadius: 0,
                  transition: 'transform 0.2s, opacity 0.2s',
                  transform: open ? (i===0 ? 'rotate(45deg) translate(5px,5px)' : i===2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
                  opacity: open && i===1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div style={{
            background: 'var(--black)',
            borderTop: '2px solid var(--burnt-orange)',
            padding: '4px 20px 24px',
          }}>
           {[...NAV_LINKS, ...MOBILE_EXTRA].map(l => (
             <Link key={l.to} to={l.to} style={{
               display: 'block', padding: '14px 0',
               fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
               letterSpacing: '0.08em', textTransform: 'uppercase',
               color: location.pathname === l.to ? 'var(--sand)' : 'rgba(247,244,236,0.8)',
               borderBottom: '1px solid rgba(247,244,236,0.08)',
               textDecoration: 'none',
             }}>{l.label}</Link>
           ))}
            {/* Investor Opportunity — discreet separator before it */}
            <div style={{ borderTop: '1px solid rgba(247,244,236,0.15)', marginTop: 8, paddingTop: 8 }}>
              <Link to={MOBILE_INVESTOR.to} style={{
                display: 'block', padding: '14px 0',
                fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: location.pathname === MOBILE_INVESTOR.to ? 'var(--sand)' : 'rgba(212,168,67,0.75)',
                textDecoration: 'none',
              }}>{MOBILE_INVESTOR.label}</Link>
            </div>
            <div style={{ marginTop: 20 }}>
              <Link to="/founding-community" style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                background: '#EEBF68', color: 'var(--black)',
                textDecoration: 'none', padding: '14px',
                borderRadius: 'var(--radius)',
              }}>Join the Founding Community</Link>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 960px) { .nav-mobile { display: none !important; } }
        @media (max-width: 959px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  )
}
