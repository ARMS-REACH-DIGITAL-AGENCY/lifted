/**
 * Liftêd™ Nav
 * Uses <LiftedLogo> — NEVER text-built logo
 * Mobile: wordmark + [Join] [☰]
 * Desktop: wordmark | nav links | CTAs
 */
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LiftedLogo } from './LiftedLogo.jsx'
import { SHOW_SHOP_NAV, SHOP_URL } from '../config/launchState.js'

const NAV_LINKS = [
  { to: '/story', label: 'Our Story' },
  { to: '/collections', label: 'Collections' },
  { to: '/collaborate', label: 'Collaborate' },
  { to: '/founding-community', label: 'Founding Community' },
  { to: '/invest', label: 'Invest' },
]

const MOBILE_EXTRA = [
  { to: '/schedule', label: 'Schedule a Call' },
  { to: '/scan', label: 'Scan a QR Code' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  // Transparent only on homepage before scroll
  const transparent = isHome && !scrolled && !open
  const bg = transparent ? 'transparent' : 'rgba(15,26,48,0.97)'

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: bg,
        backdropFilter: transparent ? 'none' : 'blur(14px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(14px)',
        borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.07)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 68,
        }}>
          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: 0, flexShrink: 0 }}>
            <LiftedLogo variant="white" height={34} />
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28, flex: 1, justifyContent: 'center' }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to} style={{
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                color: location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.82)',
                textDecoration: 'none',
                transition: 'color 0.18s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (location.pathname !== l.to) e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { e.currentTarget.style.color = location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.82)' }}
              >{l.label}</Link>
            ))}
            {SHOW_SHOP_NAV && (
              <a href={SHOP_URL} style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--gold)', textDecoration: 'none' }}>Shop</a>
            )}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }} className="nav-desktop">
            <Link to="/schedule" style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              color: 'rgba(255,255,255,0.75)', textDecoration: 'none', padding: '8px 16px',
              border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 100,
              transition: 'all 0.18s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
            >Schedule a Call</Link>
            <Link to="/founding-community" style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
              background: 'var(--gold)', color: 'var(--navy-deep)',
              textDecoration: 'none', padding: '9px 18px', borderRadius: 100,
              transition: 'background 0.18s, box-shadow 0.18s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(238,191,104,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.boxShadow = 'none' }}
            >Join the Community</Link>
          </div>

          {/* ── Mobile: Join + Hamburger ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="nav-mobile">
            <Link to="/founding-community" style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              background: 'var(--gold)', color: 'var(--navy-deep)',
              textDecoration: 'none', padding: '8px 14px', borderRadius: 100,
              whiteSpace: 'nowrap',
            }}>Join</Link>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 10, display: 'flex', flexDirection: 'column', gap: 5,
                minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2, transition: 'transform 0.22s, opacity 0.22s', transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2, transition: 'opacity 0.22s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: 'white', borderRadius: 2, transition: 'transform 0.22s, opacity 0.22s', transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── Mobile menu drawer ── */}
        {open && (
          <div style={{
            background: 'var(--navy-deep)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '8px 24px 28px',
          }}>
            {[...NAV_LINKS, ...MOBILE_EXTRA].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', padding: '15px 0',
                fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500,
                color: location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
              }}>{l.label}</Link>
            ))}
            {SHOW_SHOP_NAV && (
              <a href={SHOP_URL} style={{ display: 'block', padding: '15px 0', fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: 'var(--gold)', borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none' }}>Shop</a>
            )}
            <div style={{ marginTop: 20 }}>
              <Link to="/founding-community" style={{
                display: 'block', textAlign: 'center',
                fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 700,
                background: 'var(--gold)', color: 'var(--navy-deep)',
                textDecoration: 'none', padding: '14px', borderRadius: 100,
              }}>Join the Founding Community</Link>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (min-width: 960px) {
          .nav-mobile { display: none !important; }
        }
        @media (max-width: 959px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}
