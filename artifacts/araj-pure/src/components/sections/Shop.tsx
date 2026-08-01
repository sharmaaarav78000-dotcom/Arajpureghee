import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Leaf, CreditCard, MapPin, Check } from 'lucide-react';

import img1 from '@assets/Gemini_Generated_Image_2tzh1l2tzh1l2tzh_1784571585909.png';
import img2 from '@assets/Gemini_Generated_Image_882eb1882eb1882e_1784571609389.png';
import img3 from '@assets/Gemini_Generated_Image_nxf9ysnxf9ysnxf9_1784571617117.png';
import img4 from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

const IMAGES = [img4, img1, img2, img3];
const FEATURES = [
  '100% Pure & Authentically Sourced',
  'Traditional Bilona Churning Method',
  'Rich in Omega-3 Fatty Acids & Antioxidants',
  'From Free-Grazing Indigenous A2 Cows',
];
const TRUST = [
  { icon: Leaf,        label: '100% Natural'    },
  { icon: ShieldCheck, label: 'FSSAI Certified' },
  { icon: CreditCard,  label: 'Secure Payment'  },
  { icon: MapPin,      label: 'Made in India'   },
];

export default function Shop() {
  const [activeImg, setActiveImg] = useState(0);
  const { quantity, setQuantity, setIsCartOpen } = useCart();

  const handleAdd = () => {
    setQuantity(quantity === 0 ? 1 : quantity + 1);
    setIsCartOpen(true);
  };

  return (
    <section id="shop" className="py-28" style={{ background: 'var(--ivory)' }}>
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="gold-line w-12" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold-dark)' }}>Artisanal Selection</span>
            <div className="gold-line w-12" />
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--espresso)', letterSpacing: '0.04em' }}>
            Order Your Jar
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-14 items-start">

          {/* Left: Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}
            className="w-full lg:w-1/2"
          >
            {/* Main image */}
            <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/5', border: '1px solid rgba(200,164,94,0.25)' }}>
              <motion.img
                key={activeImg}
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55 }}
                src={IMAGES[activeImg]} alt="Araj Pure A2 Cow Ghee"
                className="w-full h-full object-cover"
              />
              {/* Raksha Bandhan offer badge on image */}
              <div className="absolute top-4 right-4 flex flex-col items-center text-center px-3 py-2.5 rounded-sm"
                style={{ background: 'linear-gradient(135deg, #b5171e, #e8401a)', boxShadow: '0 4px 20px rgba(180,23,30,0.45)', minWidth: 72 }}>
                <span style={{ color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9 }}>Raksha</span>
                <span style={{ color: '#ffe066', fontFamily: "'Playfair Display', serif", fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.1 }}>₹250</span>
                <span style={{ color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.9 }}>Bandhan</span>
                <span style={{ color: '#ffe066', fontFamily: "'Inter', sans-serif", fontSize: '0.58rem', fontWeight: 600, marginTop: 2 }}>OFF</span>
              </div>
              {/* Premium label */}
              <div className="absolute top-4 left-4 font-display text-[10px] tracking-[0.18em] px-3 py-1.5" style={{ background: 'var(--espresso)', color: 'var(--gold)' }}>
                PREMIUM
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {IMAGES.map((img, i) => (
                <button
                  key={i} onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden transition-all duration-300"
                  style={{
                    aspectRatio: '1',
                    border: activeImg === i ? '1.5px solid var(--gold)' : '1.5px solid rgba(200,164,94,0.18)',
                    opacity: activeImg === i ? 1 : 0.65,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.6rem,2.8vw,2.4rem)', color: 'var(--espresso)', letterSpacing: '0.03em' }}>
              Araj Pure A2<br />Cow Ghee
            </h2>

            <p className="font-serif text-lg leading-relaxed mb-8" style={{ color: 'rgba(44,26,10,0.7)' }}>
              Crafted with deep reverence for Ayurvedic principles, sourced from free-grazing cows, hand-churned using the authentic wooden Bilona method.
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(200,164,94,0.15)', border: '1px solid rgba(200,164,94,0.4)' }}>
                    <Check size={11} style={{ color: 'var(--gold-dark)' }} />
                  </div>
                  <span className="font-sans text-sm leading-snug" style={{ color: 'rgba(44,26,10,0.8)' }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* Price */}
            <div className="flex items-end gap-3 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(200,164,94,0.2)' }}>
              <span className="font-display font-bold text-4xl gold-text">₹2,700</span>
              <span className="font-sans text-sm mb-1.5" style={{ color: 'rgba(44,26,10,0.4)' }}>/ 1 kg</span>
              <div className="mb-1.5 ml-2 flex gap-2 flex-wrap">
                <span className="px-2.5 py-1 font-sans text-[10px] font-semibold tracking-wider uppercase"
                  style={{ background: 'var(--espresso)', color: 'var(--gold)', border: '1px solid rgba(200,164,94,0.3)' }}>
                  Bestseller
                </span>
                <span className="px-2.5 py-1 font-sans text-[10px] font-semibold tracking-wider uppercase"
                  style={{ background: 'rgba(255,100,100,0.1)', color: '#b34a00', border: '1px solid rgba(255,140,0,0.3)' }}>
                  🎁 250g Jar Free
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className="btn-shimmer w-full py-4 font-sans font-semibold text-[11px] tracking-[0.25em] uppercase mb-6 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(130deg, var(--espresso-mid) 0%, var(--espresso-soft) 100%)',
                color: 'var(--gold-pale)',
                border: '1px solid rgba(200,164,94,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }}
            >
              Add to Cart
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-4 gap-3">
              {TRUST.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center py-4" style={{ border: '1px solid rgba(200,164,94,0.13)', background: 'rgba(200,164,94,0.03)' }}>
                  <Icon size={18} style={{ color: 'var(--gold)' }} />
                  <span className="font-sans text-[9px] tracking-[0.14em] uppercase leading-tight" style={{ color: 'rgba(44,26,10,0.55)' }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
