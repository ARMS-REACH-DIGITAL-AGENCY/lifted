import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useLiftIn(ref) {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.lift-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function Story() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--black)', padding: '80px 0 64px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Our Story</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              More Than Apparel.<br /><span style={{ color: 'var(--gold)' }}>A Pick-Me-Up.</span>
            </h1>
            <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7 }}>
              Liftêd™ was built on a simple belief: the right message, worn at the right moment, can change someone's day — or their life.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="lift-in section-eyebrow">The Idea</div>
              <h2 className="lift-in d1 section-title">Where It Started</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <p className="lift-in d2 section-body" style={{ marginBottom: 16 }}>
                Liftêd™ began with a question that most apparel brands never ask: <em>What if the garment itself was the message?</em>
              </p>
              <p className="lift-in d3 section-body" style={{ marginBottom: 16 }}>
                Not a logo. Not a brand name. A real message — the kind someone needs to hear on the hardest days. The kind that reminds a stranger that they matter. The kind that travels with the wearer into every room, every gym, every school hallway, every waiting room.
              </p>
              <p className="lift-in d4 section-body" style={{ marginBottom: 32 }}>
                That question became Liftêd™. And the answer became a two-sided garment experience: one message for the wearer, one for the world.
              </p>
            </div>
            <div className="lift-in d2">
              <div style={{ background: 'var(--charcoal)', borderRadius: 4, padding: 40 }}>
                <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 28px)', fontStyle: 'italic', color: 'white', lineHeight: 1.4, marginBottom: 24 }}>
                  "Most apparel tells the world what you bought. Liftêd™ tells someone what they may need to hear."
                </blockquote>
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--gold)' }}>Internal</div>
                    <div style={{ fontSize: 13, color: 'rgba(247,244,236,0.5)' }}>Lift for the wearer</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--gold)' }}>External</div>
                    <div style={{ fontSize: 13, color: 'rgba(247,244,236,0.5)' }}>Radiance for the world</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--off-white)', padding: '80px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">Where We Are Now</div>
            <h2 className="section-title" style={{ margin: '0 auto' }}>A Brand Being Deliberately Built</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              { icon: '🧵', title: 'Private-Label Development', desc: 'Our first garments are being produced with custom Liftêd™ labels — not printed on another brand\'s blank.' },
              { icon: '🔬', title: 'Sample Validation', desc: 'We are evaluating fabric quality, fit, print durability, color accuracy, and the full product experience.' },
              { icon: '🤝', title: 'Founding Community', desc: 'We are building a community of early supporters, investors, partners, and ambassadors before the official launch.' },
              { icon: '📦', title: 'Sample Distribution', desc: 'Printed samples and promotional products with QR codes are being distributed to potential partners and investors.' },
            ].map((item, i) => (
              <div key={item.title} className={`lift-in d${i+1} card`} style={{ padding: 28 }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted-olive)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--charcoal)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="lift-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
              The World Needs More Liftêd™.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(247,244,236,0.65)', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Join us before the official launch. Help bring this brand to the people who need it most.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
              <Link to="/founding-community" className="btn btn-gold btn-lg">Join the Founding Community</Link>
              <Link to="/invest" className="btn btn-outline-light btn-lg">Investor Overview</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
