import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './usePerformance';

gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const shouldAnimate = !prefersReducedMotion();

// Optimize GSAP defaults for performance
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
  autoSleep: 60, // Auto-sleep after 60 seconds of inactivity
  force3D: 'auto', // Auto-detect 3D support
});

export const animateIn = (element, options = {}) => {
  if (!element || !shouldAnimate) return;

  const { delay = 0, y = 40, duration = 1.1, immediateRender = false } = options;

  // Use will-change for GPU acceleration
  if (element.style) {
    element.style.willChange = 'transform, opacity';
  }

  const animation = gsap.from(element, {
    opacity: 0,
    y,
    duration,
    delay,
    ease: 'power3.out',
    immediateRender,
    force3D: true, // Force GPU acceleration
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      once: true, // Only animate once for better performance
    },
    onComplete: () => {
      // Remove will-change after animation
      if (element.style) {
        element.style.willChange = 'auto';
      }
    },
  });

  return animation;
};

export const useSectionReveal = (elements) => {
  if (!shouldAnimate || !elements || elements.length === 0) return;

  const animations = elements.map((el, index) => {
    if (!el) return null;
    return animateIn(el, { delay: 0.07 * index });
  });

  return () => {
    // Cleanup function
    animations.forEach((anim) => {
      if (anim) {
        anim.kill();
        ScrollTrigger.getById(anim.scrollTrigger?.vars?.id)?.kill();
      }
    });
  };
};

// Optimized scroll trigger refresh
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

// Batch scroll trigger updates for performance
let refreshTimeout;
export const debouncedRefresh = () => {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
};
