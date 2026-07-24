/**
 * Liftêd™ ProductCard
 * Displays a curated product concept with front/back toggle,
 * status badge, and CTA based on launch state.
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductCTA, getStatusBadge, getStatusColor } from '../config/launchState.js'

const COLLECTION_COLORS = {
  core: '#C8922A',
  pickup: '#5B8DB8',
  athlete: '#1A2744',
  youth: '#7B9E4A',
  collab: '#8B4513',
}

export default function ProductCard({ product }) {
  const [showBack, setShowBack] = useState(false)
  const cta = getProductCTA(product)
  const statusLabel = getStatusBadge(product.status)
  const statusColor = getStatusColor(product.status)
  const colColor = COLLECTION_COLORS[product.collectionId] || '#C8922A'

  const frontImg = product.sampleFront || product.frontMockup || product.frontArtwork
  const backImg = product.sampleBack || product.backMockup || product.backArtwork
  const hasImages = frontImg || backImg

  return (
    <div style={{
      background: 'white', borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
      transition: 'transform 0.22s, box-shadow 0.22s',
      display: 'flex', flexDirection: 'column',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', background: '#F5F0E8', aspectRatio: '4/5', overflow: 'hidden' }}>
        {hasImages ? (
          <img
            src={showBack && backImg ? backImg : (frontImg || backImg)}
            alt={`${product.title} — ${showBack ? 'back' : 'front'}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }}
          />
        ) : (
          /* Placeholder when no image yet */
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: 12, background: `${colColor}18`, border: `2px dashed ${colColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 28, color: colColor }}>↑</span>
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--navy)', textAlign: 'center', lineHeight: 1.4 }}>
              {showBack ? product.backMessage : product.frontMessage}
            </p>
            <p style={{ fontSize: 11, color: 'var(--mid-gray)', marginTop: 8, fontStyle: 'italic' }}>
              {/* PLACEHOLDER: Upload {showBack ? 'back' : 'front'} artwork to /public/products/{product.id.toLowerCase()}/ */}
              Artwork coming soon
            </p>
          </div>
        )}

        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: statusColor, color: 'white',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: 100,
        }}>{statusLabel}</div>

        {/* Front/Back toggle */}
        {(frontImg && backImg) && (
          <button
            onClick={() => setShowBack(b => !b)}
            style={{
              position: 'absolute', bottom: 12, right: 12,
              background: 'rgba(0,0,0,0.55)', color: 'white',
              border: 'none', borderRadius: 100, padding: '5px 12px',
              fontSize: 11, fontWeight: 600, cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >{showBack ? '← Front' : 'Back →'}</button>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: colColor, marginBottom: 6 }}>{product.collection}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.3 }}>{product.title}</h3>
        <p style={{ fontSize: 13, color: 'var(--mid-gray)', lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
          {showBack ? product.backMessage : product.frontMessage}
        </p>
        {cta.url.startsWith('http') ? (
          <a href={cta.url} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, background: colColor, color: 'white', textDecoration: 'none', padding: '11px', borderRadius: 100 }}>{cta.label}</a>
        ) : (
          <Link to={cta.url} style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, background: colColor, color: 'white', textDecoration: 'none', padding: '11px', borderRadius: 100 }}>{cta.label}</Link>
        )}
      </div>
    </div>
  )
}
