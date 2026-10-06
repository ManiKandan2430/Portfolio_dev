'use client';

import React from 'react';

export interface ChromaItem {
  image?: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  initials?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = ''
}) => {
  const data = items || [];

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-8 ${className}`}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-[300px] bg-white dark:bg-surface-900 rounded-[32px] overflow-hidden border border-surface-200 dark:border-white/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-gold-500/30 hover:shadow-gold-500/10 cursor-pointer"
          style={
            {
              borderTopColor: c.borderColor ? `${c.borderColor}80` : 'transparent',
              borderTopWidth: '2px',
              borderTopStyle: 'solid',
              '--spotlight-color': 'rgba(150,150,150,0.15)'
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 w-full aspect-[4/5] bg-surface-100 dark:bg-surface-800 overflow-hidden">
            {c.initials && !c.image && (
              <div className="absolute inset-0 flex items-center justify-center text-surface-900/10 dark:text-white/5 text-[80px] font-bold select-none" style={{ fontFamily: 'var(--font-display)' }}>
                {c.initials}
              </div>
            )}
            {c.image && (
                <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-100/60 dark:from-surface-900/80 via-transparent to-transparent opacity-60 pointer-events-none rounded-[10px]" />
            <a
                  href={c.url || "#"}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center text-surface-900/90 dark:text-white/90 hover:text-white hover:bg-gold-500 dark:hover:bg-gold-500 transition-all duration-300 z-30 pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
          <footer className="relative z-10 p-[20px] pt-8 bg-white dark:bg-surface-900 grid grid-cols-[1fr_auto] gap-x-2 gap-y-1">
            <h3 className="m-0 text-[20px] font-bold text-surface-900 dark:text-white tracking-tight">{c.title}</h3>
            {c.handle && <span className="text-[12px] font-semibold text-surface-400 dark:text-surface-500 uppercase tracking-widest text-right self-center">{c.handle}</span>}
            <p className="m-0 text-[14px] text-surface-500 dark:text-surface-400 uppercase col-span-2 tracking-wide font-medium">{c.subtitle}</p>
          </footer>
          {/* Bottom Bloom Logic */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-center"
            style={{ background: c.borderColor }}
          />
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;