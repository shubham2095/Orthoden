import express from 'express'
import { contactLimiter } from '../middleware/rateLimit.js'
import validate from '../middleware/validate.js'
import { contactSchema } from '../schemas/contactSchema.js'
import { submitContact } from '../controllers/contactController.js'

const router = express.Router()

router.post('/', contactLimiter, validate(contactSchema), submitContact)

export default router
