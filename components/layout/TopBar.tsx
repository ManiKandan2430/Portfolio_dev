'use client';

import { useState, useEffect } from 'react';

const shortcuts = [
  { label: 'Enterprise', href: '#industries' },
  { label: 'Startups', href: '#portfolio' },
  { label: 'Healthcare & FinTech', href: '#industries' },
  { label: 'AI Solutions', href: '#services' },
];

export default function TopBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] transition-transform duration-300"
      style={{
        height: '33px',
        backgroundColor: 'var(--topbar-bg, #ede9e0)',
        borderBottom: '1px solid var(--color-surface-200)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="container-main h-full flex items-center justify-center gap-6">
        {shortcuts.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[12px] font-medium text-surface-700 hover:text-gold-500 transition-colors flex items-center gap-1"
          >
            {item.label} <span className="text-[10px]">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
