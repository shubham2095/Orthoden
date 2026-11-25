import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import contactRoute from './routes/contact.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Behind a reverse proxy/host (Render, Railway, nginx, ...) set TRUST_PROXY=1 so the
// rate limiter sees each visitor's real IP instead of the proxy's.
if (process.env.TRUST_PROXY) {
  app.set('trust proxy', Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY)
}

// CORS_ORIGIN (optional, comma-separated) restricts which sites may call the API.
const corsOrigin = process.env.CORS_ORIGIN
app.use(cors(corsOrigin ? { origin: corsOrigin.split(',').map((o) => o.trim()) } : undefined))
app.use(express.json({ limit: '10kb' }))

// API routes
app.use('/api/contact', contactRoute)

// Serve React build in production
app.use(express.static(path.join(__dirname, 'dist')))
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
