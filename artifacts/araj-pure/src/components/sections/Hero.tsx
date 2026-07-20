import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ShieldCheck, Leaf, Award } from 'lucide-react';
import heroImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

const PARTICLES = [
  { id:0,  w:4, left:'7%',  top:'14%', cls:'particle-a', delay:'0s'   },
  { id:1,  w:6, left:'14%', top:'68%', cls:'particle-b', delay:'1.5s' },
  { id:2,  w:3, left:'23%', top:'38%', cls:'particle-c', delay:'0.8s' },
  { id:3,  w:8, left:'32%', top:'82%', cls:'particle-a', delay:'2.2s' },
  { id:4,  w:4, left:'44%', top:'20%', cls:'particle-b', delay:'1.1s' },
  { id:5,  w:5, left:'57%', top:'63%', cls:'particle-c', delay:'0.4s' },
  { id:6,  w:3, left:'67%', top:'28%', cls:'particle-a', delay:'1.8s' },
  { id:7,  w:7, left:'76%', top:'76%', cls:'particle-b', delay:'0.6s' },
  { id:8,  w:4, left:'84%', top:'11%', cls:'particle-c', delay:'2.5s' },
  { id:9,  w:3, left:'91%', top:'53%', cls:'particle-a', delay:'1.3s' },
  { id:10, w:5, left:'28%', top:'52%', cls:'particle-b', delay:'2.0s' },
  { id:11, w:4, left:'71%', top:'18%', cls:'particle-c', delay:'0.9s' },
];

const trustBadges = [
  { icon: ShieldCheck, text: 'FSSAI Certified' },
  { icon: Leaf,        text: 'No Preservatives' },
  { icon: Award,       text: 'Pure Bilona' },
];

const textVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden" style={{ background: 'var(--espresso)' }}>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: 'rgba(200,164,94,0.07)' }} />
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full blur-[100px]" style={{ background: 'rgba(200,164,94,0.05)' }} />
      </div>

      {/* Floating gold particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className={`absolute rounded-full pointer-events-none ${p.cls}`}
          style={{ width: p.w, height: p.w, left: p.left, top: p.top, background: 'var(--gold)', animationDelay: p.delay }}
        />
      ))}

      {/* ── LEFT: Text panel ── */}
      <div className="relative z-10 w-full md:w-[56%] flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-32 pb-20 md:py-0">

        {/* Pre-headline */}
        <motion.div
          custom={0} variants={textVariants} initial="hidden" animate="visible"
          className="flex items-center gap-3 mb-8"
        >
          <div className="gold-line w-10" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
            Pure A2 Cow Ghee · Since 1985
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          custom={0.12} variants={textVariants} initial="hidden" animate="visible"
          className="font-display font-bold leading-[1.06] mb-4"
          style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', color: 'var(--ivory)', letterSpacing: '0.02em' }}
        >
          An Ancient<br />Legacy of<br />
          <span className="shimmer-gold" style={{ fontStyle: 'italic', letterSpacing: '0.01em' }}>Purity</span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          custom={0.26} variants={textVariants} initial="hidden" animate="visible"
          className="font-serif italic mb-7"
          style={{ fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', color: 'var(--gold-pale)', opacity: 0.88 }}
        >
          Exquisitely Crafted
        </motion.p>

        {/* Animated gold rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.38, ease: 'easeOut' }}
          className="gold-line-full w-40 mb-8" style={{ transformOrigin: 'left' }}
        />

        <motion.p
          custom={0.44} variants={textVariants} initial="hidden" animate="visible"
          className="font-sans text-[0.92rem] leading-[1.8] mb-10 max-w-md"
          style={{ color: 'rgba(240,226,204,0.62)' }}
        >
          Hand-churned using the sacred Bilona method, sourced from free-grazing A2 cows. Pure nourishment—the way nature intended, for nearly four decades.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={0.56} variants={textVariants} initial="hidden" animate="visible"
          className="flex flex-wrap gap-4 mb-12"
        >
          <button
            onClick={() => scroll('shop')}
            className="btn-shimmer px-9 py-4 font-sans font-semibold text-[11px] tracking-[0.25em] uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
            style={{
              background: 'linear-gradient(130deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)',
              color: 'var(--espresso)',
              boxShadow: '0 4px 28px rgba(200,164,94,0.35)',
            }}
          >
            Shop Now
          </button>
          <button
            onClick={() => scroll('story')}
            className="px-9 py-4 font-sans font-semibold text-[11px] tracking-[0.25em] uppercase transition-all duration-200 hover:scale-[1.04]"
            style={{
              border: '1px solid rgba(200,164,94,0.45)',
              color: 'var(--gold)',
              background: 'transparent',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200,164,94,0.09)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            Our Story
          </button>
        </motion.div>

        {/* Mini trust row */}
        <motion.div
          custom={0.7} variants={textVariants} initial="hidden" animate="visible"
          className="flex flex-wrap gap-6"
        >
          {trustBadges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={13} style={{ color: 'var(--gold)' }} />
              <span className="font-sans text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(240,226,204,0.45)' }}>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Product image ── */}
      <div className="relative w-full md:w-[44%] min-h-[55vw] md:min-h-screen overflow-hidden">
        {/* Thin gold frame inset */}
        <div className="absolute inset-5 md:inset-10 z-10 pointer-events-none" style={{ border: '1px solid rgba(200,164,94,0.18)' }} />
        {/* Corner accents */}
        {[
          { t:'top-5 md:top-10 left-5 md:left-10',  s:{ borderTop:'1.5px solid rgba(200,164,94,0.55)', borderLeft:'1.5px solid rgba(200,164,94,0.55)' } },
          { t:'top-5 md:top-10 right-5 md:right-10', s:{ borderTop:'1.5px solid rgba(200,164,94,0.55)', borderRight:'1.5px solid rgba(200,164,94,0.55)' } },
          { t:'bottom-5 md:bottom-10 left-5 md:left-10',  s:{ borderBottom:'1.5px solid rgba(200,164,94,0.55)', borderLeft:'1.5px solid rgba(200,164,94,0.55)' } },
          { t:'bottom-5 md:bottom-10 right-5 md:right-10', s:{ borderBottom:'1.5px solid rgba(200,164,94,0.55)', borderRight:'1.5px solid rgba(200,164,94,0.55)' } },
        ].map((c, i) => (
          <div key={i} className={`absolute ${c.t} w-7 h-7 z-20 pointer-events-none`} style={c.s} />
        ))}

        <motion.img
          initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={heroImg} alt="Araj Pure A2 Cow Ghee"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blend gradient into dark left panel */}
        <div className="absolute inset-0 hidden md:block pointer-events-none" style={{ background: 'linear-gradient(to right, var(--espresso) 0%, transparent 28%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(15,8,4,0.55) 0%, transparent 38%)' }} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 animate-scroll-bounce pointer-events-none">
        <span className="font-sans text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(200,164,94,0.5)' }}>Scroll</span>
        <ChevronDown size={15} style={{ color: 'var(--gold)' }} />
      </div>
    </section>
  );
}
