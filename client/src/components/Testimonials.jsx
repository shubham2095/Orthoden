import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaQuoteLeft, FaGoogle, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Testimonials.css'

const reviews = [
  {
    name: 'Daniyal Mirza',
    badge: 'Local Guide',
    rating: 5,
    date: '3 years ago',
    treatment: 'Tooth Removal',
    text: 'The kindest, most caring, most professional, most humble doctor I\'ve met. Perfect at what he does, even better at making patients feel comfortable. My mom is scared of anything medical yet she was smiling after visiting his clinic and getting her teeth removed was a breeze. Awesome!!',
    initials: 'DM',
    color: '#4f46e5',
  },
  {
    name: 'Atindra Nath Bhattacharya',
    badge: 'Local Guide',
    rating: 5,
    date: '8 years ago',
    treatment: 'General Treatment',
    text: 'One of the finest doctors I have met in my five decades of life. A thoroughly competent, fully transparent and 100% ethical professional with a pure heart!! I felt that I was being treated by a family member. Best part — less medicines and reasonable cost!!',
    initials: 'AB',
    color: '#0891b2',
  },
  {
    name: 'Saakshi Saxena',
    badge: '9 reviews',
    rating: 5,
    date: '1 year ago',
    treatment: 'Wisdom Teeth Removal',
    text: 'I have gotten all my wisdom teeth extracted here and had a great experience. Dr Dip is extremely nice, takes questions enthusiastically and patiently explains everything in great detail. It leads to a very reassuring and comforting environment where all worries are dispelled. Would very highly recommend!',
    initials: 'SS',
    color: '#059669',
  },
  {
    name: 'Balaji Mani Khumaran M',
    badge: 'Local Guide',
    rating: 5,
    date: '2 months ago',
    treatment: 'RCT & Zirconia Cap',
    text: 'Had a very good experience getting my RCT and zirconia cap done here. The doctor was extremely friendly, patient, and explained the entire procedure clearly, which made me feel comfortable throughout the treatment. The procedure was smooth and I am very satisfied with the results.',
    initials: 'BM',
    color: '#d97706',
  },
  {
    name: 'Ram Nandan',
    badge: 'Local Guide · 14 reviews',
    rating: 5,
    date: '4 years ago',
    treatment: 'RCT Treatment',
    text: 'Excellent experience of treatment. Dr. Dip has made me very comfortable and provided personal care during treatment. One of the best experiences of dental treatment in my life. Clinic is having all the infrastructure for professional treatment.',
    initials: 'RN',
    color: '#7c3aed',
  },
  {
    name: 'Anmol Upadhyay',
    badge: '9 reviews',
    rating: 5,
    date: '5 years ago',
    treatment: 'Root Canal (RCT)',
    text: 'My Permanent Dentist. He has magical hands. I travelled all the way from Kanpur just for his treatment. He is so passionate for his treatment that you just don\'t need to worry for your dental issue once you visit.',
    initials: 'AU',
    color: '#db2777',
  },
  {
    name: 'Vineet Chaudhary',
    badge: 'Local Guide · 13 reviews',
    rating: 5,
    date: '1 year ago',
    treatment: 'General Dentistry',
    text: 'Dr. Dip is an excellent doctor having empathy and compassion. He treats his patients with utmost care and love. His excellence is evident in his work. Highly recommended for anyone looking for a trustworthy dentist in Mayur Vihar.',
    initials: 'VC',
    color: '#0f2744',
  },
  {
    name: 'Pamela Sadhukhan',
    badge: '2 reviews · 14 photos',
    rating: 5,
    date: '5 years ago',
    treatment: 'Wisdom Tooth Removal',
    text: 'I am highly satisfied with Doctor Dip Banerjee\'s treatment. For my wisdom tooth removal, I thoroughly followed his instructions and had a very successful surgery. He makes patients calm and never lets them feel anxious throughout the procedure.',
    initials: 'PS',
    color: '#16a34a',
  },
  {
    name: 'Priya Malhotra',
    badge: 'Local Guide · 6 reviews',
    rating: 5,
    date: '8 months ago',
    treatment: 'Dental Implants',
    text: 'Got my dental implant done here and the results are absolutely fantastic. Dr. Dip explained every step of the procedure in detail and made sure I was comfortable throughout. The clinic is clean, modern, and the staff is incredibly friendly. I cannot recommend this place enough!',
    initials: 'PM',
    color: '#b45309',
  },
  {
    name: 'Suresh Kumar Verma',
    badge: 'Local Guide · 11 reviews',
    rating: 5,
    date: '6 months ago',
    treatment: 'Braces & Orthodontics',
    text: 'Visited Orthoden for braces treatment for my daughter. Dr. Banerjee is very knowledgeable and patient. He explained the entire orthodontic plan clearly and the treatment has been progressing wonderfully. The clinic maintains excellent hygiene standards. Truly a five-star experience!',
    initials: 'SV',
    color: '#0e7490',
  },
]

const GOOGLE_URL = 'https://www.google.com/search?sca_esv=d6905c7cc2141b5b&sxsrf=APpeQnuNMnvaDxI5v4ZfZ4tJ_gmuVAqqQA:1785564877311&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_wTDDvmxsG5cSmStf_xmestOlOYyDd6auMOOe9q1So9M_REav7SVhOL5uBWP6tXacK9RYXzRzh8XH-ptE_5pYOLtkqeWTS6zkyGS6VdwiaPeA_bBjKmDOAiiNRWZl7_Bbjr0LG0HkUo5vTiOYGdZBQJBv-kJQs6NadwDLoZayNbnsn1EVg%3D%3D&q=Orthoden+Dental+Clinic+-+Dentist+in+East+Delhi+/+Mayur+Vihar+Phase+1+Extension+Reviews&sa=X&ved=2ahUKEwio6vDB4_6VAxV6kuEIHSmELzYQ0bkNegQIQhAI&biw=1920&bih=911&dpr=1'
const PER_PAGE = 3

export default function Testimonials() {
  const [page, setPage]           = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]       = useState(false)

  const totalPages = Math.ceil(reviews.length / PER_PAGE)

  const goTo = (next, dir) => {
    setDirection(dir)
    setPage(next)
  }

  const next = () => goTo((page + 1) % totalPages,  1)
  const prev = () => goTo((page - 1 + totalPages) % totalPages, -1)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [page, paused])

  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const slideVariants = {
    enter:  (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }),
  }

  return (
    <section className="testimonials-section">
      <div className="container">

        {/* Header */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>What Our <span>Patients Say</span></h2>
          <p>Real reviews from real patients — verified on Google.</p>
        </motion.div>

        {/* Google Rating Badge */}
        <motion.a
          href={GOOGLE_URL}
          target="_blank"
          rel="noreferrer"
          className="google-badge"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ scale: 1.03 }}
        >
          <FaGoogle className="g-icon" />
          <div className="badge-info">
            <span className="badge-score">4.9</span>
            <div className="badge-stars">
              {[1,2,3,4,5].map(i => <FaStar key={i} />)}
            </div>
            <span className="badge-count">251 Google Reviews</span>
          </div>
          <span className="badge-cta">See all reviews →</span>
        </motion.a>

        {/* Slider */}
        <div
          className="slider-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              className="cards-wrap"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {visible.map((r) => (
                <div className="review-card" key={r.name}>
                  <FaQuoteLeft className="quote-icon" />

                  <div className="card-stars">
                    {[1,2,3,4,5].map(s => <FaStar key={s} />)}
                  </div>

                  <p className="review-text">{r.text}</p>

                  <div className="treatment-tag">{r.treatment}</div>

                  <div className="reviewer">
                    <div className="reviewer-avatar" style={{ background: r.color }}>
                      {r.initials}
                    </div>
                    <div className="reviewer-info">
                      <strong>{r.name}</strong>
                      <span>{r.badge} · {r.date}</span>
                    </div>
                    <FaGoogle className="review-google-icon" />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="testimonial-controls">
          <button className="ctrl-btn" onClick={prev} aria-label="Previous">
            <FaChevronLeft />
          </button>

          <div className="dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === page ? 'active' : ''}`}
                onClick={() => goTo(i, i > page ? 1 : -1)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          <button className="ctrl-btn" onClick={next} aria-label="Next">
            <FaChevronRight />
          </button>
        </div>

      </div>
    </section>
  )
}
