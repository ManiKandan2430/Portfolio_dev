import Link from 'next/link';
import { useState } from 'react';
import { Code2, Server, Smartphone, Cloud, Database, ArrowRight } from 'lucide-react';
import { FaReact, FaVuejs, FaJava, FaNodeJs, FaPython, FaPhp, FaGolang, FaApple, FaAndroid, FaAws, FaDocker, FaSalesforce, FaMicrosoft } from 'react-icons/fa6';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiSwift, SiKotlin, SiFlutter, SiGooglecloud, SiKubernetes, SiSap, SiOdoo } from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

// Helper to reliably format names to URL safe slugs
const createSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s&\s/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const servicesData = {
  columns: [
    {
      title: 'Development',
      items: [
        'Custom Software Development',
        'Web App Development',
        'Mobile App Development',
        'MVP Development',
        'Legacy Modernization',
      ],
    },
    {
      title: 'Design & Consulting',
      items: [
        'UI/UX Design & Development',
        'IT Consulting & Advisory',
        'Business Process Automation',
        'DevOps & Cloud',
        'QA & Testing',
      ],
    },
    {
      title: 'AI & Advanced Tech',
      items: [
        'AI-Powered Solutions',
        'Machine Learning',
        'Data Analytics & BI',
        'IoT & Embedded Systems',
        'Robotic Process Automation',
      ],
    },
  ],
};

const industriesData = {
  columns: [
    {
      items: [
        'Finance & Banking',
        'Healthcare & Pharma',
        'eCommerce & Retail',
        'Education & EdTech',
        'Logistics & Supply Chain',
      ],
    },
    {
      items: [
        'Manufacturing',
        'Real Estate & PropTech',
        'Media & Entertainment',
        'Telecommunications',
        'Government & Public Sector',
      ],
    },
  ],
};

const technologiesData = {
  cards: [
    { 
      category: 'Frontend', 
      icon: Code2, 
      items: [
        { name: 'React', icon: FaReact }, 
        { name: 'Next.js', icon: SiNextdotjs }, 
        { name: 'Vue.js', icon: FaVuejs }, 
        { name: 'TypeScript', icon: SiTypescript }, 
        { name: 'Tailwind', icon: SiTailwindcss }
      ] 
    },
    { 
      category: 'Backend', 
      icon: Server, 
      items: [
        { name: 'Java', icon: FaJava }, 
        { name: 'Node.js', icon: FaNodeJs }, 
        { name: 'Python', icon: FaPython }, 
        { name: 'PHP', icon: FaPhp }, 
        { name: 'Golang', icon: FaGolang }
      ] 
    },
    { 
      category: 'Mobile & OS', 
      icon: Smartphone, 
      items: [
        { name: 'iOS / Swift', icon: FaApple }, 
        { name: 'Android/Kotlin', icon: FaAndroid }, 
        { name: 'Flutter', icon: SiFlutter }, 
        { name: 'React Native', icon: FaReact }
      ] 
    },
    { 
      category: 'Cloud & DevOps', 
      icon: Cloud, 
      items: [
        { name: 'AWS', icon: FaAws }, 
        { name: 'Azure', icon: VscAzure }, 
        { name: 'GCP', icon: SiGooglecloud }, 
        { name: 'Docker', icon: FaDocker }, 
        { name: 'K8s', icon: SiKubernetes }
      ] 
    },
    { 
      category: 'ERP & CRM', 
      icon: Database, 
      items: [
        { name: 'SAP', icon: SiSap }, 
        { name: 'MS Dynamics 365', icon: FaMicrosoft }, 
        { name: 'Odoo', icon: SiOdoo }, 
        { name: 'Salesforce', icon: FaSalesforce }
      ] 
    },
  ],
};

interface MegaMenuProps {
  type: 'services' | 'industries' | 'technologies';
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function MegaMenu({ type, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 animate-in fade-in slide-in-from-top-2 duration-250"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: 'var(--color-navy-800)',
        border: '1px solid rgba(200, 169, 110, 0.15)',
        borderRadius: '16px',
        padding: '36px 48px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        minWidth: type === 'technologies' ? '850px' : type === 'services' ? '800px' : '500px',
      }}
    >
      {type === 'services' && (
        <div className="grid grid-cols-3 gap-16">
          {servicesData.columns.map((col) => (
            <div key={col.title}>
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase mb-6"
                style={{ color: 'rgba(200, 169, 110, 0.5)' }}
              >
                {col.title}
              </p>
              <div className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <Link
                    key={item}
                    href={`/services/${createSlug(item)}`}
                    className="text-white/60 hover:text-gold-400 text-[14px] py-2.5 px-4 -ml-4 rounded-lg transition-all hover:bg-white/5 no-underline"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'industries' && (
        <div className="grid grid-cols-2 gap-12">
          {industriesData.columns.map((col, i) => (
            <div key={i} className={i > 0 ? 'border-l border-[rgba(200, 169, 110,0.1)] pl-6' : ''}>
              <div className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <Link
                    key={item}
                    href={`/industries/${createSlug(item)}`}
                    className="text-white/60 hover:text-gold-400 text-[14px] py-2.5 px-4 -ml-4 rounded-lg transition-all hover:bg-white/5 no-underline"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {type === 'technologies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {technologiesData.cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.category}
                className="group relative p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gold-500/10 text-gold-500 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={18} strokeWidth={2.5} />
                  </div>
                  <h4 className="text-white font-bold text-[14px] tracking-wide">{card.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.items.map((item) => (
                    <span
                      key={item.name}
                      className="text-[11px] font-semibold text-white/50 px-2.5 py-1.5 rounded bg-white/5 hover:text-white/90 hover:bg-gold-500/20 transition-colors cursor-default flex items-center gap-1.5"
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Call to Action Card filling the 6th slot */}
          <Link
            href="/#techstack"
            onClick={onMouseLeave}
            className="group relative p-6 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent flex flex-col justify-center items-start overflow-hidden hover:border-gold-500/50 transition-all duration-500 no-underline"
          >
            <div className="absolute inset-0 bg-gold-500/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <h4 className="text-gold-500 font-bold text-[16px] mb-2 relative z-10">
              Discover Our Full Tech Stack
            </h4>
            <p className="text-white/50 text-[12px] mb-5 relative z-10 leading-relaxed">
              Explore the 50+ cutting-edge tools and frameworks we use to build scalable enterprise apps.
            </p>
            <div className="text-white/80 group-hover:text-gold-400 text-[13px] font-bold flex items-center gap-2 relative z-10 transition-colors">
              View All Expertise <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
