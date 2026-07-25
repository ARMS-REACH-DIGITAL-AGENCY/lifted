/**
 * /shop — Liftêd<TM/> Storefront (Coming Soon)
 * Phase 1: Branded coming-soon storefront with collection previews, product status labels,
 *           preorder-interest CTA, and founding-community signup.
 *
 * Shopify integration placeholders are included but inactive.
 * When Shopify Storefront API is ready:
 *   1. Set VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_TOKEN in Vercel env vars
 *   2. Replace SHOPIFY_PRODUCTS array entries with real Shopify product GIDs
 *   3. Uncomment the Storefront API fetch in useEffect
 *   4. The cart/checkout flow is handled by Shopify — this page remains the branded frontend
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandE from '../components/BrandE.jsx'
import { TM } from '../components/TM.jsx'

// ── Shopify integration config (inactive until env vars are set) ──────────────
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || null
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || null
const SHOPIFY_ENABLED = !!(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN)

// ── Founding collection product catalog ──────────────────────────────────────
// Replace shopifyProductId with real Shopify GIDs when store is connected.
// Status: 'coming-soon' | 'preorder' | 'available' | 'sold-out'
const COLLECTIONS = [
  {
    id: 'core',
    name: 'Core Collection',
    tagline: 'Daily brand affinity. Wear what you believe.',
    color: 'var(--charcoal)',
    accent: 'var(--sand)',
    products: [
      {
        sku: 'LFT-001',
        name: 'You Matter Here — Tee',
        description: 'Front: "You matter here." Back: "Dear person behind me: Your presence makes a difference, even on the days you feel invisible."',
        status: 'coming-soon',
        priceRange: '$34–$38',
        shopifyProductId: null, // Replace with Shopify GID when live
        image: '/products/lft-001/front.jpg',
      },
      {
        sku: 'LFT-002',
        name: 'Turn the L Up — Tee',
        description: 'Front: "Turn the L Up." Back: "You\'re Not a Loser. You\'re Liftêd<TM/>."',
        status: 'coming-soon',
        priceRange: '$34–$38',
        shopifyProductId: null,
        image: null,
      },
    ],
  },
  {
    id: 'pick-me-up',
    name: 'Pick-Me-Up Collection',
    tagline: 'Direct encouragement. For the person who needs it today.',
    color: 'var(--earth-brown)',
    accent: 'var(--burnt-orange)',
    products: [
      {
        sku: 'LFT-003',
        name: 'Less Labels — Tee',
        description: 'Front: "Less Labels." Back: "More Liftêd<TM/>. The world doesn\'t need another label. It needs more encouragement."',
        status: 'coming-soon',
        priceRange: '$34–$38',
        shopifyProductId: null,
        image: null,
      },
    ],
  },
  {
    id: 'athlete',
    name: 'Athlete Collection',
    tagline: 'Discipline. Resilience. Showing up.',
    color: 'var(--muted-olive)',
    accent: 'var(--sand)',
    products: [
      {
        sku: 'LFT-004',
        name: 'Show Up — Performance Tee',
        description: 'Built for training. Front: "Show Up." Back: "The hardest part is already done."',
        status: 'coming-soon',
        priceRange: '$38–$44',
        shopifyProductId: null,
        image: null,
      },
    ],
  },
  {
    id: 'youth',
    name: 'Youth Collection',
    tagline: 'Confidence and identity for the next generation.',
    color: 'var(--charcoal)',
    accent: 'var(--burnt-orange)',
    products: [
      {
        sku: 'LFT-005',
        name: 'You Belong Here — Youth Tee',
        description: 'Front: "You belong here." Back: "This room is better because you\'re in it."',
        status: 'coming-soon',
        priceRange: '$28–$32',
        shopifyProductId: null,
        image: null,
      },
    ],
  },
  {
    id: 'collaboration',
    name: 'Collaboration Collection',
    tagline: 'Co-branded editions for organizations, causes, and events.',
    color: 'var(--black)',
    accent: 'var(--burnt-orange)',
    products: [
      {
        sku: 'LFT-006',
        name: 'Custom Collaboration Edition',
        description: 'Your organization\'s identity + the Liftêd<TM/> encouragement message. Built for your event, cause, or campaign.',
        status: 'coming-soon',
        priceRange: 'Custom pricing',
        shopifyProductId: null,
        image: null,
      },
    ],
  },
]

const STATUS_LABELS = {
  'coming-soon': { label: 'Coming Soon', bg: 'rgba(41,42,40,0.08)', color: 'var(--muted-olive)', border: '1px solid rgba(41,42,40,0.15)' },
  'preorder':    { label: 'Pre-Order Open', bg: 'rgba(199,106,50,0.12)', color: 'var(--burnt-orange)', border: '1px solid rgba(199,106,50,0.3)' },
  'available':   { label: 'In Stock', bg: 'rgba(90,68,52,0.1)', color: 'var(--earth-brown)', border: '1px solid rgba(90,68,52,0.25)' },
  'sold-out':    { label: 'Sold Out', bg: 'rgba(41,42,40,0.05)', color: 'rgba(41,42,40,0.4)', border: '1px solid rgba(41,42,40,0.1)' },
}

function StatusBadge({ status }) {
  const s = STATUS_LABELS[status] || STATUS_LABELS['coming-soon']
  return (
    <span style={{
      fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      padding: '4px 10px', ...s,
    }}>{s.label}</span>
  )
}

function ProductCard({ product }) {
  const hasImage = product.image && product.image !== null
  return (
    <div style={{
      background: 'var(--off-white)',
      border: '1.5px solid var(--charcoal)',
      boxShadow: '3px 3px 0 var(--charcoal)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Image area */}
      <div style={{
        background: hasImage ? 'transparent' : 'var(--charcoal)',
        aspectRatio: '4/5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', position: 'relative',
      }}>
        {hasImage ? (
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        ) : (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'rgba(247,244,236,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Product Photo</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(247,244,236,0.15)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Coming Soon</div>
          </div>
        )}
        {/* SKU label */}
        <div style={{
          position: 'absolute', top: 10, left: 10,
          fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          background: 'var(--burnt-orange)', color: 'var(--off-white)',
          padding: '3px 8px',
        }}>{product.sku}</div>
      </div>

      {/* Info */}
      <div style={{ padding: '18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--charcoal)', textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>{product.name}</h3>
          <StatusBadge status={product.status} />
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--muted-olive)', lineHeight: 1.65, flex: 1, marginBottom: 14, fontStyle: 'italic' }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--charcoal)', fontWeight: 700 }}>{product.priceRange}</span>
          {product.status === 'available' && product.shopifyProductId ? (
            <button style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', padding: '9px 16px', cursor: 'pointer', borderRadius: 'var(--radius)' }}>
              Add to Cart
            </button>
          ) : (
            <Link to="/founding-community" style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: 'var(--burnt-orange)', textDecoration: 'none', padding: '8px 0', borderBottom: '1.5px solid var(--burnt-orange)' }}>
              Get Notified →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyStatus, setNotifyStatus] = useState('idle')

  const allProducts = COLLECTIONS.flatMap(c => c.products.map(p => ({ ...p, collectionId: c.id, collectionName: c.name })))
  const filteredProducts = activeFilter === 'all' ? allProducts : allProducts.filter(p => p.collectionId === activeFilter)

  const handleNotify = (e) => {
    e.preventDefault()
    if (!notifyEmail) return
    // Redirect to founding community with email pre-filled
    window.location.href = `/founding-community?email=${encodeURIComponent(notifyEmail)}&type=early-buyer`
  }

  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 72 }}>

      {/* ── Hero ── */}
      <div style={{ background: 'var(--black)', borderBottom: '3px solid var(--burnt-orange)', padding: '64px 0 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--burnt-orange)' }}>Shop</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', border: '1px solid rgba(199,106,50,0.4)', borderRadius: 'var(--radius)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--burnt-orange)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burnt-orange)' }}>Samples in Production</span>
            </div>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--off-white)', lineHeight: 1.0, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20 }}>
            The Founding<br />Collection
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(247,244,236,0.65)', lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
            The first Liftêd<TM/> private-label garments are currently in sample production. Ordering opens after sample validation is complete. Join the founding community to be first in line.
          </p>
          {/* Notify form */}
          <form onSubmit={handleNotify} style={{ display: 'flex', gap: 8, maxWidth: 420, flexWrap: 'wrap' }}>
            <input
              type="email"
              value={notifyEmail}
              onChange={e => setNotifyEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                flex: 1, minWidth: 200, padding: '11px 14px',
                background: 'rgba(247,244,236,0.08)', border: '1.5px solid rgba(247,244,236,0.2)',
                fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--off-white)',
                outline: 'none', borderRadius: 'var(--radius)',
              }}
            />
            <button type="submit" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'var(--burnt-orange)', color: 'var(--off-white)', border: 'none', padding: '11px 20px', cursor: 'pointer', borderRadius: 'var(--radius)', whiteSpace: 'nowrap' }}>
              Notify Me
            </button>
          </form>
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        </div>
      </div>

      {/* ── Collection filters ── */}
      <div style={{ background: 'var(--charcoal)', padding: '0 24px', borderBottom: '1px solid rgba(247,244,236,0.08)', overflowX: 'auto' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 0 }}>
          {[{ id: 'all', name: 'All Collections' }, ...COLLECTIONS.map(c => ({ id: c.id, name: c.name }))].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '16px 18px', whiteSpace: 'nowrap',
                color: activeFilter === f.id ? 'var(--sand)' : 'rgba(247,244,236,0.45)',
                borderBottom: activeFilter === f.id ? '2px solid var(--burnt-orange)' : '2px solid transparent',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >{f.name}</button>
          ))}
        </div>
      </div>

      {/* ── Product grid ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24, marginBottom: 64 }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>

        {/* Collaboration CTA */}
        <div style={{ background: 'var(--black)', border: '1.5px solid var(--burnt-orange)', padding: '40px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--burnt-orange)', marginBottom: 12 }}>Collaboration Collection</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 3vw, 28px)', color: 'var(--off-white)', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 14 }}>Want a Custom Liftêd<TM/> Edition?</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(247,244,236,0.6)', lineHeight: 1.7, margin: 0 }}>
              Organizations, schools, gyms, causes, and corporate clients can create a co-branded Liftêd<TM/> edition for their event, campaign, or community.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
            <Link to="/collaborate" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--burnt-orange)', color: 'var(--off-white)', textDecoration: 'none', padding: '13px 24px', borderRadius: 'var(--radius)' }}>
              Start a Collaboration
            </Link>
            <Link to="/wholesale" style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'transparent', color: 'rgba(247,244,236,0.6)', textDecoration: 'none', padding: '13px 24px', border: '1.5px solid rgba(247,244,236,0.2)', borderRadius: 'var(--radius)' }}>
              Wholesale Inquiry
            </Link>
          </div>
        </div>

        {/* Shopify integration notice (dev only) */}
        {!SHOPIFY_ENABLED && (
          <div style={{ marginTop: 32, padding: '12px 16px', background: 'rgba(41,42,40,0.05)', border: '1px dashed rgba(41,42,40,0.2)', fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(41,42,40,0.4)', lineHeight: 1.6 }}>
            <strong>Shopify Integration Placeholder:</strong> Set <code>VITE_SHOPIFY_STORE_DOMAIN</code> and <code>VITE_SHOPIFY_STOREFRONT_TOKEN</code> in Vercel environment variables to enable live product data, cart, and checkout. This notice is only visible when Shopify is not configured.
          </div>
        )}
      </div>
    </div>
  )
}
