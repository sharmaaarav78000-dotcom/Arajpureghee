import React, { useState } from 'react';
import { Instagram, MapPin, Phone, Mail, Globe } from 'lucide-react';
import logo from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

export default function ContactFooter() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. We will get back to you shortly.");
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* 12. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Info */}
            <div>
              <h2 className="text-4xl font-serif text-foreground mb-8">Get in Touch</h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Whether you have a question about our products, a bulk order inquiry, or simply want to learn more about our process — we'd love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-full text-primary shrink-0"><MapPin size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground mt-1 leading-relaxed">11/48-E, Near Apsara Talkies,<br/>Hathras Road, Naraich,<br/>Agra-282006 (U.P.)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-full text-primary shrink-0"><Phone size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <p className="text-muted-foreground mt-1">+91 89792 21409</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-full text-primary shrink-0"><Mail size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <p className="text-muted-foreground mt-1">ankurkaushal0016@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-muted rounded-full text-primary shrink-0"><Globe size={20} /></div>
                  <div>
                    <h4 className="font-semibold text-foreground">Website</h4>
                    <p className="text-muted-foreground mt-1">www.arajpure.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-card p-8 md:p-10 rounded-2xl shadow-sm border border-border">
              <h3 className="text-2xl font-serif text-foreground mb-6">Send an Inquiry</h3>
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input required type="text" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input required type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea required rows={4} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:border-primary transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full bg-foreground text-background py-4 rounded font-medium hover:bg-primary transition-colors shadow-md">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-foreground text-primary-foreground pt-20 pb-8 border-t-[8px] border-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-16">
            <img src={logo} alt="Araj Pure Logo" className="h-20 w-20 rounded-full border-2 border-primary/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-primary-foreground/10 pb-16">
            
            <div className="text-center md:text-left">
              <h4 className="text-primary font-serif text-xl mb-4">Brand Story</h4>
              <p className="text-primary-foreground/70 leading-relaxed text-sm">
                Founded in 1985, Araj Dry Fruits & Spices brings you the finest, purest A2 Cow Ghee, honoring the sacred Bilona method to nourish your body and soul.
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-primary font-serif text-xl mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#shop" className="hover:text-primary transition-colors">Shop</a></li>
                <li><a href="#process" className="hover:text-primary transition-colors">Our Process</a></li>
                <li><a href="#roots" className="hover:text-primary transition-colors">Our Legacy</a></li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-primary font-serif text-xl mb-4">Connect</h4>
              <p className="text-primary-foreground/70 text-sm mb-4">Follow us for updates and Ayurvedic tips.</p>
              <div className="flex justify-center md:justify-end gap-4">
                <a href="https://instagram.com/arajdryfruitsandspices" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/5 rounded-full hover:bg-primary hover:text-foreground transition-all text-primary">
                  <Instagram size={20} />
                </a>
                <a href="https://wa.me/918979221409" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-foreground/5 rounded-full hover:bg-primary hover:text-foreground transition-all text-primary">
                  <Phone size={20} />
                </a>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
            <p>© 2026 Araj Pure. Crafted by Araj Dry Fruits & Spices. All rights reserved.</p>
            <div className="flex gap-4">
              <span>UPI Accepted</span>
              <span>•</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}