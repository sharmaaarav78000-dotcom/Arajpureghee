import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Check, ShieldCheck, Heart, Sparkles, Award, ShoppingBag } from 'lucide-react';

import heroImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';
import thumb1  from '@assets/ChatGPT_Image_Jul_18,_2026,_03_00_35_PM_1784571576482.png';
import thumb2  from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

const IMAGES = [heroImg, thumb1, thumb2, heroImg];

const FEATURES = [
  'Hand-churned via authentic wooden Bilona process',
  '100% pure A2 Gir cow milk — zero adulterants',
  'Packed in dark, food-grade glass to preserve aroma & prana',
  'Rich in Omega-3, vitamins A, D, E & butyric acid',
  'Naturally lactose-friendly and easy to digest',
];

const TRUST = [
  { icon: ShieldCheck, label: 'FSSAI Certified'    },
  { icon: Award,       label: 'Lab Tested'         },
  { icon: Heart,       label: 'A2 Vedic Purity'    },
  { icon: Sparkles,    label: 'Cruelty-Free Ahimsa'},
];

export default function Shop() {
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart, setIsCartOpen } = useCart();

  // 3D Card tilt state
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setCardTilt({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0, isHovered: false });
  };

  const handleAdd = () => {
    addToCart();
    setIsCartOpen(true);
  };

  return (
    <section id="shop" className="relative py-28 md:py-36 bg-[#080909] overflow-hidden">
      {/* Background radial lighting: Obsidian (#080909) -> Deep Charcoal (#121414) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(214, 179, 106, 0.08) 0%, rgba(18, 20, 20, 0.6) 60%, transparent 80%)' }}
        />
        <div className="absolute inset-0 bg-ambient-grain opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="gold-line w-8" />
            <span
              className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold text-[#D6B36A]"
            >
              The Harvest
            </span>
            <div className="gold-line w-8" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-4xl text-[#F5F1E8] mb-4"
          >
            One Jar. Everything Pure.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-sm text-[#F5F1E8]/65 leading-relaxed"
          >
            We make one thing and make it without compromise. Direct from the farm to your doorstep.
          </motion.p>
        </div>

        {/* Product Showcase Card with Glassmorphism */}
        <div className="glass-panel p-6 sm:p-10 md:p-14 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* Left: Gallery with 3D Tilt Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
              className="w-full lg:w-1/2"
            >
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden mb-5 rounded-[24px] transition-all duration-300 ease-out cursor-pointer group bg-[#121414]"
                style={{
                  aspectRatio: '4/5',
                  transform: cardTilt.isHovered
                    ? `perspective(1000px) rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg) scale3d(1.015, 1.015, 1.015)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                  boxShadow: cardTilt.isHovered
                    ? '0 30px 75px rgba(0, 0, 0, 0.85), 0 0 40px rgba(214, 179, 106, 0.3)'
                    : '0 15px 45px rgba(0, 0, 0, 0.6)',
                  border: cardTilt.isHovered ? '1.5px solid #D6B36A' : '1px solid rgba(214, 179, 106, 0.28)',
                }}
              >
                {/* Product Image with smooth 2-4% hover zoom */}
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: cardTilt.isHovered ? 1.04 : 1 }}
                  transition={{ duration: 0.4 }}
                  src={IMAGES[activeImg]}
                  alt="Araj Pure A2 Cow Ghee"
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Specular Glare Reflection sweep */}
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ mixBlendMode: 'overlay' }}
                >
                  <div
                    className="w-[150%] h-full animate-glass-sheen"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                  />
                </div>

                {/* Special Offer badge on image */}
                <div
                  className="absolute top-4 right-4 flex flex-col items-center text-center px-3.5 py-2.5 rounded-2xl z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(191,160,90,0.96), rgba(214,179,106,0.96))',
                    boxShadow: '0 4px 22px rgba(214,179,106,0.45)',
                    border: '1px solid rgba(255,255,255,0.45)',
                    minWidth: 76,
                  }}
                >
                  <span style={{ color: '#080909', fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    Special
                  </span>
                  <span style={{ color: '#080909', fontFamily: "'Playfair Display', serif", fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.1 }}>
                    ₹250
                  </span>
                  <span style={{ color: '#080909', fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    OFF
                  </span>
                  <span style={{ color: '#2a2208', fontFamily: "'Inter', sans-serif", fontSize: '0.55rem', fontWeight: 700, marginTop: 2, background: 'rgba(255,255,255,0.3)', padding: '1px 6px', borderRadius: 999 }}>
                    LIMITED
                  </span>
                </div>

                {/* Premium pill label */}
                <div
                  className="absolute top-4 left-4 font-display text-[10px] tracking-[0.2em] px-3.5 py-1.5 z-10 flex items-center gap-1.5 rounded-full border border-[#D6B36A]/45 text-[#D6B36A] bg-[#080909]/90 backdrop-blur-md"
                >
                  <Sparkles size={11} />
                  <span>PREMIUM</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="relative overflow-hidden transition-all duration-300 rounded-2xl bg-[#121414] cursor-pointer"
                    style={{
                      aspectRatio: '1',
                      border: activeImg === i ? '1.5px solid #D6B36A' : '1.5px solid rgba(214,179,106,0.22)',
                      opacity: activeImg === i ? 1 : 0.65,
                      transform: activeImg === i ? 'scale(1.03)' : 'scale(1)',
                      boxShadow: activeImg === i ? '0 0 16px rgba(214,179,106,0.35)' : 'none',
                    }}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
              className="w-full lg:w-1/2 flex flex-col"
            >
              <h2
                className="font-display font-bold mb-3 text-[#F5F1E8]"
                style={{ fontSize: 'clamp(1.8rem,2.8vw,2.5rem)', letterSpacing: '0.03em' }}
              >
                Araj Pure A2<br />Cow Ghee
              </h2>

              <p className="font-serif text-lg leading-relaxed mb-8 text-[#F5F1E8]/75">
                Crafted with deep reverence for Ayurvedic principles, sourced from free-grazing cows, hand-churned using the authentic wooden Bilona method.
              </p>

              {/* Features */}
              <ul className="space-y-3.5 mb-8">
                {FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-[#D6B36A]/15 border border-[#D6B36A]/50"
                    >
                      <Check size={11} className="text-[#D6B36A]" />
                    </div>
                    <span className="font-sans text-sm leading-snug text-[#F5F1E8]/85">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="flex items-end gap-3 mb-8 pb-8 border-b border-[#D6B36A]/22">
                <span className="font-display font-bold text-4xl gold-text">₹2,299</span>
                <span className="font-sans text-sm mb-1.5 text-[#F5F1E8]/50">/ 1 kg</span>
                <div className="mb-1.5 ml-2 flex gap-2 flex-wrap items-center">
                  <span
                    className="px-3 py-1 font-sans text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#D6B36A]/15 text-[#E8D39A] border border-[#D6B36A]/40"
                  >
                    Bestseller
                  </span>
                  <span
                    className="px-3 py-1 font-sans text-[10px] font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#BFA05A] to-[#D6B36A] text-[#080909] shadow-sm flex items-center gap-1"
                  >
                    <Sparkles size={10} /> Special Offer: ₹250 OFF
                  </span>
                </div>
              </div>

              {/* CTA with Curved Premium Capsule Button */}
              <button
                onClick={handleAdd}
                className="btn-capsule-gold w-full py-4 font-sans font-semibold text-[11.5px] tracking-[0.25em] uppercase mb-8 flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingBag size={16} className="text-[#080909]" />
                <span>Add to Cart</span>
              </button>

              {/* Trust badges in frosted glass tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TRUST.map(({ icon: Icon, label }, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 text-center py-4 px-2 rounded-2xl transition-all duration-300 hover:bg-[#D6B36A]/12 hover:border-[#D6B36A]/45"
                    style={{
                      border: '1px solid rgba(214,179,106,0.22)',
                      background: 'rgba(28,31,31,0.5)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <Icon size={18} className="text-[#D6B36A]" />
                    <span className="font-sans text-[9px] tracking-[0.14em] uppercase leading-tight text-[#F5F1E8]/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
