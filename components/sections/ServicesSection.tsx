'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { Code2, Server, Database, Shield, Cloud, Globe } from 'lucide-react';

const skills = [
  {
    icon: Code2,
    title: 'Frontend Development',
    description: 'Building responsive, dynamic UIs with modern frameworks. Pixel-perfect implementations with smooth animations and state management.',
    tags: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    description: 'Architecting scalable server-side applications with RESTful APIs, MVC patterns, and efficient data handling for production environments.',
    tags: ['Node.js', 'Express.js', 'REST APIs', 'MVC'],
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Designing normalized schemas, optimizing queries, and managing data integrity across relational and NoSQL database systems.',
    tags: ['MongoDB', 'MySQL', 'PostgreSQL', 'Prisma ORM'],
  },
  {
    icon: Shield,
    title: 'Auth & Security',
    description: 'Implementing robust authentication flows, role-based access control, and secure session management for multi-tenant platforms.',
    tags: ['JWT', 'RBAC', 'OAuth 2.0', 'bcrypt', 'CORS'],
  },
  {
    icon: Globe,
    title: 'API Development',
    description: 'Designing and integrating RESTful APIs with pagination, filtering, and real-time data synchronization for complex workflows.',
    tags: ['REST', 'Axios', 'Postman', 'API Integration'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Deployment',
    description: 'Containerizing applications, setting up CI/CD pipelines, and deploying to cloud platforms with zero-downtime strategies.',
    tags: ['Docker', 'Vercel', 'Render', 'Git', 'CI/CD'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.services-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services-header', start: 'top 78%' },
        }
      );

      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-light section-padding">
      <div className="container-main">
        {/* Header */}
        <div className="section-header services-header text-center">
          <p className="text-eyebrow">What I Do</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-surface-900">
            My Core Skill Set
          </h2>
          <p className="text-body-xl text-surface-500 max-w-[560px] mx-auto mt-4">
            Full-stack expertise spanning frontend to deployment — building 
            scalable, secure, and maintainable web applications.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.title} className="service-card card group cursor-pointer text-center flex flex-col items-center">
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex flex-shrink-0 items-center justify-center mb-8 transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-110 shadow-sm"
                  style={{ backgroundColor: 'var(--color-navy-800)', border: '1px solid rgba(200, 169, 110,0.12)' }}
                >
                  <Icon size={28} className="text-gold-500 transition-transform duration-500 group-hover:rotate-[12deg]" />
                </div>

                <h3 className="text-display-sm !text-[24px] text-surface-900 mb-4 font-bold tracking-tight px-2">{skill.title}</h3>
                <div className="gold-divider mx-auto !mb-6" />
                <p className="text-body-md text-surface-500 mb-8 leading-relaxed max-w-[320px]">{skill.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-4 px-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-[0.1em] uppercase py-2 px-4 rounded-full transition-all duration-300 group-hover:bg-gold-500/20 group-hover:border-gold-500/40"
                      style={{
                        background: 'rgba(200, 169, 110,0.05)',
                        color: 'var(--color-gold-500)',
                        border: '1px solid rgba(200, 169, 110,0.12)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
