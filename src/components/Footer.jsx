import React from 'react'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-deep)', color: 'rgba(255,255,255,0.7)', padding: '64px 24px 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, background: 'var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, color: 'var(--navy-deep)'
              }}>L</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'white' }}>
                Liftêd<sup style={{ fontSize: 11, fontFamily: 'var(--font-body)' }}>™</sup>
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              More Than Apparel. A Pick-Me-Up.<br />
              Wear Encouragement. Wear Liftêd™.
            </p>
            <p style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              WearLiftedToday.com
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Collections</h4>
            {['Core Collection', 'Pick-Me-Up Collection', 'Athlete Collection', 'Youth Collection', 'Alumni Collection'].map(c => (
              <p key={c} style={{ fontSize: 14, marginBottom: 8 }}>{c}</p>
            ))}
          </div>

          {/* Programs */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Programs</h4>
            {['The Liftêd Box', 'School & Team Programs', 'Corporate Wellness', 'Licensing', 'Collaborations'].map(c => (
              <p key={c} style={{ fontSize: 14, marginBottom: 8 }}>{c}</p>
            ))}
          </div>

          {/* Connect */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Connect</h4>
            {['#StayLiftêd', 'Instagram', 'TikTok', 'YouTube Shorts', 'Investor Inquiries'].map(c => (
              <p key={c} style={{ fontSize: 14, marginBottom: 8 }}>{c}</p>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13 }}>© 2025 Liftêd™. All rights reserved. The World Needs More Liftêd™.</p>
          <p style={{ fontSize: 13, color: 'var(--gold)' }}>Wear Encouragement. Wear Liftêd™.</p>
        </div>
      </div>
    </footer>
  )
}

