import React from 'react'

export default function PortalSchedule() {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Schedule</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 36px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: 32 }}>Schedule a Conversation</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(247,244,236,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
            Ready to discuss the Liftêd™ opportunity? Book a call directly with the founder using the calendar below.
          </p>
          <div style={{ background: 'rgba(247,244,236,0.04)', border: '1px solid rgba(247,244,236,0.1)', padding: '24px', marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Available Call Types</div>
            {['Investor Introduction Call (30 min)', 'Deep-Dive Business Review (60 min)', 'Partnership Exploration Call (30 min)', 'General Inquiry Call (20 min)'].map(t => (
              <div key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.6)', padding: '8px 0', borderBottom: '1px solid rgba(247,244,236,0.06)', display: 'flex', gap: 8 }}>
                <span style={{ color: 'var(--burnt-orange)' }}>→</span> {t}
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(199,106,50,0.08)', border: '1px solid rgba(199,106,50,0.2)', padding: '14px 18px', borderLeft: '3px solid var(--burnt-orange)' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.55)', margin: 0 }}>
              HighLevel calendar booking will be embedded here once the calendar is configured. Contact <a href="mailto:pete@armsreachdigital.com" style={{ color: 'var(--sand)' }}>pete@armsreachdigital.com</a> to schedule directly in the meantime.
            </p>
          </div>
        </div>
        <div style={{ background: 'rgba(247,244,236,0.04)', border: '1px solid rgba(247,244,236,0.1)', padding: '32px', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* HighLevel calendar embed goes here */}
          {/* <iframe src="YOUR_HIGHLEVEL_CALENDAR_URL" width="100%" height="600" frameBorder="0" /> */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(247,244,236,0.25)', marginBottom: 8 }}>CALENDAR PLACEHOLDER</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(247,244,236,0.35)' }}>HighLevel booking calendar will appear here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
