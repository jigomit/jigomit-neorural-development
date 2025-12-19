// Performance: Lazy load GSAP to reduce initial bundle size
let gsapInstance = null;
let ScrollTriggerInstance = null;

const loadGSAP = async () => {
  if (!gsapInstance) {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    gsapInstance = gsapModule.gsap;
    ScrollTriggerInstance = scrollTriggerModule.ScrollTrigger;
    gsapInstance.registerPlugin(ScrollTriggerInstance);
    
    // Optimize GSAP defaults for performance
    gsapInstance.config({
      nullTargetWarn: false,
      trialWarn: false,
      autoSleep: 60,
      force3D: 'auto',
    });
  }
  return { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance };
};

import { prefersReducedMotion } from './usePerformance';

// Check for reduced motion preference
const shouldAnimate = !prefersReducedMotion();

// Performance: Batch DOM reads/writes to prevent forced reflows
let rafId = null;
const pendingUpdates = new Set();

const batchUpdates = async () => {
  if (pendingUpdates.size === 0) return;
  
  // Lazy load GSAP if needed
  const { ScrollTrigger } = await loadGSAP();
  
  // Batch all ScrollTrigger refreshes
  ScrollTrigger.refresh();
  pendingUpdates.clear();
  rafId = null;
};

export const scheduleScrollTriggerRefresh = () => {
  pendingUpdates.add('refresh');
  if (!rafId) {
    rafId = requestAnimationFrame(batchUpdates);
  }
};

export const animateIn = (element, options = {}) => {
  if (!element || !shouldAnimate) return Promise.resolve(null);

  // Performance: Lazy load GSAP only when animation is needed
  return loadGSAP().then(({ gsap, ScrollTrigger }) => {
    const { delay = 0, y = 40, duration = 1.1, immediateRender = false } = options;

    // Use will-change for GPU acceleration (set before any reads)
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
        // Performance: Batch refreshes to prevent forced reflows
        refreshPriority: -1, // Lower priority to batch with other refreshes
        invalidateOnRefresh: false, // Don't recalculate on refresh
      },
      onComplete: () => {
        // Remove will-change after animation
        if (element.style) {
          element.style.willChange = 'auto';
        }
      },
    });

    return animation;
  });
};

export const useSectionReveal = async (elements) => {
  if (!shouldAnimate || !elements || elements.length === 0) return;

  // Performance: Lazy load GSAP
  const { ScrollTrigger } = await loadGSAP();

  const animations = await Promise.all(
    elements.map(async (el, index) => {
      if (!el) return null;
      return await animateIn(el, { delay: 0.07 * index });
    })
  );

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

// Optimized scroll trigger refresh - batched to prevent forced reflows
export const refreshScrollTriggers = async () => {
  scheduleScrollTriggerRefresh();
};

// Batch scroll trigger updates for performance
let refreshTimeout;
export const debouncedRefresh = () => {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    scheduleScrollTriggerRefresh();
  }, 150);
};
