'use client';

import { useEffect, useRef, useState } from 'react';
import { animateCounter, gsap } from '@/lib/animations';

const stats = [
  { value: 5, suffix: '+', label: 'Projects Delivered' },
  { value: 1, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Domains Served' },
  { value: 99, suffix: '%', label: 'Code Quality' },
];

export default function StatsSection() {
  const [particles, setParticles] = useState<{ left: string, top: string, duration: string, delay: string }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Generate particles only on the client to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 16 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${6 + Math.random() * 8}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(generatedParticles);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.stats-container', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-container', start: 'top 78%' },
      });
    }, sectionRef);

    // Counter animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const counters = entry.target.querySelectorAll<HTMLElement>('[data-count]');
            counters.forEach((el) => animateCounter(el));
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-dark section-padding relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: 'var(--color-gold-500)',
              left: particle.left,
              top: particle.top,
              opacity: 0.3,
              animation: `float-particle ${particle.duration} ease-in-out infinite`,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container-main relative z-10">
        <div
          className="stats-container grid grid-cols-2 md:grid-cols-4 gap-[1px] rounded-2xl overflow-hidden"
          style={{ background: 'rgba(200, 169, 110,0.1)' }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-16 px-6"
              style={{ background: 'var(--color-navy-900)' }}
            >
              <p
                className="text-display-md mb-2"
                style={{ color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}
              >
                <span data-count={stat.value} data-suffix={stat.suffix}>
                  0{stat.suffix}
                </span>
              </p>
              <p className="text-[13px] text-white/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
