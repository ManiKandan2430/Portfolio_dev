'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import ShinyText from '@/components/ui/ShinyText';
import Antigravity from '@/components/ui/Antigravity';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .fromTo('.hero-greeting', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        .fromTo('.hero-description', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.4);

      // Parallax on scroll
      gsap.to('.hero-content', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-light relative overflow-hidden"
      style={{ minHeight: '100svh', display: 'flex', alignItems: 'center' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft pearl/mesh gradient base */}
        <div 
          className="absolute inset-0 hero-bg-gradient"
          style={{
            background: 'linear-gradient(135deg, #f8f6f2 0%, #fffbf2 50%, #f0ece4 100%)',
          }}
        />

        {/* Mesh Glow 1 (Soft Gold) */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-multiply opacity-50 hero-mesh-glow"
          style={{
            background: 'radial-gradient(circle, rgba(200, 169, 110, 0.25) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'float-blob 18s ease-in-out infinite',
          }}
        />
        {/* Mesh Glow 2 (Subtle Silver/Blue) */}
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full mix-blend-multiply opacity-50 hero-mesh-glow"
          style={{
            background: 'radial-gradient(circle, rgba(220, 224, 232, 0.8) 0%, transparent 70%)',
            filter: 'blur(120px)',
            animation: 'float-blob 22s ease-in-out infinite reverse',
            animationDelay: '1s',
          }}
        />
        {/* Mesh Glow 3 (Warm Peach) */}
        <div
          className="absolute top-[40%] right-[20%] w-[40%] h-[40%] rounded-full mix-blend-multiply opacity-30 hero-mesh-glow"
          style={{
            background: 'radial-gradient(circle, rgba(240, 217, 140, 0.4) 0%, transparent 70%)',
            filter: 'blur(90px)',
            animation: 'float-blob 15s ease-in-out infinite',
            animationDelay: '3s',
          }}
        />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.02] hero-grid"
        />
      </div>

      <div className="absolute inset-0 z-0 opacity-25">
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#c8a96e"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="sphere"
          fieldStrength={10}
        />
      </div>

      <div className="container-main relative z-10 hero-content pointer-events-none" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
        <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center">
          <div className="hero-badge mb-6 opacity-0">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] animate-breathe"
              style={{
                background: 'rgba(200, 169, 110, 0.08)',
                border: '1.2px solid rgba(200, 169, 110, 0.2)',
                color: 'var(--color-gold-500)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for Opportunities
            </span>
          </div>

          <p className="hero-greeting text-body-xl text-surface-500 mb-4 opacity-0 font-medium">
            Hi there, I&apos;m
          </p>

          <h1 className="hero-title text-display-xl lg:text-[80px] text-surface-900 font-extrabold leading-[1.15] tracking-[-0.02em] mb-6 opacity-0">
            <ShinyText 
              text="Manikandan S"
              speed={3}
              color="var(--color-surface-900)"
              shineColor="var(--color-gold-500, #c8a96e)"
              className="text-surface-900 font-extrabold pb-2"
            />
          </h1>

          <p className="hero-description text-body-xl text-surface-700 max-w-[640px] mb-12 leading-relaxed opacity-0 mx-auto font-medium">
            Full Stack Developer crafting production-grade web applications with 
            <span style={{ color: 'var(--color-gold-500)' }}> React.js</span>,{' '}
            <span style={{ color: 'var(--color-gold-500)' }}> Node.js</span>, and{' '}
            <span style={{ color: 'var(--color-gold-500)' }}> Express.js</span> — 
            specializing in SaaS, EdTech, and Government platforms.
          </p>

          <div className="hero-actions flex flex-wrap items-center justify-center gap-6 opacity-0 pointer-events-auto">
            <a href="#projects" className="btn btn-primary shadow-lg shadow-gold-500/20">
              View My Work <ArrowRight size={16} />
            </a>
            <a href="/MANIKANDAN_RESUME.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-tertiary">
              <Download size={16} /> Download Resume
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
          <div
            className="w-6 h-10 rounded-full border-2 border-surface-300 flex justify-center pt-2"
          >
            <div
              className="w-1 h-2 rounded-full bg-gold-500"
              style={{ animation: 'bounce-scroll 2s ease-in-out infinite' }}
            />
          </div>
          <span className="text-[10px] text-surface-500 tracking-[0.15em] uppercase font-bold">
            Scroll to Explore
          </span>
        </div>
      </div>
    </section>
  );
}
