import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaTimes, FaChevronLeft, FaChevronRight,
  FaSearchPlus, FaPhone, FaTooth, FaMapMarkerAlt,
} from 'react-icons/fa'
import { MdStar } from 'react-icons/md'
import { GiToothbrush } from 'react-icons/gi'
import { fadeUp, staggerFast, cardVariant, scaleIn } from '../../utils/animations'
import './Gallery.css'

const filterTabs = ['All', 'Before & After', 'Cosmetic', 'General']

const cases = [
  {
    id: 1,
    title: 'Smile Transformation',
    category: 'Cosmetic',
    tag: 'Before & After',
    desc: 'Complete smile makeover — remarkable cosmetic results.',
    before: '/images/gallery/case-5.jpg',
    after:  '/images/gallery/case-6.jpg',
    type: 'beforeafter',
    featured: true,
  },
  {
    id: 2,
    title: 'Teeth Alignment & Whitening',
    category: 'Cosmetic',
    tag: 'Before & After',
    desc: 'Crooked and discoloured teeth corrected with precision treatment.',
    before: '/images/gallery/case-3.jpg',
    after:  '/images/gallery/case-7.jpg',
    type: 'beforeafter',
    featured: false,
  },
  {
    id: 3,
    title: 'Full Mouth Restoration',
    category: 'General',
    tag: 'General',
    desc: 'Comprehensive dental restoration addressing multiple concerns.',
    image: '/images/gallery/case-1.jpg',
    type: 'single',
    featured: false,
  },
  {
    id: 4,
    title: 'Cosmetic Dental Case',
    category: 'Cosmetic',
    tag: 'Cosmetic',
    desc: 'Expert cosmetic treatment delivering natural-looking results.',
    image: '/images/gallery/case-2.jpg',
    type: 'single',
    featured: false,
  },
  {
    id: 5,
    title: 'Crown & Bridge Work',
    category: 'General',
    tag: 'General',
    desc: 'Precision-fitted ceramic crowns restoring function and aesthetics.',
    image: '/images/gallery/case-4.jpg',
    type: 'single',
    featured: false,
  },
  {
    id: 6,
    title: 'Perfect Smile Result',
    category: 'Cosmetic',
    tag: 'Cosmetic',
    desc: 'Achieving the perfect smile with our expert cosmetic dental team.',
    image: '/images/clinic/perfect-smile.jpg',
    type: 'single',
    featured: false,
  },
]

const clinicPhotos = [
  { id: 'c1', title: 'Clinic Exterior', sub: 'Mayur Vihar Phase 1, Delhi', image: '/images/clinic/clinic-exterior.png', featured: true },
  { id: 'c2', title: 'Reception Desk',  sub: 'Warm welcome from our team',  image: '/images/clinic/clinic-reception.png', featured: false },
  { id: 'c3', title: 'Consultation Room', sub: 'State-of-the-art equipment', image: '/images/clinic/clinic-room.png', featured: false },
  { id: 'c4', title: 'Treatment Chair', sub: 'Modern dental unit — comfort first', image: '/images/clinic/clinic-chair.png', featured: false },
  { id: 'c5', title: 'Patient Waiting Area', sub: 'Air-conditioned & relaxing', image: '/images/clinic/clinic-waiting.png', featured: false },
]

const tagColors = {
  'Before & After': { bg: '#dbeafe', color: '#1d4ed8' },
  General:          { bg: '#dcfce7', color: '#15803d' },
  Cosmetic:         { bg: '#fae8ff', color: '#9333ea' },
}

const vp = { once: true, amount: 0.1 }

function ImgWithFallback({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={e => {
        e.target.parentNode.classList.add('img-error')
        e.target.remove()
      }}
    />
  )
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox]         = useState(null)

  const filtered = activeFilter === 'All'
    ? cases
    : cases.filter(c => c.category === activeFilter || c.tag === activeFilter)

  const openLightbox = (item, view = 'single') => {
    const idx = filtered.findIndex(c => c.id === item.id)
    setLightbox({ index: idx, view })
  }
  const closeLightbox = () => setLightbox(null)
  const navLightbox = (dir) => {
    if (!lightbox) return
    const next = (lightbox.index + dir + filtered.length) % filtered.length
    const item = filtered[next]
    setLightbox({ index: next, view: item.type === 'beforeafter' ? 'after' : 'single' })
  }

  const currentItem = lightbox !== null ? filtered[lightbox.index] : null
  const lightboxSrc = currentItem
    ? currentItem.type === 'beforeafter'
      ? lightbox.view === 'before' ? currentItem.before : currentItem.after
      : currentItem.image
    : null

  return (
    <div className="gallery-page">

      {/* ── Hero ── */}
      <section className="gallery-hero">
        <div className="gh-bg-dots" />
        <div className="gh-bg-glow" />
        <div className="container gh-content">
          <motion.p className="page-tag" variants={fadeUp} initial="hidden" animate="visible">
            Case Gallery
          </motion.p>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            Real Results, <span>Real Smiles</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            Every picture tells a story of renewed confidence. Browse patient cases and explore our clinic.
          </motion.p>
        </div>

        {/* Stats bar inside hero */}
        <motion.div
          className="hero-stats-bar"
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.35 }}
        >
          {[
            { icon: <FaTooth />,      val: '500+', label: 'Cases Treated' },
            { icon: <GiToothbrush />, val: '200+', label: 'Smile Makeovers' },
            { icon: <MdStar />,       val: '4.9★',  label: 'Google Rating' },
            { icon: <FaTooth />,      val: '10+',   label: 'Years Experience' },
          ].map(s => (
            <motion.div className="hsb-item" key={s.label} variants={cardVariant}>
              <span className="hsb-icon">{s.icon}</span>
              <strong>{s.val}</strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Dental Cases ── */}
      <section className="cases-section">
        <div className="container">

          <motion.div className="section-title" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="section-tag-inner">Patient Success Stories</p>
            <h2>Our <span>Case Gallery</span></h2>
            <p>Actual results from real patients treated at Orthoden Dental Clinic.</p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div className="filter-tabs" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            {filterTabs.map(cat => (
              <button
                key={cat}
                className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cases Grid */}
          <motion.div className="cases-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  className={`case-card ${item.featured ? 'case-card--featured' : ''}`}
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Tag */}
                  <span
                    className="case-tag"
                    style={{ background: tagColors[item.tag]?.bg, color: tagColors[item.tag]?.color }}
                  >
                    {item.tag}
                  </span>

                  {item.type === 'beforeafter' ? (
                    <div className="ba-container">
                      {/* Before panel */}
                      <div className="ba-panel" onClick={() => openLightbox(item, 'before')}>
                        <ImgWithFallback src={item.before} alt={`${item.title} Before`} />
                        <div className="ba-panel-overlay">
                          <span className="ba-badge ba-badge--before">Before</span>
                          <FaSearchPlus className="ba-zoom" />
                        </div>
                      </div>
                      {/* Divider */}
                      <div className="ba-separator">
                        <div className="ba-sep-line" />
                        <div className="ba-sep-icon">↔</div>
                        <div className="ba-sep-line" />
                      </div>
                      {/* After panel */}
                      <div className="ba-panel" onClick={() => openLightbox(item, 'after')}>
                        <ImgWithFallback src={item.after} alt={`${item.title} After`} />
                        <div className="ba-panel-overlay">
                          <span className="ba-badge ba-badge--after">After</span>
                          <FaSearchPlus className="ba-zoom" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="single-container" onClick={() => openLightbox(item, 'single')}>
                      <ImgWithFallback src={item.image} alt={item.title} />
                      <div className="single-overlay">
                        <FaSearchPlus />
                      </div>
                    </div>
                  )}

                  <div className="case-info">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.p className="no-results" variants={fadeUp} initial="hidden" animate="visible">
                No cases found for this filter.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Clinic Tour ── */}
      <section className="clinic-tour">
        <div className="container">
          <motion.div className="section-title section-title--light" variants={fadeUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="section-tag-inner section-tag-inner--light">Step Inside Orthoden</p>
            <h2>Our <span>Clinic Tour</span></h2>
            <p>Modern infrastructure, hygienic environment, warm atmosphere — see it yourself.</p>
          </motion.div>

          <motion.div
            className="tour-grid"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            {/* Featured large photo */}
            <motion.div className="tour-card tour-card--featured" variants={cardVariant}>
              <ImgWithFallback src={clinicPhotos[0].image} alt={clinicPhotos[0].title} />
              <div className="tour-card-info">
                <FaMapMarkerAlt />
                <div>
                  <strong>{clinicPhotos[0].title}</strong>
                  <span>{clinicPhotos[0].sub}</span>
                </div>
              </div>
            </motion.div>

            {/* 2x2 small grid */}
            <div className="tour-small-grid">
              {clinicPhotos.slice(1).map(photo => (
                <motion.div className="tour-card" key={photo.id} variants={cardVariant}>
                  <ImgWithFallback src={photo.image} alt={photo.title} />
                  <div className="tour-card-info">
                    <div>
                      <strong>{photo.title}</strong>
                      <span>{photo.sub}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Address badge */}
          <motion.div
            className="clinic-address"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
          >
            <FaMapMarkerAlt />
            <span>Flat No-109, Block-3, Kirti Apartment, Mayur Vihar Phase 1 Extension, Delhi 110091</span>
            <a
              href="https://maps.google.com/?q=Orthoden+Dental+Clinic+Mayur+Vihar+Delhi"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Open in Maps
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section
        className="gallery-cta"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={vp}
      >
        <div className="container cta-inner">
          <div>
            <h2>Want Results Like These?</h2>
            <p>Book a consultation and let us create your smile transformation.</p>
          </div>
          <div className="cta-btns">
            <a href="tel:+918800182727" className="btn-primary"><FaPhone /> Call Now</a>
            <Link to="/contact" className="btn-outline-white">Book Appointment</Link>
          </div>
        </div>
      </motion.section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && currentItem && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-box"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="lb-close" onClick={closeLightbox}><FaTimes /></button>

              {currentItem.type === 'beforeafter' && (
                <div className="lb-toggle">
                  <button
                    className={lightbox.view === 'before' ? 'active' : ''}
                    onClick={() => setLightbox(l => ({ ...l, view: 'before' }))}
                  >Before</button>
                  <button
                    className={lightbox.view === 'after' ? 'active' : ''}
                    onClick={() => setLightbox(l => ({ ...l, view: 'after' }))}
                  >After</button>
                </div>
              )}

              <img src={lightboxSrc} alt={currentItem.title} className="lb-img"
                onError={e => { e.target.src = '/images/clinic/perfect-smile.jpg' }} />

              <div className="lb-info">
                <span
                  className="case-tag"
                  style={{ background: tagColors[currentItem.tag]?.bg, color: tagColors[currentItem.tag]?.color }}
                >
                  {currentItem.tag}
                </span>
                <h3>{currentItem.title}</h3>
                <p>{currentItem.desc}</p>
              </div>

              <button className="lb-nav lb-prev" onClick={() => navLightbox(-1)}><FaChevronLeft /></button>
              <button className="lb-nav lb-next" onClick={() => navLightbox(1)}><FaChevronRight /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
