import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import logo from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

const INFO = [
  { icon: MapPin,  label: 'Location', value: '11/48-E, Near Apsara Talkies,\nHathras Road, Naraich,\nAgra-282006 (U.P.)', link: null },
  { icon: Phone,   label: 'Phone',    value: '+91 89792 21409', link: 'tel:+918979221409' },
  { icon: Mail,    label: 'Email',    value: 'ankurkaushal0016@gmail.com', link: 'mailto:ankurkaushal0016@gmail.com' },
  { icon: Globe,   label: 'Website',  value: 'www.arajpure.com', link: 'https://www.arajpure.com' },
];

const FOOTER_LINKS = [
  { name: 'Home',       href: '#home'    },
  { name: 'Shop',       href: '#shop'    },
  { name: 'Our Process',href: '#story'   },
  { name: 'Our Legacy', href: '#roots'   },
  { name: 'Contact',    href: '#contact' },
];

export default function ContactFooter() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      {/* ── CONTACT: Obsidian Black (#080909) ── */}
      <section id="contact" className="py-28 relative overflow-hidden bg-[#080909]">
        <div
          className="absolute top-1/3 right-1/4 w-[650px] h-[650px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(214,179,106,0.08) 0%, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#D6B36A] font-semibold">Get in Touch</span>
              <div className="gold-line w-12" />
            </div>
            <h2
              className="font-display font-bold text-[#F5F1E8]"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', letterSpacing: '0.04em' }}
            >
              We'd Love to Hear From You
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <p className="font-serif text-lg leading-relaxed mb-10 text-[#F5F1E8]/80">
                Whether you have a question about our products, a bulk order inquiry, or simply want to learn more about our process — we'd love to hear from you.
              </p>

              <div className="space-y-6 mb-10">
                {INFO.map(({ icon: Icon, label, value, link }, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        border: '1px solid rgba(214,179,106,0.3)',
                        background: 'rgba(28,31,31,0.6)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <Icon size={18} className="text-[#D6B36A]" />
                    </div>
                    <div>
                      <div className="font-sans font-semibold text-xs tracking-[0.16em] uppercase mb-1 text-[#D6B36A]/80">{label}</div>
                      {link ? (
                        <a
                          href={link}
                          className="font-sans text-sm leading-relaxed transition-colors hover:text-[#E8D39A] text-[#F5F1E8]/85"
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm leading-relaxed text-[#F5F1E8]/85" style={{ whiteSpace: 'pre-line' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Buttons in Curved Glass Capsules */}
              <div className="flex flex-wrap gap-3.5">
                <a
                  href="https://instagram.com/arajdryfruitsandspices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-capsule-glass inline-flex items-center gap-2 px-6 py-3 font-sans text-xs tracking-[0.16em] uppercase font-semibold"
                >
                  <Instagram size={14} className="text-[#D6B36A]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://wa.me/918979221409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-capsule-glass inline-flex items-center gap-2 px-6 py-3 font-sans text-xs tracking-[0.16em] uppercase font-semibold"
                >
                  <MessageCircle size={14} className="text-[#D6B36A]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* Right: form inside luxury glass container */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="p-8 sm:p-10 rounded-[28px]"
              style={{
                background: 'rgba(18, 20, 20, 0.75)',
                backdropFilter: 'blur(26px) saturate(190%)',
                border: '1px solid rgba(214, 179, 106, 0.24)',
                boxShadow: '0 25px 65px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <h3 className="font-display font-bold text-xl tracking-[0.04em] mb-7 text-[#F5F1E8]">Send an Inquiry</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#D6B36A] text-[#D6B36A] bg-[#D6B36A]/10">✓</div>
                  <p className="font-display text-sm tracking-wider text-[#F5F1E8]">Thank you! We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: 'Full Name',      type: 'text',  key: 'name',    ph: 'Enter your full name' },
                    { label: 'Email Address',  type: 'email', key: 'email',   ph: 'Enter your email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block font-sans text-[10px] tracking-[0.18em] uppercase mb-2 text-[#D6B36A]/80">{f.label}</label>
                      <input
                        required type={f.type} placeholder={f.ph}
                        value={(form as Record<string,string>)[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 font-sans text-sm rounded-xl outline-none transition-all duration-200 text-[#F5F1E8]"
                        style={{
                          border: '1px solid rgba(214,179,106,0.25)',
                          background: 'rgba(28,31,31,0.6)',
                        }}
                        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#D6B36A'; }}
                        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(214,179,106,0.25)'; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.18em] uppercase mb-2 text-[#D6B36A]/80">Message</label>
                    <textarea
                      required rows={4} placeholder="Your message..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 font-sans text-sm rounded-xl outline-none resize-none transition-all duration-200 text-[#F5F1E8]"
                      style={{
                        border: '1px solid rgba(214,179,106,0.25)',
                        background: 'rgba(28,31,31,0.6)',
                      }}
                      onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#D6B36A'; }}
                      onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(214,179,106,0.25)'; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-capsule-gold w-full py-4 font-sans font-semibold text-[11px] tracking-[0.25em] uppercase cursor-pointer"
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER: Deep Charcoal (#121414) ── */}
      <footer className="pt-20 pb-12 relative overflow-hidden bg-[#121414] border-t border-[#D6B36A]/22">
        <div className="absolute top-0 inset-x-0 gold-line-full" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Logo center */}
          <div className="flex flex-col items-center mb-16">
            <img
              src={logo}
              alt="Araj Pure"
              className="h-20 w-20 rounded-full mb-4 object-cover"
              style={{ boxShadow: '0 0 0 1px rgba(214,179,106,0.45), 0 0 35px rgba(214,179,106,0.22)' }}
            />
            <div className="font-display font-bold text-xl tracking-[0.16em] text-[#D6B36A]">ARAJ PURE</div>
            <div className="font-sans text-[9px] tracking-[0.24em] uppercase mt-1 text-[#D6B36A]/70">A2 Cow Ghee · Est. 1985</div>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-[#D6B36A]/18">

            <div>
              <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5 text-[#D6B36A]">Brand Story</h4>
              <p className="font-sans text-xs leading-[1.9] text-[#F5F1E8]/65">
                Founded in 1985, Araj Dry Fruits & Spices brings you the finest, purest A2 Cow Ghee, honouring the sacred Bilona method to nourish your body and soul across generations.
              </p>
            </div>

            <div className="md:text-center">
              <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5 text-[#D6B36A]">Quick Links</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.map(l => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="font-sans text-xs tracking-wider uppercase transition-colors duration-200 text-[#F5F1E8]/65 hover:text-[#E8D39A]"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:text-right">
              <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5 text-[#D6B36A]">Connect</h4>
              <p className="font-sans text-xs leading-[1.9] mb-5 text-[#F5F1E8]/65">
                Follow us for Ayurvedic insights, recipes, and seasonal updates.
              </p>
              <div className="flex md:justify-end gap-3">
                <a
                  href="https://instagram.com/arajdryfruitsandspices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#D6B36A] hover:bg-[#D6B36A]/18"
                  style={{ border: '1px solid rgba(214,179,106,0.32)', color: '#D6B36A' }}
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://wa.me/918979221409"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#D6B36A] hover:bg-[#D6B36A]/18"
                  style={{ border: '1px solid rgba(214,179,106,0.32)', color: '#D6B36A' }}
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
            <p className="font-sans text-[10px] tracking-wider text-[#F5F1E8]/50">
              © 2026 Araj Pure. Crafted by Araj Dry Fruits & Spices. All rights reserved.
            </p>
            <p className="font-sans text-xs mt-1 text-[#F5F1E8]/60">
              Made by:- Aarav Sharma, Agra
            </p>
            <div className="flex items-center gap-4 font-sans text-[10px] tracking-wider text-[#F5F1E8]/50">
              <span>UPI Accepted</span>
              <span className="text-[#D6B36A]/45">·</span>
              <span>Cash on Delivery</span>
              <span className="text-[#D6B36A]/45">·</span>
              <span>Pan-India Shipping</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
