import React from 'react';
import { motion } from 'framer-motion';

const WORDS = [
  {
    word: 'PURE',
    hindi: 'शुद्धता',
    desc: 'Uncompromised A2 single-origin cow milk sourced from healthy, free-grazing indigenous breeds.',
    stat: '100% Raw Purity',
  },
  {
    word: 'TRADITIONAL',
    hindi: 'परंपरा',
    desc: 'Authentic 2-way wooden Bilona hand churning in earthen pots, honouring Vedic Ayurvedic canons.',
    stat: 'Vedic Bilona Method',
  },
  {
    word: 'PREMIUM',
    hindi: 'उत्कृष्टता',
    desc: 'Golden-grained Danedar texture with an intoxicating aroma, hand-poured in small artisanal batches.',
    stat: 'Artisanal Gold Standard',
  },
];

export default function BrandTriptych() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#080909]">
      {/* ── AMBIENT ATMOSPHERIC LIGHTING & SUBTLE LIQUID FLOW: Obsidian (#080909) -> Deep Charcoal (#121414) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full animate-liquid-flow"
        >
          <path
            d="M0,280 C320,380 420,180 720,270 C1020,360 1140,210 1440,290 L1440,600 L0,600 Z"
            fill="url(#liquid-gold-grad-1)"
          />
          <path
            d="M0,320 C240,230 480,390 720,310 C960,230 1200,370 1440,320 L1440,600 L0,600 Z"
            fill="url(#liquid-gold-grad-2)"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="liquid-gold-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8C7235" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#D6B36A" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#E8D39A" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="liquid-gold-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D6B36A" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#8C7235" stopOpacity="0.14" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="gold-line w-12" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D6B36A] font-semibold">
              Philosophy of Craft
            </span>
            <div className="gold-line w-12" />
          </div>
          <h2
            className="font-display font-bold tracking-[0.05em] text-[#F5F1E8]"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)' }}
          >
            The Triad of Heritage
          </h2>
        </motion.div>

        {/* ── 3 STAGGERED PILLARS WITH ADVANCED CHARCOAL GLASSMORPHISM ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {WORDS.map((item, idx) => (
            <motion.div
              key={item.word}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-9 flex flex-col justify-between rounded-[28px] transition-all duration-500 hover:-translate-y-2.5 overflow-hidden cursor-pointer"
              style={{
                background: 'rgba(18, 20, 20, 0.72)',
                backdropFilter: 'blur(26px) saturate(190%)',
                WebkitBackdropFilter: 'blur(26px) saturate(190%)',
                border: '1px solid rgba(214, 179, 106, 0.22)',
                boxShadow: '0 22px 55px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 24px rgba(214,179,106,0.04)',
              }}
            >
              {/* Champagne Top Light Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] transition-all duration-500 group-hover:h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(214, 179, 106, 0.75), transparent)',
                }}
              />

              {/* Specular sheen on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle at top right, rgba(214, 179, 106, 0.14) 0%, transparent 60%)',
                }}
              />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <span
                    className="font-sans text-[10.5px] tracking-[0.25em] uppercase font-bold text-[#D6B36A]/80"
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className="font-serif italic text-base text-[#F5F1E8]/50"
                  >
                    {item.hindi}
                  </span>
                </div>

                {/* Staggered Typography Statement */}
                <h3
                  className="font-display font-extrabold tracking-[0.12em] mb-4 text-3xl transition-colors duration-300 text-[#D6B36A] group-hover:text-[#E8D39A]"
                >
                  {item.word}
                </h3>

                <p
                  className="font-sans text-[0.88rem] leading-[1.8] mb-8 text-[#F5F1E8]/70"
                >
                  {item.desc}
                </p>
              </div>

              <div
                className="pt-5 flex items-center justify-between border-t border-[#D6B36A]/18"
              >
                <span
                  className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium text-[#E8D39A]"
                >
                  {item.stat}
                </span>
                <span className="text-[#D6B36A] opacity-80">✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
