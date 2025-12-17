<template>
  <section class="initiatives" id="initiatives">
    <div class="section-heading" ref="headingRef">
      <p class="eyebrow">Key Initiatives</p>
      <h2>Blueprints for thriving villages</h2>
    </div>
    <div class="initiatives__list" ref="listRef">
      <article v-for="initiative in initiatives" :key="initiative.title" class="initiative-card">
        <div class="initiative-card__icon">
          <img :src="initiative.icon" :alt="initiative.title" />
        </div>
        <div>
          <h3>{{ initiative.title }}</h3>
          <p>{{ initiative.description }}</p>
          <ul>
            <li v-for="item in initiative.items" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="initiative-card__image">
          <img :src="initiative.image" :alt="initiative.title" />
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const headingRef = ref(null);
const listRef = ref(null);

const initiatives = [
  {
    title: 'Climate Smart Farms',
    description: 'Precision farming pods with IoT sensors, weather AI, and regenerative crop cycles.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33e.svg',
    items: ['Water intelligence dashboards', 'Drone-based agronomy scouting', 'Agri-fintech cooperatives'],
  },
  {
    title: 'Digital Village Commons',
    description: 'Immersive learning, telehealth, and entrepreneurship hubs built into community centers.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4f1.svg',
    items: ['Connected fabrication labs', 'Local data stewards program', 'Culture-forward media studios'],
  },
  {
    title: 'Resilient Infrastructure Labs',
    description: 'Nature-positive infrastructure spanning microgrids, water regeneration, and mobility.',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=900&q=80',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f9ed.svg',
    items: ['Blueprint-as-a-service', 'Community-owned utilities', 'Green jobs accelerator'],
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(listRef.value, { delay: 0.3 });
});
</script>
