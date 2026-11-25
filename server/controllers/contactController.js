import nodemailer from 'nodemailer'

const LIMITS = { name: 100, email: 254, phone: 20, service: 100, message: 2000 }
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const PHONE_RE = /^[+\d][\d\s\-()]{5,19}$/

// Escape user input before it is placed inside the HTML email body.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Single-line values (used in the subject): strip CR/LF to prevent header injection.
const oneLine = (value) => String(value).replace(/[\r\n]+/g, ' ').trim()

// Accept only strings, trimmed, within the length limit.
const clean = (value, max) => {
  if (value === undefined || value === null || value === '') return ''
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > max ? null : trimmed
}

export const sendContactEmail = async (req, res) => {
  const body = req.body ?? {}

  const name = clean(body.name, LIMITS.name)
  const email = clean(body.email, LIMITS.email)
  const phone = clean(body.phone, LIMITS.phone)
  const service = clean(body.service, LIMITS.service)
  const message = clean(body.message, LIMITS.message)

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone and message are required.' })
  }
  if (email === null || service === null) {
    return res.status(400).json({ error: 'Invalid input.' })
  }
  if (email && !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (!PHONE_RE.test(phone)) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Orthoden Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      // Let the clinic reply straight to the patient, only when the address is valid.
      ...(email ? { replyTo: email } : {}),
      subject: `New Appointment Request from ${oneLine(name)}`,
      html: `
        <h3 style="color:#1a6fb5;">New message from Orthoden website</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Email:</strong> ${email ? escapeHtml(email) : 'Not provided'}</p>
        <p><strong>Service Required:</strong> ${service ? escapeHtml(service) : 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\r?\n/g, '<br/>')}</p>
      `,
    })

    res.status(200).json({ success: true, message: 'Email sent successfully.' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
