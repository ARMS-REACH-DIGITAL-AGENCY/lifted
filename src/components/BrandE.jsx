/**
 * BrandE — Liftêd™ Brand-Detail Typography Utility
 *
 * Replaces a selected letter 'e' in a headline with the Liftêd™ ê character,
 * styled in the approved gold accent color. Used as a deliberate brand signature
 * on 4–6 major headlines across the site.
 *
 * Rules:
 * - One highlighted ê per headline maximum
 * - Only used in high-impact display headlines — never in body copy, nav, forms, or legal text
 * - Font, weight, size, line-height, and spacing are unchanged
 * - aria-label always contains the plain readable phrase for accessibility
 * - The gold color uses var(--sand) — the approved brand accent token
 *
 * Usage:
 *   <BrandE before="More Than Appar" after="l." ariaLabel="More Than Apparel." />
 *   <BrandE before="Wear Encourag" after="ment." ariaLabel="Wear Encouragement." />
 *
 * The component renders: [before]<span class="brand-e">ê</span>[after]
 * Wrap in your heading tag with aria-label on the heading itself.
 */
import React from 'react'

export function BrandE({ before, after, ariaLabel, style = {} }) {
  return (
    <span aria-label={ariaLabel || undefined} style={{ display: 'contents' }}>
      {before}
      <span
        className="brand-e"
        aria-hidden="true"
        style={{
          color: 'var(--sand)',
          // Inherit all other typographic properties from parent
          font: 'inherit',
          fontWeight: 'inherit',
          fontSize: 'inherit',
         lineHeight: 'inherit',
         letterSpacing: 'inherit',
          textTransform: 'none',  // ALWAYS lowercase ê — never uppercase, even inside all-caps headings
         ...style,
        }}
      >ê</span>
      {after}
    </span>
  )
}

export default BrandE
