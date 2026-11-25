import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTooth, FaCheckCircle, FaPhone } from 'react-icons/fa'
import { MdEmergency } from 'react-icons/md'
import { GiToothbrush } from 'react-icons/gi'
import {
  fadeUp, fadeLeft, fadeRight, scaleIn,
  staggerContainer, staggerFast, cardVariant,
} from '../utils/animations'
import './Services.css'

const services = [
  {
    id: 'general',
    icon: <FaTooth />,
    image: '/images/clinic/clinic-chair.png',
    title: 'General Dentistry',
    tagline: 'Foundation of a Healthy Smile',
    desc: 'At Orthoden, we place great importance on regular dental checkups and cleanings. A plan of preventive and emergency dentistry is the most important service we offer. Regularly scheduled examinations and professional cleanings are the best way to achieve long-term good dental health.',
    points: [
      'Comprehensive dental examinations', 'Professional cleaning and scaling',
      'Tooth-coloured fillings', 'Root canal treatment',
      'Tooth extractions', 'Gum disease treatment',
      'Dental X-rays and diagnosis', 'Preventive care & oral hygiene advice',
    ],
  },
  {
    id: 'emergency',
    icon: <MdEmergency />,
    image: '/images/clinic/clinic-room.png',
    title: 'Emergency Dentistry',
    tagline: 'Here When You Need Us Most',
    desc: "Dental emergencies don't wait for convenient times. For years, patients have depended on us to provide fast, reliable emergency dental care. We handle all dental emergencies with speed, skill, and compassion — because we know pain cannot wait.",
    points: [
      'Severe toothache relief', 'Broken or chipped teeth',
      'Knocked-out teeth', 'Lost fillings or crowns',
      'Dental abscess treatment', 'Swollen jaw or gum infections',
      'Emergency extractions', 'Same-day appointments available',
    ],
  },
  {
    id: 'cosmetic',
    icon: <GiToothbrush />,
    image: '/images/clinic/perfect-smile.jpg',
    title: 'Cosmetic Dentistry',
    tagline: 'Enhance Your Natural Beauty',
    desc: 'We understand that every cosmetic dentistry need is different. We first analyse your existing condition, understand your requirements, and then design a suitable cosmetic treatment plan. We provide cosmetic dentistry that focuses on bio-compatibility, longevity, and aesthetics.',
    points: [
      'Teeth whitening', 'Dental veneers',
      'Composite bonding', 'Smile makeover',
      'Dental crowns and bridges', 'Misaligned teeth correction',
      'Discoloured teeth treatment', 'Gap filling and contouring',
    ],
  },
]

const vp = { once: true, amount: 0.2 }

export default function Services() {
  return (
    <div className="services-page">

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.p className="page-tag" variants={fadeUp} initial="hidden" animate="visible">Our Services</motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            Comprehensive <span>Dental Services</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            From routine checkups to complete smile makeovers — we offer expert dental care under one roof.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="services-list">
        <div className="container">
          {services.map((service, index) => (
            <div className={`service-row ${index % 2 !== 0 ? 'reverse' : ''}`} key={service.id} id={service.id}>

              <motion.div
                className="service-visual"
                variants={index % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
              >
                <div className="service-img-wrap">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-img"
                    loading="lazy"
                    onError={e => { e.target.parentNode.classList.add('svc-img-error') }}
                  />
                  <div className="service-img-overlay">
                    <div className="service-icon-badge">{service.icon}</div>
                    <p className="service-tagline">{service.tagline}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="service-detail"
                variants={index % 2 === 0 ? fadeRight : fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
              >
                <h2>{service.title}</h2>
                <p className="service-desc">{service.desc}</p>
                <motion.ul
                  className="service-points"
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                >
                  {service.points.map((p) => (
                    <motion.li key={p} variants={cardVariant}>
                      <FaCheckCircle /> {p}
                    </motion.li>
                  ))}
                </motion.ul>
                <Link to="/contact" className="btn-primary">Book This Service</Link>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section className="services-cta" variants={scaleIn} initial="hidden" whileInView="visible" viewport={vp}>
        <div className="container cta-inner">
          <div>
            <h2>Not Sure Which Service You Need?</h2>
            <p>Contact us and we'll guide you to the right treatment for your smile.</p>
          </div>
          <div className="cta-btns">
            <a href="tel:+918800182727" className="btn-primary"><FaPhone /> +91 88001 82727</a>
            <Link to="/contact" className="btn-outline-white">Send a Message</Link>
          </div>
        </div>
      </motion.section>

    </div>
  )
}
