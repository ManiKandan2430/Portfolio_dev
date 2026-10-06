'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import Image from 'next/image';
import logo from '@/public/logo.png';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: scrolled ? '0' : '0',
          backgroundColor: scrolled
            ? 'var(--nav-bg, rgba(255, 255, 255, 0.85))'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(200, 169, 110, 0.2)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.05)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="w-full px-6 lg:px-12 xl:px-16 mx-auto flex items-center justify-between" style={{ height: '68px', maxWidth: '1920px' }}>
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <a href="/" className="flex items-center gap-3 no-underline z-10">
              {/* Initials Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold shadow-md"
                style={{
                  background: 'linear-gradient(135deg, var(--color-navy-900), var(--color-navy-700))',
                  color: 'var(--color-gold-500)',
                  border: '1.5px solid rgba(200, 169, 110, 0.3)',
                }}
              >
                <Image src={logo} alt="Logo" width={40} height={40} className="w-full h-full object-cover rounded-full" />
              </div>
              <span
                className="text-surface-900 text-[17px] font-bold hidden lg:block"
                style={{ fontFamily: 'var(--font-display)', transform: 'translateY(1px)', whiteSpace: 'nowrap' }}
              >
                Manikandan S
              </span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center justify-center gap-8 flex-none z-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-surface-700 hover:text-surface-900 text-[14px] font-semibold transition-colors relative py-2 flex items-center gap-1 no-underline whitespace-nowrap group"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                />
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex-1 flex items-center justify-end gap-4 z-10">
            <ThemeToggle />
            <a
              href="#contact"
              className="btn btn-primary hidden md:inline-flex !py-3 !px-6 !text-[12px] tracking-[0.14em] whitespace-nowrap shadow-md shadow-gold-500/20"
            >
              Hire Me
            </a>
            <button
              className="xl:hidden text-surface-900 p-2 ml-auto cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          style={{ backgroundColor: 'var(--color-navy-950)', paddingTop: '80px' }}
        >
          <div className="flex flex-col items-center gap-6 py-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-[18px] font-semibold no-underline hover:text-gold-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary mt-4"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </>
  );
}
