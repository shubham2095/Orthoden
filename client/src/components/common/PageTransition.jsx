import { motion } from 'framer-motion'

// Fade/slide wrapper used for every route change.
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  )
}
