import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTooth, FaHome, FaPhone } from 'react-icons/fa'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', padding: '120px 20px 80px' }}>
      <motion.div
        style={{ textAlign: 'center', maxWidth: 520 }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} style={{ fontSize: '5rem', color: '#1a6fb5', marginBottom: 16 }}>
          <FaTooth />
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '5rem', fontWeight: 900, color: '#1a6fb5', lineHeight: 1, marginBottom: 8 }}>
          404
        </motion.h1>
        <motion.h2 variants={fadeUp} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#0f2744', marginBottom: 14 }}>
          Page Not Found
        </motion.h2>
        <motion.p variants={fadeUp} style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.8, marginBottom: 36 }}>
          Looks like this page has been extracted! Don't worry — head back to the homepage or contact us directly.
        </motion.p>
        <motion.div variants={fadeUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary"><FaHome /> Go to Homepage</Link>
          <a href="tel:+918800182727" className="btn-outline"><FaPhone /> Call Us</a>
        </motion.div>
      </motion.div>
    </div>
  )
}
