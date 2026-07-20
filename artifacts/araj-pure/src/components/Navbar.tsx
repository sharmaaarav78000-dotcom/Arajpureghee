import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import logo from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

const NAV_LINKS = [
  { name: 'Home',    href: '#home'    },
  { name: 'Story',   href: '#story'   },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Uses',    href: '#uses'    },
  { name: 'Shop',    href: '#shop'    },
  { name: 'Roots',   href: '#roots'   },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const { quantity, setIsCartOpen }   = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        background:    scrolled ? 'rgba(15,8,4,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px) saturate(160%)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(200,164,94,0.18)' : '1px solid transparent',
        padding:       scrolled ? '10px 0' : '18px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" onClick={e => navTo(e, '#home')} className="flex items-center gap-3 group">
          <img
            src={logo} alt="Araj Pure"
            className="h-11 w-11 rounded-full transition-all duration-300 group-hover:scale-105"
            style={{ boxShadow: '0 0 0 1px rgba(200,164,94,0.3), 0 0 12px rgba(200,164,94,0.12)' }}
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-bold tracking-[0.1em] text-lg" style={{ color: 'var(--gold)' }}>ARAJ PURE</div>
            <div className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(200,164,94,0.55)' }}>A2 Cow Ghee</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={e => navTo(e, link.href)}
              className="relative group font-sans text-[11px] tracking-[0.18em] uppercase font-medium"
              style={{ color: 'rgba(240,226,204,0.72)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(240,226,204,0.72)'; }}
            >
              {link.name}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 ease-out"
                style={{ background: 'var(--gold)' }}
              />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 transition-colors duration-200"
            style={{ color: 'rgba(240,226,204,0.72)' }}
            data-testid="button-open-cart"
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,226,204,0.72)'; }}
          >
            <ShoppingBag size={21} />
            <AnimatePresence>
              {quantity > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-0 right-0 flex items-center justify-center h-[18px] w-[18px] rounded-full text-[9px] font-bold translate-x-1 -translate-y-1"
                  style={{ background: 'var(--gold)', color: 'var(--espresso)' }}
                >
                  {quantity}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: 'var(--gold)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(15,8,4,0.98)', borderBottom: '1px solid rgba(200,164,94,0.13)' }}
          >
            <div className="flex flex-col py-4 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name} href={link.href}
                  onClick={e => navTo(e, link.href)}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.3 }}
                  className="py-3.5 font-sans text-xs tracking-[0.2em] uppercase border-b"
                  style={{ color: 'rgba(240,226,204,0.78)', borderColor: 'rgba(200,164,94,0.1)' }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
