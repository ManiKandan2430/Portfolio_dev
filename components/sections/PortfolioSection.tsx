'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/animations';
import { ArrowRight, ExternalLink } from 'lucide-react';

const filters = ['All Projects', 'Government', 'SaaS', 'EdTech', 'E-Commerce'];

const projects = [
  { 
    title: 'TN Polytechnic Admission Portal', 
    category: 'Government', 
    eyebrow: 'GOVERNMENT EDTECH',
    watermark: 'DoTE',
    bgClass: 'bg-[#1a2b4c]', 
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'RBAC'],
    description: 'Production-grade government application for the Directorate of Technical Education (DoTE), Tamil Nadu, supporting the 2026–27 admission process with student registration, document management, and real-time tracking.',
    featured: true
  },
  { 
    title: 'ZuviChat — WhatsApp SaaS Platform', 
    category: 'SaaS', 
    eyebrow: 'SAAS PLATFORM',
    watermark: 'ZuviChat',
    bgClass: 'bg-[#123826]', 
    tags: ['TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT'],
    description: 'Multi-tenant SaaS platform enabling businesses to manage WhatsApp-based customer communication, real-time chat, contact management, and campaign dashboards.',
  },
  { 
    title: 'Learning Management System', 
    category: 'EdTech', 
    eyebrow: 'EDTECH PLATFORM',
    watermark: 'LMS',
    bgClass: 'bg-[#482d7a]', 
    tags: ['React.js', 'Node.js', 'MySQL', 'Context API', 'Tailwind CSS'],
    description: 'Full-featured LMS with course player, chapter navigation, progress tracking, quiz modules, virtual classroom, and learner analytics dashboards.',
  },
  { 
    title: 'Examination Management System', 
    category: 'EdTech', 
    eyebrow: 'ACADEMIC PLATFORM',
    watermark: 'EMS',
    bgClass: 'bg-[#2c1d11]', 
    tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'RBAC'],
    description: 'Secure EMS handling hall ticket generation, online examinations with timed assessments, automated result processing, grade management, and administrative dashboards.',
  },
  { 
    title: 'E-Commerce Platform (Flipkart Clone)', 
    category: 'E-Commerce', 
    eyebrow: 'WEB APPLICATION',
    watermark: 'E-Commerce',
    bgClass: 'bg-[#0f252a]', 
    tags: ['React.js', 'Vite', 'Node.js', 'MongoDB', 'JWT'],
    description: 'Flipkart-inspired MERN e-commerce platform with responsive UI, JWT authentication, and RESTful APIs for product catalog, cart management, and order processing.',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filtered = activeFilter === 'All Projects'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.portfolio-header', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo('.portfolio-card', { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08,
    });
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="section-light section-padding">
      <div className="container-main">
        <div className="section-header portfolio-header text-center">
          <p className="text-eyebrow">My Work</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-surface-900">Featured Projects</h2>
          <p className="text-body-xl text-surface-500 max-w-[560px] mx-auto mt-4">
            Real-world production applications I&apos;ve built and contributed to across 
            multiple domains and tech stacks.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-20">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="text-[13px] font-bold py-2.5 px-6 rounded-full transition-all duration-400 cursor-pointer border uppercase tracking-wider"
              style={{
                background: activeFilter === f ? 'var(--color-navy-900)' : 'transparent',
                color: activeFilter === f ? 'var(--color-gold-400)' : 'var(--color-surface-500)',
                borderColor: activeFilter === f ? 'var(--color-navy-900)' : 'var(--color-surface-200)',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div 
              key={project.title} 
              className={`portfolio-card group flex flex-col rounded-[20px] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border ${project.featured ? 'border-gold-500 shadow-gold-500/20 md:col-span-2 lg:col-span-2' : 'border-surface-200 dark:border-white/10 dark:bg-navy-900'}`}
            >
              {/* Top Half - Colored Background */}
              <div className={`relative w-full ${project.featured ? 'aspect-[21/9]' : 'aspect-[4/3]'} flex items-center justify-center ${project.bgClass}`}>
                {/* Watermark Font */}
                <h3 className={`font-serif font-bold text-white/[0.15] select-none transition-opacity duration-300 group-hover:opacity-5 mix-blend-overlay ${project.featured ? 'text-5xl md:text-[60px]' : 'text-4xl md:text-[42px]'}`}>
                  {project.watermark}
                </h3>
                
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    ★ Featured Project
                  </div>
                )}
              </div>

              {/* Bottom Half - Content */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Eyebrow */}
                <div className="text-gold-500 text-xs font-bold tracking-widest uppercase mb-4">
                  {project.eyebrow}
                </div>
                
                {/* Title */}
                <h4 className="text-[26px] leading-tight font-serif text-surface-900 dark:text-white mb-4 font-bold">
                  {project.title}
                </h4>
                
                {/* Description */}
                <p className="text-[15px] text-surface-600 dark:text-surface-400 leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 border border-surface-200 dark:border-white/10 rounded-md text-[13px] text-surface-500 dark:text-surface-400 bg-white dark:bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
