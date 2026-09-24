import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import logo from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

const NAV_LINKS = [
  { name: 'Heritage', href: '#story' },
  { name: 'Pure Bilona', href: '#craft' },
  { name: 'Collection', href: '#shop' },
  { name: 'Wellness', href: '#benefits' },
  { name: 'Proof', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { quantity, setIsCartOpen } = useCart();
  const { user, openAuthModal, setIsProfileModalOpen } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Determine active section for subtle indicator
      const sections = ['home', 'story', 'craft', 'shop', 'benefits', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      {/* Floating Capsule Glass Container */}
      <div
        className={`w-full max-w-7xl rounded-full pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-4 sm:px-7 ${
          scrolled
            ? 'py-2.5 bg-[#080909]/90 backdrop-blur-2xl border border-[#D6B36A]/38 shadow-[0_22px_55px_rgba(0,0,0,0.9),_inset_0_1px_0_rgba(255,255,255,0.12),_0_0_28px_rgba(214,179,106,0.14)]'
            : 'py-3.5 bg-[#121414]/75 backdrop-blur-xl border border-[#D6B36A]/24 shadow-[0_14px_40px_rgba(0,0,0,0.65),_inset_0_1px_0_rgba(255,255,255,0.1)]'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={e => navTo(e, '#home')}
          className="flex items-center gap-3 group transition-transform duration-300 active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <img
              src={logo}
              alt="Araj Pure"
              className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{
                boxShadow: '0 0 0 1px rgba(214,179,106,0.5), 0 0 20px rgba(214,179,106,0.25)',
              }}
            />
            {/* Subtle glowing halo on logo */}
            <div className="absolute inset-0 rounded-full bg-[#D6B36A]/12 blur-sm group-hover:bg-[#D6B36A]/30 transition-colors pointer-events-none" />
          </div>
          <div className="leading-tight">
            <div
              className="font-display font-bold tracking-[0.16em] text-base md:text-lg text-[#D6B36A] transition-colors group-hover:text-[#E8D39A]"
            >
              ARAJ PURE
            </div>
            <div className="font-sans text-[8.5px] tracking-[0.26em] uppercase text-[#F5F1E8]/55">
              A2 Cow Ghee · 1985
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={e => navTo(e, link.href)}
                className="relative py-1 font-sans text-[11px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 hover:text-[#E8D39A] group cursor-pointer"
                style={{
                  color: isActive ? '#E8D39A' : 'rgba(245, 241, 232, 0.75)',
                }}
              >
                {link.name}
                {/* Active / Hover Glass Underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #D6B36A, transparent)',
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* User Auth Pill / Button */}
          {user ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 px-2 py-1 sm:px-3.5 sm:py-1.5 rounded-full border transition-all duration-300 hover:border-[#D6B36A] hover:bg-[#D6B36A]/20 active:scale-95 cursor-pointer"
              style={{
                background: 'rgba(214, 179, 106, 0.12)',
                borderColor: 'rgba(214, 179, 106, 0.4)',
              }}
              title="My Account & Orders"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Patron'}
                  className="w-6 h-6 rounded-full object-cover border border-[#D6B36A]"
                />
              ) : (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-[#080909] bg-[#D6B36A]"
                >
                  {(user.displayName || user.email || 'P')[0].toUpperCase()}
                </div>
              )}
              <span className="hidden sm:inline font-sans text-xs font-medium text-[#F5F1E8] max-w-[85px] truncate">
                {user.displayName?.split(' ')[0] || 'Account'}
              </span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="btn-capsule-glass flex items-center gap-1.5 px-3.5 py-1.5 text-[10.5px] font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Icon Pill */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full transition-all duration-300 hover:bg-[#D6B36A]/18 text-[#F5F1E8]/85 hover:text-[#D6B36A] active:scale-95 cursor-pointer"
            data-testid="button-open-cart"
            aria-label="Open Cart"
          >
            <ShoppingBag size={19} />
            <AnimatePresence>
              {quantity > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-0.5 right-0.5 flex items-center justify-center h-[18px] w-[18px] rounded-full text-[9px] font-bold text-[#080909]"
                  style={{
                    background: 'linear-gradient(135deg, #E8D39A, #D6B36A)',
                    boxShadow: '0 0 14px rgba(214, 179, 106, 0.9)',
                  }}
                >
                  {quantity}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full transition-colors hover:bg-[#D6B36A]/18 text-[#F5F1E8]/85 hover:text-[#D6B36A] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden fixed top-20 inset-x-4 max-w-lg mx-auto z-40 rounded-3xl overflow-hidden pointer-events-auto"
            style={{
              background: 'rgba(18, 20, 20, 0.96)',
              backdropFilter: 'blur(32px) saturate(190%)',
              border: '1px solid rgba(214, 179, 106, 0.32)',
              boxShadow: '0 32px 75px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
          >
            <div className="flex flex-col py-5 px-6">
              {/* Account Quick Card on Mobile */}
              <div className="pb-4 mb-2 border-b border-[#D6B36A]/20">
                {user ? (
                  <button
                    onClick={() => { setMenuOpen(false); setIsProfileModalOpen(true); }}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#D6B36A]/12 border border-[#D6B36A]/28 text-left active:scale-[0.98] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="User" className="w-9 h-9 rounded-full border border-[#D6B36A]" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#D6B36A] text-[#080909] flex items-center justify-center font-bold text-xs">
                          {(user.displayName || user.email || 'P')[0].toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-sans font-semibold text-xs text-[#F5F1E8]">{user.displayName || 'Patron'}</div>
                        <div className="font-sans text-[10px] text-[#F5F1E8]/55 truncate max-w-[170px]">{user.email}</div>
                      </div>
                    </div>
                    <span className="font-sans text-[10.5px] uppercase font-semibold text-[#D6B36A]">My Orders →</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { setMenuOpen(false); openAuthModal('login'); }}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase text-white bg-white/10 border border-[#D6B36A]/32 hover:bg-white/15 cursor-pointer"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span>Sign In with Gmail / Email</span>
                  </button>
                )}
              </div>

              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={e => navTo(e, link.href)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="py-3 font-sans text-xs tracking-[0.24em] uppercase font-semibold border-b border-[#D6B36A]/10 last:border-0 transition-colors cursor-pointer"
                  style={{
                    color: activeSection === link.href.replace('#', '') ? '#E8D39A' : 'rgba(245, 241, 232, 0.72)',
                  }}
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
