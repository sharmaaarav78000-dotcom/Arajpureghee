import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is A2 Cow Ghee?',
    a: 'A2 ghee is made from the milk of indigenous cow breeds that produce only A2 beta-casein protein, which is easier to digest and richer in nutrients compared to conventional ghee. It is widely celebrated in Ayurveda for its healing properties.',
  },
  {
    q: 'What is the Bilona method?',
    a: 'The Bilona method is a traditional hand-churning process where curd made from whole cow milk is churned using a wooden churner (Bilona). This slow, respectful process produces the most authentic and nutritionally rich ghee, preserving all vitamins and beneficial fats.',
  },
  {
    q: 'How long does Araj Pure Ghee last?',
    a: 'When stored in a cool, dry place away from direct sunlight, our ghee remains perfectly fresh for up to 12 months. Refrigeration is not required — ghee is naturally shelf-stable.',
  },
  {
    q: 'Do you ship pan-India?',
    a: 'Yes, we ship to all major cities and towns across India. Delivery typically takes 3–7 business days depending on your location.',
  },
  {
    q: 'Is there a minimum order quantity?',
    a: 'No minimum order is required. You can order as little as 1 jar. We also offer competitive pricing for bulk and wholesale orders — please contact us for details.',
  },
];

const PILLARS = [
  { glyph: '❦', label: 'Since 1985',        sub: 'Four decades of trust' },
  { glyph: '❦', label: 'Bilona Method',      sub: 'Traditional hand-churned' },
  { glyph: '❦', label: 'Free-grazing Cows', sub: 'A2 indigenous breeds' },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid rgba(200,164,94,0.15)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 transition-colors duration-200"
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ivory)'; }}
        style={{ color: 'var(--ivory)' }}
      >
        <span className="font-display font-semibold text-base tracking-[0.04em]">{q}</span>
        <span className="shrink-0 w-7 h-7 flex items-center justify-center" style={{ border: '1px solid rgba(200,164,94,0.35)', color: 'var(--gold)' }}>
          {open ? <Minus size={13} /> : <Plus size={13} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 font-sans text-sm leading-[1.85]" style={{ color: 'rgba(240,226,204,0.58)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LegacyFAQ() {
  return (
    <>
      {/* ── LEGACY ── */}
      <section id="roots" className="py-32 relative overflow-hidden" style={{ background: 'var(--ivory)' }}>
        {/* Subtle gold radial bg */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,164,94,0.06), transparent 70%)' }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="gold-line w-16" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold-dark)' }}>Our Roots</span>
              <div className="gold-line w-16" />
            </div>

            <h2 className="font-display font-bold mb-10" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--espresso)', letterSpacing: '0.04em' }}>
              Our Legacy Since 1985
            </h2>

            <p className="font-serif text-xl md:text-2xl leading-[1.8] italic mb-10" style={{ color: 'rgba(44,26,10,0.72)', fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}>
              "Since 1985, our family has believed that purity isn't manufactured — it is preserved. Every batch of Araj Pure reflects decades of experience, careful sourcing, and an unwavering respect for traditional methods."
            </p>
            <p className="font-sans text-sm leading-[1.9] mb-16 max-w-2xl mx-auto" style={{ color: 'rgba(44,26,10,0.52)' }}>
              Founded by M.D. Ankur Sharma, Araj Pure began with one conviction: the best ghee cannot be rushed. We have never changed our process, never compromised our cows, and never added a single preservative. That commitment, unchanged across generations, is what you taste in every spoonful.
            </p>

            {/* Gold ornamental divider */}
            <div className="flex items-center gap-4 mb-14">
              <div className="gold-line flex-1" />
              <span className="font-display text-xs tracking-widest" style={{ color: 'rgba(200,164,94,0.5)' }}>✦ ✦ ✦</span>
              <div className="gold-line flex-1" />
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex flex-col items-center gap-2 py-8 px-4"
                  style={{ border: '1px solid rgba(200,164,94,0.18)', background: 'rgba(200,164,94,0.03)' }}
                >
                  <span className="text-3xl mb-1" style={{ color: 'var(--gold)' }}>{p.glyph}</span>
                  <h4 className="font-display text-sm font-semibold tracking-[0.08em]" style={{ color: 'var(--espresso)' }}>{p.label}</h4>
                  <p className="font-sans text-xs" style={{ color: 'rgba(44,26,10,0.45)' }}>{p.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'var(--espresso)' }}>
        <div className="absolute top-0 inset-x-0 gold-line" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold)' }}>FAQ</span>
              <div className="gold-line w-12" />
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--ivory)', letterSpacing: '0.04em' }}>
              Your Questions, Answered
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
          >
            {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </motion.div>
        </div>
      </section>
    </>
  );
}
