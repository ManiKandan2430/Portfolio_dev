import { LinkedinIcon, GithubIcon, TwitterIcon } from '@/components/ui/SocialIcons';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const techLinks = [
  'React.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'MySQL',
];

export default function Footer() {
  return (
    <footer
      className="section-deepest"
      style={{ borderTop: '2px solid rgba(200, 169, 110, 0.18)' }}
    >
      <div className="container-main pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold"
                style={{
                  background: 'linear-gradient(135deg, var(--color-navy-800), var(--color-navy-700))',
                  color: 'var(--color-gold-500)',
                  border: '1.5px solid rgba(200, 169, 110, 0.3)',
                }}
              >
                MS
              </div>
              <span className="text-white font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                Manikandan S
              </span>
            </div>
            <p className="text-white/50 text-[13px] leading-relaxed mb-5">
              Full Stack Developer specializing in React.js, Node.js, and Express.js.
              Building production-grade web applications across SaaS, EdTech, and Government domains.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-white text-[13px] transition-all hover:translate-x-1 no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Technologies */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4">Technologies</h4>
            <div className="flex flex-col gap-2">
              {techLinks.map((tech) => (
                <span
                  key={tech}
                  className="text-white/50 text-[13px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <span className="text-gold-500 mt-1">📍</span>
                <span className="text-white/50 text-[13px] leading-relaxed">
                  Coimbatore, Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gold-500">📞</span>
                <a href="tel:+919677987289" className="text-white/50 hover:text-white text-[13px] no-underline transition-colors">+91 9677987289</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gold-500">✉️</span>
                <a href="mailto:maniselvan231@gmail.com" className="text-white/50 hover:text-white text-[13px] no-underline transition-colors">maniselvan231@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/manikandan-s-9632742a8/' },
                { Icon: GithubIcon, href: 'https://github.com/ManiKandan2430' },
                // { Icon: TwitterIcon, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-gold-500 hover:border-gold-500 transition-all no-underline"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-20 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-white/30 text-[12px]">
            © {new Date().getFullYear()} Manikandan S. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/30 text-[12px]">
            <span>Designed & Built by Manikandan S</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
