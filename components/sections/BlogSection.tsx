'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'How We Integrated GPT-4 into a Banking Platform Without Compromising Security',
    category: 'AI Solutions',
    date: 'March 2026',
    excerpt: 'A deep dive into our approach to enterprise AI integration — handling PII, model guardrails, and real-time inference at scale.',
  },
  {
    title: 'From 0 to 50,000 Users: Architecture Decisions That Made It Possible',
    category: 'Web Dev',
    date: 'February 2026',
    excerpt: 'The technical story behind scaling a Next.js SaaS platform from MVP to production with 99.99% uptime.',
  },
  {
    title: 'Why Your Digital Transformation Is Failing (And How to Fix It in 90 Days)',
    category: 'Consulting',
    date: 'January 2026',
    excerpt: 'Common pitfalls in enterprise digital transformation and our proven 90-day framework for turning projects around.',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.blog-header', start: 'top 78%' },
      });
      gsap.fromTo('.blog-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.blog-grid', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="section-white section-padding">
      <div className="container-main">
        <div className="section-header blog-header text-center">
          <p className="text-eyebrow">Insights</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-surface-900">Latest from our Blog</h2>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {posts.map((post) => (
            <article
              key={post.title}
              className="blog-card card group bg-white p-10 cursor-pointer text-left flex flex-col"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-400)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200, 169, 110, 0.12)';
              }}
            >
              {/* Category badge */}
              <span className="badge badge-light mb-5">{post.category}</span>

              <h3 className="text-display-sm !text-[24px] text-surface-900 mb-4 group-hover:text-gold-600 transition-colors leading-tight font-bold">
                {post.title}
              </h3>

              <p className="text-body-sm text-surface-500 mb-8 leading-relaxed">{post.excerpt}</p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-100">
                <span className="text-[12px] font-bold text-surface-400 tracking-wider uppercase">{post.date}</span>
                <span className="text-[13px] font-bold text-gold-500 flex items-center gap-2 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#blog" className="btn btn-tertiary">
            Read All Articles <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
