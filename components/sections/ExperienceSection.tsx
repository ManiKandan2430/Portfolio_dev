'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'SAS Techno Solutions',
    location: 'Coimbatore, Tamil Nadu',
    period: 'Jun 2025 – Sep 2026',
    highlights: [
      'Developed and maintained the TN Polytechnic Admission Portal, a production-grade government application for DoTE, Tamil Nadu',
      'Built ZuviChat — a multi-tenant WhatsApp SaaS platform for business communication and marketing campaigns',
      'Developed Learning Management System (LMS) and Examination Management System (EMS) for educational institutions',
      'Implemented JWT-based authentication and RBAC across all platforms',
      'Designed and optimized MySQL/PostgreSQL database schemas for complex workflows',
    ],
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'JWT', 'RBAC'],
  },
  {
    type: 'intern',
    title: 'Intern — Virtual Desktop Infrastructure',
    company: 'Wipro Technologies',
    location: 'Remote',
    period: 'Jan 2025 – Apr 2025',
    highlights: [
      'Completed a project on Virtual Desktop Infrastructure (VDI), gaining hands-on experience with virtualization',
      'Assisted in system deployment, configuration, testing, and troubleshooting of VDI environments',
      'Gained exposure to cloud infrastructure and enterprise IT operations',
    ],
    tags: ['VDI', 'Virtualization', 'Cloud', 'Enterprise IT'],
  },
  {
    type: 'intern',
    title: 'Intern — Web Development',
    company: 'Blackstone Infomatics',
    location: 'Remote',
    period: 'Aug 2024 – Sep 2024',
    highlights: [
      'Built a Flipkart-inspired MERN e-commerce platform with responsive UI',
      'Implemented JWT authentication and RESTful APIs for product catalog and order management',
    ],
    tags: ['React.js', 'Node.js', 'MongoDB', 'Vite', 'JWT'],
  },
];

const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Erode Arts and Science College, Tamil Nadu',
    period: '2023 – 2025',
  },
  {
    degree: 'B.Sc. Computer Science',
    institution: 'Gobi Arts and Science College, Tamil Nadu',
    period: '2017 – 2020',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-header', start: 'top 78%' },
      });

      gsap.fromTo('.exp-item', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 75%' },
      });

      gsap.fromTo('.edu-item', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.edu-section', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-mid-dark section-padding">
      <div className="container-main">
        <div className="section-header exp-header text-center">
          <p className="text-eyebrow">Experience</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-white">Professional Journey</h2>
        </div>

        {/* Timeline */}
        <div className="exp-timeline relative max-w-[900px] mx-auto">
          {/* Vertical line */}
          <div 
            className="absolute top-0 bottom-0 left-[24px] lg:left-1/2 lg:-translate-x-[1px] w-[2px]"
            style={{ background: 'rgba(200, 169, 110, 0.2)' }}
          />

          {experiences.map((exp, idx) => (
            <div 
              key={idx} 
              className={`exp-item relative flex items-start gap-8 mb-16 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Timeline node */}
              <div 
                className="absolute left-[14px] lg:left-1/2 lg:-translate-x-1/2 w-[22px] h-[22px] rounded-full z-10 flex items-center justify-center"
                style={{
                  background: 'var(--color-surface-200)',
                  border: '2.5px solid var(--color-gold-500)',
                  boxShadow: '0 0 15px rgba(200, 169, 110, 0.25)',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gold-500" />
              </div>

              {/* Content card */}
              <div 
                className={`ml-16 lg:ml-0 lg:w-[calc(50%-40px)] rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 group ${idx % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'}`}
                style={{
                  background: 'var(--color-surface-100)',
                  border: '1px solid rgba(200, 169, 110, 0.12)',
                }}
              >
                {/* Period badge */}
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase size={16} className="text-gold-500" />
                  <span 
                    className="text-[11px] font-bold uppercase tracking-[0.14em] py-1 px-3 rounded-full"
                    style={{
                      background: 'rgba(200, 169, 110, 0.1)',
                      color: 'var(--color-gold-400)',
                      border: '1px solid rgba(200, 169, 110, 0.2)',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <h3 className="text-[22px] font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                  {exp.title}
                </h3>
                <p className="text-gold-500 text-[14px] font-semibold mb-1">{exp.company}</p>
                <p className="text-white/30 text-[12px] mb-5">{exp.location}</p>

                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                      <span className="text-[14px] text-white/60 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-[0.1em] py-1.5 px-3 rounded-full transition-all duration-300 group-hover:border-gold-500/40"
                      style={{
                        background: 'rgba(200, 169, 110, 0.05)',
                        color: 'var(--color-gold-500)',
                        border: '1px solid rgba(200, 169, 110, 0.12)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="edu-section mt-24">
          <div className="flex items-center justify-center gap-3 mb-12">
            <GraduationCap size={24} className="text-gold-500" />
            <h3 className="text-heading-xl text-white font-bold">Education</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto">
            {education.map((edu, idx) => (
              <div 
                key={idx}
                className="edu-item rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: 'var(--color-surface-100)',
                  border: '1px solid rgba(200, 169, 110, 0.12)',
                }}
              >
                <span 
                  className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] py-1.5 px-4 rounded-full mb-5"
                  style={{
                    background: 'rgba(200, 169, 110, 0.1)',
                    color: 'var(--color-gold-400)',
                    border: '1px solid rgba(200, 169, 110, 0.2)',
                  }}
                >
                  {edu.period}
                </span>
                <h4 className="text-[18px] font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {edu.degree}
                </h4>
                <p className="text-white/40 text-[14px]">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
