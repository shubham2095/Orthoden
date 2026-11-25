import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaArrowRight, FaInstagram,
} from 'react-icons/fa'
import { fadeUp } from '../../utils/animations'
import './Footer.css'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const services = [
  { to: '/services#general', label: 'General Dentistry' },
  { to: '/services#emergency', label: 'Emergency Dentistry' },
  { to: '/services#cosmetic', label: 'Cosmetic Dentistry' },
]

const vp = { once: true, amount: 0.1 }

export default function Footer() {
  return (
    <footer className="footer">

      {/* Wave Divider */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0a1f3d" />
        </svg>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">

          {/* Brand */}
          <motion.div className="footer-brand" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <div className="footer-logo">
              <img
                src="/images/brand/logo.png"
                alt="Orthoden Multi Speciality Dental Clinic"
                className="footer-logo-img"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="footer-logo-fallback">
                <span className="footer-logo-main">Orthoden</span>
                <span className="footer-logo-sub">Multi Speciality Dental Clinic</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Providing quality dental care with a gentle touch. Your smile is our greatest achievement.
            </p>
            <div className="footer-contact-pills">
              <a href="tel:+918800182727" className="pill">
                <FaPhone /> +91 88001 82727
              </a>
              <a href="mailto:drdipbanerjee@gmail.com" className="pill">
                <FaEnvelope /> Email Us
              </a>
            </div>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/orthodendental"
                target="_blank"
                rel="noreferrer"
                className="pill"
                aria-label="Instagram"
              >
                <FaInstagram /> Follow on Instagram
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-col" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ delay: 0.1 }}>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>
                    <FaArrowRight className="link-arrow" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="footer-col" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ delay: 0.15 }}>
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s.to}>
                  <Link to={s.to}>
                    <FaArrowRight className="link-arrow" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="footer-col" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp} transition={{ delay: 0.2 }}>
            <h4 className="footer-heading">Visit Us</h4>
            <ul className="footer-info">
              <li>
                <div className="info-icon-wrap"><FaMapMarkerAlt /></div>
                <span>Flat No-109, Block-3, Kirti Apartment, Mayur Vihar Phase 1 Ext., Delhi 110091</span>
              </li>
              <li>
                <div className="info-icon-wrap"><FaPhone /></div>
                <a href="tel:+918800182727">+91 88001 82727</a>
              </li>
              <li>
                <div className="info-icon-wrap"><FaEnvelope /></div>
                <a href="mailto:drdipbanerjee@gmail.com">drdipbanerjee@gmail.com</a>
              </li>
              <li>
                <div className="info-icon-wrap"><FaClock /></div>
                <span>Mon–Sat: 9:30 AM–1 PM & 5–9 PM</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>&copy; {new Date().getFullYear()} Orthoden Multi Speciality Dental Clinic. All rights reserved.</p>
            <p className="powered-by">
              Powered by{' '}
              <a href="https://heltog.com" target="_blank" rel="noreferrer" className="heltog-link">
                Heltog Technologies Pvt. Ltd.
              </a>
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}
