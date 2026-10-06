'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/animations';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/SocialIcons';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'maniselvan231@gmail.com', href: 'mailto:maniselvan231@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9677987289', href: 'tel:+919677987289' },
  { icon: MapPin, label: 'Location', value: 'Coimbatore, Tamil Nadu, India' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '', email: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-info', { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 78%' },
      });
      gsap.fromTo('.contact-form', { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = 'Name is required';
    if (!formState.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) errs.email = 'Invalid email';
    if (!formState.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState),
        });
        
        if (response.ok) {
          setSubmitted(true);
          setFormState({ name: '', email: '', message: '' });
        } else {
          alert('Failed to send message. Please try again later.');
        }
      } catch {
        alert('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section-light dark:section-dark section-padding">
      <div className="container-main">
        <div className="section-header text-center">
          <p className="text-eyebrow">Contact</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-surface-900 dark:text-white">Get In Touch</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left — Info */}
          <div className="contact-info lg:col-span-5">
            <h3 className="text-display-sm !text-[32px] text-surface-900 dark:text-white mb-6 font-bold leading-tight">
              Let&apos;s Work <br />Together
            </h3>
            <p className="text-body-md text-surface-500 dark:text-white/50 mb-10 leading-relaxed max-w-[400px]">
              Whether you have a project in mind or just want to connect, I&apos;d love to hear from you.
              I&apos;ll get back to you within 24 hours.
            </p>

            <div className="flex flex-col gap-8 mb-12">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(200, 169, 110,0.15)' }}
                    >
                      <Icon size={20} style={{ color: 'var(--color-gold-500)' }} />
                    </div>
                    <div>
                      <p className="text-[10px] text-surface-500 dark:text-white/40 uppercase tracking-[0.14em] font-bold mb-1.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[16px] text-surface-900 dark:text-white/80 hover:text-gold-500 dark:hover:text-gold-400 transition-colors no-underline font-medium">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[16px] text-surface-900 dark:text-white/80 font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {[
                { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/manikandan-s-9632742a8/', label: 'LinkedIn' },
                { Icon: GithubIcon, href: 'https://github.com/ManiKandan2430', label: 'GitHub' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-surface-200 dark:border-white/15 flex items-center justify-center text-surface-400 dark:text-white/40 hover:text-gold-500 hover:border-gold-500 dark:hover:text-gold-500 dark:hover:border-gold-500 transition-all no-underline"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form lg:col-span-7">
            <div
              className="rounded-2xl p-10 lg:p-12 bg-white/50 dark:bg-white/[0.03] border border-surface-200 dark:border-gold-500/20"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-[48px] mb-4 text-green-500">✓</div>
                  <h3 className="text-heading-xl text-surface-900 dark:text-white mb-2">Thank You!</h3>
                  <p className="text-body-md text-surface-500 dark:text-white/50">
                    I&apos;ve received your message and will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                    <div className="group relative">
                      <label htmlFor="contact-name" className="text-[10px] text-surface-500 dark:text-white/30 uppercase tracking-[0.16em] font-bold block mb-3 transition-colors group-focus-within:text-gold-500">Full Name *</label>
                      <input id="contact-name" name="name" type="text" className="w-full bg-transparent border-b border-surface-200 dark:border-white/15 text-surface-900 dark:text-white placeholder:text-surface-300 dark:placeholder:text-white/20 pb-2 focus:outline-none focus:border-gold-500 transition-colors" placeholder="Your Name" value={formState.name} onChange={handleChange} aria-describedby={errors.name ? 'name-error' : undefined} />
                      {errors.name && <p id="name-error" className="text-[11px] text-red-500 dark:text-red-400 mt-2" role="alert">{errors.name}</p>}
                    </div>
                    <div className="group relative">
                      <label htmlFor="contact-email" className="text-[10px] text-surface-500 dark:text-white/30 uppercase tracking-[0.16em] font-bold block mb-3 transition-colors group-focus-within:text-gold-500">Email *</label>
                      <input id="contact-email" name="email" type="email" className="w-full bg-transparent border-b border-surface-200 dark:border-white/15 text-surface-900 dark:text-white placeholder:text-surface-300 dark:placeholder:text-white/20 pb-2 focus:outline-none focus:border-gold-500 transition-colors" placeholder="you@example.com" value={formState.email} onChange={handleChange} aria-describedby={errors.email ? 'email-error' : undefined} />
                      {errors.email && <p id="email-error" className="text-[11px] text-red-500 dark:text-red-400 mt-2" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mt-10 group relative">
                    <label htmlFor="contact-message" className="text-[10px] text-surface-500 dark:text-white/30 uppercase tracking-[0.16em] font-bold block mb-3 transition-colors group-focus-within:text-gold-500">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className="w-full bg-transparent border-b border-surface-200 dark:border-white/15 text-surface-900 dark:text-white placeholder:text-surface-300 dark:placeholder:text-white/20 pb-2 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Tell me about your project or opportunity..."
                      value={formState.message}
                      onChange={handleChange}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-[11px] text-red-500 dark:text-red-400 mt-2" role="alert">{errors.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn w-full mt-12 py-5 bg-gold-500 hover:bg-gold-400 text-white rounded-lg font-bold shadow-glow hover:shadow-gold active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
