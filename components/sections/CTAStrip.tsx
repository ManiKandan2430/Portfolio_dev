'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

export default function CTAStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-content', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: 'var(--color-navy-900)' }}>
      {/* Gold gradient accent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(200, 169, 110, 0.08) 0%, transparent 50%, rgba(200, 169, 110, 0.05) 100%)',
        }}
      />
      
      <div className="container-main py-20 lg:py-24 relative z-10">
        <div className="cta-content flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="text-display-sm text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="text-white/50 text-body-md max-w-[500px] mx-auto lg:mx-0">
              Open for freelance projects, full-time roles, and exciting collaborations.
            </p>
          </div>
          <a href="#contact" className="btn btn-primary shadow-lg shadow-gold-500/20 shrink-0">
            Get In Touch <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
