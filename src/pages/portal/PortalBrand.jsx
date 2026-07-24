import React from 'react'

export default function PortalBrand() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Brand Thesis</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 32 }}>The Liftêd™ Brand</h1>

      {[
        { title: 'Mission', content: 'Liftêd™ exists to create apparel that encourages the person wearing it — and the person standing behind them. Every garment is designed to lift two people simultaneously: the wearer and the observer.' },
        { title: 'The Consumer Problem', content: 'Most apparel communicates brand loyalty, athletic affiliation, or personal identity. Very little apparel communicates encouragement. Liftêd™ fills this gap by making encouragement wearable — and shareable.' },
        { title: 'Labels and Identity', content: 'The brand name "Liftêd™" is intentional. The ê is a stylized circumflex — a visual mark that signals something elevated. The brand name itself communicates the product\'s purpose: to lift.' },
        { title: 'The L-Hand Gesture', content: 'The L-hand gesture is a cultural symbol that has historically been associated with "loser." Liftêd™ reclaims it. "You\'re Not a Loser. You\'re Liftêd™." — Turn the L Up. This reframing is central to the brand\'s emotional positioning.' },
        { title: '"Turn the L Up"', content: 'The phrase "Turn the L Up" is a core brand concept. It takes the negative connotation of the L-hand gesture and inverts it — transforming a symbol of defeat into a symbol of elevation. This concept is woven throughout the brand\'s messaging, products, and community.' },
        { title: 'Private-Label Apparel Concept', content: 'Liftêd™ is being developed as a private-label apparel brand — not simply artwork printed on another consumer label. Every garment carries the Liftêd™ identity: custom labels, custom construction, and a consistent brand experience.' },
        { title: 'Front-and-Back Message System', content: 'Every Liftêd™ garment works in two directions. The front carries a message for the wearer — a personal affirmation or identity statement. The back carries a message for the observer — an unexpected encouragement for the person standing behind them. One garment. Two people lifted.' },
      ].map(s => (
        <div key={s.title} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(247,244,236,0.08)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--sand)', textTransform: 'uppercase', marginBottom: 12 }}>{s.title}</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.72)', lineHeight: 1.75 }}>{s.content}</p>
        </div>
      ))}
    </div>
  )
}
