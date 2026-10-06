'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { Search, ClipboardList, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  { num: '01', title: 'Requirement', icon: Search, desc: 'Understanding business needs, gathering requirements, and planning solutions', duration: 'Analysis' },
  { num: '02', title: 'Architecture', icon: ClipboardList, desc: 'Database design, API planning, tech stack decisions, and system architecture', duration: 'Design' },
  { num: '03', title: 'Development', icon: Code, desc: 'Frontend & backend development with clean code, reusable components, and best practices', duration: 'Sprint-based' },
  { num: '04', title: 'Testing', icon: PenTool, desc: 'Unit testing, integration testing, debugging, and performance optimization', duration: 'QA & Review' },
  { num: '05', title: 'Deployment', icon: Rocket, desc: 'CI/CD pipeline setup, production deployment, monitoring, and maintenance', duration: 'Ongoing' },
];

export default function WorkflowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-header', start: 'top 78%' },
      });

      gsap.fromTo('.process-line-fill', { scaleX: 0 }, {
        scaleX: 1, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: '.process-stepper', start: 'top 70%' },
      });

      gsap.fromTo('.process-step', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.process-stepper', start: 'top 70%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="workflow" className="section-dark section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="section-header process-header text-center">
          <p className="text-eyebrow">My Process</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-white">
            How I Build — A Structured Workflow
          </h2>
        </div>

        {/* Stepper */}
        <div className="process-stepper relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[34px] left-[10%] right-[10%] h-[2px] bg-white/10">
            <div
              className="process-line-fill absolute inset-0 h-full origin-left"
              style={{ background: 'var(--color-gold-500)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="process-step text-center relative group">
                  {/* Node */}
                  <div className="relative inline-flex mb-5">
                    <div
                      className="w-[68px] h-[68px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative z-10"
                      style={{
                        background: 'var(--color-navy-700)',
                        border: '2px solid var(--color-gold-500)',
                      }}
                    >
                      <Icon size={24} className="text-gold-400 transition-colors group-hover:text-navy-900" />
                    </div>
                    {/* Hover glow ring */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ boxShadow: '0 0 20px rgba(200, 169, 110,0.3)' }}
                    />
                  </div>

                  <p className="text-[11px] font-bold tracking-wider text-gold-500 mb-1">
                    STEP {step.num}
                  </p>
                  <h3 className="text-heading-lg text-white mb-2">{step.title}</h3>
                  <p className="text-body-sm text-white/50 mb-3 max-w-[200px] mx-auto">{step.desc}</p>

                  {/* Duration badge */}
                  <span
                    className="inline-block text-[11px] font-semibold py-1 px-3 rounded-full"
                    style={{
                      background: 'rgba(200, 169, 110,0.1)',
                      color: 'var(--color-gold-400)',
                      border: '1px solid rgba(200, 169, 110,0.2)',
                    }}
                  >
                    {step.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
