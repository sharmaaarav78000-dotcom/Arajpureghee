import React, { useEffect, useRef } from 'react';

interface LockScreenProps {
  isActive?: boolean;
  onUnlock?: () => void;
}

// Global trigger so InteractiveTools can show the lock screen
let globalTrigger: (() => void) | null = null;
export function triggerLockScreen() {
  if (globalTrigger) globalTrigger();
}

export default function LockScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (!overlayRef.current) return;
    overlayRef.current.style.display = 'flex';
    setTimeout(() => overlayRef.current?.classList.add('active'), 10);
  };

  const hide = () => {
    if (!overlayRef.current) return;
    overlayRef.current.classList.remove('active');
    setTimeout(() => {
      if (overlayRef.current) overlayRef.current.style.display = 'none';
    }, 500);
  };

  useEffect(() => {
    globalTrigger = show;
    return () => { globalTrigger = null; };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="lock-overlay"
      style={{ display: 'none' }}
    >
      <h1>TIME IS UP 🛑</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: 500, margin: '1.5rem 0 2.5rem' }}>
        Your scheduled screen time is over. Please lock your device, step away, and take a breather.
      </p>
      <button className="lock-unlock-btn" onClick={hide}>
        I have put my phone down (Unlock)
      </button>
    </div>
  );
}
