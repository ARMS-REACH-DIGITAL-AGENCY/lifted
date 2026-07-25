/**
 * BrandedHeadline — Headline with gold ê brand device
 *
 * Renders a heading where one specified word has its first 'e' replaced with gold ê.
 * The brand name Liftêd™ inside the heading uses BrandName component.
 *
 * Usage:
 *   <BrandedHeadline
 *     as="h1"
 *     text="The World Needs More Liftêd™."
 *     accentWord="Needs"
 *     theme="dark"
 *     className="section-title"
 *     style={{ fontSize: 'clamp(36px,5vw,64px)' }}
 *   />
 *
 * Rules (per brand spec):
 *   - accentWord: the word in which the first 'e' becomes gold ê
 *   - Only ONE ê per heading (the accentWord's first e)
 *   - If the heading contains Liftêd™, that is handled by BrandName — do not add another ê
 *   - aria-label always contains the plain readable phrase
 *   - textTransform: none enforced — title case only
 */
import React from 'react'
import BrandName from './BrandName.jsx'

export function BrandedHeadline({
  as: Tag = 'h2',
  text = '',
  accentWord = '',
  theme = 'dark',
  className = '',
  style = {},
  children,
}) {
  const goldColor = 'var(--sand, #D9A15B)'

  // Split text into segments, replacing Liftêd™ with BrandName and accentWord's first e with ê
  const renderText = (rawText) => {
    // Split on Liftêd™ (and variants) to handle brand name separately
    const brandPattern = /Liftêd™|Liftêd<TM\/>|Liftêd/g
    const parts = []
    let lastIndex = 0
    let match
    const regex = /Liftêd™|Liftêd/g

    while ((match = regex.exec(rawText)) !== null) {
      // Text before the brand name
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: rawText.slice(lastIndex, match.index) })
      }
      parts.push({ type: 'brand' })
      lastIndex = match.index + match[0].length
      // Skip the ™ if it follows immediately (we render it in BrandName)
      if (rawText[lastIndex] === '™') lastIndex++
    }
    if (lastIndex < rawText.length) {
      parts.push({ type: 'text', value: rawText.slice(lastIndex) })
    }

    // Now render each part, applying ê accent to accentWord in text segments
    let accentApplied = false
    return parts.map((part, i) => {
      if (part.type === 'brand') {
        return <BrandName key={i} theme={theme} />
      }
      // Text segment — split into words and apply accent to accentWord
      const words = part.value.split(/(\s+)/)
      return words.map((word, j) => {
        if (!accentApplied && accentWord && word.toLowerCase().startsWith(accentWord.toLowerCase())) {
          // Find first 'e' in this word and replace with gold ê
          const eIdx = word.search(/e/i)
          if (eIdx >= 0) {
            accentApplied = true
            return (
              <span key={`${i}-${j}`}>
                {word.slice(0, eIdx)}
                <span style={{ color: goldColor, textTransform: 'none' }}>ê</span>
                {word.slice(eIdx + 1)}
              </span>
            )
          }
        }
        return <span key={`${i}-${j}`}>{word}</span>
      })
    })
  }

  // Plain text for aria-label (strip Liftêd™ → Liftêd, ê → e)
  const ariaText = text
    .replace(/Liftêd™/g, 'Liftêd')
    .replace(/ê/g, 'e')

  return (
    <Tag
      className={className}
      aria-label={ariaText}
      style={{ textTransform: 'none', ...style }}
    >
      {children || renderText(text)}
    </Tag>
  )
}

export default BrandedHeadline

