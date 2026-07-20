import React from 'react';
import { motion } from 'framer-motion';
import video1 from '@assets/Araj_pure_ghee_video_1784571510752.mp4';

export default function VideoShowcase() {
  return (
    <section id="process" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4 text-primary">The Bilona Journey</h2>
          <p className="text-muted font-display italic text-xl md:text-2xl mb-12 opacity-80">
            Watch how we meticulously hand-churn every batch
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-primary/20 relative pb-[56.25%] bg-black/50"
        >
          <video 
            src={video1}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
        </motion.div>
      </div>
    </section>
  );
}