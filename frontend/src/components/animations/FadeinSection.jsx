/*
PURPOSE:
Reusable wrapper component that makes any section fade-in smoothly
when it enters the viewport (scroll animation).

HOW IT WORKS:
- Uses framer-motion + whileInView feature
- When component becomes visible, it animates from opacity 0 to 1
*/

import { motion } from "framer-motion";

export default function FadeInSection({ children, delay = 0 }) {
  return (
    <motion.div
      // Initial state (before entering screen)
      initial={{ opacity: 0, y: 40 }}
      // Animation happens when component is visible in viewport
      whileInView={{ opacity: 1, y: 0 }}
      // Animation speed and delay
      transition={{ duration: 0.7, delay }}
      // Only animate once, not every time user scrolls up/down
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}