import rateLimit from 'express-rate-limit'

function limiter({ windowMinutes, max, message }) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit: max,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: message },
  })
}

// Max 5 appointment requests per IP every 15 minutes.
export const contactLimiter = limiter({
  windowMinutes: 15,
  max: 5,
  message: 'Too many requests. Please try again later or call us directly.',
})
