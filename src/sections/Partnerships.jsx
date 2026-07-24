import React, { useEffect, useRef } from 'react'

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

const stages = [
  { stage: 'Founding Partner', offer: '3 co-branded concepts, samples, and launch plan', proof: 'Design fit, pricing, and margin validation' },
  { stage: 'Program Order', offer: 'Employee, member, conference, retreat, or event apparel', proof: 'Order size, quality, and reorder potential' },
  { stage: 'Fundraising Store', offer: 'Limited preorder store with defined revenue share', proof: 'Conversion and low-inventory economics' },
  { stage: 'Public Capsule', offer: 'Limited co-marketed drop to both audiences', proof: 'Reach, acquisition, UGC, and brand lift' },
]

export default function Partnerships() {
  const ref = useRef(null)
  useLiftIn(ref)

  return (
    <section id="partnerships" ref={ref} style={{ background: 'var(--off-white)', padding: '100px 24px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 64, alignItems: 'start' }}>
          <div>
            <div className="lift-in section-eyebrow">The Strategic Wedge</div>
            <h2 className="lift-in d1 section-title">Alumni, Schools & Athletic Communities</h2>
            <div style={{ width: 60, height: 3, background: 'var(--gold)', borderRadius: 2, margin: '0 0 24px' }} />
            <p className="lift-in d2 section-body" style={{ marginBottom: 20 }}>
              Start where identity, belonging, and distribution already exist. These communities already possess
              the three elements most consumer brands struggle to create: identity, emotional history, and a reason to share.
            </p>
            <p className="lift-in d3 section-body" style={{ marginBottom: 32 }}>
              One relationship can open employees, members, supporters, donors, or event participants.
              The same operating template can be repeated across schools and communities at scale.
            </p>
            <div className="lift-in d4" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Built-in affinity reduces the burden of inventing relevance from scratch', 'School-specific editions can support fundraising and community pride', 'Athletes, coaches, teachers, and alumni are natural ambassador candidates', 'A successful program expands from individual purchase to team order to recurring drop'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, marginTop: 2, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 15, color: 'var(--mid-gray)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lift-in d2">
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>Illustrative Partnership Path</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {stages.map((s, i) => (
                <div key={s.stage} style={{
                  background: 'white', borderRadius: 12, padding: 24,
                  borderLeft: '4px solid var(--gold)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'var(--gold)', color: 'var(--navy-deep)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 800, flexShrink: 0,
                    }}>{i + 1}</div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{s.stage}</h4>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--mid-gray)', lineHeight: 1.6, marginBottom: 6 }}><strong>Offer:</strong> {s.offer}</p>
                  <p style={{ fontSize: 13, color: 'var(--mid-gray)', lineHeight: 1.6 }}><strong>Proof:</strong> {s.proof}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
