'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { Building2, HeartPulse, ShoppingCart, GraduationCap, Truck, Factory, Home, Radio } from 'lucide-react';

const industries = [
  { icon: Building2, name: 'Finance & Banking' },
  { icon: HeartPulse, name: 'Healthcare & Pharma' },
  { icon: ShoppingCart, name: 'eCommerce & Retail' },
  { icon: GraduationCap, name: 'Education & EdTech' },
  { icon: Truck, name: 'Logistics & Supply Chain' },
  { icon: Factory, name: 'Manufacturing' },
  { icon: Home, name: 'Real Estate & PropTech' },
  { icon: Radio, name: 'Telecommunications' },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.industries-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.industries-header', start: 'top 78%' },
      });
      gsap.fromTo('.industry-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: '.industries-grid', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="section-mid-dark section-padding">
      <div className="container-main">
        <div className="section-header industries-header text-center">
          <p className="text-eyebrow">Industries</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-white">Built for Every Sector</h2>
        </div>

        <div className="industries-grid grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div
                key={industry.name}
                className="industry-card group flex items-center gap-5 p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gold-500/10 hover:border-gold-500/40 hover:-translate-y-1.5 hover:shadow-lg"
                style={{
                  border: '1.5px solid rgba(200, 169, 110,0.12)',
                  background: 'rgba(200, 169, 110,0.03)',
                }}
              >
                <Icon
                  size={24}
                  className="text-gold-500 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[15deg] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(200, 169, 110,0.6)] shrink-0"
                />
                <span className="text-[16px] text-white/50 group-hover:text-white font-bold tracking-tight transition-colors">
                  {industry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
