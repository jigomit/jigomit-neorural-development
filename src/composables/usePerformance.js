import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit function execution rate
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Intersection Observer for lazy loading
 */
export function useIntersectionObserver(options = {}) {
  const elementRef = ref(null);
  const isIntersecting = ref(false);
  const hasIntersected = ref(false);

  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  let observer = null;

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isIntersecting.value = entry.isIntersecting;
        if (entry.isIntersecting && !hasIntersected.value) {
          hasIntersected.value = true;
        }
      });
    }, defaultOptions);

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
      observer.disconnect();
    }
  });

  return { elementRef, isIntersecting, hasIntersected };
}

/**
 * Request Animation Frame wrapper for smooth animations
 */
export function useRAF(callback) {
  let rafId = null;
  let isRunning = false;

  const start = () => {
    if (isRunning) return;
    isRunning = true;

    const loop = () => {
      callback();
      if (isRunning) {
        rafId = requestAnimationFrame(loop);
      }
    };

    rafId = requestAnimationFrame(loop);
  };

  const stop = () => {
    isRunning = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  onUnmounted(() => {
    stop();
  });

  return { start, stop };
}

/**
 * Preload critical resources
 */
export function preloadResource(href, as, crossorigin = false) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (crossorigin) {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
}

/**
 * Prefetch resources for faster navigation
 */
export function prefetchResource(href) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Use will-change for performance optimization
 */
export function useWillChange(elementRef, property = 'transform') {
  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.style.willChange = property;
    }
  });

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.style.willChange = 'auto';
    }
  });
}

