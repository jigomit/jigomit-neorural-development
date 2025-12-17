<template>
  <section class="about" id="about">
    <div class="section-heading" ref="headingRef">
      <p class="eyebrow">About Community Development</p>
      <h2>We architect whole-village transformations that put people, ecology, and culture first.</h2>
      <p>
        Our multidisciplinary studio blends participatory planning, data intelligence, and grassroots leadership training to help rural
        communities unlock inclusive growth.
      </p>
    </div>
    <div class="about__grid" ref="gridRef">
      <article v-for="item in highlights" :key="item.title" class="about-card">
        <div class="about-card__icon" :style="{ background: item.gradient }">
          <img :src="item.icon" :alt="item.title" />
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { animateIn } from '@/composables/useGsapAnimations';

const headingRef = ref(null);
const gridRef = ref(null);

const highlights = [
  {
    title: 'Participatory Design',
    description: 'Immersive village labs capture thousands of citizen inputs to craft human-centered masterplans.',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4dd.svg',
    gradient: 'linear-gradient(135deg, #FBD786 0%, #f7797d 100%)',
  },
  {
    title: 'Future-Ready Infrastructure',
    description: 'Hybrid micro-grids, resilient water systems, and circular micro-economies built with local talent.',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f680.svg',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  {
    title: 'Digital Capacity Building',
    description: 'Upskilling cohorts leverage digital twins, IoT, and fintech rails to manage village operations.',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4bb.svg',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    title: 'Impact Orchestration',
    description: 'Live dashboards, ESG storytelling, and donor engagement loops to fuel continuous investment.',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4ca.svg',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  },
];

onMounted(() => {
  animateIn(headingRef.value);
  animateIn(gridRef.value, { delay: 0.2 });
});
</script>
