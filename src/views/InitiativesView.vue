<template>
  <section class="page initiatives-view">
    <div class="page-heading" ref="headingRef">
      <p class="eyebrow">Key Initiatives</p>
      <h1>Flagship transformations making villages resilient, tech-enabled, and dignified.</h1>
    </div>

    <div class="initiative-gallery">
      <article v-for="item in initiatives" :key="item.title" class="initiative-tile" ref="tileRefs">
        <div class="tile-photo" :style="{ backgroundImage: `url(${item.image})` }"></div>
        <div class="tile-body">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="tile-tags">
            <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';
import premiumImage from '@/assets/images/premium_photo-1682092665516-f152630d5f53.png';

const headingRef = ref(null);
const tileRefs = ref([]);

const initiatives = [
  {
    title: 'Climate Smart Agro Parks',
    description: 'Modular hydroponics, agroforestry corridors, and carbon-positive cold chains managed by cooperatives.',
    tags: ['Soil AI', 'Solar chilling', 'Carbon guilds'],
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Village Digital Commons',
    description: 'Telehealth, fintech, and maker labs inside circular commons powered by microgrids.',
    tags: ['Telehealth', 'Makerspaces', 'Digital IDs'],
    image: premiumImage,
  },
  {
    title: 'Resilient Water Networks',
    description: 'Watershed cooperatives building check dams, bio-swales, and AI-managed distribution.',
    tags: ['Hydrology twins', 'Community sensors', 'Water credits'],
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1200&q=80',
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  tileRefs.value.forEach((el, index) => animateIn(el, { delay: 0.15 * index }));
});
</script>
