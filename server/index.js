/**
 * Express API server — Liftêd™
 * Handles all authenticated and privileged backend operations.
 * The public React frontend (Vite) is served separately.
 * In production, Vercel routes /api/* to this server.
 */
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import investorAccessRoutes from './routes/investorAccess.js'
import wholesaleRoutes from './routes/wholesale.js'
import activityRoutes from './routes/activity.js'
import documentRoutes from './routes/documents.js'

const app = express()

// CORS — only allow the production domain and localhost in dev
const allowedOrigins = [
  'https://wearliftedtoday.com',
  'https://www.wearliftedtoday.com',
  'http://localhost:3000',
  'http://localhost:5173',
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    return cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'lifted-api' }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/investor-access', investorAccessRoutes)
app.use('/api/wholesale', wholesaleRoutes)
app.use('/api/activity', activityRoutes)
app.use('/api/documents', documentRoutes)

// 404 fallback for /api/*
app.use('/api/*', (req, res) => res.status(404).json({ error: 'Not found' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Liftêd API server running on port ${PORT}`))

export default app

