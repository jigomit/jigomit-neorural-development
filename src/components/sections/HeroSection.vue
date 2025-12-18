<template>
  <section class="hero" id="hero">
    <div class="hero__content" ref="contentRef">
      <div class="hero__logo-chip">
        <img :src="logoSrc" alt="Community Development logo" />
      </div>
      <p class="eyebrow">Community Development</p>
      <h1>Designing regenerative futures for villages across the globe.</h1>
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
      <HeroGlobe ref="globeRef" />
      <div class="hero__image-card" ref="imageRef">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80" alt="Rural innovation" />
        <div class="image-card__overlay">
          <p>Village innovation labs</p>
          <span>AI crop monitoring • Solar-powered irrigation • Youth-led design sprints</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HeroGlobe from '@/components/HeroGlobe.vue';
import { animateIn } from '@/composables/useGsapAnimations';
import logoSrc from '@/assets/images/logo.png';

const contentRef = ref(null);
const imageRef = ref(null);
const tags = ['Smart farming', 'Cooperative governance', 'Circular design', 'Digital health', 'Rural fintech'];

onMounted(() => {
  animateIn(contentRef.value, { delay: 0.1, y: 60 });
  animateIn(imageRef.value, { delay: 0.25, y: 80 });
});
</script>
