import React from 'react'

export default function PortalOpportunity() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Business Opportunity</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 32 }}>The Liftêd™ Opportunity</h1>

      {[
        { title: 'Business Model', content: 'Liftêd™ operates across three primary revenue lanes: (1) Direct-to-consumer e-commerce through the Liftêd™ online store; (2) Wholesale distribution to retail partners, gyms, boutiques, and specialty stores; (3) Collaboration revenue from co-branded campaigns with organizations, causes, schools, churches, corporate clients, and events.' },
        { title: 'Target Audiences', content: 'Liftêd™ serves five primary audience segments: fitness and athletic communities; personal development and wellness communities; youth and education programs; corporate and organizational clients; and cause-based and community organizations. Each segment represents a distinct purchasing pattern and collaboration opportunity.' },
        { title: 'Founding Collections', content: 'The founding product line includes five collections: Core (daily brand affinity), Pick-Me-Up (direct encouragement messages), Athlete (discipline and resilience), Youth (confidence and identity), and Collaboration (co-branded editions for organizations and causes). Each collection is designed to serve a specific audience segment.' },
        { title: 'The Occasion Engine', content: 'Liftêd™ is designed to be occasion-driven. Every major life event — graduation, championship, recovery, recognition, awareness — is a potential Liftêd™ moment. The brand\'s collaboration model allows organizations to create custom editions for specific occasions, expanding the addressable market beyond retail.' },
        { title: 'The Collaboration Engine', content: 'Organizations that collaborate with Liftêd™ receive a co-branded garment that carries both the organization\'s identity and the Liftêd™ encouragement message. This creates a recurring revenue stream as organizations return for new campaigns, events, and seasons.' },
        { title: 'Commercial Revenue Lanes', content: 'Beyond direct consumer sales, Liftêd™ targets corporate apparel programs, employee recognition campaigns, leadership gifts, golf tournament merchandise, charity event apparel, and fundraising stores. These commercial channels offer higher average order values and recurring relationships.' },
        { title: 'Growth Strategy', content: 'Phase 1: Validate the product with the founding collection and founding community. Phase 2: Launch direct-to-consumer e-commerce and begin wholesale outreach. Phase 3: Scale the collaboration engine with organizational partnerships. Phase 4: Expand the product line and explore licensing opportunities.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(247,244,236,0.08)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--sand)', textTransform: 'uppercase', marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.72)', lineHeight: 1.75 }}>{s.content}</p>
        </div>
      ))}
    </div>
  )
}
