import express from 'express'
import contactRoutes from './contactRoutes.js'

const router = express.Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

router.use('/contact', contactRoutes)

export default router
