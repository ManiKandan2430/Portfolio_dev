'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: 'SearchFirst Technologies transformed our legacy banking platform into a modern, scalable system. The team\'s technical depth and commitment to quality is unmatched. We\'ve seen a 3× improvement in system performance and dev cycles cut in half.',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Pacific Financial Group, USA',
    initials: 'MC',
    gradient: 'linear-gradient(135deg, #1a3260, #234080)',
  },
  {
    quote: 'We engaged SearchFirst for a complex AI integration and were blown away by their technical depth. They became a true strategic partner — not just a vendor. On time, every sprint, zero surprises. Exceptional team.',
    name: 'Sarah Thompson',
    role: 'VP of Product',
    company: 'Nimble Health, UK',
    initials: 'ST',
    gradient: 'linear-gradient(135deg, #1d6040, #2a8060)',
  },
  {
    quote: 'Our React Native app launched in 14 weeks and hit 4.8 stars on App Store in month one. SearchFirst made the complex feel effortless. I\'ve worked with teams in 4 countries — SearchFirst is the best by a clear margin.',
    name: 'Ahmed Al-Rashid',
    role: 'Founder & CEO',
    company: 'LogiFlow, UAE',
    initials: 'AR',
    gradient: 'linear-gradient(135deg, #6a4020, #8a6040)',
  },
  {
    quote: 'The automation solution SearchFirst built saves us 40+ hours per week. ROI was evident in the first quarter. They understood our business deeply, not just the technology. Highly recommend for any complex enterprise project.',
    name: 'Priya Ramesh',
    role: 'Director of Operations',
    company: 'TrueScale Retail, Singapore',
    initials: 'PR',
    gradient: 'linear-gradient(135deg, #3d2070, #5a3090)',
  },
];

const clientLogos = [
  'Pacific Financial', 'Nimble Health', 'LogiFlow', 'TrueScale Retail', 'Axiom Tech', 'DataPrime'
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && intervalRef.current) {
        clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(next, 5500);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [next]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonial-header', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} id="testimonials" className="section-white section-padding">
      <div className="container-main">
        <div className="section-header testimonial-header text-center">
          <p className="text-eyebrow">Testimonials</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-surface-900">What Our Clients Say</h2>
        </div>

        <div className="flex flex-col items-center relative">
          <div className="max-w-[720px] w-full text-center">
            {/* Quote — Refined Size for Readability */}
            <div className="min-h-[140px] flex items-center justify-center pt-4" aria-live="polite">
              <p className="text-[18px] md:text-[21px] text-surface-700 italic font-medium leading-[1.6]">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author details — Perfectly Centered Stack */}
            <div className="flex flex-col items-center justify-center gap-6 mt-16">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-[18px] shadow-xl transform transition-transform duration-700 hover:rotate-[360deg] cursor-default"
                style={{ background: t.gradient, fontFamily: 'var(--font-display)' }}
              >
                {t.initials}
              </div>
              <div className="text-center">
                <p className="text-[22px] font-bold text-surface-900 tracking-tight">{t.name}</p>
                <p className="text-[14px] text-surface-400 font-bold mt-1 uppercase tracking-[0.14em]">{t.role} &mdash; {t.company}</p>
              </div>
            </div>

            {/* Controls — Fixed width slots to prevent shifting */}
            <div className="flex items-center justify-center gap-10 mt-14">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:border-gold-500 hover:text-gold-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <div key={i} className="w-[32px] flex justify-center">
                    <button
                      onClick={() => goTo(i)}
                      className="h-2.5 rounded-full transition-all duration-500 cursor-pointer"
                      style={{
                        width: active === i ? '32px' : '10px',
                        background: active === i ? 'var(--color-gold-500)' : 'var(--color-surface-200)',
                      }}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-surface-200 flex items-center justify-center text-surface-400 hover:border-gold-500 hover:text-gold-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Client logos strip — Engineered for Single-Row Clarity */}
        {/* <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mt-32 pt-20 border-t border-surface-100 opacity-40 max-w-[1000px] mx-auto">
          {clientLogos.map((name) => (
            <span
              key={name}
              className="text-[12px] font-bold text-surface-400 uppercase tracking-[0.2em] transition-opacity hover:opacity-100 cursor-default"
            >
              {name}
            </span>
          ))}
        </div> */}
      </div>
    </section>
  );
}
