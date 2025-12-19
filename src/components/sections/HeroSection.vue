<template>
  <section class="hero" id="hero">
    <div class="hero__content" ref="contentRef">
      <div class="hero__logo-chip">
        <img :src="logoSrc" alt="Community Development logo" width="64" height="64" loading="eager" fetchpriority="high" decoding="sync" />
      </div>
      <p class="eyebrow">Community Development</p>
      <h1 data-lcp-candidate>Designing regenerative futures for villages across the globe.</h1>
      <p>
        We help local governments, cooperatives, and changemakers unlock funding, technology, and talent to reimagine rural
        infrastructure with circular economies, resilient agriculture, and joyful public spaces.
      </p>
      <div class="hero__cta">
        <button class="primary">Launch an Initiative</button>
        <button class="ghost">View Blueprint Library</button>
      </div>
      <div class="hero__tags">
        <span v-for="tag in tags" :key="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="hero__visuals">
      <Suspense>
        <template #default>
          <HeroGlobe ref="globeRef" />
        </template>
        <template #fallback>
          <div class="hero-globe-placeholder" style="width: 420px; height: 420px; background: rgba(116, 245, 213, 0.1); border-radius: 50%;"></div>
        </template>
      </Suspense>
      <div class="hero__image-card" ref="imageRef" style="aspect-ratio: 16/10; overflow: hidden;">
        <img 
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80" 
          alt="Rural innovation"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          width="900"
          height="563"
          style="width: 100%; height: 100%; object-fit: cover;"
        />
        <div class="image-card__overlay">
          <p>Village innovation labs</p>
          <span>AI crop monitoring • Solar-powered irrigation • Youth-led design sprints</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';
import logoSrc from '@/assets/images/logo.png';

// Lazy load HeroGlobe component
const HeroGlobe = defineAsyncComponent(() => import('@/components/HeroGlobe.vue'));

const contentRef = ref(null);
const imageRef = ref(null);
const tags = ['Smart farming', 'Cooperative governance', 'Circular design', 'Digital health', 'Rural fintech'];

onMounted(() => {
  // Performance: GSAP is now lazy loaded (returns promise, but we don't need to await)
  animateIn(contentRef.value, { delay: 0.1, y: 60 });
  animateIn(imageRef.value, { delay: 0.25, y: 80 });
});
</script>
