import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import logo from '@assets/ChatGPT_Image_Jul_2,_2026,_10_21_13_PM_1784571538758.png';

export default function AuthModal() {
  const { isAuthModalOpen, authModalMode, closeAuthModal, signInGoogle, signInEmail, signUpEmail } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Sync mode with context
  React.useEffect(() => {
    setMode(authModalMode);
    setError('');
  }, [authModalMode]);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setIsGoogleLoading(true);
      await signInGoogle();
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in popup was closed.');
      } else {
        setError(err.message || 'Google sign in failed. Please try again.');
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password should be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      try {
        setIsLoading(true);
        await signUpEmail(email.trim(), password, name.trim());
      } catch (err: any) {
        console.error('Registration Error:', err);
        if (err.code === 'auth/email-already-in-use') {
          setError('This email address is already in use. Try signing in.');
        } else if (err.code === 'auth/invalid-email') {
          setError('Please provide a valid email address.');
        } else {
          setError(err.message || 'Registration failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // Login
      try {
        setIsLoading(true);
        await signInEmail(email.trim(), password);
      } catch (err: any) {
        console.error('Sign In Error:', err);
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          setError('Invalid email or password. Please check and try again.');
        } else if (err.code === 'auth/invalid-email') {
          setError('Please provide a valid email address.');
        } else {
          setError(err.message || 'Sign in failed. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={closeAuthModal}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-[32px] overflow-hidden my-8"
          style={{
            background: 'rgba(18, 20, 20, 0.96)',
            backdropFilter: 'blur(35px) saturate(190%)',
            border: '1px solid rgba(214, 179, 106, 0.32)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(214, 179, 106, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Top Decorative Gold Bar */}
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #BFA05A, #E8D39A, #BFA05A)' }} />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full text-[#F5F1E8]/60 hover:text-[#D6B36A] hover:bg-[#D6B36A]/15 transition-colors z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="p-8 sm:p-10">
            {/* Header Brand */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative mb-3">
                <img
                  src={logo}
                  alt="Araj Pure"
                  className="w-14 h-14 rounded-full object-cover"
                  style={{
                    boxShadow: '0 0 0 1px rgba(214,179,106,0.5), 0 0 22px rgba(214,179,106,0.28)',
                  }}
                />
              </div>
              <h2
                className="font-display font-bold text-2xl tracking-[0.06em] text-[#F5F1E8]"
              >
                {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="font-sans text-xs tracking-wider uppercase mt-1 text-[#D6B36A]/90">
                {mode === 'login' ? 'Access your orders & saved address' : 'Join our family of pure ghee connoisseurs'}
              </p>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-2.5 text-rose-200 text-xs leading-relaxed"
              >
                <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* ── 1-CLICK GMAIL / GOOGLE SIGN-IN BUTTON ── */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
              className="w-full py-3.5 px-4 rounded-full font-sans font-medium text-xs tracking-[0.08em] flex items-center justify-center gap-3 transition-all mb-6 cursor-pointer active:scale-[0.98]"
              style={{
                background: '#ffffff',
                color: '#1f1f1f',
                boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
              }}
            >
              {isGoogleLoading ? (
                <div className="w-5 h-5 border-2 border-[#1f1f1f] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              )}
              <span className="font-semibold">
                {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google / Gmail'}
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] flex-1 bg-[#D6B36A]/22" />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium text-[#F5F1E8]/45">
                or with email
              </span>
              <div className="h-[1px] flex-1 bg-[#D6B36A]/22" />
            </div>

            {/* Switch Tabs: Login / Register */}
            <div
              className="flex rounded-full p-1 mb-6 bg-[#080909]/75 border border-[#D6B36A]/22"
            >
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`flex-1 py-2 text-xs font-sans font-semibold tracking-wider uppercase transition-all rounded-full cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#D6B36A] text-[#080909] shadow'
                    : 'text-[#F5F1E8]/60 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className={`flex-1 py-2 text-xs font-sans font-semibold tracking-wider uppercase transition-all rounded-full cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#D6B36A] text-[#080909] shadow'
                    : 'text-[#F5F1E8]/60 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block font-sans text-[10.5px] uppercase tracking-wider mb-1.5 text-[#F5F1E8]/75">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B36A]/70" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-all text-[#F5F1E8] bg-[#080909]/65 border border-[#D6B36A]/28 focus:border-[#D6B36A]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-sans text-[10.5px] uppercase tracking-wider mb-1.5 text-[#F5F1E8]/75">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B36A]/70" />
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-all text-[#F5F1E8] bg-[#080909]/65 border border-[#D6B36A]/28 focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans text-[10.5px] uppercase tracking-wider mb-1.5 text-[#F5F1E8]/75">
                  Password
                </label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B36A]/70" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-all text-[#F5F1E8] bg-[#080909]/65 border border-[#D6B36A]/28 focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block font-sans text-[10.5px] uppercase tracking-wider mb-1.5 text-[#F5F1E8]/75">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B36A]/70" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-all text-[#F5F1E8] bg-[#080909]/65 border border-[#D6B36A]/28 focus:border-[#D6B36A]"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="btn-capsule-gold w-full mt-3 py-3.5 px-6 font-sans font-semibold text-xs tracking-[0.22em] uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#080909] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to Account' : 'Register Account'}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Mode Footer */}
            <div className="mt-6 text-center">
              <span className="font-sans text-xs text-[#F5F1E8]/50">
                {mode === 'login' ? "Don't have an account yet?" : 'Already registered?'}
              </span>{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                className="font-sans text-xs font-semibold underline underline-offset-4 text-[#D6B36A] hover:text-[#E8D39A] transition-colors cursor-pointer"
              >
                {mode === 'login' ? 'Register here' : 'Sign in here'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
