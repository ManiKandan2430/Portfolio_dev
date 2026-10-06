'use client';

import { useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import Link from 'next/link';

// Helper to reliably format names to URL safe slugs
const createSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s&\s/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const menuSections = [
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Services',
    href: '/#services',
    children: [
      'Custom Software Development',
      'Web App Development',
      'Mobile App Development',
      'UI/UX Design & Development',
      'AI-Powered Solutions',
      'Cloud & DevOps',
    ],
  },
  {
    label: 'Industries',
    href: '/#industries',
    children: [
      'Finance & Banking',
      'Healthcare & Pharma',
      'eCommerce & Retail',
      'Education & EdTech',
      'Logistics & Supply Chain',
      'Manufacturing',
    ],
  },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Technologies', href: '/#techstack' },
  { label: 'Insights', href: '/#blog' },
  { label: 'Contact', href: '/#contact' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-[55] lg:hidden transition-all duration-400"
      style={{
        pointerEvents: isOpen ? 'auto' : 'none',
        opacity: isOpen ? 1 : 0,
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 h-full w-[85%] max-w-[400px] transition-transform duration-400 overflow-y-auto"
        style={{
          backgroundColor: 'var(--color-navy-900)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-5">
          <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="px-6 pb-8 flex flex-col gap-1">
          {menuSections.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between">
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (!item.children) onClose();
                    else e.preventDefault();
                  }}
                  className="text-white text-[18px] font-medium py-3 block no-underline hover:text-gold-400 transition-colors flex-1"
                >
                  {item.label}
                </a>
                {item.children && (
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="text-white/50 hover:text-white p-2"
                  >
                    <ChevronDown
                      size={18}
                      className="transition-transform duration-300"
                      style={{
                        transform:
                          expanded === item.label ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  </button>
                )}
              </div>
              {item.children && expanded === item.label && (
                <div className="pl-4 pb-2 flex flex-col gap-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child}
                      href={item.label === 'Services' ? `/services/${createSlug(child)}` : item.label === 'Industries' ? `/industries/${createSlug(child)}` : item.href}
                      onClick={onClose}
                      className="text-white/60 hover:text-gold-300 text-[14px] py-2 border-l-2 border-transparent hover:border-gold-500 pl-3 transition-all no-underline"
                    >
                      {child}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <a href="#contact" onClick={onClose} className="btn btn-primary w-full text-center">
              Get a Free Quote
            </a>
            <a href="#contact" onClick={onClose} className="btn btn-secondary w-full text-center">
              ✦ Hire Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
