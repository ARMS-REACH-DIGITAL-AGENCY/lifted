import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/story', label: 'Our Story' },
  { to: '/collections', label: 'Collections' },
  { to: '/collaborate', label: 'Collaborate' },
  { to: '/founding-community', label: 'Founding Community' },
  { to: '/invest', label: 'Invest' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled && !open

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: transparent ? 'transparent' : 'rgba(15,26,48,0.97)',
      backdropFilter: transparent ? 'none' : 'blur(12px)',
      borderBottom: transparent ? 'none' : '1px solid rgba(255,255,255,0.08)',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/images/lifted-logo-icon.png" alt="Liftêd™" style={{ width: 36, height: 36, borderRadius: 6 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'white' }}>Liftêd™</span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hide-mobile">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              color: location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.8)',
              transition: 'color 0.2s',
            }}>{l.label}</Link>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="hide-mobile">
          <Link to="/schedule" className="btn btn-outline-light btn-sm">Schedule a Call</Link>
          <Link to="/founding-community" className="btn btn-gold btn-sm">Join the Community</Link>
        </div>

        <button onClick={() => setOpen(o => !o)} className="hide-desktop"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
          aria-label="Toggle menu">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: 24, height: 2, background: 'white', borderRadius: 2,
              transition: 'transform 0.2s, opacity 0.2s',
              transform: open ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--navy-deep)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              display: 'block', padding: '14px 0',
              fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500,
              color: location.pathname === l.to ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>{l.label}</Link>
          ))}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link to="/schedule" className="btn btn-outline-light" style={{ justifyContent: 'center' }}>Schedule a Call</Link>
            <Link to="/founding-community" className="btn btn-gold" style={{ justifyContent: 'center' }}>Join the Founding Community</Link>
          </div>
        </div>
      )}
      <style>{`
        @media (max-width: 900px) { .hide-mobile { display: none !important; } }
        @media (min-width: 901px) { .hide-desktop { display: none !important; } }
      `}</style>
    </header>
  )
}
