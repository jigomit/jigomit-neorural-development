<template>
  <section class="page impact-view">
    <div class="impact-hero" ref="heroRef">
      <div>
        <p class="eyebrow">Impact Numbers</p>
        <h1>Every community-led rural development initiative is measured through climate, wellbeing, and prosperity signals.</h1>
        <p>
          We combine satellite analytics, citizen observatories, and regenerative finance dashboards to track measurable outcomes from community-led rural development programs. Explore village development program impact metrics and results, sustainable rural development impact assessment, and community-led development results and outcomes.
        </p>
      </div>
      <div class="impact-counters">
        <article v-for="stat in stats" :key="stat.label">
          <span class="value">{{ stat.value }}</span>
          <span class="label">{{ stat.label }}</span>
          <p>{{ stat.description }}</p>
        </article>
      </div>
    </div>

    <div class="impact-panorama" ref="panoramaRef">
      <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80" alt="Measurable outcomes from community-led rural development programs showing village transformation through sustainable village development programs" />
      <div class="impact-panorama__overlay">
        <p>Live Earth observation + local data records</p>
        <span>Farmer scientists • Drone scans • Digital commons</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const heroRef = ref(null);
const panoramaRef = ref(null);

const stats = [
  { value: '2.7M', label: 'Residents served', description: 'Access to clean energy, regenerative agriculture, dignified livelihoods.' },
  { value: '960+', label: 'Blueprints', description: 'Village transformation playbooks co-created with citizens.' },
  { value: '78%', label: 'Women-led councils', description: 'Governance led by women and youth leadership circles.' },
];

onMounted(() => {
  animateIn(heroRef.value);
  animateIn(panoramaRef.value, { delay: 0.3 });
});
</script>
