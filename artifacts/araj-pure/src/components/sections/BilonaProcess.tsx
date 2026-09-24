import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Droplets, Sun } from 'lucide-react';

import img1 from '@assets/Gemini_Generated_Image_2tzh1l2tzh1l2tzh_1784571585909.png';
import img2 from '@assets/Gemini_Generated_Image_882eb1882eb1882e_1784571609389.png';
import img3 from '@assets/Gemini_Generated_Image_nxf9ysnxf9ysnxf9_1784571617117.png';
import img4 from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';

const STEPS = [
  {
    number: '01',
    title: 'Sacred Indigenous A2 Milk',
    tagline: 'Grass-Fed Indian Desi Cows',
    desc: 'Pure whole milk collected daily from indigenous cows grazing naturally on organic, pesticide-free pastures under the sun. Free from synthetic hormones and preservatives.',
    image: img1,
    icon: Sun,
    highlight: 'Naturally rich in A2 Beta-Casein Protein',
  },
  {
    number: '02',
    title: 'Clay Pot Curd Setting',
    tagline: 'Slow Vedic Fermentation',
    desc: 'The fresh milk is gently boiled over low heat and cultured overnight in traditional clay pots. This natural earthen fermentation cultivates billions of beneficial probiotics.',
    image: img3,
    icon: Droplets,
    highlight: 'Overnight earthen incubation for optimal gut bacteria',
  },
  {
    number: '03',
    title: 'Wooden Bilona Churning',
    tagline: 'Two-Way Bi-Directional Rhythm',
    desc: 'Whole curd is hand-churned in clockwise and anti-clockwise motions using a wooden churner (Bilona). This rhythmic friction separates the pure Makkhan (cultured butter) without mechanical heat damage.',
    image: img2,
    icon: Sparkles,
    highlight: 'Hand-crafted wooden churn preserves volatile aroma notes',
  },
  {
    number: '04',
    title: 'Slow Simmering & Grain Formation',
    tagline: 'Golden Danedar Clarification',
    desc: 'The cultured butter is clarified slowly over mild, steady heat. As moisture evaporates, the iconic golden granules crystallize, producing the authentic Danedar texture and divine nutty aroma.',
    image: img4,
    icon: Flame,
    highlight: 'Naturally high smoke point of 250°C (482°F)',
  },
];

export default function BilonaProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-[#080909]">
      {/* Ambient background champagne aura: Obsidian (#080909) -> Deep Charcoal (#121414) */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(214,179,106,0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="gold-line w-12" />
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D6B36A] font-semibold">
              Sacred Heritage
            </span>
            <div className="gold-line w-12" />
          </div>
          <h2
            className="font-display font-bold tracking-[0.04em] mb-4 text-[#F5F1E8]"
            style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.2rem)' }}
          >
            The 5,000-Year-Old Bilona Method
          </h2>
          <p className="font-serif italic text-lg max-w-2xl mx-auto text-[#F5F1E8]/70">
            Unlike industrial cream-churned ghee, true Bilona ghee is hand-made from cultured whole-milk curd.
          </p>
        </motion.div>

        {/* ── STEP SELECTOR PROGRESS TABS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 transition-all duration-300 relative overflow-hidden rounded-2xl group cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1F1F]/90 border-[#D6B36A] shadow-[0_14px_35px_rgba(0,0,0,0.6),_0_0_24px_rgba(214,179,106,0.22)]'
                    : 'bg-[#121414]/60 hover:bg-[#1C1F1F]/60 border-[#D6B36A]/18'
                }`}
                style={{
                  borderWidth: 1,
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Active Gold Progress Indicator Top Bar */}
                {isActive && (
                  <motion.div
                    layoutId="active-step-bar"
                    className="absolute top-0 left-0 right-0 h-[2.5px]"
                    style={{ background: 'linear-gradient(90deg, #8C7235, #D6B36A, #E8D39A)' }}
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-display font-bold text-xs tracking-wider"
                    style={{ color: isActive ? '#D6B36A' : 'rgba(245,241,232,0.45)' }}
                  >
                    STEP {step.number}
                  </span>
                  <Icon
                    size={16}
                    style={{ color: isActive ? '#E8D39A' : 'rgba(214,179,106,0.45)' }}
                  />
                </div>

                <div
                  className="font-display text-sm font-semibold tracking-wide transition-colors"
                  style={{ color: isActive ? '#F5F1E8' : 'rgba(245,241,232,0.7)' }}
                >
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── INTERACTIVE STEP DISPLAY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Cinematic Visual with Smooth Zoom & Glass Reticle */}
          <div className="lg:col-span-6 relative">
            <div
              className="relative overflow-hidden aspect-[4/3] rounded-[28px]"
              style={{
                border: '1px solid rgba(214,179,106,0.28)',
                boxShadow: '0 25px 65px rgba(0,0,0,0.9), 0 0 45px rgba(214,179,106,0.14)',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={STEPS[activeStep].image}
                  alt={STEPS[activeStep].title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(8,9,9,0.9) 0%, transparent 45%)',
                }}
              />

              {/* Number Badge Pill */}
              <div
                className="absolute top-4 left-4 px-4 py-1.5 font-display text-xs font-bold tracking-[0.2em] rounded-full text-[#D6B36A]"
                style={{
                  background: 'rgba(8,9,9,0.9)',
                  border: '1px solid rgba(214,179,106,0.38)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                PHASE {STEPS[activeStep].number}
              </div>
            </div>
          </div>

          {/* Right: Step Description & Highlights inside Glass Chassis */}
          <div className="lg:col-span-6 lg:pl-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <div
                    className="font-sans text-[11px] tracking-[0.25em] uppercase font-semibold mb-2 text-[#E8D39A]"
                  >
                    {STEPS[activeStep].tagline}
                  </div>
                  <h3
                    className="font-display font-bold text-2xl md:text-3xl tracking-[0.03em] text-[#F5F1E8]"
                  >
                    {STEPS[activeStep].title}
                  </h3>
                </div>

                <p className="font-sans text-sm md:text-base leading-[1.9] text-[#F5F1E8]/75">
                  {STEPS[activeStep].desc}
                </p>

                {/* Key Insight Pill */}
                <div
                  className="p-5 flex items-center gap-3.5 rounded-2xl"
                  style={{
                    background: 'rgba(28, 31, 31, 0.7)',
                    border: '1px solid rgba(214, 179, 106, 0.25)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <ShieldCheck size={20} className="shrink-0 text-[#D6B36A]" />
                  <span className="font-sans text-xs font-medium text-[#F5F1E8]/90">
                    {STEPS[activeStep].highlight}
                  </span>
                </div>

                {/* Next Step Nav Button */}
                <div className="pt-2 flex items-center gap-5">
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % STEPS.length)}
                    className="btn-capsule-glass inline-flex items-center gap-2.5 px-7 py-3.5 font-sans text-xs tracking-[0.2em] uppercase font-semibold cursor-pointer"
                  >
                    <span>Next Phase</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="font-sans text-xs text-[#F5F1E8]/50">
                    {activeStep + 1} of {STEPS.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
