import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShieldCheck, Leaf, CreditCard, MapPin } from 'lucide-react';
import productImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

export default function Shop() {
  const { quantity, setQuantity, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    setQuantity(quantity === 0 ? 1 : quantity + 1);
    setIsCartOpen(true);
  };

  return (
    <section id="shop" className="py-24 bg-gradient-to-b from-[#FFF8F0] to-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={productImg} 
                alt="Araj Pure A2 Cow Ghee" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-foreground text-primary font-bold text-sm px-4 py-1.5 rounded-full shadow-lg border border-primary/20">
                Premium
              </div>
            </div>
          </motion.div>

          {/* Right: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex flex-col"
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm mb-2">Artisanal Selection</span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold mb-6">Araj Pure A2 Cow Ghee</h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Crafted with deep respect for Ayurvedic principles, sourced from free-grazing cows, hand-churned using the authentic wooden Bilona method.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "100% Pure & Authentically Sourced",
                "Traditional Bilona Churning Method",
                "Rich in Omega-3 Fatty Acids & Antioxidants"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✦</span>
                  <span className="text-foreground font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-semibold text-foreground">₹2,700.00</span>
              <span className="bg-primary/10 text-primary border border-primary/20 text-sm font-bold px-3 py-1 rounded-full mb-1">
                Flat ₹300 OFF! (Use SAVE300)
              </span>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full bg-foreground text-background py-4 rounded-sm font-semibold tracking-wide hover:bg-primary transition-colors text-lg shadow-lg hover:shadow-xl"
            >
              Add to Cart
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-border">
              {[
                { icon: Leaf, label: "100% Natural" },
                { icon: ShieldCheck, label: "FSSAI Certified" },
                { icon: CreditCard, label: "Secure Payment" },
                { icon: MapPin, label: "Made in India" }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 text-muted-foreground">
                  <badge.icon size={20} className="text-primary" />
                  <span className="text-xs font-medium uppercase tracking-wider">{badge.label}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}