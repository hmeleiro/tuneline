import { motion, AnimatePresence } from 'framer-motion'
// https://www.framer.com/motion/animate-presence/
function Circle ({ isVisible }) {
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </AnimatePresence>
}
export default Circle
