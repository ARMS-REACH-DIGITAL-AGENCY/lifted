import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LiftForm from '../components/LiftForm.jsx'
import { TM } from '../components/TM.jsx'

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

const lanes = [
  { n: '01', title: 'Liftêd™ Retail', desc: 'Direct-to-consumer brand sales through DTC website, subscription box, and future retail. This lane builds brand equity, customer data, and cultural relevance.', color: 'var(--gold-deep)' },
  { n: '02', title: 'Liftêd™ Collaborations', desc: 'Co-branded collections with organizations, schools, teams, churches, nonprofits, and causes. Each collaboration carries the Liftêd™ meaning and identity.', color: '#5B8DB8' },
  { n: '03', title: 'Custom Apparel Services', desc: 'Production capabilities for client-owned branding. Separate from the consumer brand — generates cash flow while Liftêd™ retail scales.', color: '#7B9E4A' },
]

export default function Invest() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      {/* Hero */}
      <section style={{ background: 'var(--black)', padding: '80px 0 64px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Investor Overview</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              The Investment<br /><span style={{ color: 'var(--gold)' }}>Opportunity</span>
            </h1>
            <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7, marginBottom: 32, maxWidth: 580 }}>
              Liftêd<TM/> is a pre-revenue inspirational lifestyle apparel brand in its sample-development stage. We are seeking founding investors to help bring the brand to market.
            </p>
            <div className="lift-in d3" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link to="/schedule?type=investor" className="btn btn-gold btn-lg">Schedule an Investor Call</Link>
              <a href="#investor-form" className="btn btn-outline-light btn-lg">Request the Investor Deck</a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div style={{ background: 'var(--off-white)', padding: '20px 0' }}>
        <div className="container">
          <div className="disclaimer">
            Investment Disclaimer: Nothing on this page constitutes an offer to sell or a solicitation of an offer to buy any securities. All information is provided for informational purposes only. Liftêd<TM/> is a pre-revenue brand in development. Consult your financial advisor before making any investment decisions.
          </div>
        </div>
      </div>

      {/* Brand Thesis */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="lift-in section-eyebrow">Brand Thesis</div>
              <h2 className="lift-in d1 section-title">More Than Apparel. A Pick-Me-Up.</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <p className="lift-in d2 section-body" style={{ marginBottom: 16 }}>
                Liftêd<TM/> is not simply a motivational T-shirt company. It is an inspirational lifestyle apparel brand that turns encouragement into a visible, repeatable product experience.
              </p>
              <p className="lift-in d3 section-body" style={{ marginBottom: 24 }}>
                The biggest opportunity is not becoming another T-shirt company. The opportunity is creating a recognizable symbol that instantly communicates hope, encouragement, resilience, and growth.
              </p>
              <blockquote className="lift-in d4" style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--charcoal)', borderLeft: '4px solid var(--gold)', paddingLeft: 20 }}>
                "Most apparel tells the world what you bought. Liftêd™ tells someone what they may need to hear."
              </blockquote>
            </div>
            <div className="lift-in d2">
              {[
                { label: 'Market', value: '$45B+', sub: 'US Apparel Market' },
                { label: 'Audience', value: '15–45', sub: 'Core Age Range' },
                { label: 'AOV Target', value: '$55–$75', sub: 'Average Order Value' },
                { label: 'Stage', value: 'Pre-Revenue', sub: 'Samples in Production' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid var(--light-gray)' }}>
                  <span style={{ fontSize: 14, color: 'var(--muted-olive)', fontWeight: 500 }}>{s.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--charcoal)' }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-olive)' }}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Revenue Lanes */}
      <section style={{ background: 'var(--charcoal)', padding: '80px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Business Model</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>Three Distinct Commercial Lanes</h2>
            <p style={{ fontSize: 17, color: 'rgba(247,244,236,0.65)', maxWidth: 560, margin: '0 auto' }}>Brand equity and cash-flow services coexist without confusing the consumer identity.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {lanes.map((l, i) => (
              <div key={l.n} className={`lift-in d${i+1}`} style={{ background: 'rgba(247,244,236,0.05)', border: '1px solid rgba(247,244,236,0.08)', borderRadius: 4, padding: 32, borderTop: `4px solid ${l.color}` }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 900, color: l.color, opacity: 0.5, lineHeight: 1, marginBottom: 16 }}>{l.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12 }}>{l.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Targets */}
      <section style={{ background: 'var(--off-white)', padding: '80px 0' }}>
        <div className="container">
          <div className="lift-in" style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-eyebrow">The Ascension Roadmap</div>
            <h2 className="section-title" style={{ margin: '0 auto' }}>A Disciplined Path to Scale</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 48 }}>
            {[
              { phase: 'Phase 1', name: 'Basecamp', year: 'Year 1', target: '$137,500', customers: '2,500', color: 'var(--gold-deep)', milestone: 'First 100 Sales' },
              { phase: 'Phase 2', name: 'The Climb', year: 'Year 2', target: '$450,000', customers: '7,500', color: '#5B8DB8', milestone: '1,000 Customers' },
              { phase: 'Phase 3', name: 'The Summit', year: 'Year 3', target: '$1.3M+', customers: '20,000', color: '#7B9E4A', milestone: '10,000 Customers' },
            ].map((p, i) => (
              <div key={p.phase} className={`lift-in d${i+1} card`} style={{ padding: 32, borderTop: `4px solid ${p.color}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 8 }}>{p.phase} · {p.year}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--charcoal)', marginBottom: 4 }}>{p.name}</h3>
                <div style={{ fontSize: 13, color: 'var(--muted-olive)', marginBottom: 20 }}>Milestone: {p.milestone}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: p.color }}>{p.target}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-olive)' }}>Revenue Target</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--charcoal)' }}>{p.customers}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted-olive)' }}>Customers</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Form */}
      <section id="investor-form" style={{ background: 'var(--charcoal)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="lift-in" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Connect With Us</div>
              <h2 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'white', marginBottom: 20 }}>Request the Investor Deck</h2>
              <p className="lift-in d2" style={{ fontSize: 16, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, marginBottom: 32 }}>
                Submit your information below and we'll send you the full investor overview, including the brand thesis, product mechanism, market opportunity, revenue model, and growth roadmap.
              </p>
              <Link to="/schedule?type=investor" className="lift-in d3 btn btn-gold">Schedule a 20-Minute Investor Call</Link>
            </div>
            <div className="lift-in d2" style={{ background: 'rgba(247,244,236,0.05)', border: '1px solid rgba(247,244,236,0.08)', borderRadius: 4, padding: 40 }}>
              <LiftForm type="investor" dark={true} title="Investor Inquiry" subtitle="We'll follow up with the investor deck and a Zoom booking link." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

