import nodemailer from 'nodemailer'

let transporter

// Created on first use so the .env values are loaded by then.
function getTransporter() {
  transporter ??= nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  return transporter
}

// Submitted text goes into an HTML email, so it must be escaped first.
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function multiline(value = '') {
  return escapeHtml(value).replace(/\r?\n/g, '<br>')
}

// Keep user input out of subject lines as a single clean line.
function singleLine(value = '') {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

export async function sendContactEmail({ name, phone, email, service, message }) {
  await getTransporter().sendMail({
    from: `"Orthoden Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    ...(email ? { replyTo: email } : {}),
    subject: `New Appointment Request from ${singleLine(name)}`,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nService Required: ${service || 'Not specified'}\n\nMessage:\n${message}`,
    html: `
      <h3 style="color:#1a6fb5;">New message from Orthoden website</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${email ? escapeHtml(email) : 'Not provided'}</p>
      <p><strong>Service Required:</strong> ${service ? escapeHtml(service) : 'Not specified'}</p>
      <p><strong>Message:</strong><br/>${multiline(message)}</p>
    `,
  })
}
