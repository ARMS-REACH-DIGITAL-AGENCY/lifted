import React from 'react'

export default function PortalFinancials() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Financial Information</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 24 }}>Financial Overview</h1>
      <div style={{ background: 'rgba(199,106,50,0.08)', border: '1px solid rgba(199,106,50,0.3)', padding: '16px 20px', marginBottom: 32, borderLeft: '3px solid var(--burnt-orange)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, margin: 0 }}>
          <strong style={{ color: 'var(--sand)' }}>Important:</strong> All financial projections presented in this section are estimates based on management assumptions. They are not guarantees of future performance. Actual results may differ materially. Liftêd™ is a pre-revenue company. Detailed financial models are available in the Document Library.
        </p>
      </div>
      {[
        { title: 'Assumptions', content: 'Financial projections are based on the following key assumptions: successful sample validation and first production run completion; direct-to-consumer e-commerce launch within 6 months of funding; wholesale distribution beginning in Year 1; collaboration revenue beginning in Year 1 with 3–5 organizational partners; average order value of $35–$55 for direct consumer sales.' },
        { title: 'Projections', content: 'Year 1 revenue target: $137,000 (conservative estimate based on founding collection launch and initial wholesale). Year 2 revenue target: $450,000 (e-commerce growth + wholesale expansion + collaboration revenue). Year 3 revenue target: $1.3M+ (scaled collaboration engine + wholesale network + potential licensing). All figures are estimates. See financial model in Document Library.' },
        { title: 'Funding Needs', content: 'Liftêd™ is seeking initial funding to complete sample validation, fund the first production run, launch e-commerce infrastructure, and support initial marketing and community building. Specific funding amounts and terms will be presented through appropriate legal documentation.' },
        { title: 'Use of Funds', content: 'Proposed use of funds: product development and first production run; e-commerce platform and technology; marketing and community building; operations and working capital. Detailed use-of-funds breakdown is available in the Document Library.' },
        { title: 'Proposed Milestones', content: 'Funding milestones will be tied to: sample validation completion, first production run, e-commerce launch, first wholesale accounts, and first collaboration revenue. Milestone-based funding structure available upon request.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(247,244,236,0.08)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--sand)', textTransform: 'uppercase', marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.72)', lineHeight: 1.75 }}>{s.content}</p>
        </div>
      ))}
    </div>
  )
}
