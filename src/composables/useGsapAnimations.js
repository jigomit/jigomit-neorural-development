import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateIn = (element, options = {}) => {
  if (!element) return;

  const { delay = 0, y = 40, duration = 1.1 } = options;

  gsap.from(element, {
    opacity: 0,
    y,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
};

export const useSectionReveal = (elements) => {
  elements.forEach((el, index) => {
    animateIn(el, { delay: 0.07 * index });
  });
};
