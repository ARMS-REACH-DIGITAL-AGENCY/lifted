import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import LiftForm from '../components/LiftForm.jsx'

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

export default function Sample() {
  const ref = useRef(null)
  useLiftIn(ref)
  const [params] = useSearchParams()
  const source = params.get('source') || ''

  return (
    <div ref={ref} style={{ paddingTop: 68 }}>
      <section style={{ background: 'var(--black)', padding: '80px 0 64px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <div className="lift-in section-eyebrow" style={{ color: 'var(--gold)' }}>Sample Feedback</div>
            <h1 className="lift-in d1" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
              You Are Holding<br /><span style={{ color: 'var(--gold)' }}>the Beginning of Liftêd™.</span>
            </h1>
            <p className="lift-in d2" style={{ fontSize: 18, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7 }}>
              The garment you're holding is part of our early product-validation process. Your honest feedback helps determine what moves into the first official collection.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="lift-in section-eyebrow">What to Evaluate</div>
              <h2 className="lift-in d1 section-title">Please Evaluate the Following</h2>
              <div style={{ width: 56, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
              <div className="lift-in d2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Fabric quality', 'Fit and sizing', 'Comfort and breathability', 'Sublimation print quality', 'Color accuracy', 'Label execution', 'The message itself', 'Emotional response to wearing it', 'Likelihood of wearing it regularly', 'Likelihood of recommending it', 'Interest in investing, partnering, or purchasing'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--light-gray)' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontSize: 15, color: 'var(--charcoal)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lift-in d2" style={{ background: 'white', borderRadius: 4, padding: 40, boxShadow: '3px 3px 0 var(--charcoal)' }}>
              <LiftForm type="sample" title="Share Your Feedback" subtitle="Your honest feedback is invaluable. We'll follow up to schedule a short conversation." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
