import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Animated counter ──
function Counter({ end, suffix = '', duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setVal(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const REVIEWS = [
  {
    text: 'Best A2 Ghee I\'ve ever tasted. The aroma fills the entire kitchen instantly — absolutely mesmerising.',
    author: 'Rahul Sharma',
    location: 'Delhi',
    initials: 'RS',
  },
  {
    text: 'Pure, natural, and exactly as described. I\'ve been ordering every single month for a year now.',
    author: 'Priya Menon',
    location: 'Mumbai',
    initials: 'PM',
  },
  {
    text: 'You can taste the difference from the very first spoon. This is the real deal — nothing compares.',
    author: 'Ankit Verma',
    location: 'Jaipur',
    initials: 'AV',
  },
];

const STATS = [
  { end: 10000, suffix: '+', label: 'Happy Customers' },
  { end: 100,   suffix: '%', label: 'Pure Bilona'     },
  { end: 500,   suffix: '+', label: 'Orders / Month'  },
  { end: 4,     suffix: '.9★', label: 'Customer Rating' },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function TestimonialsStats() {
  return (
    <>
      {/* ── TESTIMONIALS ── */}
      <section className="py-28" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fade(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold-dark)' }}>Testimonials</span>
              <div className="gold-line w-12" />
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--espresso)', letterSpacing: '0.04em' }}>
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i} {...fade(i * 0.12)}
                className="quote-mark relative p-8 pt-14 flex flex-col justify-between gold-card"
                style={{ background: '#fff', border: '1px solid rgba(200,164,94,0.2)' }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5" style={{ color: 'var(--gold)' }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: '0.9rem' }}>★</span>)}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-xl leading-relaxed mb-8" style={{ color: 'rgba(44,26,10,0.8)', fontSize: '1.1rem' }}>
                  "{r.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid rgba(200,164,94,0.15)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xs font-bold shrink-0" style={{ background: 'var(--espresso)', color: 'var(--gold)' }}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-sm tracking-wider uppercase" style={{ color: 'var(--espresso)' }}>{r.author}</div>
                    <div className="font-sans text-xs" style={{ color: 'rgba(44,26,10,0.45)' }}>{r.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--espresso)' }}>
        {/* Ambient radial haze */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(200,164,94,0.07) 0%, transparent 70%)' }} />

        {/* Top & bottom ornamental lines */}
        <div className="absolute top-0 inset-x-0 gold-line" />
        <div className="absolute bottom-0 inset-x-0 gold-line" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i} {...fade(i * 0.1)}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="font-display font-bold stat-number"
                style={{ fontSize: 'clamp(2.4rem,4.5vw,3.6rem)', color: 'var(--gold)', letterSpacing: '0.02em' }}
              >
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="gold-line w-8" />
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(240,226,204,0.5)' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
