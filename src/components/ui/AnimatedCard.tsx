'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({ children, className = '', delay = 0 }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    // Initial animation - ensure it ends at opacity 1
    gsap.fromTo(card, 
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x - glow.offsetWidth / 2,
        y: y - glow.offsetHeight / 2,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(glow, {
        opacity: 0.6,
        scale: 1,
        duration: 0.3,
      });
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
      });
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-2xl border border-primary/30 bg-black/40 backdrop-blur-sm p-8 transition-all duration-300 ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        ref={glowRef}
        className="absolute w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      {children}
    </div>
  );
}
