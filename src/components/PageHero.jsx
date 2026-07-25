/**
 * PageHero — shared hero section for all interior pages
 * Consistent: eyebrow label → h1 → description → optional CTAs
 * Font: Archivo Black explicitly loaded, not via CSS variable fallback
 * Padding: 148px top (80px content + 68px nav clearance), 64px bottom
 */
import React from 'react'

export default function PageHero({ eyebrow, heading, description, children, bgImage, bgPosition = 'right center', bgOpacity = 0.38 }) {
  return (
    <section style={{
      background: 'var(--black)',
      padding: '148px 0 64px',
      borderBottom: '3px solid var(--burnt-orange)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Optional screened background image */}
      {bgImage && (
        <>
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '55%', height: '100%',
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: bgPosition,
            opacity: bgOpacity,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, var(--black) 0%, var(--black) 42%, rgba(23,24,22,0.72) 62%, rgba(23,24,22,0.0) 100%)',
            pointerEvents: 'none',
          }} />
        </>
      )}

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 680 }}>
          {/* Eyebrow label */}
          {eyebrow && (
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--burnt-orange)', marginBottom: 16,
            }}>{eyebrow}</div>
          )}

          {/* Heading — always Archivo Black, always clamp(42px,6vw,72px) */}
          <h1 style={{
          fontFamily: "'Montserrat', Impact, sans-serif",
          fontSize: 'clamp(32px, 6vw, 72px)',
            fontWeight: 400,
            color: 'var(--off-white)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            textTransform: 'none',
          }}>{heading}</h1>

          {/* Description */}
          {description && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: 'rgba(247,244,236,0.7)',
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: children ? 32 : 0,
            }}>{description}</p>
          )}

          {/* Optional CTAs */}
          {children}
        </div>
      </div>
    </section>
  )
}
