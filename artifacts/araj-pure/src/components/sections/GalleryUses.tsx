import React from 'react';
import { motion } from 'framer-motion';

import img1 from '@assets/Gemini_Generated_Image_2tzh1l2tzh1l2tzh_1784571585909.png';
import img2 from '@assets/Gemini_Generated_Image_882eb1882eb1882e_1784571609389.png';
import img3 from '@assets/Gemini_Generated_Image_nxf9ysnxf9ysnxf9_1784571617117.png';
import img4 from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

import vid3 from '@assets/araj_uses_video_1784571523028.mp4';
import vid4 from '@assets/araj_uses_video_2_1784571529986.mp4';
import vid5 from '@assets/Second_Cinematic_Advertisem_1784571632461.mp4';
import vid6 from '@assets/Second_Premium_Commercial_P_1784571639675.mp4';

export default function GalleryUses() {
  const gallery = [
    { src: img1, caption: "Rustic Purity" },
    { src: img2, caption: "Minimalist Elegance" },
    { src: img3, caption: "Sacred Traditions" },
    { src: img4, caption: "The Artisanal Jar" }
  ];

  const usesCards = [
    { title: "The Perfect Tadka", desc: "Elevate meals with aromatic tempering" },
    { title: "Morning Wellness Ritual", desc: "Ayurveda for digestion and glow" },
    { title: "Baking & Roasting", desc: "High smoke point, healthier cooking" },
    { title: "Ayurvedic Skincare", desc: "Natural moisturizer for skin and lips" }
  ];

  const videos = [vid3, vid4, vid5, vid6];

  return (
    <>
      {/* 5. GALLERY */}
      <section id="gallery" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">The Essence of Purity</h2>
            <div className="h-0.5 w-24 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-muted cursor-pointer"
              >
                <img 
                  src={img.src} 
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/80 transition-colors duration-300 rounded-xl z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-serif text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE GOLDEN TOUCH - Uses */}
      <section id="uses" className="py-24 bg-card border-t-4 border-primary relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">The Golden Touch</h2>
            <p className="text-muted-foreground font-display italic text-xl">Nourishing body, soul, and everyday life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {videos.map((vid, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-lg border border-border bg-muted aspect-video relative"
              >
                <video 
                  src={vid} 
                  controls 
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usesCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                className="bg-background p-8 rounded-xl shadow-sm border border-border/50 hover:border-primary/30 hover:shadow-md transition-all text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/50" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}