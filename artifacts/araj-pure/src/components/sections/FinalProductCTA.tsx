import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import productImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';
import GoldParticles from '@/components/effects/GoldParticles';

export default function FinalProductCTA() {
  const { quantity, setQuantity, setIsCartOpen } = useCart();

  const handleOrder = () => {
    if (quantity === 0) setQuantity(1);
    setIsCartOpen(true);
  };

  const scrollToShop = () => {
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-32 overflow-hidden bg-[#080909]">
      {/* Top and Bottom Decorative Lines */}
      <div className="absolute top-0 inset-x-0 gold-line-full" />
      <div className="absolute bottom-0 inset-x-0 gold-line-full" />

      {/* Dramatic Luxury Champagne Spotlight behind Product: Obsidian (#080909) -> Deep Charcoal (#121414) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[190px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232, 211, 154, 0.18) 0%, rgba(214, 179, 106, 0.1) 40%, transparent 70%)',
        }}
      />

      {/* Floating Canvas Golden Particles */}
      <GoldParticles className="opacity-80" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
          
          {/* Left: Real Hero Jar on Pedestal with Reflection */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
          >
            {/* Subtle Aura Halo */}
            <div
              className="absolute w-[380px] h-[380px] rounded-full animate-aura-pulse pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(214, 179, 106, 0.26) 0%, transparent 65%)',
              }}
            />

            {/* Jar with physical levitation animation */}
            <div className="relative w-[280px] sm:w-[340px] aspect-[4/5] flex items-center justify-center animate-jar-float">
              <img
                src={productImg}
                alt="Araj Pure A2 Cow Ghee"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              />

              {/* Specular sheen pass */}
              <div
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
                style={{ mixBlendMode: 'screen' }}
              >
                <div
                  className="w-[140%] h-full animate-glass-sheen"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                  }}
                />
              </div>
            </div>

            {/* Reflection and Pedestal Shadow */}
            <div className="w-[260px] h-10 -mt-3 flex items-center justify-center pointer-events-none">
              <div
                className="w-full h-7 rounded-[100%] animate-shadow-breath"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.98) 0%, rgba(214,179,106,0.2) 50%, transparent 80%)',
                  filter: 'blur(10px)',
                }}
              />
            </div>
          </motion.div>

          {/* Right: Compelling Typography & Premium Curved CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="w-full lg:w-1/2 text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="gold-line w-10" />
              <span className="font-sans text-[10.5px] tracking-[0.3em] uppercase font-semibold text-[#D6B36A]">
                The Grand Reserve
              </span>
            </div>

            <h2
              className="font-display font-bold tracking-[0.03em] mb-4 text-[#F5F1E8]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            >
              Taste the True Essence of Purity
            </h2>

            <p className="font-serif italic text-xl mb-6 text-[#E8D39A]">
              "Nourishing generations with untouched Ayurvedic perfection."
            </p>

            <p className="font-sans text-sm md:text-base leading-[1.9] mb-8 text-[#F5F1E8]/75">
              Hand-churned in small limited batches from free-grazing indigenous cows. Delivered directly from our family hearth in Agra to your kitchen table across India.
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-4 mb-8 pb-6 border-b border-[#D6B36A]/22">
              <span className="font-display font-bold text-4xl gold-text">₹2,299</span>
              <span className="font-sans text-sm text-[#F5F1E8]/50">/ 1 kg artisanal glass jar</span>
            </div>

            {/* Curved Premium Capsule Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleOrder}
                className="btn-capsule-gold inline-flex items-center gap-3 px-10 py-4 font-sans font-semibold text-xs tracking-[0.25em] uppercase cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>Buy Now · ₹2,299</span>
              </button>

              <button
                onClick={scrollToShop}
                className="btn-capsule-glass inline-flex items-center gap-2 px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer"
              >
                <span>View Product</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
