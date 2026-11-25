import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaTooth } from 'react-icons/fa'
import './FAQ.css'

const faqs = [
  {
    q: 'What services does Orthoden Dental Clinic offer?',
    a: 'We offer a full range of dental services including General Dentistry (checkups, cleanings, fillings, root canals), Cosmetic Dentistry (veneers, whitening, smile makeovers, composite bonding), and Emergency Dental Care. All treatments are performed by Dr. Dip Banerjee with modern equipment.',
  },
  {
    q: 'Is the treatment painful? Do you provide painless dentistry?',
    a: 'Yes! Painless treatment is one of our specialities. We use the latest anaesthesia techniques and gentle methods to ensure you feel comfortable and at ease throughout your procedure. Many of our patients are surprised at how smooth and pain-free their experience is.',
  },
  {
    q: 'How do I book an appointment?',
    a: 'You can book an appointment by calling us at +91 88001 82727, sending a WhatsApp message, or filling out the contact form on our website. We offer flexible timings Monday to Saturday from 10:00 AM to 8:00 PM, and Sunday by appointment.',
  },
  {
    q: 'Where is Orthoden Dental Clinic located?',
    a: 'We are located at Flat No-109, Block-3, Kirti Apartment, Mayur Vihar Phase 1 Extension, Mayur Vihar, Delhi 110091. The clinic operates from a home setting which is clean, hygienic, and fully equipped with professional dental equipment.',
  },
  {
    q: 'How much does a dental consultation cost?',
    a: 'Our consultation fee is ₹500. Treatment costs vary depending on the procedure. We believe in transparent pricing — Dr. Dip Banerjee will clearly explain all costs before starting any treatment so there are no surprises.',
  },
  {
    q: 'Do you treat children and elderly patients?',
    a: 'Absolutely. We welcome patients of all ages — from young children to senior citizens. Dr. Dip is known for his patient, gentle approach that helps even the most anxious patients (and little ones!) feel relaxed and comfortable.',
  },
  {
    q: 'How long does a root canal treatment (RCT) take?',
    a: 'A root canal treatment typically takes 2–3 sittings depending on the complexity of the case. Each sitting is usually 45–60 minutes. Dr. Dip uses modern techniques to make the procedure as quick and comfortable as possible.',
  },
  {
    q: 'Is the clinic hygienic and safe?',
    a: 'Yes, absolutely. We follow strict sterilisation protocols for all instruments and maintain a clean, hygienic environment. All disposable items are used once and discarded. Your safety and health are our top priority at every visit.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq-section">
      <div className="container faq-inner">

        {/* Left — title */}
        <motion.div
          className="faq-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="faq-tag">FAQs</p>
          <h2>Frequently Asked <span>Questions</span></h2>
          <p>Everything you need to know before your visit. Can't find your answer? Just call us.</p>
          <a href="tel:+918800182727" className="btn-primary faq-cta">
            <FaTooth /> Ask Us Directly
          </a>
        </motion.div>

        {/* Right — accordion */}
        <motion.div
          className="faq-list"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="faq-question">
                <span>{item.q}</span>
                <motion.div
                  className="faq-chevron"
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
