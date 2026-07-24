import React, { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Mission', href: '#mission' },
    { label: 'Collections', href: '#collections' },
    { label: 'Community', href: '#community' },
    { label: 'Partnerships', href: '#partnerships' },
    { label: 'Invest', href: '#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s',
      background: scrolled ? 'rgba(253,250,246,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px' }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, color: 'var(--navy-deep)'
          }}>L</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20,
            color: scrolled ? 'var(--navy)' : 'white',
            letterSpacing: '-0.01em'
          }}>Liftêd<sup style={{ fontSize: 11, fontFamily: 'var(--font-body)' }}>™</sup></span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
              color: scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.9)',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--gold)'}
            onMouseLeave={e => e.target.style.color = scrolled ? 'var(--navy)' : 'rgba(255,255,255,0.9)'}
            >{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-gold" style={{ padding: '10px 24px', fontSize: 13 }}>
            Wear Liftêd™ Today
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: scrolled ? 'var(--navy)' : 'white', fontSize: 24, cursor: 'pointer'
          }}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--warm-white)', padding: '16px 24px 24px',
          borderTop: '1px solid var(--light-gray)'
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500,
                color: 'var(--navy)', borderBottom: '1px solid var(--light-gray)'
              }}
            >{l.label}</a>
          ))}
          <a href="#contact" className="btn btn-gold" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}>
            Wear Liftêd™ Today
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
