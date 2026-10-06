import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function revealOnScroll(
  selector: string,
  options?: {
    y?: number;
    x?: number;
    stagger?: number;
    duration?: number;
    trigger?: string;
    start?: string;
  }
) {
  const {
    y = 50,
    x = 0,
    stagger = 0.12,
    duration = 0.8,
    trigger,
    start = 'top 78%',
  } = options || {};

  return gsap.fromTo(
    selector,
    { opacity: 0, y, x },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: trigger || selector,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function createHeroTimeline() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  return tl;
}

export function animateCounter(el: HTMLElement) {
  const target = +(el.dataset.count || '0');
  const suffix = el.dataset.suffix || '';
  const duration = 2200;
  const start = performance.now();

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export { gsap, ScrollTrigger };
