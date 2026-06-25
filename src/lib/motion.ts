import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const cartDrawerVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}
