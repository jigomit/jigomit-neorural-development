<template>
  <section class="page hero-view">
    <div class="hero-aurora"></div>
    <div class="hero-grid">
      <div class="hero-copy" ref="copyRef">
        <p class="eyebrow">Community-led Rural Development</p>
        <h1>Community-led rural development initiatives for regenerative village futures.</h1>
        <p>
          We orchestrate bold, community-led rural development initiatives across infrastructure, livelihoods, and culture so that rural
          communities can thrive in harmony with their lands.
        </p>
        <div class="hero-actions">
          <RouterLink :to="{ name: 'initiatives' }" class="primary">Explore Programs</RouterLink>
          <RouterLink :to="{ name: 'contact' }" class="ghost">Plan a Project</RouterLink>
        </div>
        <div class="hero-metrics">
          <div v-for="metric in metrics" :key="metric.label">
            <span class="value">{{ metric.value }}</span>
            <span class="label">{{ metric.label }}</span>
          </div>
        </div>
      </div>

      <div class="hero-media" ref="mediaRef">
        <div class="hero-insights">
          <p class="eyebrow">Field Insights</p>
          <h3>Live telemetry across 12 geographies</h3>
          <ul>
            <li>Solar grids producing <strong>18.4MW</strong> for irrigation + cold chains</li>
            <li>Water cooperatives restoring <strong>420km</strong> of watershed corridors</li>
            <li>Design labs prototyping <strong>64</strong> agri-tech pilots with youth coalitions</li>
          </ul>
        </div>
        <div class="hero-photo-stack">
          <figure>
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80" alt="Solar panels in rural community" />
            <figcaption>Co-ops modernizing irrigation</figcaption>
          </figure>
          <figure>
            <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80" alt="Community meeting and collaboration" />
            <figcaption>Artisan-led innovation labs</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { animateIn } from '@/composables/useGsapAnimations';

const copyRef = ref(null);
const mediaRef = ref(null);

const metrics = [
  { label: 'Villages partnered', value: '112' },
  { label: 'Community architects', value: '58' },
  { label: 'Impact funds activated', value: '$42M' },
];

onMounted(() => {
  animateIn(copyRef.value, { y: 80 });
  animateIn(mediaRef.value, { y: 80, delay: 0.2 });
});
</script>
