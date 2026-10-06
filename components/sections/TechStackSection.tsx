'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';

import { FaReact, FaNodeJs, FaDocker, FaGit, FaDatabase } from 'react-icons/fa6';
import { 
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiMysql, 
  SiPostgresql, SiPrisma, SiPostman, SiVercel, SiVite,
  SiJsonwebtokens
} from 'react-icons/si';
import { TbApi, TbBrandVscode } from 'react-icons/tb';
import FlowingMenu from '@/components/ui/FlowingMenu';

const flowItems = [
  { link: '#', text: 'Frontend', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop', technologies: [
    { name: 'React.js', icon: FaReact }, 
    { name: 'HTML5/CSS3', icon: FaReact },
    { name: 'TypeScript', icon: SiTypescript }, 
    { name: 'Tailwind CSS', icon: SiTailwindcss }, 
    { name: 'Material UI', icon: FaReact },
    { name: 'React Router', icon: FaReact },
    { name: 'Axios', icon: TbApi },
  ] },
  { link: '#', text: 'Backend', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop', technologies: [
    { name: 'Node.js', icon: FaNodeJs }, 
    { name: 'Express.js', icon: SiExpress }, 
    { name: 'REST APIs', icon: TbApi },
    { name: 'MVC Architecture', icon: FaNodeJs },
  ] },
  { link: '#', text: 'Database', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop', technologies: [
    { name: 'MongoDB', icon: SiMongodb }, 
    { name: 'MySQL', icon: SiMysql }, 
    { name: 'PostgreSQL', icon: SiPostgresql }, 
    { name: 'Prisma ORM', icon: SiPrisma },
    { name: 'Database Design', icon: FaDatabase },
  ] },
  { link: '#', text: 'Auth & Security', image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop', technologies: [
    { name: 'JWT', icon: SiJsonwebtokens }, 
    { name: 'RBAC', icon: SiJsonwebtokens },
    { name: 'OAuth 2.0', icon: SiJsonwebtokens },
    { name: 'bcrypt', icon: SiJsonwebtokens },
    { name: 'CORS', icon: SiJsonwebtokens },
  ] },
  { link: '#', text: 'DevOps & Tools', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2076&auto=format&fit=crop', technologies: [
    { name: 'Docker', icon: FaDocker }, 
    { name: 'Git/GitHub', icon: FaGit }, 
    { name: 'Vercel', icon: SiVercel }, 
    { name: 'Vite', icon: SiVite },
    { name: 'Postman', icon: SiPostman }, 
    { name: 'VS Code', icon: TbBrandVscode },
  ] },
  { link: '#', text: 'State Mgmt', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop', technologies: [
    { name: 'Redux Toolkit', icon: FaReact }, 
    { name: 'Context API', icon: FaReact },
    { name: 'React Hooks', icon: FaReact },
  ] },
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.tech-header', start: 'top 78%' },
      });
      gsap.fromTo('.tech-container', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.tech-container', start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="techstack" className="section-light dark:section-dark section-padding">
      <div className="container-main">
        <div className="section-header tech-header text-center">
          <p className="text-eyebrow">Technologies</p>
          <div className="gold-divider mx-auto" />
          <h2 className="text-display-md text-surface-900 dark:text-white">My Tech Arsenal</h2>
        </div>

        <div
          className="tech-container rounded-xl overflow-hidden mt-12 bg-white dark:bg-[#060010]"
          style={{ border: '1px solid rgba(200, 169, 110,0.12)' }}
        >
          <FlowingMenu 
            items={flowItems}
            speed={15}
          />
        </div>
      </div>
    </section>
  );
}
