import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseVy: number;
  alpha: number;
  targetAlpha: number;
  pulsingSpeed: number;
  pulsePhase: number;
}

export default function GoldParticles({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const isInteracting = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 18 : 46;

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 1.9 + 0.6;
      const baseVy = -(Math.random() * 0.35 + 0.15);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        vx: (Math.random() - 0.5) * 0.25,
        vy: baseVy,
        baseVy,
        alpha: Math.random() * 0.45 + 0.18,
        targetAlpha: Math.random() * 0.65 + 0.25,
        pulsingSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
      isInteracting.current = true;
    };

    const handleMouseLeave = () => {
      isInteracting.current = false;
      mousePos.current.x = -1000;
      mousePos.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic pulse
        p.pulsePhase += p.pulsingSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.2;
        const clampedAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));

        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Interactive cursor repulsion
        if (isInteracting.current) {
          const dx = p.x - mousePos.current.x;
          const dy = p.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Screen wrap
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw rich golden dust speck
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 211, 154, ${clampedAlpha})`;
        ctx.shadowColor = 'rgba(214, 179, 106, 0.75)';
        ctx.shadowBlur = p.radius > 1.4 ? 7 : 3;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-[1] ${className}`}
      style={{ willChange: 'contents' }}
    />
  );
}
