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
      {/* ── CONTACT ── */}
      <section id="contact" className="py-28" style={{ background: 'var(--ivory)' }}>
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="gold-line w-12" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--gold-dark)' }}>Get in Touch</span>
              <div className="gold-line w-12" />
            </div>
            <h2 className="font-display font-bold" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: 'var(--espresso)', letterSpacing: '0.04em' }}>
              We'd Love to Hear From You
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <p className="font-serif text-lg leading-relaxed mb-10" style={{ color: 'rgba(44,26,10,0.65)' }}>
                Whether you have a question about our products, a bulk order inquiry, or simply want to learn more about our process — we'd love to hear from you.
              </p>

              <div className="space-y-7 mb-10">
                {INFO.map(({ icon: Icon, label, value, link }, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-11 h-11 flex items-center justify-center shrink-0" style={{ border: '1px solid rgba(200,164,94,0.3)', background: 'rgba(200,164,94,0.05)' }}>
                      <Icon size={18} style={{ color: 'var(--gold-dark)' }} />
                    </div>
                    <div>
                      <div className="font-sans font-semibold text-xs tracking-[0.15em] uppercase mb-1" style={{ color: 'rgba(44,26,10,0.4)' }}>{label}</div>
                      {link ? (
                        <a href={link} className="font-sans text-sm leading-relaxed transition-colors hover:text-[var(--gold-dark)]" style={{ color: 'rgba(44,26,10,0.75)', whiteSpace: 'pre-line' }}>{value}</a>
                      ) : (
                        <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(44,26,10,0.75)', whiteSpace: 'pre-line' }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <a href="https://instagram.com/arajdryfruitsandspices" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 font-sans text-xs tracking-[0.14em] uppercase transition-all duration-200 hover:scale-[1.04]"
                  style={{ border: '1px solid rgba(200,164,94,0.25)', color: 'rgba(44,26,10,0.65)', background: 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold-dark)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,164,94,0.25)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(44,26,10,0.65)'; }}
                >
                  <Instagram size={14} /> Instagram
                </a>
                <a href="https://wa.me/918979221409" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 font-sans text-xs tracking-[0.14em] uppercase transition-all duration-200 hover:scale-[1.04]"
                  style={{ border: '1px solid rgba(200,164,94,0.25)', color: 'rgba(44,26,10,0.65)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold-dark)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(200,164,94,0.25)'; (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(44,26,10,0.65)'; }}
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="p-8 md:p-10"
              style={{ background: '#fff', border: '1px solid rgba(200,164,94,0.2)' }}
            >
              <h3 className="font-display font-bold text-xl tracking-[0.04em] mb-7" style={{ color: 'var(--espresso)' }}>Send an Inquiry</h3>

              {sent ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}>✓</div>
                  <p className="font-display text-sm tracking-wider" style={{ color: 'var(--espresso)' }}>Thank you! We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: 'Full Name',      type: 'text',  key: 'name',    ph: 'Enter your full name' },
                    { label: 'Email Address',  type: 'email', key: 'email',   ph: 'Enter your email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block font-sans text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: 'rgba(44,26,10,0.45)' }}>{f.label}</label>
                      <input
                        required type={f.type} placeholder={f.ph}
                        value={(form as Record<string,string>)[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 font-sans text-sm outline-none transition-all duration-200"
                        style={{ border: '1px solid rgba(200,164,94,0.25)', background: 'var(--ivory)', color: 'var(--espresso)' }}
                        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--gold)'; }}
                        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(200,164,94,0.25)'; }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.18em] uppercase mb-2" style={{ color: 'rgba(44,26,10,0.45)' }}>Message</label>
                    <textarea
                      required rows={4} placeholder="Your message..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 font-sans text-sm outline-none resize-none transition-all duration-200"
                      style={{ border: '1px solid rgba(200,164,94,0.25)', background: 'var(--ivory)', color: 'var(--espresso)' }}
                      onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--gold)'; }}
                      onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(200,164,94,0.25)'; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shimmer w-full py-4 font-sans font-semibold text-[11px] tracking-[0.25em] uppercase transition-transform duration-200 hover:scale-[1.02]"
                    style={{ background: 'var(--espresso)', color: 'var(--gold-pale)', boxShadow: '0 4px 18px rgba(0,0,0,0.2)' }}
                  >
                    Send Inquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pt-20 pb-10 relative overflow-hidden" style={{ background: 'var(--espresso-mid)', borderTop: '1px solid rgba(200,164,94,0.2)' }}>
        <div className="absolute top-0 inset-x-0 gold-line-full" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Logo center */}
          <div className="flex flex-col items-center mb-16">
            <img src={logo} alt="Araj Pure" className="h-20 w-20 rounded-full mb-4" style={{ boxShadow: '0 0 0 1px rgba(200,164,94,0.3), 0 0 30px rgba(200,164,94,0.1)' }} />
            <div className="font-display font-bold text-xl tracking-[0.12em]" style={{ color: 'var(--gold)' }}>ARAJ PURE</div>
            <div className="font-sans text-[9px] tracking-[0.22em] uppercase mt-1" style={{ color: 'rgba(200,164,94,0.45)' }}>A2 Cow Ghee · Est. 1985</div>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16" style={{ borderBottom: '1px solid rgba(200,164,94,0.1)' }}>

            <div>
              <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold)' }}>Brand Story</h4>
              <p className="font-sans text-xs leading-[1.9]" style={{ color: 'rgba(240,226,204,0.45)' }}>
                Founded in 1985, Araj Dry Fruits & Spices brings you the finest, purest A2 Cow Ghee, honouring the sacred Bilona method to nourish your body and soul across generations.
              </p>
            </div>

            <div className="md:text-center">
              <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold)' }}>Quick Links</h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.map(l => (
                  <li key={l.name}>
                    <a href={l.href} className="font-sans text-xs tracking-wider uppercase transition-colors duration-200" style={{ color: 'rgba(240,226,204,0.42)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(240,226,204,0.42)'; }}
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:text-right">
              <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--gold)' }}>Connect</h4>
              <p className="font-sans text-xs leading-[1.9] mb-5" style={{ color: 'rgba(240,226,204,0.42)' }}>
                Follow us for Ayurvedic insights, recipes, and seasonal updates.
              </p>
              <div className="flex md:justify-end gap-3">
                <a href="https://instagram.com/arajdryfruitsandspices" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: '1px solid rgba(200,164,94,0.25)', color: 'var(--gold)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,164,94,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                >
                  <Instagram size={15} />
                </a>
                <a href="https://wa.me/918979221409" target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: '1px solid rgba(200,164,94,0.25)', color: 'var(--gold)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(200,164,94,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                >
                  <MessageCircle size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-8">
            <p className="font-sans text-[10px] tracking-wider" style={{ color: 'rgba(240,226,204,0.3)' }}>
              © 2026 Araj Pure. Crafted by Araj Dry Fruits & Spices. All rights reserved.
            </p>
            <p className="font-sans text-xs mt-1" style={{ color: 'rgba(240,226,204,0.35)' }}>
              Made by:- Aarav Sharma, Agra
            </p>
            <div className="flex items-center gap-4 font-sans text-[10px] tracking-wider" style={{ color: 'rgba(240,226,204,0.3)' }}>
              <span>UPI Accepted</span>
              <span style={{ color: 'rgba(200,164,94,0.25)' }}>·</span>
              <span>Cash on Delivery</span>
              <span style={{ color: 'rgba(200,164,94,0.25)' }}>·</span>
              <span>Pan-India Shipping</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
