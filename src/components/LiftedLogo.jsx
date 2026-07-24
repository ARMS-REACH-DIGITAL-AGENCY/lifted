/**
 * LiftedLogo — Reusable brand identity component
 *
 * NEVER recreate the Liftêd™ logo with text, CSS, or AI.
 * Always use the approved asset files from /public/brand/lifted/
 *
 * Usage:
 *   <LiftedLogo variant="white" />   — for dark navy backgrounds
 *   <LiftedLogo variant="navy" />    — for cream/white backgrounds
 *   <LiftedLogo variant="primary" /> — original brown/slate version
 *   <LiftedLogo variant="gold" />    — gold version (check contrast)
 *   <LiftedIcon variant="white" />   — compact L icon only
 */
import React from 'react'

const WORDMARK_SRCS = {
  white:   '/brand/lifted/lifted-wordmark-white.png',
  navy:    '/brand/lifted/lifted-wordmark-navy.png',
  gold:    '/brand/lifted/lifted-wordmark-gold.png',
  primary: '/brand/lifted/lifted-wordmark-primary.png',
}

const ICON_SRCS = {
  white:   '/brand/lifted/lifted-icon-white.png',
  primary: '/brand/lifted/lifted-icon-primary.png',
  navy:    '/brand/lifted/lifted-wordmark-navy.png',
  gold:    '/brand/lifted/lifted-wordmark-gold.png',
}

export function LiftedLogo({
  variant = 'white',
  height = 36,
  style = {},
  className = '',
}) {
  const src = WORDMARK_SRCS[variant] || WORDMARK_SRCS.white
  return (
    <img
      src={src}
      alt="Liftêd™"
      height={height}
      style={{
        height,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        ...style,
      }}
      className={className}
    />
  )
}

export function LiftedIcon({
  variant = 'primary',
  size = 36,
  style = {},
  className = '',
}) {
  const src = ICON_SRCS[variant] || ICON_SRCS.primary
  return (
    <img
      src={src}
      alt="Liftêd™ icon"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        borderRadius: 6,
        ...style,
      }}
      className={className}
    />
  )
}

export default LiftedLogo
