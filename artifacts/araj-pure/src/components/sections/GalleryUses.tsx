import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sun, ChefHat, Droplets } from 'lucide-react';

import img1 from '@assets/Gemini_Generated_Image_2tzh1l2tzh1l2tzh_1784571585909.png';
import img2 from '@assets/Gemini_Generated_Image_882eb1882eb1882e_1784571609389.png';
import img3 from '@assets/Gemini_Generated_Image_nxf9ysnxf9ysnxf9_1784571617117.png';
import img4 from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

import vid3 from '@assets/araj_uses_video_1784571523028.mp4';
import vid4 from '@assets/araj_uses_video_2_1784571529986.mp4';
import vid5 from '@assets/Second_Cinematic_Advertisem_1784571632461.mp4';
import vid6 from '@assets/Second_Premium_Commercial_P_1784571639675.mp4';

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

const videos = [vid3, vid4, vid5, vid6];

const videoLabels = ['Cooking Showcase', 'Daily Ritual', 'Cinematic Feature', 'Premium Ad'];

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
      <section id="gallery" className="py-28" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-7xl mx-auto px-6">

          <motion.div {...fade(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold)' }}>Visual Story</span>
              <div className="gold-line w-12" />
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--espresso)', letterSpacing: '0.04em' }}>
              The Essence of Purity
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {gallery.map((img, i) => (
              <motion.div
                key={i} {...fade(i * 0.1)}
                className="group relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: '4/5', background: 'var(--ivory-deep)' }}
              >
                <img
                  src={img.src} alt={img.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Number tag */}
                <div
                  className="absolute top-4 left-4 z-10 font-display text-[10px] tracking-[0.2em] px-2 py-1"
                  style={{ background: 'rgba(15,8,4,0.65)', color: 'var(--gold)', backdropFilter: 'blur(4px)' }}
                >
                  {img.num}
                </div>
                {/* Hover reveal */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(to top, rgba(15,8,4,0.85) 0%, rgba(15,8,4,0.2) 60%, transparent 100%)' }}>
                  <p className="font-display text-base tracking-[0.06em] translate-y-4 group-hover:translate-y-0 transition-transform duration-400" style={{ color: 'var(--gold-pale)' }}>{img.caption}</p>
                </div>
                {/* Gold border flash */}
                <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-[rgba(200,164,94,0.6)] transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USES ── */}
      <section id="uses" className="py-28 relative overflow-hidden" style={{ background: 'var(--espresso)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] blur-[120px] rounded-full pointer-events-none" style={{ background: 'rgba(200,164,94,0.05)' }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div {...fade(0)} className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold)' }}>The Golden Touch</span>
              <div className="gold-line w-12" />
            </div>
            <h2 className="font-display font-bold mb-3" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--ivory)', letterSpacing: '0.04em' }}>
              Nourishing Every Moment
            </h2>
            <p className="font-serif italic text-lg" style={{ color: 'rgba(240,226,204,0.5)' }}>
              Nourishing body, soul, and everyday life
            </p>
          </motion.div>

          {/* 2×2 video grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {videos.map((vid, i) => (
              <motion.div
                key={i} {...fade(i * 0.1)}
                className="relative overflow-hidden group"
                style={{ paddingBottom: '56.25%', border: '1px solid rgba(200,164,94,0.14)' }}
              >
                <video src={vid} controls playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
                {/* Label overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 py-3 px-4 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(15,8,4,0.8), transparent)' }}
                >
                  <span className="font-sans text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(200,164,94,0.7)' }}>
                    {videoLabels[i]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Use cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {usesCards.map((card, i) => (
              <motion.div
                key={i} {...fade(0.2 + i * 0.1)}
                className="gold-card p-8 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(200,164,94,0.14)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div className="mb-6 inline-flex items-center justify-center w-11 h-11" style={{ border: '1px solid rgba(200,164,94,0.3)' }}>
                  <card.icon size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <h3 className="font-display text-sm font-semibold mb-3 tracking-[0.06em]" style={{ color: 'var(--gold-pale)', letterSpacing: '0.06em' }}>
                  {card.title}
                </h3>
                <p className="font-sans text-[0.8rem] leading-[1.75]" style={{ color: 'rgba(240,226,204,0.5)' }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
