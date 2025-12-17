<template>
  <section class="impact" id="impact" ref="impactRef">
    <div class="impact__content">
      <p class="eyebrow">Impact Numbers</p>
      <h2>We measure progress through long-term quality of life indicators.</h2>
      <p>
        Every initiative is monitored through satellite imagery, field visits, and community-run observatories to ensure the impact is
        inclusive and regenerative.
      </p>
      <div class="impact__stats">
        <article v-for="stat in stats" :key="stat.label" class="impact-stat">
          <span class="value">{{ stat.value }}</span>
          <span class="label">{{ stat.label }}</span>
          <p>{{ stat.description }}</p>
        </article>
      </div>
    </div>
    <div class="impact__visual">
      <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80" alt="Village transformation" />
      <div class="impact__overlay">
        <p>Live monitoring + storytelling studio</p>
        <span>Drone surveys • Citizen science • Data lake</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const impactRef = ref(null);

const stats = [
  { value: '2.4M', label: 'People impacted', description: 'Residents gaining access to clean energy, safe water, and dignified jobs.' },
  { value: '870+', label: 'Village playbooks', description: 'Custom transformation roadmaps delivered with funding pathways.' },
  {
    value: '68%',
    label: 'Women-led programs',
    description: 'Initiatives anchored by women leadership circles and inclusive governance.',
  },
];

onMounted(() => {
  animateIn(impactRef.value);
});
</script>
