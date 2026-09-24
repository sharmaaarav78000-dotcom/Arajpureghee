import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import heroImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';
import GoldParticles from '@/components/effects/GoldParticles';

const fade = (delay: number) => ({
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

export default function Hero() {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // 3D Mouse Parallax State
  const stageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll tracking for the "ARĀJ GOLDEN AURA"
  const { scrollY } = useScroll();
  const auraOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const auraScale = useTransform(scrollY, [0, 450], [1, 0.85]);
  const jarScrollY = useTransform(scrollY, [0, 600], [0, 90]);

  // Smooth springs for 3D rotation and translation
  const springConfig = { stiffness: 100, damping: 20, mass: 0.8 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const moveX = useSpring(0, springConfig);
  const moveY = useSpring(0, springConfig);

  useEffect(() => {
    rotateX.set(-mousePos.y * 6.5);
    rotateY.set(mousePos.x * 6.5);
    moveX.set(mousePos.x * 14);
    moveY.set(mousePos.y * 14);
  }, [mousePos, rotateX, rotateY, moveX, moveY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    setMousePos({
      x: (clientX - 0.5) * 2,
      y: (clientY - 0.5) * 2,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden bg-[#080909]"
    >
      {/* Dynamic ambient studio lighting: Obsidian Black (#080909) -> Graphite (#1C1F1F) -> Deep Charcoal (#121414) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Champagne Gold top radial glow */}
        <div
          className="absolute -top-32 left-1/4 w-[850px] h-[850px] rounded-full blur-[190px]"
          style={{ background: 'radial-gradient(circle, rgba(214, 179, 106, 0.12) 0%, rgba(18, 20, 20, 0.55) 60%, transparent 80%)' }}
        />
        {/* Deep Charcoal & Warm Gold Highlight glow near the bottom */}
        <div
          className="absolute -bottom-40 right-1/4 w-[650px] h-[650px] rounded-full blur-[170px]"
          style={{ background: 'radial-gradient(circle, rgba(232, 211, 154, 0.08) 0%, rgba(18, 20, 20, 0.6) 50%, transparent 80%)' }}
        />
        {/* Fine atmospheric grain */}
        <div className="absolute inset-0 bg-ambient-grain opacity-70" />
        {/* Slow drifting volumetric light ray */}
        <div
          className="absolute top-0 right-1/3 w-[450px] h-[130%] pointer-events-none animate-ray-drift"
          style={{
            background: 'linear-gradient(115deg, transparent 20%, rgba(214, 179, 106, 0.05) 50%, transparent 75%)',
            transformOrigin: 'top center',
          }}
        />
      </div>

      {/* Floating Canvas Gold Dust Particles */}
      <GoldParticles />

      {/* ── LEFT: Text & Brand Heritage Panel ── */}
      <div className="relative z-10 w-full lg:w-[52%] flex flex-col justify-center px-8 md:px-14 lg:px-20 pt-36 pb-16 lg:py-0">
        {/* Eyebrow with animated gold line */}
        <motion.div
          variants={fade(0)}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-8"
        >
          <div className="gold-line w-12" />
          <span
            className="font-sans text-[10.5px] tracking-[0.32em] uppercase font-semibold text-[#D6B36A]"
          >
            Pure A2 Cow Ghee · Since 1985
          </span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          variants={fade(0.12)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5.2vw, 4.8rem)',
            lineHeight: 1.08,
            letterSpacing: '0.015em',
            color: '#F5F1E8',
            marginBottom: '1.25rem',
          }}
        >
          The Taste of<br />
          <span className="shimmer-gold" style={{ fontStyle: 'italic' }}>
            Tradition.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fade(0.22)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
            color: '#E8D39A',
            opacity: 0.95,
            marginBottom: '1.5rem',
          }}
        >
          Crafted for Modern Kitchens.
        </motion.p>

        {/* Animated Expanding Gold Rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.32, ease: 'easeOut' }}
          className="gold-line-full w-36 mb-8"
          style={{ transformOrigin: 'left' }}
        />

        {/* Body Description */}
        <motion.p
          variants={fade(0.42)}
          initial="hidden"
          animate="visible"
          className="font-sans text-[0.92rem] leading-[1.95] mb-10 max-w-md text-[#F5F1E8]/75"
          style={{ letterSpacing: '0.01em' }}
        >
          Small-batch pure cow ghee made using time-honoured methods. No shortcuts. No additives. Just decades of patience, devotion, and craft.
        </motion.p>

        {/* Curved Premium Capsule CTA Buttons */}
        <motion.div variants={fade(0.54)} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={() => scroll('shop')}
            className="btn-capsule-gold inline-flex items-center gap-3 px-10 py-4 font-sans font-semibold text-[11px] tracking-[0.28em] uppercase cursor-pointer"
          >
            <Sparkles size={14} className="text-[#080909]" />
            <span>Shop Collection</span>
          </button>

          <button
            onClick={() => scroll('story')}
            className="btn-capsule-glass inline-flex items-center gap-2 px-8 py-4 font-sans text-[11px] tracking-[0.22em] uppercase font-semibold cursor-pointer"
          >
            <span>Discover Craft</span>
          </button>
        </motion.div>

        {/* Trust Badges in Glass Pills */}
        <motion.div
          variants={fade(0.68)}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 sm:gap-6 mt-14 pt-8 border-t border-[#D6B36A]/18"
        >
          {[
            'FSSAI Certified',
            'No Preservatives',
            'Pure Bilona',
            '100% Indigenous A2',
          ].map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121414]/75 border border-[#D6B36A]/22 backdrop-blur-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#D6B36A',
                  display: 'inline-block',
                  boxShadow: '0 0 10px rgba(214, 179, 106, 0.9)',
                }}
              />
              <span
                className="font-sans text-[10px] tracking-[0.22em] uppercase font-medium text-[#F5F1E8]/75"
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: CINEMATIC 3D PRODUCT SHOWROOM ── */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full lg:w-[48%] min-h-[75vw] sm:min-h-[580px] lg:min-h-screen flex items-center justify-center p-6 md:p-12 overflow-hidden perspective-1000 select-none cursor-grab active:cursor-grabbing"
      >
        {/* Architectural Glass Reticle Frame */}
        <div
          className="absolute inset-8 md:inset-14 z-10 pointer-events-none rounded-[28px] transition-all duration-700"
          style={{
            border: '1px solid rgba(214, 179, 106, 0.22)',
            background: 'radial-gradient(ellipse at center, rgba(18, 20, 20, 0.4) 0%, transparent 80%)',
            boxShadow: isHovered ? '0 0 45px rgba(214, 179, 106, 0.16)' : 'none',
          }}
        />

        {/* Reticle Corner Accents */}
        {[
          { pos: 'top-8 md:top-14 left-8 md:left-14', border: 'border-t-2 border-l-2' },
          { pos: 'top-8 md:top-14 right-8 md:right-14', border: 'border-t-2 border-r-2' },
          { pos: 'bottom-8 md:bottom-14 left-8 md:left-14', border: 'border-b-2 border-l-2' },
          { pos: 'bottom-8 md:bottom-14 right-8 md:right-14', border: 'border-b-2 border-r-2' },
        ].map((c, i) => (
          <div
            key={i}
            className={`absolute ${c.pos} w-7 h-7 z-20 pointer-events-none ${c.border}`}
            style={{ borderColor: 'rgba(214, 179, 106, 0.6)' }}
          />
        ))}

        {/* ── SPECIAL SIGNATURE EFFECT: "ARĀJ GOLDEN AURA" ── */}
        <motion.div
          style={{
            opacity: auraOpacity,
            scale: auraScale,
          }}
          className="absolute w-[420px] h-[420px] md:w-[540px] md:h-[540px] rounded-full pointer-events-none z-[2]"
        >
          {/* Primary breathing golden aura core */}
          <div
            className="absolute inset-0 rounded-full animate-aura-pulse"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(232, 211, 154, 0.36) 0%, rgba(214, 179, 106, 0.2) 35%, rgba(140, 114, 53, 0.06) 60%, transparent 75%)',
            }}
          />

          {/* Secondary subtle halo rim */}
          <div
            className="absolute inset-8 rounded-full border border-dashed pointer-events-none"
            style={{
              borderColor: 'rgba(214, 179, 106, 0.26)',
              animation: 'spin 40s linear infinite',
            }}
          />
        </motion.div>

        {/* ── 3D FLOATING PRODUCT RIG ── */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: moveX,
            y: jarScrollY,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-20 flex flex-col items-center justify-center max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] w-full"
        >
          {/* Product Jar Wrapper with Physical Levitation Animation */}
          <div className="relative w-full aspect-[4/5] flex items-center justify-center animate-jar-float">
            
            {/* Real Product Jar Image - Preserved completely authentic & undistorted */}
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              src={heroImg}
              alt="Araj Pure A2 Cow Ghee Jar"
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              style={{ willChange: 'transform' }}
            />

            {/* Specular Glass Highlight Sheen Sweep */}
            <div
              className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl"
              style={{ mixBlendMode: 'screen' }}
            >
              <div
                className="w-[140%] h-full animate-glass-sheen"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
                }}
              />
            </div>

            {/* Soft Champagne Rim Light Edge Accent */}
            <div
              className="absolute inset-0 z-10 pointer-events-none rounded-full"
              style={{
                background: 'radial-gradient(ellipse at 70% 30%, rgba(232,211,154,0.22) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* ── LUXURY PEDESTAL SHADOW & SURFACE REFLECTION ── */}
          <div className="relative w-3/4 h-12 -mt-4 flex items-center justify-center pointer-events-none z-0">
            {/* Contact Deep Shadow */}
            <div
              className="w-full h-8 rounded-[100%] animate-shadow-breath"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.98) 0%, rgba(18, 20, 20, 0.65) 50%, transparent 80%)',
                filter: 'blur(10px)',
              }}
            />

            {/* Soft Champagne Pedestal Glow */}
            <div
              className="absolute w-4/5 h-6 rounded-[100%]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(214, 179, 106, 0.32) 0%, transparent 70%)',
                filter: 'blur(14px)',
              }}
            />
          </div>
        </motion.div>

        {/* Ambient Dark Gradient Blend into Left Panel */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #080909 0%, transparent 25%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, rgba(8,9,9,0.75) 0%, transparent 35%)' }}
        />
      </div>

      {/* Minimalist Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 animate-scroll-bounce pointer-events-none">
        <span className="font-sans text-[9px] tracking-[0.32em] uppercase font-semibold text-[#D6B36A]/80">
          Scroll Experience
        </span>
        <ChevronDown size={14} className="text-[#D6B36A]" />
      </div>
    </section>
  );
}
