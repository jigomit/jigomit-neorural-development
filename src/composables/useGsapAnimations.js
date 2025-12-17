// Lazy load GSAP to reduce critical path latency
let gsapLoaded = false;
let gsapPromise = null;

const loadGSAP = async () => {
  if (gsapLoaded) return;
  if (gsapPromise) return gsapPromise;
  
  gsapPromise = Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    gsapLoaded = true;
    return { gsap, ScrollTrigger };
  });
  
  return gsapPromise;
};

export const animateIn = async (element, options = {}) => {
  if (!element) return;

  const { delay = 0, y = 40, duration = 1.1 } = options;
  const { gsap } = await loadGSAP();

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

export const useSectionReveal = async (elements) => {
  elements.forEach((el, index) => {
    animateIn(el, { delay: 0.07 * index });
  });
};
