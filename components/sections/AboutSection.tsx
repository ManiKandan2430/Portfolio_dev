'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { Check, ArrowRight } from 'lucide-react';

const checklist = [
  'MERN Stack (MongoDB, Express.js, React.js, Node.js)',
  'JWT Authentication & Role-Based Access Control (RBAC)',
  'Agile/Scrum Development & CI/CD Pipelines',
  'Production Deployments for Government & SaaS Platforms',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.about-visual', { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-visual', start: 'top 78%' },
      });
      gsap.fromTo('.about-float-card', { opacity: 0, scale: 0.85 }, {
        opacity: 1, scale: 1, duration: 0.8, ease: 'elastic.out(1, 0.6)',
        scrollTrigger: { trigger: '.about-float-card', start: 'top 80%' },
      });
      gsap.fromTo('.about-content', { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-content', start: 'top 78%' },
      });
      gsap.fromTo('.about-check', { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: '.about-checks', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-white section-padding">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left — Visual Block */}
          <div className="about-visual relative" style={{ minHeight: '460px' }}>
            {/* Main rectangle */}
            <div
              className="absolute top-0 left-0 rounded-xl"
              style={{
                width: '76%',
                height: '86%',
                background: 'var(--color-navy-800)',
                backgroundImage: `linear-gradient(rgba(200, 169, 110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 169, 110,0.04) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Accent rectangle */}
            <div
              className="absolute bottom-0 right-[10%] rounded-lg"
              style={{
                width: '50%',
                height: '45%',
                background: 'linear-gradient(135deg, rgba(200, 169, 110,0.15), rgba(200, 169, 110,0.05))',
                border: '1px solid rgba(200, 169, 110,0.2)',
              }}
            />
            {/* Experience circle */}
            <div
              className="absolute bottom-[5%] right-[5%] w-24 h-24 rounded-full flex flex-col items-center justify-center z-10"
              style={{
                background: 'var(--color-navy-900)',
                border: '2px solid rgba(200, 169, 110,0.3)',
              }}
            >
              <span className="text-[11px] text-white/50">Exp</span>
              <span className="text-[22px] font-bold" style={{ color: 'var(--color-gold-400)', fontFamily: 'var(--font-display)' }}>1+</span>
              <span className="text-[10px] text-white/40">Year</span>
            </div>
            {/* Float card */}
            <div
              className="about-float-card absolute top-[30%] -left-2 sm:left-[-40px] z-10 p-12 rounded-2xl"
              style={{
                background: 'white',
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                borderLeft: '4px solid var(--color-gold-500)',
                maxWidth: '240px',
              }}
            >
              <p className="text-[44px] font-bold leading-none tracking-tight" style={{ color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)' }}>
                5+
              </p>
              <p className="text-[15px] font-bold text-surface-900 mt-2 uppercase tracking-wide">Projects Delivered</p>
              <p className="text-[12px] text-surface-500 mt-1 leading-relaxed">Across SaaS, EdTech, and Government domains.</p>
            </div>
          </div>

          {/* Right — Content */}
          <div className="about-content">
            <p className="text-eyebrow">About Me</p>
            <div className="gold-divider !ml-0" />
            <h2 className="text-display-md text-surface-900 mb-5">Who I Am</h2>

            <p className="text-body-lg text-surface-500 mb-4">
              Full Stack Developer with 1+ year of hands-on experience across the Software Development 
              Life Cycle (SDLC), developing and maintaining production-grade web applications in SaaS, 
              EdTech, and Government domains using the MERN stack.
            </p>
            <p className="text-body-lg text-surface-500 mb-6">
              Currently contributing to the live Directorate of Technical Education (DoTE), Tamil Nadu 
              Admission Portal, supporting real applicant data for the 2026–27 academic year. Proficient 
              in RESTful API development, database design, and responsive UI development.
            </p>

            {/* Checklist */}
            <div className="about-checks flex flex-col gap-4 mb-10">
              {checklist.map((item) => (
                <div key={item} className="about-check flex items-start gap-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(200, 169, 110,0.1)' }}
                  >
                    <Check size={14} className="text-gold-500" />
                  </div>
                  <span className="text-body-lg text-surface-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <a href="/MANIKANDAN_RESUME.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-tertiary">
              Download Resume <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
