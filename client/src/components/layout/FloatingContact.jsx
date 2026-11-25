import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPhone, FaWhatsapp, FaTimes, FaCommentDots, FaInstagram } from 'react-icons/fa'
import './FloatingContact.css'

const PHONE = '+918800182727'
const WA_LINK = `https://wa.me/${PHONE}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Orthoden%20Dental%20Clinic.`
const IG_LINK = 'https://www.instagram.com/orthodendental'

export default function FloatingContact() {
  const [open, setOpen] = useState(false)

  return (
    <div className="float-wrap">

      {/* Options */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="float-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Instagram */}
            <motion.a
              href={IG_LINK}
              target="_blank"
              rel="noreferrer"
              className="float-option ig"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.05 }}
              onClick={() => setOpen(false)}
            >
              <FaInstagram />
              <span>Instagram</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="float-option wa"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.1 }}
              onClick={() => setOpen(false)}
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </motion.a>

            {/* Call Now */}
            <motion.a
              href={`tel:${PHONE}`}
              className="float-option call"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.15 }}
              onClick={() => setOpen(false)}
            >
              <FaPhone />
              <span>Call Now</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        className={`float-main ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Contact options"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open
            ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><FaTimes /></motion.span>
            : <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><FaCommentDots /></motion.span>
          }
        </AnimatePresence>
        {!open && <span className="float-pulse" />}
      </motion.button>
    </div>
  )
}
