import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sun, ChefHat, Droplets } from 'lucide-react';

import img1 from '@assets/Gemini_Generated_Image_2tzh1l2tzh1l2tzh_1784571585909.png';
import img2 from '@assets/Gemini_Generated_Image_882eb1882eb1882e_1784571609389.png';
import img3 from '@assets/Gemini_Generated_Image_nxf9ysnxf9ysnxf9_1784571617117.png';
import img4 from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

import vid1 from '@assets/ARAJ_Pure_A_Cow_Ghee_–_From_1784571516339.mp4';
import vid2 from '@assets/araj_uses_video_2_1784571529986.mp4';
import vid3 from '@assets/Second_Cinematic_Advertisem_1784571632461.mp4';
import vid4 from '@assets/Second_Premium_Commercial_P_1784571639675.mp4';

const gallery = [
  { src: img1, caption: 'Rustic Purity',       num: '01' },
  { src: img2, caption: 'Minimalist Elegance',  num: '02' },
  { src: img3, caption: 'Sacred Traditions',    num: '03' },
  { src: img4, caption: 'The Artisanal Jar',    num: '04' },
];

const usesCards = [
  { icon: Flame,    title: 'The Perfect Tadka',       desc: 'Elevate every meal with rich, aromatic tempering that transforms simple ingredients into something extraordinary.' },
  { icon: Sun,      title: 'Morning Wellness Ritual',  desc: 'Embrace the Ayurvedic practice of consuming ghee in the morning for improved digestion, energy, and natural glow.' },
  { icon: ChefHat,  title: 'Baking & Roasting',        desc: 'A high smoke point makes Araj Pure perfect for all high-heat cooking methods — healthier and more flavourful.' },
  { icon: Droplets, title: 'Ayurvedic Skincare',       desc: 'A centuries-old beauty secret — pure ghee deeply moisturizes skin and lips, leaving them soft and nourished.' },
];

const videos = [vid1, vid2, vid3, vid4];

const videoLabels = ['Cooking Showcase', 'Daily Ritual', 'Cinematic Feature', 'Premium Commercial'];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function GalleryUses() {
  return (
    <>
      {/* ── GALLERY ── */}
      <section id="gallery" className="py-28 relative overflow-hidden bg-[#080909]">
        {/* Subtle champagne radial aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(214,179,106,0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <motion.div {...fade(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D6B36A] font-semibold">Visual Story</span>
              <div className="gold-line w-12" />
            </div>
            <h2
              className="font-display font-bold text-[#F5F1E8]"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', letterSpacing: '0.04em' }}
            >
              The Essence of Purity
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {gallery.map((img, i) => (
              <motion.div
                key={i} {...fade(i * 0.1)}
                className="group relative overflow-hidden cursor-pointer rounded-[28px] border border-[#D6B36A]/22 transition-all duration-500 hover:-translate-y-2 hover:border-[#D6B36A]/55 hover:shadow-[0_22px_55px_rgba(0,0,0,0.85),_0_0_35px_rgba(214,179,106,0.22)]"
                style={{ aspectRatio: '4/5', background: '#121414' }}
              >
                <img
                  src={img.src} alt={img.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                {/* Number tag pill */}
                <div
                  className="absolute top-4 left-4 z-10 font-display text-[10px] tracking-[0.2em] px-3 py-1 rounded-full text-[#D6B36A] bg-[#080909]/85 border border-[#D6B36A]/35 backdrop-blur-md"
                >
                  {img.num}
                </div>
                {/* Hover reveal */}
                <div
                  className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(8,9,9,0.92) 0%, rgba(8,9,9,0.3) 60%, transparent 100%)' }}
                >
                  <p className="font-display text-base tracking-[0.06em] translate-y-3 group-hover:translate-y-0 transition-transform duration-400 text-[#E8D39A]">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USES: Deep Charcoal (#121414) ── */}
      <section id="uses" className="py-28 relative overflow-hidden bg-[#121414]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[300px] blur-[150px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(214,179,106,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fade(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D6B36A] font-semibold">The Golden Touch</span>
              <div className="gold-line w-12" />
            </div>
            <h2
              className="font-display font-bold mb-3 text-[#F5F1E8]"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', letterSpacing: '0.04em' }}
            >
              Nourishing Every Moment
            </h2>
            <p className="font-serif italic text-lg text-[#F5F1E8]/65">
              Nourishing body, soul, and everyday life
            </p>
          </motion.div>

          {/* 2×2 video grid in glass frames */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {videos.map((vid, i) => (
              <motion.div
                key={i} {...fade(i * 0.1)}
                className="relative overflow-hidden group rounded-[24px]"
                style={{
                  paddingBottom: '56.25%',
                  border: '1px solid rgba(214,179,106,0.25)',
                  boxShadow: '0 18px 45px rgba(0,0,0,0.65)',
                }}
              >
                <video src={vid} controls playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                {/* Label overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 py-3.5 px-5 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(8,9,9,0.9), transparent)' }}
                >
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D6B36A]/90">
                    {videoLabels[i]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Use cards inside luxury glass panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {usesCards.map((card, i) => (
              <motion.div
                key={i} {...fade(0.2 + i * 0.1)}
                className="glass-card p-8 relative overflow-hidden group rounded-[28px]"
                style={{
                  background: 'rgba(28, 31, 31, 0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(214,179,106,0.22)',
                }}
              >
                <div
                  className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#080909]/70 border border-[#D6B36A]/40 text-[#D6B36A] shadow-[0_0_18px_rgba(214,179,106,0.2)] group-hover:scale-105 transition-transform"
                >
                  <card.icon size={20} />
                </div>
                <h3
                  className="font-display text-sm font-semibold mb-3 tracking-[0.06em] text-[#E8D39A]"
                >
                  {card.title}
                </h3>
                <p className="font-sans text-[0.82rem] leading-[1.8] text-[#F5F1E8]/70">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
