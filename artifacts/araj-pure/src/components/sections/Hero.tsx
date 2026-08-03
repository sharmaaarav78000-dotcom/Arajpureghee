import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

const PARTICLES = [
  { id:0,  w:3, left:'6%',  top:'18%', cls:'particle-a', delay:'0s'   },
  { id:1,  w:5, left:'13%', top:'71%', cls:'particle-b', delay:'1.5s' },
  { id:2,  w:2, left:'22%', top:'40%', cls:'particle-c', delay:'0.8s' },
  { id:3,  w:6, left:'31%', top:'84%', cls:'particle-a', delay:'2.2s' },
  { id:4,  w:3, left:'58%', top:'22%', cls:'particle-b', delay:'1.1s' },
  { id:5,  w:4, left:'72%', top:'65%', cls:'particle-c', delay:'0.4s' },
  { id:6,  w:2, left:'82%', top:'30%', cls:'particle-a', delay:'1.8s' },
  { id:7,  w:5, left:'89%', top:'78%', cls:'particle-b', delay:'0.6s' },
];

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
});

export default function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden"
      style={{ background: 'var(--espresso)' }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'rgba(200,164,94,0.06)' }} />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'rgba(200,164,94,0.04)' }} />
      </div>

      {/* Floating gold particles */}
      {PARTICLES.map(p => (
        <div key={p.id} className={`absolute rounded-full pointer-events-none ${p.cls}`}
          style={{ width: p.w, height: p.w, left: p.left, top: p.top, background: 'var(--gold)', animationDelay: p.delay }} />
      ))}

      {/* ── LEFT: Text panel ── */}
      <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center px-8 md:px-14 lg:px-24 pt-36 pb-24 md:py-0">

        {/* Eyebrow */}
        <motion.div variants={fade(0)} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-10">
          <div className="gold-line w-10" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--gold)', opacity: 0.75 }}>
            Pure A2 Cow Ghee · Since 1985
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fade(0.12)} initial="hidden" animate="visible"
          style={{
            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 5vw, 4.6rem)',
            lineHeight: 1.1,
            letterSpacing: '0.01em',
            color: 'var(--ivory)',
            marginBottom: '1.25rem',
          }}
        >
          The Taste of<br />
          <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>Tradition.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={fade(0.22)} initial="hidden" animate="visible"
          style={{
            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
            color: 'var(--gold-pale)',
            opacity: 0.78,
            marginBottom: '1.5rem',
          }}
        >
          Crafted for Modern Kitchens.
        </motion.p>

        {/* Animated gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.32, ease: 'easeOut' }}
          className="gold-line-full w-32 mb-8" style={{ transformOrigin: 'left' }}
        />

        {/* Body copy */}
        <motion.p variants={fade(0.42)} initial="hidden" animate="visible"
          className="font-sans text-[0.9rem] leading-[1.9] mb-12 max-w-sm"
          style={{ color: 'rgba(240,226,204,0.55)', letterSpacing: '0.01em' }}
        >
          Small-batch pure cow ghee made using time-honoured methods. No shortcuts. No additives. Just decades of patience and craft.
        </motion.p>

        {/* Single CTA */}
        <motion.div variants={fade(0.54)} initial="hidden" animate="visible">
          <button
            onClick={() => scroll('shop')}
            className="btn-shimmer inline-flex items-center gap-3 px-10 py-4 font-sans font-semibold text-[11px] tracking-[0.28em] uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: 'linear-gradient(130deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)',
              color: 'var(--espresso)',
              boxShadow: '0 6px 32px rgba(200,164,94,0.3)',
            }}
          >
            Shop Collection
          </button>
        </motion.div>

        {/* Minimal trust row */}
        <motion.div variants={fade(0.68)} initial="hidden" animate="visible"
          className="flex flex-wrap gap-8 mt-14">
          {['FSSAI Certified', 'No Preservatives', 'Pure Bilona'].map(text => (
            <div key={text} className="flex items-center gap-2">
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block', opacity: 0.7 }} />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,226,204,0.38)' }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Cinematic image ── */}
      <div className="relative w-full md:w-[45%] min-h-[60vw] md:min-h-screen overflow-hidden">
        {/* Gold inset frame */}
        <div className="absolute inset-6 md:inset-10 z-10 pointer-events-none"
          style={{ border: '1px solid rgba(200,164,94,0.15)' }} />
        {/* Corner accents */}
        {[
          { t: 'top-6 md:top-10 left-6 md:left-10',    s: { borderTop: '1.5px solid rgba(200,164,94,0.5)', borderLeft: '1.5px solid rgba(200,164,94,0.5)' } },
          { t: 'top-6 md:top-10 right-6 md:right-10',   s: { borderTop: '1.5px solid rgba(200,164,94,0.5)', borderRight: '1.5px solid rgba(200,164,94,0.5)' } },
          { t: 'bottom-6 md:bottom-10 left-6 md:left-10',  s: { borderBottom: '1.5px solid rgba(200,164,94,0.5)', borderLeft: '1.5px solid rgba(200,164,94,0.5)' } },
          { t: 'bottom-6 md:bottom-10 right-6 md:right-10', s: { borderBottom: '1.5px solid rgba(200,164,94,0.5)', borderRight: '1.5px solid rgba(200,164,94,0.5)' } },
        ].map((c, i) => (
          <div key={i} className={`absolute ${c.t} w-7 h-7 z-20 pointer-events-none`} style={c.s} />
        ))}

        <motion.img
          initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          src={heroImg} alt="Araj Pure A2 Cow Ghee"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark gradient blend into left panel */}
        <div className="absolute inset-0 hidden md:block pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--espresso) 0%, transparent 30%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(15,8,4,0.6) 0%, transparent 40%)' }} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-scroll-bounce pointer-events-none">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(200,164,94,0.45)' }}>Scroll</span>
        <ChevronDown size={14} style={{ color: 'rgba(200,164,94,0.6)' }} />
      </div>
    </section>
  );
}
