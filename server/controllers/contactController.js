import nodemailer from 'nodemailer'

export const sendContactEmail = async (req, res) => {
  const { name, email, phone, service, message } = req.body

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Name, phone and message are required.' })
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
      subject: `New Appointment Request from ${name}`,
      html: `
        <h3 style="color:#1a6fb5;">New message from Orthoden website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Service Required:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    })

    res.status(200).json({ success: true, message: 'Email sent successfully.' })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: 'Failed to send email. Please try again.' })
  }
}
