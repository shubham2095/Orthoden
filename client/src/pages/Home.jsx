import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaTooth, FaUserMd, FaStar, FaShieldAlt, FaClock,
  FaAward, FaCheckCircle, FaPhone, FaArrowRight,
} from 'react-icons/fa'
import { MdEmergency } from 'react-icons/md'
import { GiToothbrush } from 'react-icons/gi'
import {
  fadeUp, fadeLeft, fadeRight, scaleIn,
  staggerContainer, staggerFast, cardVariant,
} from '../utils/animations'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import './Home.css'

const services = [
  {
    icon: <FaTooth />,
    title: 'General Dentistry',
    desc: 'Regular checkups, cleanings, fillings, and preventive care to keep your smile healthy for life.',
    link: '/services',
  },
  {
    icon: <MdEmergency />,
    title: 'Emergency Dentist',
    desc: 'Immediate care when you need it most. We handle dental emergencies with speed and expertise.',
    link: '/services',
  },
  {
    icon: <GiToothbrush />,
    title: 'Cosmetic Dentistry',
    desc: 'Veneers, whitening, crowns, and smile makeovers tailored to enhance your natural beauty.',
    link: '/services',
  },
]

const features = [
  { icon: <FaUserMd />, title: 'Expert Dentist', desc: 'Years of training and hands-on experience in multi-speciality dental care.' },
  { icon: <FaShieldAlt />, title: 'Safe & Hygienic', desc: 'Strict sterilization protocols and modern equipment for your safety.' },
  { icon: <FaClock />, title: 'Flexible Timings', desc: 'Convenient appointment slots including emergency care when required.' },
  { icon: <FaAward />, title: 'Trusted Care', desc: 'Hundreds of happy patients who trust us with their smiles every day.' },
]

const vp = { once: true, amount: 0.2 }

export default function Home() {
  return (
    <div className="home">

      {/* ── Hero ── */}
      <section className="hero">
        {/* Background decorations */}
        <div className="hero-bg-dots" />
        <div className="hero-bg-glow" />

        <div className="container hero-inner">

          {/* ── Left: Content ── */}
          <motion.div className="hero-content" variants={staggerContainer} initial="hidden" animate="visible">

            {/* Google trust pill */}
            <motion.div className="hero-trust-pill" variants={fadeUp}>
              <span className="htp-stars">★★★★★</span>
              <span className="htp-text">4.9 · 251+ Google Reviews</span>
            </motion.div>

            <motion.h1 variants={fadeUp}>
              Delhi's Trusted<br />
              <span>Multi Speciality</span><br />
              Dental Clinic
            </motion.h1>

            <motion.p className="hero-desc" variants={fadeUp}>
              At Orthoden, we combine modern technology with a gentle, personalised
              approach — from routine checkups to complete smile transformations.
            </motion.p>

            <motion.div className="hero-btns" variants={fadeUp}>
              <Link to="/contact" className="btn-primary">
                Book Appointment <FaArrowRight />
              </Link>
              <a href="tel:+918800182727" className="hero-call-btn">
                <span className="hero-call-icon"><FaPhone /></span>
                <span>
                  <small>Call Now</small>
                  <strong>+91 88001 82727</strong>
                </span>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div className="hero-stats" variants={fadeUp}>
              {[
                { val: '500+', label: 'Happy Patients' },
                { val: '10+',  label: 'Years Experience' },
                { val: '3',    label: 'Specialities' },
              ].map((s, i) => (
                <div key={s.label} className="hero-stat-item">
                  {i > 0 && <div className="stat-divider" />}
                  <div className="stat">
                    <strong>{s.val}</strong>
                    <span>{s.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Service tags */}
            <motion.div className="hero-service-tags" variants={fadeUp}>
              {['General Dentistry', 'Orthodontics', 'Implants', 'Cosmetic', 'Emergency'].map(tag => (
                <span key={tag} className="hero-stag"><FaCheckCircle /> {tag}</span>
              ))}
            </motion.div>

          </motion.div>

          {/* ── Right: Photos ── */}
          <motion.div className="hero-image" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.25 }}>
            <div className="hero-photo-wrap">

              {/* Decorative glow behind photo */}
              <div className="hero-photo-glow" />

              {/* Main tall photo */}
              <div className="hero-photo-main">
                <img
                  src="/images/hero.avif"
                  alt="Orthoden Dental Clinic"
                  onError={e => { e.target.parentNode.classList.add('hero-photo-fallback'); e.target.remove() }}
                />
                <div className="hero-photo-overlay" />
              </div>

              {/* Small secondary photo */}
              <div className="hero-photo-secondary">
                <img
                  src="/images/clinic/clinic-waiting.png"
                  alt="Patient Waiting Area"
                  onError={e => { e.target.parentNode.classList.add('hero-photo-fallback'); e.target.remove() }}
                />
              </div>

              {/* Floating: Timing card */}
              <motion.div
                className="hero-float hero-float--timing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="hf-icon"><FaClock /></div>
                <div>
                  <strong>Mon – Sat</strong>
                  <span>9:30–1 PM & 5–9 PM</span>
                </div>
              </motion.div>

              {/* Floating: Rating card */}
              <motion.div
                className="hero-float hero-float--rating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <div className="hf-rating-stars">★★★★★</div>
                <strong>4.9 / 5.0</strong>
                <span>Google Rating</span>
              </motion.div>

              {/* Floating: Phone pill */}
              <motion.div
                className="hero-float hero-float--phone"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <FaPhone /> +91 88001 82727
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Services ── */}
      <section className="services-section">
        <div className="container">
          <motion.div
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <h2>Our <span>Services</span></h2>
            <p>Comprehensive dental care under one roof, tailored to your unique needs.</p>
          </motion.div>

          <motion.div
            className="services-grid"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {services.map((s) => (
              <motion.div className="service-card" key={s.title} variants={cardVariant} whileHover={{ y: -8 }}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to={s.link} className="service-link">Learn More <FaArrowRight /></Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="why-section">
        <div className="container">
          <motion.div
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <h2>Why Choose <span>Us</span></h2>
            <p>We are committed to providing you with the highest quality dental care.</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {features.map((f) => (
              <motion.div className="feature-card" key={f.title} variants={cardVariant} whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(26,111,181,0.15)' }}>
                <div className="feature-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About Doctor ── */}
      <section className="doctor-section">
        <div className="container doctor-inner">
          <motion.div
            className="doctor-image-wrap"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <div className="doc-img-main">
              <img
                src="/images/clinic/clinic-room.png"
                alt="Orthoden Consultation Room"
                loading="lazy"
                onError={e => { e.target.parentNode.classList.add('doc-img-fallback'); e.target.remove() }}
              />
            </div>
            <div className="doc-img-secondary">
              <img
                src="/images/clinic/clinic-reception.png"
                alt="Orthoden Reception"
                loading="lazy"
                onError={e => { e.target.parentNode.classList.add('doc-img-fallback'); e.target.remove() }}
              />
            </div>
            <div className="doctor-badge"><FaStar /> Trusted by 500+ Patients</div>
          </motion.div>

          <motion.div
            className="doctor-content"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <motion.p className="section-tag" variants={fadeUp}>Meet Your Dentist</motion.p>
            <motion.h2 variants={fadeUp}>You're in <span>Good Hands</span></motion.h2>
            <motion.p variants={fadeUp}>
              With years of medical training and hands-on experience, Dr. Dip Banerjee
              understands how to work with patients to ensure they receive the best care
              possible. A thoughtful and personalised approach means full commitment to the
              health and well-being of every patient.
            </motion.p>
            <motion.ul className="doctor-points" variants={staggerFast}>
              {[
                'Multi-speciality dental expertise',
                'Gentle and patient-centred approach',
                'Modern techniques and equipment',
                'Transparent treatment planning',
              ].map((pt) => (
                <motion.li key={pt} variants={cardVariant}>
                  <FaCheckCircle /> {pt}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp}>
              <Link to="/about" className="btn-primary">Learn More About Us</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── CTA Banner ── */}
      <motion.section
        className="cta-section"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <div className="container cta-inner">
          <div>
            <h2>Ready to Get Your Perfect Smile?</h2>
            <p>Call us today or book an appointment online. We are here for you.</p>
          </div>
          <div className="cta-btns">
            <a href="tel:+918800182727" className="btn-primary"><FaPhone /> Call Now</a>
            <Link to="/contact" className="btn-outline-white">Book Appointment</Link>
          </div>
        </div>
      </motion.section>

    </div>
  )
}
