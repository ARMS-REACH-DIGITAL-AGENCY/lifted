/**
 * /story — The Liftêd<TM/> Origin Story
 * Historical photograph: Cesare "Chaz" DeLuca, Liftêd Co-Founder, 2012.
 * Real photograph — no AI replacement, no face retouching.
 * Light exposure correction only.
 */
import React from 'react'
import { Link } from 'react-router-dom'
import BrandE from '../components/BrandE.jsx'
import { TM } from '../components/TM.jsx'

export default function Story() {
  return (
    <div style={{ background: 'var(--warm-cream)', minHeight: '100vh', paddingTop: 72 }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'var(--black)',
        borderBottom: '3px solid var(--burnt-orange)',
        padding: '72px 0 56px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'none',
            color: 'var(--burnt-orange)', marginBottom: 16,
          }}>Our Story</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 6vw, 64px)',
            color: 'var(--off-white)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'none',
            marginBottom: 24,
          }}>
            An Id<BrandE before="" after="a 15 Years" ariaLabel="An Idea 15 Years" /><br />in the Making.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17,
            color: 'rgba(247,244,236,0.65)', lineHeight: 1.75, maxWidth: 580,
          }}>
            Liftêd<TM/> did not begin in a boardroom or branding session.
          </p>
        </div>
      </div>

      {/* ── Origin Story + Photo ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 56,
          alignItems: 'start',
        }}>

          {/* Story text */}
          <div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'none',
              color: 'var(--burnt-orange)', marginBottom: 20,
            }}>Where It Started</div>

            {[
              {
                text: `It began when Pete DeLuca's son, Cesare — known as Chaz — came home with a business idea in seventh grade. He was only 12 years old, but he already saw the possibility of building something of his own.`,
                bold: false,
              },
              {
                text: `Together with a friend, Chaz created the first Lifted Team Edition shirt.`,
                bold: true,
                italic: true,
              },
              {
                text: `Life moved forward, and the idea was placed on a shelf — but it was never completely forgotten.`,
                bold: false,
              },
              {
                text: `Fifteen years later, Pete came across a photograph of Chaz wearing that first shirt. The image brought back more than a business concept. It reminded him of the entrepreneurial spirit his son had shown at such a young age.`,
                bold: false,
              },
              {
                text: `Today, Chaz is 27 years old and has earned a law degree. The childhood idea has grown into a larger mission: creating apparel that encourages the person wearing it and the person standing behind them.`,
                bold: false,
              },
              {
                text: `What began as a seventh-grade business idea is now being brought to life by a father who wants the original young entrepreneur beside him as a business partner.`,
                bold: false,
              },
            ].map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-body)', fontSize: 16,
                color: 'var(--charcoal)', lineHeight: 1.8,
                marginBottom: 20,
                fontWeight: para.bold ? 700 : 400,
                fontStyle: para.italic ? 'italic' : 'normal',
              }}>{para.text}</p>
            ))}

            {/* Closing line */}
            <div style={{
              marginTop: 32,
              paddingTop: 24,
              borderTop: '2px solid var(--burnt-orange)',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                color: 'var(--charcoal)',
                lineHeight: 1.3,
                textTransform: 'none',
                letterSpacing: '-0.01em',
                margin: 0,
              }}>
                His idea. Their next chapter.<br />
                A mission 15 years in the making.
              </p>
            </div>
          </div>

          {/* Historical photograph — Chaz DeLuca, 2012 */}
          <div>
            <figure style={{ margin: 0 }}>
              <div style={{
                border: '2px solid var(--charcoal)',
                boxShadow: '6px 6px 0 var(--charcoal)',
                overflow: 'hidden',
                background: 'var(--black)',
                maxWidth: 380,
              }}>
                {/* Archive label bar */}
                <div style={{
                  background: 'var(--charcoal)',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: 'var(--burnt-orange)', flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'none',
                    color: 'rgba(247,244,236,0.6)',
                  }}>Brand Archive · 2012</span>
                </div>

                {/* Real photograph — no AI replacement */}
                <img
                  src="/brand/story/origin-team-edition-shirt.jpg"
                  alt="Cesare 'Chaz' DeLuca, Liftêd Co-Founder, wearing the original Lifted Team Edition shirt, 2012"
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'contain',
                    background: 'var(--black)',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <figcaption style={{
                marginTop: 14,
                maxWidth: 380,
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'var(--muted-olive)',
                lineHeight: 1.65,
                fontStyle: 'italic',
                paddingLeft: 10,
                borderLeft: '2px solid var(--burnt-orange)',
              }}>
                Cesare "Chaz" DeLuca, Liftêd Co-Founder — wearing the first Lifted Team Edition shirt, created from a seventh-grade business idea approximately 15 years ago.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* ── What the Idea Became ── */}
      <div style={{
        background: 'var(--black)',
        marginTop: 80,
        padding: '72px 0 80px',
        borderTop: '3px solid var(--burnt-orange)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'none',
            color: 'var(--burnt-orange)', marginBottom: 16,
          }}>The Mission Today</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 4vw, 48px)',
            color: 'var(--off-white)',
            textTransform: 'none',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }} aria-label="What the Idea Became">What the Id<span style={{ color: 'var(--sand)', textTransform: 'none' }}>ê</span>a Became</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 2,
            marginBottom: 56,
          }}>
            {[
              {
                label: 'Replacing Limiting Labels',
                body: `The world is full of labels that diminish. Liftêd<TM/> exists to replace them — with visible encouragement that travels with the wearer everywhere they go.`,
                accent: false,
              },
              {
                label: 'Reclaiming the L',
                body: `The L-hand gesture has long been used as a symbol of failure. Liftêd<TM/> reclaims it. You're Not a Loser. You're Liftêd<TM/>. Turn the L Up.`,
                accent: true,
              },
              {
                label: 'Less Labels. More Liftêd<TM/>.',
                body: `Every garment carries two messages: one for the person wearing it, and one for the person standing behind them. One shirt. Two people lifted.`,
                accent: false,
              },
            ].map((item) => (
              <div key={item.label} style={{
                padding: '32px 28px',
                background: item.accent ? 'var(--burnt-orange)' : 'rgba(247,244,236,0.04)',
                borderLeft: item.accent ? 'none' : '1px solid rgba(247,244,236,0.08)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'none',
                  color: item.accent ? 'rgba(247,244,236,0.7)' : 'var(--burnt-orange)',
                  marginBottom: 14,
                }}>{item.label}</div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15,
                  color: item.accent ? 'var(--off-white)' : 'rgba(247,244,236,0.7)',
                  lineHeight: 1.75, margin: 0,
                }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* Brand phrases */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
            {[
              `"You're Not a Loser. You're Liftêd<TM/>."`,
              `"Turn the L Up."`,
              `"Less Labels. More Liftêd<TM/>."`,
              `"The World Needs More Liftêd<TM/>."`,
            ].map(phrase => (
              <div key={phrase} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(13px, 2vw, 16px)',
                color: 'var(--sand)',
                padding: '10px 18px',
                border: '1.5px solid rgba(199,106,50,0.3)',
                letterSpacing: '0.01em',
              }}>{phrase}</div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/collections" style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'none',
              background: 'var(--burnt-orange)', color: 'var(--off-white)',
              textDecoration: 'none', padding: '14px 28px',
              borderRadius: 'var(--radius)',
            }}>See the Collections</Link>
            <Link to="/founding-community" style={{
              fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'none',
              background: 'transparent', color: 'var(--off-white)',
              textDecoration: 'none', padding: '14px 28px',
              border: '1.5px solid rgba(247,244,236,0.3)',
              borderRadius: 'var(--radius)',
            }}>Join the Community</Link>
          </div>
        </div>
      </div>

    </div>
  )
}
