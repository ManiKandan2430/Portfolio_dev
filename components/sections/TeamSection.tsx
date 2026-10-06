'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

const team = [
  {
    title: 'Rajesh Kumar',
    subtitle: 'CTO & CO-FOUNDER',
    bio: '15+ years architecting enterprise systems. Ex-Infosys senior architect. Passionate about clean code.',
    initials: 'RK',
    bgColor: '#162145', // Navy
    url: '#'
  },
  {
    title: 'Prithika Nair',
    subtitle: 'HEAD OF PRODUCT DESIGN',
    bio: 'Award-winning UX designer with 10+ years. Former Design Lead at Zoho. Empathy-driven design believer.',
    initials: 'PN',
    bgColor: '#2b7b5f', // Teal
    url: '#'
  },
  {
    title: 'Arjun Selvam',
    subtitle: 'PRINCIPAL ARCHITECT',
    bio: 'Cloud and distributed systems specialist. AWS certified. Led migrations for 20+ enterprise clients.',
    initials: 'AS',
    bgColor: '#61401f', // Brown
    url: '#'
  },
  {
    title: 'Deepika Moorthy',
    subtitle: 'DIRECTOR OF AI SOLUTIONS',
    bio: 'ML engineer with PhD from IIT Madras. Leads all generative AI and automation initiatives globally.',
    initials: 'DM',
    bgColor: '#452762', // Deep Purple
    url: '#'
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.team-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.team-header', start: 'top 78%' },
      });
      gsap.fromTo('.team-grid article', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power4.out', stagger: 0.12,
        scrollTrigger: { trigger: '.team-grid', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="team" className="section-light section-padding bg-[#f7f6f2] dark:bg-navy-900">
      <div className="container-main">
        <div className="section-header team-header text-left mb-16 max-w-2xl">
          <h2 className="text-[20px] leading-relaxed text-surface-600 dark:text-surface-300 font-normal">
            Engineers, designers, and strategists who are passionate about building things that matter.
          </h2>
        </div>

        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative">
          {team.map((member, i) => (
            <article
              key={i}
              className="bg-white dark:bg-white/5 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-transparent hover:border-surface-200 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-[28px] font-bold mb-6 font-serif tracking-wider"
                style={{ backgroundColor: member.bgColor }}
              >
                {member.initials}
              </div>
              
              <h3 className="text-[20px] font-bold text-surface-900 dark:text-white mb-1.5 font-serif tracking-tight">
                {member.title}
              </h3>

              <p className="text-[11px] font-bold text-[#c8a96e] tracking-widest uppercase mb-5">
                {member.subtitle}
              </p>

              <p className="text-[14px] leading-relaxed text-surface-500 dark:text-white/60 mb-8 flex-grow">
                {member.bio}
              </p>

              <a
                href={member.url}
                className="w-10 h-10 rounded-full border border-surface-200 dark:border-white/10 flex items-center justify-center text-surface-400 dark:text-white/50 hover:bg-surface-100 dark:hover:bg-white/10 hover:text-surface-600 dark:hover:text-white transition-colors mt-auto"
                aria-label={`${member.title} LinkedIn`}
              >
                <div className="text-[13px] font-bold tracking-tight">in</div>
              </a>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-surface-300 dark:border-surface-600 text-surface-900 dark:text-white font-bold text-[14px] hover:bg-surface-100 dark:hover:bg-surface-800 hover:-translate-y-0.5 transition-all">
            Join Our Team &mdash; We&apos;re Hiring <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
