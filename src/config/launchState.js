/**
 * Liftêd™ Launch State Configuration
 *
 * Change SITE_LAUNCH_STATE to advance the site's CTAs automatically.
 *
 * States:
 *   concept              — earliest stage, no samples
 *   samples_in_production — current state
 *   sample_review        — samples received, evaluating
 *   founding_vote        — community voting on designs
 *   preorder             — accepting preorders
 *   live                 — store open
 */

export const SITE_LAUNCH_STATE = 'samples_in_production'

// Shopify / store URL — set when store is ready
export const SHOP_URL = import.meta.env.VITE_SHOP_URL || ''

// Feature flags
export const SHOW_SHOP_NAV = !!SHOP_URL && SITE_LAUNCH_STATE === 'live'
export const SHOW_PREORDER = SITE_LAUNCH_STATE === 'preorder' || SITE_LAUNCH_STATE === 'live'
export const SHOW_VOTE = SITE_LAUNCH_STATE === 'founding_vote'

/**
 * Returns the appropriate CTA label and URL for the current launch state.
 */
export function getProductCTA(product) {
  const state = product.status || SITE_LAUNCH_STATE

  if (state === 'live' && product.shopUrl) {
    return { label: 'Shop the Collection', url: product.shopUrl }
  }
  if ((state === 'preorder') && product.preorderUrl) {
    return { label: 'Reserve Yours', url: product.preorderUrl }
  }
  if (state === 'founding_vote') {
    return { label: 'Vote for This Design', url: '/founding-community' }
  }
  if (state === 'sample_review') {
    return { label: 'See Sample Development', url: '/sample' }
  }
  if (state === 'samples_in_production') {
    return { label: 'Join for First Access', url: '/founding-community' }
  }
  return { label: 'View the Message', url: '/collections' }
}

/**
 * Returns the status badge label for display.
 */
export function getStatusBadge(status) {
  const map = {
    concept: 'Concept',
    samples_in_production: 'Sample in Production',
    sample_review: 'Sample Under Review',
    founding_vote: 'Founding Vote Open',
    preorder: 'Preorder Available',
    live: 'Available Now',
  }
  return map[status] || 'Concept'
}

/**
 * Returns the badge color for display.
 */
export function getStatusColor(status) {
  const map = {
    concept: '#6B6560',
    samples_in_production: 'var(--gold-deep)',
    sample_review: '#5B8DB8',
    founding_vote: '#7B9E4A',
    preorder: '#8B4513',
    live: '#2d7a2d',
  }
  return map[status] || '#6B6560'
}
