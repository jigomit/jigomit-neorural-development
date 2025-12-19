<script setup>
import { ref, watch, onMounted } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useSEO } from '@/composables/useSEO';
import { prefetchResource, debounce } from '@/composables/usePerformance';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

import logoSrc from '@/assets/images/logo.png';

// Initialize SEO with structured data
useSEO();

const router = useRouter();

const navLinks = [
  { label: 'Home', name: 'home' },
  { label: 'About', name: 'about' },
  { label: 'Initiatives', name: 'initiatives' },
  { label: 'Impact', name: 'impact' },
  { label: 'Stories', name: 'stories' },
  { label: 'Gallery', name: 'gallery' },
  { label: 'Contact', name: 'contact' },
];

const route = useRoute();
const currentYear = new Date().getFullYear();
const isNavOpen = ref(false);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const closeNav = () => {
  isNavOpen.value = false;
};

watch(
  () => route.name,
  () => {
    isNavOpen.value = false;
  }
);

// Prefetch routes on link hover for faster navigation
const handleLinkHover = debounce((routeName) => {
  const route = router.resolve({ name: routeName });
  if (route && route.matched && route.matched.length > 0) {
    const component = route.matched[route.matched.length - 1].components?.default;
    if (component && typeof component === 'function') {
      // Prefetch the component
      component();
    }
  }
}, 100);

onMounted(() => {
  // Performance: Only prefetch after page is fully interactive and idle
  // Don't prefetch ContactView in critical path - it's not needed for initial render
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Only prefetch routes that are likely to be visited from home page
      const criticalRoutes = ['about', 'initiatives'];
      criticalRoutes.forEach((routeName) => {
        handleLinkHover(routeName);
      });
    }, { timeout: 3000 }); // Wait longer to not block critical path
  } else {
    // Fallback: wait even longer to ensure page is interactive
    setTimeout(() => {
      const criticalRoutes = ['about', 'initiatives'];
      criticalRoutes.forEach((routeName) => {
        handleLinkHover(routeName);
      });
    }, 3000);
  }
});
</script>

<template>
  <div class="site-shell">
    <div class="grain-bg"></div>
    <header class="site-header">
      <RouterLink to="/" class="logo">
        <img :src="logoSrc" alt="Community Development logo" class="logo-mark" loading="eager" fetchpriority="high" width="50" height="50" decoding="async" />
        <div class="logo-text">
          <span>NeoRural Development</span>
        </div>
      </RouterLink>
      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="isNavOpen.toString()"
        :aria-label="isNavOpen ? 'Close navigation menu' : 'Open navigation menu'"
        aria-controls="site-nav"
        @click="toggleNav"
      >
        <span class="sr-only">{{ isNavOpen ? 'Close menu' : 'Open menu' }}</span>
        <span class="nav-toggle-icon" :class="{ open: isNavOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <nav :class="{ open: isNavOpen }" id="site-nav">
        <RouterLink
          v-for="link in navLinks"
          :key="link.name"
          :to="{ name: link.name }"
          :class="['nav-link', { active: route.name === link.name }]"
          @click="closeNav"
          @mouseenter="handleLinkHover(link.name)"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </header>

    <main>
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition :name="currentRoute.meta.transition ?? 'page-slide'" mode="out-in" appear>
          <component :is="Component" v-if="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="site-footer">
      <div class="footer-glass">
        <div class="footer-grid">
          <div class="footer-col footer-brand">
            <img :src="logoSrc" alt="NeoRural Development logo" class="footer-logo" loading="lazy" width="56" height="56" decoding="async" fetchpriority="low" />
            <div class="footer-brand-text">
              <h3>NeoRural Development</h3>
              <p>Partners for rural transformation. Designing resilient, thriving villages with community-led innovation.</p>
            </div>
          </div>

          <div class="footer-col footer-links">
            <h4 class="footer-heading">Quick Links</h4>
            <nav class="footer-nav">
              <RouterLink :to="{ name: 'home' }" class="footer-link">Home</RouterLink>
              <RouterLink :to="{ name: 'about' }" class="footer-link">About</RouterLink>
              <RouterLink :to="{ name: 'initiatives' }" class="footer-link">Initiatives</RouterLink>
              <RouterLink :to="{ name: 'impact' }" class="footer-link">Impact</RouterLink>
              <RouterLink :to="{ name: 'stories' }" class="footer-link">Stories</RouterLink>
              <RouterLink :to="{ name: 'gallery' }" class="footer-link">Gallery</RouterLink>
              <RouterLink :to="{ name: 'contact' }" class="footer-link">Contact</RouterLink>
            </nav>
          </div>

          <div class="footer-col footer-resources">
            <h4 class="footer-heading">Resources</h4>
            <nav class="footer-nav">
              <RouterLink :to="{ name: 'blog' }" class="footer-link">Blog</RouterLink>
              <RouterLink :to="{ name: 'privacy' }" class="footer-link">Privacy Policy</RouterLink>
              <RouterLink :to="{ name: 'terms' }" class="footer-link">Terms of Service</RouterLink>
            </nav>
          </div>

          <div class="footer-col footer-contact">
            <h4 class="footer-heading">Contact</h4>
            <div class="footer-contact-info">
              <a href="mailto:hello@community.dev" class="footer-link">hello@community.dev</a>
              <a href="tel:+14155554824" class="footer-link">+1 (415) 555-4824</a>
            </div>
          </div>

          <div class="footer-col footer-social">
            <h4 class="footer-heading">Follow Us</h4>
            <div class="footer-social-links">
              <a href="https://facebook.com/communitydevelopment" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://instagram.com/communitydevelopment" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="footer-copyright">© {{ currentYear }} NeoRural Development. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
