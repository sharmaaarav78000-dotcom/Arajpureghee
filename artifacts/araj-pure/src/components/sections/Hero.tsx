import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

export default function Hero() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-[100dvh] pt-20 flex flex-col md:flex-row items-center bg-gradient-to-br from-[#FFF8F0] to-[#f4eadb]">
      <div className="w-full md:w-1/2 px-6 md:px-16 py-12 md:py-20 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary text-primary text-sm font-medium tracking-wide mb-6 bg-primary/5">
            Pure A2 Cow Ghee — Since 1985
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground leading-[1.1] mb-6">
            An Ancient Legacy of Purity, <span className="italic font-display block mt-2 text-primary">Exquisitely Crafted</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg leading-relaxed">
            Indulge in the rich, authentic essence of artisanal A2 Cow Ghee. Meticulously hand-churned using the time-honored Bilona method to bring unparalleled flavor, luxury, and holistic wellness to your table.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleScroll('shop')} 
              className="px-8 py-3.5 bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-sm font-medium tracking-wide shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Discover Our Ghee
            </button>
            <button 
              onClick={() => handleScroll('story')} 
              className="px-8 py-3.5 bg-transparent border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors rounded-sm font-medium tracking-wide"
            >
              Our Story
            </button>
          </div>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={heroImg} 
          alt="Araj Pure Ghee Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Subtle breathing animation overlay */}
        <motion.div 
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary mix-blend-overlay pointer-events-none"
        />
      </div>
    </section>
  );
}