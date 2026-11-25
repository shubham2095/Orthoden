import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* Top Bar */}
      <motion.div
        className="topbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span><FaClock /> Mon–Sat: 9:30 AM–1 PM & 5–9 PM</span>
            <span><FaEnvelope /> drdipbanerjee@gmail.com</span>
          </div>
          <div className="topbar-right">
            <a href="tel:+918800182727"><FaPhone /> +91 88001 82727</a>
          </div>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.header
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="container nav-inner">

          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={closeMenu}>
            <img
              src="/images/logo.png"
              alt="Orthoden"
              className="nav-logo-img"
              onError={e => e.target.style.display = 'none'}
            />
            <div className="logo-text">
              <span className="logo-main">Orthoden</span>
              <span className="logo-sub">Multi Speciality Dental Clinic</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="nav-links-desktop">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
                <span className="nav-underline" />
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="nav-actions">
            <a href="tel:+918800182727" className="nav-cta-btn">
              <FaPhone />
              <span>Book Now</span>
            </a>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FaTimes /></motion.span>
                  : <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FaBars /></motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="mobile-menu-inner">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) => isActive ? 'mobile-link active' : 'mobile-link'}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.a
                  href="tel:+918800182727"
                  className="mobile-cta"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  onClick={closeMenu}
                >
                  <FaPhone /> +91 88001 82727
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
