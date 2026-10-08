import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp } from '../../lib/motionVariants';

// Wraps children in a fade/slide-up reveal the first time they scroll into view.
// Respects reduced-motion app-wide via the <MotionConfig reducedMotion="user"> in App.jsx.
export function RevealOnScroll({ children, delay = 0, className = '', as = 'div' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp(delay)}
    >
      {children}
    </MotionTag>
  );
}
