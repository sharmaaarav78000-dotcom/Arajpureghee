import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #8C7235 0%, #D6B36A 50%, #E8D39A 100%)',
        boxShadow: '0 0 16px rgba(214, 179, 106, 0.8), 0 0 6px rgba(232, 211, 154, 0.95)',
      }}
    />
  );
}
