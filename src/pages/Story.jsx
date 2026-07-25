/**
 * /story — The Liftêd™ Origin Story
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
    <div style={{ background: 'var(--black)', minHeight: '100vh' }}>

     {/* ── Hero ── */}
      <section style={{
        background: 'var(--black)',
        borderBottom: '3px solid var(--burnt-orange)',
        padding: '152px 0 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Screened Chaz photo — right side, shirt logo prominent */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '52%',
          height: '100%',
          backgroundImage: 'url(/brand/story/origin-team-edition-shirt.jpg)',
         backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
         opacity: 0.38,
          pointerEvents: 'none',
        }} />
        {/* Gradient: solid black on left protecting text, fades right */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(105deg, var(--black) 0%, var(--black) 42%, rgba(23,24,22,0.72) 62%, rgba(23,24,22,0.0) 100%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--burnt-orange)', marginBottom: 16,
            }}>OUR STORY</div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(42px, 6vw, 72px)',
              color: 'var(--off-white)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              textTransform: 'none',
              marginBottom: 24,
            }}>
              An Id<BrandE before="" after="a 15 Years" ariaLabel="An Idea 15 Years" /><br />in the Making.
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 17,
              color: 'rgba(247,244,236,0.7)', lineHeight: 1.75, maxWidth: 560,
            }}>
              Liftêd™ did not begin in a boardroom or branding session.
            </p>
          </div>
        </div>
      </section>

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
            }}>WHERE IT STARTED</div>

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
                maxWidth: 260,
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
                    maxHeight: 320,
                    display: 'block',
                    objectFit: 'contain',
                    objectPosition: 'center top',
                    background: 'var(--black)',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <figcaption style={{
                marginTop: 14,
                maxWidth: 260,
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
      {/* ── The Evolution & Psychology of Liftêd Today ── */}
      <div style={{
        background: 'var(--black)',
        marginTop: 80,
        padding: '80px 0 96px',
        borderTop: '3px solid var(--burnt-orange)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

          {/* Section header */}
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--burnt-orange)', marginBottom: 16,
          }}>THE MISSION</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            color: 'var(--off-white)',
            textTransform: 'none',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            The Evolution &amp; Psychology<br />of Lift<span style={{ color: 'var(--sand)', textTransform: 'none' }}>ê</span>d Today
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17,
            color: 'rgba(247,244,236,0.6)', lineHeight: 1.75,
            maxWidth: 640, marginBottom: 64,
          }}>
            What started as a seventh-grade idea became a brand built on a simple psychological truth: the words we carry shape how we see ourselves — and how others see us.
          </p>

          {/* Two-panel illustration layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 40,
            marginBottom: 64,
          }}>

            {/* Panel 1 — Encourage Yourself */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid rgba(247,244,236,0.1)',
                background: 'var(--charcoal)',
              }}>
                <img
                  src="/brand/story/pete-encourage-yourself.jpg"
                  alt="Pete DeLuca wearing a Liftêd hat, making the L hand gesture — Wear Liftêd to Encourage Yourself."
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />
              </div>
              <div style={{
                padding: '28px 0 0',
                borderTop: '3px solid var(--burnt-orange)',
                marginTop: 0,
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.5vw, 26px)',
                  color: 'var(--off-white)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  textTransform: 'none',
                  marginBottom: 16,
                }}>The Internal Lift</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15,
                  color: 'rgba(247,244,236,0.7)', lineHeight: 1.8, margin: 0,
                }}>
                  When you wear a message, you read it. You live in it. Liftêd™ apparel is designed to remind the wearer — first and foremost — of who they are and what they're capable of. The shirt you put on in the morning sets the tone for the day you're about to have.
                </p>
              </div>
            </div>

            {/* Panel 2 — Encourage Others */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid rgba(247,244,236,0.1)',
                background: 'var(--charcoal)',
              }}>
                <img
                  src="/brand/story/pete-encourage-others.jpg"
                  alt="Pete DeLuca wearing a Liftêd hat, pointing outward — While Also Encouraging Others."
                  style={{
                    width: '100%',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  loading="lazy"
                />
              </div>
              <div style={{
                padding: '28px 0 0',
                borderTop: '3px solid var(--burnt-orange)',
                marginTop: 0,
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(18px, 2.5vw, 26px)',
                  color: 'var(--off-white)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  textTransform: 'none',
                  marginBottom: 16,
                }}>The External Lift</h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15,
                  color: 'rgba(247,244,236,0.7)', lineHeight: 1.8, margin: 0,
                }}>
                 Every Liftêd™ garment carries a second message on the back — written for the person standing behind you. One shirt lifts two people. That's the psychology. That's the design.
                </p>
              </div>
            </div>

          </div>{/* end two-panel grid */}

          {/* Brand phrases */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
            {[
              `"You're Not a Loser. You're Liftêd™."`,
              `"Turn the L Up."`,
              `"Less Labels. More Liftêd™."`,
              `"The World Needs More Liftêd™."`,
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
