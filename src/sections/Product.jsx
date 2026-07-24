import React, { useEffect, useRef, useState } from 'react'

function useLiftIn(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

export default function Product() {
  const ref = useRef(null)
  useLiftIn(ref)
  const [side, setSide] = useState('front')

  return (
    <section ref={ref} style={{ background: 'var(--warm-white)', padding: '100px 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
          {/* Product image */}
          <div className="lift-in" style={{ position: 'relative' }}>
            <div style={{
              background: 'var(--off-white)', borderRadius: 20,
              padding: '40px 32px', textAlign: 'center',
              boxShadow: '0 8px 48px rgba(0,0,0,0.08)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Glow */}
              <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '80%', height: '40%',
                background: 'radial-gradient(ellipse, rgba(200,146,42,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
              <img
                src={side === 'front'
                  ? 'https://storage.manus.im/public/manus-storage/shirt-front_46711336.jpg'
                  : 'https://storage.manus.im/public/manus-storage/shirt-back_f49773e7.jpg'
                }
                alt={side === 'front' ? 'Liftêd™ You Matter Here shirt front' : 'Liftêd™ Dear Person Behind Me shirt back'}
                style={{ maxHeight: 420, width: 'auto', margin: '0 auto', position: 'relative', zIndex: 1, transition: 'opacity 0.3s' }}
              />
              {/* Toggle */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
                {['front', 'back'].map(s => (
                  <button key={s} onClick={() => setSide(s)} style={{
                    padding: '8px 20px', borderRadius: 100, border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                    background: side === s ? 'var(--gold)' : 'var(--light-gray)',
                    color: side === s ? 'var(--navy-deep)' : 'var(--mid-gray)',
                    transition: 'all 0.2s',
                  }}>
                    {s === 'front' ? 'Front' : 'Back'}
                  </button>
                ))}
              </div>
            </div>
            {/* Patch logo */}
            <div style={{
              position: 'absolute', bottom: -16, right: -16,
              background: 'white', borderRadius: 12, padding: 8,
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}>
              <img
                src="https://storage.manus.im/public/manus-storage/lifted-patch-logo_a6750e28.jpg"
                alt="Liftêd™ patch logo"
                style={{ width: 100, height: 'auto', borderRadius: 6 }}
              />
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="lift-in section-eyebrow">The Flagship Design</div>
            <h2 className="lift-in d1 section-title">
              {side === 'front' ? '"You Matter Here."' : '"Dear Person Behind Me:"'}
            </h2>
            <div style={{ width: 60, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
            <p className="lift-in d2 section-body" style={{ marginBottom: 24 }}>
              {side === 'front'
                ? 'The front speaks directly to the wearer. A quiet, powerful reminder that their presence matters — on the days they feel it least.'
                : 'The back speaks to the world. "Your presence makes a difference, even on the days you feel invisible. The world is better with you in it." A message that travels with every step.'
              }
            </p>
            <p className="lift-in d3 section-body" style={{ marginBottom: 32 }}>
              Every Liftêd™ garment is private-labeled as Liftêd™ — not a graphic on a Gildan blank.
              The neck label, hangtag, and QR code all point back to the brand, making each garment
              a permanent brand-building unit in the field.
            </p>
            <div className="lift-in d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-gold">Order This Design</a>
              <a href="#collections" className="btn btn-outline">View All Collections</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

