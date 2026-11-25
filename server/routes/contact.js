import express from 'express'
import rateLimit from 'express-rate-limit'
import { sendContactEmail } from '../controllers/contactController.js'

const router = express.Router()

// Max 5 contact submissions per IP per 15 minutes.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later or call us directly.' },
})

router.post('/', contactLimiter, sendContactEmail)

export default router
