/**
 * Neon/Postgres client — Liftêd™
 * Uses @neondatabase/serverless for edge-compatible HTTP queries.
 * Connection string comes from DATABASE_URL (Vercel env var, never committed).
 * Supports separate production and development Neon branches via
 * DATABASE_URL_DEV for the development branch.
 */
import { neon } from '@neondatabase/serverless'

let sqlClient = null

export function getDatabaseUrl() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  )
}

export function getSql() {
  if (!sqlClient) {
    const url = getDatabaseUrl()
    if (!url) {
      throw new Error(
        'Missing database URL. Set DATABASE_URL in Vercel environment variables.'
      )
    }
    sqlClient = neon(url)
  }
  return sqlClient
}
