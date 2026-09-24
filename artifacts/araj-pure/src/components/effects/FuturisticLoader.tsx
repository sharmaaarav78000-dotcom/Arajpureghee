import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

export default function FuturisticLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant, smooth entrance loader: max 1.1s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="futuristic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none bg-[#080909]"
        >
          {/* Subtle ambient radial background: Obsidian to Deep Charcoal with Champagne aura */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(214, 179, 106, 0.16) 0%, transparent 60%)',
            }}
          />

          <div className="relative flex flex-col items-center">
            {/* Spinning sacred geometry outer champagne ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed"
              style={{
                borderColor: 'rgba(214, 179, 106, 0.38)',
                width: 104,
                height: 104,
              }}
            />

            {/* Glowing inner pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-2 rounded-full border"
              style={{
                borderColor: 'rgba(232, 211, 154, 0.6)',
                boxShadow: '0 0 28px rgba(214, 179, 106, 0.45)',
                width: 88,
                height: 88,
              }}
            />

            {/* Brand Logo */}
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              src={logo}
              alt="Araj Pure Ghee"
              className="w-16 h-16 rounded-full relative z-10 object-cover"
              style={{
                boxShadow: '0 0 24px rgba(214, 179, 106, 0.35)',
              }}
            />

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-center"
            >
              <h2
                className="font-display font-bold tracking-[0.24em] text-sm text-[#D6B36A]"
              >
                ARAJ PURE
              </h2>
              <div
                className="font-sans text-[8px] tracking-[0.32em] uppercase mt-1 text-[#F5F1E8]/60"
              >
                A2 Cow Ghee · Pure Heritage
              </div>
            </motion.div>

            {/* Subtle light sweep bar */}
            <div className="w-28 h-[1.5px] mt-4 overflow-hidden relative bg-[#D6B36A]/20 rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1/2 h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E8D39A, transparent)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
