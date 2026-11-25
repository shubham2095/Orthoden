import { useState } from 'react'
import { motion } from 'framer-motion'
import { sendContactMessage } from '../../services/contactService'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaPaperPlane, FaWhatsapp, FaCheckCircle, FaExclamationCircle,
} from 'react-icons/fa'
import {
  fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, staggerFast, cardVariant,
} from '../../utils/animations'
import './Contact.css'

const WA_LINK = `https://wa.me/918800182727?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Orthoden%20Dental%20Clinic.`

const serviceOptions = [
  'General Dentistry',
  'Emergency Dentistry',
  'Cosmetic Dentistry',
  'Orthodontics / Braces',
  'Dental Implants',
  'Teeth Whitening',
  'Root Canal Treatment',
  'Other',
]

const contactDetails = [
  {
    icon: <FaMapMarkerAlt />,
    label: 'Address',
    value: 'Flat No-109, Block-3, Kirti Apartment, Mayur Vihar Phase 1 Ext., Delhi 110091',
    href: 'https://maps.google.com/?q=Orthoden+Dental+Clinic+Mayur+Vihar+Delhi',
  },
  {
    icon: <FaPhone />,
    label: 'Phone',
    value: '+91 88001 82727',
    href: 'tel:+918800182727',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'drdipbanerjee@gmail.com',
    href: 'mailto:drdipbanerjee@gmail.com',
  },
  {
    icon: <FaClock />,
    label: 'Hours',
    value: 'Mon – Sat: 9:30 AM – 1 PM & 5 – 9 PM\nSunday: By Appointment Only',
  },
]

const vp = { once: true, amount: 0.15 }

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await sendContactMessage(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="contact-hero">
        <div className="ch-dots" />
        <div className="ch-glow ch-glow--1" />
        <div className="ch-glow ch-glow--2" />
        <div className="container ch-inner">
          <motion.div
            className="ch-content"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="ch-tag" variants={fadeUp}>Orthoden Dental Clinic</motion.span>
            <motion.h1 variants={fadeUp}>
              Let's Talk About<br />
              <span>Your Smile</span>
            </motion.h1>
            <motion.p variants={fadeUp}>
              Book an appointment, ask a question, or just say hello — we're here for you every step of the way.
            </motion.p>
            <motion.div className="ch-actions" variants={fadeUp}>
              <a href="tel:+918800182727" className="ch-btn ch-btn--call">
                <FaPhone /> Call Now
              </a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="ch-btn ch-btn--wa">
                <FaWhatsapp /> WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Quick info pills */}
          <motion.div
            className="ch-pills"
            variants={staggerFast}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.5 }}
          >
            {[
              { icon: <FaClock />, text: 'Mon–Sat: 9:30AM–1PM & 5–9PM' },
              { icon: <FaPhone />, text: '+91 88001 82727' },
              { icon: <FaMapMarkerAlt />, text: 'Mayur Vihar, Delhi' },
            ].map(p => (
              <motion.div className="ch-pill" key={p.text} variants={cardVariant}>
                {p.icon} {p.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main: Sidebar + Form ── */}
      <section className="contact-main">
        <div className="container contact-grid">

          {/* Left: Info Sidebar */}
          <motion.div
            className="contact-sidebar"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="sidebar-top">
              <h2>Contact <span>Information</span></h2>
              <p>Reach out through any channel — we usually respond within a few hours.</p>
            </div>

            <ul className="sidebar-details">
              {contactDetails.map((d) => (
                <li key={d.label} className="sidebar-detail-item">
                  <div className="sd-icon">{d.icon}</div>
                  <div className="sd-text">
                    <span className="sd-label">{d.label}</span>
                    {d.href
                      ? <a href={d.href} className="sd-value sd-link">{d.value}</a>
                      : <span className="sd-value">{d.value}</span>
                    }
                  </div>
                </li>
              ))}
            </ul>

            <a href={WA_LINK} target="_blank" rel="noreferrer" className="sidebar-wa-btn">
              <FaWhatsapp /> Chat on WhatsApp
            </a>

            <div className="sidebar-note">
              <FaCheckCircle /> Usually replies within 1–2 hours
            </div>

            {/* Decorative orb */}
            <div className="sidebar-orb" />
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact-form-wrap"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="form-header">
              <h2>Book an <span>Appointment</span></h2>
              <p>Fill in your details and we'll get back to you shortly.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input
                    type="text" id="name" name="name"
                    value={form.name} onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={form.phone} onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email" id="email" name="email"
                  value={form.email} onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Service Required</label>
                <select id="service" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select a service…</option>
                  {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us about your concern or preferred appointment time…"
                  rows={4}
                  required
                />
              </div>

              {status === 'success' && (
                <motion.div className="form-success" variants={scaleIn} initial="hidden" animate="visible">
                  <FaCheckCircle /> Message sent! We'll contact you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div className="form-error" variants={scaleIn} initial="hidden" animate="visible">
                  <FaExclamationCircle /> Something went wrong. Please call us directly.
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="btn-primary submit-btn"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
              >
                {loading
                  ? <span className="loading-dots">Sending<span>.</span><span>.</span><span>.</span></span>
                  : <><FaPaperPlane /> Send Message</>
                }
              </motion.button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* ── Map ── */}
      <section className="map-section">
        <div className="container">
          <motion.div className="map-header" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <h2>Find <span>Us Here</span></h2>
            <p>Conveniently located in Mayur Vihar Phase 1 Extension, East Delhi.</p>
          </motion.div>
          <motion.div className="map-card" variants={scaleIn} initial="hidden" whileInView="visible" viewport={vp}>
            <div className="map-frame">
              <iframe
                title="Orthoden Dental Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5!2d77.3156!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4b3d4c0b9d5%3A0x1b2c3d4e5f6a7b8c!2sMayur%20Vihar%20Phase%201%20Extension%2C%20Delhi%2C%20110091!5e0!3m2!1sen!2sin!4v1690000000000"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="map-overlay-card">
              <div className="moc-icon"><FaMapMarkerAlt /></div>
              <div>
                <strong>Orthoden Dental Clinic</strong>
                <span>Flat No-109, Block-3, Kirti Apartment,<br />Mayur Vihar Phase 1 Ext., Delhi 110091</span>
              </div>
              <a
                href="https://maps.google.com/?q=Orthoden+Dental+Clinic+Mayur+Vihar+Delhi"
                target="_blank" rel="noreferrer"
                className="btn-primary moc-btn"
              >
                Open Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
