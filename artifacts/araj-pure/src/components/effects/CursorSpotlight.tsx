import React, { useEffect, useState, useRef } from 'react';

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const spotPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/desktop)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over clickable/interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], .interactive-target, .glass-card, .btn-capsule-gold, .btn-capsule-glass')
        );
        setHoveringInteractive(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let rafId: number;
    const animate = () => {
      // Smooth lerp for ring and soft spotlight
      const easeRing = 0.18;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * easeRing;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * easeRing;

      const easeSpot = 0.08;
      spotPos.current.x += (mouse.current.x - spotPos.current.x) * easeSpot;
      spotPos.current.y += (mouse.current.y - spotPos.current.y) * easeSpot;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      if (spotRef.current) {
        spotRef.current.style.transform = `translate3d(${spotPos.current.x}px, ${spotPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Ambient luxury champagne spotlight following mouse */}
      <div
        ref={spotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(214, 179, 106, 0.085) 0%, rgba(214, 179, 106, 0.02) 45%, transparent 70%)',
          willChange: 'transform',
        }}
      />

      {/* 2. Custom cursor outer champagne ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ease-out"
        style={{
          width: hoveringInteractive ? 46 : 24,
          height: hoveringInteractive ? 46 : 24,
          borderColor: hoveringInteractive ? 'rgba(232, 211, 154, 0.95)' : 'rgba(214, 179, 106, 0.55)',
          backgroundColor: hoveringInteractive ? 'rgba(214, 179, 106, 0.12)' : 'transparent',
          boxShadow: hoveringInteractive ? '0 0 20px rgba(214, 179, 106, 0.45)' : 'none',
          willChange: 'transform, width, height',
        }}
      />

      {/* 3. Custom cursor central champagne dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
        style={{
          background: '#E8D39A',
          boxShadow: '0 0 10px rgba(232, 211, 154, 0.95)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
