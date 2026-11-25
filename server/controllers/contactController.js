import { sendContactEmail } from '../services/mailService.js'

export async function submitContact(req, res) {
  try {
    await sendContactEmail(req.body)
    res.json({ success: true, message: 'Email sent successfully.' })
  } catch (err) {
    console.error('Failed to send appointment email:', err.message)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
