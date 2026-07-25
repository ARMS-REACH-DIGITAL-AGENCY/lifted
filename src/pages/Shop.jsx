import { useState } from 'react';
import { Link } from 'react-router-dom';
import { skus } from '../data/skus.js';
import { TM } from '../components/TM.jsx';

const COLORS = {
  'Core': '#D4A843',
  'Pick-Me-Up': '#4A7FB5',
  'Athlete': '#C76A32',
  'Youth': '#8A9A5B',
  'Collaborations': '#C4748A',
};

const TABS = ['All', 'Core', 'Pick-Me-Up', 'Athlete', 'Youth', 'Collaborations'];

function SKUCard({ sku }) {
  const [flipped, setFlipped] = useState(false);
  const color = COLORS[sku.collection] || '#D4A843';
  const isA = sku.priority === 'A';
  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        cursor: 'pointer',
        background: 'var(--off-white)',
        border: `1.5px solid ${flipped ? color : 'rgba(41,42,40,0.15)'}`,
        borderTop: `3px solid ${color}`,
        borderRadius: 4,
        padding: '18px 16px',
        display: 'flex', flexDirection: 'column', gap: 8,
        minHeight: 210,
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: flipped ? `2px 2px 0 ${color}50` : '2px 2px 0 rgba(41,42,40,0.07)',
        position: 'relative',
      }}
    >
      {isA && (
        <span style={{
          position: 'absolute', top: 8, right: 8,
          background: color, color: '#fff',
          fontSize: 8, fontWeight: 700, letterSpacing: '0.1em',
          padding: '2px 6px', borderRadius: 2,
          fontFamily: 'var(--font-body)', textTransform: 'uppercase',
        }}>Founding Sample</span>
      )}
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color, fontFamily: 'var(--font-body)' }}>
        {sku.collection === 'Collaborations' ? 'Collaboration Collection' : `${sku.collection} Collection`}
      </span>
      <span style={{ fontSize: 9, color: 'var(--muted-olive)', fontFamily: 'var(--font-body)' }}>{sku.sku}</span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 9, fontFamily: 'var(--font-body)' }}>
        <span style={{ color: !flipped ? color : 'var(--muted-olive)', fontWeight: !flipped ? 700 : 400 }}>FRONT</span>
        <span style={{ color: 'var(--muted-olive)' }}>·</span>
        <span style={{ color: flipped ? color : 'var(--muted-olive)', fontWeight: flipped ? 700 : 400 }}>BACK</span>
        <span style={{ marginLeft: 'auto', opacity: 0.4 }}>tap to flip</span>
      </div>
      <div style={{
        fontFamily: flipped ? 'var(--font-body)' : 'var(--font-display)',
        fontWeight: flipped ? 400 : 900,
        fontSize: flipped ? 12 : 'clamp(14px, 1.8vw, 17px)',
        color: 'var(--charcoal)',
        lineHeight: flipped ? 1.65 : 1.25,
        flex: 1,
        whiteSpace: flipped ? 'pre-line' : 'normal',
      }}>
        {flipped ? sku.back : sku.front}
      </div>
      <span style={{ fontSize: 9, color: 'var(--muted-olive)', fontFamily: 'var(--font-body)', borderTop: '1px solid rgba(41,42,40,0.1)', paddingTop: 8 }}>
        PRE-ORDER — COMING SOON
      </span>
    </div>
  );
}

export default function Shop() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? skus : skus.filter(s => s.collection === active);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--black)', padding: '120px 0 56px', borderBottom: '3px solid var(--burnt-orange)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <span style={{
            display: 'inline-block', background: 'var(--burnt-orange)', color: 'white',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: 2, marginBottom: 20, fontFamily: 'var(--font-body)',
          }}>PRE-ORDER — COMING SOON</span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 64px)', color: 'var(--off-white)',
            lineHeight: 1.05, marginBottom: 16,
          }}>
            The Founding Coll<span style={{ color: '#D4A843', textTransform: 'none' }}>ê</span>ctions
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: 'rgba(238,233,222,0.7)', maxWidth: 540, lineHeight: 1.65, marginBottom: 32 }}>
            60 founding designs across five collections. Every shirt carries a message on the front — and a note to the person behind you on the back. Tap any card to read both sides.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/founding-community" style={{ display: 'inline-block', background: '#D4A843', color: 'var(--black)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 4, textDecoration: 'none' }}>
              Join the Founding Community
            </Link>
            <Link to="/collections" style={{ display: 'inline-block', border: '1.5px solid rgba(238,233,222,0.35)', color: 'var(--off-white)', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 4, textDecoration: 'none' }}>
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background: 'var(--warm-cream)', borderBottom: '1px solid rgba(41,42,40,0.12)', padding: '0 24px', position: 'sticky', top: 80, zIndex: 10, overflowX: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex' }}>
          {TABS.map(tab => {
            const color = tab === 'All' ? 'var(--charcoal)' : COLORS[tab];
            const isActive = active === tab;
            const count = tab === 'All' ? skus.length : skus.filter(s => s.collection === tab).length;
            return (
              <button key={tab} onClick={() => setActive(tab)} style={{
                fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '15px 18px', border: 'none', borderBottom: isActive ? `3px solid ${color}` : '3px solid transparent',
                background: 'transparent', color: isActive ? color : 'var(--muted-olive)', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'color 0.2s, border-color 0.2s',
              }}>{tab} ({count})</button>
            );
          })}
        </div>
      </div>

      {/* SKU Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
          {filtered.map(sku => <SKUCard key={sku.id} sku={sku} />)}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 64, padding: '40px 32px', background: 'var(--charcoal)', borderRadius: 4, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(238,233,222,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Want a custom Liftêd<TM/> edition for your organization?
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 28, color: 'var(--off-white)', marginBottom: 24 }}>
            Collaborat<span style={{ color: '#C4748A', textTransform: 'none' }}>ê</span> With Liftêd<TM/>
          </h3>
          <Link to="/collaborate" style={{ display: 'inline-block', background: '#C4748A', color: 'white', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 4, textDecoration: 'none' }}>
            Start a Collaboration
          </Link>
        </div>
      </section>
    </div>
  );
}
