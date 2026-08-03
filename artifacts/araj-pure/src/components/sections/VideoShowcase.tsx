import React from 'react';
import { motion } from 'framer-motion';
import video1 from '@assets/Araj_pure_ghee_video_1784571510752.mp4';
import video2 from '@assets/ARAJ_Pure_A_Cow_Ghee_–_From_1784571516339.mp4';

const corners = [
  { pos: 'top-3 left-3',    style: { borderTop: '2px solid rgba(200,164,94,0.7)', borderLeft: '2px solid rgba(200,164,94,0.7)' } },
  { pos: 'top-3 right-3',   style: { borderTop: '2px solid rgba(200,164,94,0.7)', borderRight: '2px solid rgba(200,164,94,0.7)' } },
  { pos: 'bottom-3 left-3', style: { borderBottom: '2px solid rgba(200,164,94,0.7)', borderLeft: '2px solid rgba(200,164,94,0.7)' } },
  { pos: 'bottom-3 right-3',style: { borderBottom: '2px solid rgba(200,164,94,0.7)', borderRight: '2px solid rgba(200,164,94,0.7)' } },
];

export default function VideoShowcase() {
  return (
    <section id="story" className="relative py-28 overflow-hidden" style={{ background: 'var(--espresso)' }}>
      {/* Ambient gold haze */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(200,164,94,0.06)' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="gold-line w-14" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>The Craft</span>
            <div className="gold-line w-14" />
          </div>
          <h2 className="font-display font-bold mb-4" style={{ fontSize: 'clamp(1.9rem,4vw,3.2rem)', color: 'var(--ivory)', letterSpacing: '0.04em' }}>
            The Bilona Journey
          </h2>
          <p className="font-serif italic text-lg" style={{ color: 'rgba(240,226,204,0.55)' }}>
            Watch how we meticulously hand-churn every batch
          </p>
        </motion.div>

        {/* Main cinematic video */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mb-6 overflow-hidden"
          style={{
            paddingBottom: '56.25%',
            border: '1px solid rgba(200,164,94,0.22)',
            boxShadow: '0 0 80px rgba(200,164,94,0.1), 0 40px 80px rgba(0,0,0,0.55)',
          }}
        >
          <video src={video1} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
          {/* Cinematic top/bottom bars */}
          <div className="absolute top-0 inset-x-0 h-7 pointer-events-none" style={{ background: 'rgba(0,0,0,0.55)' }} />
          <div className="absolute bottom-0 inset-x-0 h-7 pointer-events-none" style={{ background: 'rgba(0,0,0,0.55)' }} />
          {/* Corner marks */}
          {corners.map((c, i) => (
            <div key={i} className={`absolute ${c.pos} w-7 h-7 z-10 pointer-events-none`} style={c.style} />
          ))}
        </motion.div>

        {/* Secondary video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="relative overflow-hidden"
          style={{ paddingBottom: '56.25%', border: '1px solid rgba(200,164,94,0.12)' }}
        >
          <video src={video2} controls playsInline className="absolute inset-0 w-full h-full object-cover" />
        </motion.div>

        {/* Ornamental separator */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="gold-line flex-1" />
          <span className="font-display text-xs tracking-widest" style={{ color: 'rgba(200,164,94,0.4)' }}>✦ ✦ ✦</span>
          <div className="gold-line flex-1" />
        </div>
      </div>
    </section>
  );
}
