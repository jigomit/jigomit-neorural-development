import { ref, onMounted, onUnmounted, watch } from 'vue';

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

/**
 * Performance monitoring utilities
 */
export function usePerformanceMonitor() {
  const metrics = ref({
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null, // Cumulative Layout Shift
    ttfb: null, // Time to First Byte
  });

  onMounted(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // Measure FCP (First Contentful Paint)
    try {
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            metrics.value.fcp = Math.round(entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Performance Observer not supported
    }

    // Measure LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        metrics.value.lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // Measure FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          metrics.value.fid = Math.round(entry.processingStart - entry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }

    // Measure CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.value.cls = Math.round(clsValue * 1000) / 1000;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }

    // Measure TTFB (Time to First Byte)
    if (performance.timing) {
      const ttfb = performance.timing.responseStart - performance.timing.requestStart;
      metrics.value.ttfb = Math.round(ttfb);
    }
  });

  return metrics;
}

/**
 * Lazy load images with intersection observer
 */
export function useLazyImage(src, placeholder = null) {
  const imageSrc = ref(placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
  const isLoaded = ref(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    rootMargin: '50px',
    threshold: 0.1,
  });

  watch(
    () => hasIntersected.value,
    (visible) => {
      if (visible && !isLoaded.value) {
        const img = new Image();
        img.onload = () => {
          imageSrc.value = src;
          isLoaded.value = true;
        };
        img.src = src;
      }
    },
    { immediate: true }
  );

  return { imageSrc, isLoaded, elementRef };
}

