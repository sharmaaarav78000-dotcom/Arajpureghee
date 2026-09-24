import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';

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
    location: 'Agra, UP',
    initials: 'RS',
  },
  {
    text: 'Pure, natural, and exactly as described. I\'ve been ordering every single month for a year now.',
    author: 'Payal Sharma',
    location: 'Agra, UP',
    initials: 'PS',
  },
  {
    text: 'You can taste the difference from the very first spoon. This is the real deal — nothing compares.',
    author: 'Avni Sharma',
    location: 'Mumbai, MH',
    initials: 'AS',
  },
  {
    text: 'Extraordinary quality and genuine taste — this ghee takes me straight back to my grandmother\'s kitchen. Highly recommended!',
    author: 'Aarav Sharma',
    location: 'Agra, UP',
    initials: 'AS',
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
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function TestimonialsStats() {
  return (
    <>
      {/* ── TESTIMONIALS: Obsidian Black (#080909) ── */}
      <section className="py-28 relative overflow-hidden bg-[#080909]">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(214, 179, 106, 0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <motion.div {...fade(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold text-[#D6B36A]">
                Patron Reflections
              </span>
              <div className="gold-line w-12" />
            </div>
            <h2
              className="font-display font-bold text-[#F5F1E8]"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', letterSpacing: '0.04em' }}
            >
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                {...fade(i * 0.12)}
                className="relative p-8 pt-10 flex flex-col justify-between transition-all duration-400 hover:-translate-y-2 rounded-[28px] overflow-hidden group cursor-pointer"
                style={{
                  background: 'rgba(18, 20, 20, 0.75)',
                  backdropFilter: 'blur(26px) saturate(190%)',
                  border: '1px solid rgba(214, 179, 106, 0.22)',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(214, 179, 106, 0.6)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(0,0,0,0.85), 0 0 28px rgba(214, 179, 106, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(214, 179, 106, 0.22)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)';
                }}
              >
                {/* Champagne subtle top accent */}
                <div
                  className="absolute top-0 inset-x-0 h-[1.5px] group-hover:h-[2px] transition-all"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(214, 179, 106, 0.7), transparent)',
                  }}
                />

                {/* Star rating with gold shimmer */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-[#D6B36A]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill="#D6B36A" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 font-sans text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full bg-[#D6B36A]/15 text-[#E8D39A] border border-[#D6B36A]/35">
                    <CheckCircle2 size={11} className="text-[#D6B36A]" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Quote */}
                <p
                  className="font-serif italic text-lg leading-relaxed mb-8 text-[#F5F1E8]/85"
                  style={{ fontSize: '1.05rem' }}
                >
                  "{r.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6 border-t border-[#D6B36A]/18">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xs font-bold shrink-0 bg-[#080909] text-[#D6B36A] border border-[#D6B36A]/45 shadow-[0_0_14px_rgba(214, 179, 106, 0.2)]"
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-sm tracking-wider uppercase text-[#F5F1E8]">
                      {r.author}
                    </div>
                    <div className="font-sans text-xs text-[#F5F1E8]/50">
                      {r.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS: Deep Charcoal (#121414) ── */}
      <section className="py-24 relative overflow-hidden bg-[#121414]">
        {/* Ambient radial haze */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(214, 179, 106, 0.09) 0%, transparent 70%)' }}
        />

        {/* Top & bottom ornamental lines */}
        <div className="absolute top-0 inset-x-0 gold-line-full" />
        <div className="absolute bottom-0 inset-x-0 gold-line-full" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              {...fade(i * 0.1)}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="font-display font-bold stat-number text-[#D6B36A]"
                style={{ fontSize: 'clamp(2.4rem,4.5vw,3.6rem)', letterSpacing: '0.02em' }}
              >
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="gold-line w-8" />
              <p className="font-sans text-[10px] tracking-[0.24em] uppercase font-semibold text-[#F5F1E8]/65">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
