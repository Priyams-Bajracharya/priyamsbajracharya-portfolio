// Shared framer-motion variants so every scroll-reveal/hover animation across
// the site uses the same timing instead of ad-hoc values per component.
// Actual on/off switching for prefers-reduced-motion is handled app-wide by
// wrapping <App/> in <MotionConfig reducedMotion="user">; these variants just
// define what "motion" looks like when it's allowed to run.

// Factory (not a static object) so each caller can bake in its own stagger
// delay — variant-level transitions take priority over a component's
// `transition` prop in framer-motion, so delay has to live in here.
export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay } },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const staggerContainer = (staggerDelay = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
});

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01, transition: { duration: 0.2, ease: 'easeOut' } },
};
