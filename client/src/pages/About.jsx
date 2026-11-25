import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaUserMd, FaCheckCircle, FaTooth,
  FaHeart, FaAward, FaUsers, FaStar, FaPhone,
} from 'react-icons/fa'
import {
  fadeUp, fadeLeft, fadeRight, scaleIn,
  staggerContainer, staggerFast, cardVariant,
} from '../utils/animations'
import './About.css'

const values = [
  { icon: <FaHeart />, title: 'Patient First', desc: 'Every decision we make is centred around the comfort and wellbeing of our patients.' },
  { icon: <FaTooth />, title: 'Quality Care', desc: 'We use the latest techniques and equipment to deliver the highest quality dental treatment.' },
  { icon: <FaAward />, title: 'Excellence', desc: 'We hold ourselves to the highest standards in dentistry, continuously learning and improving.' },
  { icon: <FaUsers />, title: 'Trust', desc: 'Building long-lasting relationships with our patients based on honesty and medical integrity.' },
]

const stats = [
  { number: '500+', label: 'Happy Patients' },
  { number: '10+', label: 'Years Experience' },
  { number: '3', label: 'Specialities' },
  { number: '100%', label: 'Dedication' },
]

const vp = { once: true, amount: 0.2 }

export default function About() {
  return (
    <div className="about-page">

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.p className="page-tag" variants={fadeUp} initial="hidden" animate="visible">About Us</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            About <span>Orthoden</span> Dental Clinic
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            Learn about our mission, our team, and why thousands of patients trust us with their smiles.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container story-inner">
          <motion.div className="story-image-wrap" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={vp}>
            <div className="story-img-main">
              <img
                src="/images/clinic/clinic-room.png"
                alt="Orthoden Clinic Interior"
                loading="lazy"
                onError={e => { e.target.parentNode.classList.add('story-img-fallback'); e.target.remove() }}
              />
            </div>
            <div className="story-img-secondary">
              <img
                src="/images/clinic/clinic-chair.png"
                alt="Dental Treatment Chair"
                loading="lazy"
                onError={e => { e.target.parentNode.classList.add('story-img-fallback'); e.target.remove() }}
              />
            </div>
            <div className="story-badge"><FaStar /> Dr. Dip Banerjee</div>
          </motion.div>

          <motion.div className="story-content" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={vp}>
            <motion.p className="section-tag" variants={fadeUp}>Our Story</motion.p>
            <motion.h2 variants={fadeUp}>A Practice Built on <span>Trust & Care</span></motion.h2>
            <motion.p variants={fadeUp}>
              Orthoden Multi Speciality Dental Clinic was founded with one simple mission —
              to provide world-class dental care in a warm, welcoming environment. We believe
              that a healthy smile is the foundation of overall wellbeing.
            </motion.p>
            <motion.p variants={fadeUp}>
              Under the leadership of Dr. Dip Banerjee, our clinic has grown into a trusted
              name in Mayur Vihar, Delhi. After years of medical training and experience,
              Dr. Banerjee understands how to work with patients to ensure they receive
              the best care possible.
            </motion.p>
            <motion.ul className="story-points" variants={staggerFast}>
              {[
                'Personalised treatment plans for every patient',
                'Modern equipment and up-to-date techniques',
                'Comfortable, anxiety-free environment',
                'Transparent pricing and honest advice',
              ].map((pt) => (
                <motion.li key={pt} variants={cardVariant}><FaCheckCircle /> {pt}</motion.li>
              ))}
            </motion.ul>
            <motion.div variants={fadeUp}>
              <Link to="/contact" className="btn-primary">Book a Consultation</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <motion.div
          className="container stats-grid"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          {stats.map((s) => (
            <motion.div className="stat-box" key={s.label} variants={scaleIn}>
              <strong>{s.number}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <motion.div className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <h2>Our Core <span>Values</span></h2>
            <p>The principles that guide everything we do at Orthoden Dental Clinic.</p>
          </motion.div>
          <motion.div className="values-grid" variants={staggerFast} initial="hidden" whileInView="visible" viewport={vp}>
            {values.map((v) => (
              <motion.div className="value-card" key={v.title} variants={cardVariant} whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(26,111,181,0.13)' }}>
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Doctor Detail */}
      <section className="doctor-detail">
        <div className="container">
          <motion.div className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <h2>Meet Your <span>Dentist</span></h2>
            <p>Experienced, caring, and dedicated to your oral health.</p>
          </motion.div>
          <motion.div className="doctor-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <div className="doctor-card-photo">
              <img
                src="/images/clinic/clinic-exterior.png"
                alt="Orthoden Dental Clinic"
                loading="lazy"
                onError={e => { e.target.parentNode.classList.add('doctor-photo-fallback'); e.target.remove() }}
              />
              <div className="doctor-photo-badge"><FaUserMd /></div>
            </div>
            <div className="doctor-card-info">
              <h3>Dr. Dip Banerjee</h3>
              <p className="doctor-title">MDS (Orthodontics) — Principal Dentist & Founder</p>
              <div className="doctor-quals">
                <span>BDS — Govt. Dental College, Pondicherry University</span>
                <span>MDS — Orthodontics & Dentofacial Orthopedics, Dr. NTR University of Health Sciences</span>
                <span>Fellowship in Oral Implantology (B.O.C.I.)</span>
              </div>
              <p className="doctor-bio">
                Dr. Dip Banerjee is the founder and principal dentist at Orthoden Multi
                Speciality Dental Clinic. A specialist in Orthodontics and Oral Implantology
                with over a decade of clinical experience, Dr. Banerjee delivers complete
                dental solutions — from braces and implants to cosmetic smile makeovers.
                His philosophy is simple: treat every patient like family and provide care
                that truly makes a difference.
              </p>
              <div className="doctor-contact">
                <a href="tel:+918800182727" className="btn-primary"><FaPhone /> +91 88001 82727</a>
                <a href="mailto:drdipbanerjee@gmail.com" className="btn-outline">Email Us</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section className="about-cta" variants={scaleIn} initial="hidden" whileInView="visible" viewport={vp}>
        <div className="container cta-inner">
          <div>
            <h2>Ready to Experience the Orthoden Difference?</h2>
            <p>Book your appointment today and take the first step toward a healthier smile.</p>
          </div>
          <div className="cta-btns">
            <Link to="/contact" className="btn-primary">Book Appointment</Link>
            <Link to="/services" className="btn-outline-white">View Services</Link>
          </div>
        </div>
      </motion.section>

    </div>
  )
}
